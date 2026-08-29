import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, Landmark, Library } from "lucide-react";
import { AboutEsotericBanner } from "@/components/sections/AboutEsotericBanner";
import { ArchiveScale } from "@/components/sections/ArchiveScale";
import { Reveal } from "@/components/topics/Reveal";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";
import { episodes, hosts, topics } from "@/lib/data/demo";
import { listeningPaths } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Aetherica mission: exploring the hidden architecture of philosophy, esotericism, religion, and history for the modern philosopher magician.",
  alternates: { canonical: "/about" }
};

/** Kept in step with the resources index; the homepage counts the same way. */
const INSTRUMENT_COUNT = 33;

/**
 * The subjects were previously buried mid-paragraph. Surfacing them as a grid lets a reader see
 * the territory at a glance, and each one that has a dossier becomes a way in.
 */
const SUBJECT_SLUGS = [
  "hermeticism",
  "alchemy",
  "theurgy",
  "kabbalah",
  "gnosticism",
  "astrology",
  "mysticism",
  "freemasonry",
  "philosophy",
  "christian-mysticism",
  "symbolism",
  "sacred-architecture"
];

const ARCHIVE_FACETS = [
  {
    icon: Library,
    title: "A Library",
    body: "Episodes, transcripts, chapters, and sources, cross-linked so a passage can be traced back to the conversation it came from."
  },
  {
    icon: Compass,
    title: "An Observatory",
    body: "Instruments for planetary hours, decans, lunar mansions, and elemental tides — calculation rather than assertion."
  },
  {
    icon: Landmark,
    title: "A Temple",
    body: "Symbolic architecture held as a living system: the tree, the wheel, the stages of the work, mapped and walkable."
  },
  {
    icon: BookOpen,
    title: "A Research Institute",
    body: "Dossiers with chronologies, glossaries, figures, and representative texts, built for study rather than for scrolling."
  }
];

