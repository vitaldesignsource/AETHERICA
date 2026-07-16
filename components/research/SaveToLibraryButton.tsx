"use client";

import { BookmarkPlus, Check } from "lucide-react";
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

function readItems() {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem("aetherica-library-items");
  if (!saved) return [];
  try {
    return JSON.parse(saved) as LibraryItem[];
  } catch {
    return [];
  }
}

export function SaveToLibraryButton({
  kind,
  title,
  href,
  collection = "Episodes to Revisit",
  note = ""
}: {
  kind: string;
  title: string;
  href: string;
  collection?: string;
  note?: string;
}) {
  const [saved, setSaved] = useState(() => readItems().some((item) => item.href === href && item.kind === kind));

  const saveItem = () => {
    const items = readItems();
    if (items.some((item) => item.href === href && item.kind === kind)) {
      setSaved(true);
      return;
    }
    const next = [
      {
        id: crypto.randomUUID(),
        kind,
        title,
        href,
        collection,
        note,
        savedAt: new Date().toISOString()
      },
      ...items
    ];
    window.localStorage.setItem("aetherica-library-items", JSON.stringify(next));
    setSaved(true);
  };

  return (
    <button
      type="button"
      className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/50 px-4 text-sm text-ivory hover:bg-gold/10 disabled:cursor-default disabled:border-gold/25 disabled:text-gold"
      onClick={saveItem}
      disabled={saved}
    >
      {saved ? <Check size={16} /> : <BookmarkPlus size={16} />}
      {saved ? "Saved" : `Save ${kind}`}
    </button>
  );
}
