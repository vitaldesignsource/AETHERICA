import Link from "next/link";

/**
 * The working atlas of the astrology page: glyphs, house systems, chart shapes, and the
 * correspondence spine, each cross-linked to the archive's instruments.
 *
 * Server component; every diagram is inline SVG computed at render. The wheels are schematic —
 * they show HOW each system divides the circle, not a cast chart — and say so in the copy.
 */

const PLANET_GLYPHS = [
  { glyph: "☉\uFE0E", name: "Sun", meaning: "The luminary of day; vitality, sovereignty, the visible self" },
  { glyph: "☽\uFE0E", name: "Moon", meaning: "The luminary of night; body, memory, the daily life" },
  { glyph: "☿\uFE0E", name: "Mercury", meaning: "Speech, exchange, craft — the go-between" },
  { glyph: "♀\uFE0E", name: "Venus", meaning: "Concord, beauty, desire — the lesser benefic" },
  { glyph: "♂\uFE0E", name: "Mars", meaning: "Severance, courage, heat — the lesser malefic" },
  { glyph: "♃\uFE0E", name: "Jupiter", meaning: "Increase, counsel, law — the greater benefic" },
  { glyph: "♄\uFE0E", name: "Saturn", meaning: "Limit, time, structure — the greater malefic" },
  { glyph: "♅\uFE0E", name: "Uranus", meaning: "Modern: rupture and invention (1781)" },
  { glyph: "♆\uFE0E", name: "Neptune", meaning: "Modern: dissolution and glamour (1846)" },
  { glyph: "♇\uFE0E", name: "Pluto", meaning: "Modern: the underworld register (1930)" },
  { glyph: "☊\uFE0E", name: "North Node", meaning: "The Moon's ascending crossing; increase, appetite" },
  { glyph: "☋\uFE0E", name: "South Node", meaning: "The descending crossing; release, depletion" }
];

const SIGN_GLYPHS = [
  { glyph: "♈\uFE0E", name: "Aries", quality: "Cardinal fire", ruler: "Mars" },
  { glyph: "♉\uFE0E", name: "Taurus", quality: "Fixed earth", ruler: "Venus" },
  { glyph: "♊\uFE0E", name: "Gemini", quality: "Mutable air", ruler: "Mercury" },
  { glyph: "♋\uFE0E", name: "Cancer", quality: "Cardinal water", ruler: "Moon" },
  { glyph: "♌\uFE0E", name: "Leo", quality: "Fixed fire", ruler: "Sun" },
  { glyph: "♍\uFE0E", name: "Virgo", quality: "Mutable earth", ruler: "Mercury" },
  { glyph: "♎\uFE0E", name: "Libra", quality: "Cardinal air", ruler: "Venus" },
  { glyph: "♏\uFE0E", name: "Scorpio", quality: "Fixed water", ruler: "Mars" },
  { glyph: "♐\uFE0E", name: "Sagittarius", quality: "Mutable fire", ruler: "Jupiter" },
  { glyph: "♑\uFE0E", name: "Capricorn", quality: "Cardinal earth", ruler: "Saturn" },
  { glyph: "♒\uFE0E", name: "Aquarius", quality: "Fixed air", ruler: "Saturn" },
  { glyph: "♓\uFE0E", name: "Pisces", quality: "Mutable water", ruler: "Jupiter" }
];

/** Cusp angles (degrees, 0 = left/ascendant, counterclockwise) chosen to show each system's character. */
const HOUSE_SYSTEMS: Array<{ name: string; cusps: number[]; axes?: boolean; blurb: string; divides: string }> = [
  {
    name: "Whole sign",
    cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    blurb: "The rising SIGN is the first house entire; every sign is one house. The oldest system, standard in Hellenistic and Indian practice, revived widely since the 1990s.",
    divides: "signs themselves"
  },
  {
    name: "Equal",
    cusps: [8, 38, 68, 98, 128, 158, 188, 218, 248, 278, 308, 338],
    blurb: "Twelve equal houses measured from the ascendant DEGREE. The midheaven floats free of the tenth cusp.",
    divides: "the ecliptic, from the ASC"
  },
  {
    name: "Porphyry",
    cusps: [0, 32, 64, 96, 124, 152, 180, 212, 244, 276, 304, 332],
    axes: true,
    blurb: "The simplest quadrant system: each quarter between the angles is cut into three equal parts. Third century, still in use.",
    divides: "each quadrant in thirds"
  },
  {
    name: "Placidus",
    cusps: [0, 24, 52, 96, 132, 160, 180, 204, 232, 276, 312, 340],
    axes: true,
    blurb: "Divides the TIME a degree spends between horizon and meridian. The default of most modern software; fails at polar latitudes.",
    divides: "diurnal time-arcs"
  },
  {
    name: "Koch",
    cusps: [0, 28, 58, 96, 130, 156, 180, 208, 238, 276, 310, 336],
    axes: true,
    blurb: "A twentieth-century time-arc method computed from the birthplace's own horizon. Popular in German-speaking practice.",
    divides: "ascension times of the birthplace"
  },
  {
    name: "Regiomontanus",
    cusps: [0, 29, 61, 96, 127, 155, 180, 209, 241, 276, 307, 335],
    axes: true,
    blurb: "Divides the celestial equator equally and projects to the ecliptic. The house system of Lilly and classical horary.",
    divides: "the celestial equator"
  },
  {
    name: "Campanus",
    cusps: [0, 26, 55, 96, 134, 162, 180, 206, 235, 276, 314, 342],
    axes: true,
    blurb: "Divides the prime vertical — the great circle through east point, zenith, and west point — into equal lunes.",
    divides: "the prime vertical"
  }
];

