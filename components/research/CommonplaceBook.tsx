"use client";

import { BookMarked, Download, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type CommonplaceEntry = {
  id: string;
  title: string;
  type: string;
  collection: string;
  citation: string;
  note: string;
};

const entryTypes = ["Transcript passage", "Episode", "Chapter", "Quotation", "Book", "Person", "Guest", "Topic", "Event", "Personal note"];
const collections = ["Research for Alchemy", "Episodes to Revisit", "Martinism", "Presentation Sources", "Favorite Ike Baker Passages"];

function readCommonplaceEntries() {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem("aetherica-commonplace");
  if (!saved) return [];
  try {
    return JSON.parse(saved) as CommonplaceEntry[];
  } catch {
    return [];
  }
}

export function CommonplaceBook() {
  const [entries, setEntries] = useState<CommonplaceEntry[]>(readCommonplaceEntries);
  const [draft, setDraft] = useState({ title: "", type: entryTypes[0], collection: collections[0], citation: "", note: "" });

  const saveEntries = (next: CommonplaceEntry[]) => {
    setEntries(next);
    window.localStorage.setItem("aetherica-commonplace", JSON.stringify(next));
  };

  const exportEntries = (format: "markdown" | "text" | "citations" | "outline") => {
    const body = entries.length ? entries.map((entry, index) => {
      if (format === "citations") return `${index + 1}. ${entry.title}${entry.citation ? ` — ${entry.citation}` : ""}`;
      if (format === "outline") return `- ${entry.collection}\n  - ${entry.type}: ${entry.title}${entry.note ? `\n    Note: ${entry.note}` : ""}`;
      if (format === "text") return `${entry.type}: ${entry.title}\nCollection: ${entry.collection}\nCitation: ${entry.citation || "None"}\nNote: ${entry.note || "None"}`;
      return `## ${entry.title}\n\n- Type: ${entry.type}\n- Collection: ${entry.collection}\n- Citation: ${entry.citation || "None"}\n\n${entry.note || ""}`;
    }).join("\n\n") : "No Commonplace Book entries have been saved yet.";
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aetherica-commonplace-${format}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
      <form
        className="temple-border rounded p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.title.trim()) return;
          saveEntries([{ id: crypto.randomUUID(), ...draft }, ...entries]);
          setDraft({ title: "", type: entryTypes[0], collection: collections[0], citation: "", note: "" });
        }}
      >
        <div className="flex items-center gap-3">
          <BookMarked className="text-gold" />
          <h2 className="font-display text-2xl text-ivory">Add to the Commonplace Book</h2>
        </div>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-parchment">
            Title
            <input
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="Agrippa on planetary virtues"
            />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Type
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={draft.type}
              onChange={(event) => setDraft({ ...draft, type: event.target.value })}
            >
              {entryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Collection
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={draft.collection}
              onChange={(event) => setDraft({ ...draft, collection: event.target.value })}
            >
              {collections.map((collection) => <option key={collection}>{collection}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Citation or timestamp URL
            <input
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={draft.citation}
              onChange={(event) => setDraft({ ...draft, citation: event.target.value })}
              placeholder="/episodes/... ?t=408"
            />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Notes
            <textarea
              className="focus-ring min-h-32 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory"
              value={draft.note}
              onChange={(event) => setDraft({ ...draft, note: event.target.value })}
              placeholder="Why this passage matters, what it connects to, what to read next..."
            />
          </label>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-gold px-4 py-3 font-semibold text-obsidian hover:bg-ivory">
            <Plus size={18} />
            Save Entry
          </button>
        </div>
      </form>

      <div className="grid content-start gap-4">
        <div className="temple-border rounded p-5">
          <div className="flex items-center gap-3">
            <Download className="text-gold" aria-hidden="true" />
            <h2 className="font-display text-2xl text-ivory">Export</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-parchment">Export saved material as Markdown, plain text, citations, or a research outline.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["markdown", "text", "citations", "outline"] as const).map((format) => (
              <button
                key={format}
                className="focus-ring rounded border border-gold/30 px-3 py-2 text-sm capitalize text-parchment hover:bg-gold/10 hover:text-ivory"
                type="button"
                onClick={() => exportEntries(format)}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
        {entries.length ? entries.map((entry) => (
          <article key={entry.id} className="temple-border rounded p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.18em] text-gold">{entry.type}</p>
                <h2 className="mt-2 font-display text-2xl text-ivory">{entry.title}</h2>
                <p className="mt-1 text-sm text-limestone">{entry.collection}</p>
              </div>
              <button
                type="button"
                className="focus-ring rounded p-2 text-parchment hover:bg-crimson/20 hover:text-ivory"
                aria-label={`Delete ${entry.title}`}
                onClick={() => saveEntries(entries.filter((item) => item.id !== entry.id))}
              >
                <Trash2 size={18} />
              </button>
            </div>
            {entry.citation ? <p className="mt-3 break-words text-sm text-gold">{entry.citation}</p> : null}
            {entry.note ? <p className="mt-3 leading-7 text-parchment">{entry.note}</p> : null}
          </article>
        )) : (
          <div className="temple-border rounded p-6 text-parchment">
            Save episodes, quotes, transcript passages, books, guests, topics, events, exact timestamps, and personal notes here.
          </div>
        )}
      </div>
    </div>
  );
}
