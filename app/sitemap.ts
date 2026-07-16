import type { MetadataRoute } from "next";
import { episodes, events, guests, hosts, topics } from "@/lib/data/demo";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/episodes",
    "/archive",
    "/research",
    "/resources",
    "/resources/celestial-timing",
    "/resources/decan-calculator",
    "/resources/election-planner",
    "/resources/fixed-stars",
    "/resources/gematria",
    "/resources/golden-dawn-correspondences",
    "/resources/hebrew-letters",
    "/resources/hebrew-transliteration",
    "/resources/lunar-mansions",
    "/resources/moon-phase",
    "/resources/planetary-hours",
    "/resources/planetary-day",
    "/resources/planetary-correspondences",
    "/resources/sacred-calendar",
    "/resources/tattvic-tides",
    "/resources/tarot-correspondences",
    "/resources/timing-journal",
    "/resources/tree-of-life",
    "/resources/zodiacal-hours",
    "/paths",
    "/chapters",
    "/constellations",
    "/timelines",
    "/commonplace",
    "/topics",
    "/guests",
    "/hosts",
    "/events",
    "/library",
    "/about",
    "/search"
  ];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })),
    ...episodes.map((episode) => ({ url: `${siteConfig.url}/episodes/${episode.slug}`, lastModified: episode.publishedAt ? new Date(episode.publishedAt) : new Date() })),
    ...topics.map((topic) => ({ url: `${siteConfig.url}/topics/${topic.slug}`, lastModified: new Date() })),
    ...guests.map((guest) => ({ url: `${siteConfig.url}/guests/${guest.slug}`, lastModified: new Date() })),
    ...hosts.map((host) => ({ url: `${siteConfig.url}/hosts/${host.slug}`, lastModified: new Date() })),
    ...events.map((event) => ({ url: `${siteConfig.url}/events/${event.slug}`, lastModified: new Date(event.startDate) }))
  ];
}
