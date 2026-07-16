"use client";

import Link from "next/link";
import { BookOpenText, Landmark, ScrollText, Volume2 } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import type { Episode } from "@/lib/data/types";

type HebrewLetterEntry = {
  id: string;
  form: string;
  finalForm?: string;
  name: string;
  pronunciation: string;
  value: number;
  meaning: string;
  symbolism: string;
  seferYetzirah: {
    class: "Mother letter" | "Double letter" | "Simple letter";
    association: string;
    note: string;
  };
  hermeticPath: {
    attribution: string;
    tarot: string;
    path: string;
    note: string;
  };
  historical: string;
  archiveKeywords: string[];
};

const letters: HebrewLetterEntry[] = [
  {
    id: "aleph",
    form: "א",
    name: "Aleph",
    pronunciation: "AH-lef",
    value: 1,
    meaning: "Ox; silent carrier of breath or vowel sound",
    symbolism: "Breath, spirit, beginning, silent potency, and the life that precedes articulated speech.",
    seferYetzirah: { class: "Mother letter", association: "Air", note: "The three mother letters are associated with elemental principles in Sefer Yetzirah traditions." },
    hermeticPath: { attribution: "Air", tarot: "The Fool", path: "Kether to Chokmah in the common Hermetic Tree arrangement", note: "This path attribution is Hermetic/Golden Dawn style, not a universal Jewish Kabbalistic assignment." },
    historical: "Aleph derives from a pictorial ox-head sign in Northwest Semitic scripts and later became the first letter of the Hebrew alphabet.",
    archiveKeywords: ["aleph", "air", "breath", "fool", "spirit"]
  },
  {
    id: "beth",
    form: "ב",
    name: "Beth",
    pronunciation: "BET",
    value: 2,
    meaning: "House",
    symbolism: "Dwelling, container, interiority, temple, and the first distinction between within and without.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary attributions vary by recension and later system.", note: "Double letters have hard/soft pronunciations and are treated as a distinct group in Sefer Yetzirah." },
    hermeticPath: { attribution: "Mercury", tarot: "The Magician", path: "Kether to Binah in the common Hermetic Tree arrangement", note: "Hermetic correspondences connect Beth with Mercury, language, and magical mediation." },
    historical: "Beth is historically related to a house-plan sign and is the source of the Greek beta and Latin B.",
    archiveKeywords: ["beth", "mercury", "magician", "language", "house"]
  },
  {
    id: "gimel",
    form: "ג",
    name: "Gimel",
    pronunciation: "GEE-mel",
    value: 3,
    meaning: "Camel",
    symbolism: "Passage, bearing, movement across a desert, and the carrying of nourishment across distance.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; later planetary attributions are system-dependent.", note: "Sefer Yetzirah letter categories should be distinguished from later tarot/path systems." },
    hermeticPath: { attribution: "Moon", tarot: "The High Priestess", path: "Kether to Tiphareth in the common Hermetic Tree arrangement", note: "Hermetic pathwork often treats Gimel as a lunar bridge across the abyss." },
    historical: "Gimel descends from a Semitic sign associated with a camel or throwing stick and became Greek gamma.",
    archiveKeywords: ["gimel", "moon", "priestess", "camel", "dream"]
  },
  {
    id: "daleth",
    form: "ד",
    name: "Daleth",
    pronunciation: "DAH-let",
    value: 4,
    meaning: "Door",
    symbolism: "Threshold, gate, entrance, passage, and the mystery of moving from one condition to another.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary mapping differs by source.", note: "The double-letter category is older than most modern occult path tables." },
    hermeticPath: { attribution: "Venus", tarot: "The Empress", path: "Chokmah to Binah in the common Hermetic Tree arrangement", note: "Hermetic correspondences associate Daleth with Venusian mediation and the door of form." },
    historical: "Daleth is related to a door sign and is the ancestor of Greek delta and Latin D.",
    archiveKeywords: ["daleth", "venus", "empress", "door", "threshold"]
  },
  {
    id: "heh",
    form: "ה",
    name: "Heh",
    pronunciation: "HAY",
    value: 5,
    meaning: "Window; breath; behold",
    symbolism: "Revelation, opening, exhalation, vision, and the disclosure of form.",
    seferYetzirah: { class: "Simple letter", association: "Aries in common Hermetic-Sefer Yetzirah reception", note: "Zodiacal associations are often received through medieval and Hermetic arrangements." },
    hermeticPath: { attribution: "Aries", tarot: "The Emperor", path: "Chokmah to Tiphareth in the common Hermetic Tree arrangement", note: "This is a Hermetic path attribution and should be read as such." },
    historical: "Heh is historically connected to a window or exclamation sign and functions as a consonant and mater lectionis in Hebrew.",
    archiveKeywords: ["heh", "aries", "emperor", "window", "revelation"]
  },
  {
    id: "vav",
    form: "ו",
    name: "Vav",
    pronunciation: "VAHV",
    value: 6,
    meaning: "Hook; peg; connector",
    symbolism: "Connection, joining, linkage, conjunction, and the hook that binds parts into a structure.",
    seferYetzirah: { class: "Simple letter", association: "Taurus in common Hermetic-Sefer Yetzirah reception", note: "Simple letters are frequently associated with zodiac signs in later interpretive systems." },
    hermeticPath: { attribution: "Taurus", tarot: "The Hierophant", path: "Chokmah to Chesed in the common Hermetic Tree arrangement", note: "The Hermetic path association links Vav with teaching, mediation, and stability." },
    historical: "Vav developed from a hook or peg sign and later influenced Greek upsilon and Latin letters through Phoenician transmission.",
    archiveKeywords: ["vav", "taurus", "hierophant", "hook", "connection"]
  },
  {
    id: "zayin",
    form: "ז",
    name: "Zayin",
    pronunciation: "ZAH-yin",
    value: 7,
    meaning: "Weapon; sword",
    symbolism: "Discrimination, cutting, conflict, defense, and the sharp power of distinction.",
    seferYetzirah: { class: "Simple letter", association: "Gemini in common Hermetic-Sefer Yetzirah reception", note: "The zodiacal assignment is presented as a received correspondence, not an exclusive reading." },
    hermeticPath: { attribution: "Gemini", tarot: "The Lovers", path: "Binah to Tiphareth in the common Hermetic Tree arrangement", note: "Hermetic tables often pair Zayin with polarity, choice, and union through distinction." },
    historical: "Zayin is related to a weapon sign and preserves an ancient Northwest Semitic consonant value.",
    archiveKeywords: ["zayin", "gemini", "lovers", "sword", "weapon"]
  },
  {
    id: "cheth",
    form: "ח",
    name: "Cheth",
    pronunciation: "KHET",
    value: 8,
    meaning: "Fence; enclosure",
    symbolism: "Boundary, protected field, enclosure, life-force held within form, and sacred containment.",
    seferYetzirah: { class: "Simple letter", association: "Cancer in common Hermetic-Sefer Yetzirah reception", note: "Associations should be compared across recensions and later occult sources." },
    hermeticPath: { attribution: "Cancer", tarot: "The Chariot", path: "Binah to Geburah in the common Hermetic Tree arrangement", note: "Hermetic readings often emphasize enclosure, vehicle, and disciplined motion." },
    historical: "Cheth preserves a guttural sound not present in many modern European alphabets.",
    archiveKeywords: ["cheth", "cancer", "chariot", "fence", "boundary"]
  },
  {
    id: "teth",
    form: "ט",
    name: "Teth",
    pronunciation: "TET",
    value: 9,
    meaning: "Serpent; coiled form",
    symbolism: "Coiled force, instinct, latent energy, and the mystery of power contained before expression.",
    seferYetzirah: { class: "Simple letter", association: "Leo in common Hermetic-Sefer Yetzirah reception", note: "The symbolic serpent meaning is traditional but not the only historical explanation of the sign." },
    hermeticPath: { attribution: "Leo", tarot: "Strength", path: "Chesed to Geburah in the common Hermetic Tree arrangement", note: "Hermetic correspondence emphasizes solar courage and the mastery of vital force." },
    historical: "Teth represents an emphatic T sound in Semitic phonology; its pictorial origin is debated.",
    archiveKeywords: ["teth", "leo", "strength", "serpent", "force"]
  },
  {
    id: "yod",
    form: "י",
    name: "Yod",
    pronunciation: "YODE",
    value: 10,
    meaning: "Hand",
    symbolism: "Seed, point, hand, creative spark, and the smallest sign from which larger forms unfold.",
    seferYetzirah: { class: "Simple letter", association: "Virgo in common Hermetic-Sefer Yetzirah reception", note: "Yod's small written form made it especially important in mystical interpretation." },
    hermeticPath: { attribution: "Virgo", tarot: "The Hermit", path: "Chesed to Tiphareth in the common Hermetic Tree arrangement", note: "Hermetic readings often connect Yod with seed-wisdom, guidance, and precise work." },
    historical: "Yod derives from a hand sign and became the ancestor of Greek iota and Latin I/J forms.",
    archiveKeywords: ["yod", "virgo", "hermit", "hand", "seed"]
  },
  {
    id: "kaph",
    form: "כ",
    finalForm: "ך",
    name: "Kaph",
    pronunciation: "KAHF",
    value: 20,
    meaning: "Palm of the hand",
    symbolism: "Grasp, reception, capacity, blessing, and the open palm that receives or gives.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary systems vary.", note: "Kaph has a final form when it closes a word." },
    hermeticPath: { attribution: "Jupiter", tarot: "Wheel of Fortune", path: "Chesed to Netzach in the common Hermetic Tree arrangement", note: "Hermetic correspondence links Kaph with expansion, fortune, and cycles." },
    historical: "Kaph is related to a palm sign; its final form is used at the end of words.",
    archiveKeywords: ["kaph", "jupiter", "wheel", "palm", "fortune"]
  },
  {
    id: "lamed",
    form: "ל",
    name: "Lamed",
    pronunciation: "LAH-med",
    value: 30,
    meaning: "Ox goad; teaching staff",
    symbolism: "Learning, instruction, aspiration, discipline, and the goad that directs motion.",
    seferYetzirah: { class: "Simple letter", association: "Libra in common Hermetic-Sefer Yetzirah reception", note: "Lamed is visually distinctive as the tallest Hebrew letter." },
    hermeticPath: { attribution: "Libra", tarot: "Justice or Adjustment", path: "Geburah to Tiphareth in the common Hermetic Tree arrangement", note: "Hermetic readings emphasize balance, measure, and correction." },
    historical: "Lamed is historically associated with a goad or staff and influenced Greek lambda and Latin L.",
    archiveKeywords: ["lamed", "libra", "justice", "teaching", "balance"]
  },
  {
    id: "mem",
    form: "מ",
    finalForm: "ם",
    name: "Mem",
    pronunciation: "MEM",
    value: 40,
    meaning: "Water",
    symbolism: "Waters, womb, depth, reflection, dissolution, and the matrix of life.",
    seferYetzirah: { class: "Mother letter", association: "Water", note: "Mem is one of the three mother letters and has an open and final closed form." },
    hermeticPath: { attribution: "Water", tarot: "The Hanged Man", path: "Geburah to Hod in the common Hermetic Tree arrangement", note: "Hermetic correspondence treats Mem as the path of water, suspension, and reversal." },
    historical: "Mem descends from a water sign; the final form closes the letter when it appears at the end of a word.",
    archiveKeywords: ["mem", "water", "hanged man", "womb", "depth"]
  },
  {
    id: "nun",
    form: "נ",
    finalForm: "ן",
    name: "Nun",
    pronunciation: "NOON",
    value: 50,
    meaning: "Fish",
    symbolism: "Life in the waters, continuation, transformation, hidden movement, and the depths of generation.",
    seferYetzirah: { class: "Simple letter", association: "Scorpio in common Hermetic-Sefer Yetzirah reception", note: "Nun has a final form and is often symbolically linked with transformation." },
    hermeticPath: { attribution: "Scorpio", tarot: "Death", path: "Tiphareth to Netzach in the common Hermetic Tree arrangement", note: "Hermetic correspondence emphasizes transformation rather than mere ending." },
    historical: "Nun is related to a fish sign and influenced Greek nu and Latin N.",
    archiveKeywords: ["nun", "scorpio", "death", "fish", "transformation"]
  },
  {
    id: "samekh",
    form: "ס",
    name: "Samekh",
    pronunciation: "SAH-mekh",
    value: 60,
    meaning: "Support; prop",
    symbolism: "Support, enclosure, stability, protection, and the hidden structure that upholds a thing.",
    seferYetzirah: { class: "Simple letter", association: "Sagittarius in common Hermetic-Sefer Yetzirah reception", note: "The name is often interpreted through the idea of support." },
    hermeticPath: { attribution: "Sagittarius", tarot: "Temperance or Art", path: "Tiphareth to Yesod in the common Hermetic Tree arrangement", note: "Hermetic readings emphasize synthesis, testing, and the measured blending of forces." },
    historical: "Samekh preserves an S sound and is historically distinct from Shin despite later visual simplification in some scripts.",
    archiveKeywords: ["samekh", "sagittarius", "temperance", "support", "art"]
  },
  {
    id: "ayin",
    form: "ע",
    name: "Ayin",
    pronunciation: "AH-yin",
    value: 70,
    meaning: "Eye",
    symbolism: "Sight, perception, appearance, insight, and the ambiguity between vision and illusion.",
    seferYetzirah: { class: "Simple letter", association: "Capricorn in common Hermetic-Sefer Yetzirah reception", note: "Ayin is a guttural letter whose pronunciation is often weakened in modern Hebrew speech." },
    hermeticPath: { attribution: "Capricorn", tarot: "The Devil", path: "Tiphareth to Hod in the common Hermetic Tree arrangement", note: "Hermetic symbolism often treats Ayin as the eye of appearance, bondage, and material fascination." },
    historical: "Ayin originally represented a voiced pharyngeal sound and is historically linked with an eye pictogram.",
    archiveKeywords: ["ayin", "capricorn", "devil", "eye", "perception"]
  },
  {
    id: "peh",
    form: "פ",
    finalForm: "ף",
    name: "Peh",
    pronunciation: "PAY",
    value: 80,
    meaning: "Mouth",
    symbolism: "Speech, utterance, command, expression, and the power by which inner form becomes audible.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary arrangements differ by source.", note: "Peh has hard and soft sounds, plus a final form." },
    hermeticPath: { attribution: "Mars", tarot: "The Tower", path: "Netzach to Hod in the common Hermetic Tree arrangement", note: "Hermetic correspondence links Peh with disruptive utterance, force, and the breaking of false structures." },
    historical: "Peh is historically connected to a mouth sign and became Greek pi and Latin P through alphabetic transmission.",
    archiveKeywords: ["peh", "mars", "tower", "mouth", "speech"]
  },
  {
    id: "tzaddi",
    form: "צ",
    finalForm: "ץ",
    name: "Tzaddi",
    pronunciation: "TSAH-dee",
    value: 90,
    meaning: "Fishhook; sometimes linked with righteousness by wordplay",
    symbolism: "Hooking, drawing forth, aspiration, and the tension between desire and right alignment.",
    seferYetzirah: { class: "Simple letter", association: "Aquarius in common Hermetic-Sefer Yetzirah reception", note: "Tzaddi has a final form and a complex reception history in tarot correspondences." },
    hermeticPath: { attribution: "Aquarius", tarot: "The Star in the common Golden Dawn table", path: "Netzach to Yesod in the common Hermetic Tree arrangement", note: "Some modern occult systems debate the tarot placement of Tzaddi; the system should always be named." },
    historical: "Tzaddi preserves an emphatic affricate in Hebrew and has a distinct final form at word endings.",
    archiveKeywords: ["tzaddi", "aquarius", "star", "fishhook", "righteous"]
  },
  {
    id: "qoph",
    form: "ק",
    name: "Qoph",
    pronunciation: "KOHF",
    value: 100,
    meaning: "Back of the head; monkey; needle eye in differing traditions",
    symbolism: "Backward reflection, dream, image, threshold of the unconscious, and the strange mirror of embodiment.",
    seferYetzirah: { class: "Simple letter", association: "Pisces in common Hermetic-Sefer Yetzirah reception", note: "Meanings attached to letter names can differ across linguistic and esoteric sources." },
    hermeticPath: { attribution: "Pisces", tarot: "The Moon", path: "Netzach to Malkuth in the common Hermetic Tree arrangement", note: "Hermetic correspondence links Qoph with dream, lunar reflection, and the path through image." },
    historical: "Qoph represents a back-of-the-throat consonant historically distinct from Kaph.",
    archiveKeywords: ["qoph", "pisces", "moon", "dream", "image"]
  },
  {
    id: "resh",
    form: "ר",
    name: "Resh",
    pronunciation: "RESH",
    value: 200,
    meaning: "Head",
    symbolism: "Head, beginning, face, solar consciousness, and the ruling center of awareness.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary mapping varies by source.", note: "Resh is grouped with the double letters in Sefer Yetzirah traditions." },
    hermeticPath: { attribution: "Sun", tarot: "The Sun", path: "Hod to Yesod in the common Hermetic Tree arrangement", note: "Hermetic correspondence links Resh with solar clarity and conscious illumination." },
    historical: "Resh is historically related to a head sign and became Greek rho and Latin R.",
    archiveKeywords: ["resh", "sun", "head", "solar", "illumination"]
  },
  {
    id: "shin",
    form: "ש",
    name: "Shin",
    pronunciation: "SHEEN",
    value: 300,
    meaning: "Tooth",
    symbolism: "Fire, tooth, transformation, consumption, spirit descending into form, and the threefold flame.",
    seferYetzirah: { class: "Mother letter", association: "Fire", note: "Shin is one of the three mother letters and is often treated as the fiery pole of the triad." },
    hermeticPath: { attribution: "Fire / Spirit in some Hermetic contexts", tarot: "Judgement or Aeon", path: "Hod to Malkuth in the common Hermetic Tree arrangement", note: "Hermetic systems may treat Shin through fire, spirit, and resurrection symbolism." },
    historical: "Shin descends from a tooth sign and can represent Sh or S depending on pointing and tradition.",
    archiveKeywords: ["shin", "fire", "judgement", "tooth", "spirit"]
  },
  {
    id: "tav",
    form: "ת",
    name: "Tav",
    pronunciation: "TAHV",
    value: 400,
    meaning: "Mark; sign; cross",
    symbolism: "Seal, mark, completion, boundary of manifestation, and the sign placed at the end of a cycle.",
    seferYetzirah: { class: "Double letter", association: "One of the seven double letters; planetary attributions vary by recension.", note: "Tav concludes the standard Hebrew alphabet and carries strong symbolism of completion." },
    hermeticPath: { attribution: "Saturn / Earth in some Hermetic contexts", tarot: "The Universe or World", path: "Yesod to Malkuth in the common Hermetic Tree arrangement", note: "Hermetic tables often treat Tav as the final path into manifestation." },
    historical: "Tav is historically linked with a mark or cross-shaped sign and became Greek tau and Latin T.",
    archiveKeywords: ["tav", "saturn", "world", "mark", "completion"]
  }
];

