import { calculateSolarTimes, dayRuler, type PlanetName } from "./calculations";

export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export const zodiacSigns: Array<{ name: ZodiacSign; glyph: string; element: string; mode: string }> = [
  { name: "Aries", glyph: "♈︎", element: "Fire", mode: "Cardinal" },
  { name: "Taurus", glyph: "♉︎", element: "Earth", mode: "Fixed" },
  { name: "Gemini", glyph: "♊︎", element: "Air", mode: "Mutable" },
  { name: "Cancer", glyph: "♋︎", element: "Water", mode: "Cardinal" },
  { name: "Leo", glyph: "♌︎", element: "Fire", mode: "Fixed" },
  { name: "Virgo", glyph: "♍︎", element: "Earth", mode: "Mutable" },
  { name: "Libra", glyph: "♎︎", element: "Air", mode: "Cardinal" },
  { name: "Scorpio", glyph: "♏︎", element: "Water", mode: "Fixed" },
  { name: "Sagittarius", glyph: "♐︎", element: "Fire", mode: "Mutable" },
  { name: "Capricorn", glyph: "♑︎", element: "Earth", mode: "Cardinal" },
  { name: "Aquarius", glyph: "♒︎", element: "Air", mode: "Fixed" },
  { name: "Pisces", glyph: "♓︎", element: "Water", mode: "Mutable" }
];

export const fixedStars = [
  {
    name: "Aldebaran",
    longitude: 70,
    constellation: "Taurus",
    nature: "Royal star of the East; traditionally associated with courage, integrity, heat, and martial visibility."
  },
  {
    name: "Regulus",
    longitude: 150,
    constellation: "Leo",
    nature: "Royal star of the North; traditionally associated with sovereignty, honor, fame, and the ethics of power."
  },
  {
    name: "Spica",
    longitude: 204,
    constellation: "Virgo",
    nature: "Traditionally associated with gifts, learning, skill, harvest, protection, and fortunate refinement."
  },
  {
    name: "Antares",
    longitude: 250,
    constellation: "Scorpio",
    nature: "Royal star of the West; traditionally associated with intensity, contest, passion, and transformative force."
  },
  {
    name: "Fomalhaut",
    longitude: 334,
    constellation: "Piscis Austrinus",
    nature: "Royal star of the South; traditionally associated with vision, devotion, ideals, and spiritual imagination."
  },
  {
    name: "Sirius",
    longitude: 104,
    constellation: "Canis Major",
    nature: "Traditionally associated with brilliance, devotion, heat, guardianship, and eminent visibility."
  }
];

const moonMansionNames = [
  "Al Sharatain",
  "Al Butain",
  "Al Thurayya",
  "Al Dabaran",
  "Al Haqah",
  "Al Hanah",
  "Al Dhira",
  "Al Nathrah",
  "Al Tarf",
  "Al Jabhah",
  "Al Zubrah",
  "Al Sarfah",
  "Al Awwa",
  "Al Simak",
  "Al Ghafr",
  "Al Jubana",
  "Iklil al Jabhah",
  "Al Qalb",
  "Al Shaulah",
  "Al Naaim",
  "Al Baldah",
  "Saad al Dhabi",
  "Saad Bula",
  "Saad al Saud",
  "Saad al Ahbiyah",
  "Al Fargh al Awwal",
  "Al Fargh al Thani",
  "Batn al Hut"
];

const decanRulers: PlanetName[] = [
  "Mars", "Sun", "Venus",
  "Mercury", "Moon", "Saturn",
  "Jupiter", "Mars", "Sun",
  "Venus", "Mercury", "Moon",
  "Saturn", "Jupiter", "Mars",
  "Sun", "Venus", "Mercury",
  "Moon", "Saturn", "Jupiter",
  "Mars", "Sun", "Venus",
  "Mercury", "Moon", "Saturn",
  "Jupiter", "Mars", "Sun",
  "Venus", "Mercury", "Moon",
  "Saturn", "Jupiter", "Mars"
];

export function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function daysSinceJ2000(date: Date) {
  return (date.getTime() - Date.UTC(2000, 0, 1, 12)) / 86400000;
}

function degToRad(value: number) {
  return value * Math.PI / 180;
}

export function zodiacPosition(longitude: number) {
  const normalized = normalizeDegrees(longitude);
  const signIndex = Math.floor(normalized / 30);
  const degree = normalized - (signIndex * 30);
  return {
    longitude: normalized,
    signIndex,
    sign: zodiacSigns[signIndex],
    degree,
    display: `${Math.floor(degree)}° ${String(Math.floor((degree % 1) * 60)).padStart(2, "0")}′ ${zodiacSigns[signIndex].name}`
  };
}

export function approximateSolarLongitude(date: Date) {
  const n = daysSinceJ2000(date);
  const meanLongitude = normalizeDegrees(280.460 + 0.9856474 * n);
  const meanAnomaly = normalizeDegrees(357.528 + 0.9856003 * n);
  return normalizeDegrees(meanLongitude + 1.915 * Math.sin(degToRad(meanAnomaly)) + 0.02 * Math.sin(degToRad(2 * meanAnomaly)));
}

export function approximateMoonLongitude(date: Date) {
  const n = daysSinceJ2000(date);
  const meanLongitude = normalizeDegrees(218.316 + 13.176396 * n);
  const meanAnomaly = normalizeDegrees(134.963 + 13.064993 * n);
  return normalizeDegrees(meanLongitude + 6.289 * Math.sin(degToRad(meanAnomaly)));
}

