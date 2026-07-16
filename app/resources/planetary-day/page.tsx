import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Planetary Day Calculator",
  description: "Find the traditional planetary ruler of a selected weekday."
};

export default function PlanetaryDayPage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Planetary Day Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>The planetary day calculator identifies the traditional planetary ruler of the selected weekday and gives related correspondences.</p>
      </div>
      <CelestialTimingSuite initialTab="planetary-day" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
