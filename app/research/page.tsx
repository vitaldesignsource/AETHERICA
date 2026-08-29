import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Network, Route, ScrollText, Search, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Research",
  description: "Aetherica research tools for transcript search, listening paths, chapters, timelines, guest networks, and personal notes."
};

const researchTools = [
  {
    title: "Search the Spoken Archive",
    href: "/search",
    icon: Search,
    description: "Find transcript passages, speakers, episode titles, timestamps, chapters, books, and play-from-here moments."
  },
  {
    title: "Initiatic Listening Paths",
    href: "/paths",
    icon: Route,
    description: "Follow curated studies through episodes, chapters, books, articles, and reflection prompts."
  },
  {
    title: "Chapter Discovery",
    href: "/chapters",
    icon: ScrollText,
    description: "Enter through focused chapter-sized passages with summaries, keywords, topics, and next steps."
  },
  {
    title: "Guest Constellations",
    href: "/constellations",
    icon: Network,
    description: "Explore guest networks by shared topics, books, traditions, appearances, and overlaps."
  },
  {
    title: "Interactive Timelines",
    href: "/timelines",
    icon: Clock3,
    description: "Move through Hermeticism, theurgy, alchemy, astrology, Freemasonry, and Christian esotericism."
  },
  {
    title: "The Commonplace Book",
    href: "/commonplace",
    icon: Sparkles,
    description: "Keep a private research collection of episodes, quotes, passages, books, notes, and timestamps."
  }
];

export default function ResearchPage() {
  return (
    <Section titleAs="h1" eyebrow="Research library" title="Study the archive as a living system">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {researchTools.map(({ title, href, icon: Icon, description }) => (
          <Link key={href} href={href} className="temple-border focus-ring rounded p-5 hover:border-gold/60">
            <Icon className="text-gold" />
            <h2 className="mt-4 font-display text-2xl text-ivory">{title}</h2>
            <p className="mt-3 leading-7 text-parchment">{description}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
