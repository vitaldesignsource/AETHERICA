import type { Metadata } from "next";
import Link from "next/link";
import { PlanetaryHoursCalculator } from "@/components/resources/PlanetaryHoursCalculator";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Planetary Hours Calculator",
  description: "Calculate planetary hours by date, latitude, longitude, timezone offset, sunrise, and sunset."
};

export default function PlanetaryHoursPage() {
  return (
    <Section eyebrow="Resources / Planetary hours" title="Planetary Hours Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          This calculator uses the traditional unequal-hour model: daylight is divided into twelve planetary hours from sunrise to sunset, and night is divided into twelve planetary hours from sunset to next sunrise.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          The sunrise and sunset values are calculated locally with a solar approximation. Activity notes are traditional correspondences, not scientific claims of causation.
        </p>
      </div>
      <PlanetaryHoursCalculator />
      <div id="learn" className="temple-border mt-8 rounded p-6">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Learn the system</p>
        <h2 className="mt-3 font-display text-3xl text-ivory">How planetary hours are calculated</h2>
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          The traditional system divides the time from sunrise to sunset into twelve unequal daylight hours, then divides sunset to the next sunrise into twelve unequal nighttime hours. The ruler of the weekday begins the first daylight hour, and the remaining hours follow the Chaldean planetary order.
        </p>
      </div>
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
