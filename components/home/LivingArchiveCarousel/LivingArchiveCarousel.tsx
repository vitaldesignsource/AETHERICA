import type { Episode, EventItem, ListeningPath } from "@/lib/data/types";
import { activeLivingArchiveSlides, buildLivingArchiveSlides } from "./data";
import { LivingArchiveCarouselClient } from "./LivingArchiveCarouselClient";
import type { LivingArchiveSlide } from "./types";

export function LivingArchiveCarousel({
  featured,
  event,
  paths,
  slides
}: {
  featured?: Episode;
  event?: EventItem;
  paths?: ListeningPath[];
  slides?: LivingArchiveSlide[];
}) {
  const resolvedSlides = activeLivingArchiveSlides(
    slides ?? (featured ? buildLivingArchiveSlides({ featured, event, paths: paths ?? [] }) : [])
  );

  if (!resolvedSlides.length) return null;

  return (
    <section id="living-archive" aria-labelledby="living-archive-heading" className="relative overflow-hidden py-16">
      <LivingArchiveCarouselClient slides={resolvedSlides} />
    </section>
  );
}
