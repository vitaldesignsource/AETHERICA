import { ChevronLeft, ChevronRight } from "lucide-react";

export function LivingArchiveControls({
  onPrevious,
  onNext,
  disabled
}: {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}) {
  if (disabled) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 hidden -translate-y-1/2 justify-between px-1 sm:flex">
      <button
        type="button"
        aria-label="Previous archive portal"
        className="focus-ring pointer-events-auto grid size-12 place-items-center rounded-full border border-gold/50 bg-black/74 text-gold shadow-aureate backdrop-blur hover:bg-gold hover:text-obsidian"
        onClick={onPrevious}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        aria-label="Next archive portal"
        className="focus-ring pointer-events-auto grid size-12 place-items-center rounded-full border border-gold/50 bg-black/74 text-gold shadow-aureate backdrop-blur hover:bg-gold hover:text-obsidian"
        onClick={onNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
