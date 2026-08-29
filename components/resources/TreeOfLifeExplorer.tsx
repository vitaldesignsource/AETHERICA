"use client";

import Link from "next/link";
import Image from "next/image";
import { Network, ScrollText } from "lucide-react";
import { useState } from "react";
import type { Episode } from "@/lib/data/types";
import { hermeticTreePositions } from "@/lib/data/hermeticTreeGeometry";

type TreeNode = {
  id: string;
  kind: "sephirah" | "path";
  number: string;
  name: string;
  hebrew: string;
  transliteration: string;
  translation: string;
  divineName: string;
  divineNameHebrew?: string;
  archangel: string;
  archangelHebrew?: string;
  angelicOrder: string;
  planetary: string;
  symbols: string[];
  functionText?: string;
  relatedTexts: string[];
  keywords: string[];
  note: string;
  colors: {
    system: string;
    scale: string;
    colors: string[];
  }[];
  source?: string;
  target?: string;
  tarot?: string;
  tarotImage?: string;
};

const sephiroth: TreeNode[] = [
  {
    id: "kether",
    kind: "sephirah",
    number: "1",
    name: "Kether",
    hebrew: "כתר",
    transliteration: "Keter",
    translation: "Crown",
    divineName: "Ehyeh",
    divineNameHebrew: "אהיה",
    archangel: "Metatron",
    archangelHebrew: "מטטרון",
    angelicOrder: "Chayoth ha-Qadesh",
    planetary: "Primum Mobile / the Crown beyond the planets",
    symbols: ["Crown", "Point", "Ancient of Days", "White brilliance"],
    relatedTexts: ["Sefer Yetzirah", "Zohar", "The Mystical Qabalah"],
    keywords: ["unity", "crown", "source", "emanation"],
    note: "Kether names the first point of manifestation: the crown, source, and concealed beginning of the Tree.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Brilliance"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["White brilliance"] }
    ]
  },
  {
    id: "chokmah",
    kind: "sephirah",
    number: "2",
    name: "Chokmah",
    hebrew: "חכמה",
    transliteration: "Chokhmah",
    translation: "Wisdom",
    divineName: "Yah",
    divineNameHebrew: "יה",
    archangel: "Raziel",
    archangelHebrew: "רזיאל",
    angelicOrder: "Auphanim",
    planetary: "Zodiac / fixed stars",
    symbols: ["Phallus", "Line", "Father", "Starry wisdom"],
    relatedTexts: ["Sefer Yetzirah", "Zohar", "Liber 777"],
    keywords: ["wisdom", "zodiac", "father", "creative force"],
    note: "Chokmah is the dynamic flash of wisdom and creative potency prior to formal limitation.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Pure soft blue"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Grey"] }
    ]
  },
  {
    id: "binah",
    kind: "sephirah",
    number: "3",
    name: "Binah",
    hebrew: "בינה",
    transliteration: "Binah",
    translation: "Understanding",
    divineName: "YHVH Elohim",
    divineNameHebrew: "יהוה אלהים",
    archangel: "Tzaphkiel",
    archangelHebrew: "צפקיאל",
    angelicOrder: "Aralim",
    planetary: "Saturn",
    symbols: ["Womb", "Throne", "Great Sea", "Mother"],
    relatedTexts: ["Sefer Yetzirah", "Zohar", "The Mystical Qabalah"],
    keywords: ["understanding", "saturn", "form", "mother", "limitation"],
    note: "Binah gives form, depth, maturity, and the first great matrix of understanding.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Crimson"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Black"] }
    ]
  },
  {
    id: "chesed",
    kind: "sephirah",
    number: "4",
    name: "Chesed",
    hebrew: "חסד",
    transliteration: "Chesed",
    translation: "Mercy",
    divineName: "El",
    divineNameHebrew: "אל",
    archangel: "Tzadkiel",
    archangelHebrew: "צדקיאל",
    angelicOrder: "Chasmalim",
    planetary: "Jupiter",
    symbols: ["Scepter", "Orb", "King", "Temple ruler"],
    relatedTexts: ["Sefer Yetzirah", "Liber 777", "The Mystical Qabalah"],
    keywords: ["mercy", "jupiter", "order", "expansion", "law"],
    note: "Chesed expresses ordered benevolence, blessing, generosity, and rightful expansion.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Deep violet"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Blue"] }
    ]
  },
  {
    id: "gevurah",
    kind: "sephirah",
    number: "5",
    name: "Gevurah",
    hebrew: "גבורה",
    transliteration: "Gevurah",
    translation: "Severity / Strength",
    divineName: "Elohim Gibor",
    divineNameHebrew: "אלהים גבור",
    archangel: "Kamael",
    archangelHebrew: "כמאל",
    angelicOrder: "Seraphim",
    planetary: "Mars",
    symbols: ["Sword", "Spear", "Scourge", "Pentagon"],
    relatedTexts: ["Sefer Yetzirah", "Liber 777", "The Mystical Qabalah"],
    keywords: ["severity", "mars", "strength", "judgment", "fire"],
    note: "Gevurah is force under judgment: discipline, severance, protection, and purifying intensity.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Orange"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Scarlet red"] }
    ]
  },
  {
    id: "tiphareth",
    kind: "sephirah",
    number: "6",
    name: "Tiphareth",
    hebrew: "תפארת",
    transliteration: "Tiferet",
    translation: "Beauty",
    divineName: "YHVH Eloah ve-Daath",
    divineNameHebrew: "יהוה אלוה ודעת",
    archangel: "Raphael",
    archangelHebrew: "רפאל",
    angelicOrder: "Malakim",
    planetary: "Sun",
    symbols: ["Solar cross", "Rose cross", "Child", "Sacrificed god"],
    relatedTexts: ["Zohar", "The Mystical Qabalah", "Liber 777"],
    keywords: ["beauty", "sun", "heart", "harmony", "theurgy"],
    note: "Tiphareth is the solar heart of the Tree, joining beauty, sacrifice, balance, and spiritual identity.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Clear rose pink"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Yellow / gold"] }
    ]
  },
  {
    id: "netzach",
    kind: "sephirah",
    number: "7",
    name: "Netzach",
    hebrew: "נצח",
    transliteration: "Netzach",
    translation: "Victory / Eternity",
    divineName: "YHVH Tzabaoth",
    divineNameHebrew: "יהוה צבאות",
    archangel: "Haniel",
    archangelHebrew: "הניאל",
    angelicOrder: "Elohim",
    planetary: "Venus",
    symbols: ["Rose", "Girdle", "Lamp", "Dove"],
    relatedTexts: ["The Mystical Qabalah", "Liber 777", "Zohar"],
    keywords: ["venus", "beauty", "desire", "art", "emotion", "netzech"],
    note: "Netzach is the sphere of desire, attraction, aesthetic force, imagination, and living inspiration.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Amber"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Emerald green"] }
    ]
  },
  {
    id: "hod",
    kind: "sephirah",
    number: "8",
    name: "Hod",
    hebrew: "הוד",
    transliteration: "Hod",
    translation: "Splendor",
    divineName: "Elohim Tzabaoth",
    divineNameHebrew: "אלהים צבאות",
    archangel: "Michael",
    archangelHebrew: "מיכאל",
    angelicOrder: "Bene Elohim",
    planetary: "Mercury",
    symbols: ["Names", "Books", "Apron", "Hermetic forms"],
    relatedTexts: ["Sefer Yetzirah", "Liber 777", "The Mystical Qabalah"],
    keywords: ["mercury", "language", "splendor", "ritual", "symbol"],
    note: "Hod orders experience through language, symbols, analysis, ritual form, and precise names.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Violet purple"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Orange"] }
    ]
  },
  {
    id: "yesod",
    kind: "sephirah",
    number: "9",
    name: "Yesod",
    hebrew: "יסוד",
    transliteration: "Yesod",
    translation: "Foundation",
    divineName: "Shaddai El Chai",
    divineNameHebrew: "שדי אל חי",
    archangel: "Gabriel",
    archangelHebrew: "גבריאל",
    angelicOrder: "Kerubim",
    planetary: "Moon",
    symbols: ["Moon", "Foundation stone", "Perfumes", "Dream body"],
    relatedTexts: ["Zohar", "The Mystical Qabalah", "Liber 777"],
    keywords: ["moon", "foundation", "dream", "astral", "image"],
    note: "Yesod is the imaginal and subtle foundation where patterns gather before manifesting.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Indigo"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Violet"] }
    ]
  },
  {
    id: "malkuth",
    kind: "sephirah",
    number: "10",
    name: "Malkuth",
    hebrew: "מלכות",
    transliteration: "Malkhut",
    translation: "Kingdom",
    divineName: "Adonai ha-Aretz",
    divineNameHebrew: "אדני הארץ",
    archangel: "Sandalphon",
    archangelHebrew: "סנדלפון",
    angelicOrder: "Ashim",
    planetary: "Earth / the elements",
    symbols: ["Altar", "Equal-armed cross", "Temple floor", "Gate"],
    relatedTexts: ["Zohar", "Sefer Yetzirah", "The Mystical Qabalah"],
    keywords: ["kingdom", "earth", "elements", "manifestation", "body"],
    note: "Malkuth is the kingdom of manifestation: body, earth, matter, and the visible temple of experience.",
    colors: [
      { system: "Golden Dawn color scale", scale: "King scale", colors: ["Yellow"] },
      { system: "Golden Dawn color scale", scale: "Queen scale", colors: ["Citrine", "Olive", "Russet", "Black"] }
    ]
  }
];