/**
 * Ten planet positions (degrees) arranged to display each Jones pattern, with the occupied arcs
 * shaded and the doctrine's special planet — handle, engine, cutting planet — singled out.
 */
const CHART_SHAPES: Array<{
  name: string;
  keynote: string;
  criterion: string;
  dots: number[];
  spans?: Array<[number, number]>;
  lead?: { index: number; label: string };
  reading: string;
  lookFor: string;
}> = [
  {
    name: "Bundle",
    keynote: "Concentration",
    criterion: "All ten planets within about 120° — the span of a trine.",
    dots: [95, 106, 118, 127, 139, 150, 161, 172, 184, 195],
    spans: [[90, 200]],
    lead: { index: 9, label: "leading planet" },
    reading:
      "The rarest pattern. Everything the chart has is gathered into one department of the sky, and the life tends to match: a specialist temperament that digs one channel deep rather than many shallow, with limited patience for whatever falls outside it.",
    lookFor:
      "The leading planet — first of the group by clockwise rotation — sets the agenda the whole cluster serves. Two-thirds of the wheel is empty; what the bundle ignores is as diagnostic as what it holds."
  },
  {
    name: "Bowl",
    keynote: "Self-containment",
    criterion: "All ten planets within one half of the wheel (~180°).",
    dots: [10, 29, 48, 67, 86, 105, 124, 143, 162, 178],
    spans: [[5, 183]],
    lead: { index: 9, label: "cutting planet" },
    reading:
      "A hemisphere occupied and a hemisphere bare: the life carries its own sources and feels the missing half as a question. Jones read the bowl as self-contained purpose — something held that must eventually be carried across to the empty side.",
    lookFor:
      "The cutting planet, at the clockwise edge of the group, leads the whole formation and describes how the person advances into the empty hemisphere. The rim of the bowl — which houses it spans — shows where the holding happens."
  },
  {
    name: "Bucket",
    keynote: "Direction",
    criterion: "Nine planets in one half; a single planet alone in the other.",
    dots: [190, 205, 222, 239, 256, 273, 290, 307, 322, 95],
    spans: [[185, 327]],
    lead: { index: 9, label: "the handle" },
    reading:
      "A bowl with an outlet. The isolated planet becomes the handle through which everything the other nine gather is poured, and the life organizes itself around that point of application — cause, craft, mission, or grievance.",
    lookFor:
      "Everything rides on the handle: its sign, house, and aspects govern the discharge of the whole chart. A handle conjunct the group's midpoint opposition is the pattern at its purest."
  },
  {
    name: "Locomotive",
    keynote: "Drive",
    criterion: "Two-thirds of the wheel occupied (~240°); an empty trine.",
    dots: [0, 27, 54, 81, 108, 135, 162, 189, 216, 240],
    spans: [[355, 245]],
    lead: { index: 9, label: "the engine" },
    reading:
      "Jones' figure of executive momentum: the empty trine registers as a felt lack, and the chart mobilizes around solving it. Self-starting, problem-hungry, with power delivered unevenly — like a wheel driven from one point.",
    lookFor:
      "The engine — the planet that leads the train clockwise into the empty trine — is the chart's driver and its point of greatest torque. The middle of the empty trine names the prize the drive is secretly aimed at."
  },
  {
    name: "Seesaw",
    keynote: "Negotiation",
    criterion: "Two opposing groups, separated by two gaps of 60° or more.",
    dots: [15, 32, 49, 66, 83, 195, 213, 231, 249, 267],
    spans: [[10, 88], [190, 272]],
    reading:
      "A life conducted between two camps: two sets of commitments that face each other across the wheel and refuse to merge. The temperament weighs, compares, alternates — capable of real perspective, and of permanent postponement.",
    lookFor:
      "The oppositions that bridge the two groups are the working axes of the chart. The heavier cluster is the home base; the lighter one is the counterweight the life keeps returning to pick up."
  },
  {
    name: "Splay",
    keynote: "Individuality",
    criterion: "Three uneven clusters — a tripod, often braced by a grand trine.",
    dots: [5, 22, 39, 130, 147, 164, 181, 255, 272, 289],
    spans: [[0, 44], [125, 186], [250, 294]],
    reading:
      "Energy spiking in three distinct departments with real gaps between: the tripod stands on its own arrangement and resists schedule, category, and other people's priorities. Jones read it as rugged, ineradicable individuality.",
    lookFor:
      "Read the three legs as a standing structure: the midpoint of each cluster names a footing, and any grand trine linking them is the pattern's brace — self-sufficiency built into the geometry."
  },
  {
    name: "Splash",
    keynote: "Breadth",
    criterion: "Planets distributed around the whole wheel; no gap much over 60°.",
    dots: [5, 41, 77, 113, 149, 185, 221, 257, 293, 329],
    reading:
      "The opposite of the bundle: interests sown across every quarter of the sky. At best a genuine universality — many rooms lived in comfortably; at worst the classic diffusion of a life spread one planet deep everywhere.",
    lookFor:
      "With no leading planet to appoint, look for any tight conjunction to act as a gathering point, and fall back on the balance of elements and modes to find where the scatter secretly leans."
  }
];

