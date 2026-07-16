import Parser from "rss-parser";
import { z } from "zod";

const rssEpisodeSchema = z.object({
  guid: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  link: z.string().url().optional(),
  pubDate: z.string().optional(),
  enclosure: z
    .object({
      url: z.string().url(),
      type: z.string().optional()
    })
    .optional()
});

export type ParsedRssEpisode = z.infer<typeof rssEpisodeSchema>;

export async function parsePodcastFeed(feedUrl: string) {
  const url = new URL(feedUrl);
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("PODCAST_RSS_URL must be an HTTP or HTTPS URL.");
  }

  const parser = new Parser();
  const feed = await parser.parseURL(feedUrl);
  return feed.items
    .map((item) => ({
      guid: item.guid ?? item.link ?? item.title ?? "",
      title: item.title ?? "Untitled episode",
      description: item.contentSnippet ?? item.content ?? "",
      link: item.link,
      pubDate: item.pubDate,
      enclosure: item.enclosure
    }))
    .map((item) => rssEpisodeSchema.parse(item));
}
