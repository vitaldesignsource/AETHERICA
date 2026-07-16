"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { KeyboardEvent, PointerEvent } from "react";
import { LivingArchiveBackground } from "./LivingArchiveBackground";
import { LivingArchiveControls } from "./LivingArchiveControls";
import { LivingArchiveProgress } from "./LivingArchiveProgress";
import { LivingArchiveSlide } from "./LivingArchiveSlide";
import type { LivingArchiveSlide as LivingArchiveSlideType } from "./types";

const swipeThreshold = 58;

function wrapIndex(index: number, total: number) {
  if (!total) return 0;
  return (index + total) % total;
}

export function LivingArchiveCarouselClient({ slides }: { slides: LivingArchiveSlideType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  const selectSlide = useCallback((index: number) => {
    setActiveIndex(wrapIndex(index, slides.length));
  }, [slides.length]);

  const previous = useCallback(() => selectSlide(activeIndex - 1), [activeIndex, selectSlide]);
  const next = useCallback(() => selectSlide(activeIndex + 1), [activeIndex, selectSlide]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectSlide(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectSlide(slides.length - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides || (event.pointerType === "mouse" && event.button !== 0)) return;
    pointerStart.current = event.clientX;
    setDragActive(false);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    if (Math.abs(event.clientX - pointerStart.current) > 8) setDragActive(true);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    window.setTimeout(() => setDragActive(false), 0);
    if (Math.abs(delta) < swipeThreshold) return;
    if (delta > 0) previous();
    else next();
  };

  const rotation = useMemo(() => (reduceMotion ? 0 : activeIndex * 8), [activeIndex, reduceMotion]);

  if (!slides.length) return null;

  return (
    <div
      className="relative isolate mx-auto mt-8 max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16"
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Living Archive portal carousel. Use arrow keys to move between portals."
    >
      <LivingArchiveBackground theme={activeSlide?.theme} rotation={rotation} />
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mx-auto mb-7 flex max-w-2xl items-center justify-center gap-4 px-2">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/45 to-gold/20" aria-hidden="true" />
          <p className="shrink-0 text-xs uppercase tracking-[.34em] text-gold sm:tracking-[.42em]">Enter the Living Archive</p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/45 to-gold/20" aria-hidden="true" />
        </div>
        <h2 id="living-archive-heading" className="font-manuscript-title font-display text-4xl leading-none text-ivory sm:text-6xl">
          Choose a Portal Into <span className="font-cinzel-brand text-[.78em] text-ivory">Ætherica</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-parchment">
          Move through episodes, guided paths, transcript search, appearances, and weekly mysteries as connected chambers of one research archive.
        </p>
      </div>

      <motion.div
        className="relative mx-auto h-[700px] min-h-[700px] overflow-visible outline-none [perspective:1400px] sm:h-[720px] sm:min-h-[720px] lg:h-[760px] lg:min-h-[760px] xl:h-[790px] xl:min-h-[790px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
          setDragActive(false);
        }}
        data-testid="living-archive-stage"
      >
        <div className="pointer-events-none absolute inset-x-[7%] top-6 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        {slides.map((slide, index) => (
          <LivingArchiveSlide
            key={slide.id}
            slide={slide}
            index={index}
            activeIndex={activeIndex}
            total={slides.length}
            onSelect={selectSlide}
            dragActive={dragActive}
          />
        ))}
        <LivingArchiveControls onPrevious={previous} onNext={next} disabled={!hasMultipleSlides} />
      </motion.div>

      <div className="mt-4 flex justify-center gap-3 sm:hidden">
        <button
          type="button"
          className="focus-ring min-h-11 rounded border border-gold/45 px-4 text-sm uppercase tracking-[.14em] text-ivory"
          onClick={previous}
          disabled={!hasMultipleSlides}
        >
          Previous
        </button>
        <button
          type="button"
          className="focus-ring min-h-11 rounded border border-gold/45 px-4 text-sm uppercase tracking-[.14em] text-ivory"
          onClick={next}
          disabled={!hasMultipleSlides}
        >
          Next
        </button>
      </div>

      <LivingArchiveProgress slides={slides} activeIndex={activeIndex} onSelect={selectSlide} />
    </div>
  );
}
