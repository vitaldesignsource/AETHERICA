import type { Metadata } from "next";
import { HeTuLuoShuComparator } from "@/components/resources/HeTuLuoShuComparator";

export const metadata: Metadata = {
  title: "He Tu and Luo Shu Comparator",
  description: "Compare the River Diagram and Luo River Writing through number patterns, orientation, Five-Phase relationships, Bagua overlays, and historical frameworks.",
  alternates: { canonical: "/resources/he-tu-luo-shu" },
  openGraph: {
    title: "He Tu and Luo Shu Comparator | Aetherica",
    description: "Explore He Tu pairs, Luo Shu nine-palace structure, number polarity, Five-Phase overlays, and Bagua correspondences.",
    type: "website"
  }
};

export default function HeTuLuoShuPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "He Tu and Luo Shu Comparator",
    description: metadata.description,
    learningResourceType: "Interactive study instrument"
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <HeTuLuoShuComparator />
      </div>
    </>
  );
}
