import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Book",
  description: "Book records connect title, author, publisher, edition, topics, and transcript references.",
  // This route is still a scaffold: it renders the same demo record for every slug, so an unlimited
  // number of URLs would resolve to identical thin content. Keep it out of the index until the
  // records are real, then replace this with generateMetadata.
  robots: { index: false, follow: false }
};

export default function BookPage() {
  return (
    <Section titleAs="h1" eyebrow="Book" title="Demo Book Record">
      <p className="text-parchment">Book pages support title, author, publisher, year, ISBN, description, topics, transcript references, purchase link, and related books. Affiliate links are disabled unless explicitly configured.</p>
    </Section>
  );
}
