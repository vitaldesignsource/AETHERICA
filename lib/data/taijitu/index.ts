export type Confidence = "widely-attested" | "system-specific" | "interpretive" | "review-required";

export type SourcedInterpretation = {
  id: string;
  title: string;
  summary: string;
  framework: string;
  historicalPeriod?: string;
  sourceIds: string[];
  confidence?: Confidence;
  editorialNotes?: string;
};

export type SourceRecord = {
  id: string;
  author?: string;
  title: string;
  translator?: string;
  publication?: string;
  historicalPeriod?: string;
  sourceType: "primary text" | "historical commentary" | "modern scholarship" | "later interpretation" | "editorial synthesis";
  notes: string;
  designation: "Primary text" | "Historical commentary" | "Modern scholarship" | "Later interpretation" | "Aetherica editorial synthesis";
  reviewStatus: "review-required" | "verified";
};

export type PolarityField = {
  id: "yin" | "yang" | "yin-seed" | "yang-seed";
  title: string;
  short: string;
  tendencies: string[];
  caution: string;
  motion: string;
};

export type PolarityPair = {
  id: string;
  yin: string;
  yang: string;
  explanation: string;
};

export type CycleStage = {
  id: string;
  title: string;
  polarity: "greater-yin" | "lesser-yang" | "greater-yang" | "lesser-yin";
  tendency: string;
  explanation: string;
};

export type CycleModel = {
  id: string;
  title: string;
  summary: string;
  stages: CycleStage[];
};

export type FourImage = {
  id: "greater-yin" | "lesser-yang" | "greater-yang" | "lesser-yin";
  title: string;
  lineSymbol: string;
  daily: string;
  seasonal: string;
  explanation: string;
};

export type Trigram = {
  id: string;
  chinese: string;
  pinyin: string;
  english: string;
  naturalImage: string;
  family: string;
  linesBottomToTop: Array<"yin" | "yang">;
  earlierHeaven: string;
  laterHeaven: string;
  reviewStatus: "review-required" | "verified";
};

export type FivePhase = {
  id: string;
  name: string;
  polarityRelation: string;
  color: string;
  note: string;
};

export const polarityFields: PolarityField[] = [
  {
    id: "yin",
    title: "Yin",
    short: "Consolidating, cooling, inward, receptive tendency.",
    tendencies: ["Receptivity", "Inwardness", "Cooling", "Descending", "Stillness", "Darkness", "Consolidation"],
    caution: "These are relational tendencies, not permanent identities. A phenomenon may be yin in one relationship and yang in another.",
    motion: "Movement slows, light draws inward, and form deepens."
  },
  {
    id: "yang",
    title: "Yang",
    short: "Expanding, warming, outward, expressive tendency.",
    tendencies: ["Activity", "Outwardness", "Warming", "Rising", "Movement", "Light", "Expansion"],
    caution: "These are relational tendencies, not permanent identities. Yang is not morally superior to yin, and yin is not inert absence.",
    motion: "Movement expands, radiance strengthens, and form becomes more expressive."
  },
  {
    id: "yin-seed",
    title: "Yin within Yang",
    short: "The counter-tendency already present within flourishing yang.",
    tendencies: ["Return", "Cooling seed", "Limit within fullness", "Rest hidden in activity"],
    caution: "At fullness, the conditions of reversal have already begun. This is not contradiction; it is cyclical containment.",
    motion: "The ivory field brightens while the dark seed gathers depth."
  },
  {
    id: "yang-seed",
    title: "Yang within Yin",
    short: "The counter-tendency already present within flourishing yin.",
    tendencies: ["Emergence", "Warming seed", "Motion hidden in stillness", "Potential within quiet"],
    caution: "The seed of yang is present within deep yin. Stillness may be preparing renewed movement.",
    motion: "The dark field settles while the ivory seed becomes luminous."
  }
];

