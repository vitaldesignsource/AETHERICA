import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicCoverArt } from "@/components/topics/TopicCoverArt";
import { TopicDossier } from "@/components/topics/TopicDossier";
import { TopicFeature } from "@/components/topics/TopicFeature";
import { TopicInterlude } from "@/components/topics/TopicInterlude";
import { MagnumOpusStages } from "@/components/topics/MagnumOpusStages";
import { PlanetaryMetals } from "@/components/topics/PlanetaryMetals";
import { Reveal } from "@/components/topics/Reveal";
import { TopicHero } from "@/components/topics/TopicHero";
import { Section } from "@/components/ui/Section";
import { episodes, topics } from "@/lib/data/demo";
import { topicHeroes } from "@/lib/data/topicHeroes";
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

const HERO_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".PNG", ".JPG", ".JPEG"];

/**
 * Hero art is dropped in by hand, so accept whatever extension the file was saved with
 * rather than forcing one. Returns the public path, or null when nothing is there yet.
 */
function resolveHeroImage(basePath: string) {
  for (const extension of HERO_IMAGE_EXTENSIONS) {
    if (existsSync(join(process.cwd(), "public", `${basePath}${extension}`))) {
      return `${basePath}${extension}`;
    }
  }
  return null;
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
  // The root layout sets canonical "/", which every child inherits unless it declares its own —
  // without this line each topic page tells crawlers it is a duplicate of the homepage.
  const canonical = `/topics/${topic.slug}`;
  // The root template already appends the brand, so the brand must not appear here too.
  const title = `${topic.title}: Traditions, Sources & Episode Archive`;
  const description = dossier
    ? `${dossier.subtitle} Sources, figures, glossary, timeline, and every Aetherica episode touching ${topic.title.toLowerCase()}.`
    : topic.overview;

  const hero = topicHeroes[topic.slug];
  const heroImage = hero ? resolveHeroImage(hero.image) : null;
  // Only alchemy has hero art so far. Without a fallback the other twelve topics shared to social
  // render as a bare text link; the site hero is a better card than nothing.
  const shareImage = heroImage ?? "/images/aetherica-hero.png";
  const shareImageAlt = heroImage ? hero?.alt ?? topic.title : "Aetherica Podcast";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Aetherica Podcast",
      type: "website",
      images: [{ url: shareImage, alt: shareImageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage]
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

  const hero = topicHeroes[topic.slug];
  const resolvedHeroImage = hero ? resolveHeroImage(hero.image) : null;
  const feature = hero?.feature;
  const interlude = hero?.interlude;
  const resolvedFeatureImage = feature ? resolveHeroImage(feature.image) : null;
  const resolvedInterludeImage = interlude ? resolveHeroImage(interlude.image) : null;

  const episodeLinks = related.length ? (
    related.map((episode) => (
      <a key={episode.slug} className="focus-ring text-parchment transition hover:text-ivory" href={`/episodes/${episode.slug}`}>
        {episode.title}
      </a>
    ))
  ) : (
    <p className="text-limestone">Episodes will appear here when assigned in the CMS.</p>
  );

  const overviewProse = (
    <>
      {hero ? null : <p className="text-xl text-ivory">{topic.definition}</p>}
      <p className={hero ? "" : "mt-6"}>{topic.overview}</p>
      {dossier ? null : (
        <>
          <h2 className="mt-10 font-display text-3xl text-ivory">Historical Overview</h2>
          <p className="mt-3">This page is structured for a full editorial treatment with important figures, books, related traditions, transcript excerpts, FAQ content, and custom SEO metadata.</p>
        </>
      )}
    </>
  );

  const orientation = dossier ? (
    <div className="mt-6 space-y-5 border-l border-gold/25 pl-5">
      {dossier.orientation.map((item) => (
        <p key={item} className="leading-8 text-parchment">
          {item}
        </p>
      ))}
    </div>
  ) : null;

  const body = (
    <>
      {dossier ? (
        <p className="max-w-4xl text-xl leading-9 text-ivory">{dossier.subtitle}</p>
      ) : null}
      {feature ? (
        <>
          <TopicFeature plate={feature} imageSrc={resolvedFeatureImage}>
            {overviewProse}
            {/* The orientation paragraphs live here rather than in their own boxed row: they are the
                only prose long enough to balance the tall plate, and nesting them in cards inside a
                card was the page's worst box-in-box. */}
            {orientation}
          </TopicFeature>
          <aside className="temple-border mt-10 rounded p-6">
            <h2 className="font-display text-2xl text-ivory">Featured Episodes</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">{episodeLinks}</div>
          </aside>
        </>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <article className="mt-8 leading-8 text-parchment">
            {overviewProse}
            {orientation}
          </article>
          <aside className="temple-border mt-8 rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Featured Episodes</h2>
            <div className="mt-4 grid gap-3">{episodeLinks}</div>
          </aside>
        </div>
      )}
    </>
  );

  if (hero) {
    return (
      <>
        <TopicHero topic={topic} hero={hero} imageSrc={resolvedHeroImage} />
        <Reveal>
          <Section eyebrow="Topic archive" title={`Reading ${topic.title}`}>{body}</Section>
        </Reveal>
        {hero.showMagnumOpus ? (
          <Reveal>
            <MagnumOpusStages />
          </Reveal>
        ) : null}
        {hero.showPlanetaryMetals ? (
          <Reveal>
            <PlanetaryMetals />
          </Reveal>
        ) : null}
        {interlude ? (
          <Reveal>
            <TopicInterlude plate={interlude} imageSrc={resolvedInterludeImage} />
          </Reveal>
        ) : null}
        {dossier ? (
          <Reveal>
            <Section eyebrow="Dossier" title={`The ${topic.title} dossier`}>
              <TopicDossier dossier={dossier} />
            </Section>
          </Reveal>
        ) : null}
      </>
    );
  }

  return (
    <Section eyebrow="Topic" title={topic.title}>
      <TopicCoverArt topic={topic} />
      <div className="mt-8">{body}</div>
      {dossier ? <TopicDossier dossier={dossier} /> : null}
    </Section>
  );
}
