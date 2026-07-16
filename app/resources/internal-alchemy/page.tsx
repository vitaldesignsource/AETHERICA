import type { Metadata } from "next";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";

export const metadata: Metadata = {
  title: "Internal Alchemy Map: Explore Neidan Symbolism | Aetherica",
  description: "Explore Neidan concepts including Jing, Qi, Shen, dantian models, Kan and Li, furnace and cauldron imagery, refinement, and return.",
  alternates: { canonical: "/resources/internal-alchemy" },
  openGraph: { title: "Internal Alchemy Map | Aetherica", description: "A cautious comparative study instrument for Daoist internal-alchemy symbolism.", type: "website" }
};

export default function InternalAlchemyPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "LearningResource", name: "Internal Alchemy Map", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="alchemy" />
      </main>
    </>
  );
}
