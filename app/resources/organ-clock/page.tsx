import type { Metadata } from "next";
import { OrganClockInstrument } from "@/components/resources/OrganClockInstrument";

export const metadata: Metadata = {
  title: "Taoist Organ Clock Instrument",
  description: "Explore the traditional twelve-period organ-meridian clock, Five-Phase pairings, yin-yang relationships, and daily observation tools.",
  alternates: { canonical: "/resources/organ-clock" },
  openGraph: {
    title: "Taoist Organ Clock Instrument | Aetherica",
    description: "A non-diagnostic educational instrument for studying the traditional Chinese medical organ-meridian clock.",
    type: "website"
  }
};

export default function OrganClockPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Taoist Organ Clock Instrument",
    description: metadata.description,
    learningResourceType: "Interactive study instrument"
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <OrganClockInstrument />
      </main>
    </>
  );
}
