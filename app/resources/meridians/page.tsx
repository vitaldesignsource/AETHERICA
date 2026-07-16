import type { Metadata } from "next";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";

export const metadata: Metadata = {
  title: "Meridian and Element Explorer | Aetherica",
  description: "Explore the traditional channel network through yin-yang pairings, Five-Phase relationships, bodily pathways, and daily cycles.",
  alternates: { canonical: "/resources/meridians" },
  openGraph: { title: "Meridian and Element Explorer | Aetherica", description: "A non-diagnostic educational channel and Five-Phase explorer.", type: "website" }
};

export default function MeridiansPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "LearningResource", name: "Meridian and Element Explorer", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="meridians" />
      </main>
    </>
  );
}
