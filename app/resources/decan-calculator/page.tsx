import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { InstrumentBrief } from "@/components/resources/InstrumentBrief";
import { instrumentBriefs } from "@/lib/data/instrumentBriefs";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Decan Calculator",
  description: "Identify approximate solar and lunar decans with traditional planetary rulers.",
  alternates: { canonical: "/resources/decan-calculator" }
};

export default function DecanCalculatorPage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Decan Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Identify the approximate solar and lunar decans for a selected date and time, including traditional decan ruler and zodiacal range.</p>
      </div>
      <CelestialTimingSuite initialTab="decan" />
      <InstrumentBrief brief={instrumentBriefs["decan-calculator"]} />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
