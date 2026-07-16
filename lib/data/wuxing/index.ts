export type WuXingPhaseId = "wood" | "fire" | "earth" | "metal" | "water";
export type WuXingCycleType = "generating" | "controlling" | "overacting" | "counteracting";
export type WuXingConfidence = "widely-attested" | "framework-specific" | "modern-interpretive" | "review-required";

export type WuXingCorrespondence = {
  id: string;
  phaseId: WuXingPhaseId;
  category: string;
  value: string;
  frameworkId: string;
  sourceIds: string[];
  confidence: WuXingConfidence;
};

export type WuXingPhase = {
  id: WuXingPhaseId;
  englishName: string;
  chineseCharacter: string;
  pinyin: string;
  coreTendencies: string[];
  movementDescription: string;
  generatingTargetId: WuXingPhaseId;
  controllingTargetId: WuXingPhaseId;
  generatedById: WuXingPhaseId;
  controlledById: WuXingPhaseId;
  seasonal: string;
  direction: string;
  color: string;
  marker: string;
  correspondences: WuXingCorrespondence[];
  sourceIds: string[];
};

export type WuXingRelationship = {
  id: string;
  type: WuXingCycleType;
  sourcePhaseId: WuXingPhaseId;
  targetPhaseId: WuXingPhaseId;
  title: string;
  summary: string;
  sourceIds: string[];
};

export type WuXingInterpretation = {
  id: string;
  phaseId?: WuXingPhaseId;
  relationshipType?: WuXingCycleType;
  framework: string;
  historicalPeriod?: string;
  summary: string;
  sourceIds: string[];
  confidence: WuXingConfidence;
  editorialNotes?: string;
};

export type WuXingSource = {
  id: string;
  author?: string;
  title: string;
  translator?: string;
  publication?: string;
  historicalPeriod?: string;
  sourceType: "primary text" | "historical commentary" | "modern scholarship" | "Chinese medical framework" | "later interpretation" | "editorial synthesis";
  designation: string;
  notes: string;
  verificationStatus: "review-required" | "verified";
};

export const phaseOrder: WuXingPhaseId[] = ["wood", "fire", "earth", "metal", "water"];

const commonSourceIds = ["huangdi-neijing", "yijing", "review-note"];

export const correspondences: WuXingCorrespondence[] = [
  { id: "wood-season", phaseId: "wood", category: "Season", value: "Spring", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "wood-direction", phaseId: "wood", category: "Direction", value: "East", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "wood-color", phaseId: "wood", category: "Color", value: "Green / blue-green", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "wood-planet", phaseId: "wood", category: "Planet / Five Star", value: "Jupiter", frameworkId: "wuxian-five-star", sourceIds: ["benebell-wuxian"], confidence: "framework-specific" },
  { id: "wood-motion", phaseId: "wood", category: "Movement", value: "Upward emergence", frameworkId: "aetherica-comparative", sourceIds: ["review-note"], confidence: "modern-interpretive" },
  { id: "fire-season", phaseId: "fire", category: "Season", value: "Summer", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "fire-direction", phaseId: "fire", category: "Direction", value: "South", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "fire-color", phaseId: "fire", category: "Color", value: "Red / cinnabar", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "fire-planet", phaseId: "fire", category: "Planet / Five Star", value: "Mars", frameworkId: "wuxian-five-star", sourceIds: ["benebell-wuxian"], confidence: "framework-specific" },
  { id: "fire-motion", phaseId: "fire", category: "Movement", value: "Radiant culmination", frameworkId: "aetherica-comparative", sourceIds: ["review-note"], confidence: "modern-interpretive" },
  { id: "earth-season", phaseId: "earth", category: "Season", value: "Late summer / transitions / center", frameworkId: "multiple-models", sourceIds: commonSourceIds, confidence: "framework-specific" },
  { id: "earth-direction", phaseId: "earth", category: "Direction", value: "Center", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "earth-color", phaseId: "earth", category: "Color", value: "Yellow / ochre", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "earth-planet", phaseId: "earth", category: "Planet / Five Star", value: "Saturn", frameworkId: "wuxian-five-star", sourceIds: ["benebell-wuxian"], confidence: "framework-specific" },
  { id: "earth-motion", phaseId: "earth", category: "Movement", value: "Integration and support", frameworkId: "aetherica-comparative", sourceIds: ["review-note"], confidence: "modern-interpretive" },
  { id: "metal-season", phaseId: "metal", category: "Season", value: "Autumn", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "metal-direction", phaseId: "metal", category: "Direction", value: "West", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "metal-color", phaseId: "metal", category: "Color", value: "White / pale metallic", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "metal-planet", phaseId: "metal", category: "Planet / Five Star", value: "Venus", frameworkId: "wuxian-five-star", sourceIds: ["benebell-wuxian"], confidence: "framework-specific" },
  { id: "metal-motion", phaseId: "metal", category: "Movement", value: "Contraction and refinement", frameworkId: "aetherica-comparative", sourceIds: ["review-note"], confidence: "modern-interpretive" },
  { id: "water-season", phaseId: "water", category: "Season", value: "Winter", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "water-direction", phaseId: "water", category: "Direction", value: "North", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "water-color", phaseId: "water", category: "Color", value: "Black / deep blue", frameworkId: "classical-cosmology", sourceIds: commonSourceIds, confidence: "review-required" },
  { id: "water-planet", phaseId: "water", category: "Planet / Five Star", value: "Mercury", frameworkId: "wuxian-five-star", sourceIds: ["benebell-wuxian"], confidence: "framework-specific" },
  { id: "water-motion", phaseId: "water", category: "Movement", value: "Descent, storage, and renewal", frameworkId: "aetherica-comparative", sourceIds: ["review-note"], confidence: "modern-interpretive" }
];

