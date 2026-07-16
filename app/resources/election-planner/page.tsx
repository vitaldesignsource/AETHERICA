import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Astrological Election Planner",
  description: "Compare candidate days for traditional symbolic electional timing."
};

export default function ElectionPlannerPage() {
  return (
    <Section eyebrow="Resources / Celestial timing" title="Astrological Election Planner">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Compare upcoming days by planetary day, lunar phase, lunar mansion, and lunar sign as a first-pass electional planning aid.</p>
      </div>
      <CelestialTimingSuite initialTab="election-planner" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
