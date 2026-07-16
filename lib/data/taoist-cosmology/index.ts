export type CosmologyLayerId =
  | "dao"
  | "wuji"
  | "taiji"
  | "yin-yang"
  | "four-images"
  | "five-phases"
  | "eight-trigrams"
  | "heaven-earth-humanity"
  | "ten-thousand-things";

export type CosmologyMode = "unfolding" | "return" | "layers" | "frameworks" | "microcosm" | "archive" | "textual";
export type ReviewStatus = "verified" | "review-required";

export interface CosmologyLayer {
  id: CosmologyLayerId;
  chinese?: string;
  pinyin?: string;
  englishName: string;
  shortName: string;
  summary: string;
  visualNote: string;
  relatedSystems: string[];
  relatedHref?: string;
  frameworkIds: string[];
  sourceIds: string[];
  reviewStatus: ReviewStatus;
}

export interface CosmologyFramework {
  id: string;
  title: string;
  period: string;
  tradition: string;
  summary: string;
  caution: string;
  sourceIds: string[];
  reviewStatus: ReviewStatus;
}

export const cosmologySequence: CosmologyLayerId[] = [
  "dao",
  "wuji",
  "taiji",
  "yin-yang",
  "four-images",
  "five-phases",
  "eight-trigrams",
  "heaven-earth-humanity",
  "ten-thousand-things"
];