function sephirahName(id: string) {
  if (id === "daath") return "Da'ath";
  return sephiroth.find((node) => node.id === id)?.name ?? id;
}

const daath: TreeNode = {
  id: "daath",
  kind: "sephirah",
  number: "11",
  name: "Da'ath",
  hebrew: "דעת",
  transliteration: "Da'at",
  translation: "Knowledge",
  divineName: "Hidden knowledge; system dependent",
  archangel: "System dependent",
  angelicOrder: "System dependent",
  planetary: "The abyss / hidden knowledge",
  symbols: ["Veil", "Abyss", "Hidden sephirah", "Knowledge"],
  relatedTexts: ["Zohar", "The Mystical Qabalah", "Hermetic Qabalah materials"],
  keywords: ["daath", "knowledge", "abyss", "hidden", "veil"],
  note: "Da'ath is often shown as the hidden or non-enumerated sphere of knowledge. It is displayed here because many modern Hermetic diagrams include it, but it is not counted among the ten Sephiroth in the same way.",
  colors: [{ system: "Modern Hermetic / interpretive", scale: "Hidden sphere", colors: ["Lavender grey", "Smoke", "Black-violet"] }]
};

const tarotImages: Record<string, string> = {
  aleph: "/images/tarot/00-fool.png",
  beth: "/images/tarot/01-magician.png",
  gimel: "/images/tarot/02-high-priestess.png",
  daleth: "/images/tarot/03-empress-daleth.png",
  heh: "/images/tarot/04-emperor.png",
  vav: "/images/tarot/05-hierophant.png",
  zayin: "/images/tarot/06-lovers.png",
  cheth: "/images/tarot/07-chariot.png",
  teth: "/images/tarot/08-strength.png",
  yod: "/images/tarot/09-hermit.png",
  kaph: "/images/tarot/10-wheel-of-fortune.png",
  lamed: "/images/tarot/11-justice.png",
  mem: "/images/tarot/12-hanged-man.png",
  nun: "/images/tarot/13-death.png",
  samekh: "/images/tarot/14-temperance.png",
  ayin: "/images/tarot/15-devil.png",
  peh: "/images/tarot/16-tower.png",
  tzaddi: "/images/tarot/17-star.png",
  qoph: "/images/tarot/18-moon.png",
  shin: "/images/tarot/20-judgment.png",
  tav: "/images/tarot/21-world.png"
};