export const polarityPairs: PolarityPair[] = [
  { id: "dark-light", yin: "Dark", yang: "Light", explanation: "Dark and light are relational phases of disclosure and concealment, not moral categories." },
  { id: "inward-outward", yin: "Inward", yang: "Outward", explanation: "Inwardness gathers, protects, and consolidates; outwardness expresses, radiates, and extends." },
  { id: "cooling-warming", yin: "Cooling", yang: "Warming", explanation: "Cooling and warming describe tendencies within a process, not fixed properties of a thing." },
  { id: "descending-ascending", yin: "Descending", yang: "Ascending", explanation: "Descent and ascent mark directions of movement within a cycle of emergence and return." },
  { id: "stillness-movement", yin: "Stillness", yang: "Movement", explanation: "Stillness can contain latent motion; movement can carry the seed of eventual rest." },
  { id: "contracting-expanding", yin: "Contracting", yang: "Expanding", explanation: "Contraction creates definition and capacity; expansion reveals range and expression." },
  { id: "night-day", yin: "Night", yang: "Day", explanation: "Night and day are cyclical conditions that contain one another through dawn and dusk." },
  { id: "winter-summer", yin: "Winter", yang: "Summer", explanation: "Winter and summer are poles in a seasonal process, with spring and autumn as transitional images." }
];

export const cycles: CycleModel[] = [
  {
    id: "daily",
    title: "Daily Cycle",
    summary: "A four-part rhythm from maximum yin through emerging yang, maximum yang, and returning yin.",
    stages: [
      { id: "midnight", title: "Midnight", polarity: "greater-yin", tendency: "Maximum yin; seed of yang", explanation: "The night is deepest, yet the condition for return has begun." },
      { id: "dawn", title: "Dawn", polarity: "lesser-yang", tendency: "Yang emerging", explanation: "Light rises from concealment and begins to unfold." },
      { id: "noon", title: "Noon", polarity: "greater-yang", tendency: "Maximum yang; seed of yin", explanation: "Brightness reaches fullness, and the tendency toward decline is already present." },
      { id: "dusk", title: "Dusk", polarity: "lesser-yin", tendency: "Yin emerging", explanation: "Light recedes and the inward phase gathers." }
    ]
  },
  {
    id: "seasonal",
    title: "Seasonal Cycle",
    summary: "A seasonal reading of polarity as winter, spring, summer, and autumn.",
    stages: [
      { id: "winter", title: "Winter", polarity: "greater-yin", tendency: "Yin flourishing", explanation: "Life consolidates, stores, and turns inward." },
      { id: "spring", title: "Spring", polarity: "lesser-yang", tendency: "Yang emerging", explanation: "Growth begins to rise and differentiate." },
      { id: "summer", title: "Summer", polarity: "greater-yang", tendency: "Yang flourishing", explanation: "Expression, warmth, and outwardness reach fullness." },
      { id: "autumn", title: "Autumn", polarity: "lesser-yin", tendency: "Yin emerging", explanation: "The outward phase returns toward harvest, completion, and inwardness." }
    ]
  },
  {
    id: "breath",
    title: "Breath Cycle",
    summary: "A contemplative model: emptying, inhaling, fullness, and exhaling.",
    stages: [
      { id: "empty", title: "Resting Emptiness", polarity: "greater-yin", tendency: "Capacity", explanation: "Stillness creates room for renewed movement." },
      { id: "inhale", title: "Inhale", polarity: "lesser-yang", tendency: "Rising movement", explanation: "Expansion begins within receptive capacity." },
      { id: "full", title: "Fullness", polarity: "greater-yang", tendency: "Maximum expression", explanation: "Fullness carries the seed of release." },
      { id: "exhale", title: "Exhale", polarity: "lesser-yin", tendency: "Return", explanation: "Expansion resolves into release and rest." }
    ]
  }
];

