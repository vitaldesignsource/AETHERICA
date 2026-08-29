"use client";

import { useEffect, useState } from "react";

export type NavigatorPeriod = {
  /** DOM id of the full entry below, computed by the server component. */
  id: string;
  era: string;
  title: string;
  /** Prebuilt year text, so yearLabel stays defined in exactly one place. */
  label: string;
  startPct: number;
  widthPct: number;
  point: boolean;
  open?: boolean;
};

/**
 * Interactive mini-map for the chronology: every period drawn to scale on one strip, click to
 * travel to its entry, with the entry currently being read lit on the strip.
 *
 * A deliberate client island. The chronology's prose stays server-rendered (that boundary was
 * fought for when TopicDossier was split); the only thing shipped here is geometry and labels.
 * Periods alternate between two lanes so overlapping spans — Dionysius inside the Athenian
 * school, the Oracles inside the technical Hermetica — stay individually clickable.
 */
export function ChronologyNavigator({ periods }: { periods: NavigatorPeriod[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Scroll-spy: light the band whose entry is in the reading zone.
  useEffect(() => {
    const targets = periods
      .map((period) => document.getElementById(period.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // A band across the upper-middle of the viewport, roughly where a heading sits while read.
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [periods]);

  // The bands are real fragment links, so travel works before hydration and without JS at all —
  // the handler only upgrades the jump to a smooth scroll.
  const travel = (event: React.MouseEvent, id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setActiveId(id);
  };

  const readout = periods.find((period) => period.id === (hoverId ?? activeId)) ?? null;

  return (
    <div className="mt-6 rounded border border-gold/20 bg-black/35 p-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[.66rem] uppercase tracking-[.24em] text-gold">Navigator</p>
        <p className="text-[.7rem] text-limestone">Select a period to travel to it</p>
      </div>

      <div className="relative mt-3 h-9" role="group" aria-label="Timeline navigator">
        {/* Baseline the lanes hang around. */}
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold/20" aria-hidden="true" />
        {periods.map((period, index) => {
          const lit = period.id === activeId || period.id === hoverId;
          const lane = index % 2 === 0 ? "top-[6px]" : "bottom-[6px]";
          return (
            <a
              key={period.id}
              href={`#${period.id}`}
              onClick={(event) => travel(event, period.id)}
              onMouseEnter={() => setHoverId(period.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(period.id)}
              onBlur={() => setHoverId(null)}
              aria-label={`${period.era}: ${period.title}${period.label ? `, ${period.label}` : ""}`}
              aria-current={period.id === activeId ? "true" : undefined}
              className={`focus-ring absolute h-[9px] rounded-[2px] transition-colors duration-200 ${lane} ${
                period.point ? "-translate-x-1/2 rotate-45" : ""
              } ${
                lit
                  ? "bg-gold shadow-[0_0_10px_rgba(181,146,85,.65)]"
                  : "bg-gold/35 hover:bg-gold/60"
              }`}
              style={
                period.point
                  ? { left: `clamp(5px, ${period.startPct}%, calc(100% - 5px))`, width: "9px" }
                  : {
                      left: `${period.startPct}%`,
                      width: `max(10px, ${period.widthPct}%)`,
                      ...(period.open
                        ? {
                            background: lit
                              ? "linear-gradient(90deg, rgb(181,146,85) 55%, rgba(181,146,85,.1))"
                              : "linear-gradient(90deg, rgba(181,146,85,.35) 55%, rgba(181,146,85,.05))"
                          }
                        : {})
                    }
              }
            />
          );
        })}
      </div>

      {/* Fixed height so the readout swapping in and out never shifts the layout under the cursor. */}
      <p className="mt-2 min-h-10 text-sm leading-5" aria-live="polite">
        {readout ? (
          <>
            <span className="text-[.68rem] uppercase tracking-[.2em] text-gold">{readout.era}</span>
            {readout.label ? (
              <span className="ml-2 text-[.7rem] tabular-nums text-parchment/85">{readout.label}</span>
            ) : null}
            <span className="block text-ivory">{readout.title}</span>
          </>
        ) : (
          <span className="text-limestone">The strip draws every period to scale on one axis.</span>
        )}
      </p>
    </div>
  );
}