function makePath(input: {
  id: string;
  number: string;
  hebrew: string;
  transliteration: string;
  translation: string;
  source: string;
  target: string;
  attribution: string;
  tarot: string;
  symbols: string[];
  keywords: string[];
  color: string;
  functionText: string;
}): TreeNode {
  return {
    id: input.id,
    kind: "path",
    number: input.number,
    name: `${input.transliteration} Path`,
    hebrew: input.hebrew,
    transliteration: input.transliteration,
    translation: input.translation,
    divineName: "Path correspondence varies by system",
    archangel: "System dependent",
    angelicOrder: "System dependent",
    planetary: input.attribution,
    tarot: input.tarot,
    symbols: input.symbols,
    functionText: input.functionText,
    relatedTexts: ["Sefer Yetzirah", "Golden Dawn materials", "Liber 777"],
    keywords: input.keywords,
    note: `In the common Hermetic / Golden Dawn-style Tree, path ${input.number} joins ${sephirahName(input.source)} and ${sephirahName(input.target)}. Its Hebrew letter is ${input.transliteration} (${input.hebrew}), associated here with ${input.attribution} and ${input.tarot}. In practical pathworking, this is treated as a mode of transition between states of consciousness rather than a decorative line. Other Jewish, magical, and modern esoteric systems may arrange letter correspondences differently.`,
    colors: [{ system: "Hermetic / Golden Dawn path scale", scale: "Path color", colors: [input.color] }],
    source: input.source,
    target: input.target,
    tarotImage: tarotImages[input.id]
  };
}

