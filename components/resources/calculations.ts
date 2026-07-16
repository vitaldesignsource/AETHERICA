export type SolarTimes = {
  sunrise: number;
  sunset: number;
};

export type PlanetName = "Saturn" | "Jupiter" | "Mars" | "Sun" | "Venus" | "Mercury" | "Moon";

export type TattvaName = "Akasha" | "Vayu" | "Tejas" | "Apas" | "Prithivi";

export type TimeBlock<T extends string = string> = {
  index: number;
  name: T;
  subName?: T;
  start: number;
  end: number;
  phase?: "day" | "night";
};

const dayRulers: PlanetName[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
const chaldeanOrder: PlanetName[] = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];

export const planets: Record<PlanetName, { glyph: string; color: string; activities: string[]; quality: string }> = {
  Saturn: {
    glyph: "♄",
    color: "#7f8388",
    quality: "Boundaries, endurance, structure, discipline, and sober judgment.",
    activities: ["Long-term planning", "Protection", "Study of limits", "Ancestral work", "Contracts", "Solitude"]
  },
  Jupiter: {
    glyph: "♃",
    color: "#b59255",
    quality: "Expansion, counsel, prosperity, mercy, teaching, and lawful increase.",
    activities: ["Teaching", "Blessings", "Legal matters", "Generosity", "Leadership", "Growth"]
  },
  Mars: {
    glyph: "♂",
    color: "#9b1d22",
    quality: "Force, courage, conflict, cutting away, heat, and decisive action.",
    activities: ["Courage work", "Defense", "Exercise", "Severing", "Assertive action", "Purification by fire"]
  },
  Sun: {
    glyph: "☉",
    color: "#d6ad5d",
    quality: "Vitality, clarity, kingship, visibility, health, and centered purpose.",
    activities: ["Consecration", "Healing", "Public work", "Authority", "Clarity", "Creative vitality"]
  },
  Venus: {
    glyph: "♀",
    color: "#9f7fb5",
    quality: "Harmony, affection, beauty, pleasure, attraction, and reconciliation.",
    activities: ["Art", "Friendship", "Reconciliation", "Adornment", "Music", "Attraction"]
  },
  Mercury: {
    glyph: "☿",
    color: "#b8a36f",
    quality: "Writing, study, communication, commerce, divination, and learning.",
    activities: ["Writing", "Study", "Communication", "Commerce", "Divination", "Negotiation"]
  },
  Moon: {
    glyph: "☽",
    color: "#c9d2db",
    quality: "Dreams, memory, tides, receptivity, travel, reflection, and change.",
    activities: ["Dreamwork", "Reflection", "Travel", "Household matters", "Water rites", "Memory"]
  }
};

export const tattvas: Record<TattvaName, { symbol: string; element: string; color: string; quality: string; activities: string[]; caution: string }> = {
  Akasha: {
    symbol: "◯",
    element: "Aether",
    color: "#1b1530",
    quality: "Space, subtle perception, listening, silence, and opening.",
    activities: ["Meditation", "Prayer", "Contemplation", "Dream notes", "Silence"],
    caution: "Balance spaciousness with grounding if attention feels diffuse."
  },
  Vayu: {
    symbol: "✧",
    element: "Air",
    color: "#8da3ad",
    quality: "Movement, breath, thought, motion, message, and circulation.",
    activities: ["Breath work", "Writing", "Correspondence", "Study", "Movement"],
    caution: "Balance quickness with steadiness before making commitments."
  },
  Tejas: {
    symbol: "△",
    element: "Fire",
    color: "#a42122",
    quality: "Heat, will, illumination, courage, digestion, and transformation.",
    activities: ["Action", "Consecration", "Exercise", "Cutting through confusion", "Creative fire"],
    caution: "Balance intensity with mercy, rest, and measured speech."
  },
  Apas: {
    symbol: "☾",
    element: "Water",
    color: "#4f87a3",
    quality: "Fluidity, devotion, feeling, cohesion, cleansing, and memory.",
    activities: ["Cleansing", "Devotional work", "Music", "Reconciliation", "Journaling"],
    caution: "Balance receptivity with clear boundaries."
  },
  Prithivi: {
    symbol: "□",
    element: "Earth",
    color: "#a57a3d",
    quality: "Form, stability, matter, patience, craft, embodiment, and endurance.",
    activities: ["Craft", "Material planning", "Organization", "Grounding", "Garden or body care"],
    caution: "Balance stability with enough movement to avoid stagnation."
  }
};

const tattvaOrder: TattvaName[] = ["Akasha", "Vayu", "Tejas", "Apas", "Prithivi"];

function dayOfYear(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start;
  return Math.floor(diff / 86400000);
}

function normalizeMinutes(minutes: number) {
  return ((minutes % 1440) + 1440) % 1440;
}

