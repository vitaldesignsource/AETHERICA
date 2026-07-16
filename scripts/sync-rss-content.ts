import { writeFile } from "node:fs/promises";
import Parser from "rss-parser";
import { slugify } from "../lib/format";

const feedUrl = process.env.PODCAST_RSS_URL ?? "http://feeds.libsyn.com/482289/rss";
const outputPath = "content/rss-episodes.json";

type RssEpisodeSeed = {
  source: "podcast-rss";
  guid: string;
  title: string;
  slug: string;
  description: string;
  publishedAt?: string;
  duration: string;
  durationSeconds: number;
  episodeNumber?: number;
  coverImage?: string;
  audioUrl: string;
  audioMimeType?: string;
};

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function durationToSeconds(value?: string) {
  if (!value) return 0;
  const parts = value.split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

async function main() {
  const parser = new Parser({
    customFields: {
      item: [
        ["itunes:duration", "duration"],
        ["itunes:episode", "episodeNumber"],
        ["itunes:image", "itunesImage"],
        ["content:encoded", "contentEncoded"]
      ]
    }
  });
  const feed = await parser.parseURL(feedUrl);
  const episodes: RssEpisodeSeed[] = feed.items
    .filter((item) => item.enclosure?.url)
    .map((item) => {
      const image = (item as { itunesImage?: { $?: { href?: string } } }).itunesImage?.$?.href;
      const description = stripHtml(
        String((item as { contentEncoded?: string }).contentEncoded ?? item.content ?? item.contentSnippet ?? "")
      );
      const duration = String((item as { duration?: string }).duration ?? "");
      const episodeNumber = Number((item as { episodeNumber?: string }).episodeNumber);

      return {
        source: "podcast-rss",
        guid: item.guid ?? item.enclosure?.url ?? item.title ?? "",
        title: item.title ?? "Untitled episode",
        slug: slugify(item.title ?? item.guid ?? "episode"),
        description,
        publishedAt: item.isoDate ?? (item.pubDate ? new Date(item.pubDate).toISOString() : undefined),
        duration,
        durationSeconds: durationToSeconds(duration),
        episodeNumber: Number.isFinite(episodeNumber) ? episodeNumber : undefined,
        coverImage: image,
        audioUrl: item.enclosure?.url ?? "",
        audioMimeType: item.enclosure?.type
      };
    });

  await writeFile(`${process.cwd()}/${outputPath}`, `${JSON.stringify(episodes, null, 2)}\n`);
  console.log(`Wrote ${episodes.length} RSS audio episodes to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