function phaseCorrespondences(phaseId: WuXingPhaseId) {
  return correspondences.filter((item) => item.phaseId === phaseId);
}

export const phases: WuXingPhase[] = [
  {
    id: "wood",
    englishName: "Wood",
    chineseCharacter: "木",
    pinyin: "Mù",
    coreTendencies: ["Growth", "Emergence", "Expansion", "Flexibility", "Direction", "Upward movement", "Planning", "Beginning"],
    movementDescription: "Wood is the mode of sprouting, reaching, planning, and directional emergence.",
    generatingTargetId: "fire",
    controllingTargetId: "earth",
    generatedById: "water",
    controlledById: "metal",
    seasonal: "Spring",
    direction: "East",
    color: "#3f7d55",
    marker: "branching",
    correspondences: phaseCorrespondences("wood"),
    sourceIds: commonSourceIds
  },
  {
    id: "fire",
    englishName: "Fire",
    chineseCharacter: "火",
    pinyin: "Huǒ",
    coreTendencies: ["Heat", "Radiance", "Expression", "Expansion", "Culmination", "Visibility", "Communication", "Transformation"],
    movementDescription: "Fire is the mode of radiance, communication, heat, and expressive culmination.",
    generatingTargetId: "earth",
    controllingTargetId: "metal",
    generatedById: "wood",
    controlledById: "water",
    seasonal: "Summer",
    direction: "South",
    color: "#a6402f",
    marker: "radiant",
    correspondences: phaseCorrespondences("fire"),
    sourceIds: commonSourceIds
  },
  {
    id: "earth",
    englishName: "Earth",
    chineseCharacter: "土",
    pinyin: "Tǔ",
    coreTendencies: ["Stability", "Nourishment", "Center", "Integration", "Support", "Containment", "Transition", "Embodiment"],
    movementDescription: "Earth is the mode of centering, nourishment, support, and transitional integration.",
    generatingTargetId: "metal",
    controllingTargetId: "water",
    generatedById: "fire",
    controlledById: "wood",
    seasonal: "Late summer / transitions",
    direction: "Center",
    color: "#b59255",
    marker: "square",
    correspondences: phaseCorrespondences("earth"),
    sourceIds: commonSourceIds
  },
  {
    id: "metal",
    englishName: "Metal",
    chineseCharacter: "金",
    pinyin: "Jīn",
    coreTendencies: ["Contraction", "Refinement", "Structure", "Discernment", "Cutting", "Boundary", "Completion", "Value"],
    movementDescription: "Metal is the mode of refinement, boundary, cutting discernment, and valued structure.",
    generatingTargetId: "water",
    controllingTargetId: "wood",
    generatedById: "earth",
    controlledById: "fire",
    seasonal: "Autumn",
    direction: "West",
    color: "#c8c8b8",
    marker: "blade",
    correspondences: phaseCorrespondences("metal"),
    sourceIds: commonSourceIds
  },
  {
    id: "water",
    englishName: "Water",
    chineseCharacter: "水",
    pinyin: "Shuǐ",
    coreTendencies: ["Storage", "Depth", "Descent", "Stillness", "Potential", "Adaptability", "Concealment", "Renewal"],
    movementDescription: "Water is the mode of depth, storage, concealment, descent, and renewed potential.",
    generatingTargetId: "wood",
    controllingTargetId: "fire",
    generatedById: "metal",
    controlledById: "earth",
    seasonal: "Winter",
    direction: "North",
    color: "#345d75",
    marker: "wave",
    correspondences: phaseCorrespondences("water"),
    sourceIds: commonSourceIds
  }
];

