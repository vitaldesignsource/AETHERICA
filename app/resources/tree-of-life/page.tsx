import type { Metadata } from "next";
import { TreeOfLifeExplorer } from "@/components/resources/TreeOfLifeExplorer";
import { Section } from "@/components/ui/Section";
import { episodes } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Tree of Life Correspondence Explorer",
  description: "Explore Sephiroth and paths with Hebrew names, divine names, angelic orders, color scales, symbols, texts, episodes, and transcript passages."
};

export default function TreeOfLifePage() {
  return (
    <Section eyebrow="Resources / Qabalah" title="Tree of Life Correspondence Explorer">
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
  );
}
