import type { Episode, EventItem, ListeningPath } from "@/lib/data/types";
import { formatDate } from "@/lib/format";
import type { LivingArchiveSlide } from "./types";

type BuildLivingArchiveSlidesInput = {
  featured: Episode;
  event?: EventItem;
  paths: ListeningPath[];
};

function pathListeningTime(path?: ListeningPath) {
  if (!path) return "Curated route";
  return `${path.steps.length} studies`;
}

function eventDate(event?: EventItem) {
  if (!event?.startDate) return "Demonstration date";
  return formatDate(event.startDate);
}

export function buildLivingArchiveSlides({ featured, event, paths }: BuildLivingArchiveSlidesInput): LivingArchiveSlide[] {
  const hermeticPath = paths.find((path) => path.slug === "foundations-of-hermeticism") ?? paths[0];
  const slideEvent = event;

  return [
    {
      id: "featured-transmission",
      type: "episode",
      eyebrow: "Featured Transmission",
      title: featured.title,
      description:
        featured.description ||
        "A selected passage from the Aetherica archive, ready for listening in the temple player.",
      image: {
        src: featured.coverImage,
        alt: `${featured.title} episode artwork`
      },
      visualStyle: "episode-art",
      symbol: "Solar Gate",
      theme: "crimson",
      metadata: [
        { label: "Episode", value: String(featured.number).padStart(2, "0") },
        { label: "Duration", value: featured.duration },
        { label: "Published", value: featured.publishedAt ? formatDate(featured.publishedAt) : featured.publishedLabel ?? "Archive" }
      ],
      primaryAction: {
        label: "View Episode",
        href: `/episodes/${featured.slug}`
      },
      secondaryAction: featured.youtubeUrl
        ? {
            label: "Watch on YouTube",
            href: featured.youtubeUrl
          }
        : {
            label: "Read Show Notes",
            href: `/episodes/${featured.slug}#show-notes`
          },
      audioAction: {
        episode: featured,
        label: "Play Episode"
      },
      source: { episode: featured }
    },
    {
      id: "foundations-of-hermeticism",
      type: "path",
      eyebrow: "Initiatic Listening Path",
      title: "Foundations of Hermeticism",
      description:
        hermeticPath?.summary ??
        "A guided entrance into Hermetic cosmology, symbolic literacy, correspondences, and disciplined listening.",
      image: {
        src: "/images/aetherica-hero.png",
        alt: "Aetherica archive artwork with luminous esoteric architecture"
      },
      visualStyle: "temple-corridor",
      symbol: "Threefold Corridor",
      theme: "gold",
      metadata: [
        { label: "Episodes", value: String(hermeticPath?.steps.filter((step) => step.episodeSlug).length ?? 3) },
        { label: "Chapters", value: String(hermeticPath?.steps.length ?? 3) },
        { label: "Time", value: pathListeningTime(hermeticPath) }
      ],
      primaryAction: {
        label: "Begin the Path",
        href: hermeticPath ? `/paths/${hermeticPath.slug}` : "/paths"
      },
      secondaryAction: {
        label: "View Path",
        href: hermeticPath ? `/paths/${hermeticPath.slug}` : "/paths"
      },
      source: { path: hermeticPath }
    },
    {
      id: "ask-aetherica",
      type: "ask-aetherica",
      eyebrow: "Search the Spoken Archive",
      title: "Ask Aetherica",
      description:
        "A research-oriented entry point for transcript passages, speakers, timestamps, chapters, and connected subjects.",
      image: {
        src: "/images/aetherica-hero.png",
        alt: "Cinematic Aetherica archive lens artwork"
      },
      visualStyle: "archive-lens",
      symbol: "Archive Lens",
      theme: "celestial",
      metadata: [
        { label: "Mode", value: "Transcript Search" },
        { label: "Returns", value: "Passages" },
        { label: "Status", value: "Preview" }
      ],
      primaryAction: {
        label: "Ask the Archive",
        href: "/search?q=divine%20names"
      },
      secondaryAction: {
        label: "Learn How It Works",
        href: "/research"
      },
      preview: {
        prompt: "What has Aetherica said about divine names?",
        resultTitle: "QABALISTICA: Kabbalah, Cabala, Qabalah",
        speaker: "Aetherica",
        timestamp: "00:42:17",
        relatedText: "Play-from-here preview"
      }
    },
    {
      id: "upcoming-appearance",
      type: "event",
      eyebrow: "Upcoming Appearance",
      title: slideEvent?.demo ? `${slideEvent.title} (demonstration)` : slideEvent?.title ?? "Demonstration Event: Aetherica Study Hall",
      description:
        slideEvent?.shortDescription ??
        "A clearly marked demonstration event slot prepared for verified appearances, lectures, courses, and gatherings.",
      image: {
        src: slideEvent?.imageUrl ?? "/images/aetherica-hero.png",
        alt: slideEvent ? `${slideEvent.title} event artwork` : "Aetherica event portal artwork"
      },
      visualStyle: "crimson-hall",
      symbol: "Crimson Calendar",
      theme: "stone",
      metadata: [
        { label: "Speaker", value: slideEvent?.speakers.join(", ") ?? "Ike Baker" },
        { label: "Date", value: eventDate(slideEvent) },
        { label: "Place", value: slideEvent?.location ?? "Online demonstration" }
      ],
      primaryAction: {
        label: "Get Details",
        href: slideEvent ? `/events/${slideEvent.slug}` : "/events"
      },
      secondaryAction: {
        label: "Add to Calendar",
        href: slideEvent ? `/api/events/${slideEvent.slug}/ics` : "/events"
      },
      source: { event: slideEvent }
    },
    {
      id: "weekly-mystery",
      type: "weekly-mystery",
      eyebrow: "The Weekly Mystery",
      title: "Is Symbol Merely Representative, or Can It Become Causative?",
      description:
        "A compact editorial question that opens into episodes, quotations, and related topics inside the living archive.",
      image: {
        src: "/images/aetherica-hero.png",
        alt: "Manuscript-like Aetherica mystery artwork"
      },
      visualStyle: "manuscript-table",
      symbol: "Rose Window",
      theme: "alchemical",
      metadata: [
        { label: "Related episodes", value: "8+" },
        { label: "Featured", value: "Quotation" },
        { label: "Route", value: "Symbolism" }
      ],
      primaryAction: {
        label: "Explore the Question",
        href: "/topics/symbolism"
      },
      secondaryAction: {
        label: "Open Commonplace Book",
        href: "/commonplace"
      }
    }
  ];
}

export function activeLivingArchiveSlides(slides: LivingArchiveSlide[], now = new Date()) {
  return slides.filter((slide) => {
    if (slide.active === false) return false;
    const startsAt = slide.startsAt ? new Date(slide.startsAt) : null;
    const endsAt = slide.endsAt ? new Date(slide.endsAt) : null;
    if (startsAt && startsAt > now) return false;
    if (endsAt && endsAt < now) return false;
    return true;
  });
}
