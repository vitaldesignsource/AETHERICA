import type { Metadata } from "next";
import Link from "next/link";
import { HebrewLetterExplorer } from "@/components/resources/HebrewLetterExplorer";
import { Section } from "@/components/ui/Section";
import { episodes } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Hebrew Letter Explorer",
  description: "Explore the Hebrew alphabet with letter forms, script history, pronunciation, numerical values, symbolism, Sefer Yetzirah associations, historical notes, and archive links."
};

export default function HebrewLettersPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Language and number" title="Hebrew Letter Explorer">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A curated alphabet tool for studying Hebrew letter forms, script history, names, pronunciation, numerical values, symbolism, Sefer Yetzirah associations, historical notes, and related Aetherica archive content.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          The tool only displays curated Hebrew alphabet forms and final forms. It avoids decorative or arbitrary Hebrew text, and labels Sefer Yetzirah associations separately from Hermetic path correspondences.
        </p>
      </div>
      <HebrewLetterExplorer episodes={episodes} />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