const paths: TreeNode[] = [
  makePath({ id: "aleph", number: "11", hebrew: "א", transliteration: "Aleph", translation: "Ox / Breath", source: "kether", target: "chokmah", attribution: "Air", tarot: "The Fool", symbols: ["Breath", "Ox", "Living air", "Beginning"], keywords: ["aleph", "air", "fool", "breath"], color: "Bright pale yellow", functionText: "Unity becomes active force." }),
  makePath({ id: "beth", number: "12", hebrew: "ב", transliteration: "Beth", translation: "House", source: "kether", target: "binah", attribution: "Mercury", tarot: "The Magician", symbols: ["House", "Word", "Wand", "Mediation"], keywords: ["beth", "mercury", "magician", "language"], color: "Yellow", functionText: "Unity becomes intelligible form." }),
  makePath({ id: "gimel", number: "13", hebrew: "ג", transliteration: "Gimel", translation: "Camel", source: "kether", target: "tiphareth", attribution: "Moon", tarot: "The High Priestess", symbols: ["Camel", "Silver path", "Dream passage", "Veil"], keywords: ["gimel", "moon", "priestess", "dream"], color: "Blue", functionText: "Divine consciousness descends directly into the higher self." }),
  makePath({ id: "daleth", number: "14", hebrew: "ד", transliteration: "Daleth", translation: "Door", source: "chokmah", target: "binah", attribution: "Venus", tarot: "The Empress", symbols: ["Door", "Threshold", "Womb", "Beauty"], keywords: ["daleth", "venus", "empress", "door"], color: "Emerald green", functionText: "The primordial currents of force and form are brought into productive union." }),
  makePath({ id: "heh", number: "15", hebrew: "ה", transliteration: "Heh", translation: "Window", source: "chokmah", target: "tiphareth", attribution: "Aries", tarot: "The Emperor", symbols: ["Window", "Ram", "Revelation", "Authority"], keywords: ["heh", "aries", "emperor", "window"], color: "Scarlet", functionText: "Primal force becomes directed spiritual will." }),
  makePath({ id: "vav", number: "16", hebrew: "ו", transliteration: "Vav", translation: "Hook", source: "chokmah", target: "chesed", attribution: "Taurus", tarot: "The Hierophant", symbols: ["Hook", "Peg", "Teacher", "Stability"], keywords: ["vav", "taurus", "hierophant", "hook"], color: "Red-orange", functionText: "Divine wisdom becomes stable teaching, law, and order." }),
  makePath({ id: "zayin", number: "17", hebrew: "ז", transliteration: "Zayin", translation: "Sword", source: "binah", target: "tiphareth", attribution: "Gemini", tarot: "The Lovers", symbols: ["Sword", "Twins", "Choice", "Division and union"], keywords: ["zayin", "gemini", "lovers", "sword"], color: "Orange", functionText: "Understanding descends into the higher self as conscious choice and integration." }),
  makePath({ id: "cheth", number: "18", hebrew: "ח", transliteration: "Cheth", translation: "Fence", source: "binah", target: "gevurah", attribution: "Cancer", tarot: "The Chariot", symbols: ["Fence", "Enclosure", "Vehicle", "Sacred containment"], keywords: ["cheth", "cancer", "chariot", "fence"], color: "Amber", functionText: "Primordial form becomes protective discipline and controlled power." }),
  makePath({ id: "teth", number: "19", hebrew: "ט", transliteration: "Teth", translation: "Serpent", source: "chesed", target: "gevurah", attribution: "Leo", tarot: "Strength", symbols: ["Serpent", "Lion", "Coiled force", "Vitality"], keywords: ["teth", "leo", "strength", "serpent"], color: "Yellow-green", functionText: "Mercy and severity are held in living balance." }),
  makePath({ id: "yod", number: "20", hebrew: "י", transliteration: "Yod", translation: "Hand", source: "chesed", target: "tiphareth", attribution: "Virgo", tarot: "The Hermit", symbols: ["Hand", "Seed", "Lamp", "Guidance"], keywords: ["yod", "virgo", "hermit", "hand"], color: "Yellowish green", functionText: "Divine wisdom becomes inward guidance and disciplined illumination." }),
  makePath({ id: "kaph", number: "21", hebrew: "כ", transliteration: "Kaph", translation: "Palm", source: "chesed", target: "netzach", attribution: "Jupiter", tarot: "Wheel of Fortune", symbols: ["Palm", "Wheel", "Expansion", "Fortune"], keywords: ["kaph", "jupiter", "wheel", "fortune"], color: "Violet", functionText: "Higher beneficence becomes aspiration, confidence, and emotional expansion." }),
  makePath({ id: "lamed", number: "22", hebrew: "ל", transliteration: "Lamed", translation: "Goad", source: "gevurah", target: "tiphareth", attribution: "Libra", tarot: "Justice / Adjustment", symbols: ["Goad", "Scales", "Measure", "Correction"], keywords: ["lamed", "libra", "justice", "balance"], color: "Emerald green", functionText: "Force becomes just proportion and moral equilibrium." }),
  makePath({ id: "mem", number: "23", hebrew: "מ", transliteration: "Mem", translation: "Water", source: "gevurah", target: "hod", attribution: "Water", tarot: "The Hanged Man", symbols: ["Water", "Depth", "Suspension", "Womb"], keywords: ["mem", "water", "hanged man", "depth"], color: "Deep blue", functionText: "The analytical mind is purified through surrender and reversal of ordinary perspective." }),
  makePath({ id: "nun", number: "24", hebrew: "נ", transliteration: "Nun", translation: "Fish", source: "tiphareth", target: "netzach", attribution: "Scorpio", tarot: "Death", symbols: ["Fish", "Transformation", "Hidden life", "Regeneration"], keywords: ["nun", "scorpio", "death", "fish"], color: "Green-blue", functionText: "Desire is transformed into spiritual passion and devotion." }),
  makePath({ id: "samekh", number: "25", hebrew: "ס", transliteration: "Samekh", translation: "Support", source: "tiphareth", target: "yesod", attribution: "Sagittarius", tarot: "Temperance / Art", symbols: ["Support", "Prop", "Arrow", "Synthesis"], keywords: ["samekh", "sagittarius", "temperance", "art"], color: "Blue", functionText: "The lower personality is integrated, tested, and directed toward the higher self." }),
  makePath({ id: "ayin", number: "26", hebrew: "ע", transliteration: "Ayin", translation: "Eye", source: "tiphareth", target: "hod", attribution: "Capricorn", tarot: "The Devil", symbols: ["Eye", "Appearance", "Bondage", "Material fascination"], keywords: ["ayin", "capricorn", "devil", "eye"], color: "Indigo", functionText: "The intellect confronts structures, images, and attachments that obscure the higher self." }),
  makePath({ id: "peh", number: "27", hebrew: "פ", transliteration: "Peh", translation: "Mouth", source: "netzach", target: "hod", attribution: "Mars", tarot: "The Tower", symbols: ["Mouth", "Speech", "Tower", "Disruption"], keywords: ["peh", "mars", "tower", "mouth"], color: "Scarlet red", functionText: "Conflict between emotion and intellect destroys false formulations and makes new integration possible." }),
  makePath({ id: "tzaddi", number: "28", hebrew: "צ", transliteration: "Tzaddi", translation: "Fishhook", source: "netzach", target: "yesod", attribution: "Aquarius", tarot: "The Star", symbols: ["Fishhook", "Star", "Water bearer", "Aspiration"], keywords: ["tzaddi", "aquarius", "star", "fishhook"], color: "Violet", functionText: "Desire and imagination become guiding images within the psyche." }),
  makePath({ id: "qoph", number: "29", hebrew: "ק", transliteration: "Qoph", translation: "Back of the head", source: "netzach", target: "malkuth", attribution: "Pisces", tarot: "The Moon", symbols: ["Back of head", "Dream", "Image", "Threshold"], keywords: ["qoph", "pisces", "moon", "dream"], color: "Crimson", functionText: "Embodied consciousness encounters emotional and imaginal forces beneath ordinary perception." }),
  makePath({ id: "resh", number: "30", hebrew: "ר", transliteration: "Resh", translation: "Head", source: "hod", target: "yesod", attribution: "Sun", tarot: "The Sun", symbols: ["Head", "Sun", "Consciousness", "Illumination"], keywords: ["resh", "sun", "head", "illumination"], color: "Orange", functionText: "Intellect illuminates and organizes the subconscious imagination." }),
  makePath({ id: "shin", number: "31", hebrew: "ש", transliteration: "Shin", translation: "Tooth", source: "hod", target: "malkuth", attribution: "Fire / Spirit", tarot: "Judgement / Aeon", symbols: ["Tooth", "Fire", "Spirit", "Resurrection"], keywords: ["shin", "fire", "judgement", "spirit"], color: "Glowing scarlet-orange", functionText: "Material consciousness is awakened, purified, and made responsive to spiritual intelligence." }),
  makePath({ id: "tav", number: "32", hebrew: "ת", transliteration: "Tav", translation: "Mark", source: "yesod", target: "malkuth", attribution: "Saturn / Earth", tarot: "The Universe / World", symbols: ["Mark", "Seal", "Cross", "Completion"], keywords: ["tav", "saturn", "earth", "world", "mark"], color: "Indigo-black", functionText: "Physical consciousness becomes aware of its subtle foundation." })
];

const positions: Record<string, { x: number; y: number }> = hermeticTreePositions;

