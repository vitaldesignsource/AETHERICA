import type { Metadata } from "next";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";

export const metadata: Metadata = {
  title: "Taoist Symbol Index",
  description: "Explore verified diagrams, characters, emblems, number structures, and symbolic forms across Chinese cosmology and Daoist traditions.",
  alternates: { canonical: "/resources/taoist-symbols" },
  openGraph: { title: "Taoist Symbol Index | Aetherica", description: "A provenance-focused index of Taoist, Yijing, cosmological, and internal-alchemical symbols.", type: "website" }
};

export default function TaoistSymbolsPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Taoist Symbol Index", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="symbols" />
      </main>
    </>
  );
}
