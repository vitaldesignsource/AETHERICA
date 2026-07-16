export type OrganClockPeriodId =
  | "gallbladder"
  | "liver"
  | "lung"
  | "large-intestine"
  | "stomach"
  | "spleen"
  | "heart"
  | "small-intestine"
  | "bladder"
  | "kidney"
  | "pericardium"
  | "san-jiao";

export type OrganClockMode = "live" | "explore" | "pair" | "five-phase" | "flow" | "compare" | "journal" | "scholar" | "textual";
export type OrganPhaseId = "wood" | "fire" | "earth" | "metal" | "water";
export type YinYang = "yin" | "yang";

export interface OrganClockPeriod {
  id: OrganClockPeriodId;
  englishName: string;
  chineseName: string;
  simplifiedChineseName?: string;
  pinyin: string;
  meridianName: string;
  startHour: number;
  endHour: number;
  yinYang: YinYang;
  phaseId: OrganPhaseId;
  pairedPeriodId: OrganClockPeriodId;
  traditionalAssociations: string[];
  emotionCategory: string;
  senseCategory: string;
  caution: string;
  frameworkIds: string[];
  sourceIds: string[];
  reviewStatus: "verified" | "review-required";
}

export const organPhaseLabels: Record<OrganPhaseId, { name: string; color: string; note: string }> = {
  wood: { name: "Wood", color: "#3b8a55", note: "growth, movement, planning, arising" },
  fire: { name: "Fire", color: "#b83b2d", note: "warmth, radiance, connection, circulation" },
  earth: { name: "Earth", color: "#c4a45b", note: "nourishment, transformation, centering" },
  metal: { name: "Metal", color: "#d8d0bf", note: "rhythm, refinement, release, boundary" },
  water: { name: "Water", color: "#2e72b8", note: "storage, depth, conservation, restoration" }
};

export const organClockPeriods: OrganClockPeriod[] = [
  { id: "gallbladder", englishName: "Gallbladder", chineseName: "膽", simplifiedChineseName: "胆", pinyin: "Dǎn", meridianName: "Gallbladder channel", startHour: 23, endHour: 1, yinYang: "yang", phaseId: "wood", pairedPeriodId: "liver", traditionalAssociations: ["decision", "planning support", "courage as a traditional category"], emotionCategory: "decision and resolve", senseCategory: "eyes by Wood association", caution: "Do not infer gallbladder pathology from waking during this period.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "liver", englishName: "Liver", chineseName: "肝", pinyin: "Gān", meridianName: "Liver channel", startHour: 1, endHour: 3, yinYang: "yin", phaseId: "wood", pairedPeriodId: "gallbladder", traditionalAssociations: ["smooth flow", "planning", "stored blood in traditional theory"], emotionCategory: "anger / frustration in traditional correspondence", senseCategory: "eyes", caution: "Traditional Liver is a functional category and is not identical to the biomedical liver.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "lung", englishName: "Lung", chineseName: "肺", pinyin: "Fèi", meridianName: "Lung channel", startHour: 3, endHour: 5, yinYang: "yin", phaseId: "metal", pairedPeriodId: "large-intestine", traditionalAssociations: ["breath", "rhythm", "surface defense in traditional theory"], emotionCategory: "grief / letting go in traditional correspondence", senseCategory: "nose / skin", caution: "Do not treat waking during this period as proof of Lung imbalance.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "large-intestine", englishName: "Large Intestine", chineseName: "大腸", simplifiedChineseName: "大肠", pinyin: "Dà Cháng", meridianName: "Large Intestine channel", startHour: 5, endHour: 7, yinYang: "yang", phaseId: "metal", pairedPeriodId: "lung", traditionalAssociations: ["release", "elimination", "boundary"], emotionCategory: "letting go", senseCategory: "nose / skin by Metal association", caution: "This is a traditional channel category, not a diagnostic claim about the anatomical colon.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "stomach", englishName: "Stomach", chineseName: "胃", pinyin: "Wèi", meridianName: "Stomach channel", startHour: 7, endHour: 9, yinYang: "yang", phaseId: "earth", pairedPeriodId: "spleen", traditionalAssociations: ["receiving nourishment", "descent", "appetite"], emotionCategory: "worry by Earth association", senseCategory: "mouth", caution: "Traditional Stomach is broader than the biomedical stomach.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "spleen", englishName: "Spleen", chineseName: "脾", pinyin: "Pí", meridianName: "Spleen channel", startHour: 9, endHour: 11, yinYang: "yin", phaseId: "earth", pairedPeriodId: "stomach", traditionalAssociations: ["transformation", "transportation", "nourishment in traditional theory"], emotionCategory: "worry / rumination in traditional correspondence", senseCategory: "mouth", caution: "Traditional Spleen is not identical to the biomedical spleen.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "heart", englishName: "Heart", chineseName: "心", pinyin: "Xīn", meridianName: "Heart channel", startHour: 11, endHour: 13, yinYang: "yin", phaseId: "fire", pairedPeriodId: "small-intestine", traditionalAssociations: ["spirit in traditional theory", "warmth", "connection"], emotionCategory: "joy in traditional correspondence", senseCategory: "tongue", caution: "Do not infer cardiac health from this period.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "small-intestine", englishName: "Small Intestine", chineseName: "小腸", simplifiedChineseName: "小肠", pinyin: "Xiǎo Cháng", meridianName: "Small Intestine channel", startHour: 13, endHour: 15, yinYang: "yang", phaseId: "fire", pairedPeriodId: "heart", traditionalAssociations: ["separating clear and turbid in traditional theory", "discernment"], emotionCategory: "clarity / discernment", senseCategory: "tongue by Fire association", caution: "This is a traditional functional channel, not a biomedical assessment.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "bladder", englishName: "Bladder", chineseName: "膀胱", pinyin: "Páng Guāng", meridianName: "Bladder channel", startHour: 15, endHour: 17, yinYang: "yang", phaseId: "water", pairedPeriodId: "kidney", traditionalAssociations: ["water pathway", "back-channel circulation in traditional theory"], emotionCategory: "fear by Water association", senseCategory: "ears by Water association", caution: "This period is not evidence of urinary or bladder disease.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "kidney", englishName: "Kidney", chineseName: "腎", simplifiedChineseName: "肾", pinyin: "Shèn", meridianName: "Kidney channel", startHour: 17, endHour: 19, yinYang: "yin", phaseId: "water", pairedPeriodId: "bladder", traditionalAssociations: ["storage", "essence in traditional theory", "rooting"], emotionCategory: "fear / will in traditional correspondence", senseCategory: "ears", caution: "Traditional Kidney does not mean the same thing as biomedical kidneys.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "pericardium", englishName: "Pericardium", chineseName: "心包", pinyin: "Xīn Bāo", meridianName: "Pericardium channel", startHour: 19, endHour: 21, yinYang: "yin", phaseId: "fire", pairedPeriodId: "san-jiao", traditionalAssociations: ["heart protector in traditional theory", "relational warmth"], emotionCategory: "joy / emotional contact", senseCategory: "tongue by Fire association", caution: "This is a traditional channel category, not a statement about the anatomical pericardium.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" },
  { id: "san-jiao", englishName: "San Jiao / Triple Burner", chineseName: "三焦", pinyin: "Sān Jiāo", meridianName: "San Jiao channel", startHour: 21, endHour: 23, yinYang: "yang", phaseId: "fire", pairedPeriodId: "pericardium", traditionalAssociations: ["three burners", "fluid and functional regulation in traditional theory"], emotionCategory: "coordination / circulation", senseCategory: "ear channel relationships vary by framework", caution: "San Jiao is a traditional functional concept without a single biomedical organ equivalent.", frameworkIds: ["received-body-clock"], sourceIds: ["tcm-received", "review-note"], reviewStatus: "review-required" }
];

