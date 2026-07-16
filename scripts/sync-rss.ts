import { parsePodcastFeed } from "../lib/rss/parser";

async function main() {
  const feedUrl = process.env.PODCAST_RSS_URL;
  if (!feedUrl) throw new Error("PODCAST_RSS_URL is required.");
  const episodes = await parsePodcastFeed(feedUrl);
  console.log(JSON.stringify({ mode: "preview", count: episodes.length, first: episodes[0] ?? null }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
