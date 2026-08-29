import Link from "next/link";
import { CircleDot, Clock3, Hexagon, Moon, Star, Telescope, TreeDeciduous, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Instrument = {
  title: string;
  href: string;
  detail: string;
  icon: LucideIcon;
  tradition: string;
};

const instruments: Instrument[] = [
  {
    title: "Planetary Hours",
    href: "/resources/planetary-hours",
    detail: "Sunrise-based unequal hours and their traditional rulers for any date and place.",
    icon: Clock3,
    tradition: "Hermetic"
  },
  {
    title: "Celestial Instrument",
    href: "/resources/celestial-instrument",
    detail: "Live sky, chart casting, dignities, Hermetic lots, and electional gates.",
    icon: Telescope,
    tradition: "Astrological"
  },
  {
    title: "Tree of Life",
    href: "/resources/tree-of-life",
    detail: "Sephiroth, paths, and the correspondences mapped across the Hermetic tree.",
    icon: TreeDeciduous,
    tradition: "Qabalistic"
  },
  {
    title: "Tattvic Tides",
    href: "/resources/tattvic-tides",
    detail: "Elemental tides cycling from sunrise through the five tattvas.",
    icon: Waves,
    tradition: "Theosophical"
  },
  {
    title: "Bagua Instrument",
    href: "/resources/bagua",
    detail: "Eight Trigrams, Earlier and Later Heaven arrangements, and line transformations.",
    icon: Hexagon,
    tradition: "Taoist"
  },
  {
    title: "Lunar Mansions",
    href: "/resources/lunar-mansions",
    detail: "The Moon's passage through the twenty-eight mansions of the sky.",
    icon: Moon,
    tradition: "Astrological"
  },
  {
    title: "Taoist Organ Clock",
    href: "/resources/organ-clock",
    detail: "The twelve-period organ-meridian cycle as an educational model.",
    icon: CircleDot,
    tradition: "Taoist"
  },
  {
    title: "Fixed Stars",
    href: "/resources/fixed-stars",
    detail: "Contacts between luminaries and the traditional fixed stars.",
    icon: Star,
    tradition: "Astrological"
  }
];

export function InstrumentShowcase({ total }: { total: number }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">Working instruments</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            Calculate the hour, not just read about it
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-parchment">
            {total} interactive instruments compute planetary hours, elemental tides, lunar mansions, and
            correspondence tables live for your date and location.
          </p>
        </div>
        <Link
          href="/resources"
          className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm uppercase tracking-[.18em] text-gold transition hover:text-ivory"
        >
          All {total} instruments →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {instruments.map((instrument) => {
          const Icon = instrument.icon;
          return (
            <Link
              key={instrument.href}
              href={instrument.href}
              className="focus-ring group relative isolate flex flex-col overflow-hidden rounded border border-gold/25 bg-black/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-gold/55 hover:shadow-[0_0_0_1px_rgba(181,146,85,.34),0_22px_60px_rgba(0,0,0,.55),0_0_54px_rgba(181,146,85,.1)]"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(181,146,85,.14),transparent_44%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <Icon
                aria-hidden
                className="h-6 w-6 text-gold transition duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(181,146,85,.5)]"
                strokeWidth={1.4}
              />
              <p className="mt-4 text-[.65rem] uppercase tracking-[.22em] text-gold/75">{instrument.tradition}</p>
              <h3 className="mt-1 font-display text-xl text-ivory">{instrument.title}</h3>
              <p className="mt-2 text-sm leading-6 text-parchment/85">{instrument.detail}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