export const organClockFrameworks = [
  {
    id: "received-body-clock",
    title: "Received Organ-Meridian Clock",
    summary: "A common modern presentation of a traditional twelve two-hour meridian prominence cycle.",
    caution: "Educational and observational only; not a diagnostic or treatment tool."
  },
  {
    id: "five-phase-pairing",
    title: "Five-Phase Pairing Lens",
    summary: "Pairs yin and yang organ-meridian systems within Wood, Fire, Earth, Metal, and Water groupings.",
    caution: "Pairing language is framework-specific and should not be treated as biomedical anatomy."
  }
];

export const organClockSources = [
  { id: "tcm-received", title: "Received traditional Chinese medical channel-clock presentations", type: "Chinese medical framework", note: "Used for the twelve two-hour period sequence and channel pairings. Requires bibliography expansion and expert review." },
  { id: "review-note", title: "Aetherica medical-safety review note", type: "Review required", note: "This instrument must remain educational and observational. It must not diagnose, treat, or imply biomedical causation." }
];

export const organClockFaqs = [
  {
    question: "Is this a medical diagnostic tool?",
    answer: "No. It is an educational representation of a traditional Chinese medical theory model. It does not diagnose or recommend treatment."
  },
  {
    question: "Are these organs the same as biomedical organs?",
    answer: "No. Traditional Chinese medical organ-meridian systems are broader functional categories and do not map directly onto modern anatomical organs."
  },
  {
    question: "Does waking at 3 AM prove a Lung problem?",
    answer: "No. You may record observations, but the tool must not infer deficiency, excess, or disease from a time pattern."
  }
];

export function periodById(id: OrganClockPeriodId) {
  return organClockPeriods.find((period) => period.id === id) ?? organClockPeriods[0];
}

export function periodForMinute(minute: number) {
  const hour = Math.floor(minute / 60);
  return organClockPeriods.find((period) => {
    if (period.startHour > period.endHour) return hour >= period.startHour || hour < period.endHour;
    return hour >= period.startHour && hour < period.endHour;
  }) ?? organClockPeriods[0];
}

export function periodIndex(id: OrganClockPeriodId) {
  return organClockPeriods.findIndex((period) => period.id === id);
}

export function nextPeriod(id: OrganClockPeriodId) {
  const index = periodIndex(id);
  return organClockPeriods[(index + 1 + organClockPeriods.length) % organClockPeriods.length];
}

export function previousPeriod(id: OrganClockPeriodId) {
  const index = periodIndex(id);
  return organClockPeriods[(index - 1 + organClockPeriods.length) % organClockPeriods.length];
}

export function minutesUntilPeriodEnd(period: OrganClockPeriod, minute: number) {
  const end = period.endHour * 60;
  if (period.startHour > period.endHour) {
    const adjustedEnd = end + 24 * 60;
    const adjustedMinute = minute < end ? minute + 24 * 60 : minute;
    return adjustedEnd - adjustedMinute;
  }
  return end - minute;
}