const scriptStages = [
  {
    period: "Early alphabetic roots",
    date: "2nd millennium BCE",
    title: "Northwest Semitic letter ancestors",
    summary:
      "Hebrew letter names and shapes stand within a wider Northwest Semitic alphabetic family. Several names preserve older pictorial associations such as ox, house, hand, water, or mark.",
    note: "This is the deep historical layer behind the alphabet, not the same thing as later square Hebrew used in books and scrolls."
  },
  {
    period: "Iron Age inscriptions",
    date: "c. 10th-6th century BCE",
    title: "Paleo-Hebrew / Old Hebrew script",
    summary:
      "Ancient Hebrew inscriptions often used a script closely related to Phoenician. Its letter shapes differ noticeably from the square Hebrew familiar from later manuscripts and printed texts.",
    note: "This stage is important for epigraphy and historical study, but it is not the display style used in this explorer."
  },
  {
    period: "Second Temple transition",
    date: "c. 6th-1st century BCE",
    title: "Aramaic square script becomes dominant",
    summary:
      "After imperial Aramaic became influential, Jewish scribal practice increasingly adopted the square script that developed into the Hebrew book hand used today.",
    note: "Most modern Hebrew letters descend visually from this square-script stream."
  },
  {
    period: "Manuscript and scroll hands",
    date: "Late antique-medieval",
    title: "Scribal, Torah, and regional book hands",
    summary:
      "Different Jewish communities developed refined manuscript hands for sacred scrolls, codices, commentaries, and liturgical books. Torah scroll writing follows exacting scribal rules.",
    note: "The parchment panel above is inspired by scroll lettering but remains a web display, not a halakhic scribal model."
  },
  {
    period: "Print and modern Hebrew",
    date: "15th century-present",
    title: "Printed square Hebrew and contemporary forms",
    summary:
      "Printing stabilized many familiar square forms. Modern Hebrew also uses handwritten and cursive forms that can look quite different from printed letters.",
    note: "This explorer prioritizes clear square forms, names, values, and traditional correspondences."
  }
];

