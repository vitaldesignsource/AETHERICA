import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
      <Image
        src="/images/aetherica-hero.png"
        alt="Ancient stone archive with arches, manuscript light, and Rosicrucian architectural details"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/45 via-obsidian/55 to-obsidian" />
      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-cinzel-brand mb-5 text-xs text-gold">Ætherica Podcast</p>
          <h1 className="aetherica-entrance-word font-cinzel-brand text-5xl leading-[.95] text-ivory sm:text-7xl lg:text-8xl" data-text="Ætherica">
            Ætherica
          </h1>
          <p className="mt-5 text-xl text-gold sm:text-2xl">{siteConfig.tagline}</p>
          <p className="mt-4 text-lg text-parchment sm:text-xl">
            For the Modern{" "}
            <span className="font-manuscript-title font-display text-2xl italic text-ivory drop-shadow-[0_0_16px_rgba(181,146,85,.34)] sm:text-3xl">
              Philosopher Magician
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/episodes">Listen Now</Button>
            <Button href="/archive" variant="secondary">Explore the Archive</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  );
}