const relationshipSummaries: Record<string, string> = {
  "wood-fire": "Wood provides fuel for flame. Symbolically, growth and emergence may culminate in expression, heat, and radiance.",
  "fire-earth": "Fire leaves ash and transformed residue. Symbolically, culmination and expression settle into form, stability, and integration.",
  "earth-metal": "Metal is traditionally understood as arising within the earth. Symbolically, grounded matter condenses into structure, distinction, and value.",
  "metal-water": "In traditional symbolic cosmology, metal is associated with condensation and gathering moisture. Symbolically, structure concentrates and releases fluid potential.",
  "water-wood": "Water nourishes vegetation. Symbolically, depth, storage, and potential give rise to renewed growth.",
  "wood-earth": "Roots penetrate and stabilize soil. Symbolically, growth reorganizes and redirects stability.",
  "earth-water": "Banks and terrain contain or channel water. Symbolically, form gives boundaries to fluidity.",
  "water-fire": "Water moderates flame. Symbolically, cooling and depth restrain excessive heat.",
  "fire-metal": "Fire melts and transforms metal. Symbolically, intensity modifies rigidity and structure.",
  "metal-wood": "Metal tools cut wood. Symbolically, structure and discernment regulate growth."
};

function relationship(type: WuXingCycleType, sourcePhaseId: WuXingPhaseId, targetPhaseId: WuXingPhaseId): WuXingRelationship {
  const source = phases.find((phase) => phase.id === sourcePhaseId);
  const target = phases.find((phase) => phase.id === targetPhaseId);
  const base = relationshipSummaries[`${sourcePhaseId}-${targetPhaseId}`] ?? "This relationship is a symbolic phase interaction within the selected framework.";
  const title = `${source?.englishName ?? sourcePhaseId} ${type === "generating" ? "generates" : type === "counteracting" ? "counteracts" : type === "overacting" ? "overacts on" : "controls"} ${target?.englishName ?? targetPhaseId}`;
  return {
    id: `${type}-${sourcePhaseId}-${targetPhaseId}`,
    type,
    sourcePhaseId,
    targetPhaseId,
    title,
    summary: type === "overacting"
      ? `Regulation becomes domination when one phase is excessive or the regulated phase is unusually weak. ${base}`
      : type === "counteracting"
        ? `The counteracting cycle describes reversal, where a phase pushes back against the phase that would normally regulate it. ${base}`
        : base,
    sourceIds: commonSourceIds
  };
}

export const relationships: WuXingRelationship[] = [
  relationship("generating", "wood", "fire"),
  relationship("generating", "fire", "earth"),
  relationship("generating", "earth", "metal"),
  relationship("generating", "metal", "water"),
  relationship("generating", "water", "wood"),
  relationship("controlling", "wood", "earth"),
  relationship("controlling", "earth", "water"),
  relationship("controlling", "water", "fire"),
  relationship("controlling", "fire", "metal"),
  relationship("controlling", "metal", "wood"),
  relationship("overacting", "wood", "earth"),
  relationship("overacting", "earth", "water"),
  relationship("overacting", "water", "fire"),
  relationship("overacting", "fire", "metal"),
  relationship("overacting", "metal", "wood"),
  relationship("counteracting", "earth", "wood"),
  relationship("counteracting", "water", "earth"),
  relationship("counteracting", "fire", "water"),
  relationship("counteracting", "metal", "fire"),
  relationship("counteracting", "wood", "metal")
];

export const seasonalModels = [
  {
    id: "central",
    title: "Earth as Center",
    summary: "Earth mediates and stabilizes the other four phases from the center.",
    sequence: ["wood", "fire", "metal", "water"] as WuXingPhaseId[]
  },
  {
    id: "late-summer",
    title: "Earth as Late Summer",
    summary: "Earth is placed after Fire as a ripening, nourishing, integrating season.",
    sequence: ["wood", "fire", "earth", "metal", "water"] as WuXingPhaseId[]
  },
  {
    id: "transitional",
    title: "Earth as Seasonal Transition",
    summary: "Earth appears as transitional mediation between the four seasonal quarters.",
    sequence: ["wood", "earth", "fire", "earth", "metal", "earth", "water", "earth"] as WuXingPhaseId[]
  }
];

