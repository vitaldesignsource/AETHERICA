import type { Metadata } from "next";
import { TaoistCosmologyMap } from "@/components/resources/TaoistCosmologyMap";

export const metadata: Metadata = {
  title: "Taoist Cosmology Map: From Wuji to the Ten Thousand Things",
  description: "Explore Dao, Wuji, Taiji, yin and yang, the Four Images, Five Phases, Eight Trigrams, and the unfolding of manifested form.",
  alternates: { canonical: "/resources/taoist-cosmology" },
  openGraph: {
    title: "Taoist Cosmology Map: From Wuji to the Ten Thousand Things | Aetherica",
    description: "A framework-labeled interactive map of Taoist cosmological unfolding and return.",
    type: "website"
  }
};

export default function TaoistCosmologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Taoist Cosmology Map",
    description: metadata.description,
    learningResourceType: "Interactive study instrument"
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistCosmologyMap />
      </main>
    </>
  );
}
