// Server component. No "use client": no state, no effects, no event handlers.
import { CalendarDays } from "lucide-react";
import { ChronologyNavigator, type NavigatorPeriod } from "@/components/topics/dossier/ChronologyNavigator";
import type { TopicDossier } from "@/lib/data/topicDossiers";

type Entry = TopicDossier["timeline"][number];
type Dated = Entry & { startYear: number; endYear: number };

const MIN_GAP_YEARS = 25;

const isDated = (e: Entry): e is Dated =>
  typeof e.startYear === "number" && typeof e.endYear === "number" && e.endYear >= e.startYear;

const yearLabel = (y: number) => (y < 0 ? `${-y} BCE` : y < 1000 ? `${y} CE` : String(y));

/** Rules at ruleStep, labels at twice that. Ends are culled so nothing collides with the
 *  axis endpoints; the >4 guard degrades a future dense topic to every-other label. */
function buildTicks(start: number, end: number) {
  const span = end - start;
  const ruleStep = span > 1200 ? 250 : span > 400 ? 100 : 50;
  const rules: number[] = [];
  for (let y = Math.ceil(start / ruleStep) * ruleStep; y < end; y += ruleStep) {
    if ((y - start) / span > 0.06 && (end - y) / span > 0.07) rules.push(y);
  }
  const labels = rules.filter((y) => y % (ruleStep * 2) === 0);
  return { rules, labels: labels.length > 4 ? labels.filter((_, i) => i % 2 === 0) : labels };
}

type Gap = { from: number; to: number; years: number };

/**
 * The gap preceding each entry, measured against the furthest year reached so far.
 *
 * Running max rather than "previous entry" is what makes containment correct with no special
 * case: an entry nested inside an earlier span starts before `reach` and so emits nothing.
 * Lives outside the component because it carries a running accumulator, which the React
 * compiler will not allow to be reassigned inside render.
 */
function computeGaps(timeline: Entry[], usable: boolean): (Gap | null)[] {
  let reach = Number.NEGATIVE_INFINITY;
  const gaps: (Gap | null)[] = [];

  for (const entry of timeline) {
    if (!usable || !isDated(entry)) {
      gaps.push(null);
      continue;
    }
    const from = reach;
    const years = entry.startYear - from;
    reach = Math.max(reach, entry.endYear);
    gaps.push(Number.isFinite(from) && years >= MIN_GAP_YEARS ? { from, to: entry.startYear, years } : null);
  }

  return gaps;
}

