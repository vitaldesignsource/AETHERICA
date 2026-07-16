import { PlanetaryHeptagram } from "@/components/sections/PlanetaryHeptagram";

type ExploreArchiveHeaderProps = {
  episodeCount: number;
  chapterCount: number;
  transcriptCount: number;
};

export function ExploreArchiveHeader({ episodeCount, chapterCount, transcriptCount }: ExploreArchiveHeaderProps) {
  const stats = [
    { label: "Episodes", value: episodeCount },
    { label: "Chapters", value: chapterCount },
    { label: "Transcripts", value: transcriptCount }
  ];

  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="explore-archive-hero temple-border relative overflow-hidden rounded">
        <div className="explore-archive-hero__stars absolute inset-0" aria-hidden="true" />
        <div className="explore-archive-hero__grid absolute inset-0" aria-hidden="true" />
        <div className="explore-archive-hero__veil absolute inset-0" aria-hidden="true" />
        <div className="explore-archive-hero__current absolute inset-x-0 top-1/2" aria-hidden="true" />

        <div className="relative grid min-h-[24rem] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-12">
          <div className="flex max-w-3xl flex-col justify-center">
            <p className="text-xs uppercase tracking-[.38em] text-gold">Explore the archive</p>
            <h1 className="font-manuscript-title mt-4 max-w-4xl text-5xl leading-none text-ivory sm:text-7xl">
              Browse the living index of Aetherica
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-parchment sm:text-lg">
              Move through episodes, chapters, guests, topics, and transcript-rich paths as one connected research field.
            </p>

            <dl className="mt-7 grid max-w-2xl gap-5 sm:grid-cols-3 sm:gap-0">
              {stats.map((stat) => (
                <div key={stat.label} className="py-2 sm:border-l sm:border-gold/25 sm:px-5 first:sm:border-l-0 first:sm:pl-0">
                  <dt className="text-xs uppercase tracking-[.22em] text-gold">{stat.label}</dt>
                  <dd className="mt-1 font-display text-3xl text-ivory">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex w-full max-w-[30rem] items-center justify-center">
            <PlanetaryHeptagram className="max-w-[26rem] drop-shadow-[0_22px_52px_rgba(0,0,0,.45)]" />
          </div>
        </div>
      </div>
    </header>
  );
}
