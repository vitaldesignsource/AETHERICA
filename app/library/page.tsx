import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveAccount } from "@/components/personalization/ArchiveAccount";
import { PersonalLibrary } from "@/components/research/PersonalLibrary";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";
import { guests, topics } from "@/lib/data/demo";

const archiveMilestones = [
  "Completed Foundations of Hermeticism",
  "Explored every episode featuring a selected guest",
  "Saved ten passages on alchemy",
  "Completed the Martinism path",
  "Attended an Aetherica live event"
];

export const metadata: Metadata = {
  title: "My Archive",
  description:
    "Your personal Aetherica archive: saved episodes, passages, reading paths, and research milestones.",
  alternates: { canonical: "/library" },
  openGraph: {
    images: [{ url: "/images/library-angel.webp", alt: "A bronze winged figure in a rain-soaked cloister garden" }]
  },
  twitter: { card: "summary_large_image", images: ["/images/library-angel.webp"] }
};

export default function LibraryPage() {
  const hero = resolveSiteImage("/images/library-angel");

  return (
    <>
      <PageHero
        eyebrow="Personal archive"
        title="My Archive"
        lede="What you keep, and why you kept it. Saved episodes, marked passages, followed subjects, and the paths you are partway through."
        imageSrc={hero}
        imageAlt="A dark bronze winged figure standing in a rain-soaked cloister garden, head bowed, wildflowers caught in her hair"
        focus="62% 32%"
      />
    {/* The hero already carries the page title; this heading names what follows it. */}
    <Section eyebrow="Your collections" title="Saved, followed, and in progress">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_.7fr]">
        <p className="leading-8 text-parchment">
          Save episodes, bookmark timestamps, build playlists, follow topics and guests, and gather
          research materials into private collections. Everything you keep lives in this browser and
          can be exported to a file and carried to another device.
        </p>
        <div className="temple-border rounded p-5">
          <p className="text-xs uppercase tracking-[.18em] text-gold">Research notebook</p>
          <h2 className="mt-2 font-display text-2xl text-ivory">Commonplace Book</h2>
          <p className="mt-3 text-sm leading-6 text-parchment">
            Use the Commonplace Book for quotations, transcript passages, citations, and personal notes.
          </p>
          <Link className="focus-ring mt-4 inline-flex rounded border border-gold/50 px-3 py-2 text-sm text-ivory hover:bg-gold/10" href="/commonplace">
            Open Commonplace Book
          </Link>
        </div>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {["Episodes explored", "Chapters studied", "Passages saved", "Books added", "Events attended"].map((label, index) => (
          <div key={label} className="temple-border rounded p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-gold">{label}</p>
            <p className="mt-2 font-display text-3xl text-ivory">{index === 4 ? 0 : "—"}</p>
          </div>
        ))}
      </div>
      <div className="mb-8 temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Archival stamps</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {archiveMilestones.map((milestone) => (
            <span key={milestone} className="rounded border border-gold/20 px-3 py-2 text-sm text-parchment">{milestone}</span>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <ArchiveAccount />
      </div>
      <div className="mb-8 temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Saved instrument data coming soon</p>
        <h2 className="mt-2 font-display text-2xl text-ivory">My Instruments</h2>
        <p className="mt-3 text-sm leading-6 text-parchment">
          Astrological timing notes, instrument research notes, saved calculations, scheduled alerts, and recent tool history will become available when sign up and login are enabled.
        </p>
      </div>
      <PersonalLibrary topics={topics.map((topic) => topic.title)} guests={guests.map((guest) => guest.name)} />
    </Section>
    </>
  );
}
