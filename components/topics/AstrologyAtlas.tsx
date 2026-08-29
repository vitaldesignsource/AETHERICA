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

const CORRESPONDENCE_SPINE = [
  { glyph: "♄\uFE0E", planet: "Saturn", day: "Saturday", metal: "Lead", domicile: "Capricorn · Aquarius", exaltation: "Libra" },
  { glyph: "♃\uFE0E", planet: "Jupiter", day: "Thursday", metal: "Tin", domicile: "Sagittarius · Pisces", exaltation: "Cancer" },
  { glyph: "♂\uFE0E", planet: "Mars", day: "Tuesday", metal: "Iron", domicile: "Aries · Scorpio", exaltation: "Capricorn" },
  { glyph: "☉\uFE0E", planet: "Sun", day: "Sunday", metal: "Gold", domicile: "Leo", exaltation: "Aries" },
  { glyph: "♀\uFE0E", planet: "Venus", day: "Friday", metal: "Copper", domicile: "Taurus · Libra", exaltation: "Pisces" },
  { glyph: "☿\uFE0E", planet: "Mercury", day: "Wednesday", metal: "Quicksilver", domicile: "Gemini · Virgo", exaltation: "Virgo" },
  { glyph: "☽\uFE0E", planet: "Moon", day: "Monday", metal: "Silver", domicile: "Cancer", exaltation: "Taurus" }
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
            Four instruments of literacy: the glyphs a chart is written in, the house systems that
            divide its circle, the shapes a whole chart makes at a glance, and the correspondence
            spine that ties the seven classical planets to days, metals, and signs. The wheels are
            schematic — they show how each system cuts the circle, not a cast chart. For real
            computation, the archive&rsquo;s instruments are linked at the end.
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

        {/* ----------------------------------------------- 2 · house systems */}
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

        {/* ------------------------------------------------ 3 · chart shapes */}
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

        {/* --------------------------------------- 4 · correspondence spine */}
        <h3 className="mt-14 font-display text-2xl text-ivory">The correspondence spine</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
          The seven classical planets in Chaldean order, with the attributions the whole Western
          system hangs from. The full tables live in the{" "}
          <Link href="/resources/planetary-correspondences" className="focus-ring text-gold underline-offset-4 hover:underline">
            correspondence explorer
          </Link>.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[.7rem] uppercase tracking-[.16em] text-gold">
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Planet</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Day</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Metal</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Domicile</th>
                <th className="border-b border-gold/25 px-3 py-2.5 font-normal">Exaltation</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------------------- 5 · instruments */}
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
