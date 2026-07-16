"use client";

import { useMemo, useState } from "react";
import type { ListeningPath } from "@/lib/data/types";

function readCompleted(storageKey: string) {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as string[];
  } catch {
    return [];
  }
}

export function PathProgress({ path }: { path: ListeningPath }) {
  const storageKey = `aetherica-path:${path.slug}`;
  const [completed, setCompleted] = useState<string[]>(() => readCompleted(storageKey));

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const percent = path.steps.length ? Math.round((completed.length / path.steps.length) * 100) : 0;

  const toggleStep = (title: string) => {
    setCompleted((current) => {
      const next = current.includes(title) ? current.filter((item) => item !== title) : [...current, title];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="temple-border rounded p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm uppercase tracking-[.18em] text-gold">Path progress</p>
        <p className="text-sm text-parchment">{percent}% complete</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-obsidian">
        <div className="h-full bg-gradient-to-r from-crimson to-gold" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-5 grid gap-3">
        {path.steps.map((step) => (
          <label key={step.title} className="flex cursor-pointer items-start gap-3 rounded border border-gold/15 p-3 text-parchment hover:bg-gold/10">
            <input
              type="checkbox"
              checked={completedSet.has(step.title)}
              onChange={() => toggleStep(step.title)}
              className="mt-1 accent-gold"
            />
            <span>
              <span className="block font-semibold text-ivory">{step.title}</span>
              <span className="mt-1 block text-sm">{step.prompt}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