/**
 * The zodiac as a product, not a list: four elements crossed with three modes generate the
 * twelve signs, and most sign "keywords" are just this arithmetic said slowly.
 */
const ELEMENTS = [
  { name: "Fire", note: "vital spark, spirit, initiative" },
  { name: "Earth", note: "substance, sense, endurance" },
  { name: "Air", note: "relation, speech, exchange" },
  { name: "Water", note: "feeling, memory, dissolution" }
];
const MODES = [
  { name: "Cardinal", note: "initiates the season" },
  { name: "Fixed", note: "sustains its middle" },
  { name: "Mutable", note: "hands it over" }
];
/** Row-major: element × mode, matching ELEMENTS and MODES order. */
const SIGN_GRID = [
  ["♈\uFE0E Aries", "♌\uFE0E Leo", "♐\uFE0E Sagittarius"],
  ["♑\uFE0E Capricorn", "♉\uFE0E Taurus", "♍\uFE0E Virgo"],
  ["♎\uFE0E Libra", "♒\uFE0E Aquarius", "♊\uFE0E Gemini"],
  ["♋\uFE0E Cancer", "♏\uFE0E Scorpio", "♓\uFE0E Pisces"]
];

/** The twelve houses with their medieval Latin names and the planetary joys. */
const HOUSES: Array<{
  numeral: string;
  latin: string;
  english: string;
  cls: "angular" | "succedent" | "cadent";
  joy?: string;
  greekName?: string;
  blurb: string;
}> = [
  { numeral: "I", latin: "Vita", english: "Life", cls: "angular", joy: "☿\uFE0E Mercury", blurb: "The helm: body, temperament, appearance — the self that arrives before anything happens to it." },
  { numeral: "II", latin: "Lucrum", english: "Gain", cls: "succedent", blurb: "Possessions and livelihood: what the life holds onto, and what holds it up." },
  { numeral: "III", latin: "Fratres", english: "Brothers", cls: "cadent", joy: "☽\uFE0E Moon", greekName: "the Goddess", blurb: "Siblings, neighbours, short roads, letters — the daily circuit of the known." },
  { numeral: "IV", latin: "Genitor", english: "The Parent", cls: "angular", blurb: "Parents, home, land, and the grave: foundations at the bottom of the sky, where things begin and are buried." },
  { numeral: "V", latin: "Nati", english: "Children", cls: "succedent", joy: "♀\uFE0E Venus", greekName: "Good Fortune", blurb: "Children, pleasure, art, play — what the life makes because it delights to." },
  { numeral: "VI", latin: "Valetudo", english: "Health", cls: "cadent", joy: "♂\uFE0E Mars", greekName: "Bad Fortune", blurb: "Illness, labour, service, and the beasts that work: the body's frictions and the work done under another's direction." },
  { numeral: "VII", latin: "Uxor", english: "The Spouse", cls: "angular", blurb: "Marriage and partnership — and the open rival: everyone met exactly at eye level." },
  { numeral: "VIII", latin: "Mors", english: "Death", cls: "succedent", blurb: "Death, inheritance, and other people's goods: what crosses into the life from beyond its control." },
  { numeral: "IX", latin: "Iter", english: "The Journey", cls: "cadent", joy: "☉\uFE0E Sun", greekName: "God", blurb: "Long travel, religion, divination, higher learning — everything sought far from home." },
  { numeral: "X", latin: "Regnum", english: "The Kingdom", cls: "angular", blurb: "Honours, authority, the public summit: the visible top of the chart and of the life." },
  { numeral: "XI", latin: "Benefacta", english: "Good Deeds", cls: "succedent", joy: "♃\uFE0E Jupiter", greekName: "Good Spirit", blurb: "Allies, patrons, friendship, hope — help that arrives because it was earned or loved into being." },
  { numeral: "XII", latin: "Carcer", english: "The Prison", cls: "cadent", joy: "♄\uFE0E Saturn", greekName: "Bad Spirit", blurb: "Confinement, exile, hidden enemies, self-undoing — and the retreats where all of that is faced." }
];

