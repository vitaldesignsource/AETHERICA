import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { episodes, guests } from "@/lib/data/demo";

function appearanceCount(name: string) {
  const normalized = name.toLowerCase();
  return episodes.filter((episode) =>
    [episode.guest, episode.hosts.join(" "), episode.title, episode.longIntroduction].join(" ").toLowerCase().includes(normalized)
  ).length;
}

export const metadata: Metadata = {
  title: "Guests",
  description:
    "Every guest who has appeared on the Aetherica Podcast, with their episodes and areas of study.",
  alternates: { canonical: "/guests" }
};

export default function GuestsPage() {
  return (
    <Section eyebrow="Guests" title="Guest archive">
      <div className="grid gap-5 md:grid-cols-2">
        {guests.map((guest) => (
          <Link key={guest.slug} href={`/guests/${guest.slug}`} className="temple-border focus-ring grid gap-5 rounded p-6 sm:grid-cols-[144px_1fr]">
            {guest.imageUrl ? (
              <Image src={guest.imageUrl} alt={guest.imageAlt ?? guest.name} width={288} height={288} className="aspect-square rounded object-cover" />
            ) : (
              <span className="grid aspect-square place-items-center rounded border border-gold/25 bg-obsidian text-center font-display text-4xl text-gold">
                {guest.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </span>
            )}
            <span>
              <span className="text-xs uppercase tracking-[.18em] text-gold">{guest.profileType}</span>
              <h2 className="mt-2 font-display text-3xl text-ivory">{guest.name}</h2>
              <p className="mt-2 text-gold">{guest.role}</p>
              <p className="mt-4 text-parchment">{guest.shortBio}</p>
              <span className="mt-4 inline-flex text-sm text-limestone">{appearanceCount(guest.name)} archive appearances</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
