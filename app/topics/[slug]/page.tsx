import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCoverArt } from "@/components/topics/TopicCoverArt";
import { TopicDossier } from "@/components/topics/TopicDossier";
import { Section } from "@/components/ui/Section";
import { episodes, topics } from "@/lib/data/demo";
import { topicDossiers } from "@/lib/data/topicDossiers";
import type { Episode } from "@/lib/data/types";

const featuredTopicEpisode: Record<string, string> = {
  alchemy: "daniel-wiseman-metallic-alchemy-the-animating-spark-of-life"
};

function episodeSearchText(episode: Episode) {
  return [
    episode.title,
    episode.subtitle,
    episode.description,
    episode.longIntroduction,
    episode.guest,
    ...episode.topics,
    ...episode.chapters.flatMap((chapter) => [chapter.title, chapter.summary ?? "", ...(chapter.keywords ?? [])])
  ]
    .join(" ")
    .toLowerCase();
}

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) {
    return {
      title: "Topic | Aetherica Podcast"
    };
  }

  const dossier = topicDossiers[topic.slug];
  const title = `${topic.title} | Aetherica Topic Archive`;
  const description = dossier?.subtitle ?? topic.overview;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website"
    }
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const dossier = topicDossiers[topic.slug];
  const pinnedSlug = featuredTopicEpisode[topic.slug];
  const archiveTerms = dossier
    ? [
        topic.title,
        ...dossier.researchWorkbench.archiveQueries,
        ...dossier.researchWorkbench.glossary.map((entry) => entry.term)
      ].map((term) => term.toLowerCase())
    : [topic.title.toLowerCase()];
  const related = episodes
    .filter((episode) => {
      const exactTopic = episode.topics.some((item) => item.toLowerCase() === topic.title.toLowerCase());
      if (exactTopic) return true;
      const searchable = episodeSearchText(episode);
      return archiveTerms.some((term) => term.length > 3 && searchable.includes(term));
    })
    .sort((a, b) => {
      if (a.slug === pinnedSlug) return -1;
      if (b.slug === pinnedSlug) return 1;
      return 0;
    })
    .slice(0, 8);

  return (
    <Section eyebrow="Topic" title={topic.title}>
      <TopicCoverArt topic={topic} />
      {dossier ? (
        <div className="mt-8 rounded border border-gold/18 bg-black/30 p-5">
          <p className="max-w-5xl text-xl leading-8 text-ivory">{dossier.subtitle}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {dossier.orientation.map((item) => (
              <p key={item} className="rounded border border-gold/12 bg-black/26 p-4 leading-7 text-parchment">
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <article className="mt-8 leading-8 text-parchment">
          <p className="text-xl text-ivory">{topic.definition}</p>
          <p className="mt-6">{topic.overview}</p>
          {dossier ? null : (
            <>
              <h2 className="mt-10 font-display text-3xl text-ivory">Historical Overview</h2>
              <p className="mt-3">This page is structured for a full editorial treatment with important figures, books, related traditions, transcript excerpts, FAQ content, and custom SEO metadata.</p>
            </>
          )}
        </article>
        <aside className="temple-border mt-8 rounded p-5">
          <h2 className="font-display text-2xl text-ivory">Featured Episodes</h2>
          <div className="mt-4 grid gap-3">
            {related.length ? related.map((episode) => <a key={episode.slug} className="text-parchment hover:text-ivory" href={`/episodes/${episode.slug}`}>{episode.title}</a>) : <p className="text-limestone">Episodes will appear here when assigned in the CMS.</p>}
          </div>
        </aside>
      </div>
      {dossier ? <TopicDossier dossier={dossier} /> : null}
    </Section>
  );
}
