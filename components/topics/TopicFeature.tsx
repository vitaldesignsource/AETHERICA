import Image from "next/image";
import type { ReactNode } from "react";
import type { TopicPlate } from "@/lib/data/topicHeroes";

/**
 * Editorial pairing: framed art on one side, prose on the other. The art keeps its portrait
 * aspect rather than being cropped to a strip, so detailed plates stay readable.
 */
export function TopicFeature({
  plate,
  imageSrc,
  children
}: {
  plate: TopicPlate;
  imageSrc: string | null;
  children: ReactNode;
}) {
  const captionId = `topic-plate-${plate.image.split("/").pop()}`;

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <figure
        aria-describedby={captionId}
        className="relative isolate self-start overflow-hidden rounded border border-gold/25 bg-black/60 shadow-aureate lg:sticky lg:top-24"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={plate.alt}
              fill
              // The figure caps at 544px inside Section's max-w-7xl, so a flat 42vw would keep
              // scaling past 1280px and pull a needlessly large variant.
              sizes="(min-width: 1280px) 544px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              style={{ objectPosition: plate.focus ?? "50% 50%" }}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(55,50,46,.85),rgba(8,8,8,1)_66%)]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,8,8,.82)_100%)]" />
          <div className="pointer-events-none absolute inset-3 border border-gold/15" />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[.7rem] uppercase tracking-[.2em] text-gold">{plate.label}</p>
        </figcaption>
      </figure>

      <div className="leading-8 text-parchment">
        <h3 className="font-manuscript-title mb-5 font-display text-4xl text-ivory">{plate.label}</h3>
        {children}
        <p
          id={captionId}
          className="font-manuscript-title mt-6 border-l border-gold/35 pl-5 font-display text-lg italic leading-8 text-ivory/85"
        >
          {plate.caption}
        </p>
      </div>
    </div>
  );
}
