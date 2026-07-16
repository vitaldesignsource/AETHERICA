export type ExplorationMode = "Listen" | "Study" | "Research";
export type PlayerInstrument = "Kabbalistic" | "Astrological" | "Alchemical" | "Rosicrucian" | "Minimal Archive";
export type ListeningMode = "Listen Mode" | "Study Mode" | "Research Mode";

export type ArchivePreferences = {
  onboarded: boolean;
  explorationMode: ExplorationMode;
  interests: string[];
  playerInstrument: PlayerInstrument;
  startingPath: string;
  profileIntent: "Continue without account" | "Create profile later";
  listeningMode: ListeningMode;
  displayName: string;
  avatarStyle: string;
  avatarImage: string;
  reducedMotion: boolean;
  notifications: boolean;
  publicProfile: boolean;
  instrumentLocationName: string;
  instrumentLatitude: string;
  instrumentLongitude: string;
  instrumentTimeZone: string;
  instrumentNotifications: boolean;
  planetaryAlerts: boolean;
  tattvicAlerts: boolean;
};

export const preferenceKey = "aetherica-archive-preferences";

export const explorationModes: Array<{ title: ExplorationMode; description: string }> = [
  { title: "Listen", description: "Episodes, playlists, recommendations, and a clear listening surface." },
  { title: "Study", description: "Transcripts, books, quotations, and structured learning paths." },
  { title: "Research", description: "Citations, archive search, notes, comparisons, and exports." }
];

export const interestOptions = [
  "Alchemy",
  "Theurgy",
  "Hermeticism",
  "Kabbalah",
  "Astrology",
  "Freemasonry",
  "Christian mysticism",
  "Philosophy",
  "Symbolism",
  "Occult history",
  "Ancient mysteries",
  "Sacred architecture"
];

export const playerInstruments: PlayerInstrument[] = [
  "Kabbalistic",
  "Astrological",
  "Alchemical",
  "Rosicrucian",
  "Minimal Archive"
];

export const startingPaths = [
  "New to Aetherica",
  "Foundations of Hermeticism",
  "The Path of the Theurgist",
  "Alchemy and Transformation",
  "Mysticism and Initiation",
  "Explore Freely"
];

export const listeningModes: ListeningMode[] = ["Listen Mode", "Study Mode", "Research Mode"];

export const avatarStyles = [
  "Planetary seal",
  "Alchemical emblem",
  "Geometric monogram",
  "Zodiac medallion",
  "Rosicrucian rose",
  "Manuscript initial",
  "Simple abstract sigil"
];

export const defaultPreferences: ArchivePreferences = {
  onboarded: false,
  explorationMode: "Study",
  interests: ["Hermeticism", "Theurgy", "Symbolism"],
  playerInstrument: "Kabbalistic",
  startingPath: "New to Aetherica",
  profileIntent: "Continue without account",
  listeningMode: "Study Mode",
  displayName: "",
  avatarStyle: "Manuscript initial",
  avatarImage: "",
  reducedMotion: false,
  notifications: false,
  publicProfile: false,
  instrumentLocationName: "Denver, CO",
  instrumentLatitude: "39.7392",
  instrumentLongitude: "-104.9903",
  instrumentTimeZone: "",
  instrumentNotifications: false,
  planetaryAlerts: false,
  tattvicAlerts: false
};

export function readPreferences(): ArchivePreferences {
  if (typeof window === "undefined") return defaultPreferences;
  const saved = window.localStorage.getItem(preferenceKey);
  if (!saved) return defaultPreferences;
  try {
    return { ...defaultPreferences, ...(JSON.parse(saved) as Partial<ArchivePreferences>) };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(preferences: ArchivePreferences) {
  window.localStorage.setItem(preferenceKey, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent("aetherica-preferences-changed", { detail: preferences }));
}
