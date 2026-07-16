import { PlanetaryHeptagram } from "@/components/sections/PlanetaryHeptagram";

export function AboutEsotericBanner() {
  return (
    <div className="about-aether-banner relative mb-10 overflow-hidden">
      <div className="about-aether-banner__atmosphere absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(181,146,85,.24),transparent_18rem),radial-gradient(circle_at_18%_68%,rgba(122,17,26,.24),transparent_18rem),linear-gradient(115deg,rgba(8,8,8,.2),rgba(8,8,8,.78))]" />
        <div className="about-aether-banner__stars absolute inset-0 opacity-70" />
        <div className="about-aether-banner__veil absolute inset-0" />
      </div>

      <div className="relative grid min-h-[18rem] items-center gap-8 px-5 py-8 sm:min-h-[22rem] sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[.36em] text-gold">The Astral Garden</p>
          <h1 className="font-manuscript-title mt-4 text-5xl leading-none text-ivory sm:text-7xl lg:text-8xl">
            About Aetherica
          </h1>
          <div className="mt-6 h-px w-full max-w-md bg-gradient-to-r from-gold/80 via-crimson/50 to-transparent" />
        </div>

        <PlanetaryHeptagram />
      </div>
    </div>
  );
}