export const fourImages: FourImage[] = [
  { id: "greater-yin", title: "Greater Yin", lineSymbol: "⚋ ⚋", daily: "Midnight", seasonal: "Winter", explanation: "Yin flourishing; the deepest inward phase, already containing the seed of yang." },
  { id: "lesser-yang", title: "Lesser Yang", lineSymbol: "⚊ ⚋", daily: "Dawn", seasonal: "Spring", explanation: "Yang emerging within a still yin-conditioned field." },
  { id: "greater-yang", title: "Greater Yang", lineSymbol: "⚊ ⚊", daily: "Noon", seasonal: "Summer", explanation: "Yang flourishing; maximum outward expression, already containing the seed of yin." },
  { id: "lesser-yin", title: "Lesser Yin", lineSymbol: "⚋ ⚊", daily: "Dusk", seasonal: "Autumn", explanation: "Yin emerging within a still yang-conditioned field." }
];

export const trigrams: Trigram[] = [
  { id: "qian", chinese: "乾", pinyin: "Qian", english: "Heaven", naturalImage: "Heaven", family: "Father", linesBottomToTop: ["yang", "yang", "yang"], earlierHeaven: "South", laterHeaven: "Northwest", reviewStatus: "review-required" },
  { id: "kun", chinese: "坤", pinyin: "Kun", english: "Earth", naturalImage: "Earth", family: "Mother", linesBottomToTop: ["yin", "yin", "yin"], earlierHeaven: "North", laterHeaven: "Southwest", reviewStatus: "review-required" },
  { id: "zhen", chinese: "震", pinyin: "Zhen", english: "Thunder", naturalImage: "Thunder", family: "Eldest son", linesBottomToTop: ["yang", "yin", "yin"], earlierHeaven: "Northeast", laterHeaven: "East", reviewStatus: "review-required" },
  { id: "xun", chinese: "巽", pinyin: "Xun", english: "Wind", naturalImage: "Wind / Wood", family: "Eldest daughter", linesBottomToTop: ["yin", "yang", "yang"], earlierHeaven: "Southwest", laterHeaven: "Southeast", reviewStatus: "review-required" },
  { id: "kan", chinese: "坎", pinyin: "Kan", english: "Water", naturalImage: "Water", family: "Middle son", linesBottomToTop: ["yin", "yang", "yin"], earlierHeaven: "West", laterHeaven: "North", reviewStatus: "review-required" },
  { id: "li", chinese: "離", pinyin: "Li", english: "Fire", naturalImage: "Fire", family: "Middle daughter", linesBottomToTop: ["yang", "yin", "yang"], earlierHeaven: "East", laterHeaven: "South", reviewStatus: "review-required" },
  { id: "gen", chinese: "艮", pinyin: "Gen", english: "Mountain", naturalImage: "Mountain", family: "Youngest son", linesBottomToTop: ["yin", "yin", "yang"], earlierHeaven: "Northwest", laterHeaven: "Northeast", reviewStatus: "review-required" },
  { id: "dui", chinese: "兌", pinyin: "Dui", english: "Lake", naturalImage: "Lake / Marsh", family: "Youngest daughter", linesBottomToTop: ["yang", "yang", "yin"], earlierHeaven: "Southeast", laterHeaven: "West", reviewStatus: "review-required" }
];

export const fivePhases: FivePhase[] = [
  { id: "wood", name: "Wood", polarityRelation: "Yang emerging", color: "#3f7d55", note: "Often read as growth, sprouting, and rising movement in this interpretive model." },
  { id: "fire", name: "Fire", polarityRelation: "Yang flourishing", color: "#a6402f", note: "A model of radiance, heat, expression, and fullness." },
  { id: "earth", name: "Earth", polarityRelation: "Center / transition", color: "#b59255", note: "A balancing or transitional center in this simplified model; mappings differ by system." },
  { id: "metal", name: "Metal", polarityRelation: "Yin emerging", color: "#c8c8b8", note: "A model of contraction, harvest, refinement, and return." },
  { id: "water", name: "Water", polarityRelation: "Yin flourishing", color: "#345d75", note: "A model of storage, depth, descent, and latent potential." }
];