export default function AboutPage() {
  const athena = resolveSiteImage("/images/about-athena");
  const blackMirror = resolveSiteImage("/images/about-black-mirror");
  const subjects = SUBJECT_SLUGS.map((slug) => topics.find((topic) => topic.slug === slug)).filter(
    (topic): topic is (typeof topics)[number] => Boolean(topic)
  );

  const archiveStats = [
    { value: episodes.length, label: "Episodes", detail: "Recorded conversations and studies", href: "/episodes" },
    { value: INSTRUMENT_COUNT, label: "Instruments", detail: "Interactive calculators and explorers", href: "/resources" },
    { value: topics.length, label: "Topics", detail: "Threads through the tradition", href: "/topics" },
    { value: listeningPaths.length, label: "Paths", detail: "Guided sequences for study", href: "/paths" }
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <AboutEsotericBanner />
      </div>

      <Reveal>
        <Section eyebrow="About Aetherica" title="The Aetherica mission">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
            <div>
              <p className="max-w-3xl text-2xl leading-10 text-ivory">
                Exploring the world&apos;s wisdom traditions, mystery schools, symbolic sciences, and
                hidden histories through conversations with leading scholars, practitioners, and
                researchers.
              </p>
              <div className="mt-8 grid max-w-3xl gap-5 border-l border-gold/25 pl-6 leading-8 text-parchment">
                <p>
                  Aetherica is an exploration of the world&apos;s wisdom traditions, esoteric
                  philosophies, symbolic sciences, and hidden histories. Through in-depth
                  conversations with scholars, practitioners, authors, historians, initiates, and
                  independent researchers, the podcast investigates the ideas, symbols, and practices
                  that have shaped humanity&apos;s understanding of reality across cultures and
                  centuries.
                </p>
                <p>
                  Alongside these classical traditions, Aetherica also explores emerging questions
                  surrounding science, culture, technology, and the evolving frontiers of human
                  knowledge.
                </p>
              </div>
            </div>

            <div className="grid gap-6 self-start">
              {athena ? (
                <figure className="relative isolate overflow-hidden rounded border border-gold/25 bg-black/60 shadow-aureate">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={athena}
                      alt="A marble statue of Athena in helmet and full drapery, one hand resting on a cracked round shield, lit against a dark gallery wall"
                      fill
                      sizes="(min-width: 1024px) 40vw, calc(100vw - 2rem)"
                      style={{ objectPosition: "50% 22%" }}
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,rgba(8,8,8,.9))]" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-cinzel-brand text-xs text-gold">Athena · Ἀθηνᾶ</p>
                    <p className="mt-2 text-sm leading-6 text-parchment">
                      Wisdom armed: the tradition has always held that understanding is something you
                      carry into the world, not something you retreat with.
                    </p>
                  </figcaption>
                </figure>
              ) : null}

              <aside className="temple-border rounded p-6">
              <p className="text-xs uppercase tracking-[.26em] text-gold">The hosts</p>
              <div className="mt-5 grid gap-5">
                {hosts.map((host) => (
                  <Link
                    key={host.slug}
                    href={`/hosts/${host.slug}`}
                    className="focus-ring group grid grid-cols-[64px_1fr] items-center gap-4 rounded p-2 transition hover:bg-gold/10"
                  >
                    {host.imageUrl ? (
                      <Image
                        src={host.imageUrl}
                        alt=""
                        width={128}
                        height={128}
                        className="aspect-square rounded-full border border-gold/25 object-cover"
                      />
                    ) : (
                      <span className="aspect-square rounded-full border border-gold/25 bg-black/40" />
                    )}
                    <span className="min-w-0">
                      <span className="block font-display text-xl text-ivory group-hover:text-gold">
                        {host.name}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-limestone">{host.role}</span>
                    </span>
                  </Link>
                ))}
              </div>
              </aside>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* The etymology is the best line on the page; it was the fourth paragraph of five. */}
      <Reveal>
        <section className="relative isolate overflow-hidden border-y border-gold/20 bg-black/60">
          {blackMirror ? (
            <>
              <Image
                src={blackMirror}
                alt=""
                fill
                sizes="100vw"
                style={{ objectPosition: "50% 34%" }}
                className="-z-20 object-cover"
              />
              {/* The plate is the argument here, so it is held back only enough to read over. */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,.88),rgba(8,8,8,.72)_45%,rgba(8,8,8,.93))]" />
            </>
          ) : (
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_50%,rgba(181,146,85,.16),transparent_44%),radial-gradient(circle_at_78%_50%,rgba(122,17,26,.18),transparent_46%),linear-gradient(180deg,rgba(8,8,8,.9),rgba(8,8,8,.97))]" />
          )}
          <div className="relative mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
            <p className="font-cinzel-brand text-xs text-gold">Æther · αἰθήρ</p>
            <blockquote className="mt-6 font-display text-2xl leading-10 text-ivory sm:text-3xl sm:leading-[1.5]">
              The name <em className="text-gold">Aetherica</em> is inspired by the ancient concept of
              the aether — the subtle medium believed by many philosophical and mystical traditions
              to connect the visible and invisible dimensions of existence.
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl leading-8 text-parchment">
              It represents a meeting place where ideas, symbols, and traditions can be examined not
              as relics of the past, but as living systems of knowledge that continue to illuminate
              the present.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <Section eyebrow="The territory" title="Subjects the archive traverses">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="focus-ring group flex items-start justify-between gap-3 rounded border border-gold/20 bg-black/40 p-5 transition hover:border-gold/50 hover:bg-gold/10"
              >
                <span className="min-w-0">
                  <span className="block font-display text-2xl text-ivory group-hover:text-gold">
                    {topic.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-parchment">{topic.definition}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-gold opacity-0 transition group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section eyebrow="A living archive" title="Four buildings, one structure">
          <p className="max-w-3xl leading-8 text-parchment">
            More than a podcast, Aetherica is built as a living archive of the mystery traditions —
            a place to discover new perspectives, trace connections between distant subjects, and
            engage with the questions humanity has asked longest. The site is designed as four
            things at once.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ARCHIVE_FACETS.map(({ icon: Icon, title, body }) => (
              <article key={title} className="temple-border rounded bg-black/40 p-6">
                <div className="flex items-center gap-3">
                  <Icon className="text-gold" size={20} aria-hidden="true" />
                  <h3 className="font-display text-2xl text-ivory">{title}</h3>
                </div>
                <p className="mt-3 leading-7 text-parchment">{body}</p>
              </article>
            ))}
          </div>
        </Section>
      </Reveal>

      <ArchiveScale stats={archiveStats} />

      <Reveal>
        <Section eyebrow="Begin" title="Whether you are starting or decades in">
          <p className="max-w-3xl leading-8 text-parchment">
            Aetherica invites you to explore the pathways that lie between philosophy and practice,
            symbol and reality, history and myth, the seen and the unseen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/episodes"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[.14em] text-obsidian hover:bg-ivory"
            >
              Explore the archive
            </Link>
            <Link
              href="/paths"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/40 px-5 py-2.5 text-sm uppercase tracking-[.14em] text-parchment hover:bg-gold/10 hover:text-ivory"
            >
              Guided paths
            </Link>
            <Link
              href="/contact"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/40 px-5 py-2.5 text-sm uppercase tracking-[.14em] text-parchment hover:bg-gold/10 hover:text-ivory"
            >
              Get in touch
            </Link>
          </div>
        </Section>
      </Reveal>
    </>
  );
}
