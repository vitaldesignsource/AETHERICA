import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Celestial Timing Instruments",
  description: "Aetherica celestial timing instruments for planetary day, moon phase, lunar mansion, and decan study."
};

export default function CelestialTimingPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Celestial timing" title="Celestial Timing Instruments">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A practical suite for traditional timing: planetary day, moon phase, lunar mansion, zodiacal position, and decan placement from a selected date and time.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          These first instruments use compact approximations suitable for study and planning. For exact astronomical work, compare against a dedicated ephemeris.
        </p>
      </div>
      <CelestialTimingSuite />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
