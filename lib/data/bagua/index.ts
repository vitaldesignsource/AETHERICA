export type LineType = "yin" | "yang";
export type TrigramId = "qian" | "dui" | "li" | "zhen" | "xun" | "kan" | "gen" | "kun";
export type ArrangementId = "earlier-heaven" | "later-heaven";
export type OrientationId = "south-up" | "north-up" | "source-original";
export type Confidence = "widely-attested" | "received-tradition" | "framework-specific" | "modern-interpretive" | "review-required";

export interface CosmologicalFramework {
  id: string;
  title: string;
  tradition: "yijing" | "taoist" | "confucian" | "feng-shui" | "chinese-medical" | "modern-scholarship" | "aetherica-editorial";
  historicalPeriod?: string;
  summary: string;
  sourceIds: string[];
  confidence: Confidence;
}

export interface Trigram {
  id: TrigramId;
  symbol: string;
  traditionalCharacter: string;
  simplifiedCharacter?: string;
  pinyin: string;
  englishName: string;
  naturalImage: string;
  linesBottomToTop: [LineType, LineType, LineType];
  familyRole: string;
  coreQualities: string[];
  body: string;
  animal: string;
  sourceIds: string[];
  reviewStatus: "verified" | "review-required";
}

export interface ArrangementPosition {
  trigramId: TrigramId;
  direction: string;
  season: string;
  fivePhase: string;
  number: string;
  note: string;
  frameworkId: string;
  sourceIds: string[];
  confidence: Confidence;
}

export interface HexagramRecord {
  number: number;
  name: string;
  chinese: string;
  pinyin: string;
  upper: TrigramId;
  lower: TrigramId;
  note: string;
}

