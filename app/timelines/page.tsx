import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { timelines } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "Timelines",
  description: "Interactive Aetherica timelines for Hermeticism, theurgy, Freemasonry, Christian esotericism, alchemy, and astrology."
};

export default function TimelinesPage() {
  const groups = Array.from(new Set(timelines.map((point) => point.topic)));

  return (
    <Section eyebrow="Interactive timelines" title="Historical maps for the archive">
      <div className="grid gap-10">
        {groups.map((group) => (
          <section key={group}>
            <h2 className="font-display text-3xl text-ivory">{group}</h2>
            <div className="mt-5 grid gap-4 border-l border-gold/30 pl-5">
              {timelines.filter((point) => point.topic === group).map((point) => (
                <article key={`${point.year}-${point.title}`} className="relative temple-border rounded p-5">
                  <span className="absolute -left-[31px] top-6 size-3 rounded-full bg-gold shadow-[0_0_18px_rgba(181,146,85,.7)]" />
                  <p className="text-sm uppercase tracking-[.18em] text-gold">{point.year}</p>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{point.title}</h3>
                  <p className="mt-3 leading-7 text-parchment">{point.summary}</p>
                  {point.episodeSlug ? (
                    <Link href={`/episodes/${point.episodeSlug}`} className="focus-ring mt-4 inline-flex rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10">
                      Related episode
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
