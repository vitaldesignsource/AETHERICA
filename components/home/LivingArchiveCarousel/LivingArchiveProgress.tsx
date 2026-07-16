import type { LivingArchiveSlide } from "./types";

export function LivingArchiveProgress({
  slides,
  activeIndex,
  onSelect
}: {
  slides: LivingArchiveSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  if (slides.length <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-label="Archive portal slides">
      <span className="sr-only" aria-live="polite">
        Portal {activeIndex + 1} of {slides.length}: {slides[activeIndex]?.title}
      </span>
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          aria-label={`Go to slide: ${slide.title}`}
          aria-current={activeIndex === index ? "true" : undefined}
          className={`focus-ring grid size-11 place-items-center rounded-full border text-xs font-semibold transition ${
            activeIndex === index
              ? "border-gold bg-gold text-obsidian shadow-[0_0_24px_rgba(181,146,85,.35)]"
              : "border-gold/40 bg-black/50 text-parchment hover:border-gold hover:text-ivory"
          }`}
          onClick={() => onSelect(index)}
        >
          {String(index + 1).padStart(2, "0")}
        </button>
      ))}
      <span className="ml-1 text-xs uppercase tracking-[.22em] text-parchment">
        {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  );
}
