import { organClockPeriods, organPhaseLabels, type OrganClockPeriodId, type OrganPhaseId } from "@/lib/data/organ-clock";

export type ReviewStatus = "verified" | "provisional" | "review-required";
export type Confidence = "widely-attested" | "received-tradition" | "framework-specific" | "modern-interpretive" | "review-required";

export interface TaoistSource {
  id: string;
  title: string;
  type: string;
  note: string;
  status: ReviewStatus;
}

export interface TaoistFramework {
  id: string;
  title: string;
  period: string;
  tradition: string;
  summary: string;
  caution: string;
  sourceIds: string[];
  status: ReviewStatus;
}

export interface AlchemyConcept {
  id: string;
  chineseTraditional: string;
  chineseSimplified?: string;
  pinyin: string;
  englishName: string;
  category: "treasure" | "stage" | "symbol" | "center" | "kan-li";
  summary: string;
  caution?: string;
  frameworkIds: string[];
  sourceIds: string[];
  status: ReviewStatus;
}

export interface OrbitRegion {
  id: string;
  englishName: string;
  chineseTraditional?: string;
  chineseSimplified?: string;
  pinyin?: string;
  route: "du-mai" | "ren-mai" | "transition" | "dantian";
  approximateRegion: string;
  role: string;
  caution: string;
  x: number;
  y: number;
  sourceIds: string[];
  status: ReviewStatus;
}

export interface TaoistEntity {
  id: string;
  type: string;
  englishName: string;
  chineseTraditional?: string;
  chineseSimplified?: string;
  pinyin?: string;
  summary: string;
  frameworkIds: string[];
  sourceIds: string[];
  reviewStatus: ReviewStatus;
}

export interface TaoistCorrespondence {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  category: string;
  frameworkId: string;
  sourceIds: string[];
  confidence: Confidence;
  medical?: boolean;
  editorialNotes?: string;
}

export interface TaoistSymbol {
  id: string;
  title: string;
  chineseTraditional?: string;
  chineseSimplified?: string;
  pinyin?: string;
  categoryIds: string[];
  description: string;
  historicalPeriod?: string;
  traditionIds: string[];
  visualType: "unicode" | "svg" | "licensed-image" | "public-domain-image" | "diagram";
  symbol: string;
  sourceIds: string[];
  relatedEntityIds: string[];
  reviewStatus: ReviewStatus | "provisional";
  copyrightStatus: "original" | "public-domain" | "licensed" | "citation-only" | "unknown";
}

export const taoistSources: TaoistSource[] = [
  { id: "neidan-review", title: "Neidan terminology review file", type: "Editorial review required", note: "Internal-alchemy terminology varies by text and lineage; this dataset is educational and provisional.", status: "review-required" },
  { id: "orbit-review", title: "Microcosmic Orbit teaching-model review file", type: "Editorial review required", note: "Point names, regions, and pathways must be checked against the selected textual or teaching framework.", status: "review-required" },
  { id: "tcm-received", title: "Received traditional Chinese medical correspondence models", type: "Chinese medical framework", note: "Used for phase, organ-system, emotion, taste, and channel correspondences as traditional theory, not diagnosis.", status: "review-required" },
  { id: "yijing-received", title: "Received Yijing and Bagua correspondence traditions", type: "Received tradition", note: "Used for trigram, Kan-Li, and polarity references; arrangements and interpretations vary.", status: "review-required" },
  { id: "benebell-lesser-mandala", title: "Benebell Wen: A Taoist Secret to Cultivating Personal Power", type: "External Taoist reference", note: "Used to align Xiao Zhou Tian / Lesser Mandala language, the Du and Ren meridian route description, Three Treasures, and dantian framing.", status: "verified" },
  { id: "benebell-greater-mandala", title: "Benebell Wen: Advanced Introduction to Taoist Alchemy", type: "External Taoist reference", note: "Used to distinguish Lesser Mandala as foundational process from Greater Mandala as an advanced alchemical attainment model.", status: "verified" },
  { id: "benebell-hun-po", title: "Benebell Wen: Soul Dualism in Eastern Mysticism", type: "External Taoist reference", note: "Used for Hun-Po wording where the Aetherica subtle-body and Taoist instruments reference Eastern soul dualism.", status: "verified" },
  {
    id: "reference-image-policy",
    title: "Reference Image Use Policy",
    type: "Editorial design rule",
    note: "Reference images may guide material, lighting, composition, historical atmosphere, and visual hierarchy only. They are not sources for Chinese characters, body pathways, talismans, trigrams, internal-alchemy charts, or correspondences unless independently verified in structured source-linked data.",
    status: "review-required"
  },
  {
    id: "symbol-provenance",
    title: "Aetherica symbol provenance register",
    type: "Provenance register",
    note: "Symbols are original SVG/text renderings or Unicode references unless otherwise stated. AI-generated decorative marks must never be presented as historical Taoist forms. Talismanic material remains disabled pending provenance, orientation, translation, context, and permissions review.",
    status: "review-required"
  }
];

