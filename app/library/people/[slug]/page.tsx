import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Historical Person",
  description: "Historical person records connect episodes, transcript references, books, traditions, and related figures.",
  // This route is still a scaffold: it renders the same demo record for every slug, so an unlimited
  // number of URLs would resolve to identical thin content. Keep it out of the index until the
  // records are real, then replace this with generateMetadata.
  robots: { index: false, follow: false }
};

export default function PersonPage() {
  return (
    <Section eyebrow="Historical person" title="Demo Person Record">
      <p className="text-parchment">Historical person records connect episodes, transcript references, books, traditions, organizations, and related figures.</p>
    </Section>
  );
}
