import Image from "next/image";
import type { TopicHero as TopicHeroData } from "@/lib/data/topicHeroes";
import type { Topic } from "@/lib/data/types";

export function TopicHero({
  topic,
  hero,
  imageSrc
}: {
  topic: Topic;
  hero: TopicHeroData;
  imageSrc: string | null;
}) {
  return (
    <section className="relative isolate -mt-px min-h-[80svh] overflow-hidden border-b border-gold/20">
      {/*
        The art is portrait. Letterboxing it across a wide hero crops the subject away, so on
        large screens it occupies a tall right-hand panel where the full composition survives,
        and only on narrow screens — where the viewport is portrait too — does it go full-bleed.
      */}
      <div className="absolute inset-0 lg:left-[38%]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            style={{ objectPosition: hero.focus ?? "50% 40%" }}
            className="object-cover brightness-[1.32] contrast-[1.06] saturate-[.92]"
          />
        ) : (
          /* Placeholder plate until the art is added — keeps the hero composed rather than broken. */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(55,50,46,.9),rgba(8,8,8,1)_64%),repeating-linear-gradient(122deg,rgba(181,146,85,.05)_0_2px,transparent_2px_22px)]" />
        )}
      </div>

      {/* Narrow screens: vertical plate so the text reads over the full-bleed art. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.74)_0%,rgba(8,8,8,.14)_26%,rgba(8,8,8,.2)_54%,rgba(8,8,8,.94)_100%)] lg:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_94%_50%_at_42%_80%,rgba(8,8,8,.84),transparent_74%)] lg:hidden" />

      {/* Wide screens: horizontal blend that dissolves the panel seam into the text field. */}
      <div className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(90deg,#080808_0%,#080808_30%,rgba(8,8,8,.92)_42%,rgba(8,8,8,.34)_56%,transparent_74%)]" />
      <div className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(180deg,rgba(8,8,8,.6)_0%,transparent_22%,transparent_68%,rgba(8,8,8,.88)_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(181,146,85,.15),transparent_42%),radial-gradient(circle_at_14%_88%,rgba(122,17,26,.16),transparent_48%)] mix-blend-screen" />

      {/* Slow upward drift of motes — reads as spray off the fountain rather than dust. */}
      <div className="alchemy-motes pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:items-center lg:px-8 lg:pb-24">
        <div className="max-w-3xl lg:max-w-[34rem]">
          <p className="font-cinzel-brand text-xs text-gold">{hero.kicker}</p>

          <h1
            className="aetherica-entrance-word font-cinzel-brand mt-4 text-5xl leading-[.95] text-ivory sm:text-7xl lg:text-[5.25rem]"
            data-text={topic.title}
          >
            {topic.title}
          </h1>

          <div className="manuscript-rule mt-7 max-w-md" aria-hidden />

          <p className="mt-6 max-w-2xl text-xl leading-9 text-parchment sm:text-2xl">{topic.definition}</p>

          {hero.epigraph ? (
            <p className="font-manuscript-title mt-6 max-w-xl border-l border-gold/40 pl-5 font-display text-lg italic leading-8 text-ivory/90 drop-shadow-[0_0_18px_rgba(181,146,85,.28)] sm:text-xl">
              {hero.epigraph}
            </p>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
