import { writeFile } from "node:fs/promises";
import { slugify } from "../lib/format";

const feedUrl = process.env.IKE_EVENTS_FEED_URL ?? "https://ikebaker.com/upcoming-events%2Fprojects/f.json";
const outputPath = "content/ike-events.json";

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const feed = await fetch(feedUrl, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) => response.json());
  const items = (Array.isArray(feed.items) ? feed.items : []).map((item: Record<string, string>) => ({
    slug: slugify(item.title ?? item.id ?? "ike-event"),
    title: item.title,
    shortDescription: stripHtml(item.summary ?? ""),
    longDescription: stripHtml(item.html_content ?? item.summary ?? ""),
    sourceUrl: item.url,
    imageUrl: item.html_content?.match(/<img src="([^"]+)"/)?.[1],
    publishedAt: item.date_modified
  }));

  await writeFile(`${process.cwd()}/${outputPath}`, `${JSON.stringify(items, null, 2)}\n`);
  console.log(`Wrote ${items.length} Ike event/project feed items to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
