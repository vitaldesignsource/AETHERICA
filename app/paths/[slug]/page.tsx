import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, Signpost } from "lucide-react";
import { PathCoverArt } from "@/components/paths/PathCoverArt";
import { PathProgress } from "@/components/research/PathProgress";
import { Reveal } from "@/components/topics/Reveal";
import { Section } from "@/components/ui/Section";
import { topics } from "@/lib/data/demo";
import { episodeBySlug, listeningPaths } from "@/lib/data/research";
import { formatSeconds } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return listeningPaths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = listeningPaths.find((item) => item.slug === slug);
  if (!path) return { title: "Listening path" };
  const canonical = `/paths/${path.slug}`;
  return {
    title: path.title,
    description: path.summary,
    alternates: { canonical },
    openGraph: {
      title: `${path.title} — a listening path`,
      description: path.summary,
      url: canonical,
      type: "article"
    }
  };
}

/** Path topics are stored as display names; the dossier routes are slugs. */
function topicHref(name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return topics.some((topic) => topic.slug === slug) ? `/topics/${slug}` : null;
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = listeningPaths.findIndex((item) => item.slug === slug);
  const path = listeningPaths[index];
  if (!path) notFound();

  const previous = index > 0 ? listeningPaths[index - 1] : null;
  const next = index < listeningPaths.length - 1 ? listeningPaths[index + 1] : null;

  const listeningSteps = path.steps.filter((step) => step.episodeSlug);
  const readingSteps = path.steps.filter((step) => step.bookTitle);
  // Sum the runtime of every distinct episode the route actually sends you to.
  const runtimeSeconds = [...new Set(listeningSteps.map((step) => step.episodeSlug))]
    .map((episodeSlug) => (episodeSlug ? episodeBySlug(episodeSlug)?.durationSeconds ?? 0 : 0))
    .reduce((total, seconds) => total + seconds, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Listening Paths", path: "/paths" },
              { name: path.title, path: `/paths/${path.slug}` }
            ])
          )
        }}
      />
      {/* The heading used to be the literal string "Curated route" on every path in the set. */}
      <Section titleAs="h1" eyebrow="Initiatic listening path" title={path.title}>
        <p className="max-w-3xl text-xl leading-9 text-ivory">{path.summary}</p>

        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Level", path.difficulty],
            ["Steps", String(path.steps.length)],
            ["Episodes", String(listeningSteps.length)],
            ["Listening", runtimeSeconds ? formatSeconds(runtimeSeconds) : "—"]
          ].map(([label, value]) => (
            <div key={label} className="temple-border rounded bg-black/40 p-4">
              <dt className="text-[10px] uppercase tracking-[.18em] text-gold">{label}</dt>
              <dd className="mt-1 font-display text-2xl text-ivory">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {path.topics.map((topic) => {
            const href = topicHref(topic);
            return href ? (
              <Link
                key={topic}
                href={href}
                className="focus-ring rounded-full border border-gold/30 px-3 py-1.5 text-xs uppercase tracking-[.12em] text-gold transition hover:bg-gold/10 hover:text-ivory"
              >
                {topic}
              </Link>
            ) : (
              <span
                key={topic}
                className="rounded-full border border-gold/20 px-3 py-1.5 text-xs uppercase tracking-[.12em] text-parchment"
              >
                {topic}
              </span>
            );
          })}
        </div>

        <div className="mt-10">
          <PathCoverArt path={path} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <ol role="list" className="grid gap-5">
            {path.steps.map((step, stepIndex) => {
              const episode = step.episodeSlug ? episodeBySlug(step.episodeSlug) : undefined;
              // ?t= is honoured by the player's deep-link handler, so a step that names a chapter
              // opens the episode at that moment rather than at the top.
              const href = episode
                ? `/episodes/${episode.slug}${step.chapterStart !== undefined ? `?t=${step.chapterStart}` : ""}`
                : undefined;
              return (
                <li key={step.title} className="temple-border relative rounded bg-black/40 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-sm font-semibold text-gold">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl leading-tight text-ivory">{step.title}</h2>
                  </div>
                  <p className="mt-4 leading-7 text-parchment">{step.summary}</p>

                  {href ? (
                    <Link
                      href={href}
                      className="focus-ring mt-5 inline-flex items-center gap-2 rounded border border-gold/40 px-4 py-2.5 text-sm text-ivory transition hover:bg-gold/10"
                    >
                      <Headphones size={15} aria-hidden="true" />
                      <span>
                        {episode?.title}
                        {step.chapterStart !== undefined ? ` · from ${formatSeconds(step.chapterStart)}` : ""}
                      </span>
                    </Link>
                  ) : null}

                  {step.bookTitle ? (
                    <p className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                      <BookOpen size={15} aria-hidden="true" />
                      {step.bookTitle}
                    </p>
                  ) : null}

                  <div className="mt-5 rounded border-l-2 border-gold/40 bg-black/30 p-4">
                    <p className="text-[10px] uppercase tracking-[.2em] text-gold">Sit with this</p>
                    <p className="mt-2 text-sm leading-6 text-parchment">{step.prompt}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="grid content-start gap-6">
            <PathProgress path={path} />
            {readingSteps.length ? (
              <aside className="temple-border rounded bg-black/40 p-5">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-gold" size={18} aria-hidden="true" />
                  <h2 className="font-display text-2xl text-ivory">Read alongside</h2>
                </div>
                <ul role="list" className="mt-4 grid gap-2">
                  {readingSteps.map((step) => (
                    <li key={step.bookTitle} className="text-sm leading-6 text-parchment">
                      {step.bookTitle}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
      </Section>

      <Reveal>
        <Section eyebrow="Continue" title="Other routes through the archive">
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/paths/${previous.slug}`}
                className="focus-ring group temple-border rounded bg-black/40 p-6 transition hover:border-gold/50"
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-gold">
                  <ArrowLeft size={14} aria-hidden="true" /> Previous path
                </p>
                <p className="mt-3 font-display text-2xl text-ivory group-hover:text-gold">{previous.title}</p>
                <p className="mt-2 text-sm leading-6 text-parchment">{previous.summary}</p>
              </Link>
            ) : null}
            {next ? (
              <Link
                href={`/paths/${next.slug}`}
                className="focus-ring group temple-border rounded bg-black/40 p-6 transition hover:border-gold/50 sm:text-right"
              >
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-gold sm:flex-row-reverse">
                  <ArrowRight size={14} aria-hidden="true" /> Next path
                </p>
                <p className="mt-3 font-display text-2xl text-ivory group-hover:text-gold">{next.title}</p>
                <p className="mt-2 text-sm leading-6 text-parchment">{next.summary}</p>
              </Link>
            ) : null}
          </div>
          <Link
            href="/paths"
            className="focus-ring mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[.28em] text-gold transition hover:text-ivory"
          >
            <Signpost size={14} aria-hidden="true" /> All listening paths
          </Link>
        </Section>
      </Reveal>
    </>
  );
}
