import { dayRuler, formatClock, planetaryHours, type PlanetName } from "@/components/resources/calculations";
import type { CastChartInput, CastChartResult, ElectionalGateResult, LiveSkySnapshot, Planet, PlanetPosition, SelectedLocation, ZodiacSign } from "./types";

export const planetGlyphs: Record<Planet, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄"
};

export const zodiacGlyphs: Record<ZodiacSign, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓"
};

export const planetLabels: Record<Planet, string> = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn"
};

export const signLabels: Record<ZodiacSign, string> = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces"
};

const signs = Object.keys(signLabels) as ZodiacSign[];
const planets = Object.keys(planetLabels) as Planet[];
const orbitalApproximation: Record<Planet, { start: number; speed: number }> = {
  sun: { start: 280, speed: 0.985647 },
  moon: { start: 218, speed: 13.1764 },
  mercury: { start: 300, speed: 1.32 },
  venus: { start: 250, speed: 1.18 },
  mars: { start: 120, speed: 0.524 },
  jupiter: { start: 20, speed: 0.083 },
  saturn: { start: 310, speed: 0.033 }
};

const planetNameMap: Record<PlanetName, Planet> = {
  Sun: "sun",
  Moon: "moon",
  Mercury: "mercury",
  Venus: "venus",
  Mars: "mars",
  Jupiter: "jupiter",
  Saturn: "saturn"
};

