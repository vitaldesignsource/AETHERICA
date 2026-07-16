import type { Metadata } from "next";
import Link from "next/link";
import { EpisodePlayButton } from "@/components/audio/EpisodePlayButton";
import { Section } from "@/components/ui/Section";
import { allChapterEntries } from "@/lib/data/research";
import { formatSeconds } from "@/lib/format";

export const metadata: Metadata = {
  title: "Chapter Discovery",
  description: "Discover Aetherica by chapter, timestamp, keyword, topic, quotation, and suggested next chapter."
};

export default function ChaptersPage() {
  const entries = allChapterEntries().slice(0, 60);

  return (
    <Section eyebrow="Chapter discovery" title="Enter through the exact passage">
      <p className="max-w-3xl leading-8 text-parchment">
        Each chapter can behave like a small research object: title, summary, timestamp URL, keywords, topics, quotations, and a suggested next step.
      </p>
      <div className="mt-8 grid gap-5">
        {entries.map(({ episode, chapter, summary, keywords, nextChapter }) => (
          <article key={`${episode.guid}-${chapter.start}`} className="temple-border rounded p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="text-xs uppercase tracking-[.18em] text-gold">{formatSeconds(chapter.start)} · {episode.title}</p>
                <h2 className="mt-2 font-display text-2xl text-ivory">
                  <Link href={`/episodes/${episode.slug}?t=${chapter.start}`}>{chapter.title}</Link>
                </h2>
                <p className="mt-3 leading-7 text-parchment">{summary}</p>
              </div>
              <div className="shrink-0">
                <EpisodePlayButton episode={episode} start={chapter.start} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {keywords.map((keyword) => <span key={keyword} className="rounded border border-gold/25 px-2 py-1 text-xs text-parchment">{keyword}</span>)}
            </div>
            {chapter.quotations?.length ? (
              <blockquote className="mt-5 border-l border-gold/40 pl-4 text-parchment">{chapter.quotations[0]}</blockquote>
            ) : null}
            {nextChapter ? (
              <Link href={`/episodes/${episode.slug}?t=${nextChapter.start}`} className="focus-ring mt-5 inline-flex rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10">
                Suggested next chapter: {nextChapter.title}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
