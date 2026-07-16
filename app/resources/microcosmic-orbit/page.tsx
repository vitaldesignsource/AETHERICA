import type { Metadata } from "next";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";

export const metadata: Metadata = {
  title: "Microcosmic Orbit / Lesser Mandala | Aetherica",
  description: "Study the Xiao Zhou Tian / Lesser Mandala model of the Du Mai ascent and Ren Mai descent within Daoist internal-cultivation systems.",
  alternates: { canonical: "/resources/microcosmic-orbit" },
  openGraph: { title: "Microcosmic Orbit / Lesser Mandala | Aetherica", description: "An educational diagrammatic study tool for Xiao Zhou Tian front-and-back circulation-route models.", type: "website" }
};

export default function MicrocosmicOrbitPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "LearningResource", name: "Microcosmic Orbit / Lesser Mandala", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="orbit" />
      </main>
    </>
  );
}