export const locationSuggestions: SelectedLocation[] = [
  { label: "Denver, Colorado, United States", city: "Denver", region: "Colorado", country: "United States", latitude: 39.7392, longitude: -104.9903, timezone: "America/Denver" },
  { label: "Chicago, Illinois, United States", city: "Chicago", region: "Illinois", country: "United States", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago" },
  { label: "New York City, New York, United States", city: "New York City", region: "New York", country: "United States", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York" },
  { label: "Los Angeles, California, United States", city: "Los Angeles", region: "California", country: "United States", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles" },
  { label: "London, England, United Kingdom", city: "London", region: "England", country: "United Kingdom", latitude: 51.5072, longitude: -0.1276, timezone: "Europe/London" },
  { label: "Athens, Attica, Greece", city: "Athens", region: "Attica", country: "Greece", latitude: 37.9838, longitude: 23.7275, timezone: "Europe/Athens" },
  { label: "Jerusalem, Israel", city: "Jerusalem", country: "Israel", latitude: 31.7683, longitude: 35.2137, timezone: "Asia/Jerusalem" },
  { label: "Cairo, Egypt", city: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo" },
  { label: "Tokyo, Japan", city: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" }
];

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function dateSeed(date: Date) {
  return date.getTime() / 86400000;
}

function longitudeToPosition(planet: Planet, longitude: number): PlanetPosition {
  const normalized = normalizeDegrees(longitude);
  const signIndex = Math.floor(normalized / 30);
  const signDegree = normalized - signIndex * 30;
  const degree = Math.floor(signDegree);
  const minute = Math.floor((signDegree - degree) * 60);
  const retrograde = planet !== "sun" && planet !== "moon" && Math.sin((dateSeed(new Date()) + normalized) / 38) < -0.72;
  const dignityScore = dignityFor(planet, signs[signIndex]);
  return {
    planet,
    sign: signs[signIndex],
    degree,
    minute,
    longitude: Number(normalized.toFixed(3)),
    dailyMotion: Number((orbitalApproximation[planet].speed * (retrograde ? -0.42 : 1)).toFixed(2)),
    retrograde,
    dignityScore,
    dignityLabel: dignityScore > 1 ? "dignified" : dignityScore < -1 ? "challenged" : "mixed"
  };
}

function dignityFor(planet: Planet, sign: ZodiacSign) {
  const rulers: Record<Planet, ZodiacSign[]> = {
    sun: ["leo"],
    moon: ["cancer"],
    mercury: ["gemini", "virgo"],
    venus: ["taurus", "libra"],
    mars: ["aries", "scorpio"],
    jupiter: ["sagittarius", "pisces"],
    saturn: ["capricorn", "aquarius"]
  };
  const falls: Record<Planet, ZodiacSign[]> = {
    sun: ["libra", "aquarius"],
    moon: ["scorpio", "capricorn"],
    mercury: ["sagittarius", "pisces"],
    venus: ["aries", "scorpio", "virgo"],
    mars: ["taurus", "libra", "cancer"],
    jupiter: ["gemini", "virgo", "capricorn"],
    saturn: ["cancer", "leo", "aries"]
  };
  if (rulers[planet].includes(sign)) return 2;
  if (falls[planet].includes(sign)) return -2;
  return 0;
}

export function calculateMockPositions(date: Date): PlanetPosition[] {
  // TODO: Replace this deterministic approximation with Swiss Ephemeris, astronomy-engine,
  // or the project's eventual validated astrology adapter. Do not use this for exact charts.
  return planets.map((planet) => longitudeToPosition(planet, orbitalApproximation[planet].start + dateSeed(date) * orbitalApproximation[planet].speed));
}

export function calculateLiveSky(date: Date, location?: SelectedLocation): LiveSkySnapshot {
  const positions = calculateMockPositions(date);
  const moon = positions.find((position) => position.planet === "moon");
  const sun = positions.find((position) => position.planet === "sun");
  const separation = moon && sun ? normalizeDegrees(moon.longitude - sun.longitude) : 0;
  const illumination = Math.round(((1 - Math.cos(separation * Math.PI / 180)) / 2) * 100);
  const moonPhase = separation < 45 ? "New crescent" : separation < 135 ? "Waxing half" : separation < 225 ? "Full / disseminating" : separation < 315 ? "Waning half" : "Dark Moon";
  const minute = date.getHours() * 60 + date.getMinutes();
  const planetary = location ? planetaryHours(date, location.latitude, location.longitude, -date.getTimezoneOffset() / 60) : undefined;
  const active = planetary?.hours.find((hour) => minute >= hour.start && minute < hour.end);
  const hourPlanet = active ? planetNameMap[active.name] : undefined;
  return {
    calculatedAt: date.toISOString(),
    location,
    moonPhase,
    moonIllumination: illumination,
    ascendant: location ? `${zodiacGlyphs[signs[Math.floor(normalizeDegrees(date.getHours() * 15 + location.longitude) / 30)]]} ${signLabels[signs[Math.floor(normalizeDegrees(date.getHours() * 15 + location.longitude) / 30)]]}` : undefined,
    planetaryHour: hourPlanet,
    sect: date.getHours() >= 6 && date.getHours() < 18 ? "diurnal" : "nocturnal",
    positions
  };
}

export function castMockChart(input: CastChartInput): CastChartResult {
  const time = input.unknownTime ? "12:00" : input.time || "12:00";
  const date = new Date(`${input.date}T${time}:00`);
  const positions = calculateMockPositions(date);
  const houses = input.unknownTime || !input.location ? undefined : Array.from({ length: 12 }, (_, index) => ({
    house: index + 1,
    sign: signs[(index + Math.floor(normalizeDegrees(date.getHours() * 15 + input.location!.longitude) / 30)) % signs.length],
    degree: (index * 3) % 30
  }));
  return {
    input,
    positions,
    houses,
    sect: input.unknownTime ? "unknown" : date.getHours() >= 6 && date.getHours() < 18 ? "diurnal" : "nocturnal",
    aspects: [
      { from: "moon", to: "sun", aspect: "phase relationship", orb: 3.2 },
      { from: "mercury", to: "jupiter", aspect: "symbolic trine", orb: 5.1 }
    ],
    lots: input.unknownTime ? [] : [
      { name: "Lot of Fortune", sign: positions[1].sign, degree: positions[1].degree, minute: positions[1].minute },
      { name: "Lot of Spirit", sign: positions[0].sign, degree: positions[0].degree, minute: positions[0].minute }
    ]
  };
}

export function calculatePlanetaryHourRows(date: Date, location?: SelectedLocation) {
  if (!location) return undefined;
  const timezoneOffset = -date.getTimezoneOffset() / 60;
  const calculation = planetaryHours(date, location.latitude, location.longitude, timezoneOffset);
  return {
    ...calculation,
    sunriseLabel: formatClock(calculation.sunrise),
    sunsetLabel: formatClock(calculation.sunset),
    dayRuler: dayRuler(date)
  };
}

export function calculateElectionalGates(date: Date, planet: Planet, operation: string, location?: SelectedLocation): ElectionalGateResult[] {
  const position = calculateMockPositions(date).find((item) => item.planet === planet);
  const hourRows = calculatePlanetaryHourRows(date, location);
  const currentMinute = date.getHours() * 60 + date.getMinutes();
  const currentHour = hourRows?.hours.find((hour) => currentMinute >= hour.start && currentMinute < hour.end);
  return [
    {
      label: "Planetary condition",
      status: position?.retrograde ? "warning" : "pass",
      detail: position?.retrograde ? `${planetLabels[planet]} appears retrograde in this mock adapter.` : `${planetLabels[planet]} is direct in the current calculation.`
    },
    {
      label: "Essential dignity",
      status: (position?.dignityScore ?? 0) < 0 ? "warning" : "pass",
      detail: `${planetLabels[planet]} is ${position?.dignityLabel ?? "mixed"} in ${position ? signLabels[position.sign] : "the selected sign"}.`
    },
    {
      label: "Planetary hour alignment",
      status: currentHour && planetNameMap[currentHour.name] === planet ? "pass" : location ? "warning" : "fail",
      detail: location ? `Current local hour: ${currentHour?.name ?? "unknown"}.` : "Choose a location to evaluate planetary hour support."
    },
    {
      label: "Operation fit",
      status: operation === "publication/release" && planet === "mercury" ? "pass" : "warning",
      detail: `The selected operation is ${operation}; use the result as symbolic planning context.`
    }
  ];
}

export function formatPosition(position: PlanetPosition) {
  return `${zodiacGlyphs[position.sign]} ${position.degree}°${String(position.minute).padStart(2, "0")}′ ${signLabels[position.sign]}`;
}