function solarEvent(date: Date, latitude: number, longitude: number, timezoneOffset: number, isSunrise: boolean) {
  const zenith = 90.833;
  const lngHour = longitude / 15;
  const n = dayOfYear(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())));
  const approximate = n + ((isSunrise ? 6 : 18) - lngHour) / 24;
  const meanAnomaly = (0.9856 * approximate) - 3.289;
  const trueLongitude = normalizeDegrees(meanAnomaly + (1.916 * Math.sin(degToRad(meanAnomaly))) + (0.02 * Math.sin(degToRad(2 * meanAnomaly))) + 282.634);
  let rightAscension = radToDeg(Math.atan(0.91764 * Math.tan(degToRad(trueLongitude))));
  rightAscension = normalizeDegrees(rightAscension);
  rightAscension += Math.floor(trueLongitude / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;
  const sinDec = 0.39782 * Math.sin(degToRad(trueLongitude));
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosHour = (Math.cos(degToRad(zenith)) - (sinDec * Math.sin(degToRad(latitude)))) / (cosDec * Math.cos(degToRad(latitude)));
  if (cosHour > 1 || cosHour < -1) return null;
  const hourAngle = isSunrise ? 360 - radToDeg(Math.acos(cosHour)) : radToDeg(Math.acos(cosHour));
  const localMeanTime = (hourAngle / 15) + rightAscension - (0.06571 * approximate) - 6.622;
  const universalTime = localMeanTime - lngHour;
  return normalizeMinutes((universalTime + timezoneOffset) * 60);
}

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function degToRad(value: number) {
  return value * Math.PI / 180;
}

function radToDeg(value: number) {
  return value * 180 / Math.PI;
}

export function calculateSolarTimes(date: Date, latitude: number, longitude: number, timezoneOffset: number): SolarTimes {
  const sunrise = solarEvent(date, latitude, longitude, timezoneOffset, true);
  const sunset = solarEvent(date, latitude, longitude, timezoneOffset, false);
  return {
    sunrise: sunrise ?? 360,
    sunset: sunset ?? 1080
  };
}

export function formatClock(minutes: number, mode: "12" | "24" = "12") {
  const normalized = normalizeMinutes(minutes);
  const hour = Math.floor(normalized / 60);
  const minute = Math.floor(normalized % 60);
  if (mode === "24") return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatDuration(minutes: number) {
  const safe = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  if (!hours) return `${mins} min`;
  return `${hours} hr ${mins} min`;
}

export function parseClock(value: string) {
  const [hour = "0", minute = "0"] = value.split(":");
  return Number(hour) * 60 + Number(minute);
}

export function dayRuler(date: Date) {
  return dayRulers[date.getDay()];
}

export function planetaryHours(date: Date, latitude: number, longitude: number, timezoneOffset: number) {
  const today = calculateSolarTimes(date, latitude, longitude, timezoneOffset);
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  const nextDay = calculateSolarTimes(tomorrow, latitude, longitude, timezoneOffset);
  const ruler = dayRuler(date);
  const startIndex = chaldeanOrder.indexOf(ruler);
  const dayLength = today.sunset - today.sunrise;
  const nightLength = (1440 - today.sunset) + nextDay.sunrise;
  const dayHours = Array.from({ length: 12 }, (_, index) => {
    const start = today.sunrise + index * (dayLength / 12);
    return {
      index: index + 1,
      name: chaldeanOrder[(startIndex + index) % chaldeanOrder.length],
      start,
      end: today.sunrise + (index + 1) * (dayLength / 12),
      phase: "day" as const
    };
  });
  const nightHours = Array.from({ length: 12 }, (_, index) => {
    const start = today.sunset + index * (nightLength / 12);
    return {
      index: index + 13,
      name: chaldeanOrder[(startIndex + 12 + index) % chaldeanOrder.length],
      start,
      end: today.sunset + (index + 1) * (nightLength / 12),
      phase: "night" as const
    };
  });
  return { ruler, sunrise: today.sunrise, sunset: today.sunset, nextSunrise: 1440 + nextDay.sunrise, hours: [...dayHours, ...nightHours] };
}

export function activeBlock<T extends string>(blocks: TimeBlock<T>[], currentMinutes: number) {
  const current = currentMinutes < blocks[0].start ? currentMinutes + 1440 : currentMinutes;
  const index = blocks.findIndex((block) => current >= block.start && current < block.end);
  const activeIndex = index >= 0 ? index : 0;
  return {
    current: blocks[activeIndex],
    previous: blocks[(activeIndex - 1 + blocks.length) % blocks.length],
    next: blocks[(activeIndex + 1) % blocks.length],
    remaining: Math.max(0, blocks[activeIndex].end - current)
  };
}

export function tattvicTides(startMinute: number, currentMinute: number, primaryDuration: number, includeSubTattvas: boolean): TimeBlock<TattvaName>[] {
  const blocks: TimeBlock<TattvaName>[] = [];
  const subDuration = primaryDuration / 5;
  for (let index = 0; index < Math.ceil(1440 / primaryDuration) + 2; index += 1) {
    const primaryStart = startMinute + index * primaryDuration;
    const primary = tattvaOrder[index % tattvaOrder.length];
    if (includeSubTattvas) {
      for (let subIndex = 0; subIndex < 5; subIndex += 1) {
        const subStart = primaryStart + subIndex * subDuration;
        blocks.push({
          index: blocks.length + 1,
          name: primary,
          subName: tattvaOrder[subIndex],
          start: subStart,
          end: subStart + subDuration
        });
      }
    } else {
      blocks.push({
        index: blocks.length + 1,
        name: primary,
        start: primaryStart,
        end: primaryStart + primaryDuration
      });
    }
  }
  const current = currentMinute < startMinute ? currentMinute + 1440 : currentMinute;
  return blocks.filter((block) => block.end > current - 720 && block.start < current + 1440);
}
