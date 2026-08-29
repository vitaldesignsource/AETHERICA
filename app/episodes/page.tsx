import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { resolveSiteImage } from "@/lib/images";
import { EpisodeCard } from "@/components/sections/EpisodeCard";
import { ExploreArchiveHeader } from "@/components/sections/ExploreArchiveHeader";
import { Section } from "@/components/ui/Section";
import { episodes, topics } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Episodes",
  description: "Search and browse Aetherica podcast episodes by topic, guest, host, date, duration, and transcript availability.",
  // Stated explicitly because /archive canonicalises to this URL.
  alternates: { canonical: "/episodes" },
  openGraph: {
    images: [{ url: "/images/pages/episodes-drowned-library.webp", alt: "A colossal marble head half-submerged in a flooded domed library" }]
  },
  twitter: { card: "summary_large_image", images: ["/images/pages/episodes-drowned-library.webp"] }
};

export default async function EpisodesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; topic?: string; sort?: string }>;
}) {
  const pageHero = resolveSiteImage("/images/pages/episodes-drowned-library");
  const { q = "", topic = "", sort = "Newest first" } = await searchParams;
  const query = q.trim().toLowerCase();
  const chapterCount = episodes.reduce((total, episode) => total + episode.chapters.length, 0);
  const transcriptCount = episodes.filter((episode) => episode.transcript.length > 0).length;
  const filteredEpisodes = episodes
    .filter((episode) => {
      const matchesQuery = query
        ? [episode.title, episode.description, episode.longIntroduction, episode.guest, episode.hosts.join(" "), episode.topics.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(query)
        : true;
      const matchesTopic = topic ? episode.topics.includes(topic) : true;
      return matchesQuery && matchesTopic;
    })
    .sort((a, b) => {
      if (sort === "Oldest first") {
        return new Date(a.publishedAt ?? "2100-01-01").getTime() - new Date(b.publishedAt ?? "2100-01-01").getTime();
      }
      if (sort === "Duration") return b.durationSeconds - a.durationSeconds;
      return new Date(b.publishedAt ?? "1900-01-01").getTime() - new Date(a.publishedAt ?? "1900-01-01").getTime();
    });

  return (
    <>
      <PageHero
        eyebrow="The archive"
        title="Every episode"
        lede="Search and browse the full run — by topic, guest, host, date, duration, or whether a transcript exists."
        imageSrc={pageHero}
        imageAlt="A colossal marble head half-submerged in still water beneath a domed library, its shelves of scrolls rising into the dark, an oculus open to the sky above"
        focus="50% 40%"
      />
    <>
      <ExploreArchiveHeader episodeCount={episodes.length} chapterCount={chapterCount} transcriptCount={transcriptCount} />
      {/* The hero above carries the page title; this names the section under it. */}
    <Section eyebrow="Episodes" title="Browse and filter">
        <form className="temple-border mb-8 grid gap-4 rounded p-4 md:grid-cols-[1.3fr_.8fr_.7fr_auto]" role="search">
          <label className="grid gap-2 text-sm text-parchment md:col-span-2">
            Search episodes
            <input
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              name="q"
              defaultValue={q}
              placeholder="Alchemy, guest, transcript phrase..."
            />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Topic
            <select className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory" name="topic" defaultValue={topic}>
              <option value="">All topics</option>
              {topics.map((topic) => <option key={topic.slug}>{topic.title}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Sort
            <select className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory" name="sort" defaultValue={sort}>
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Duration</option>
            </select>
          </label>
          <button className="focus-ring self-end rounded bg-gold px-5 py-3 text-sm font-semibold text-obsidian hover:bg-ivory">
            Search
          </button>
        </form>
        <p className="mb-5 text-sm text-limestone">{filteredEpisodes.length} episode{filteredEpisodes.length === 1 ? "" : "s"} found</p>
        <div className="grid gap-5">
          {filteredEpisodes.map((episode) => <EpisodeCard key={episode.guid} episode={episode} />)}
        </div>
      </Section>
    </>
    </>
  );
}
