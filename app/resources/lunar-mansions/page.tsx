import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { InstrumentBrief } from "@/components/resources/InstrumentBrief";
import { instrumentBriefs } from "@/lib/data/instrumentBriefs";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Lunar Mansion Calculator",
  description: "Locate the Moon in an approximate 28-mansion division of the ecliptic.",
  alternates: { canonical: "/resources/lunar-mansions" }
};

export default function LunarMansionsPage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Lunar Mansion Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Locate the Moon within the 28 lunar mansions using an approximate ecliptic division and see the Moon’s zodiacal position.</p>
      </div>
      <CelestialTimingSuite initialTab="lunar-mansion" />
      <InstrumentBrief brief={instrumentBriefs["lunar-mansions"]} />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