const scriptFamilies = [
  {
    title: "Paleo-Hebrew",
    use: "Ancient inscriptions and historical epigraphy",
    description: "Angular early forms related to Phoenician; visually different from modern square Hebrew."
  },
  {
    title: "Square Hebrew",
    use: "Books, prayer, study, and most modern printed Hebrew",
    description: "The standard form most readers recognize today, descended from Aramaic square-script traditions."
  },
  {
    title: "Stam / Torah scroll hand",
    use: "Torah, tefillin, and mezuzah writing by trained scribes",
    description: "A sacred scribal style with crownlets and strict formation rules in traditional contexts."
  },
  {
    title: "Rashi script",
    use: "Commentaries and rabbinic printed works",
    description: "A semi-cursive Sephardic-derived type style commonly used for commentarial text, not actually Rashi's handwriting."
  },
  {
    title: "Modern cursive",
    use: "Everyday handwriting in modern Hebrew",
    description: "Flowing handwritten forms used in daily writing; many letters differ strongly from printed square forms."
  }
];

function relatedEpisodes(letter: HebrewLetterEntry, episodes: Episode[]) {
  const terms = [letter.name, letter.meaning, letter.hermeticPath.attribution, ...letter.archiveKeywords].join(" ").toLowerCase();
  return episodes
    .filter((episode) => {
      const haystack = [episode.title, episode.description, episode.longIntroduction, ...episode.topics].join(" ").toLowerCase();
      return terms.split(/\s+/).some((term) => term.length > 4 && haystack.includes(term));
    })
    .slice(0, 4);
}

