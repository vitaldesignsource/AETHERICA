import type { Metadata } from "next";
import Link from "next/link";
import { FivePhasesWheel } from "@/components/resources/FivePhasesWheel";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Five Phases Wheel: Explore Wu Xing Cycles",
  description: "Explore Wood, Fire, Earth, Metal, and Water through the generating, controlling, overacting, and counteracting cycles of Wu Xing.",
  alternates: {
    canonical: "/resources/five-phases"
  },
  openGraph: {
    title: "Five Phases Wheel | Aetherica",
    description: "An interactive Wu Xing instrument for studying Five Phase cycles, relationships, correspondences, and source-labeled frameworks.",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Five Phases Wheel",
  alternateName: "Wu Xing Instrument",
  description: "Explore Wood, Fire, Earth, Metal, and Water through the generating, controlling, overacting, and counteracting cycles of Wu Xing.",
  learningResourceType: "Interactive resource",
  isAccessibleForFree: true
};

export default function FivePhasesPage() {
  return (
    <Section eyebrow="Resources / Cosmological instruments" title="Five Phases Wheel">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A visual research instrument for exploring Wu Xing as five recurring modes of transformation: Wood, Fire, Earth, Metal, and Water.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          Relationships, correspondences, and framework notes are labeled so the tool remains source-transparent and avoids presenting one interpretive model as universal doctrine.
        </p>
      </div>
      <FivePhasesWheel />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
