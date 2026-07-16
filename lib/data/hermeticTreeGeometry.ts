export type HermeticTreeNodeId =
  | "kether"
  | "chokmah"
  | "binah"
  | "daath"
  | "chesed"
  | "gevurah"
  | "tiphareth"
  | "netzach"
  | "hod"
  | "yesod"
  | "malkuth";

export type HermeticPathId =
  | "aleph"
  | "beth"
  | "gimel"
  | "daleth"
  | "heh"
  | "vav"
  | "zayin"
  | "cheth"
  | "teth"
  | "yod"
  | "kaph"
  | "lamed"
  | "mem"
  | "nun"
  | "samekh"
  | "ayin"
  | "peh"
  | "tzaddi"
  | "qoph"
  | "resh"
  | "shin"
  | "tav";

export const hermeticTreePositions: Record<HermeticTreeNodeId, { x: number; y: number }> = {
  kether: { x: 50, y: 8 },
  chokmah: { x: 78, y: 20 },
  binah: { x: 22, y: 20 },
  daath: { x: 50, y: 34 },
  chesed: { x: 78, y: 43 },
  gevurah: { x: 22, y: 43 },
  tiphareth: { x: 50, y: 57 },
  netzach: { x: 78, y: 71 },
  hod: { x: 22, y: 71 },
  yesod: { x: 50, y: 81 },
  malkuth: { x: 50, y: 94 }
};

export const hermeticTreePaths: Array<{
  id: HermeticPathId;
  letter: string;
  source: HermeticTreeNodeId;
  target: HermeticTreeNodeId;
}> = [
  { id: "aleph", letter: "א", source: "kether", target: "chokmah" },
  { id: "beth", letter: "ב", source: "kether", target: "binah" },
  { id: "gimel", letter: "ג", source: "kether", target: "tiphareth" },
  { id: "daleth", letter: "ד", source: "chokmah", target: "binah" },
  { id: "heh", letter: "ה", source: "chokmah", target: "tiphareth" },
  { id: "vav", letter: "ו", source: "chokmah", target: "chesed" },
  { id: "zayin", letter: "ז", source: "binah", target: "tiphareth" },
  { id: "cheth", letter: "ח", source: "binah", target: "gevurah" },
  { id: "teth", letter: "ט", source: "chesed", target: "gevurah" },
  { id: "yod", letter: "י", source: "chesed", target: "tiphareth" },
  { id: "kaph", letter: "כ", source: "chesed", target: "netzach" },
  { id: "lamed", letter: "ל", source: "gevurah", target: "tiphareth" },
  { id: "mem", letter: "מ", source: "gevurah", target: "hod" },
  { id: "nun", letter: "נ", source: "tiphareth", target: "netzach" },
  { id: "samekh", letter: "ס", source: "tiphareth", target: "yesod" },
  { id: "ayin", letter: "ע", source: "tiphareth", target: "hod" },
  { id: "peh", letter: "פ", source: "netzach", target: "hod" },
  { id: "tzaddi", letter: "צ", source: "netzach", target: "yesod" },
  { id: "qoph", letter: "ק", source: "netzach", target: "malkuth" },
  { id: "resh", letter: "ר", source: "hod", target: "yesod" },
  { id: "shin", letter: "ש", source: "hod", target: "malkuth" },
  { id: "tav", letter: "ת", source: "yesod", target: "malkuth" }
];
