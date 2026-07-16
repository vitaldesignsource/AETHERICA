import type { Metadata } from "next";
import { PracticalResourceSuite } from "@/components/resources/PracticalResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Golden Dawn Correspondence Explorer",
  description: "Explore compact Hermetic Golden Dawn-style correspondence tables with system labels."
};

export default function GoldenDawnCorrespondencesPage() {
  return (
    <Section eyebrow="Resources / Hermetic correspondence" title="Golden Dawn Correspondence Explorer">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Search a compact Hermetic correspondence table for planets, elements, Sephiroth, colors, symbols, and study keywords.</p>
      </div>
      <PracticalResourceSuite kind="golden-dawn" />
    </Section>
  );
}
