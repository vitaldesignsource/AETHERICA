import type { Confidence, TrigramId } from "@/lib/data/bagua";

export type DiagramId = "he-tu" | "luo-shu";
export type DisplayMode = "dots" | "arabic" | "chinese" | "combined" | "scholarly";
export type OrientationId = "south-up" | "north-up" | "source-original";
export type PhaseId = "water" | "fire" | "wood" | "metal" | "earth";

export interface NumberRecord {
  value: number;
  chineseNumeral: string;
  polarity: "yang" | "yin";
  phase: PhaseId;
  direction: string;
  trigramId?: TrigramId;
  note: string;
  sourceIds: string[];
  confidence: Confidence;
}

export interface HeTuPair {
  id: string;
  values: [number, number];
  direction: string;
  phase: PhaseId;
  position: { x: number; y: number };
  interpretation: string;
  sourceIds: string[];
  confidence: Confidence;
}

export interface LuoShuCell {
  value: number;
  row: number;
  column: number;
  direction: string;
  phase: PhaseId;
  trigramId: TrigramId;
  note: string;
  sourceIds: string[];
  confidence: Confidence;
}

export const phaseLabels: Record<PhaseId, { name: string; color: string; text: string }> = {
  water: { name: "Water", color: "#2d6fb8", text: "depth, storage, descent" },
  fire: { name: "Fire", color: "#b83b2d", text: "radiance, expansion, ascent" },
  wood: { name: "Wood", color: "#3b8a55", text: "growth, emergence, movement" },
  metal: { name: "Metal", color: "#d7d0bd", text: "contraction, refinement, clarity" },
  earth: { name: "Earth", color: "#c7a95a", text: "center, mediation, transformation" }
};

export const numberRecords: NumberRecord[] = [
  { value: 1, chineseNumeral: "一", polarity: "yang", phase: "water", direction: "North", trigramId: "kan", note: "Odd numbers are often treated as yang within received number polarity.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 2, chineseNumeral: "二", polarity: "yin", phase: "fire", direction: "South", trigramId: "kun", note: "Even numbers are often treated as yin within received number polarity.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 3, chineseNumeral: "三", polarity: "yang", phase: "wood", direction: "East", trigramId: "zhen", note: "The 3 and 8 pair is commonly associated with Wood.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 4, chineseNumeral: "四", polarity: "yin", phase: "metal", direction: "West", trigramId: "xun", note: "The 4 and 9 pair is commonly associated with Metal.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 5, chineseNumeral: "五", polarity: "yang", phase: "earth", direction: "Center", trigramId: undefined, note: "Five is central in both He Tu and Luo Shu interpretive traditions.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 6, chineseNumeral: "六", polarity: "yin", phase: "water", direction: "North", trigramId: "qian", note: "The 1 and 6 pair is commonly associated with Water.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 7, chineseNumeral: "七", polarity: "yang", phase: "fire", direction: "South", trigramId: "dui", note: "The 2 and 7 pair is commonly associated with Fire.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 8, chineseNumeral: "八", polarity: "yin", phase: "wood", direction: "East", trigramId: "gen", note: "The 3 and 8 pair is commonly associated with Wood.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 9, chineseNumeral: "九", polarity: "yang", phase: "metal", direction: "West", trigramId: "li", note: "The 4 and 9 pair is commonly associated with Metal.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 10, chineseNumeral: "十", polarity: "yin", phase: "earth", direction: "Center", trigramId: undefined, note: "Ten completes the central Earth pair in many received He Tu explanations.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" }
];

export const heTuPairs: HeTuPair[] = [
  { id: "one-six", values: [1, 6], direction: "North", phase: "water", position: { x: 50, y: 18 }, interpretation: "Water as northern depth: one as generating number, six as completing number.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { id: "two-seven", values: [2, 7], direction: "South", phase: "fire", position: { x: 50, y: 82 }, interpretation: "Fire as southern radiance: two and seven form the southern pair.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { id: "three-eight", values: [3, 8], direction: "East", phase: "wood", position: { x: 82, y: 50 }, interpretation: "Wood as eastern emergence: three and eight mark growth and movement.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { id: "four-nine", values: [4, 9], direction: "West", phase: "metal", position: { x: 18, y: 50 }, interpretation: "Metal as western refinement: four and nine form the contracting pair.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { id: "five-ten", values: [5, 10], direction: "Center", phase: "earth", position: { x: 50, y: 50 }, interpretation: "Earth as central mediation: five and ten structure the center.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" }
];

export const luoShuCells: LuoShuCell[] = [
  { value: 4, row: 0, column: 0, direction: "Southeast", phase: "wood", trigramId: "xun", note: "Top-left in south-up display.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 9, row: 0, column: 1, direction: "South", phase: "fire", trigramId: "li", note: "The southern palace in the received magic square.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 2, row: 0, column: 2, direction: "Southwest", phase: "earth", trigramId: "kun", note: "Earth palace in the southwest.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 3, row: 1, column: 0, direction: "East", phase: "wood", trigramId: "zhen", note: "East palace.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 5, row: 1, column: 1, direction: "Center", phase: "earth", trigramId: "kun", note: "The central palace; meanings vary by framework.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 7, row: 1, column: 2, direction: "West", phase: "metal", trigramId: "dui", note: "West palace.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 8, row: 2, column: 0, direction: "Northeast", phase: "earth", trigramId: "gen", note: "Northeast palace.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 1, row: 2, column: 1, direction: "North", phase: "water", trigramId: "kan", note: "Northern palace.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" },
  { value: 6, row: 2, column: 2, direction: "Northwest", phase: "metal", trigramId: "qian", note: "Northwest palace.", sourceIds: ["received-hetu-luoshu"], confidence: "received-tradition" }
];

export const magicLines = [
  { id: "top-row", label: "Top row", values: [4, 9, 2] },
  { id: "middle-row", label: "Middle row", values: [3, 5, 7] },
  { id: "bottom-row", label: "Bottom row", values: [8, 1, 6] },
  { id: "left-column", label: "Left column", values: [4, 3, 8] },
  { id: "middle-column", label: "Middle column", values: [9, 5, 1] },
  { id: "right-column", label: "Right column", values: [2, 7, 6] },
  { id: "main-diagonal", label: "Main diagonal", values: [4, 5, 6] },
  { id: "counter-diagonal", label: "Counter diagonal", values: [2, 5, 8] }
];

export const frameworks = [
  { id: "received-cosmological", title: "Received Cosmological Interpretation", summary: "Treats He Tu and Luo Shu as cosmological number diagrams linked to direction, phase, polarity, and Bagua overlays.", confidence: "received-tradition" as Confidence },
  { id: "mathematical", title: "Mathematical Study Lens", summary: "Separates number patterns, parity, sums, pairings, and magic-square properties from ritual or cosmological interpretation.", confidence: "widely-attested" as Confidence },
  { id: "historical-critical", title: "Historical-Critical Lens", summary: "Frames origin stories as cultural narratives and distinguishes later diagrammatic synthesis from verifiable historical claims.", confidence: "modern-interpretive" as Confidence }
];

export const sources = [
  { id: "received-hetu-luoshu", title: "Received He Tu and Luo Shu Diagram Traditions", type: "Later synthesis", note: "Common pairings and nine-palace placements used for study; source lineage and orientation should be stated." },
  { id: "review-note", title: "Aetherica editorial review note", type: "Review required", note: "Bibliographic and translation details should be expanded before presenting these records as complete scholarship." }
];

export function numberRecord(value: number) {
  return numberRecords.find((record) => record.value === value) ?? numberRecords[0];
}
