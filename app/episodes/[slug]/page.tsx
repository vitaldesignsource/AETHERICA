import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChapterStartButton } from "@/components/audio/ChapterStartButton";
import { EpisodePlayButton } from "@/components/audio/EpisodePlayButton";
import { EpisodeDeepLink } from "@/components/audio/EpisodeDeepLink";
import { EpisodeMediaChooser } from "@/components/audio/EpisodeMediaChooser";
import { EpisodeEditorialSummary } from "@/components/episodes/EpisodeEditorialSummary";
import { SaveToLibraryButton } from "@/components/research/SaveToLibraryButton";
import { Section } from "@/components/ui/Section";
import { episodes } from "@/lib/data/demo";
import { chapterKeywords, chapterSummary, continueTheCurrent } from "@/lib/data/research";
import { formatDate, formatSeconds } from "@/lib/format";
import { episodeJsonLd } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = episodes.find((item) => item.slug === slug);
  if (!episode) return {};
  return {
    title: episode.title,
    description: episode.description,
    alternates: { canonical: `/episodes/${episode.slug}` },
    openGraph: {
      title: episode.title,
      description: episode.description,
      images: [episode.coverImage],
      type: "article",
      publishedTime: episode.publishedAt
    }
  };
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = episodes.find((item) => item.slug === slug);
  if (!episode) notFound();
  // Computed here, on the server, so autoplay-next never needs the episode list in the browser.
  const episodeIndex = episodes.findIndex((item) => item.slug === episode.slug);
  const following = episodes.slice(episodeIndex + 1).find((item) => item.audioUrl);
  const upNext = following ? { slug: following.slug, title: following.title } : null;
  const current = continueTheCurrent(episode);
  const editorialTerms = [episode.guest, ...episode.topics, "Aetherica", "symbol", "ritual", "cosmology"].filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeJsonLd(episode)) }} />
      <EpisodeDeepLink episode={episode} upNext={upNext} />
      <Section eyebrow={`Episode ${episode.number}`} title={episode.title}>
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(340px,.88fr)]">
          <aside className="temple-border sticky top-28 overflow-hidden rounded p-4 max-xl:static xl:order-2" aria-label="Episode listening dossier">
            <div className="relative overflow-hidden rounded border border-gold/20 bg-black">
              <Image src={episode.coverImage} alt="" width={900} height={900} className="aspect-video w-full object-contain" priority />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(181,146,85,.18),transparent_18rem)]" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <EpisodePlayButton episode={episode} upNext={upNext} />
              <SaveToLibraryButton kind="Episode" title={episode.title} href={`/episodes/${episode.slug}`} collection="Episodes to Revisit" note={episode.description} />
            </div>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-gold/15 bg-black/28 p-3">
                <dt className="text-[10px] uppercase tracking-[.2em] text-gold">Published</dt>
                <dd className="mt-1 text-sm text-ivory">{episode.publishedAt ? formatDate(episode.publishedAt) : episode.publishedLabel || "Public YouTube episode"}</dd>
              </div>
              <div className="rounded border border-gold/15 bg-black/28 p-3">
                <dt className="text-[10px] uppercase tracking-[.2em] text-gold">Duration</dt>
                <dd className="mt-1 text-sm text-ivory">{episode.duration || "Archive"}</dd>
              </div>
              <div className="rounded border border-gold/15 bg-black/28 p-3">
                <dt className="text-[10px] uppercase tracking-[.2em] text-gold">Season</dt>
                <dd className="mt-1 text-sm text-ivory">{episode.season}</dd>
              </div>
              <div className="rounded border border-gold/15 bg-black/28 p-3">
                <dt className="text-[10px] uppercase tracking-[.2em] text-gold">Chapters</dt>
                <dd className="mt-1 text-sm text-ivory">{episode.chapters.length || "Pending"}</dd>
              </div>
            </dl>

            {episode.guest ? (
              <div className="mt-4 rounded border border-gold/15 bg-black/28 p-3">
                <p className="text-[10px] uppercase tracking-[.2em] text-gold">Guest</p>
                <p className="mt-1 font-display text-xl text-ivory">{episode.guest}</p>
                <div className="mt-3">
                  <SaveToLibraryButton kind="Guest" title={episode.guest} href={`/search?q=${encodeURIComponent(episode.guest)}`} collection="Presentation Sources" />
                </div>
              </div>
            ) : null}

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[.2em] text-gold">Study currents</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {episode.topics.map((topic) => <span className="rounded border border-gold/25 bg-black/20 px-2 py-1 text-xs text-parchment" key={topic}>{topic}</span>)}
              </div>
            </div>

            {episode.chapters.length ? (
              <div className="chapter-gate mt-7 overflow-hidden rounded border border-gold/30 bg-black/35">
                <div className="relative border-b border-gold/20 px-5 py-5">
                  <div className="pointer-events-none absolute -right-6 -top-12 size-32 rounded-full border border-gold/15" aria-hidden="true" />
                  <div className="pointer-events-none absolute right-8 top-4 size-10 rotate-45 border border-gold/15" aria-hidden="true" />
                  <p className="text-[10px] uppercase tracking-[.3em] text-gold">A guided threshold</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <h2 className="font-display text-2xl text-ivory">Enter by chapter</h2>
                    <a href="#chapters" className="focus-ring rounded text-xs uppercase tracking-[.16em] text-parchment hover:text-ivory">All {episode.chapters.length}</a>
                  </div>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-limestone">Begin at a distinct movement in the conversation. Playback opens at the selected threshold.</p>
                </div>
                <div className="relative px-4 py-3 before:absolute before:bottom-7 before:left-[2.05rem] before:top-7 before:w-px before:bg-gradient-to-b before:from-gold/15 before:via-gold/55 before:to-gold/15">
                  {episode.chapters.slice(0, 5).map((chapter, index) => (
                    <div key={chapter.start} className="group/chapter relative grid grid-cols-[2.2rem_1fr] gap-3 py-3">
                      <span className="relative z-10 grid size-7 place-items-center self-start rounded-full border border-gold/45 bg-obsidian font-display text-xs text-gold shadow-[0_0_0_4px_rgba(8,8,8,.9)] transition group-hover/chapter:border-ivory group-hover/chapter:text-ivory">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 border-b border-gold/10 pb-3 transition group-last/chapter:border-transparent group-hover/chapter:border-gold/35">
                        <p className="text-[10px] uppercase tracking-[.18em] text-gold">{formatSeconds(chapter.start)}</p>
                        <div className="mt-1 font-display text-lg leading-tight text-ivory transition group-hover/chapter:translate-x-1 group-hover/chapter:text-gold">
                          <ChapterStartButton episode={episode} start={chapter.start} title={chapter.title} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="min-w-0 xl:order-1">
            <p className="text-gold">{episode.subtitle}</p>
            <p className="mt-4 text-parchment">
              {episode.publishedAt ? formatDate(episode.publishedAt) : episode.publishedLabel || "Public YouTube episode"}{" "}
              {episode.duration ? `· ${episode.duration} ` : ""}· Season {episode.season}
              {episode.guest ? ` · Guest: ${episode.guest}` : ""}
            </p>
            <div className="mt-8">
              <EpisodeEditorialSummary
                text={episode.longIntroduction}
                emphasisTerms={editorialTerms}
                eyebrow="The conversation"
                maxParagraphs={3}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {episode.topics.map((topic) => <span className="rounded border border-gold/25 px-2 py-1 text-xs text-parchment" key={topic}>{topic}</span>)}
            </div>
          </div>
        </div>

        <EpisodeMediaChooser episode={episode} />

        <nav className="sticky top-20 z-30 my-12 border-y border-gold/15 bg-obsidian/92 py-3 shadow-[0_18px_35px_rgba(0,0,0,.34)] backdrop-blur-md" aria-label="Episode sections">
          <div className="flex gap-3 overflow-x-auto text-sm text-parchment [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["Overview", "Show Notes", "Chapters", "Transcript", "Quotations", "Related"].map((label) => (
              <a key={label} className="focus-ring shrink-0 rounded border border-gold/25 bg-black/45 px-3 py-2 hover:border-gold/55 hover:text-ivory" href={`#${label.toLowerCase().replace(" ", "-")}`}>{label}</a>
            ))}
          </div>
        </nav>

        <section id="overview">
          <h2 className="font-display text-3xl text-ivory">Overview</h2>
          <div className="mt-4">
            <EpisodeEditorialSummary text={episode.description} emphasisTerms={editorialTerms} compact />
          </div>
        </section>

        <section id="show-notes" className="mt-10">
          <h2 className="font-display text-3xl text-ivory">Show Notes</h2>
          <p className="mt-3 text-sm uppercase tracking-[.18em] text-gold">{episode.descriptionSource ?? "Editorial notes"}</p>
          <div className="mt-4">
            <EpisodeEditorialSummary text={episode.longIntroduction} emphasisTerms={editorialTerms} />
          </div>
        </section>

        <section id="chapters" className="mt-10">
          <h2 className="font-display text-3xl text-ivory">Chapters</h2>
          <div className="mt-4 grid gap-3">
            {episode.chapters.map((chapter, index) => (
              <article key={chapter.start} className="temple-border rounded p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row">
                  <div>
                    <p className="text-sm text-gold">{formatSeconds(chapter.start)} · Chapter {index + 1}</p>
                    <h3 className="mt-2 font-display text-2xl text-ivory">
                      <ChapterStartButton episode={episode} start={chapter.start} title={chapter.title} />
                    </h3>
                    <p className="mt-3 leading-7 text-parchment">{chapter.summary ?? chapterSummary(episode, chapter.title)}</p>
                  </div>
                  <div className="shrink-0">
                    <EpisodePlayButton episode={episode} start={chapter.start} />
                  </div>
                </div>
                <div className="mt-4">
                  <SaveToLibraryButton
                    kind="Chapter"
                    title={`${chapter.title} · ${episode.title}`}
                    href={`/episodes/${episode.slug}?t=${chapter.start}#chapters`}
                    collection={episode.topics.includes("Martinism") ? "Martinism" : "Episodes to Revisit"}
                    note={chapter.summary ?? chapterSummary(episode, chapter.title)}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(chapter.keywords ?? chapterKeywords(episode, chapter.title)).map((keyword) => (
                    <span key={keyword} className="rounded border border-gold/25 px-2 py-1 text-xs text-parchment">{keyword}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="transcript" className="mt-10">
          <h2 className="font-display text-3xl text-ivory">Transcript</h2>
          <div className="mt-4 grid gap-4">
            {episode.transcript.length ? episode.transcript.map((segment) => (
              <article id={segment.id} key={segment.id} className="temple-border rounded p-4">
                <p className="text-sm text-gold">{formatSeconds(segment.start)} · {segment.speaker} · {segment.section}</p>
                <p className="mt-3 leading-8 text-parchment">{segment.text}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <EpisodePlayButton episode={episode} start={segment.start} />
                  <a className="focus-ring rounded border border-gold/40 px-3 py-2 text-sm text-ivory" href={`/episodes/${episode.slug}?t=${segment.start}#${segment.id}`}>Copy timestamp URL</a>
                  <SaveToLibraryButton
                    kind="Transcript passage"
                    title={`${formatSeconds(segment.start)} · ${episode.title}`}
                    href={`/episodes/${episode.slug}?t=${segment.start}#${segment.id}`}
                    collection={segment.speaker.toLowerCase().includes("ike") ? "Favorite Ike Baker Passages" : "Presentation Sources"}
                    note={segment.text}
                  />
                </div>
              </article>
            )) : <p className="text-parchment">A reviewed transcript has not been attached yet. Public YouTube description data is available in the show notes above.</p>}
          </div>
        </section>

        <section id="related" className="mt-10">
          <h2 className="font-display text-3xl text-ivory">{current.label}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {current.foundational ? (
              <a className="temple-border focus-ring rounded p-4 hover:border-gold/60" href={`/episodes/${current.foundational.slug}`}>
                <p className="text-xs uppercase tracking-[.18em] text-gold">Foundational episode</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{current.foundational.title}</h3>
              </a>
            ) : null}
            {current.advanced ? (
              <a className="temple-border focus-ring rounded p-4 hover:border-gold/60" href={`/episodes/${current.advanced.slug}`}>
                <p className="text-xs uppercase tracking-[.18em] text-gold">Advanced episode</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{current.advanced.title}</h3>
              </a>
            ) : null}
            <div className="temple-border rounded p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Related guest or guide</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{current.guest}</h3>
            </div>
            <div className="temple-border rounded p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Relevant book</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{current.book}</h3>
            </div>
            {current.chapter ? (
              <a className="temple-border focus-ring rounded p-4 hover:border-gold/60 md:col-span-2" href={`/episodes/${current.chapter.episode.slug}?t=${current.chapter.chapter.start}`}>
                <p className="text-xs uppercase tracking-[.18em] text-gold">Chapter from another episode</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{current.chapter.chapter.title}</h3>
                <p className="mt-2 text-parchment">{current.chapter.episode.title}</p>
              </a>
            ) : null}
          </div>
        </section>
      </Section>
    </>
  );
}