export const interpretations: WuXingInterpretation[] = [
  {
    id: "classical-cosmology",
    framework: "Classical cosmology",
    historicalPeriod: "Early and classical Chinese contexts",
    summary: "Five Phases are presented as recurring modes of change whose meanings emerge through sequence, regulation, season, and relation.",
    sourceIds: commonSourceIds,
    confidence: "review-required",
    editorialNotes: "This page should continue to distinguish symbolic cosmology from modern chemical or scientific explanation."
  },
  {
    id: "medical-framework",
    framework: "Chinese medical framework",
    historicalPeriod: "Layered medical tradition",
    summary: "Medical correspondences are framework-specific and are included only as historical-symbolic reference, not as medical advice.",
    sourceIds: ["huangdi-neijing", "review-note"],
    confidence: "review-required",
    editorialNotes: "Do not present medical correspondences as diagnosis, treatment, or health guidance."
  },
  {
    id: "aetherica-comparative",
    framework: "Aetherica comparative symbolism",
    summary: "Compares phase motion with other symbolic systems while labeling the comparison as modern interpretive synthesis.",
    sourceIds: ["review-note"],
    confidence: "modern-interpretive",
    editorialNotes: "Used as a bridge into Aetherica archive topics and related instruments."
  },
  {
    id: "wuxian-five-star",
    framework: "Wuxian Five Star layer",
    historicalPeriod: "Qin-era astrology manuscript tradition, later reception",
    summary: "Adds the five visible wandering-star correspondences: Jupiter/Wood, Mars/Fire, Saturn/Earth, Venus/Metal, and Mercury/Water.",
    sourceIds: ["benebell-wuxian"],
    confidence: "framework-specific",
    editorialNotes: "This is an astrological Five Star layer, not a replacement for medical or seasonal Wu Xing frameworks."
  }
];

export const sources: WuXingSource[] = [
  {
    id: "yijing",
    title: "Yijing / Book of Changes",
    historicalPeriod: "Classical Chinese text with layered commentarial tradition",
    sourceType: "primary text",
    designation: "Primary text",
    verificationStatus: "review-required",
    notes: "Relevant for line, image, change, and trigram frameworks. Specific edition/translation should be selected for final citation."
  },
  {
    id: "huangdi-neijing",
    title: "Huangdi Neijing / Yellow Emperor's Inner Classic",
    historicalPeriod: "Classical Chinese medical corpus",
    sourceType: "Chinese medical framework",
    designation: "Chinese medical framework",
    verificationStatus: "review-required",
    notes: "Relevant for medical-system Five Phase correspondences. Included for historical reference only, not medical guidance."
  },
  {
    id: "review-note",
    title: "Aetherica editorial synthesis",
    sourceType: "editorial synthesis",
    designation: "Aetherica editorial synthesis",
    verificationStatus: "review-required",
    notes: "Preliminary interface wording and comparisons should remain visibly labeled until reviewed against selected sources."
  },
  {
    id: "benebell-wuxian",
    author: "Benebell Wen",
    title: "Chinese Astrology circa 246 BC: Wuxian Five Star Divination",
    historicalPeriod: "Modern article on Qin-era Five Star Divination material",
    sourceType: "later interpretation",
    designation: "External Taoist reference",
    verificationStatus: "verified",
    notes: "Used for the Five Star planetary correspondences: Mercury/Water, Venus/Metal, Mars/Fire, Jupiter/Wood, and Saturn/Earth."
  }
];

export const faqs = [
  {
    question: "Are the Five Phases literal chemical elements?",
    answer: "No. This instrument presents them as recurring modes of transformation: movement, sequence, regulation, and relationship."
  },
  {
    question: "Is the controlling cycle destructive?",
    answer: "It is better read here as regulation. Overacting and counteracting modes show what happens when regulation becomes excessive or reversed."
  },
  {
    question: "Why is Earth shown in different seasonal models?",
    answer: "Earth has multiple placements in different frameworks, including center, late summer, and transitional periods. The tool labels the model instead of silently choosing one."
  },
  {
    question: "Are medical correspondences medical advice?",
    answer: "No. Any medical-system correspondences are historical-symbolic references only and should not be used for diagnosis or treatment."
  }
];
