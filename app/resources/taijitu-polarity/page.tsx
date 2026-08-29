import type { Metadata } from "next";
import Link from "next/link";
import { TaijituPolarityInstrument } from "@/components/resources/TaijituPolarityInstrument";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Taijitu Polarity Instrument: Explore Yin and Yang",
  description: "Explore yin and yang as a living cycle of polarity, transformation, mutual containment, the Four Images, Five Phases, and the emergence of the Eight Trigrams.",
  alternates: {
    canonical: "/resources/taijitu-polarity"
  },
  openGraph: {
    title: "Taijitu Polarity Instrument | Aetherica",
    description: "An interactive Aetherica resource for studying yin-yang polarity, cycles, mutual containment, Five Phases, and the Eight Trigrams.",
    type: "website"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Taijitu Polarity Instrument",
  description: "Explore yin and yang as a living cycle of polarity, transformation, mutual containment, the Four Images, Five Phases, and the emergence of the Eight Trigrams.",
  learningResourceType: "Interactive resource",
  isAccessibleForFree: true
};

export default function TaijituPolarityPage() {
  return (
    <Section eyebrow="Resources / Cosmological instruments" title="Taijitu Polarity Instrument">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A diagrammatic research instrument for exploring yin and yang as contextual, relational tendencies within cycles of emergence, fullness, reversal, and return.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          This page avoids arbitrary Chinese text and labels historical frameworks, interpretive mappings, and review-required source records so the tool can become more scholarly over time.
        </p>
      </div>
      <TaijituPolarityInstrument />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