/** House number of each planetary joy, for the master wheel. */
const JOYS: Array<[number, string]> = [
  [1, "☿\uFE0E"], [3, "☽\uFE0E"], [5, "♀\uFE0E"], [6, "♂\uFE0E"], [9, "☉\uFE0E"], [11, "♃\uFE0E"], [12, "♄\uFE0E"]
];

/** The aspects as divisions of the circle, in angular order. */
const ASPECTS: Array<{
  glyph: string;
  name: string;
  angle: number;
  family: string;
  orb: string;
  ptolemaic: boolean;
  reading: string;
}> = [
  { glyph: "☌\uFE0E", name: "Conjunction", angle: 0, family: "the circle undivided", orb: "~8–10°", ptolemaic: true, reading: "Two planets fused into one working function. Neither easy nor hard in itself — its temper is entirely the temper of the planets joined." },
  { glyph: "⚺\uFE0E", name: "Semisextile", angle: 30, family: "the circle ÷ 12", orb: "~2°", ptolemaic: false, reading: "Adjacent signs: neighbours that share no element or mode. A mild, nagging unlikeness more felt than seen." },
  { glyph: "⚹\uFE0E", name: "Sextile", angle: 60, family: "the circle ÷ 6", orb: "~4–6°", ptolemaic: true, reading: "Fire with air, earth with water: compatible temperaments. Opportunity rather than gift — ease that must be invited to act." },
  { glyph: "□\uFE0E", name: "Square", angle: 90, family: "the circle ÷ 4", orb: "~7–8°", ptolemaic: true, reading: "Signs of the same mode collide at cross-purposes. The productive crisis: friction that builds exactly the strength it demands." },
  { glyph: "△\uFE0E", name: "Trine", angle: 120, family: "the circle ÷ 3", orb: "~8°", ptolemaic: true, reading: "Same element, effortless current. The chart's given talents — and, undisturbed, its laziest places." },
  { glyph: "⚻\uFE0E", name: "Quincunx", angle: 150, family: "the circle ÷ 12 × 5", orb: "~2–3°", ptolemaic: false, reading: "No shared element, mode, or polarity: the blind spot. Perpetual adjustment between things with no common language." },
  { glyph: "☍\uFE0E", name: "Opposition", angle: 180, family: "the circle halved", orb: "~8–10°", ptolemaic: true, reading: "Full awareness across an axis: confrontation, projection, partnership. What the square forces, the opposition negotiates." }
];

const CORRESPONDENCE_SPINE = [
  { glyph: "♄\uFE0E", planet: "Saturn", day: "Saturday", metal: "Lead", domicile: "Capricorn · Aquarius", exaltation: "Libra", detriment: "Cancer · Leo", fall: "Aries" },
  { glyph: "♃\uFE0E", planet: "Jupiter", day: "Thursday", metal: "Tin", domicile: "Sagittarius · Pisces", exaltation: "Cancer", detriment: "Gemini · Virgo", fall: "Capricorn" },
  { glyph: "♂\uFE0E", planet: "Mars", day: "Tuesday", metal: "Iron", domicile: "Aries · Scorpio", exaltation: "Capricorn", detriment: "Taurus · Libra", fall: "Cancer" },
  { glyph: "☉\uFE0E", planet: "Sun", day: "Sunday", metal: "Gold", domicile: "Leo", exaltation: "Aries", detriment: "Aquarius", fall: "Libra" },
  { glyph: "♀\uFE0E", planet: "Venus", day: "Friday", metal: "Copper", domicile: "Taurus · Libra", exaltation: "Pisces", detriment: "Aries · Scorpio", fall: "Virgo" },
  { glyph: "☿\uFE0E", planet: "Mercury", day: "Wednesday", metal: "Quicksilver", domicile: "Gemini · Virgo", exaltation: "Virgo", detriment: "Sagittarius · Pisces", fall: "Pisces" },
  { glyph: "☽\uFE0E", planet: "Moon", day: "Monday", metal: "Silver", domicile: "Cancer", exaltation: "Taurus", detriment: "Capricorn", fall: "Scorpio" }
];

const INSTRUMENTS = [
  { href: "/resources/celestial-instrument", label: "Celestial Instrument" },
  { href: "/resources/decan-calculator", label: "Decan Calculator" },
  { href: "/resources/lunar-mansions", label: "Lunar Mansions" },
  { href: "/resources/planetary-hours", label: "Planetary Hours" },
  { href: "/resources/zodiacal-hours", label: "Zodiacal Hours" },
  { href: "/resources/election-planner", label: "Election Planner" },
  { href: "/resources/moon-phase", label: "Moon Phase" },
  { href: "/resources/fixed-stars", label: "Fixed Stars" },
  { href: "/resources/planetary-correspondences", label: "Planetary Correspondences" }
];

