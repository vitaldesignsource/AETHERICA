import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Moon Phase Tracker",
  description: "View approximate lunar phase, illumination, lunar age, and upcoming full and new moons."
};

export default function MoonPhasePage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Moon Phase Tracker">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Track the approximate lunar phase, illumination, lunar age, and the next full and new moon for a selected date and time.</p>
      </div>
      <CelestialTimingSuite initialTab="moon-phase" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
