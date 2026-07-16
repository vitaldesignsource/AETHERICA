import { writeFile } from "node:fs/promises";
import { slugify } from "../lib/format";

const channelUrl = process.env.AETHERICA_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/@AETHERICAPODCAST";
const guestPlaylistUrl =
  process.env.AETHERICA_GUEST_PLAYLIST_URL ??
  "https://www.youtube.com/feeds/videos.xml?playlist_id=PLN4WW6NK_SjGDuJsfAX8EV5oDdkQcT37J";
const outputPath = "content/youtube-episodes.json";

type YouTubeEpisodeSeed = {
  source: "youtube-public-page";
  title: string;
  slug: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  coverImage: string;
  publishedLabel: string;
  viewLabel: string;
  description: string;
  chapters: Array<{ title: string; start: number }>;
  collection: "channel" | "guest-playlist";
};

type LooseRecord = Record<string, unknown>;

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

function extractJsonObject(html: string, key: string) {
  const objects: unknown[] = [];
  let position = 0;
  const needle = `"${key}":{`;

  while ((position = html.indexOf(needle, position)) >= 0) {
    const start = position + key.length + 3;
    let depth = 0;
    let inString = false;
    let escape = false;

    for (let index = start; index < html.length; index++) {
      const char = html[index];
      if (inString) {
        if (escape) escape = false;
        else if (char === "\\") escape = true;
        else if (char === '"') inString = false;
      } else if (char === '"') {
        inString = true;
      } else if (char === "{") {
        depth++;
      } else if (char === "}") {
        depth--;
        if (depth === 0) {
          try {
            objects.push(JSON.parse(html.slice(start, index + 1)));
          } catch {
            // YouTube occasionally changes card payloads; skip malformed fragments.
          }
          position = index;
          break;
        }
      }
    }
    position++;
  }

  return objects;
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

function asRecord(value: unknown): LooseRecord | undefined {
  return value && typeof value === "object" ? (value as LooseRecord) : undefined;
}

function getPath(value: unknown, path: string[]) {
  let current: unknown = value;
  for (const segment of path) {
    const record = asRecord(current);
    if (!record) return undefined;
    current = record[segment];
  }
  return current;
}

function getStringPath(value: unknown, path: string[]) {
  const result = getPath(value, path);
  return typeof result === "string" ? result : undefined;
}

function getArrayPath(value: unknown, path: string[]) {
  const result = getPath(value, path);
  return Array.isArray(result) ? result : undefined;
}

async function getDescription(videoId: string) {
  const html = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { "user-agent": "Mozilla/5.0" }
  }).then((response) => response.text());

  const content = html.match(/attributedDescriptionBodyText":\{"content":"((?:\\"|[^"])*)"/)?.[1];
  if (content) return decodeEntities(JSON.parse(`"${content}"`));

  const metaDescription = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  return decodeEntities(metaDescription);
}

async function main() {
  const playlistFeed = await fetch(guestPlaylistUrl, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) =>
    response.text()
  );
  const guestVideoIds = new Set([...playlistFeed.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map((match) => match[1]));
  const html = await fetch(channelUrl, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) =>
    response.text()
  );
  const cards = extractJsonObject(html, "lockupViewModel");

  const episodes: YouTubeEpisodeSeed[] = [];
  const seen = new Set<string>();

  for (const card of cards) {
    const encoded = JSON.stringify(card);
    const youtubeVideoId = encoded.match(/"videoId":"([\w-]{11})"/)?.[1];
    const title = getStringPath(card, ["metadata", "lockupMetadataViewModel", "title", "content"]);
    const metadataRows = getArrayPath(card, [
      "metadata",
      "lockupMetadataViewModel",
      "metadata",
      "contentMetadataViewModel",
      "metadataRows"
    ]);
    const metadataParts = getArrayPath(metadataRows?.[0], ["metadataParts"])
      ?.map((part) => getStringPath(part, ["text", "content"]))
      .filter((part): part is string => Boolean(part)) ?? [];

    if (!youtubeVideoId || !title || seen.has(youtubeVideoId)) continue;
    seen.add(youtubeVideoId);

    const description = await getDescription(youtubeVideoId);
    episodes.push({
      source: "youtube-public-page",
      title: decodeEntities(title),
      slug: slugify(title),
      youtubeVideoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
      coverImage: `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
      viewLabel: metadataParts.find((part) => part.includes("view")) ?? "",
      publishedLabel: metadataParts.find((part) => !part.includes("view")) ?? "",
      description,
      chapters: parseChapters(description),
      collection: guestVideoIds.has(youtubeVideoId) ? "guest-playlist" : "channel"
    });
  }

  await writeFile(`${process.cwd()}/${outputPath}`, `${JSON.stringify(episodes, null, 2)}\n`);
  console.log(`Wrote ${episodes.length} public YouTube episodes to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