export function moonPhase(date: Date) {
  const synodicMonth = 29.530588853;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const days = (date.getTime() - knownNewMoon) / 86400000;
  const age = ((days % synodicMonth) + synodicMonth) % synodicMonth;
  const fraction = age / synodicMonth;
  const illumination = (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  const names = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent"
  ];
  const nameIndex = Math.round(fraction * 8) % 8;
  const nextNewMoon = new Date(date.getTime() + (synodicMonth - age) * 86400000);
  const nextFullMoon = new Date(date.getTime() + (((synodicMonth / 2 - age) + synodicMonth) % synodicMonth) * 86400000);
  return {
    age,
    fraction,
    illumination,
    name: names[nameIndex],
    nextNewMoon,
    nextFullMoon
  };
}

export function lunarMansion(date: Date) {
  const longitude = approximateMoonLongitude(date);
  const mansionSpan = 360 / 28;
  const mansionIndex = Math.floor(longitude / mansionSpan);
  const start = mansionIndex * mansionSpan;
  const progress = (longitude - start) / mansionSpan;
  return {
    index: mansionIndex + 1,
    name: moonMansionNames[mansionIndex],
    longitude,
    position: zodiacPosition(longitude),
    progress
  };
}

export function decanForLongitude(longitude: number) {
  const position = zodiacPosition(longitude);
  const decanWithinSign = Math.floor(position.degree / 10);
  const globalDecan = position.signIndex * 3 + decanWithinSign;
  return {
    index: globalDecan + 1,
    sign: position.sign,
    degree: position.degree,
    decanWithinSign: decanWithinSign + 1,
    ruler: decanRulers[globalDecan],
    range: `${decanWithinSign * 10}°-${(decanWithinSign + 1) * 10}° ${position.sign.name}`,
    position
  };
}

export function planetaryDay(date: Date) {
  return dayRuler(date);
}

export function zodiacalHourCycle(date: Date, latitude: number, longitude: number, timezoneOffset: number) {
  const solar = calculateSolarTimes(date, latitude, longitude, timezoneOffset);
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  const nextSolar = calculateSolarTimes(tomorrow, latitude, longitude, timezoneOffset);
  const startSignIndex = zodiacPosition(approximateSolarLongitude(date)).signIndex;
  const cycleLength = (1440 - solar.sunrise) + nextSolar.sunrise;
  return Array.from({ length: 12 }, (_, index) => {
    const start = solar.sunrise + index * (cycleLength / 12);
    const end = solar.sunrise + (index + 1) * (cycleLength / 12);
    const sign = zodiacSigns[(startSignIndex + index) % zodiacSigns.length];
    return {
      index: index + 1,
      sign,
      start,
      end
    };
  });
}

export function activeZodiacalHour(hours: ReturnType<typeof zodiacalHourCycle>, minute: number) {
  const expandedMinute = minute < hours[0].start ? minute + 1440 : minute;
  return hours.find((hour) => expandedMinute >= hour.start && expandedMinute < hour.end) || hours[0];
}

export type ElectionFocus = "Study" | "Prosperity" | "Protection" | "Devotion" | "Creative Work" | "Ritual Action";

const focusPlanets: Record<ElectionFocus, PlanetName[]> = {
  Study: ["Mercury", "Jupiter", "Moon"],
  Prosperity: ["Jupiter", "Venus", "Sun"],
  Protection: ["Saturn", "Mars", "Moon"],
  Devotion: ["Venus", "Moon", "Jupiter"],
  "Creative Work": ["Sun", "Venus", "Mercury"],
  "Ritual Action": ["Sun", "Mars", "Jupiter"]
};

export function electionCandidates(startDate: Date, focus: ElectionFocus) {
  const desiredPlanets = focusPlanets[focus];
  return Array.from({ length: 10 }, (_, index) => {
    const candidateDate = new Date(startDate);
    candidateDate.setDate(startDate.getDate() + index);
    const ruler = planetaryDay(candidateDate);
    const phase = moonPhase(candidateDate);
    const mansion = lunarMansion(candidateDate);
    const moonSign = zodiacPosition(approximateMoonLongitude(candidateDate)).sign;
    const score = [
      desiredPlanets.includes(ruler) ? 2 : 0,
      phase.fraction > 0.03 && phase.fraction < 0.5 ? 1 : 0,
      ["Fire", "Air"].includes(moonSign.element) ? 1 : 0,
      mansion.progress < 0.85 ? 1 : 0
    ].reduce((total, value) => total + value, 0);

    return {
      date: candidateDate,
      ruler,
      phase,
      mansion,
      moonSign,
      score,
      reason: desiredPlanets.includes(ruler)
        ? `Planetary day agrees with ${focus.toLowerCase()} work.`
        : `Consider pairing with a ${desiredPlanets[0]} planetary hour.`
    };
  }).sort((a, b) => b.score - a.score || a.date.getTime() - b.date.getTime());
}

export function starContacts(date: Date) {
  const sun = approximateSolarLongitude(date);
  const moon = approximateMoonLongitude(date);
  return fixedStars.map((star) => {
    const sunDistance = angularDistance(sun, star.longitude);
    const moonDistance = angularDistance(moon, star.longitude);
    const closest = sunDistance <= moonDistance ? "Sun" : "Moon";
    const distance = Math.min(sunDistance, moonDistance);
    return {
      ...star,
      position: zodiacPosition(star.longitude),
      closest,
      distance
    };
  }).sort((a, b) => a.distance - b.distance);
}

function angularDistance(a: number, b: number) {
  const diff = Math.abs(normalizeDegrees(a) - normalizeDegrees(b));
  return Math.min(diff, 360 - diff);
}
