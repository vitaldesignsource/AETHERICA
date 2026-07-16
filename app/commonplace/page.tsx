import type { Metadata } from "next";
import { CommonplaceBook } from "@/components/research/CommonplaceBook";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Commonplace Book",
  description: "A private Aetherica research collection for episodes, quotes, transcript passages, books, guests, topics, events, notes, and timestamps."
};

export default function CommonplacePage() {
  return (
    <Section eyebrow="Personal archive" title="The Commonplace Book">
      <p className="mb-8 max-w-3xl leading-8 text-parchment">
        A private scholarly notebook for saving episodes, quotes, transcript passages, books, guests, topics, events, exact timestamps, and personal notes.
      </p>
      <CommonplaceBook />
    </Section>
  );
}
