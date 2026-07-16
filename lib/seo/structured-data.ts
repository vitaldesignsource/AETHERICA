import { siteConfig } from "@/lib/site";
import type { Episode, EventItem } from "@/lib/data/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.socialLinks.map(([, url]) => url)
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