const rad = (deg: number) => ((deg - 180) * Math.PI) / 180; // 0° = left (ascendant), counterclockwise

function HouseWheel({ cusps, axes }: { cusps: number[]; axes?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto block w-full max-w-36" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(181,146,85,.5)" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(181,146,85,.28)" strokeWidth="1" />
      {cusps.map((angle, index) => {
        const isAxis = axes && (index === 0 || index === 3 || index === 6 || index === 9);
        const x1 = 60 + 20 * Math.cos(rad(angle));
        const y1 = 60 - 20 * Math.sin(rad(angle));
        const x2 = 60 + 54 * Math.cos(rad(angle));
        const y2 = 60 - 54 * Math.sin(rad(angle));
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isAxis ? "rgba(231,221,204,.85)" : "rgba(181,146,85,.45)"}
            strokeWidth={isAxis ? 1.8 : 1}
          />
        );
      })}
      {/* ascendant marker */}
      <circle cx="6" cy="60" r="2.4" fill="rgb(181,146,85)" />
    </svg>
  );
}

function arcPath(start: number, end: number, r: number) {
  // Counterclockwise from start to end in chart coordinates (0° at the ascendant, left).
  const span = (end - start + 360) % 360 || 360;
  const x1 = 60 + r * Math.cos(rad(start));
  const y1 = 60 - r * Math.sin(rad(start));
  const x2 = 60 + r * Math.cos(rad(end));
  const y2 = 60 - r * Math.sin(rad(end));
  return `M ${x1} ${y1} A ${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${x2} ${y2}`;
}

function ShapeWheel({
  dots,
  spans,
  lead
}: {
  dots: number[];
  spans?: Array<[number, number]>;
  lead?: { index: number; label: string };
}) {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto block w-full max-w-36" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(181,146,85,.4)" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="2" fill="rgba(181,146,85,.5)" />
      {/* The occupied stretch of the wheel, shaded so the figure's geometry reads at a glance. */}
      {spans?.map(([start, end]) => (
        <path
          key={`${start}-${end}`}
          d={arcPath(start, end, 49)}
          fill="none"
          stroke="rgba(181,146,85,.2)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      {dots.map((angle, index) => {
        const isLead = lead?.index === index;
        return (
          <circle
            key={`${angle}-${index}`}
            cx={60 + 44 * Math.cos(rad(angle))}
            cy={60 - 44 * Math.sin(rad(angle))}
            r={isLead ? 4.6 : 3.4}
            fill={isLead ? "rgb(231,221,204)" : "rgb(181,146,85)"}
            stroke={isLead ? "rgba(181,146,85,.9)" : "rgba(8,8,8,.9)"}
            strokeWidth={isLead ? 1.6 : 1}
          />
        );
      })}
    </svg>
  );
}

const pt = (deg: number, r: number, cx = 75, cy = 67) => ({
  x: cx + r * Math.cos(rad(deg)),
  y: cy - r * Math.sin(rad(deg))
});

/**
 * The master wheel: twelve houses counted counterclockwise from the ascendant, the four angles
 * named, angular houses shaded, and each planetary joy drawn in the house it delights in.
 */
function HousesWheel() {
  const sector = (start: number) => {
    const a = pt(start, 52);
    const b = pt(start + 30, 52);
    return `M 75 67 L ${a.x} ${a.y} A 52 52 0 0 0 ${b.x} ${b.y} Z`;
  };
  return (
    <svg viewBox="0 0 150 134" className="mx-auto block w-full max-w-sm" aria-hidden="true">
      {[0, 3, 6, 9].map((house) => (
        <path key={house} d={sector(house * 30)} fill="rgba(181,146,85,.1)" />
      ))}
      <circle cx="75" cy="67" r="52" fill="none" stroke="rgba(181,146,85,.45)" strokeWidth="1.2" />
      <circle cx="75" cy="67" r="20" fill="none" stroke="rgba(181,146,85,.2)" strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = pt(i * 30, 52);
        const b = pt(i * 30, 20);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(181,146,85,.3)" strokeWidth="1" />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const c = pt(i * 30 + 15, 33);
        return (
          <text key={i} x={c.x} y={c.y + 2.4} textAnchor="middle" fontSize="7" fill="rgb(200,184,158)">
            {i + 1}
          </text>
        );
      })}
      {JOYS.map(([house, glyph]) => {
        const c = pt((house - 1) * 30 + 15, 45);
        return (
          <text key={house} x={c.x} y={c.y + 2.6} textAnchor="middle" fontSize="7.5" fill="rgb(181,146,85)">
            {glyph}
          </text>
        );
      })}
      {/* The four angles pin the frame: ASC left, IC below, DSC right, MC above. */}
      {([[0, "ASC", -2, 3], [90, "IC", 0, 9], [180, "DSC", 2, 3], [270, "MC", 0, -4]] as const).map(
        ([deg, label, dx, dy]) => {
          const c = pt(deg, 56);
          return (
            <text
              key={label}
              x={c.x + dx}
              y={c.y + dy}
              textAnchor={label === "ASC" ? "end" : label === "DSC" ? "start" : "middle"}
              fontSize="7"
              letterSpacing="1"
              fill="rgb(231,221,204)"
            >
              {label}
            </text>
          );
        }
      )}
    </svg>
  );
}

