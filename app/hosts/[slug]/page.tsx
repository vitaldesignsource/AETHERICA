import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { episodes, events, hosts } from "@/lib/data/demo";

export function generateStaticParams() {
  return hosts.map((host) => ({ slug: host.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const host = hosts.find((item) => item.slug === slug);
  if (!host) return { title: "Host" };
  return {
    title: host.name,
    description: host.shortBio,
    alternates: { canonical: `/hosts/${host.slug}` },
    openGraph: {
      title: `${host.name} — Aetherica Podcast`,
      description: host.shortBio,
      url: `/hosts/${host.slug}`,
      type: "profile",
      images: host.imageUrl ? [{ url: host.imageUrl, alt: host.imageAlt ?? host.name }] : undefined
    }
  };
}

export default async function HostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const host = hosts.find((item) => item.slug === slug);
  if (!host) notFound();
  const hostEpisodes = episodes.filter((episode) => episode.hosts.includes(host.name));

  return (
    <Section titleAs="h1" eyebrow="Host profile" title={host.name}>
      <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <article>
          <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
            {host.imageUrl ? (
              <Image src={host.imageUrl} alt={host.imageAlt ?? host.name} width={360} height={360} className="aspect-square rounded object-cover shadow-aureate" />
            ) : null}
            <div>
              <p className="text-gold">{host.role}</p>
              <p className="mt-6 leading-8 text-parchment">{host.longBio}</p>
            </div>
          </div>
          <h2 className="mt-10 font-display text-3xl text-ivory">Areas of Study</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {host.studyAreas.map((area) => <span key={area} className="rounded border border-gold/25 px-2 py-1 text-sm text-parchment">{area}</span>)}
          </div>
          {host.books?.length ? (
            <section className="mt-10">
              <h2 className="font-display text-3xl text-ivory">Books</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {host.books.map((book) => (
                  <article key={book.title} className="temple-border rounded p-4">
                    {book.coverImage ? (
                      <Image src={book.coverImage} alt={`${book.title} cover`} width={360} height={520} className="aspect-[3/4] w-full rounded bg-obsidian object-contain" />
                    ) : null}
                    <h3 className="mt-4 font-display text-2xl text-ivory">{book.title}</h3>
                    {book.subtitle ? <p className="mt-1 text-sm text-gold">{book.subtitle}</p> : null}
                    <p className="mt-2 text-sm text-limestone">{[book.publisher, book.status].filter(Boolean).join(" · ")}</p>
                    <p className="mt-3 text-sm leading-6 text-parchment">{book.description}</p>
                    <a href={book.sourceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mt-4 inline-flex rounded border border-gold/50 px-3 py-2 text-sm text-ivory">
                      View book
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </article>
        <aside className="grid gap-5">
          <div className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Links</h2>
            <div className="mt-4 grid gap-3">
              {host.socials.map((social) => (
                <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="text-parchment hover:text-ivory">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Aetherica Episodes</h2>
            {hostEpisodes.map((episode) => <a key={episode.slug} className="mt-3 block text-parchment hover:text-ivory" href={`/episodes/${episode.slug}`}>{episode.title}</a>)}
          </div>
          {host.slug === "ike-baker" ? (
            <div className="temple-border rounded p-5">
              <h2 className="font-display text-2xl text-ivory">Upcoming Appearances</h2>
              {events.map((event) => <a key={event.slug} className="mt-3 block text-parchment hover:text-ivory" href={`/events/${event.slug}`}>{event.title}</a>)}
            </div>
          ) : null}
        </aside>
      </div>
    </Section>
  );
}
