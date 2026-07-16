import type { Metadata } from "next";
import Link from "next/link";
import { EpisodePlayButton } from "@/components/audio/EpisodePlayButton";
import { Section } from "@/components/ui/Section";
import { searchSpokenArchive } from "@/lib/data/research";
import { searchArchive } from "@/lib/search/local";
import { formatSeconds } from "@/lib/format";

export const metadata: Metadata = {
  title: "Search the Spoken Archive",
  description: "Search Aetherica transcript passages, speakers, episodes, timestamps, chapters, books, and archive metadata."
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q ?? "";
  const spokenResults = searchSpokenArchive(query);
  const fallbackResults = searchArchive(query).slice(0, 8);

  return (
    <Section eyebrow="Spoken archive" title="Search every passage we have">
      <form className="temple-border mb-8 flex flex-col gap-3 rounded p-4 sm:flex-row" role="search">
        <label className="sr-only" htmlFor="q">Search query</label>
        <input
          id="q"
          name="q"
          defaultValue={query}
          className="focus-ring min-h-12 flex-1 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
          placeholder="Agrippa planetary virtues"
        />
        <button className="focus-ring min-h-12 rounded bg-gold px-5 font-semibold text-obsidian">Search</button>
      </form>

      {!query ? (
        <div className="temple-border rounded p-6 text-parchment">
          Search for a person, book, symbol, phrase, tradition, or topic. Transcript-backed passages will appear first; show-note matches fill gaps until full transcripts are attached.
        </div>
      ) : null}

      {query ? (
        <div className="grid gap-5">
          {spokenResults.map((result) => (
            <article key={`${result.type}-${result.episode.guid}-${result.start}-${result.chapter}`} className="temple-border rounded p-5">
              <p className="text-xs uppercase tracking-[.18em] text-gold">
                {result.type} · {result.speaker} · {formatSeconds(result.start)}
              </p>
              <h2 className="mt-2 font-display text-2xl text-ivory">
                <Link href={`/episodes/${result.episode.slug}?t=${result.start}`}>{result.episode.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-gold">Relevant chapter: {result.chapter}</p>
              <p className="mt-4 leading-7 text-parchment">{result.passage}</p>
              {result.relatedBooks.length ? (
                <p className="mt-4 text-sm text-parchment">
                  <span className="text-gold">Related books:</span> {result.relatedBooks.join(", ")}
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3">
                <EpisodePlayButton episode={result.episode} start={result.start} />
                <Link className="focus-ring rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10" href={`/episodes/${result.episode.slug}?t=${result.start}`}>
                  Open timestamp
                </Link>
              </div>
            </article>
          ))}

          {!spokenResults.length && fallbackResults.length ? (
            <>
              <p className="text-sm uppercase tracking-[.18em] text-gold">Metadata matches</p>
              {fallbackResults.map((result) => (
                <article key={`${result.type}-${result.href}`} className="temple-border rounded p-5">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{result.type} · {result.context}</p>
                  <h2 className="mt-2 font-display text-2xl text-ivory"><Link href={result.href}>{result.title}</Link></h2>
                  <p className="mt-3 text-parchment">{result.excerpt}</p>
                </article>
              ))}
            </>
          ) : null}

          {!spokenResults.length && !fallbackResults.length ? <p className="text-parchment">No archive matches yet.</p> : null}
        </div>
      ) : null}
    </Section>
  );
}
