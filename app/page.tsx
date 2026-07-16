import Link from "next/link";
import Image from "next/image";
import { EnterArchiveOnboarding } from "@/components/personalization/EnterArchiveOnboarding";
import { PersonalizedHome } from "@/components/personalization/PersonalizedHome";
import { LivingArchiveCarousel } from "@/components/home/LivingArchiveCarousel";
import { Hero } from "@/components/sections/Hero";
import { EpisodeCard } from "@/components/sections/EpisodeCard";
import { Newsletter } from "@/components/sections/Newsletter";
import { TopicPathCard } from "@/components/sections/TopicPathCard";
import { Section } from "@/components/ui/Section";
import { episodes, events, hosts, topics } from "@/lib/data/demo";
import { listeningPaths } from "@/lib/data/research";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = episodes.find((episode) => episode.slug === "daniel-wiseman-metallic-alchemy-the-animating-spark-of-life") ?? episodes[0];
  const event = events[0];

  return (
    <>
      <Hero />
      <LivingArchiveCarousel featured={featured} event={event} paths={listeningPaths} />
      <EnterArchiveOnboarding />
      <PersonalizedHome featured={featured} event={event} paths={listeningPaths} />
      <Section eyebrow="Featured transmission" title="Latest from the archive">
        <EpisodeCard episode={featured} />
      </Section>

      <Section eyebrow="Explore by subject" title="Paths through the mystery tradition">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.slice(0, 8).map((topic) => (
            <TopicPathCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Recent episodes" title="Recorded studies">
        <div className="grid gap-5">
          {episodes.map((episode) => <EpisodeCard key={episode.guid} episode={episode} />)}
        </div>
      </Section>

      <Section eyebrow="Hosts" title="Guides of the archive">
        <div className="grid gap-5 md:grid-cols-2">
          {hosts.map((host) => (
            <article key={host.slug} className="temple-border grid gap-5 rounded p-6 sm:grid-cols-[128px_1fr]">
              {host.imageUrl ? (
                <Image src={host.imageUrl} alt={host.imageAlt ?? host.name} width={256} height={256} className="aspect-square rounded object-cover" />
              ) : null}
              <div>
                <h3 className="font-display text-3xl text-ivory">{host.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[.18em] text-gold">{host.role}</p>
                <p className="mt-4 leading-7 text-parchment">{host.shortBio}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="focus-ring rounded border border-gold/50 px-4 py-2 text-sm text-ivory" href={`/hosts/${host.slug}`}>View profile</Link>
                <Link className="focus-ring rounded border border-gold/50 px-4 py-2 text-sm text-ivory" href={`/episodes?host=${host.slug}`}>View episodes</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Upcoming appearances" title="Events and appearances">
        <article className="temple-border rounded p-6">
          <p className="text-xs uppercase tracking-[.22em] text-gold">{event.type} · {event.timeZone}</p>
          <h3 className="mt-2 font-display text-3xl text-ivory">{event.title}</h3>
          <p className="mt-3 text-parchment">{formatDate(event.startDate)} · {event.location}</p>
          <p className="mt-4 leading-7 text-parchment">{event.shortDescription}</p>
          <Link className="focus-ring mt-5 inline-flex rounded bg-gold px-4 py-2 font-semibold text-obsidian" href={`/events/${event.slug}`}>View all event details</Link>
        </article>
      </Section>

      <Newsletter />

      <Section eyebrow="Follow Ætherica" title="Official listening paths">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.socialLinks.length ? siteConfig.socialLinks.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="temple-border focus-ring rounded p-4 text-parchment hover:text-ivory">
              {label}
            </a>
          )) : <p className="text-parchment">Platform URLs are intentionally blank until verified links are supplied.</p>}
        </div>
      </Section>
    </>
  );
}