export const cosmologyLayers: CosmologyLayer[] = [
  {
    id: "dao",
    chinese: "道",
    pinyin: "Dào",
    englishName: "Dao",
    shortName: "Dao",
    summary: "The Way: the underlying course, source, and patterning of change. This map does not treat Dao as a fixed object, deity-image, or literal location.",
    visualNote: "Open field with minimal marks.",
    relatedSystems: ["source-course", "non-objectifying language", "return"],
    frameworkIds: ["aetherica-study-model", "daoist-classical"],
    sourceIds: ["daodejing", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "wuji",
    chinese: "無極",
    pinyin: "Wújí",
    englishName: "Non-polarity / Non-differentiation",
    shortName: "Wuji",
    summary: "A later cosmological term for non-polarity or non-differentiation. It should not be reduced to simple nothingness.",
    visualNote: "Empty circle and barely perceptible potential.",
    relatedSystems: ["non-differentiation", "pre-polarity"],
    frameworkIds: ["song-taiji", "aetherica-study-model"],
    sourceIds: ["song-taiji", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "taiji",
    chinese: "太極",
    pinyin: "Tàijí",
    englishName: "Great Polarity",
    shortName: "Taiji",
    summary: "The emergence of dynamic polarity: an undivided field beginning to articulate movement, relation, and differentiation.",
    visualNote: "A boundary begins to form around a moving center.",
    relatedSystems: ["polarity", "movement", "cosmological articulation"],
    frameworkIds: ["song-taiji", "aetherica-study-model"],
    sourceIds: ["song-taiji", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "yin-yang",
    chinese: "陰陽",
    pinyin: "Yīn Yáng",
    englishName: "Yin and Yang",
    shortName: "Yin / Yang",
    summary: "Mutually defining polarities: waxing and waning, containment and reversal, dark and bright, receptive and active.",
    visualNote: "Central polarity with seeds of each within the other.",
    relatedSystems: ["Taijitu", "daily cycle", "seasonal cycle"],
    relatedHref: "/resources/taijitu-polarity",
    frameworkIds: ["daoist-classical", "chinese-medical", "aetherica-study-model"],
    sourceIds: ["yijing-appended", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "four-images",
    chinese: "四象",
    pinyin: "Sì Xiàng",
    englishName: "Four Images",
    shortName: "Four Images",
    summary: "A fourfold articulation of polarity: Greater Yin, Lesser Yang, Greater Yang, and Lesser Yin.",
    visualNote: "Four two-line figures arranged as a transitional ring.",
    relatedSystems: ["two-line structures", "daily cycle", "seasonal cycle"],
    relatedHref: "/resources/taijitu-polarity?mode=cycle",
    frameworkIds: ["yijing-related", "aetherica-study-model"],
    sourceIds: ["yijing-appended", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "five-phases",
    chinese: "五行",
    pinyin: "Wǔ Xíng",
    englishName: "Five Phases",
    shortName: "Five Phases",
    summary: "Wood, Fire, Earth, Metal, and Water as phases, movements, or processual qualities rather than inert elements.",
    visualNote: "Five markers with generating and controlling cycle options.",
    relatedSystems: ["generating cycle", "controlling cycle", "seasonal models"],
    relatedHref: "/resources/five-phases",
    frameworkIds: ["chinese-medical", "aetherica-study-model"],
    sourceIds: ["huangdi-neijing", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "eight-trigrams",
    chinese: "八卦",
    pinyin: "Bāguà",
    englishName: "Eight Trigrams",
    shortName: "Eight Trigrams",
    summary: "Eight three-line figures formed from yin and yang lines, used in Yijing, cosmological, directional, and correlative systems.",
    visualNote: "Bronze trigram ring with arrangement links.",
    relatedSystems: ["Earlier Heaven", "Later Heaven", "line construction"],
    relatedHref: "/resources/bagua",
    frameworkIds: ["yijing-related", "aetherica-study-model"],
    sourceIds: ["shuogua", "review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "heaven-earth-humanity",
    chinese: "天地人",
    pinyin: "Tiān Dì Rén",
    englishName: "Heaven, Earth, and Humanity",
    shortName: "Three Powers",
    summary: "A cosmological triad in which humanity participates between Heaven and Earth, rather than merely receiving influence passively.",
    visualNote: "Three aligned fields linking macrocosm and microcosm.",
    relatedSystems: ["Three Powers", "ritual alignment", "human participation"],
    frameworkIds: ["confucian-daoist-correlative", "aetherica-study-model"],
    sourceIds: ["review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "ten-thousand-things",
    chinese: "萬物",
    pinyin: "Wànwù",
    englishName: "The Ten Thousand Things",
    shortName: "Multiplicity",
    summary: "An idiom for manifested multiplicity: seasons, bodies, landscapes, emotions, sounds, colors, relations, and events.",
    visualNote: "Outer ring of differentiated phenomena.",
    relatedSystems: ["manifestation", "multiplicity", "return"],
    frameworkIds: ["daoist-classical", "aetherica-study-model"],
    sourceIds: ["daodejing", "review-note"],
    reviewStatus: "review-required"
  }
];

export const cosmologyFrameworks: CosmologyFramework[] = [
  {
    id: "aetherica-study-model",
    title: "Aetherica Study Model",
    period: "Contemporary editorial synthesis",
    tradition: "Comparative education",
    summary: "A carefully labeled educational sequence connecting non-differentiation, polarity, phase, trigram pattern, and manifest multiplicity.",
    caution: "This is a study map, not a single universally accepted Taoist creation doctrine.",
    sourceIds: ["review-note"],
    reviewStatus: "review-required"
  },
  {
    id: "song-taiji",
    title: "Song-period Taiji Cosmology",
    period: "Song dynasty and later reception",
    tradition: "Neo-Confucian / correlative cosmology",
    summary: "Emphasizes Wuji, Taiji, yin-yang, and patterned differentiation in later cosmological diagrams and commentarial traditions.",
    caution: "Terminology and sequence vary across authors and schools.",
    sourceIds: ["song-taiji"],
    reviewStatus: "review-required"
  },
  {
    id: "chinese-medical",
    title: "Chinese Medical Cosmology",
    period: "Received medical and correlative frameworks",
    tradition: "Traditional Chinese medical theory",
    summary: "Uses yin-yang and Five Phase models as traditional medical-cosmological categories.",
    caution: "Traditional medical categories do not map directly onto modern biomedical anatomy.",
    sourceIds: ["huangdi-neijing"],
    reviewStatus: "review-required"
  }
];

export const cosmologySources = [
  { id: "daodejing", title: "Daodejing", type: "Classical source", note: "Used for Dao, return, and ten-thousand-things language. Translation choices require review." },
  { id: "yijing-appended", title: "Yijing Appended Statements and received commentarial traditions", type: "Classical/commentarial source", note: "Used for polarity and image language in received Yijing contexts." },
  { id: "shuogua", title: "Shuo Gua / Discussion of the Trigrams", type: "Traditional commentary", note: "Used for trigram images and correspondences." },
  { id: "huangdi-neijing", title: "Huangdi Neijing and later medical reception", type: "Chinese medical framework", note: "Used only as traditional medical theory, not modern biomedical proof." },
  { id: "song-taiji", title: "Song-period Taiji diagram traditions", type: "Later synthesis", note: "Requires bibliography expansion and specialist review." },
  { id: "review-note", title: "Aetherica editorial review note", type: "Review required", note: "Chinese terminology, sequence claims, and framework descriptions should receive scholarly review before being treated as final." }
];

export const cosmologyFaqs = [
  {
    question: "Is this one universal Taoist creation doctrine?",
    answer: "No. The map is an educational model. Chinese philosophical, Daoist, Yijing, medical, and Neo-Confucian traditions organize these relationships differently."
  },
  {
    question: "Are Wuji and Dao the same thing?",
    answer: "They are not treated as interchangeable here. Dao names the Way or source-course of change; Wuji is presented as non-polarity or non-differentiation within selected later frameworks."
  },
  {
    question: "Why link to other instruments?",
    answer: "The map is a hub. Yin-yang opens into the Taijitu tool, Five Phases into the Wu Xing tool, and Eight Trigrams into the Bagua instrument."
  }
];

export function cosmologyLayerById(id: CosmologyLayerId) {
  return cosmologyLayers.find((layer) => layer.id === id) ?? cosmologyLayers[0];
}
