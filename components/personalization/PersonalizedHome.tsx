"use client";

import Link from "next/link";
import { Archive, ArrowUpRight, BookOpen, CalendarDays, Headphones, Layers, Save, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Episode, EventItem, ListeningPath } from "@/lib/data/types";
import { formatDate } from "@/lib/format";
import { defaultPreferences, readPreferences, type ArchivePreferences } from "./preferences";

type SavedItem = {
  id: string;
  kind: string;
  title: string;
  href: string;
  collection: string;
  note: string;
};

type CommonplaceEntry = {
  id: string;
  title: string;
  type: string;
  collection: string;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const saved = window.localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

function FirstVisitGateway({ featured, event, selectedPath }: { featured: Episode; event?: EventItem; selectedPath?: ListeningPath }) {
  const routes = [
    {
      number: "I",
      title: "Listen",
      phrase: "Enter through the living voice",
      description: "Begin with complete conversations, chaptered listening, and the voices of scholars, practitioners, and researchers.",
      href: `/episodes/${featured.slug}`,
      action: "Play the featured transmission",
      icon: Headphones
    },
    {
      number: "II",
      title: "Study",
      phrase: "Follow a current through the archive",
      description: "Move through an initiatic path of episodes, selected chapters, books, and questions for reflection.",
      href: selectedPath ? `/paths/${selectedPath.slug}` : "/paths",
      action: "Enter a listening path",
      icon: BookOpen
    },
    {
      number: "III",
      title: "Research",
      phrase: "Search the spoken record",
      description: "Find exact transcript passages, guests, concepts, and timestamps across the Aetherica archive.",
      href: "/search",
      action: "Search the archive",
      icon: Search
    }
  ];

  return (
    <section className="first-visit-gateway relative overflow-hidden border-y border-gold/20 bg-black/40">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute left-1/2 top-16 size-[28rem] -translate-x-1/2 rounded-full border border-gold/10" />
        <div className="absolute left-1/2 top-28 size-[20rem] -translate-x-1/2 rotate-45 border border-gold/10" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-[.38em] text-gold">First-time visitor</p>
          <h2 className="mt-5 font-display text-4xl leading-none text-ivory sm:text-6xl lg:text-7xl">
            What are you <em className="font-medium text-[#dda63f]">seeking?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-display text-lg leading-8 text-parchment sm:text-xl">
            Enter through the form of attention that serves you now. Each threshold opens into the same living archive.
          </p>
        </header>

        <div className="mt-14 grid border-y border-gold/20 md:grid-cols-3">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.title}
                href={route.href}
                className="group/route focus-ring relative min-h-[19rem] overflow-hidden px-6 py-8 transition hover:bg-gold/[.055] md:border-l md:border-gold/20 md:first:border-l-0 lg:px-9"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-gold">{route.number}</span>
                  <Icon className="text-gold/75 transition group-hover/route:scale-110 group-hover/route:text-ivory" size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-12 font-display text-4xl text-ivory transition group-hover/route:text-gold">{route.title}</h3>
                <p className="mt-2 font-display text-lg italic text-gold/90">{route.phrase}</p>
                <p className="mt-5 max-w-sm text-sm leading-7 text-parchment">{route.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-ivory">
                  {route.action}
                  <ArrowUpRight size={14} className="transition group-hover/route:translate-x-1 group-hover/route:-translate-y-1" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-ivory to-transparent transition duration-500 group-hover/route:scale-x-100" aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 border-b border-gold/15 pb-10 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[.26em] text-gold">Featured transmission</p>
            <h3 className="mt-3 max-w-3xl font-display text-3xl text-ivory sm:text-4xl">{featured.title}</h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-parchment">{featured.description}</p>
            <Link className="focus-ring mt-6 inline-flex items-center gap-2 rounded border border-gold/45 px-4 py-2 text-sm text-ivory hover:bg-gold/10" href={`/episodes/${featured.slug}`}>
              Enter the episode <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="border-t border-gold/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-[10px] uppercase tracking-[.26em] text-gold">At the threshold</p>
            <p className="mt-3 font-display text-2xl text-ivory">{selectedPath?.title ?? "Explore freely"}</p>
            <p className="mt-3 text-sm leading-7 text-parchment">{selectedPath?.summary ?? "Move between episodes, topics, guests, and the spoken archive."}</p>
            {event ? <p className="mt-6 border-t border-gold/15 pt-5 text-sm text-limestone">Next appearance · {formatDate(event.startDate)}<br /><span className="text-parchment">{event.title}</span></p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PersonalizedHome({ featured, event, paths }: { featured: Episode; event?: EventItem; paths: ListeningPath[] }) {
  const [preferences, setPreferences] = useState<ArchivePreferences>(defaultPreferences);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [commonplace, setCommonplace] = useState<CommonplaceEntry[]>([]);

  useEffect(() => {
    const refresh = () => {
      setPreferences(readPreferences());
      setSavedItems(readJson("aetherica-library-items", []));
      setCommonplace(readJson("aetherica-commonplace", []));
    };
    refresh();
    window.addEventListener("aetherica-preferences-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("aetherica-preferences-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const selectedPath = paths.find((path) => path.title === preferences.startingPath || path.title.includes(preferences.startingPath.replace(" and ", " & "))) ?? paths[0];
  const hasArchive = savedItems.length > 0 || commonplace.length > 0;

  if (!preferences.onboarded) {
    return <FirstVisitGateway featured={featured} event={event} selectedPath={selectedPath} />;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">{preferences.onboarded ? "Your starting page" : "First-time visitor"}</p>
        <h2 className="font-display text-3xl text-ivory sm:text-5xl">
          {preferences.onboarded ? `Continue in ${preferences.explorationMode} mode` : "What are you seeking?"}
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <article className="temple-border rounded p-6">
          <div className="flex items-center gap-3">
            <Headphones className="text-gold" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.22em] text-gold">{hasArchive ? "Continue listening" : "Featured episode"}</p>
          </div>
          <h3 className="mt-4 font-display text-3xl text-ivory">{featured.title}</h3>
          <p className="mt-3 line-clamp-3 leading-7 text-parchment">{featured.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="focus-ring rounded bg-gold px-4 py-2 font-semibold text-obsidian hover:bg-ivory" href={`/episodes/${featured.slug}`}>
              Resume episode
            </Link>
            <Link className="focus-ring rounded border border-gold/40 px-4 py-2 text-ivory hover:bg-gold/10" href="/episodes">
              Browse episodes
            </Link>
          </div>
        </article>

        <article className="temple-border rounded p-6">
          <div className="flex items-center gap-3">
            <Layers className="text-gold" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Current path</p>
          </div>
          <h3 className="mt-4 font-display text-3xl text-ivory">{preferences.startingPath}</h3>
          <p className="mt-3 leading-7 text-parchment">{selectedPath?.summary ?? "Explore freely through episodes, topics, guests, and the spoken archive."}</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ivory/10">
            <div className="h-full w-1/4 rounded-full bg-gold" />
          </div>
          <Link className="focus-ring mt-5 inline-flex rounded border border-gold/40 px-4 py-2 text-ivory hover:bg-gold/10" href={selectedPath ? `/paths/${selectedPath.slug}` : "/paths"}>
            Continue path
          </Link>
        </article>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <article className="temple-border rounded p-5">
          <Sparkles className="text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl text-ivory">Recommended because</h3>
          <p className="mt-2 text-sm leading-6 text-parchment">
            You selected {preferences.interests.slice(0, 2).join(" and ") || "the archive"} and chose the {preferences.playerInstrument} player.
          </p>
        </article>
        <article className="temple-border rounded p-5">
          <Save className="text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl text-ivory">Recently saved</h3>
          <p className="mt-2 text-sm leading-6 text-parchment">
            {savedItems[0]?.title ?? commonplace[0]?.title ?? "Save episodes, quotations, chapters, books, people, topics, events, and notes."}
          </p>
          <Link className="mt-3 inline-flex text-sm text-gold hover:text-ivory" href="/library">Open My Archive</Link>
        </article>
        <article className="temple-border rounded p-5">
          <CalendarDays className="text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl text-ivory">Upcoming event</h3>
          <p className="mt-2 text-sm leading-6 text-parchment">{event ? `${formatDate(event.startDate)} · ${event.title}` : "No upcoming event is available yet."}</p>
          <Link className="mt-3 inline-flex text-sm text-gold hover:text-ivory" href="/events">View events</Link>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <article className="temple-border rounded p-5">
          <Archive className="text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl text-ivory">Archive status</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded border border-gold/15 p-3">
              <dt className="text-limestone">Passages preserved</dt>
              <dd className="mt-1 font-display text-2xl text-ivory">{commonplace.length}</dd>
            </div>
            <div className="rounded border border-gold/15 p-3">
              <dt className="text-limestone">Saved materials</dt>
              <dd className="mt-1 font-display text-2xl text-ivory">{savedItems.length}</dd>
            </div>
          </dl>
        </article>
        <article className="temple-border rounded p-5">
          <BookOpen className="text-gold" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl text-ivory">Daily fragment</h3>
          <blockquote className="mt-3 border-l border-gold/40 pl-4 text-lg leading-8 text-parchment">
            Guarding the temple begins with attention, pattern recognition, and the freedom to choose what enters the mind.
          </blockquote>
          <Link className="mt-4 inline-flex text-sm text-gold hover:text-ivory" href="/search?q=guarding%20the%20temple%20mind">
            Search this current
          </Link>
        </article>
      </div>
    </section>
  );
}
