export type SavedCalculation = {
  id: string;
  kind: "Planetary Hour" | "Tattvic Tide" | "Celestial Timing" | "Taijitu Polarity" | "Five Phases Wheel" | "Bagua Instrument" | "He Tu and Luo Shu" | "Taoist Cosmology Map" | "Taoist Organ Clock" | "Internal Alchemy Map" | "Microcosmic Orbit" | "Taoist Correspondence Matrix" | "Meridian Explorer" | "Taoist Symbol Index";
  title: string;
  detail: string;
  date: string;
  savedAt: string;
};

export type ScheduledAlert = {
  id: string;
  kind: "Planetary Hour" | "Tattvic Tide";
  title: string;
  time: string;
  note: string;
};

export type ToolHistory = {
  id: string;
  tool: string;
  detail: string;
  visitedAt: string;
};

export type ResearchNote = {
  id: string;
  tool: string;
  note: string;
  savedAt: string;
};

export const savedCalculationsKey = "aetherica-saved-calculations";
export const scheduledAlertsKey = "aetherica-instrument-alerts";
export const toolHistoryKey = "aetherica-tool-history";
export const instrumentNotesKey = "aetherica-instrument-notes";

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const saved = window.localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("aetherica-instruments-changed"));
}

export function prependSavedCalculation(calculation: Omit<SavedCalculation, "id" | "savedAt">) {
  const next = [
    { ...calculation, id: crypto.randomUUID(), savedAt: new Date().toISOString() },
    ...readJson<SavedCalculation[]>(savedCalculationsKey, [])
  ].slice(0, 24);
  writeJson(savedCalculationsKey, next);
}

export function prependToolHistory(entry: Omit<ToolHistory, "id" | "visitedAt">) {
  const next = [
    { ...entry, id: crypto.randomUUID(), visitedAt: new Date().toISOString() },
    ...readJson<ToolHistory[]>(toolHistoryKey, [])
  ].slice(0, 24);
  writeJson(toolHistoryKey, next);
}
