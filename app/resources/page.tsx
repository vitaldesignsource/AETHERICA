import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { resolveSiteImage } from "@/lib/images";
import { Flame } from "lucide-react";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Resources",
  description: "Aetherica calculators and research instruments for planetary hours, tattvic tides, and traditional correspondences.",
  openGraph: {
    images: [{ url: "/images/pages/resources-physic-garden.webp", alt: "A cloister physic garden around a central armillary sphere at dusk" }]
  },
  twitter: { card: "summary_large_image", images: ["/images/pages/resources-physic-garden.webp"] }
};

export default function ResourcesPage() {
  const pageHero = resolveSiteImage("/images/pages/resources-physic-garden");
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="The instrument garden"
        lede="Calculators, explorers, and correspondence tables for working the traditions rather than only reading about them."
        imageSrc={pageHero}
        imageAlt="A cloister physic garden at dusk, beds laid out around a central armillary sphere, an apothecary sorting specimens by lamplight"
        focus="50% 42%"
      />
    {/* The hero above carries the page title; this names the section under it. */}
    <Section eyebrow="The instruments" title="Every tool in the archive">
      <ResourcesHub />
      <div className="temple-border mt-8 rounded p-6">
        <div className="flex items-center gap-3 text-gold">
          <Flame size={20} />
          <p className="text-xs uppercase tracking-[.24em]">Traditional correspondence note</p>
        </div>
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          These tools present inherited symbolic timing systems for study, contemplation, and historical practice. Their descriptions are traditional correspondences, not scientific claims of causation.
        </p>
      </div>
    </Section>
    </>
  );
}
