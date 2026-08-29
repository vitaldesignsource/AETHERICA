import type { Metadata } from "next";
import Link from "next/link";
import { PlanetaryCorrespondenceExplorer } from "@/components/resources/PlanetaryCorrespondenceExplorer";
import { InstrumentBrief } from "@/components/resources/InstrumentBrief";
import { instrumentBriefs } from "@/lib/data/instrumentBriefs";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Planetary Correspondence Reference",
  description: "Browse planetary colors, incense, materials, activities, and cautions.",
  alternates: { canonical: "/resources/planetary-correspondences" }
};

export default function PlanetaryCorrespondencesPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Correspondence" title="Planetary Correspondence Reference">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Browse compact planetary correspondences for color, incense, materials, activities, and traditional cautions.</p>
      </div>
      <PlanetaryCorrespondenceExplorer />
      <InstrumentBrief brief={instrumentBriefs["planetary-correspondences"]} />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