/** One aspect as geometry: two bodies on the rim, the chord between them, the angle at centre. */
function AspectWheel({ angle }: { angle: number }) {
  const a = pt(270 - angle / 2, 40, 50, 50);
  const b = pt(270 + angle / 2, 40, 50, 50);
  const arcA = pt(270 - angle / 2, 13, 50, 50);
  const arcB = pt(270 + angle / 2, 13, 50, 50);
  return (
    <svg viewBox="0 0 100 100" className="mx-auto block w-full max-w-28" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(181,146,85,.4)" strokeWidth="1.2" />
      {angle === 0 ? (
        <>
          <circle cx="46.5" cy="10" r="3.4" fill="rgb(181,146,85)" stroke="rgba(8,8,8,.9)" />
          <circle cx="53.5" cy="10" r="3.4" fill="rgb(181,146,85)" stroke="rgba(8,8,8,.9)" />
        </>
      ) : (
        <>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(181,146,85,.75)" strokeWidth="1.4" />
          <path
            d={`M ${arcA.x} ${arcA.y} A 13 13 0 ${angle > 180 ? 1 : 0} 1 ${arcB.x} ${arcB.y}`}
            fill="none"
            stroke="rgba(200,184,158,.5)"
            strokeWidth="1"
          />
          <circle cx={a.x} cy={a.y} r="3.4" fill="rgb(181,146,85)" stroke="rgba(8,8,8,.9)" />
          <circle cx={b.x} cy={b.y} r="3.4" fill="rgb(181,146,85)" stroke="rgba(8,8,8,.9)" />
        </>
      )}
      <circle cx="50" cy="50" r="1.8" fill="rgba(181,146,85,.5)" />
    </svg>
  );
}

