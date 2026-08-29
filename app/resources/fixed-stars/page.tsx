import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Fixed-Star Reference",
  description: "Compare the Sun and Moon to a compact fixed-star reference set."
};

export default function FixedStarsPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Celestial timing" title="Fixed-Star Reference">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Explore a compact set of major fixed stars and compare their zodiacal longitudes to the approximate Sun and Moon positions.</p>
      </div>
      <CelestialTimingSuite initialTab="fixed-stars" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
