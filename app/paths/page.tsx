import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Clock3, Route } from "lucide-react";
import { PathCoverArt } from "@/components/paths/PathCoverArt";
import { Section } from "@/components/ui/Section";
import { listeningPaths } from "@/lib/data/research";
import type { ListeningPath } from "@/lib/data/types";

export const metadata: Metadata = {
  title: "Listening Paths",
  description: "Curated initiatic listening paths through Aetherica episodes, chapters, books, and study prompts."
};

export default function PathsPage() {
  const [featuredPath, ...remainingPaths] = listeningPaths;

  return (
    <Section eyebrow="Initiatic listening paths" title="Curated routes through the archive">
      <div className="max-w-4xl">
        <p className="text-xl leading-8 text-parchment">
          Each route gathers episodes, chapters, books, and reflection prompts into a coherent study current. Enter through a full path, or use the route index below to choose by subject, theme, or first step.
        </p>
      </div>

      {featuredPath ? (
        <Link href={`/paths/${featuredPath.slug}`} className="focus-ring mt-10 block rounded-lg">
          <PathCoverArt path={featuredPath} />
        </Link>
      ) : null}

      <div className="mt-12 grid gap-5 xl:grid-cols-2">
        {remainingPaths.map((path, index) => (
          <PathRouteCard key={path.slug} path={path} index={index + 2} />
        ))}
      </div>
    </Section>
  );
}

function PathRouteCard({ path, index }: { path: ListeningPath; index: number }) {
  const firstStep = path.steps[0];
  const minutes = path.steps.length * 15;

  return (
    <Link
      href={`/paths/${path.slug}`}
      className="focus-ring group relative isolate overflow-hidden rounded-lg border border-gold/25 bg-black/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/65 hover:bg-black/72 sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_22%,rgba(181,146,85,.2),transparent_16rem),linear-gradient(135deg,rgba(122,17,26,.18),transparent_45%,rgba(181,146,85,.12))]" />
      <div className="pointer-events-none absolute right-5 top-5 -z-10 grid size-24 place-items-center rounded-full border border-gold/18 text-gold/20 transition duration-300 group-hover:text-gold/34">
        <Route size={48} strokeWidth={1.1} />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[.22em] text-gold">
        <span>{String(index).padStart(2, "0")}</span>
        <span className="h-px w-10 bg-gold/35" />
        <span>{path.steps.length} steps</span>
      </div>

      <h2 className="font-cinzel-brand mt-5 max-w-2xl text-3xl leading-tight text-ivory sm:text-4xl">
        {path.title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-parchment">{path.summary}</p>

      <div className="mt-6 grid gap-3 border-y border-gold/12 py-4 text-sm text-parchment sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <BookOpenCheck size={18} className="text-gold" />
          <span>{path.steps.length} guided steps</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock3 size={18} className="text-gold" />
          <span>About {minutes} minutes</span>
        </div>
      </div>

      <div className="mt-5 rounded border border-gold/15 bg-black/28 p-4">
        <p className="text-xs uppercase tracking-[.2em] text-gold">First threshold</p>
        <p className="mt-2 font-display text-xl leading-snug text-ivory">{firstStep?.title}</p>
        <p className="mt-2 text-sm leading-6 text-parchment">{firstStep?.summary}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {path.topics.map((topic) => (
          <span key={topic} className="rounded border border-gold/25 bg-black/24 px-3 py-1 text-xs text-parchment">
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-[.22em] text-gold transition group-hover:text-ivory">
        Enter Path <ArrowRight size={18} />
      </div>
    </Link>
  );
}
