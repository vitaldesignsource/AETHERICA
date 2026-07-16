import type { Metadata } from "next";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";

export const metadata: Metadata = {
  title: "Taoist Correspondence Matrix | Aetherica",
  description: "Explore relationships among phases, seasons, directions, trigrams, organs, climates, tastes, virtues, symbols, and texts.",
  alternates: { canonical: "/resources/taoist-correspondences" },
  openGraph: { title: "Taoist Correspondence Matrix | Aetherica", description: "A searchable Chinese cosmological correspondence engine with framework and source labels.", type: "website" }
};

export default function TaoistCorrespondencesPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Taoist Correspondence Matrix", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="correspondences" />
      </main>
    </>
  );
}