export const trigrams: Trigram[] = [
  { id: "qian", symbol: "☰", traditionalCharacter: "乾", pinyin: "Qián", englishName: "Heaven", naturalImage: "Heaven", linesBottomToTop: ["yang", "yang", "yang"], familyRole: "Father", coreQualities: ["creative", "initiating", "firm", "celestial"], body: "Head", animal: "Horse", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "dui", symbol: "☱", traditionalCharacter: "兌", simplifiedCharacter: "兑", pinyin: "Duì", englishName: "Lake", naturalImage: "Lake / Marsh", linesBottomToTop: ["yang", "yang", "yin"], familyRole: "Youngest daughter", coreQualities: ["joyous", "open", "receptive at the surface"], body: "Mouth", animal: "Sheep", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "li", symbol: "☲", traditionalCharacter: "離", simplifiedCharacter: "离", pinyin: "Lí", englishName: "Fire", naturalImage: "Fire", linesBottomToTop: ["yang", "yin", "yang"], familyRole: "Middle daughter", coreQualities: ["clarity", "radiance", "adherence", "illumination"], body: "Eyes", animal: "Pheasant", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "zhen", symbol: "☳", traditionalCharacter: "震", pinyin: "Zhèn", englishName: "Thunder", naturalImage: "Thunder", linesBottomToTop: ["yang", "yin", "yin"], familyRole: "Eldest son", coreQualities: ["arousing", "movement", "shock", "springing forth"], body: "Feet", animal: "Dragon", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "xun", symbol: "☴", traditionalCharacter: "巽", pinyin: "Xùn", englishName: "Wind", naturalImage: "Wind / Wood", linesBottomToTop: ["yin", "yang", "yang"], familyRole: "Eldest daughter", coreQualities: ["penetrating", "gentle", "entering", "woodlike growth"], body: "Thighs", animal: "Fowl", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "kan", symbol: "☵", traditionalCharacter: "坎", pinyin: "Kǎn", englishName: "Water", naturalImage: "Water", linesBottomToTop: ["yin", "yang", "yin"], familyRole: "Middle son", coreQualities: ["danger", "depth", "flow", "hidden continuity"], body: "Ears", animal: "Pig", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "gen", symbol: "☶", traditionalCharacter: "艮", pinyin: "Gèn", englishName: "Mountain", naturalImage: "Mountain", linesBottomToTop: ["yin", "yin", "yang"], familyRole: "Youngest son", coreQualities: ["stillness", "stopping", "boundary", "containment"], body: "Hands", animal: "Dog", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" },
  { id: "kun", symbol: "☷", traditionalCharacter: "坤", pinyin: "Kūn", englishName: "Earth", naturalImage: "Earth", linesBottomToTop: ["yin", "yin", "yin"], familyRole: "Mother", coreQualities: ["receptive", "nourishing", "field", "yielding"], body: "Belly", animal: "Cow", sourceIds: ["yijing", "shuogua"], reviewStatus: "verified" }
];

export const arrangements: Record<ArrangementId, ArrangementPosition[]> = {
  "earlier-heaven": [
    { trigramId: "qian", direction: "South", season: "Primordial yang", fivePhase: "Heaven / metal associations vary", number: "1", note: "Placed opposite Kun to emphasize perfect complementarity.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "dui", direction: "Southeast", season: "Completing yang", fivePhase: "Metal", number: "2", note: "Paired across the wheel with Gen.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "li", direction: "East", season: "Solar clarity", fivePhase: "Fire", number: "3", note: "Placed opposite Kan as fire and water complement.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "zhen", direction: "Northeast", season: "Arousing motion", fivePhase: "Wood", number: "4", note: "Placed opposite Xun as thunder and wind.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "xun", direction: "Southwest", season: "Penetrating motion", fivePhase: "Wood", number: "5", note: "Complements Zhen in the Earlier Heaven symmetry.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "kan", direction: "West", season: "Lunar depth", fivePhase: "Water", number: "6", note: "Opposite Li.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "gen", direction: "Northwest", season: "Still completion", fivePhase: "Earth", number: "7", note: "Opposite Dui.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "kun", direction: "North", season: "Primordial yin", fivePhase: "Earth", number: "8", note: "Placed opposite Qian.", frameworkId: "fuxi-received", sourceIds: ["received-bagua"], confidence: "received-tradition" }
  ],
  "later-heaven": [
    { trigramId: "li", direction: "South", season: "Summer", fivePhase: "Fire", number: "9", note: "The Later Heaven wheel emphasizes seasonal and manifest process.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "kun", direction: "Southwest", season: "Late summer / receiving", fivePhase: "Earth", number: "2", note: "Earth as field and receptivity.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "dui", direction: "West", season: "Autumn", fivePhase: "Metal", number: "7", note: "Lake / marsh in the west.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "qian", direction: "Northwest", season: "Late autumn", fivePhase: "Metal", number: "6", note: "Heaven in the northwest.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "kan", direction: "North", season: "Winter", fivePhase: "Water", number: "1", note: "Water and depth in the north.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "gen", direction: "Northeast", season: "Late winter / stillness", fivePhase: "Earth", number: "8", note: "Mountain as stilling and threshold.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "zhen", direction: "East", season: "Spring", fivePhase: "Wood", number: "3", note: "Thunder as spring arousal.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" },
    { trigramId: "xun", direction: "Southeast", season: "Late spring", fivePhase: "Wood", number: "4", note: "Wind / wood as penetrating growth.", frameworkId: "king-wen-received", sourceIds: ["received-bagua"], confidence: "received-tradition" }
  ]
};

export const frameworks: CosmologicalFramework[] = [
  { id: "fuxi-received", title: "Earlier Heaven / Fuxi Received Arrangement", tradition: "yijing", summary: "A received symmetrical arrangement used to study complementarity and primordial balance. Traditional narratives connect it with Fuxi, while historical claims require careful qualification.", sourceIds: ["received-bagua"], confidence: "received-tradition" },
  { id: "king-wen-received", title: "Later Heaven / King Wen Received Arrangement", tradition: "yijing", summary: "A received directional and seasonal arrangement associated with manifest cycles, time, and process.", sourceIds: ["received-bagua"], confidence: "received-tradition" },
  { id: "aetherica-comparative", title: "Aetherica Comparative Study Lens", tradition: "aetherica-editorial", summary: "An editorial comparison of polarity, phase, number, and symbolic relationship across the Aetherica instrument cabinet.", sourceIds: ["review-note"], confidence: "modern-interpretive" }
];

export const hexagrams: HexagramRecord[] = [
  { number: 1, name: "The Creative", chinese: "乾", pinyin: "Qián", upper: "qian", lower: "qian", note: "Heaven above Heaven: pure creative force." },
  { number: 2, name: "The Receptive", chinese: "坤", pinyin: "Kūn", upper: "kun", lower: "kun", note: "Earth above Earth: receptive field and support." },
  { number: 3, name: "Difficulty at the Beginning", chinese: "屯", pinyin: "Zhūn", upper: "kan", lower: "zhen", note: "Water above Thunder: emerging order amid difficulty." },
  { number: 29, name: "The Abysmal", chinese: "坎", pinyin: "Kǎn", upper: "kan", lower: "kan", note: "Water above Water: repeated depth and danger." },
  { number: 30, name: "The Clinging", chinese: "離", pinyin: "Lí", upper: "li", lower: "li", note: "Fire above Fire: clarity, radiance, and dependence." },
  { number: 63, name: "After Completion", chinese: "既濟", simplified: "既济", pinyin: "Jì Jì", upper: "kan", lower: "li", note: "Water above Fire: a completed but delicate order." } as HexagramRecord,
  { number: 64, name: "Before Completion", chinese: "未濟", simplified: "未济", pinyin: "Wèi Jì", upper: "li", lower: "kan", note: "Fire above Water: unfinished transformation." } as HexagramRecord
];

export const sources = [
  { id: "yijing", title: "Yijing / Book of Changes", type: "Primary source", note: "Canonical source context for hexagrams and trigrams; translation traditions vary." },
  { id: "shuogua", title: "Shuo Gua / Discussion of the Trigrams", type: "Traditional commentary", note: "Important received source for trigram images, family roles, and correspondences." },
  { id: "received-bagua", title: "Received Bagua Arrangement Traditions", type: "Later synthesis", note: "Commonly transmitted Earlier Heaven and Later Heaven diagrams; historical origin narratives should be qualified." },
  { id: "review-note", title: "Aetherica editorial review note", type: "Review required", note: "Use as a labeled study lens until the full bibliography and source audit are complete." }
];

export function trigramById(id: TrigramId) {
  return trigrams.find((trigram) => trigram.id === id) ?? trigrams[0];
}

export function positionFor(arrangement: ArrangementId, trigramId: TrigramId) {
  return arrangements[arrangement].find((position) => position.trigramId === trigramId) ?? arrangements[arrangement][0];
}

export function complementLines(lines: [LineType, LineType, LineType]): [LineType, LineType, LineType] {
  return lines.map((line) => (line === "yang" ? "yin" : "yang")) as [LineType, LineType, LineType];
}

export function trigramFromLines(lines: [LineType, LineType, LineType]) {
  return trigrams.find((trigram) => trigram.linesBottomToTop.every((line, index) => line === lines[index])) ?? trigrams[0];
}
