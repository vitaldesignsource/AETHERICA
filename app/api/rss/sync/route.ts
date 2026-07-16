import { NextResponse } from "next/server";
import { parsePodcastFeed } from "@/lib/rss/parser";

export async function POST() {
  const feedUrl = process.env.PODCAST_RSS_URL;
  if (!feedUrl) {
    return NextResponse.json({ error: "PODCAST_RSS_URL is not configured." }, { status: 400 });
  }

  const episodes = await parsePodcastFeed(feedUrl);
  return NextResponse.json({
    ok: true,
    mode: "preview",
    imported: 0,
    previewCount: episodes.length,
    episodes: episodes.slice(0, 10)
  });
}
