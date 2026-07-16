import { readFile, writeFile } from "node:fs/promises";
import { slugify } from "../lib/format";

const inputPath = process.argv[2];
const outputPath = "content/youtube-episodes.json";

type YouTubeEpisodeSeed = {
  source: "youtube-public-page" | "youtube-embed-list";
  title: string;
  slug: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  coverImage: string;
  publishedLabel: string;
  viewLabel: string;
  description: string;
  chapters: Array<{ title: string; start: number }>;
  collection?: "channel" | "guest-playlist" | "embed-list";
};

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&AElig;/g, "Æ")
    .replace(/&aelig;/g, "æ");
}

function timestampToSeconds(value: string) {
  const parts = value.split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

function parseChapters(description: string) {
  return description
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
      const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
      if (!match) return null;
      return { start: timestampToSeconds(match[1]), title: match[2].replace(/^[-–—]\s*/, "") };
    })
    .filter((chapter): chapter is { title: string; start: number } => Boolean(chapter));
}

async function getWatchMetadata(videoId: string) {
  const html = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { "user-agent": "Mozilla/5.0" }
  }).then((response) => response.text());

  const rawTitle =
    html.match(/<meta name="title" content="([^"]*)"/)?.[1] ??
    html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ??
    `Aetherica YouTube Episode ${videoId}`;
  const content = html.match(/attributedDescriptionBodyText":\{"content":"((?:\\"|[^"])*)"/)?.[1];
  const rawDescription =
    content ? JSON.parse(`"${content}"`) : html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";

  return {
    title: decodeEntities(rawTitle),
    description: decodeEntities(rawDescription)
  };
}

async function main() {
  if (!inputPath) throw new Error("Usage: tsx scripts/import-youtube-embed-list.ts <pasted-text-file>");

  const text = await readFile(inputPath, "utf8");
  const ids = [...new Set([...text.matchAll(/youtube\.com\/embed\/([\w-]{11})/g)].map((match) => match[1]))];
  const existing = JSON.parse(await readFile(outputPath, "utf8")) as YouTubeEpisodeSeed[];
  const byId = new Map(existing.map((episode) => [episode.youtubeVideoId, episode]));

  for (const youtubeVideoId of ids) {
    if (byId.has(youtubeVideoId)) continue;
    const metadata = await getWatchMetadata(youtubeVideoId);
    byId.set(youtubeVideoId, {
      source: "youtube-embed-list",
      title: metadata.title,
      slug: slugify(metadata.title),
      youtubeVideoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
      coverImage: `https://i.ytimg.com/vi/${youtubeVideoId}/hq720.jpg`,
      publishedLabel: "",
      viewLabel: "",
      description: metadata.description,
      chapters: parseChapters(metadata.description),
      collection: "embed-list"
    });
  }

  const ordered = [
    ...ids.map((id) => byId.get(id)).filter((episode): episode is YouTubeEpisodeSeed => Boolean(episode)),
    ...existing.filter((episode) => !ids.includes(episode.youtubeVideoId))
  ];

  await writeFile(outputPath, `${JSON.stringify(ordered, null, 2)}\n`);
  console.log(`Imported ${ids.length} pasted YouTube IDs. Archive seed now has ${ordered.length} YouTube episodes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