const sphereFills: Record<string, { background: string; border: string; shadow: string; text: string; textShadow: string }> = {
  kether: {
    background: "radial-gradient(circle at 34% 26%, #fffef4 0%, #f5ecd0 36%, #bba56a 72%, #2b2519 100%)",
    border: "rgba(255,248,220,.78)",
    shadow: "0 0 34px rgba(245,236,208,.24), inset 0 0 24px rgba(255,255,255,.2)",
    text: "#16120c",
    textShadow: "0 1px 0 rgba(255,255,255,.35)"
  },
  chokmah: {
    background: "radial-gradient(circle at 34% 26%, #d7e7f5 0%, #93a6b5 36%, #5a6470 66%, #111317 100%)",
    border: "rgba(205,225,242,.64)",
    shadow: "0 0 30px rgba(147,166,181,.22), inset 0 0 24px rgba(255,255,255,.12)",
    text: "#f4ecda",
    textShadow: "0 2px 5px rgba(0,0,0,.62)"
  },
  binah: {
    background: "radial-gradient(circle at 34% 26%, #4a1117 0%, #16080b 44%, #030303 100%)",
    border: "rgba(176,52,65,.7)",
    shadow: "0 0 30px rgba(176,52,65,.22), inset 0 0 24px rgba(255,255,255,.08)",
    text: "#f4ecda",
    textShadow: "0 2px 5px rgba(0,0,0,.7)"
  },
  chesed: {
    background: "radial-gradient(circle at 34% 26%, #7aa7df 0%, #244c86 42%, #081427 100%)",
    border: "rgba(122,167,223,.72)",
    shadow: "0 0 30px rgba(69,122,200,.24), inset 0 0 24px rgba(255,255,255,.1)",
    text: "#f4ecda",
    textShadow: "0 2px 5px rgba(0,0,0,.62)"
  },
  gevurah: {
    background: "radial-gradient(circle at 34% 26%, #ff7562 0%, #a31919 42%, #2d0505 100%)",
    border: "rgba(255,103,87,.72)",
    shadow: "0 0 30px rgba(204,45,32,.26), inset 0 0 24px rgba(255,255,255,.1)",
    text: "#fff2df",
    textShadow: "0 2px 5px rgba(0,0,0,.62)"
  },
  tiphareth: {
    background: "radial-gradient(circle at 34% 26%, #fff0a5 0%, #d8a83c 40%, #76531d 76%, #171006 100%)",
    border: "rgba(255,220,122,.78)",
    shadow: "0 0 36px rgba(216,168,60,.34), inset 0 0 22px rgba(255,255,255,.16)",
    text: "#171006",
    textShadow: "0 1px 0 rgba(255,240,165,.35)"
  },
  netzach: {
    background: "radial-gradient(circle at 34% 26%, #94efb1 0%, #228852 40%, #092819 100%)",
    border: "rgba(105,210,139,.72)",
    shadow: "0 0 30px rgba(34,136,82,.26), inset 0 0 24px rgba(255,255,255,.1)",
    text: "#f5f1df",
    textShadow: "0 2px 5px rgba(0,0,0,.62)"
  },
  hod: {
    background: "radial-gradient(circle at 34% 26%, #ffbf70 0%, #c46a22 38%, #55214b 76%, #160818 100%)",
    border: "rgba(238,143,58,.72)",
    shadow: "0 0 30px rgba(196,106,34,.26), inset 0 0 24px rgba(255,255,255,.1)",
    text: "#fff0dc",
    textShadow: "0 2px 5px rgba(0,0,0,.64)"
  },
  yesod: {
    background: "radial-gradient(circle at 34% 26%, #d7b8ff 0%, #7350b7 42%, #20113d 100%)",
    border: "rgba(176,145,236,.72)",
    shadow: "0 0 30px rgba(115,80,183,.28), inset 0 0 24px rgba(255,255,255,.1)",
    text: "#f7f0ff",
    textShadow: "0 2px 5px rgba(0,0,0,.64)"
  },
  malkuth: {
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.18), transparent 54%), conic-gradient(from 45deg, #d8b33f 0 25%, #1f1b14 25% 50%, #7a1f1a 50% 75%, #657a32 75% 100%)",
    border: "rgba(218,179,63,.72)",
    shadow: "0 0 30px rgba(149,116,49,.24), inset 0 0 24px rgba(0,0,0,.22)",
    text: "#fff5dc",
    textShadow: "0 2px 6px rgba(0,0,0,.74)"
  },
  daath: {
    background: "radial-gradient(circle at 34% 26%, rgba(205,190,222,.76) 0%, rgba(82,70,98,.62) 42%, rgba(18,14,24,.76) 100%)",
    border: "rgba(205,190,222,.48)",
    shadow: "0 0 28px rgba(205,190,222,.18), inset 0 0 24px rgba(255,255,255,.08)",
    text: "#f5eefc",
    textShadow: "0 2px 5px rgba(0,0,0,.7)"
  }
};

function sphereStyle(node: TreeNode, isActive: boolean) {
  const fill = sphereFills[node.id] ?? sphereFills.daath;
  return {
    background: fill.background,
    borderColor: isActive ? "rgba(245,214,146,.95)" : fill.border,
    boxShadow: isActive ? `${fill.shadow}, 0 0 38px rgba(181,146,85,.38)` : fill.shadow,
    color: fill.text,
    textShadow: fill.textShadow
  };
}

const fourWorlds = [
  {
    id: "atziluth",
    name: "Atziluth",
    hebrew: "אצילות",
    letter: "י",
    translation: "Emanation",
    element: "Fire",
    color: "crimson",
    band: "top-[2%] h-[27%]",
    overlay: "border-crimson/35 bg-crimson/[.16]",
    tone: "border-crimson/40 bg-crimson/10 text-red-200",
    summary: "The archetypal world nearest the divine source: pure emanation, will, and unmediated spiritual fire."
  },
  {
    id: "briah",
    name: "Briah",
    hebrew: "בריאה",
    letter: "ה",
    translation: "Creation",
    element: "Water",
    color: "blue",
    band: "top-[29%] h-[24%]",
    overlay: "border-blue-400/35 bg-blue-500/[.14]",
    tone: "border-blue-400/35 bg-blue-500/10 text-blue-100",
    summary: "The creative world of throne, archangelic intelligence, deep pattern, and formative spiritual imagination."
  },
  {
    id: "yetzirah",
    name: "Yetzirah",
    hebrew: "יצירה",
    letter: "ו",
    translation: "Formation",
    element: "Air",
    color: "gold",
    band: "top-[53%] h-[25%]",
    overlay: "border-gold/35 bg-gold/[.14]",
    tone: "border-gold/40 bg-gold/10 text-yellow-100",
    summary: "The formative world of angelic pattern, image, relation, motion, language, and psychic architecture."
  },
  {
    id: "assiah",
    name: "Assiah",
    hebrew: "עשיה",
    letter: "ה",
    translation: "Action",
    element: "Earth",
    color: "green",
    band: "top-[78%] h-[20%]",
    overlay: "border-emerald-400/35 bg-emerald-500/[.14]",
    tone: "border-emerald-400/35 bg-emerald-500/10 text-emerald-100",
    summary: "The world of action and manifestation: body, matter, embodied practice, ritual action, and the visible world."
  }
];

