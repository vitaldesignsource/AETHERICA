import Link from "next/link";
import { BookMarked, Compass, Info, TriangleAlert } from "lucide-react";

export type InstrumentBriefData = {
  /** What the instrument is, and where the tradition it draws on comes from. */
  tradition: string[];
  /** How to read what the instrument puts on screen. */
  reading: string[];
  /** Named works the system descends from. Titles only — no page claims. */
  sources: { title: string; note: string }[];
  /** Honest statement of what the calculation does and does not promise. */
  caveat: string;
  related: { href: string; label: string }[];
  topics?: { href: string; label: string }[];
};

/**
 * Editorial frame around an instrument. The instruments themselves were doing all the work while
 * their pages carried a single sentence, so a reader arriving cold had no way to know what the
 * thing computes, which tradition it belongs to, or how far to trust the numbers.
 */
export function InstrumentBrief({ brief }: { brief: InstrumentBriefData }) {
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-2">
      <section className="temple-border rounded bg-black/40 p-6">
        <div className="flex items-center gap-3">
          <Info className="text-gold" size={18} aria-hidden="true" />
          <h2 className="font-display text-2xl text-ivory">The tradition</h2>
        </div>
        <div className="mt-4 grid gap-4 leading-7 text-parchment">
          {brief.tradition.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="temple-border rounded bg-black/40 p-6">
        <div className="flex items-center gap-3">
          <Compass className="text-gold" size={18} aria-hidden="true" />
          <h2 className="font-display text-2xl text-ivory">Reading the instrument</h2>
        </div>
        <ul role="list" className="mt-4 grid gap-3">
          {brief.reading.map((line) => (
            <li key={line} className="border-l border-gold/25 pl-4 leading-7 text-parchment">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="temple-border rounded bg-black/40 p-6">
        <div className="flex items-center gap-3">
          <BookMarked className="text-gold" size={18} aria-hidden="true" />
          <h2 className="font-display text-2xl text-ivory">Where it descends from</h2>
        </div>
        <dl className="mt-4 grid gap-4">
          {brief.sources.map((source) => (
            <div key={source.title}>
              <dt className="font-display text-lg text-ivory">{source.title}</dt>
              <dd className="mt-1 text-sm leading-6 text-parchment">{source.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid content-start gap-6">
        <section className="rounded border border-crimson/40 bg-crimson/10 p-6">
          <div className="flex items-center gap-3">
            <TriangleAlert className="text-crimson" size={18} aria-hidden="true" />
            <h2 className="font-display text-2xl text-ivory">What this does not claim</h2>
          </div>
          <p className="mt-4 leading-7 text-parchment">{brief.caveat}</p>
        </section>

        <section className="temple-border rounded bg-black/40 p-6">
          <h2 className="font-display text-2xl text-ivory">Continue</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {brief.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded border border-gold/30 px-3 py-2 text-sm text-parchment transition hover:bg-gold/10 hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {brief.topics?.length ? (
            <div className="mt-5 border-t border-gold/15 pt-4">
              <p className="text-[10px] uppercase tracking-[.2em] text-gold">Read the subject</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {brief.topics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="focus-ring rounded-full border border-gold/25 px-3 py-1.5 text-xs uppercase tracking-[.12em] text-gold transition hover:bg-gold/10 hover:text-ivory"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
