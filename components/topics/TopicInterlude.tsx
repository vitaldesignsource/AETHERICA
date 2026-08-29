import Image from "next/image";
import type { TopicPlate } from "@/lib/data/topicHeroes";

/**
 * Full-bleed band used to break a long page. Deliberately shallow so a portrait plate reads
 * as an establishing shot rather than competing with the hero.
 */
export function TopicInterlude({ plate, imageSrc }: { plate: TopicPlate; imageSrc: string | null }) {
  return (
    <section className="relative isolate my-4 h-[52svh] min-h-[340px] overflow-hidden border-y border-gold/20 sm:h-[58svh]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={plate.alt}
          fill
          sizes="100vw"
          style={{ objectPosition: plate.focus ?? "50% 50%" }}
          className="object-cover brightness-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,rgba(55,50,46,.85),rgba(8,8,8,1)_66%)]" />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.72)_0%,rgba(8,8,8,.16)_34%,rgba(8,8,8,.5)_72%,rgba(8,8,8,.95)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(181,146,85,.14),transparent_52%)] mix-blend-screen" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-cinzel-brand text-xs text-gold">{plate.label}</p>
          <p className="mt-3 text-lg leading-8 text-ivory/90 sm:text-xl">{plate.caption}</p>
        </div>
      </div>
    </section>
  );
}
