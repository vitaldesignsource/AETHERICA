import { preferenceKey } from "@/components/personalization/preferences";

/**
 * The Personal Archive Account.
 *
 * Everything a reader accumulates — saved items, bookmarks, playlists, commonplace entries, path
 * progress, per-episode positions, instrument settings — was already being written to localStorage
 * under eighteen unrelated keys, with nothing tying them together and no way to see, move, or
 * delete them. This module is that missing layer.
 *
 * It is deliberately local-first. No server, no sign-in, no password: the archive lives in the
 * browser, and portability is provided by exporting a single file rather than by an account on
 * someone else's machine. That is a real limitation and the UI says so plainly — an export carried
 * to another device is the sync story until a backend exists.
 */

export const profileKey = "aetherica-archive-profile";

export type ArchiveProfile = {
  displayName: string;
  /** ISO date the archive was started, so the account can show its own age. */
  createdAt: string;
};

/** A fixed key, or a family of keys sharing a prefix (per-episode progress, instrument skins). */
type KeySpec = { label: string; description: string; single?: boolean } & (
  | { key: string; prefix?: never }
  | { prefix: string; key?: never }
);

export const ARCHIVE_KEYS: KeySpec[] = [
  // `single` marks a record that is one thing, not a collection — counting its object keys would
  // report "Profile: 2" for a name and a date, which tells a reader nothing.
  { key: profileKey, label: "Profile", description: "Display name and the date you started.", single: true },
  { key: preferenceKey, label: "Preferences", description: "Exploration mode, interests, player instrument, location.", single: true },
  { key: "aetherica-library-items", label: "Saved items", description: "Episodes, books, and passages kept for later." },
  { key: "aetherica-playlists", label: "Playlists", description: "Sequences you assembled yourself." },
  { key: "aetherica-commonplace", label: "Commonplace entries", description: "Copied passages and your notes on them." },
  { key: "aetherica-player-bookmarks", label: "Bookmarks", description: "Marked moments inside episodes." },
  { key: "aetherica-player-mode", label: "Player mode", description: "Astrological or Qabalistic.", single: true },
  { key: "aetherica-planetary-location", label: "Instrument location", description: "Where the celestial instruments compute for.", single: true },
  { key: "aetherica-organ-clock-timezone", label: "Organ clock zone", description: "Time zone for the organ clock.", single: true },
  { prefix: "aetherica-progress:", label: "Episode progress", description: "How far into each episode you have listened." },
  { prefix: "aetherica-path:", label: "Path progress", description: "Steps completed on each listening path." },
  { prefix: "aetherica-", label: "Instrument settings", description: "Appearance and motion choices on the instruments." }
];

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readProfile(): ArchiveProfile | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(profileKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ArchiveProfile>;
    if (!parsed.displayName) return null;
    return { displayName: parsed.displayName, createdAt: parsed.createdAt ?? new Date().toISOString() };
  } catch {
    return null;
  }
}

export function writeProfile(profile: ArchiveProfile) {
  if (!isBrowser()) return;
  window.localStorage.setItem(profileKey, JSON.stringify(profile));
  notifyArchiveChanged();
}

/** Every aetherica-* key currently present, so nothing is missed by an out-of-date registry. */
export function allArchiveKeys(): string[] {
  if (!isBrowser()) return [];
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith("aetherica-")) keys.push(key);
  }
  return keys.sort();
}

/** How many things a stored value actually represents, so counts mean something to a reader. */
function countEntries(raw: string | null): number {
  if (!raw) return 0;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.length;
    if (parsed && typeof parsed === "object") {
      // Bookmarks are keyed by episode, so the useful number is the total across them.
      const values = Object.values(parsed as Record<string, unknown>);
      if (values.every((value) => Array.isArray(value))) {
        return values.reduce<number>((total, value) => total + (value as unknown[]).length, 0);
      }
      return Object.keys(parsed as object).length;
    }
    return 1;
  } catch {
    return raw ? 1 : 0;
  }
}