export function TopicChronology({ timeline }: { timeline: Entry[] }) {
  const dated = timeline.filter(isDated);
  const axisStart = dated.length ? Math.min(...dated.map((e) => e.startYear)) : 0;
  const axisEnd = dated.length ? Math.max(...dated.map((e) => e.endYear)) : 0;
  const span = axisEnd - axisStart;
  // Two dated entries and a positive span are the entire precondition. Also guards /0.
  const usable = dated.length >= 2 && span > 0;
  const pct = (y: number) => ((Math.min(Math.max(y, axisStart), axisEnd) - axisStart) / span) * 100;
  const { rules, labels } = usable ? buildTicks(axisStart, axisEnd) : { rules: [], labels: [] };
  const openEnd = dated.some((e) => e.open && e.endYear === axisEnd);

  const gaps = computeGaps(timeline, usable);

  // Anchor ids for click-to-travel. Index-prefixed so two entries sharing a title stay distinct.
  const entryId = (entry: Entry, index: number) =>
    `chron-${index}-${entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  const periods: NavigatorPeriod[] = usable
    ? timeline.flatMap((entry, index) => {
        if (!isDated(entry)) return [];
        const point = entry.startYear === entry.endYear;
        return [
          {
            id: entryId(entry, index),
            era: entry.era,
            title: entry.title,
            label: point
              ? yearLabel(entry.startYear)
              : `${yearLabel(entry.startYear)} – ${entry.open ? "present" : yearLabel(entry.endYear)}`,
            startPct: pct(entry.startYear),
            widthPct: pct(entry.endYear) - pct(entry.startYear),
            point,
            open: entry.open
          }
        ];
      })
    : [];

  return (
    <section className="temple-border rounded bg-black/46 p-5">
      <div className="flex items-center gap-3">
        <CalendarDays className="text-gold" size={20} aria-hidden="true" />
        <h2 className="font-display text-3xl text-ivory">Chronology</h2>
      </div>
      {/* Without `usable` there is no axis, no bars and no gaps, so the paragraph below would
          describe furniture the reader cannot see. A dossier whose timeline carries fewer than two
          dated entries gets the ordered-list reading instead. */}
      {usable ? (
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          Each period is drawn to its extent on one shared axis, so a three-hundred-year epoch runs
          three times the length of a hundred-year one. The boundaries are conventional rather than
          exact: a bar marks where the surviving evidence sits, not the year a tradition began or
          stopped. The empty stretches are part of the record — but a gap here means this dossier
          holds nothing in that interval, not that nothing happened in it.
        </p>
      ) : (
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          The periods below are listed in sequence. This dossier does not yet carry dates precise
          enough to draw them to scale against a shared axis.
        </p>
      )}

      {periods.length ? <ChronologyNavigator periods={periods} /> : null}

      <div className="relative mt-8">
        {usable ? (
          <>
            <div className="relative mb-4 h-4 text-[.68rem] uppercase tracking-[.16em] text-parchment/85">
              <span className="absolute left-0 top-0 tabular-nums">{yearLabel(axisStart)}</span>
              {labels.map((year) => (
                <span key={year} className="absolute top-0 -translate-x-1/2 tabular-nums" style={{ left: `${pct(year)}%` }}>
                  {year}
                </span>
              ))}
              <span className="absolute right-0 top-0 tabular-nums">
                {openEnd ? "present" : yearLabel(axisEnd)}
              </span>
            </div>

            {/* Rules run the full list height so bars can be compared across rows. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-8 z-0" aria-hidden="true">
              {rules.map((year) => (
                <span key={year} className="absolute bottom-0 top-0 w-px bg-gold/10" style={{ left: `${pct(year)}%` }} />
              ))}
            </div>
          </>
        ) : null}

        {/* role="list" restores semantics that Tailwind preflight's list-style:none strips in Safari/VO. */}
        <ol role="list" className="relative z-[1] grid gap-9">
          {timeline.map((entry, index) => {
            const gap = gaps[index];
            const point = isDated(entry) && entry.startYear === entry.endYear;
            return (
              <li key={`${entry.era}-${entry.title}`} id={entryId(entry, index)} className="scroll-mt-28">
                {gap ? (
                  <div className="mb-5">
                    <div className="relative h-2.5 w-full overflow-hidden rounded-[2px]" aria-hidden="true">
                      <span
                        className="absolute inset-y-0 border-x border-limestone/45"
                        style={{
                          left: `${pct(gap.from)}%`,
                          width: `${pct(gap.to) - pct(gap.from)}%`,
                          background:
                            "repeating-linear-gradient(45deg, rgba(129,118,107,.42) 0 2px, transparent 2px 6px)"
                        }}
                      />
                    </div>
                    <p className="mt-2 text-[.7rem] uppercase tracking-[.2em] text-gold">
                      Gap{" "}
                      <span className="tabular-nums normal-case tracking-[.06em] text-parchment/85">
                        · {yearLabel(gap.from)} – {yearLabel(gap.to)} · {gap.years} years
                      </span>
                    </p>
                    {entry.gapNote ? (
                      <p className="mt-1.5 max-w-3xl text-sm italic leading-6 text-parchment/85">{entry.gapNote}</p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-xs uppercase tracking-[.22em] text-gold">{entry.era}</p>
                  {usable && isDated(entry) ? (
                    <p className="text-[.7rem] tracking-[.06em] tabular-nums text-parchment/85">
                      {point
                        ? yearLabel(entry.startYear)
                        : `${yearLabel(entry.startYear)} – ${entry.open ? "present" : yearLabel(entry.endYear)}`}
                    </p>
                  ) : null}
                </div>

                {usable && isDated(entry) ? (
                  <div
                    className="relative mt-2.5 h-2.5 w-full overflow-hidden rounded-[2px] border border-gold/15"
                    aria-hidden="true"
                  >
                    {point ? (
                      <span
                        className="absolute top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/75 bg-gold/45"
                        style={{ left: `clamp(5px, ${pct(entry.startYear)}%, calc(100% - 5px))` }}
                      />
                    ) : (
                      <span
                        className="absolute inset-y-0"
                        style={{
                          left: `${pct(entry.startYear)}%`,
                          width: `max(3px, ${pct(entry.endYear) - pct(entry.startYear)}%)`,
                          background: entry.open
                            ? "linear-gradient(90deg, rgba(181,146,85,.88) 0%, rgba(181,146,85,.88) 55%, rgba(181,146,85,.06) 100%)"
                            : "rgba(181,146,85,.88)"
                        }}
                      />
                    )}
                  </div>
                ) : null}

                <h3 className="mt-3 font-display text-2xl leading-snug text-ivory">{entry.title}</h3>
                <p className="mt-1.5 max-w-3xl text-sm leading-7 text-parchment">{entry.summary}</p>

                {entry.note ? (
                  <p className="mt-2 max-w-3xl border-l border-gold/30 pl-3 text-sm italic leading-6 text-parchment/85">
                    {entry.note}
                  </p>
                ) : null}

                {entry.anchors?.length ? (
                  <div className="mt-3">
                    <p className="text-[.66rem] uppercase tracking-[.24em] text-gold">Fixed points</p>
                    <ul role="list" className="mt-1.5 grid gap-1">
                      {entry.anchors.map((item) => (
                        <li key={item} className="text-[.8rem] leading-6 text-parchment/85">{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