export const taoistFrameworks: TaoistFramework[] = [
  { id: "neidan-general", title: "General Neidan Study Lens", period: "Cross-lineage educational synthesis", tradition: "Daoist internal alchemy", summary: "A cautious comparative framework for studying jing, qi, shen, dantian, refinement, reversal, return, and Mandala of Heaven language.", caution: "Not a practice manual. Lineage-specific instruction is intentionally excluded.", sourceIds: ["neidan-review", "benebell-lesser-mandala", "benebell-greater-mandala"], status: "review-required" },
  { id: "modern-qigong", title: "Modern Qigong Teaching Model", period: "Modern reception", tradition: "Modern cultivation pedagogy", summary: "Uses simplified diagrams of attention, breath, and circulation imagery, including Xiao Zhou Tian / Lesser Mandala presentations, for educational comparison.", caution: "Animated pathways are diagrams, not direct displays of qi, clinical meridian routes, or medical effects.", sourceIds: ["orbit-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "chinese-medical", title: "Traditional Chinese Medical Theory", period: "Received medical framework", tradition: "Chinese medicine", summary: "Organ systems, channels, phases, senses, emotions, and daily periods are presented as traditional categories.", caution: "No diagnosis, treatment plan, or point-location guidance is provided.", sourceIds: ["tcm-received"], status: "review-required" },
  { id: "yijing-cosmology", title: "Yijing-related Cosmology", period: "Classical and later reception", tradition: "Yijing / correlative cosmology", summary: "Frames polarity, Kan and Li, trigrams, and phase relationships as study correspondences.", caution: "Do not flatten all Yijing, Daoist, medical, and ritual systems into one universal map.", sourceIds: ["yijing-received"], status: "review-required" }
];

export const alchemyConcepts: AlchemyConcept[] = [
  { id: "jing", chineseTraditional: "精", pinyin: "Jīng", englishName: "Essence", category: "treasure", summary: "A key term often translated as essence, one of the Three Treasures / Triple Treasure. Its meaning varies across medical, cosmological, and internal-alchemical contexts.", caution: "Do not reduce jing to a single biomedical substance.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "qi", chineseTraditional: "氣", chineseSimplified: "气", pinyin: "Qì", englishName: "Qi / Breath-Energy", category: "treasure", summary: "A multivalent term for breath, vitality, process, and energetic movement, one of the Three Treasures / Triple Treasure.", caution: "Presented as traditional terminology, not as a measurable clinical claim.", frameworkIds: ["neidan-general", "chinese-medical"], sourceIds: ["neidan-review", "tcm-received", "benebell-lesser-mandala"], status: "review-required" },
  { id: "shen", chineseTraditional: "神", pinyin: "Shén", englishName: "Spirit", category: "treasure", summary: "Spirit, numinous presence, or clarity of awareness; one of the Three Treasures / Triple Treasure in selected internal-alchemical and medical frameworks.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "xu", chineseTraditional: "虛", chineseSimplified: "虚", pinyin: "Xū", englishName: "Emptiness", category: "stage", summary: "Emptiness or openness; not a single final state and not a claim of guaranteed attainment.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review"], status: "review-required" },
  { id: "return", chineseTraditional: "返", pinyin: "Fǎn", englishName: "Return", category: "stage", summary: "Reversal or return language appears in many Daoist contexts, but practical meanings vary substantially.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review"], status: "review-required" },
  { id: "lower-dantian", chineseTraditional: "下丹田", pinyin: "Xià Dāntián", englishName: "Lower Dantian", category: "center", summary: "Often described as the lower inner field in cultivation diagrams. Exact location and role vary by system.", frameworkIds: ["neidan-general", "modern-qigong"], sourceIds: ["neidan-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "middle-dantian", chineseTraditional: "中丹田", pinyin: "Zhōng Dāntián", englishName: "Middle Dantian", category: "center", summary: "Often associated with the central or chest inner field in later pedagogical models; framework-specific.", frameworkIds: ["neidan-general", "modern-qigong"], sourceIds: ["neidan-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "upper-dantian", chineseTraditional: "上丹田", pinyin: "Shàng Dāntián", englishName: "Upper Dantian", category: "center", summary: "Often associated with the upper inner field of the head or clarity in modern teaching models; not a biomedical organ.", frameworkIds: ["neidan-general", "modern-qigong"], sourceIds: ["neidan-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "furnace", chineseTraditional: "爐", chineseSimplified: "炉", pinyin: "Lú", englishName: "Furnace", category: "symbol", summary: "Symbolic alchemical imagery for transformation. Placement and meaning vary across texts.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review"], status: "review-required" },
  { id: "cauldron", chineseTraditional: "鼎", pinyin: "Dǐng", englishName: "Cauldron", category: "symbol", summary: "A symbolic vessel of refinement, coagulation, and elixir imagery in selected internal-alchemy contexts.", frameworkIds: ["neidan-general"], sourceIds: ["neidan-review"], status: "review-required" },
  { id: "kan", chineseTraditional: "坎", pinyin: "Kǎn", englishName: "Kan / Water", category: "kan-li", summary: "The Water trigram ☵. Internal-alchemy readings of Kan and Li are symbolic and framework-specific.", frameworkIds: ["yijing-cosmology", "neidan-general"], sourceIds: ["yijing-received", "neidan-review"], status: "review-required" },
  { id: "li", chineseTraditional: "離", chineseSimplified: "离", pinyin: "Lí", englishName: "Li / Fire", category: "kan-li", summary: "The Fire trigram ☲. Exchange or reversal imagery should not be turned into a universal practice method.", frameworkIds: ["yijing-cosmology", "neidan-general"], sourceIds: ["yijing-received", "neidan-review"], status: "review-required" }
];

export const refinementStages = [
  { id: "gathering", title: "Gathering", summary: "A high-level study label for collecting attention or material in symbolic alchemical language." },
  { id: "refinement", title: "Refinement", summary: "Symbolic transformation and clarification; not a physiological forcing instruction." },
  { id: "circulation", title: "Circulation", summary: "Movement or circulation imagery in selected models; not a claim of measurable flow." },
  { id: "integration", title: "Integration", summary: "Stabilization and integration language varies by text and lineage." },
  { id: "return", title: "Return", summary: "Return to source, simplicity, or non-differentiation in a symbolic study lens." }
];

export const orbitRegions: OrbitRegion[] = [
  { id: "lower-dantian", englishName: "Lower Dantian", chineseTraditional: "下丹田", pinyin: "Xià Dāntián", route: "dantian", approximateRegion: "Lower abdomen", role: "Foundation or storage center in many modern teaching models of Xiao Zhou Tian / Lesser Mandala.", caution: "Approximate region only; not a biomedical structure.", x: 50, y: 70, sourceIds: ["orbit-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "perineal-transition", englishName: "Perineal transition", chineseTraditional: "會陰", chineseSimplified: "会阴", pinyin: "Huìyīn", route: "transition", approximateRegion: "Lower pelvic base", role: "Transition point in many orbit diagrams.", caution: "No pressure, retention, or physical manipulation instructions are provided.", x: 50, y: 84, sourceIds: ["orbit-review"], status: "review-required" },
  { id: "spinal-ascent", englishName: "Du Mai / Governing Vessel ascent", chineseTraditional: "督脈", chineseSimplified: "督脉", pinyin: "Dū Mài", route: "du-mai", approximateRegion: "Back midline / spine region", role: "Diagrammatic ascent on the spinal Du side of the Lesser Mandala loop.", caution: "Stylized pathway only; not clinical point location.", x: 33, y: 45, sourceIds: ["orbit-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "head-passage", englishName: "Head passage", pinyin: "Crown / head region", route: "du-mai", approximateRegion: "Head and crown region", role: "Upper transition in common Xiao Zhou Tian / Lesser Mandala diagrams.", caution: "Not a claim of anatomical passage or detected qi.", x: 50, y: 17, sourceIds: ["orbit-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "front-descent", englishName: "Ren Mai / Conception Vessel descent", chineseTraditional: "任脈", chineseSimplified: "任脉", pinyin: "Rèn Mài", route: "ren-mai", approximateRegion: "Front midline / chest and abdomen", role: "Diagrammatic descent on the frontal Ren side of the Lesser Mandala loop.", caution: "Educational route, not individualized qigong instruction.", x: 67, y: 45, sourceIds: ["orbit-review", "benebell-lesser-mandala"], status: "review-required" },
  { id: "heart-region", englishName: "Heart / chest region", chineseTraditional: "心", pinyin: "Xīn", route: "ren-mai", approximateRegion: "Chest region", role: "Often used as a symbolic region in attention and breath discussions.", caution: "No medical meaning is inferred from sensations or observations.", x: 50, y: 42, sourceIds: ["orbit-review"], status: "review-required" }
];

export const taoistEntities: TaoistEntity[] = [
  { id: "wood", type: "Five Phase", englishName: "Wood", chineseTraditional: "木", pinyin: "Mù", summary: "Growth, spring, east, wind, and related medical correspondences in selected frameworks.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "fire", type: "Five Phase", englishName: "Fire", chineseTraditional: "火", pinyin: "Huǒ", summary: "Radiance, summer, south, heat, and Fire organ-system pairings.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "earth", type: "Five Phase", englishName: "Earth", chineseTraditional: "土", pinyin: "Tǔ", summary: "Centering, transformation, late-summer or transitional models, and nourishment.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "metal", type: "Five Phase", englishName: "Metal", chineseTraditional: "金", pinyin: "Jīn", summary: "Refinement, autumn, west, dryness, and Lung/Large Intestine correspondences.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "water", type: "Five Phase", englishName: "Water", chineseTraditional: "水", pinyin: "Shuǐ", summary: "Depth, winter, north, cold, and Kidney/Bladder correspondences.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  ...organClockPeriods.map((period): TaoistEntity => ({
    id: period.id,
    type: "Organ-meridian system",
    englishName: period.englishName,
    chineseTraditional: period.chineseName,
    chineseSimplified: period.simplifiedChineseName,
    pinyin: period.pinyin,
    summary: `${period.englishName} as a traditional organ-meridian category. ${period.caution}`,
    frameworkIds: period.frameworkIds,
    sourceIds: period.sourceIds,
    reviewStatus: period.reviewStatus
  })),
  { id: "spring", type: "Season", englishName: "Spring", summary: "Seasonal correspondence commonly linked with Wood in selected Chinese medical models.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "east", type: "Direction", englishName: "East", summary: "Directional correspondence commonly linked with Wood in selected frameworks.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" },
  { id: "green", type: "Color", englishName: "Green / blue-green", summary: "Color correspondence for Wood varies in translation and framework.", frameworkIds: ["chinese-medical"], sourceIds: ["tcm-received"], reviewStatus: "review-required" }
];

export const taoistCorrespondences: TaoistCorrespondence[] = [
  { id: "wood-spring", sourceEntityId: "wood", targetEntityId: "spring", relationshipType: "season", category: "Season", frameworkId: "chinese-medical", sourceIds: ["tcm-received"], confidence: "received-tradition" },
  { id: "wood-east", sourceEntityId: "wood", targetEntityId: "east", relationshipType: "direction", category: "Direction", frameworkId: "chinese-medical", sourceIds: ["tcm-received"], confidence: "received-tradition" },
  { id: "wood-green", sourceEntityId: "wood", targetEntityId: "green", relationshipType: "color", category: "Color", frameworkId: "chinese-medical", sourceIds: ["tcm-received"], confidence: "framework-specific" },
  ...organClockPeriods.flatMap((period) => [
    { id: `${period.phaseId}-${period.id}`, sourceEntityId: period.phaseId, targetEntityId: period.id, relationshipType: "organ-system", category: "Organ system", frameworkId: "chinese-medical", sourceIds: period.sourceIds, confidence: "received-tradition" as Confidence, medical: true },
    { id: `${period.id}-pair`, sourceEntityId: period.id, targetEntityId: period.pairedPeriodId, relationshipType: "paired-channel", category: "Paired organ system", frameworkId: "chinese-medical", sourceIds: period.sourceIds, confidence: "received-tradition" as Confidence, medical: true }
  ])
];

export const taoistSymbols: TaoistSymbol[] = [
  { id: "taijitu", title: "Taijitu", chineseTraditional: "太極圖", chineseSimplified: "太极图", pinyin: "Tàijí Tú", categoryIds: ["polarity", "cosmology"], description: "Diagram of dynamic polarity. Many historical forms exist; this entry uses a modern schematic reference.", historicalPeriod: "Later diagrammatic traditions and modern reception", traditionIds: ["yijing-cosmology"], visualType: "unicode", symbol: "☯", sourceIds: ["symbol-provenance"], relatedEntityIds: ["yin-yang"], reviewStatus: "review-required", copyrightStatus: "original" },
  { id: "qian", title: "Qian Trigram", chineseTraditional: "乾", pinyin: "Qián", categoryIds: ["bagua", "trigram"], description: "Heaven trigram: three yang lines.", traditionIds: ["yijing-cosmology"], visualType: "unicode", symbol: "☰", sourceIds: ["yijing-received"], relatedEntityIds: ["bagua"], reviewStatus: "review-required", copyrightStatus: "public-domain" },
  { id: "kan", title: "Kan Trigram", chineseTraditional: "坎", pinyin: "Kǎn", categoryIds: ["bagua", "kan-li"], description: "Water trigram: yang line between two yin lines.", traditionIds: ["yijing-cosmology", "neidan-general"], visualType: "unicode", symbol: "☵", sourceIds: ["yijing-received"], relatedEntityIds: ["kan"], reviewStatus: "review-required", copyrightStatus: "public-domain" },
  { id: "li", title: "Li Trigram", chineseTraditional: "離", chineseSimplified: "离", pinyin: "Lí", categoryIds: ["bagua", "kan-li"], description: "Fire trigram: yin line between two yang lines.", traditionIds: ["yijing-cosmology", "neidan-general"], visualType: "unicode", symbol: "☲", sourceIds: ["yijing-received"], relatedEntityIds: ["li"], reviewStatus: "review-required", copyrightStatus: "public-domain" },
  { id: "hetu", title: "He Tu", chineseTraditional: "河圖", chineseSimplified: "河图", pinyin: "Hé Tú", categoryIds: ["number-diagram"], description: "River Diagram number-pair structure; provenance and interpretations vary by received tradition.", traditionIds: ["yijing-cosmology"], visualType: "diagram", symbol: "1·6 / 2·7 / 3·8 / 4·9 / 5·10", sourceIds: ["symbol-provenance"], relatedEntityIds: ["he-tu"], reviewStatus: "review-required", copyrightStatus: "original" },
  { id: "luoshu", title: "Luo Shu", chineseTraditional: "洛書", chineseSimplified: "洛书", pinyin: "Luò Shū", categoryIds: ["number-diagram"], description: "Luo River Writing, commonly represented by the 3x3 magic square 4-9-2 / 3-5-7 / 8-1-6.", traditionIds: ["yijing-cosmology"], visualType: "diagram", symbol: "4 9 2 / 3 5 7 / 8 1 6", sourceIds: ["symbol-provenance"], relatedEntityIds: ["luo-shu"], reviewStatus: "review-required", copyrightStatus: "original" },
  { id: "talismanic-review", title: "Talismanic Structures", categoryIds: ["editorial-review"], description: "Disabled category. No talismanic material is displayed until provenance, orientation, characters, translation, context, and permissions are reviewed.", traditionIds: ["daoist-ritual"], visualType: "diagram", symbol: "Editorial review only", sourceIds: ["symbol-provenance"], relatedEntityIds: [], reviewStatus: "review-required", copyrightStatus: "unknown" }
];

export function entityById(id: string) {
  return taoistEntities.find((entity) => entity.id === id) ?? taoistEntities[0];
}

export function symbolById(id: string) {
  return taoistSymbols.find((symbol) => symbol.id === id) ?? taoistSymbols[0];
}

export function conceptById(id: string) {
  return alchemyConcepts.find((concept) => concept.id === id) ?? alchemyConcepts[0];
}

export function channelEntity(id: OrganClockPeriodId) {
  return organClockPeriods.find((period) => period.id === id) ?? organClockPeriods[0];
}

export { organClockPeriods, organPhaseLabels };
export type { OrganClockPeriodId, OrganPhaseId };