export function AstrologyAtlas() {
  return (
    <section id="astrology-atlas" className="relative isolate scroll-mt-24 overflow-hidden border-y border-gold/20 bg-black/55">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.96),rgba(26,33,43,.4)_46%,rgba(181,146,85,.12)_80%,rgba(8,8,8,.96))]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">The Atlas</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            The working parts of a chart
          </h2>
          <p className="mt-4 leading-8 text-parchment">
            Seven instruments of literacy: the glyphs a chart is written in, the arithmetic that
            generates the twelve signs, the houses and their meanings, the systems that argue over
            where their cusps fall, the aspects that let planets speak to one another, the shapes a
            whole chart makes at a glance, and the correspondence spine with the essential
            dignities. The wheels are schematic — they show how each system cuts the circle, not a
            cast chart. For real computation, the archive&rsquo;s instruments are linked at the end.
          </p>
        </div>

        {/* ------------------------------------------------------ 1 · glyphs */}
        <h3 className="font-display text-2xl text-ivory">The glyphs</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          Seven classical planets, three moderns, the lunar nodes, and the twelve signs — the
          complete alphabet of a chart.
        </p>
        <ul role="list" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {PLANET_GLYPHS.map((planet) => (
            <li key={planet.name} className="flex items-center gap-3 rounded border border-gold/15 bg-black/40 p-3">
              <span className="font-serif text-3xl leading-none text-gold" aria-hidden="true">{planet.glyph}</span>
              <span className="min-w-0">
                <span className="block font-display text-base leading-tight text-ivory">{planet.name}</span>
                <span className="block text-[.72rem] leading-4 text-parchment/80">{planet.meaning}</span>
              </span>
            </li>
          ))}
        </ul>
        <ul role="list" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {SIGN_GLYPHS.map((sign) => (
            <li key={sign.name} className="rounded border border-gold/15 bg-black/40 p-3 text-center">
              <span className="font-serif text-2xl leading-none text-gold" aria-hidden="true">{sign.glyph}</span>
              <span className="mt-1 block font-display text-sm text-ivory">{sign.name}</span>
              <span className="block text-[.66rem] uppercase tracking-[.08em] text-limestone">{sign.quality}</span>
              <span className="block text-[.66rem] text-parchment/75">ruled by {sign.ruler}</span>
            </li>
          ))}
        </ul>

        {/* -------------------------------------------- 2 · the sign generator */}
        <h3 className="mt-14 font-display text-2xl text-ivory">Four elements × three modes</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          The zodiac is not a list of twelve personalities but a product of two smaller alphabets:
          four elements crossed with three modes. Most sign &ldquo;keywords&rdquo; are this
          arithmetic said slowly — Aries is nothing more mysterious than fire behaving cardinally.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[.7rem] uppercase tracking-[.16em] text-gold">
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Element</th>
                {MODES.map((mode) => (
                  <th key={mode.name} className="border-b border-gold/25 px-3 py-2.5 font-normal">
                    {mode.name}
                    <span className="block text-[.62rem] normal-case tracking-normal text-limestone">{mode.note}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ELEMENTS.map((element, row) => (
                <tr key={element.name}>
                  <th scope="row" className="border-b border-gold/10 px-3 py-2.5 text-left font-normal">
                    <span className="font-display text-base text-ivory">{element.name}</span>
                    <span className="block text-[.66rem] text-limestone">{element.note}</span>
                  </th>
                  {SIGN_GRID[row].map((cell) => (
                    <td key={cell} className="border-b border-gold/10 px-3 py-2.5 text-parchment">
                      <span className="mr-1.5 font-serif text-lg text-gold" aria-hidden="true">{cell.split(" ")[0]}</span>
                      {cell.split(" ")[1]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------ 3 · twelve houses */}
        <h3 className="mt-14 font-display text-2xl text-ivory">The twelve houses</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          Signs describe <em className="text-parchment">how</em>; houses say{" "}
          <em className="text-parchment">where</em> — twelve departments of a life, counted
          counterclockwise from the ascendant. The shaded quarters are the angular houses, where
          the chart touches its own frame and planets act at full strength; each gold glyph sits in
          the house where tradition says that planet{" "}
          <em className="text-parchment">rejoices</em> — the doctrine of the joys, which is also
          where the houses&rsquo; oldest names come from.
        </p>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div className="temple-border rounded bg-black/40 p-5">
            <HousesWheel />
            <p className="mt-3 text-center text-[.7rem] leading-5 text-limestone">
              Angular · shaded — succedent follow — cadent fall away.
              <span className="block">Joys: ☿&#xFE0E; I · ☽&#xFE0E; III · ♀&#xFE0E; V · ♂&#xFE0E; VI · ☉&#xFE0E; IX · ♃&#xFE0E; XI · ♄&#xFE0E; XII</span>
            </p>
          </div>
          <ul role="list" className="grid gap-2 sm:grid-cols-2">
            {HOUSES.map((house) => (
              <li key={house.numeral} className="rounded border border-gold/15 bg-black/40 p-3">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-lg text-gold">{house.numeral}</span>
                  <span className="font-display text-base text-ivory">{house.latin}</span>
                  <span className="text-[.7rem] text-parchment/75">{house.english}</span>
                </p>
                <p className="mt-0.5 text-[.62rem] uppercase tracking-[.16em] text-limestone">
                  {house.cls}
                  {house.joy ? <span className="text-gold"> · joy of {house.joy}</span> : null}
                  {house.greekName ? <span> · &ldquo;{house.greekName}&rdquo;</span> : null}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-parchment/85">{house.blurb}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ----------------------------------------------- 4 · house systems */}
        <h3 className="mt-14 font-display text-2xl text-ivory">Seven ways to cut the circle</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          Houses assign the sky&rsquo;s twelve departments of life. Systems differ on what exactly
          is divided — signs, the ecliptic, time, or space — and charts move house when the system
          changes. The bright lines mark the angles where quadrant systems pin their frame.
        </p>
        <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HOUSE_SYSTEMS.map((system) => (
            <li key={system.name} className="temple-border rounded bg-black/40 p-4">
              <HouseWheel cusps={system.cusps} axes={system.axes} />
              <p className="mt-2 text-center font-display text-lg text-ivory">{system.name}</p>
              <p className="text-center text-[.66rem] uppercase tracking-[.14em] text-gold">divides {system.divides}</p>
              <p className="mt-2 text-xs leading-5 text-parchment/85">{system.blurb}</p>
            </li>
          ))}
        </ul>

        {/* ---------------------------------------------------- 5 · aspects */}
        <h3 className="mt-14 font-display text-2xl text-ivory">The grammar of aspect</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          Aspects are how planets address one another: each is a whole-number division of the
          circle, which is why astrologers speak of them as harmonics. The five Ptolemaic aspects
          descend from sign geometry — trines join signs of one element, squares signs of one mode
          — and the older doctrine counted them sign to sign before degrees entered it. An orb is
          the allowance either side of exactness; a planet moving <em className="text-parchment">toward</em>{" "}
          perfection of an aspect is applying, and its promise is still ahead — moving away, it is
          separating, and the matter is already done.
        </p>
        <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ASPECTS.map((aspect) => (
            <li key={aspect.name} className="temple-border rounded bg-black/40 p-4">
              <AspectWheel angle={aspect.angle} />
              <p className="mt-1 text-center">
                <span className="mr-2 font-serif text-2xl text-gold" aria-hidden="true">{aspect.glyph}</span>
                <span className="font-display text-lg text-ivory">{aspect.name}</span>
              </p>
              <p className="text-center text-[.66rem] uppercase tracking-[.16em] text-gold">
                {aspect.angle}° · {aspect.family}
              </p>
              <p className="mt-1 text-center text-[.64rem] uppercase tracking-[.12em] text-limestone">
                {aspect.ptolemaic ? "Ptolemaic" : "minor"} · orb {aspect.orb}
              </p>
              <p className="mt-2.5 text-xs leading-5 text-parchment/85">{aspect.reading}</p>
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------ 6 · chart shapes */}
        <h3 className="mt-14 font-display text-2xl text-ivory">The seven shapes of a chart</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          Before reading any single placement, Marc Edmund Jones taught reading the whole
          distribution at once. His seven patterns — published in the{" "}
          <em className="text-parchment">Guide to Horoscope Interpretation</em> (1941), and built
          for the ten-planet chart Pluto&rsquo;s discovery had just completed — treat the gestalt
          of a nativity as its first sentence: where the planets gather, where they leave the wheel
          bare, and which single body, if any, the geometry appoints to lead. The shaded arc marks
          the occupied stretch; the pale dot marks that appointed planet.
        </p>
        <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CHART_SHAPES.map((shape) => (
            <li key={shape.name} className="temple-border flex flex-col rounded bg-black/40 p-5">
              <ShapeWheel dots={shape.dots} spans={shape.spans} lead={shape.lead} />
              <p className="mt-2 text-center font-display text-xl text-ivory">{shape.name}</p>
              <p className="text-center text-[.66rem] uppercase tracking-[.2em] text-gold">
                keynote · {shape.keynote}
              </p>
              <p className="mt-3 border-y border-gold/15 py-2 text-center text-[.72rem] leading-4 text-limestone">
                {shape.criterion}
              </p>
              <p className="mt-3 text-xs leading-5 text-parchment/85">{shape.reading}</p>
              <p className="mt-3 border-l border-gold/30 pl-3 text-xs leading-5 text-parchment">
                <span className="mr-1 text-[.64rem] uppercase tracking-[.16em] text-gold">
                  {shape.lead ? shape.lead.label : "where to look"}
                </span>
                <span className="block mt-1">{shape.lookFor}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-xs leading-6 text-limestone">
          The boundaries are judgment calls, not measurements: real charts are often hybrids, and a
          near-miss — a bowl with one straggler, a locomotive missing its gap by a few degrees — is
          read as the nearest pattern with the deviation noted. Jones would say the deviation is
          where the interpretation starts.
        </p>

        {/* ------------------------- 7 · correspondence spine & dignities */}
        <h3 className="mt-14 font-display text-2xl text-ivory">The correspondence spine &amp; essential dignities</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          The seven classical planets in Chaldean order, with the attributions the whole Western
          system hangs from — now including the four essential dignities. A planet in its{" "}
          <em className="text-parchment">domicile</em> rules the ground it stands on; in{" "}
          <em className="text-parchment">exaltation</em> it is an honoured guest; in{" "}
          <em className="text-parchment">detriment</em>, opposite its home, it works in a place
          built on contrary principles; in <em className="text-parchment">fall</em>, opposite its
          exaltation, its dignity is inverted. Condition first, meaning second: this is the oldest
          rule of judgment. The full tables live in the{" "}
          <Link href="/resources/planetary-correspondences" className="focus-ring text-gold underline-offset-4 hover:underline">
            correspondence explorer
          </Link>.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[.7rem] uppercase tracking-[.16em] text-gold">
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Planet</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Day</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Metal</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Domicile</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Exaltation</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Detriment</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Fall</th>
              </tr>
            </thead>
            <tbody>
              {CORRESPONDENCE_SPINE.map((row) => (
                <tr key={row.planet} className="text-parchment">
                  <td className="border-b border-gold/10 px-3 py-2.5">
                    <span className="mr-2 font-serif text-xl text-gold" aria-hidden="true">{row.glyph}</span>
                    <span className="text-ivory">{row.planet}</span>
                  </td>
                  <td className="border-b border-gold/10 px-3 py-2.5">{row.day}</td>
                  <td className="border-b border-gold/10 px-3 py-2.5">{row.metal}</td>
                  <td className="border-b border-gold/10 px-3 py-2.5">{row.domicile}</td>
                  <td className="border-b border-gold/10 px-3 py-2.5">{row.exaltation}</td>
                  <td className="border-b border-gold/10 px-3 py-2.5 text-parchment/75">{row.detriment}</td>
                  <td className="border-b border-gold/10 px-3 py-2.5 text-parchment/75">{row.fall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------------------- 8 · instruments */}
        <div className="mt-12 rounded border border-gold/25 bg-gold/[.06] p-6">
          <p className="text-xs uppercase tracking-[.24em] text-gold">Work it, not just read it</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">
            Everything above is computed live by the archive&rsquo;s instruments:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INSTRUMENTS.map((instrument) => (
              <Link
                key={instrument.href}
                href={instrument.href}
                className="focus-ring rounded border border-gold/30 px-3 py-2 text-sm text-parchment transition hover:bg-gold/10 hover:text-ivory"
              >
                {instrument.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
