import type { MetadataRoute } from "next";
import { episodes, events, guests, hosts, topics } from "@/lib/data/demo";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/episodes",
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
    "/resources/celestial-instrument",
    "/resources/bagua",
    "/resources/chakra-observatory",
    "/resources/five-phases",
    "/resources/he-tu-luo-shu",
    "/resources/internal-alchemy",
    "/resources/meridians",
    "/resources/microcosmic-orbit",
    "/resources/organ-clock",
    "/resources/stratified-human",
    "/resources/taijitu-polarity",
    "/resources/taoist-correspondences",
    "/resources/taoist-cosmology",
    "/resources/taoist-symbols",
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
    "/search",
    "/contact"
  ];
  // Deliberately absent: "/archive" and "/astrology" render the same components as "/episodes" and
  // "/resources/celestial-instrument". Listing both halves of a pair splits their ranking signals.
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })),
    ...episodes.map((episode) => ({ url: `${siteConfig.url}/episodes/${episode.slug}`, lastModified: episode.publishedAt ? new Date(episode.publishedAt) : new Date() })),
    ...topics.map((topic) => ({ url: `${siteConfig.url}/topics/${topic.slug}`, lastModified: new Date() })),
    // Hosts appear in `guests` too; their guest page canonicalises to /hosts/<slug>, so only real
    // guests are submitted here.
    ...guests
      .filter((guest) => guest.profileType !== "host")
      .map((guest) => ({ url: `${siteConfig.url}/guests/${guest.slug}`, lastModified: new Date() })),
    ...hosts.map((host) => ({ url: `${siteConfig.url}/hosts/${host.slug}`, lastModified: new Date() })),
    ...events.map((event) => ({ url: `${siteConfig.url}/events/${event.slug}`, lastModified: new Date(event.startDate) }))
  ];
}
