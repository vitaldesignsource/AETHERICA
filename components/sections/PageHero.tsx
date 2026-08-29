import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Full-bleed page opening: artwork behind, editorial text in front.
 *
 * Two crossed scrims rather than one flat overlay — a vertical fade seats the plate against the
 * page, and a horizontal one keeps the text column dark enough for body copy to stay legible over
 * a busy image. `imageSrc` may be null, in which case a composed gradient stands in so a page
 * whose art has not been added yet still opens deliberately instead of looking broken.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  imageSrc,
  imageAlt,
  focus = "50% 40%",
  children
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  imageSrc: string | null;
  imageAlt: string;
  /** object-position for the plate, so the subject stays framed as the viewport narrows. */
  focus?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-gold/20">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: focus }}
            className="-z-20 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,.78),rgba(8,8,8,.3)_44%,rgba(8,8,8,.92))]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.93)_16%,rgba(8,8,8,.5)_54%,rgba(8,8,8,.18))]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(181,146,85,.16),transparent_40%),linear-gradient(180deg,rgba(8,8,8,.9),rgba(8,8,8,.98))]" />
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-xs uppercase tracking-[.32em] text-gold">{eyebrow}</p>
        <h1 className="font-manuscript-title mt-4 max-w-3xl text-4xl leading-none text-ivory sm:text-6xl">
          {title}
        </h1>
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment">{lede}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
