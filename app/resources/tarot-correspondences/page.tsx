import type { Metadata } from "next";
import Link from "next/link";
import { PracticalResourceSuite } from "@/components/resources/PracticalResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Tarot Correspondence Matrix",
  description: "Compare tarot keys with Hebrew letters, paths, attributions, and Hermetic system notes."
};

export default function TarotCorrespondencesPage() {
  return (
    <Section eyebrow="Resources / Tarot correspondence" title="Tarot Correspondence Matrix">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Compare major tarot keys with Hebrew letters, Tree of Life paths, and Hermetic attributions in a clearly labeled system table.</p>
      </div>
      <PracticalResourceSuite kind="tarot" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
