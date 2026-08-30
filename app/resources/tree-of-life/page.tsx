import type { Metadata } from "next";
import { TreeOfLifeExplorer } from "@/components/resources/TreeOfLifeExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";
import { episodes } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Tree of Life Correspondence Explorer",
  description: "Explore Sephiroth and paths with Hebrew names, divine names, angelic orders, color scales, symbols, texts, episodes, and transcript passages.",
  alternates: { canonical: "/resources/tree-of-life" }
};

export default function TreeOfLifePage() {
  const hero = resolveSiteImage("/images/resources/tree-of-life-hero");

  return (
    <>
      <PageHero
        eyebrow="Resources / Qabalah"
        title="Tree of Life Correspondence Explorer"
        lede="Sephiroth and paths with their Hebrew names, divine names, angelic orders, colour scales, and symbols — every attribution labelled by the system it belongs to."
        imageSrc={hero}
        imageAlt="A disc of lapis and fire bearing the ten sephiroth as coloured gemstones set on a crescent, a circle, and a triangle, rimmed in gold"
        focus="50% 42%"
      />
    {/* The hero above owns the h1; this names the instrument beneath it. */}
    <Section eyebrow="The instrument" title="Select a sphere or path">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          Select a Sephirah or path to explore names, Hebrew spellings, divine and angelic correspondences, planetary attributions, symbols, color scales, related texts, and Aetherica archive links.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          Correspondence systems are labeled where they appear. Hermetic Golden Dawn path and color attributions are presented as a specific system rather than silently blended with earlier Jewish Kabbalistic sources.
        </p>
      </div>
      <TreeOfLifeExplorer episodes={episodes} />
    </Section>
    </>
  );
}
