import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { TopicPathCard } from "@/components/sections/TopicPathCard";
import { topics } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Editorial subject paths through the Aetherica archive — alchemy, hermeticism, kabbalah, theurgy, gnosticism, and the wider Western esoteric tradition.",
  alternates: { canonical: "/topics" }
};

export default function TopicsPage() {
  return (
    <Section titleAs="h1" eyebrow="Topics" title="Editorial subject paths">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <TopicPathCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </Section>
  );
}
