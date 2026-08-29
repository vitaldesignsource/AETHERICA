import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Tradition",
  description: "Tradition records connect topics, important figures, texts, symbols, and episodes.",
  // This route is still a scaffold: it renders the same demo record for every slug, so an unlimited
  // number of URLs would resolve to identical thin content. Keep it out of the index until the
  // records are real, then replace this with generateMetadata.
  robots: { index: false, follow: false }
};

export default function TraditionPage() {
  return (
    <Section titleAs="h1" eyebrow="Tradition" title="Demo Tradition Record">
      <p className="text-parchment">Tradition pages connect topics, important figures, texts, symbols, episodes, and editorial introductions.</p>
    </Section>
  );
}
