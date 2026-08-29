import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Network, Route, ScrollText, Search, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Research",
  description: "Aetherica research tools for transcript search, listening paths, chapters, timelines, guest networks, and personal notes.",
  alternates: { canonical: "/research" },
  openGraph: { images: [{ url: "/images/pages/research-ascent.webp", alt: "A hooded figure climbing a dark mountain path toward a single lit window high in a ruin" }] },
  twitter: { card: "summary_large_image", images: ["/images/pages/research-ascent.webp"] }
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
  const pageHero = resolveSiteImage("/images/pages/research-ascent");
  return (
    <>
      <PageHero
        eyebrow="Research library"
        title="Study the archive as a living system"
        lede="The long climb is the method: transcripts, paths, chapters, timelines, and notes, each a step toward the same lit window."
        imageSrc={pageHero}
        imageAlt="A hooded figure climbing a dark mountain path in the rain toward a single lit window high in a ruined keep"
        focus="52% 55%"
      />
    {/* The hero above owns the h1; this names the toolset beneath it. */}
    <Section eyebrow="The instruments of study" title="Six ways in">
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
    </>
  );
}
