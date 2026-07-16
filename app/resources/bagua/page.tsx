import type { Metadata } from "next";
import { BaguaInstrument } from "@/components/resources/BaguaInstrument";

export const metadata: Metadata = {
  title: "Bagua Instrument: Explore the Eight Trigrams | Aetherica",
  description: "Explore the Eight Trigrams, Earlier Heaven and Later Heaven arrangements, line transformations, correspondences, and hexagram construction.",
  alternates: { canonical: "/resources/bagua" },
  openGraph: {
    title: "Bagua Instrument: Explore the Eight Trigrams | Aetherica",
    description: "Study yin-yang line structures, trigram relationships, arrangements, family roles, and hexagram construction.",
    type: "website"
  }
};

export default function BaguaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "The Bagua Instrument",
    description: metadata.description,
    learningResourceType: "Interactive study instrument"
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BaguaInstrument />
      </main>
    </>
  );
}
