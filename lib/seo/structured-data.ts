import { siteConfig } from "@/lib/site";
import type { Episode, EventItem } from "@/lib/data/types";

const absolute = (path: string) => (path.startsWith("http") ? path : `${siteConfig.url}${path}`);

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/images/aetherica-logo-metallic.png"),
    description: siteConfig.description,
    sameAs: siteConfig.socialLinks.map(([, url]) => url)
  };
}

/**
 * The site IS a podcast, but nothing said so in machine-readable terms — only individual episodes
 * carried PodcastEpisode. This declares the series itself so the episodes have a real parent.
 */
export function podcastSeriesJsonLd() {
  const rss = process.env.PODCAST_RSS_URL;
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absolute("/images/aetherica-hero.png"),
    ...(rss ? { webFeed: rss } : {}),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }
  };
}

/** Enables the sitelinks search box, and names the site for search engines. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Breadcrumbs give search results a readable hierarchy instead of a bare URL. Pass the trail
 * without the site root; it is prepended here.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path)
    }))
  };
}

export function episodeJsonLd(episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    url: `${siteConfig.url}/episodes/${episode.slug}`,
    datePublished: episode.publishedAt,
    episodeNumber: episode.number,
    image: episode.coverImage ? absolute(episode.coverImage) : undefined,
    keywords: episode.topics?.length ? episode.topics.join(", ") : undefined,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: siteConfig.name,
      url: siteConfig.url
    },
    associatedMedia: {
      "@type": "AudioObject",
      contentUrl: episode.audioUrl ?? episode.youtubeUrl,
      duration: `PT${episode.durationSeconds}S`
    }
  };
}

export function eventJsonLd(event: EventItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.shortDescription,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus:
      event.status === "cancelled"
        ? "https://schema.org/EventCancelled"
        : event.status === "postponed"
          ? "https://schema.org/EventPostponed"
          : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location
    },
    performer: event.speakers.map((name) => ({ "@type": "Person", name }))
  };
}
