"use client";

import Link from "next/link";
import { BookMarked, ListMusic, Plus, Sparkles, Trash2, UserRoundCheck } from "lucide-react";
import { useState } from "react";

type LibraryItem = {
  id: string;
  kind: string;
  title: string;
  href: string;
  collection: string;
  note: string;
  savedAt: string;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
};

const defaultCollections = ["Research for Alchemy", "Episodes to Revisit", "Martinism", "Presentation Sources", "Favorite Ike Baker Passages"];
const recommendationSeeds = [
  "Continue the current of Christian theurgy",
  "Build a Martinism study sequence",
  "Find episodes connected to Freemasonry and initiation",
  "Return to saved transcript passages with related books"
];

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

export function PersonalLibrary({ topics, guests }: { topics: string[]; guests: string[] }) {
  const [items, setItems] = useState<LibraryItem[]>(() => readJson("aetherica-library-items", []));
  const [playlists, setPlaylists] = useState<Playlist[]>(() => readJson("aetherica-playlists", []));
  const [followedTopics, setFollowedTopics] = useState<string[]>(() => readJson("aetherica-followed-topics", []));
  const [followedGuests, setFollowedGuests] = useState<string[]>(() => readJson("aetherica-followed-guests", []));
  const [playlistDraft, setPlaylistDraft] = useState({ name: "", description: "" });

  const saveItems = (next: LibraryItem[]) => {
    setItems(next);
    window.localStorage.setItem("aetherica-library-items", JSON.stringify(next));
  };

  const savePlaylists = (next: Playlist[]) => {
    setPlaylists(next);
    window.localStorage.setItem("aetherica-playlists", JSON.stringify(next));
  };

  const toggleFollow = (kind: "topic" | "guest", value: string) => {
    const key = kind === "topic" ? "aetherica-followed-topics" : "aetherica-followed-guests";
    const current = kind === "topic" ? followedTopics : followedGuests;
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    window.localStorage.setItem(key, JSON.stringify(next));
    if (kind === "topic") setFollowedTopics(next);
    else setFollowedGuests(next);
  };

  const groupedItems = defaultCollections.map((collection) => ({
    collection,
    items: items.filter((item) => item.collection === collection)
  }));
  const otherItems = items.filter((item) => !defaultCollections.includes(item.collection));

  return (
    <div className="grid gap-8">
      <div className="grid gap-5 lg:grid-cols-4">
        {[
          ["Saved items", items.length],
          ["Playlists", playlists.length],
          ["Followed topics", followedTopics.length],
          ["Followed guests", followedGuests.length]
        ].map(([label, value]) => (
          <div key={label} className="temple-border rounded p-5">
            <p className="text-xs uppercase tracking-[.18em] text-gold">{label}</p>
            <p className="mt-2 font-display text-4xl text-ivory">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="temple-border rounded p-5">
          <div className="flex items-center gap-3">
            <BookMarked className="text-gold" />
            <h2 className="font-display text-2xl text-ivory">Personal Grimoire</h2>
          </div>
          <p className="mt-3 leading-7 text-parchment">
            Save episodes, chapters, quotations, transcript passages, books, people, topics, and notes into private collections.
          </p>
          <div className="mt-5 grid gap-4">
            {[...groupedItems, ...(otherItems.length ? [{ collection: "Other", items: otherItems }] : [])].map((group) => (
              <div key={group.collection} className="rounded border border-gold/15 p-4">
                <h3 className="font-display text-xl text-ivory">{group.collection}</h3>
                {group.items.length ? (
                  <div className="mt-3 grid gap-3">
                    {group.items.map((item) => (
                      <article key={item.id} className="rounded border border-gold/10 bg-obsidian/60 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[.16em] text-gold">{item.kind}</p>
                            <Link href={item.href} className="mt-1 block font-display text-lg text-ivory hover:text-gold">{item.title}</Link>
                            {item.note ? <p className="mt-2 text-sm text-parchment">{item.note}</p> : null}
                          </div>
                          <button
                            type="button"
                            className="focus-ring rounded p-2 text-parchment hover:bg-crimson/20 hover:text-ivory"
                            aria-label={`Remove ${item.title}`}
                            onClick={() => saveItems(items.filter((savedItem) => savedItem.id !== item.id))}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : <p className="mt-3 text-sm text-limestone">Nothing saved here yet.</p>}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="temple-border rounded p-5">
            <div className="flex items-center gap-3">
              <ListMusic className="text-gold" />
              <h2 className="font-display text-2xl text-ivory">Playlists</h2>
            </div>
            <form
              className="mt-4 grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!playlistDraft.name.trim()) return;
                savePlaylists([{ id: crypto.randomUUID(), ...playlistDraft }, ...playlists]);
                setPlaylistDraft({ name: "", description: "" });
              }}
            >
              <input
                className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
                value={playlistDraft.name}
                onChange={(event) => setPlaylistDraft({ ...playlistDraft, name: event.target.value })}
                placeholder="Foundations of Hermeticism"
              />
              <textarea
                className="focus-ring min-h-24 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory"
                value={playlistDraft.description}
                onChange={(event) => setPlaylistDraft({ ...playlistDraft, description: event.target.value })}
                placeholder="Why this sequence matters..."
              />
              <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded bg-gold px-4 font-semibold text-obsidian hover:bg-ivory">
                <Plus size={16} />
                Create Playlist
              </button>
            </form>
            <div className="mt-4 grid gap-3">
              {playlists.map((playlist) => (
                <article key={playlist.id} className="rounded border border-gold/15 p-3">
                  <h3 className="font-display text-lg text-ivory">{playlist.name}</h3>
                  {playlist.description ? <p className="mt-2 text-sm text-parchment">{playlist.description}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section className="temple-border rounded p-5">
            <div className="flex items-center gap-3">
              <UserRoundCheck className="text-gold" />
              <h2 className="font-display text-2xl text-ivory">Follow Topics and Guests</h2>
            </div>
            <div className="mt-4 grid gap-4">
              <div>
                <p className="text-sm uppercase tracking-[.16em] text-gold">Topics</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      className={`focus-ring rounded border px-2 py-1 text-sm ${followedTopics.includes(topic) ? "border-gold bg-gold text-obsidian" : "border-gold/25 text-parchment"}`}
                      onClick={() => toggleFollow("topic", topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[.16em] text-gold">Guests</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {guests.map((guest) => (
                    <button
                      type="button"
                      key={guest}
                      className={`focus-ring rounded border px-2 py-1 text-sm ${followedGuests.includes(guest) ? "border-gold bg-gold text-obsidian" : "border-gold/25 text-parchment"}`}
                      onClick={() => toggleFollow("guest", guest)}
                    >
                      {guest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="temple-border rounded p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="text-gold" />
              <h2 className="font-display text-2xl text-ivory">Recommendations</h2>
            </div>
            <div className="mt-4 grid gap-3">
              {recommendationSeeds.map((seed) => (
                <Link key={seed} className="rounded border border-gold/15 p-3 text-parchment hover:text-ivory" href={`/search?q=${encodeURIComponent(seed)}`}>
                  {seed}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
