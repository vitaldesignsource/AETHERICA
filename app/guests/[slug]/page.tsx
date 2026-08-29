import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { episodes, guests } from "@/lib/data/demo";
import { formatSeconds } from "@/lib/format";

export function generateStaticParams() {
  return guests.map((guest) => ({ slug: guest.slug }));
}

function slugifyName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function matchesGuestText(value: string, guestName: string) {
  const normalized = value.toLowerCase();
  const name = guestName.toLowerCase();
  const lastName = name.split(" ").at(-1) ?? name;
  return normalized.includes(name) || normalized.includes(lastName);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guest = guests.find((item) => item.slug === slug);
  if (!guest) return { title: "Guest" };
  // `guests` is built by spreading `hosts` into it (lib/data/demo.ts), so the two hosts each own a
  // profile at /guests/<slug> AND /hosts/<slug>. Point a host's guest page at the host profile so
  // the pair does not compete for their name; genuine guests stay self-canonical.
  const isHost = guest.profileType === "host";
  const canonical = isHost ? `/hosts/${guest.slug}` : `/guests/${guest.slug}`;
  return {
    title: isHost ? `${guest.name} — Episode Appearances` : guest.name,
    description: guest.shortBio,
    alternates: { canonical },
    openGraph: {
      title: `${guest.name} — Aetherica Podcast`,
      description: guest.shortBio,
      url: canonical,
      type: "profile",
      images: guest.imageUrl ? [{ url: guest.imageUrl, alt: guest.imageAlt ?? guest.name }] : undefined
    }
  };
}

export default async function GuestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = guests.find((item) => item.slug === slug);
  if (!guest) notFound();

  const appearances = episodes.filter((episode) =>
    [episode.guest, episode.hosts.join(" "), episode.title, episode.longIntroduction].some((value) => matchesGuestText(value, guest.name))
  );
  const transcriptExcerpts = appearances
    .flatMap((episode) =>
      episode.transcript
        .filter((segment) => matchesGuestText([segment.speaker, segment.text, segment.section].join(" "), guest.name))
        .map((segment) => ({ episode, segment }))
    )
    .slice(0, 6);
  const topicSet = new Set([...guest.studyAreas, ...appearances.flatMap((episode) => episode.topics)]);
  const relatedGuests = (guest.relatedGuests ?? []).map((name) => ({ name, slug: slugifyName(name) }));

  return (
    <Section eyebrow="Guest profile" title={guest.name}>
      <div className="grid gap-8 lg:grid-cols-[1fr_.72fr]">
        <article>
          <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
            {guest.imageUrl ? (
              <Image src={guest.imageUrl} alt={guest.imageAlt ?? guest.name} width={400} height={400} className="aspect-square rounded object-cover shadow-aureate" />
            ) : (
              <div className="grid aspect-square place-items-center rounded border border-gold/25 bg-obsidian text-center font-display text-5xl text-gold shadow-aureate">
                {guest.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </div>
            )}
            <div>
              <p className="text-gold">{guest.role}</p>
              <p className="mt-6 leading-8 text-parchment">{guest.longBio}</p>
              {guest.profileType === "host" ? (
                <Link className="focus-ring mt-5 inline-flex rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10" href={`/hosts/${guest.slug}`}>
                  Open host profile
                </Link>
              ) : null}
            </div>
          </div>

          <section className="mt-10">
            <h2 className="font-display text-3xl text-ivory">Areas of Expertise</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...topicSet].map((area) => <span key={area} className="rounded border border-gold/25 px-2 py-1 text-sm text-parchment">{area}</span>)}
            </div>
          </section>

          {guest.books?.length ? (
            <section className="mt-10">
              <h2 className="font-display text-3xl text-ivory">Books</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {guest.books.map((book) => (
                  <article key={book.title} className="temple-border rounded p-4">
                    {book.coverImage ? (
                      <Image src={book.coverImage} alt={`${book.title} cover`} width={360} height={520} className="aspect-[3/4] w-full rounded bg-obsidian object-contain" />
                    ) : null}
                    <h3 className="font-display text-2xl text-ivory">{book.title}</h3>
                    {book.subtitle ? <p className="mt-1 text-sm text-gold">{book.subtitle}</p> : null}
                    <p className="mt-2 text-sm text-limestone">{[book.publisher, book.status].filter(Boolean).join(" · ")}</p>
                    <p className="mt-3 text-sm leading-6 text-parchment">{book.description}</p>
                    <a href={book.sourceUrl} target={book.sourceUrl.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="focus-ring mt-4 inline-flex rounded border border-gold/50 px-3 py-2 text-sm text-ivory">
                      View book
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="font-display text-3xl text-ivory">Aetherica Appearances</h2>
            <div className="mt-4 grid gap-4">
              {appearances.length ? appearances.slice(0, 24).map((episode) => (
                <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="temple-border focus-ring rounded p-4 hover:border-gold/60">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">Episode {episode.number}</p>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{episode.title}</h3>
                  <p className="mt-2 text-parchment">{episode.description}</p>
                </Link>
              )) : (
                <p className="temple-border rounded p-5 text-parchment">
                  No verified Aetherica appearances are attached to this profile yet. This page is ready to populate as episode metadata and transcripts are reviewed.
                </p>
              )}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl text-ivory">Important Transcript Excerpts</h2>
            <div className="mt-4 grid gap-4">
              {transcriptExcerpts.length ? transcriptExcerpts.map(({ episode, segment }) => (
                <Link key={`${episode.slug}-${segment.id}`} href={`/episodes/${episode.slug}?t=${segment.start}#${segment.id}`} className="temple-border focus-ring rounded p-4 hover:border-gold/60">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{formatSeconds(segment.start)} · {segment.section}</p>
                  <h3 className="mt-2 font-display text-xl text-ivory">{episode.title}</h3>
                  <p className="mt-3 leading-7 text-parchment">{segment.text}</p>
                </Link>
              )) : (
                <p className="temple-border rounded p-5 text-parchment">
                  Transcript excerpts will appear here as this guest is found in reviewed transcript passages.
                </p>
              )}
            </div>
          </section>
        </article>

        <aside className="grid content-start gap-5">
          <div className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Official Links</h2>
            <div className="mt-4 grid gap-3">
              {guest.socials.length ? guest.socials.map((social) => (
                <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="text-parchment hover:text-ivory">
                  {social.label}
                </a>
              )) : <p className="text-parchment">Official links can be attached here once verified.</p>}
            </div>
          </div>

          <div className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Topics Discussed</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...topicSet].map((topic) => (
                <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} className="focus-ring rounded border border-gold/25 px-2 py-1 text-sm text-parchment hover:text-ivory">
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          <div className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Related Guests</h2>
            <div className="mt-4 grid gap-3">
              {relatedGuests.length ? relatedGuests.map((related) => {
                const hasProfile = guests.some((item) => item.slug === related.slug);
                return hasProfile ? (
                  <Link key={related.name} className="text-parchment hover:text-ivory" href={`/guests/${related.slug}`}>{related.name}</Link>
                ) : (
                  <Link key={related.name} className="text-parchment hover:text-ivory" href={`/search?q=${encodeURIComponent(related.name)}`}>{related.name}</Link>
                );
              }) : <p className="text-parchment">Related profiles will appear as the network grows.</p>}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
