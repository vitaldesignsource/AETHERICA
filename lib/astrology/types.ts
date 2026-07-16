export type Planet = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn";

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface SelectedLocation {
  label: string;
  city: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PlanetPosition {
  planet: Planet;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  longitude: number;
  dailyMotion?: number;
  retrograde?: boolean;
  dignityScore?: number;
  dignityLabel?: string;
}

export interface LiveSkySnapshot {
  calculatedAt: string;
  location?: SelectedLocation;
  moonPhase?: string;
  moonIllumination?: number;
  ascendant?: string;
  planetaryHour?: Planet;
  sect?: "diurnal" | "nocturnal" | "unknown";
  positions: PlanetPosition[];
}

export interface CastChartInput {
  name?: string;
  location?: SelectedLocation;
  date: string;
  time?: string;
  unknownTime: boolean;
}

export interface CastChartResult {
  input: CastChartInput;
  positions: PlanetPosition[];
  houses?: Array<{
    house: number;
    sign: ZodiacSign;
    degree: number;
  }>;
  aspects?: Array<{
    from: Planet;
    to: Planet;
    aspect: string;
    orb: number;
  }>;
  lots?: Array<{
    name: string;
    sign: ZodiacSign;
    degree: number;
    minute: number;
  }>;
  sect?: "diurnal" | "nocturnal" | "unknown";
}

export interface AstrologyAssistantContext {
  source: "celestial-instrument";
  tool: "live-sky" | "chart-caster" | "planetary-hours" | "episode-timing" | "electional-gates";
  snapshot: LiveSkySnapshot | CastChartResult | unknown;
  userPrompt: string;
}

export type GateStatus = "pass" | "warning" | "fail";

export interface ElectionalGateResult {
  label: string;
  status: GateStatus;
  detail: string;
}