export const frameworks: SourcedInterpretation[] = [
  {
    id: "early-cosmology",
    title: "Early Chinese cosmology",
    framework: "cosmological",
    historicalPeriod: "Early and classical Chinese contexts",
    confidence: "review-required",
    sourceIds: ["yijing", "review-note"],
    summary: "Presents yin and yang as relational tendencies within cycles of change rather than fixed substances.",
    editorialNotes: "Seeded for interface design; bibliography should be reviewed before public scholarly claims are expanded."
  },
  {
    id: "yijing",
    title: "Yijing-related polarity theory",
    framework: "Yijing",
    historicalPeriod: "Classical text with layered transmission",
    confidence: "review-required",
    sourceIds: ["yijing", "wilhelm"],
    summary: "Uses broken and unbroken lines to model differentiation, relation, and change through images and hexagrams.",
    editorialNotes: "Trigram data uses common received names and characters, flagged review-required."
  },
  {
    id: "song-cosmology",
    title: "Song dynasty cosmological interpretation",
    framework: "Neo-Confucian / cosmological",
    historicalPeriod: "Song dynasty and later reception",
    confidence: "review-required",
    sourceIds: ["zhou-dunyi", "review-note"],
    summary: "Frames Taiji as a cosmological principle through which polarity emerges and cycles unfold.",
    editorialNotes: "Do not collapse all Taoist, Confucian, medical, and modern systems into one map."
  },
  {
    id: "modern-comparative",
    title: "Modern comparative symbolism",
    framework: "Aetherica editorial comparison",
    confidence: "interpretive",
    sourceIds: ["review-note"],
    summary: "Compares polarity, cycles, containment, and reversal with other symbolic systems while labeling the comparison as editorial.",
    editorialNotes: "Used only as a bridge into Aetherica archive exploration, not as a historical source claim."
  }
];

export const sources: SourceRecord[] = [
  {
    id: "yijing",
    title: "Yijing / Book of Changes",
    historicalPeriod: "Classical Chinese text with layered commentarial tradition",
    sourceType: "primary text",
    designation: "Primary text",
    reviewStatus: "review-required",
    notes: "Used as a source category for line, image, trigram, and change language. Specific edition/translation should be selected before final publication."
  },
  {
    id: "zhou-dunyi",
    author: "Zhou Dunyi",
    title: "Taijitu shuo",
    historicalPeriod: "Song dynasty",
    sourceType: "historical commentary",
    designation: "Historical commentary",
    reviewStatus: "review-required",
    notes: "Relevant to later cosmological formulations of Wuji, Taiji, yin-yang, and Five Phases."
  },
  {
    id: "wilhelm",
    author: "Richard Wilhelm",
    title: "The I Ching or Book of Changes",
    translator: "Cary F. Baynes",
    sourceType: "modern scholarship",
    designation: "Modern scholarship",
    reviewStatus: "review-required",
    notes: "Influential modern translation and commentary; included as a review-required reference candidate."
  },
  {
    id: "review-note",
    title: "Aetherica editorial synthesis",
    sourceType: "editorial synthesis",
    designation: "Aetherica editorial synthesis",
    reviewStatus: "review-required",
    notes: "Interface wording is cautious and should remain transparent when comparing systems or summarizing disputed correspondences."
  }
];

export const faqs = [
  {
    question: "Are yin and yang the same as good and evil?",
    answer: "No. This instrument presents yin and yang as relational tendencies within a process, not moral opposites."
  },
  {
    question: "Why do the dots appear inside the opposite field?",
    answer: "They show mutual containment: the seed of reversal is already present at fullness."
  },
  {
    question: "Are the Five Phases mappings universal?",
    answer: "No. The Five Phases section labels one simplified interpretive model and notes that medical, cosmological, historical, and modern systems can differ."
  },
  {
    question: "Why are some sources marked review-required?",
    answer: "The tool is designed to avoid pretending that preliminary source records are final citations. Review-required labels keep the scholarly status visible."
  }
];
