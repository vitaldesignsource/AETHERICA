import type { Metadata } from "next";
import Image from "next/image";
import { TreeOfLifeExplorer } from "@/components/resources/TreeOfLifeExplorer";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";
import { episodes } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Tree of Life Correspondence Explorer",
  description: "Explore Sephiroth and paths with Hebrew names, divine names, angelic orders, color scales, symbols, texts, episodes, and transcript passages.",
  alternates: { canonical: "/resources/tree-of-life" }
};

export default function TreeOfLifePage() {
  const plate = resolveSiteImage("/images/resources/tree-of-life-sephiroth");

  return (
    <Section eyebrow="Resources / Qabalah" title="Tree of Life Correspondence Explorer">
      <div className="mb-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
      <div className="max-w-4xl leading-8 text-parchment">
        <p>
          Select a Sephirah or path to explore names, Hebrew spellings, divine and angelic correspondences, planetary attributions, symbols, color scales, related texts, and Aetherica archive links.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          Correspondence systems are labeled where they appear. Hermetic Golden Dawn path and color attributions are presented as a specific system rather than silently blended with earlier Jewish Kabbalistic sources.
        </p>
      </div>
        {plate ? (
          <figure className="temple-border overflow-hidden rounded bg-black/50">
            <div className="relative aspect-square w-full">
              <Image
                src={plate}
                alt="A lapis and fire enamelled disc bearing the ten sephiroth as coloured gemstones joined by gold paths"
                fill
                sizes="(min-width: 1024px) 42vw, calc(100vw - 2rem)"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-gold/15 p-4 text-sm leading-6 text-parchment">
              Ten sephiroth and the paths between them. The colouring follows the scale conventions
              the explorer below labels by system rather than blending.
            </figcaption>
          </figure>
        ) : null}
      </div>
      <TreeOfLifeExplorer episodes={episodes} />
    </Section>
  );
}
