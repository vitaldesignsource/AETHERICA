import { episodes, hosts, topics } from "@/lib/data/demo";
import { navItems } from "@/lib/site";

export type OracleSiteIndexItem = {
  title: string;
  route: string;
  type: "Route" | "Episode" | "Topic" | "Host";
  excerpt?: string;
  tags?: string[];
};

const maxItemsPerSection = 24;

function truncate(value: string, maxLength = 240) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 1).trim()}…`;
}

export function buildOracleSiteIndex(): OracleSiteIndexItem[] {
  const routes = navItems.map(([title, route]) => ({
    title,
    route,
    type: "Route" as const,
    excerpt: `Primary public navigation route for ${title}.`
  }));

  const topicItems = topics.map((topic) => ({
    title: topic.title,
    route: `/topics/${topic.slug}`,
    type: "Topic" as const,
    excerpt: truncate(topic.overview),
    tags: [topic.definition]
  }));

  const hostItems = hosts.map((host) => ({
    title: host.name,
    route: `/hosts/${host.slug}`,
    type: "Host" as const,
    excerpt: truncate(host.shortBio),
    tags: host.studyAreas
  }));

  const episodeItems = episodes.slice(0, 80).map((episode) => ({
    title: episode.title,
    route: `/episodes/${episode.slug}`,
    type: "Episode" as const,
    excerpt: truncate(episode.description || episode.longIntroduction || ""),
    tags: episode.topics.slice(0, 6)
  }));

  return [...routes, ...topicItems, ...hostItems, ...episodeItems];
}

export function buildOracleSiteIndexSummary() {
  const items = buildOracleSiteIndex();
  const byType = (type: OracleSiteIndexItem["type"]) => items.filter((item) => item.type === type);
  const summarize = (type: OracleSiteIndexItem["type"]) =>
    byType(type)
      .slice(0, maxItemsPerSection)
      .map((item) => {
        const tags = item.tags?.length ? ` Tags: ${item.tags.join(", ")}.` : "";
        const excerpt = item.excerpt ? ` ${item.excerpt}` : "";
        return `- ${item.title} (${item.route}).${excerpt}${tags}`;
      })
      .join("\n");

  return [
    `Counts: ${items.length} indexed items; ${byType("Route").length} routes, ${byType("Topic").length} topics, ${byType("Host").length} hosts, ${byType("Episode").length} episodes.`,
    "",
    "Primary routes:",
    summarize("Route"),
    "",
    "Topics:",
    summarize("Topic"),
    "",
    "Hosts:",
    summarize("Host"),
    "",
    "Recent / available episodes:",
    summarize("Episode")
  ].join("\n");
}