export type ArchiveStat = { label: string; description: string; count: number; single?: boolean; keys: string[] };

export function archiveStats(): ArchiveStat[] {
  if (!isBrowser()) return [];
  const present = allArchiveKeys();
  const claimed = new Set<string>();
  const stats: ArchiveStat[] = [];

  for (const spec of ARCHIVE_KEYS) {
    if (spec.key) {
      if (!present.includes(spec.key)) continue;
      claimed.add(spec.key);
      stats.push({
        label: spec.label,
        description: spec.description,
        count: spec.single ? 1 : countEntries(window.localStorage.getItem(spec.key)),
        single: spec.single,
        keys: [spec.key]
      });
      continue;
    }
    // Prefix families claim only what an earlier, more specific spec has not already taken.
    const matched = present.filter((key) => key.startsWith(spec.prefix!) && !claimed.has(key));
    if (!matched.length) continue;
    matched.forEach((key) => claimed.add(key));
    stats.push({ label: spec.label, description: spec.description, count: matched.length, keys: matched });
  }

  return stats.filter((stat) => stat.count > 0);
}

export type ArchiveSnapshot = {
  format: "aetherica-archive";
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
};

export function exportArchive(): ArchiveSnapshot {
  const data: Record<string, string> = {};
  for (const key of allArchiveKeys()) {
    const value = window.localStorage.getItem(key);
    if (value !== null) data[key] = value;
  }
  return { format: "aetherica-archive", version: 1, exportedAt: new Date().toISOString(), data };
}

export type ImportResult = { ok: boolean; restored: number; message: string };

export function importArchive(raw: string, mode: "merge" | "replace"): ImportResult {
  if (!isBrowser()) return { ok: false, restored: 0, message: "Not available here." };
  let snapshot: ArchiveSnapshot;
  try {
    snapshot = JSON.parse(raw) as ArchiveSnapshot;
  } catch {
    return { ok: false, restored: 0, message: "That file is not valid JSON." };
  }
  if (snapshot?.format !== "aetherica-archive" || !snapshot.data || typeof snapshot.data !== "object") {
    return { ok: false, restored: 0, message: "That is not an Aetherica archive file." };
  }
  if (mode === "replace") {
    allArchiveKeys().forEach((key) => window.localStorage.removeItem(key));
  }
  let restored = 0;
  for (const [key, value] of Object.entries(snapshot.data)) {
    // Only ever write this site's own namespace, whatever a file claims to contain.
    if (!key.startsWith("aetherica-") || typeof value !== "string") continue;
    window.localStorage.setItem(key, value);
    restored += 1;
  }
  notifyArchiveChanged();
  return {
    ok: true,
    restored,
    message: restored ? `Restored ${restored} ${restored === 1 ? "entry" : "entries"}.` : "That file held nothing to restore."
  };
}

export function clearKeys(keys: string[]) {
  if (!isBrowser()) return;
  keys.forEach((key) => window.localStorage.removeItem(key));
  notifyArchiveChanged();
}

/* --------------------------------------------------------------------------
 * Subscription surface.
 *
 * localStorage is external state, so components read it through
 * useSyncExternalStore rather than copying it into useState inside an effect.
 * The `storage` event only fires in OTHER tabs, so writes made here bump a
 * local version counter to notify this one.
 * ----------------------------------------------------------------------- */

let version = 0;
const listeners = new Set<() => void>();

export function notifyArchiveChanged() {
  version += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeArchive(listener: () => void) {
  listeners.add(listener);
  if (isBrowser()) window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    if (isBrowser()) window.removeEventListener("storage", listener);
  };
}

/** Client snapshot. Server returns -1, which the UI reads as "not mounted yet". */
export function archiveVersion() {
  return version;
}

export function archiveServerVersion() {
  return -1;
}