function transcriptPassages(letter: HebrewLetterEntry, episodes: Episode[]) {
  const terms = [letter.name, ...letter.archiveKeywords].map((term) => term.toLowerCase());
  return episodes.flatMap((episode) =>
    episode.transcript
      .filter((segment) => terms.some((term) => term.length > 4 && segment.text.toLowerCase().includes(term)))
      .slice(0, 2)
      .map((segment) => ({ episode, segment }))
  ).slice(0, 5);
}

export function HebrewLetterExplorer({ episodes }: { episodes: Episode[] }) {
  const [activeId, setActiveId] = useState("aleph");
  const active = letters.find((letter) => letter.id === activeId) ?? letters[0];
  const episodeMatches = useMemo(() => relatedEpisodes(active, episodes), [active, episodes]);
  const passages = useMemo(() => transcriptPassages(active, episodes), [active, episodes]);

  function speakLetter() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${active.name}. ${active.pronunciation}.`);
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Hebrew alphabet</p>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-3">
          {letters.map((letter) => (
            <button
              key={letter.id}
              type="button"
              className={`focus-ring rounded border p-3 text-center transition ${active.id === letter.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 bg-black/25 text-parchment hover:border-gold/50 hover:text-ivory"}`}
              onClick={() => setActiveId(letter.id)}
            >
              <span className="torah-hebrew-letter block text-4xl leading-none" dir="rtl">{letter.form}</span>
              <span className="mt-2 block text-xs uppercase tracking-[.14em] text-gold">{letter.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-5 rounded border border-gold/15 bg-black/25 p-3 text-xs leading-5 text-limestone">
          Only curated alphabet forms are displayed in this tool. Decorative or arbitrary Hebrew text is intentionally avoided.
        </p>
      </aside>

      <section className="grid gap-5">
        <article className="relative overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(181,146,85,.2),transparent_16rem),linear-gradient(135deg,rgba(122,17,26,.18),transparent_55%)]" />
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.24em] text-gold">Letter {active.value}</p>
              <h2 className="font-manuscript-title mt-3 font-display text-5xl leading-none text-ivory">{active.name}</h2>
              <p className="mt-3 text-parchment">{active.pronunciation} · numerical value {active.value}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="focus-ring rounded border border-gold/30 bg-black/35 p-3 text-gold hover:bg-gold/10" onClick={speakLetter} aria-label={`Play pronunciation for ${active.name}`}>
                <Volume2 size={22} />
              </button>
              <div className="torah-letter-medallion grid size-32 place-items-center rounded border border-gold/35 text-8xl text-ivory" dir="rtl">
                <span className="torah-hebrew-letter torah-hebrew-letter--large">{active.form}</span>
              </div>
            </div>
          </div>
          {active.finalForm ? (
            <p className="mt-5 rounded border border-gold/15 bg-black/25 p-3 text-sm text-parchment">
              Final form: <span className="torah-hebrew-letter mx-2 text-3xl text-ivory" dir="rtl">{active.finalForm}</span> used at the end of a word.
            </p>
          ) : null}
          <p className="mt-5 leading-8 text-parchment">{active.symbolism}</p>
        </article>

        <article className="torah-alphabet-panel rounded border border-gold/25 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.24em] text-brass">Torah-style letter forms</p>
              <h3 className="mt-2 font-display text-3xl text-[#3b0b05]">Scroll hand display</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#5c3620]">
              A parchment-style display inspired by Torah scroll lettering, using only the curated alphabet forms and final forms in this explorer.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-6 lg:grid-cols-11" dir="rtl">
            {letters.map((letter) => (
              <button
                key={`scroll-${letter.id}`}
                type="button"
                className={`focus-ring rounded px-2 py-2 text-center transition ${active.id === letter.id ? "bg-[#3b0b05]/10 shadow-[inset_0_0_0_1px_rgba(59,11,5,.24)]" : "hover:bg-[#3b0b05]/5"}`}
                onClick={() => setActiveId(letter.id)}
              >
                <span className="torah-hebrew-letter block text-5xl leading-none text-[#3b0b05]">{letter.form}</span>
                <span className="mt-2 block text-[0.68rem] uppercase tracking-[.12em] text-[#5c3620]" dir="ltr">{letter.name}</span>
                {letter.finalForm ? (
                  <span className="mt-1 block text-xs text-[#6b3b20]" dir="ltr">
                    final <span className="torah-hebrew-letter text-xl" dir="rtl">{letter.finalForm}</span>
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </article>

        <article className="temple-border rounded p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <Landmark className="text-gold" size={22} strokeWidth={1.25} />
                <p className="text-xs uppercase tracking-[.24em] text-gold">Scripts and history</p>
              </div>
              <h3 className="mt-3 font-display text-3xl text-ivory">How Hebrew letter forms developed</h3>
              <p className="mt-3 leading-7 text-parchment">
                Hebrew has not appeared in only one visual style. Ancient inscriptions, square book hand, Torah scroll writing, rabbinic print styles, and modern handwriting each belong to different historical and practical settings.
              </p>
            </div>
            <div className="rounded border border-gold/20 bg-black/25 p-4 text-sm leading-6 text-limestone lg:max-w-sm">
              The active explorer uses clear square Hebrew forms for readability, then adds a Torah-inspired display layer without presenting it as a substitute for trained scribal writing.
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {scriptFamilies.map((family) => (
              <div key={family.title} className="rounded border border-gold/15 bg-black/25 p-4">
                <h4 className="font-display text-xl text-ivory">{family.title}</h4>
                <p className="mt-2 text-xs uppercase tracking-[.16em] text-gold">{family.use}</p>
                <p className="mt-3 text-sm leading-6 text-parchment">{family.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-4">
            {scriptStages.map((stage, index) => (
              <div key={stage.title} className="relative grid gap-3 rounded border border-gold/15 bg-black/25 p-4 md:grid-cols-[9rem_1fr]">
                <div className="md:border-r md:border-gold/15 md:pr-4">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{stage.period}</p>
                  <p className="mt-2 font-display text-xl text-ivory">{stage.date}</p>
                </div>
                <div className="md:pl-2">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-xs text-gold">{index + 1}</span>
                    <div>
                      <h4 className="font-display text-2xl text-ivory">{stage.title}</h4>
                      <p className="mt-2 leading-7 text-parchment">{stage.summary}</p>
                      <p className="mt-3 rounded border border-gold/10 bg-obsidian/60 p-3 text-sm leading-6 text-limestone">{stage.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          <LetterBlock title="Correct Form and Name" system="Alphabet entry">
            <Detail label="Form" value={active.form} rtl />
            <Detail label="Name" value={active.name} />
            <Detail label="Pronunciation" value={active.pronunciation} />
            <Detail label="Numerical value" value={String(active.value)} />
            <Detail label="Name meaning" value={active.meaning} />
          </LetterBlock>
          <LetterBlock title="Sefer Yetzirah Associations" system="Letter category and received association">
            <Detail label="Class" value={active.seferYetzirah.class} />
            <Detail label="Association" value={active.seferYetzirah.association} />
            <p className="mt-3 text-sm leading-6 text-parchment">{active.seferYetzirah.note}</p>
          </LetterBlock>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <LetterBlock title="Relevant Paths or Correspondences" system="Hermetic path table, identified separately">
            <Detail label="Attribution" value={active.hermeticPath.attribution} />
            <Detail label="Tarot key" value={active.hermeticPath.tarot} />
            <Detail label="Path" value={active.hermeticPath.path} />
            <p className="mt-3 text-sm leading-6 text-parchment">{active.hermeticPath.note}</p>
          </LetterBlock>
          <LetterBlock title="Historical Notes" system="Alphabet history">
            <p className="leading-7 text-parchment">{active.historical}</p>
          </LetterBlock>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <LetterBlock title="Related Archive Content" system="Aetherica episode matches">
            {episodeMatches.length ? (
              <div className="grid gap-2">
                {episodeMatches.map((episode) => (
                  <Link key={episode.slug} href={`/episodes/${episode.slug}`} className="rounded border border-gold/15 bg-black/25 p-3 text-sm text-parchment hover:border-gold/45 hover:text-ivory">
                    {episode.title}
                  </Link>
                ))}
              </div>
            ) : <p className="text-sm text-parchment">No local episode match yet.</p>}
          </LetterBlock>
          <LetterBlock title="Transcript Passages" system="Reviewed transcript matches">
            {passages.length ? (
              <div className="grid gap-3">
                {passages.map(({ episode, segment }) => (
                  <Link key={`${episode.slug}-${segment.id}`} href={`/episodes/${episode.slug}?t=${segment.start}#${segment.id}`} className="rounded border border-gold/15 bg-black/25 p-3 hover:border-gold/45">
                    <p className="text-xs uppercase tracking-[.16em] text-gold">{episode.title}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-parchment">{segment.text}</p>
                  </Link>
                ))}
              </div>
            ) : <p className="text-sm text-parchment">Transcript matches will appear as more reviewed transcripts are attached.</p>}
          </LetterBlock>
        </div>

        <article className="rounded border border-gold/20 bg-black/35 p-4">
          <div className="flex items-start gap-3">
            <BookOpenText className="mt-1 shrink-0 text-gold" size={18} strokeWidth={1.25} />
            <div>
              <h3 className="font-display text-2xl text-ivory">Scholarly Note</h3>
              <p className="mt-2 text-sm leading-6 text-parchment">
                Letter names, values, Sefer Yetzirah categories, and Hermetic path correspondences are related but distinct layers of tradition. This tool identifies the layer being shown instead of presenting every correspondence as though it came from the same source.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

function LetterBlock({ title, system, children }: { title: string; system: string; children: ReactNode }) {
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

function Detail({ label, value, rtl = false }: { label: string; value: string; rtl?: boolean }) {
  return (
    <div className="border-t border-gold/10 py-3 first:border-t-0 first:pt-0">
      <dt className="text-xs uppercase tracking-[.18em] text-gold">{label}</dt>
      <dd className={`mt-1 text-ivory ${rtl ? "torah-hebrew-letter text-4xl" : ""}`} dir={rtl ? "rtl" : undefined}>{value}</dd>
    </div>
  );
}
