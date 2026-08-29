import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TaoistSuiteInstrument } from "@/components/resources/TaoistSuiteInstrument";
import { resolveSiteImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Internal Alchemy Map: Explore Neidan Symbolism",
  description: "Explore Neidan concepts including Jing, Qi, Shen, dantian models, Kan and Li, furnace and cauldron imagery, refinement, and return.",
  alternates: { canonical: "/resources/internal-alchemy" },
  openGraph: { title: "Internal Alchemy Map | Aetherica", description: "A cautious comparative study instrument for Daoist internal-alchemy symbolism.", type: "website" }
};

export default function InternalAlchemyPage() {
  const hero = resolveSiteImage("/images/resources/internal-alchemy-athanor");
  const jsonLd = { "@context": "https://schema.org", "@type": "LearningResource", name: "Internal Alchemy Map", description: metadata.description };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Resources / Daoist practice"
        title="Internal Alchemy Map"
        lede="Neidan works the same vocabulary as the laboratory art — furnace, cauldron, refinement, return — with the vessel relocated to the practitioner."
        imageSrc={hero}
        imageAlt="A vaulted stone laboratory lit by the fire of a standing athanor, glass retorts and copper vessels crowding the benches"
        focus="52% 46%"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaoistSuiteInstrument kind="alchemy" />
      </div>
    </>
  );
}
