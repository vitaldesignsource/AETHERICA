import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PathCoverArt } from "@/components/paths/PathCoverArt";
import { PathProgress } from "@/components/research/PathProgress";
import { Section } from "@/components/ui/Section";
import { episodeBySlug, listeningPaths } from "@/lib/data/research";
import { formatSeconds } from "@/lib/format";

export function generateStaticParams() {
  return listeningPaths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = listeningPaths.find((item) => item.slug === slug);
  if (!path) return {};
  return { title: path.title, description: path.summary };
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = listeningPaths.find((item) => item.slug === slug);
  if (!path) notFound();

  return (
    <Section eyebrow="Initiatic listening path" title="Curated route">
      <PathCoverArt path={path} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="grid gap-5">
          {path.steps.map((step, index) => {
            const episode = episodeBySlug(step.episodeSlug);
            const href = episode ? `/episodes/${episode.slug}${step.chapterStart !== undefined ? `?t=${step.chapterStart}` : ""}` : undefined;
            return (
              <article key={step.title} className="temple-border rounded p-5">
                <p className="text-xs uppercase tracking-[.18em] text-gold">Step {index + 1}</p>
                <h2 className="mt-2 font-display text-2xl text-ivory">{step.title}</h2>
                <p className="mt-3 leading-7 text-parchment">{step.summary}</p>
                {href ? (
                  <Link href={href} className="focus-ring mt-4 inline-flex rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10">
                    {episode?.title}
                    {step.chapterStart !== undefined ? ` at ${formatSeconds(step.chapterStart)}` : ""}
                  </Link>
                ) : null}
                {step.bookTitle ? <p className="mt-4 text-sm text-gold">Book: {step.bookTitle}</p> : null}
                <p className="mt-4 rounded border border-gold/15 p-3 text-sm leading-6 text-parchment">{step.prompt}</p>
              </article>
            );
          })}
        </div>
        <PathProgress path={path} />
      </div>
    </Section>
  );
}