const planetaryGlyphs: Record<string, string> = {
  Saturn: "♄",
  Jupiter: "♃",
  Mars: "♂",
  Sun: "☉",
  Venus: "♀",
  Mercury: "☿",
  Moon: "☽",
  Air: "△",
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
  Water: "▽"
};

function planetaryGlyph(attribution: string) {
  if (attribution.includes("Primum Mobile")) return "✦";
  if (attribution.includes("Zodiac")) return "✶";
  if (attribution.includes("Fire")) return "△";
  if (attribution.includes("Earth")) return "⊕";
  const glyph = planetaryGlyphs[attribution] ?? "";
  return glyph ? `${glyph}\uFE0E` : "";
}

function pathLabelPosition(path: TreeNode) {
  const source = positions[path.source ?? ""];
  const target = positions[path.target ?? ""];
  if (!source || !target) return { x: 50, y: 50 };
  const x = (source.x + target.x) / 2;
  const y = (source.y + target.y) / 2;
  const offsets: Record<string, { x: number; y: number }> = {
    aleph: { x: 0, y: 0 },
    beth: { x: 0, y: 0 },
    gimel: { x: -13, y: 2.8 },
    daleth: { x: 0, y: -5.2 },
    heh: { x: 8, y: -1.2 },
    zayin: { x: -8, y: -1.2 },
    teth: { x: 0, y: 2.8 },
    yod: { x: 3, y: -.4 },
    lamed: { x: -3, y: -.4 },
    samekh: { x: 4.2, y: 0 },
    peh: { x: 0, y: 2.8 },
    tav: { x: 4.2, y: 0 },
    qoph: { x: 3.2, y: 1.2 },
    shin: { x: -3.2, y: 1.2 }
  };
  const offset = offsets[path.id] ?? { x: 0, y: 0 };
  return { x: x + offset.x, y: y + offset.y };
}

function relatedEpisodes(node: TreeNode, episodes: Episode[]) {
  const terms = [node.name, node.translation, node.planetary, ...node.keywords].join(" ").toLowerCase();
  return episodes
    .filter((episode) => {
      const haystack = [episode.title, episode.description, episode.longIntroduction, episode.guest, ...episode.topics].join(" ").toLowerCase();
      return terms.split(/\s+/).some((term) => term.length > 4 && haystack.includes(term));
    })
    .slice(0, 4);
}

function transcriptPassages(node: TreeNode, episodes: Episode[]) {
  const terms = [node.name, node.translation, node.planetary, ...node.keywords].map((term) => term.toLowerCase());
  return episodes.flatMap((episode) =>
    episode.transcript
      .filter((segment) => terms.some((term) => term.length > 4 && segment.text.toLowerCase().includes(term)))
      .slice(0, 2)
      .map((segment) => ({ episode, segment }))
  ).slice(0, 5);
}

