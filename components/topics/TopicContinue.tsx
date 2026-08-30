import Link from "next/link";
import { ArrowUpRight, Route } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { topics } from "@/lib/data/demo";
import { listeningPaths } from "@/lib/data/research";
import type { Topic } from "@/lib/data/types";

/**
 * The Continue band: where a subject page hands the reader onward. Until now no topic page
 * linked to any sibling — thirteen rooms with no doors between them.
 */
const RELATED: Record<string, string[]> = {
  alchemy: ["hermeticism", "astrology", "symbolism"],
  theurgy: ["hermeticism", "philosophy", "christian-mysticism"],
  hermeticism: ["alchemy", "astrology", "western-esotericism"],
  astrology: ["hermeticism", "alchemy", "symbolism"],
  kabbalah: ["mysticism", "western-esotericism", "symbolism"],
  gnosticism: ["hermeticism", "mysticism", "christian-mysticism"],
  freemasonry: ["sacred-architecture", "symbolism", "western-esotericism"],
  mysticism: ["christian-mysticism", "kabbalah", "philosophy"],
  philosophy: ["theurgy", "mysticism", "western-esotericism"],
  "christian-mysticism": ["mysticism", "gnosticism", "theurgy"],
  symbolism: ["sacred-architecture", "alchemy", "freemasonry"],
  "sacred-architecture": ["freemasonry", "symbolism", "philosophy"],
  "western-esotericism": ["hermeticism", "kabbalah", "freemasonry"]
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function TopicContinue({ topic }: { topic: Topic }) {
  const related = (RELATED[topic.slug] ?? [])
    .map((slug) => topics.find((item) => item.slug === slug))
    .filter((item): item is Topic => Boolean(item));
  // A listening path counts as this topic's when the topic appears in its subject tags.
  const path = listeningPaths.find((candidate) => candidate.topics.some((name) => slugify(name) === topic.slug));

  if (!related.length && !path) return null;

  return (
    <Section eyebrow="Continue" title="Adjacent currents">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/topics/${item.slug}`}
            className="focus-ring group flex items-start justify-between gap-3 rounded border border-gold/20 bg-black/40 p-5 transition hover:border-gold/50 hover:bg-gold/10"
          >
            <span className="min-w-0">
              <span className="block font-display text-xl text-ivory group-hover:text-gold">{item.title}</span>
              <span className="mt-1.5 block text-sm leading-6 text-parchment">{item.definition}</span>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" className="mt-1 shrink-0 text-gold opacity-0 transition group-hover:opacity-100" />
          </Link>
        ))}
        {path ? (
          <Link
            href={`/paths/${path.slug}`}
            className="focus-ring group rounded border border-gold/40 bg-gold/[.07] p-5 transition hover:border-gold/70 hover:bg-gold/[.12]"
          >
            <span className="inline-flex items-center gap-2 text-[.66rem] uppercase tracking-[.2em] text-gold">
              <Route size={13} aria-hidden="true" /> Listening path
            </span>
            <span className="mt-1.5 block font-display text-xl text-ivory group-hover:text-gold">{path.title}</span>
            <span className="mt-1.5 block text-sm leading-6 text-parchment">
              {path.steps.length} steps · {path.difficulty}
            </span>
          </Link>
        ) : null}
      </div>
    </Section>
  );
}
