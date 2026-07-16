import { planets, type PlanetName } from "./calculations";

export type HebrewLetter = {
  letter: string;
  name: string;
  transliteration: string;
  value: number;
};

export const hebrewLetters: HebrewLetter[] = [
  { letter: "א", name: "Aleph", transliteration: "A", value: 1 },
  { letter: "ב", name: "Beth", transliteration: "B/V", value: 2 },
  { letter: "ג", name: "Gimel", transliteration: "G", value: 3 },
  { letter: "ד", name: "Daleth", transliteration: "D", value: 4 },
  { letter: "ה", name: "Heh", transliteration: "H", value: 5 },
  { letter: "ו", name: "Vav", transliteration: "V/O/U", value: 6 },
  { letter: "ז", name: "Zayin", transliteration: "Z", value: 7 },
  { letter: "ח", name: "Cheth", transliteration: "Ch", value: 8 },
  { letter: "ט", name: "Teth", transliteration: "T", value: 9 },
  { letter: "י", name: "Yod", transliteration: "Y/I", value: 10 },
  { letter: "כ", name: "Kaph", transliteration: "K/Kh", value: 20 },
  { letter: "ך", name: "Kaph final", transliteration: "K/Kh", value: 20 },
  { letter: "ל", name: "Lamed", transliteration: "L", value: 30 },
  { letter: "מ", name: "Mem", transliteration: "M", value: 40 },
  { letter: "ם", name: "Mem final", transliteration: "M", value: 40 },
  { letter: "נ", name: "Nun", transliteration: "N", value: 50 },
  { letter: "ן", name: "Nun final", transliteration: "N", value: 50 },
  { letter: "ס", name: "Samekh", transliteration: "S", value: 60 },
  { letter: "ע", name: "Ayin", transliteration: "A/O", value: 70 },
  { letter: "פ", name: "Peh", transliteration: "P/F", value: 80 },
  { letter: "ף", name: "Peh final", transliteration: "P/F", value: 80 },
  { letter: "צ", name: "Tzaddi", transliteration: "Tz", value: 90 },
  { letter: "ץ", name: "Tzaddi final", transliteration: "Tz", value: 90 },
  { letter: "ק", name: "Qoph", transliteration: "Q/K", value: 100 },
  { letter: "ר", name: "Resh", transliteration: "R", value: 200 },
  { letter: "ש", name: "Shin", transliteration: "Sh/S", value: 300 },
  { letter: "ת", name: "Tav", transliteration: "T/Th", value: 400 }
];

const hebrewByLetter = new Map(hebrewLetters.map((letter) => [letter.letter, letter]));

export function analyzeGematria(input: string) {
  const letters = Array.from(input).map((character) => hebrewByLetter.get(character)).filter(Boolean) as HebrewLetter[];
  return {
    letters,
    total: letters.reduce((sum, letter) => sum + letter.value, 0),
    ignored: Array.from(input).filter((character) => !hebrewByLetter.has(character) && character.trim()).join("")
  };
}

export function transliterateHebrew(input: string) {
  return Array.from(input).map((character) => hebrewByLetter.get(character)?.transliteration ?? character).join("-");
}

export const planetaryCorrespondences: Array<{
  planet: PlanetName;
  colors: string[];
  incense: string[];
  materials: string[];
  cautions: string;
}> = [
  {
    planet: "Saturn",
    colors: ["black", "deep indigo", "lead grey"],
    incense: ["myrrh", "storax", "cypress"],
    materials: ["lead", "onyx", "ironwood"],
    cautions: "Work slowly and avoid intensifying melancholy or severity."
  },
  {
    planet: "Jupiter",
    colors: ["royal blue", "purple", "gold"],
    incense: ["cedar", "saffron", "nutmeg"],
    materials: ["tin", "lapis", "oak"],
    cautions: "Temper expansion with practical limits and ethical generosity."
  },
  {
    planet: "Mars",
    colors: ["red", "iron rust", "scarlet"],
    incense: ["dragon's blood", "pepper", "tobacco"],
    materials: ["iron", "garnet", "nettle"],
    cautions: "Avoid needless aggression; direct force toward protection or purification."
  },
  {
    planet: "Sun",
    colors: ["gold", "yellow", "white"],
    incense: ["frankincense", "cinnamon", "bay"],
    materials: ["gold", "citrine", "laurel"],
    cautions: "Center vitality without sliding into vanity or domination."
  },
  {
    planet: "Venus",
    colors: ["green", "rose", "copper"],
    incense: ["rose", "sandalwood", "benzoin"],
    materials: ["copper", "emerald", "myrtle"],
    cautions: "Let harmony include consent, clarity, and good boundaries."
  },
  {
    planet: "Mercury",
    colors: ["orange", "yellow", "iridescent grey"],
    incense: ["mastic", "lavender", "fennel"],
    materials: ["mercury symbols", "agate", "hazel"],
    cautions: "Balance quickness with accuracy; avoid cleverness without care."
  },
  {
    planet: "Moon",
    colors: ["silver", "white", "pale blue"],
    incense: ["jasmine", "camphor", "mugwort"],
    materials: ["silver", "moonstone", "willow"],
    cautions: "Use receptivity with grounding when emotion or imagination is high."
  }
];

export function planetWithCorrespondences(planet: PlanetName) {
  return {
    ...planets[planet],
    ...planetaryCorrespondences.find((entry) => entry.planet === planet)!
  };
}