export function TreeOfLifeExplorer({ episodes }: { episodes: Episode[] }) {
  const [activeId, setActiveId] = useState("tiphareth");
  const [activeWorldId, setActiveWorldId] = useState("atziluth");
  const diagramNodes = [...sephiroth, daath];
  const active = [...diagramNodes, ...paths].find((node) => node.id === activeId) ?? sephiroth[5];
  const activeWorld = fourWorlds.find((world) => world.id === activeWorldId) ?? fourWorlds[0];
  const episodeMatches = relatedEpisodes(active, episodes);
  const passages = transcriptPassages(active, episodes);
  const activePlanetaryGlyph = planetaryGlyph(active.planetary);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(35rem,1fr)_minmax(0,1fr)]">
      <section className="temple-border rounded p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.24em] text-gold">Interactive diagram</p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Tree of Life</h2>
          </div>
          <Network className="text-gold" size={28} strokeWidth={1.25} />
        </div>
        <p className="mt-3 text-sm leading-6 text-limestone">
          Diagram uses the common Hermetic / Golden Dawn 22-path arrangement, with Da&apos;ath shown as the visible hidden sphere.
        </p>
        <div className="relative isolate mx-auto mt-6 aspect-[5/9] w-full max-w-[34rem] rounded border border-gold/15 bg-[radial-gradient(circle_at_50%_43%,rgba(181,146,85,.16),transparent_18rem),linear-gradient(180deg,rgba(0,0,0,.66),rgba(0,0,0,.24))]">
          {fourWorlds.map((world) => (
            <div
              key={`world-wash-${world.id}`}
              className={`pointer-events-none absolute inset-x-[2.5%] ${world.band} z-0 rounded-sm border-y transition-opacity duration-300 ${world.overlay} ${activeWorld.id === world.id ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          ))}
          <div className="pointer-events-none absolute inset-y-[1.5%] left-[44%] right-[44%] z-[1] border-x border-gold/20 bg-gold/8" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-[1.5%] left-[17%] z-[1] w-[10%] border-x border-gold/14 bg-black/12" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-[1.5%] right-[17%] z-[1] w-[10%] border-x border-gold/14 bg-black/12" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-[1%] left-[11%] z-[1] h-[3.5%] w-[22%] border border-gold/20 bg-black/30" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-[1%] left-[37%] right-[37%] z-[1] h-[3.5%] border border-gold/20 bg-black/30" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-[1%] right-[11%] z-[1] h-[3.5%] w-[22%] border border-gold/20 bg-black/30" aria-hidden="true" />
          <svg className="absolute inset-0 z-[2] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {paths.map((path) => (
              <g key={`${path.source}-${path.target}`}>
                <line
                  x1={positions[path.source ?? ""].x}
                  y1={positions[path.source ?? ""].y}
                  x2={positions[path.target ?? ""].x}
                  y2={positions[path.target ?? ""].y}
                  stroke="rgba(0,0,0,.82)"
                  strokeWidth={active.id === path.id ? "3.25" : "2.55"}
                  strokeLinecap="round"
                />
                <line
                  x1={positions[path.source ?? ""].x}
                  y1={positions[path.source ?? ""].y}
                  x2={positions[path.target ?? ""].x}
                  y2={positions[path.target ?? ""].y}
                  stroke={active.id === path.id ? "rgba(255,224,154,.98)" : "rgba(204,166,92,.84)"}
                  strokeWidth={active.id === path.id ? "1.72" : "1.28"}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
          {paths.map((path) => {
            const position = pathLabelPosition(path);
            return (
              <button
                key={`path-label-${path.id}`}
                type="button"
                aria-label={`Path ${path.number}, ${path.transliteration}`}
                className={`focus-ring absolute z-30 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black text-center after:absolute after:left-1/2 after:top-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[''] shadow-[inset_0_0_10px_rgba(0,0,0,.95),0_0_18px_rgba(0,0,0,.65)] transition hover:border-gold hover:text-gold ${active.id === path.id ? "border-gold text-gold shadow-[inset_0_0_10px_rgba(0,0,0,.95),0_0_24px_rgba(181,146,85,.34)]" : "border-gold/35 text-parchment"}`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                onClick={() => setActiveId(path.id)}
              >
                <span className="torah-hebrew-letter text-base leading-none" dir="rtl">{path.hebrew}</span>
              </button>
            );
          })}
          {diagramNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`focus-ring absolute z-20 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-center transition hover:scale-[1.03] hover:border-gold ${node.id === "daath" ? "size-[3.75rem] border-dashed opacity-78 backdrop-blur-sm" : "size-[4.85rem]"}`}
              style={{ left: `${positions[node.id].x}%`, top: `${positions[node.id].y}%`, ...sphereStyle(node, active.id === node.id) }}
              onClick={() => setActiveId(node.id)}
            >
              <span className="text-xs text-current">{node.number}</span>
              <span className="font-display text-[0.82rem] leading-none">{node.name}</span>
              <span className="torah-hebrew-letter text-lg leading-none" dir="rtl">{node.hebrew}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded border border-gold/20 bg-black/25 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.22em] text-gold">Four worlds of Qabalah</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{activeWorld.name} · {activeWorld.translation}</h3>
              <p className="torah-hebrew-letter mt-1 text-3xl text-gold" dir="rtl">{activeWorld.hebrew}</p>
            </div>
            <div className={`rounded border px-4 py-3 text-sm ${activeWorld.tone}`}>
              <span className="torah-hebrew-letter text-2xl" dir="rtl">{activeWorld.letter}</span>
              <span className="ml-3 uppercase tracking-[.18em]">{activeWorld.element}</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-parchment">{activeWorld.summary}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {fourWorlds.map((world) => (
              <button
                key={world.id}
                type="button"
                className={`focus-ring rounded border px-3 py-3 text-left transition ${activeWorld.id === world.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:border-gold/50 hover:text-ivory"}`}
                onClick={() => setActiveWorldId(world.id)}
              >
                <span className="block text-xs uppercase tracking-[.16em] text-gold">
                  <span className="torah-hebrew-letter text-base" dir="rtl">{world.letter}</span> · {world.element}
                </span>
                <span className="mt-1 block font-display text-lg">{world.name}</span>
                <span className="mt-1 block text-xs text-limestone">{world.translation}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-limestone">
            This view shows one common instructional layering of the worlds across the Tree. Some Qabalistic and Hermetic systems instead present a complete Tree within each world, so the model should be read as a study lens rather than a single universal diagram.
          </p>
        </div>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[.22em] text-gold">Twenty-two path attributions</p>
          <div className="mt-3 grid max-h-80 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {paths.map((path) => (
              <button key={path.id} type="button" className={`rounded border px-3 py-2 text-left ${active.id === path.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:border-gold/50"}`} onClick={() => setActiveId(path.id)}>
                <span className="block text-xs uppercase tracking-[.16em] text-gold">{path.number} · <span className="torah-hebrew-letter text-base" dir="rtl">{path.hebrew}</span> · {path.transliteration}</span>
                <span className="font-display text-base">{sephirahName(path.source ?? "")} to {sephirahName(path.target ?? "")}</span>
                <span className="mt-1 block text-xs text-limestone">{path.tarot} · {path.planetary}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5">
        <article className="relative overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_16%,rgba(181,146,85,.2),transparent_16rem),linear-gradient(135deg,rgba(122,17,26,.18),transparent_55%)]" />
          <p className="text-xs uppercase tracking-[.24em] text-gold">{active.kind === "sephirah" ? "Sephirah" : "Path"} {active.number}</p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-manuscript-title font-display text-5xl leading-none text-ivory">{active.name}</h2>
              <p className="torah-hebrew-letter mt-2 text-3xl text-gold" dir="rtl">{active.hebrew}</p>
              <p className="mt-2 text-parchment">{active.transliteration} · {active.translation}</p>
            </div>
            <div className="rounded-full border border-gold/30 bg-black/40 px-5 py-4 text-center">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Attribution</p>
              <p className="mt-1 flex items-center justify-center gap-2 font-display text-xl text-ivory">
                {activePlanetaryGlyph ? (
                  <span
                    className="grid size-10 place-items-center rounded-full border border-gold/35 bg-black/70 font-serif text-2xl leading-none text-gold shadow-[0_0_18px_rgba(181,146,85,.18),inset_0_0_18px_rgba(181,146,85,.08)]"
                    aria-hidden="true"
                  >
                    {activePlanetaryGlyph}
                  </span>
                ) : null}
                <span>{active.planetary}</span>
              </p>
            </div>
          </div>
          <p className="mt-6 leading-8 text-parchment">{active.note}</p>
          {active.kind === "path" ? (
            <div className="mt-5 grid gap-5 rounded border border-gold/15 bg-black/25 p-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
              <div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[.18em] text-gold">Connects</dt>
                    <dd className="mt-1 text-ivory">{sephirahName(active.source ?? "")} to {sephirahName(active.target ?? "")}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[.18em] text-gold">Tarot key</dt>
                    <dd className="mt-1 text-ivory">{active.tarot}</dd>
                  </div>
                </dl>
                {active.functionText ? (
                  <div className="mt-4 border-t border-gold/10 pt-4">
                    <p className="text-xs uppercase tracking-[.18em] text-gold">Path function</p>
                    <p className="mt-2 leading-7 text-parchment">{active.functionText}</p>
                  </div>
                ) : null}
              </div>
              <div className="rounded border border-gold/25 bg-[radial-gradient(circle_at_50%_0%,rgba(181,146,85,.16),transparent_9rem),rgba(0,0,0,.45)] p-3 shadow-[0_18px_44px_rgba(0,0,0,.28)]">
                {active.tarotImage ? (
                  <Image
                    src={active.tarotImage}
                    alt={`${active.tarot} tarot card`}
                    width={320}
                    height={512}
                    sizes="(min-width: 1024px) 208px, 45vw"
                    className="mx-auto max-h-[24rem] w-full rounded bg-black object-contain"
                  />
                ) : (
                  <div className="flex aspect-[5/8] min-h-72 flex-col items-center justify-center rounded border border-dashed border-gold/25 bg-black/45 p-4 text-center">
                    <span className="torah-hebrew-letter text-5xl text-gold/80" dir="rtl">{active.hebrew}</span>
                    <p className="mt-4 text-xs uppercase tracking-[.2em] text-gold">Tarot image pending</p>
                    <p className="mt-2 text-sm leading-6 text-limestone">{active.tarot}</p>
                  </div>
                )}
                <div className="mt-3 text-center">
                  <p className="text-xs uppercase tracking-[.2em] text-gold">Tarot correspondence</p>
                  <p className="mt-1 font-display text-base text-ivory">{active.tarot}</p>
                </div>
              </div>
            </div>
          ) : null}
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          <CorrespondenceBlock title="Traditional Qabalistic Names" system="Sephirothic correspondences">
            <Detail label="Divine name" value={active.divineName} hebrew={active.divineNameHebrew} />
            <Detail label="Archangel" value={active.archangel} hebrew={active.archangelHebrew} />
            <Detail label="Angelic order" value={active.angelicOrder} />
          </CorrespondenceBlock>
          <CorrespondenceBlock title="Symbols" system="Comparative symbolic vocabulary">
            <TagList items={active.symbols} />
          </CorrespondenceBlock>
        </div>

        <CorrespondenceBlock title="Color Scales" system="Golden Dawn style color scales, shown as a specific Hermetic system">
          <div className="grid gap-3 sm:grid-cols-2">
            {active.colors.map((scale) => (
              <div key={`${scale.system}-${scale.scale}`} className="rounded border border-gold/15 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[.16em] text-gold">{scale.scale}</p>
                <p className="mt-1 text-sm text-limestone">{scale.system}</p>
                <TagList items={scale.colors} />
              </div>
            ))}
          </div>
        </CorrespondenceBlock>

        <div className="grid gap-4 lg:grid-cols-2">
          <CorrespondenceBlock title="Related Texts" system="Bibliographic study hints">
            <TagList items={active.relatedTexts} />
          </CorrespondenceBlock>
          <CorrespondenceBlock title="Aetherica Episodes" system="Local archive matches">
            {episodeMatches.length ? (
              <div className="grid gap-2">
                {episodeMatches.map((episode) => (
                  <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="rounded border border-gold/15 bg-black/25 p-3 text-sm text-parchment hover:border-gold/45 hover:text-ivory">
                    {episode.title}
                  </Link>
                ))}
              </div>
            ) : <p className="text-sm text-parchment">No local episode match yet.</p>}
          </CorrespondenceBlock>
        </div>

        <CorrespondenceBlock title="Transcript Passages" system="Aetherica transcript search matches">
          {passages.length ? (
            <div className="grid gap-3">
              {passages.map(({ episode, segment }) => (
                <Link key={`${episode.slug}-${segment.id}`} href={`/episodes/${episode.slug}?t=${segment.start}#${segment.id}`} className="rounded border border-gold/15 bg-black/25 p-3 hover:border-gold/45">
                  <p className="text-xs uppercase tracking-[.16em] text-gold">{episode.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-parchment">{segment.text}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-parchment">Transcript passages will appear as more reviewed transcripts are attached to the archive.</p>
          )}
        </CorrespondenceBlock>
      </section>
    </div>
  );
}

function CorrespondenceBlock({ title, system, children }: { title: string; system: string; children: React.ReactNode }) {
  return (
    <article className="rounded border border-gold/20 bg-black/35 p-4">
      <div className="mb-3 flex items-start gap-3">
        <ScrollText className="mt-1 shrink-0 text-gold" size={18} strokeWidth={1.25} />
        <div>
          <h3 className="font-display text-2xl text-ivory">{title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[.16em] text-limestone">{system}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function Detail({ label, value, hebrew }: { label: string; value: string; hebrew?: string }) {
  return (
    <div className="border-t border-gold/10 py-3 first:border-t-0 first:pt-0">
      <dt className="text-xs uppercase tracking-[.18em] text-gold">{label}</dt>
      <dd className="mt-1 text-ivory">{value}</dd>
      {hebrew ? <dd className="torah-hebrew-letter mt-2 text-3xl text-gold/90" dir="rtl">{hebrew}</dd> : null}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{item}</span>
      ))}
    </div>
  );
}
