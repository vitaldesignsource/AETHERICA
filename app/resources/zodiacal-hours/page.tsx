import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { InstrumentBrief } from "@/components/resources/InstrumentBrief";
import { instrumentBriefs } from "@/lib/data/instrumentBriefs";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Zodiacal Hour Calculator",
  description: "Explore sunrise-based zodiacal timing periods for a selected date and location.",
  alternates: { canonical: "/resources/zodiacal-hours" }
};

export default function ZodiacalHoursPage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Zodiacal Hour Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Divide sunrise to the next sunrise into twelve symbolic zodiacal periods, beginning from the Sun’s approximate sign.</p>
      </div>
      <CelestialTimingSuite initialTab="zodiacal-hour" />
      <InstrumentBrief brief={instrumentBriefs["zodiacal-hours"]} />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
