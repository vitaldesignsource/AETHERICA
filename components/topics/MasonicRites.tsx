import { Landmark, Scale, Split } from "lucide-react";

/**
 * The architecture of the rites: one Craft foundation, several towers built above it.
 *
 * Server component, pure markup. The diagram is deliberately built as HTML rather than one big
 * SVG so the text stays selectable, translatable, and legible to assistive tech; the towers are
 * rendered with flex-col-reverse so DOM order matches the order of progression while the eye
 * reads a building.
 */

const YORK_BODIES = [
  { name: "Royal Arch Chapter", degrees: "Capitular degrees", note: "The recovered Word — completing, in its own account, the story the third degree leaves broken." },
  { name: "Cryptic Council", degrees: "Cryptic degrees", note: "The vault beneath the temple: preservation of the Word before its loss." },
  { name: "Knights Templar Commandery", degrees: "Chivalric orders", note: "Christian orders of knighthood — the one branch requiring a profession of faith." }
];

const SCOTTISH_BODIES = [
  { name: "Lodge of Perfection", degrees: "4° – 14°", note: "The 'ineffable' degrees, elaborating the Hiramic legend." },
  { name: "Chapter of Rose Croix", degrees: "15° – 18°", note: "Degrees of the new law, culminating in the Rose Croix." },
  { name: "Council of Kadosh", degrees: "19° – 30°", note: "Philosophical and chivalric degrees of the rite." },
  { name: "Consistory", degrees: "31° – 32°", note: "The Royal Secret; the 33° is conferred as an honor, not earned by advancement." }
];

const CRAFT_DEGREES = [
  { numeral: "I", name: "Entered Apprentice", emblem: "The rough ashlar" },
  { numeral: "II", name: "Fellow Craft", emblem: "The winding stair" },
  { numeral: "III", name: "Master Mason", emblem: "The legend of Hiram" }
];

const STANDING = [
  {
    term: "Regular",
    body: "Descended from a lawful origin and holding the landmarks as the recognizing grand lodge defines them — belief in a Supreme Being, the Volume of Sacred Law open in lodge, no discussion of religion or politics at labour."
  },
  {
    term: "Liberal / adogmatic",
    body: "The family descending from the Grand Orient de France after 1877: liberty of conscience in place of required belief, and in many obediences the admission of women. Fully Masonic in its own eyes; unrecognized in Anglo-American ones."
  },
  {
    term: "Clandestine",
    body: "A term of art, not an insult: a body without lawful Masonic origin at all. Distinct from 'irregular', which describes a lawfully descended body that has departed from the landmarks."
  }
];

/**
 * The working tools in the English Craft allocation, three to a degree. Each is drawn as line
 * art; the moral gloss is the ritual's own logic — operative function first, then what it is
 * "morally applied" to teach.
 */
const WORKING_TOOLS: Array<{
  degree: string;
  tools: Array<{ name: string; icon: ToolIcon; operative: string; speculative: string }>;
}> = [
  {
    degree: "Entered Apprentice",
    tools: [
      { name: "24-inch Gauge", icon: "gauge", operative: "measures the work", speculative: "the day portioned — labour, refreshment, service" },
      { name: "Common Gavel", icon: "gavel", operative: "knocks off knobs and excrescences", speculative: "breaking from the stone of self what disfigures it" },
      { name: "Chisel", icon: "chisel", operative: "smooths and prepares the stone", speculative: "discipline bringing the hidden figure out" }
    ]
  },
  {
    degree: "Fellow Craft",
    tools: [
      { name: "Square", icon: "square", operative: "tries right angles", speculative: "squaring actions — the rule of morality" },
      { name: "Level", icon: "level", operative: "proves horizontals", speculative: "equality: all meet upon the level" },
      { name: "Plumb Rule", icon: "plumb", operative: "tries uprights", speculative: "uprightness of life before all" }
    ]
  },
  {
    degree: "Master Mason",
    tools: [
      { name: "Skirret", icon: "skirret", operative: "strikes the centre line of a foundation", speculative: "conduct laid out straight from the centre" },
      { name: "Pencil", icon: "pencil", operative: "draws the design", speculative: "every deed drawn, and recorded" },
      { name: "Compasses", icon: "compasses", operative: "sets out proportions and limits", speculative: "desire kept within due bounds" }
    ]
  }
];

type ToolIcon = "gauge" | "gavel" | "chisel" | "square" | "level" | "plumb" | "skirret" | "pencil" | "compasses";

/** Nine tools as spare line art, one visual voice: gold strokes, round caps, no fills. */
function ToolGlyph({ icon }: { icon: ToolIcon }) {
  const stroke = { fill: "none", stroke: "rgb(181,146,85)", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 64 64" className="mx-auto block h-14 w-14" aria-hidden="true">
      {icon === "gauge" && (
        <g {...stroke}>
          <path d="M8 32 H56" />
          <path d="M8 26 V38 M56 26 V38" />
          <path d="M24 28 V36 M40 28 V36" strokeWidth={1.6} />
        </g>
      )}
      {icon === "gavel" && (
        <g {...stroke}>
          <path d="M18 18 H40 V32 H18 Z" />
          <path d="M40 20 L52 25 L40 30" />
          <path d="M29 32 V54" />
        </g>
      )}
      {icon === "chisel" && (
        <g {...stroke}>
          <path d="M27 10 H37 V40 L32 52 L27 40 Z" />
          <path d="M27 18 H37" strokeWidth={1.6} />
        </g>
      )}
      {icon === "square" && (
        <g {...stroke}>
          <path d="M16 14 V48 H50" strokeWidth={3.2} />
          <path d="M23 14 V41 H50" strokeWidth={1.6} />
        </g>
      )}
      {icon === "level" && (
        <g {...stroke}>
          <path d="M12 50 L32 12 L52 50 Z" />
          <path d="M32 12 V42" strokeWidth={1.6} />
          <path d="M29 42 L32 48 L35 42" />
        </g>
      )}
      {icon === "plumb" && (
        <g {...stroke}>
          <path d="M26 10 H38 V50 H26 Z" />
          <path d="M32 14 V40" strokeWidth={1.6} />
          <path d="M29 40 L32 46 L35 40" />
        </g>
      )}
      {icon === "skirret" && (
        <g {...stroke}>
          <circle cx="26" cy="34" r="8" />
          <path d="M26 14 V26 M20 14 H32" />
          <path d="M34 34 H56" strokeWidth={1.6} />
        </g>
      )}
      {icon === "pencil" && (
        <g {...stroke}>
          <path d="M40 10 L50 20 L24 46 L14 50 L18 40 Z" />
          <path d="M36 14 L46 24" strokeWidth={1.6} />
        </g>
      )}
      {icon === "compasses" && (
        <g {...stroke}>
          <circle cx="32" cy="13" r="3.5" />
          <path d="M30 16 L20 52 M34 16 L44 52" />
          <path d="M23 44 Q32 49 41 44" strokeWidth={1.6} />
        </g>
      )}
    </svg>
  );
}

/** Officer stations for the floor plan, with the jewels of the principal three. */
const LODGE_LEGEND = [
  { key: "WM", name: "Worshipful Master", note: "rules the lodge from the East; jewel, the Square" },
  { key: "SW", name: "Senior Warden", note: "the West, marking the setting sun; jewel, the Level" },
  { key: "JW", name: "Junior Warden", note: "the South, the sun at meridian; jewel, the Plumb" },
  { key: "SD · JD", name: "Deacons", note: "messengers between the principal officers, bearing wands" },
  { key: "IG", name: "Inner Guard", note: "within the door (English working)" },
  { key: "Tyler", name: "Tyler", note: "outside the door with a drawn sword, against cowans and eavesdroppers" }
];

function Tower({ title, era, bodies }: { title: string; era: string; bodies: typeof YORK_BODIES }) {
  return (
    <div className="flex min-w-0 flex-col">
      <p className="text-center text-xs uppercase tracking-[.22em] text-gold">{title}</p>
      <p className="mt-1 text-center text-[.68rem] uppercase tracking-[.14em] text-limestone">{era}</p>
      {/* Reversed so the first body a Mason enters sits at the tower's base. */}
      <div className="mt-4 flex flex-col-reverse gap-2">
        {bodies.map((body) => (
          <div key={body.name} className="temple-border rounded bg-black/45 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-lg leading-tight text-ivory">{body.name}</p>
              <p className="shrink-0 text-[.7rem] uppercase tracking-[.14em] text-gold">{body.degrees}</p>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-parchment/85">{body.note}</p>
          </div>
        ))}
      </div>
      {/* The connector down to the Craft. */}
      <div className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-gold/60 to-gold/15" aria-hidden="true" />
    </div>
  );
}

export function MasonicRites() {
  return (
    <section id="masonic-rites" className="relative isolate scroll-mt-24 overflow-hidden border-y border-gold/20 bg-black/55">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.96),rgba(43,8,12,.3)_44%,rgba(181,146,85,.12)_78%,rgba(8,8,8,.96))]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">The Rites</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            One foundation, many towers
          </h2>
          <p className="mt-4 leading-8 text-parchment">
            Every branch of Freemasonry stands on the same three Craft degrees, and none outranks
            them: a 32° Scottish Rite Mason holds no authority over a Master Mason in a Craft
            lodge — the numbers count degrees received, not command. The rites are best read as
            separate towers raised on one shared foundation, each telling its own continuation of
            the story the third degree leaves deliberately unfinished.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
          {/* ------------------------------------------------ the elevation */}
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Tower title="York Rite" era="a federation of bodies" bodies={YORK_BODIES} />
              <Tower title="Scottish Rite (AASR)" era="Supreme Councils, from 1801" bodies={SCOTTISH_BODIES} />
            </div>

            {/* The foundation both towers rest on. */}
            <div className="rounded border border-gold/40 bg-gold/[.08] p-5 shadow-aureate">
              <p className="text-center text-xs uppercase tracking-[.24em] text-gold">The Craft — Blue Lodge</p>
              <ol role="list" className="mt-4 grid gap-2 sm:grid-cols-3">
                {CRAFT_DEGREES.map((degree) => (
                  <li key={degree.numeral} className="rounded border border-gold/25 bg-black/50 p-4 text-center">
                    <p className="font-cinzel-brand text-2xl text-gold">{degree.numeral}</p>
                    <p className="mt-1 font-display text-lg leading-tight text-ivory">{degree.name}</p>
                    <p className="mt-1 text-[.7rem] uppercase tracking-[.12em] text-limestone">{degree.emblem}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-center text-xs leading-5 text-parchment/85">
                Conferred in a local lodge under a grand lodge&rsquo;s warrant. Everything above
                presupposes these three; nothing above outranks them.
              </p>
            </div>

            <p className="mt-4 text-xs leading-6 text-limestone">
              Alongside the rites stand the appendant and allied bodies — Shrine, Grotto, the Order
              of the Eastern Star — social and charitable orders requiring Craft membership (or, for
              the Eastern Star, kinship to a Mason). Prince Hall Masonry maintains this same
              architecture in full: its own grand lodges, chapters, councils, commanderies, and
              consistories.
            </p>
          </div>

          {/* ------------------------------------------------ the standing of bodies */}
          <div className="grid content-start gap-6">
            <div className="temple-border rounded bg-black/45 p-6">
              <div className="flex items-center gap-3">
                <Scale className="text-gold" size={20} aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory">Regular, liberal, clandestine</h3>
              </div>
              <dl className="mt-4 grid gap-4">
                {STANDING.map((entry) => (
                  <div key={entry.term} className="border-l border-gold/30 pl-4">
                    <dt className="font-display text-lg text-ivory">{entry.term}</dt>
                    <dd className="mt-1 text-sm leading-6 text-parchment">{entry.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="temple-border rounded bg-black/45 p-6">
              <div className="flex items-center gap-3">
                <Split className="text-gold" size={20} aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory">Why recognition matters</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-parchment">
                There is no worldwide Masonic authority. Each grand lodge is sovereign in its
                territory, and the fraternity coheres — where it does — through treaties of mutual
                recognition. Every schism in the dossier below is visible as a recognition event:
                the Antients warring with the Moderns, the 1877 withdrawal from the Grand Orient,
                and the two centuries in which Prince Hall grand lodges were refused the
                recognition their descent plainly merited.
              </p>
            </div>

            <div className="temple-border rounded bg-black/45 p-6">
              <div className="flex items-center gap-3">
                <Landmark className="text-gold" size={20} aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory">Reading the map</h3>
              </div>
              <ul role="list" className="mt-3 grid gap-2 text-sm leading-6 text-parchment">
                <li className="border-l border-gold/25 pl-3">The York Rite is a federation of separate bodies, not a single ladder; its Templar orders are the one branch requiring Christian profession.</li>
                <li className="border-l border-gold/25 pl-3">The Scottish Rite&rsquo;s 33rd degree is conferred honoris causa — it cannot be petitioned for.</li>
                <li className="border-l border-gold/25 pl-3">Continental obediences work rites of their own, including the Rite Français and Memphis-Misraïm.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ the working tools */}
        <div className="mt-16">
          <h3 className="font-display text-2xl text-ivory">The working tools</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
            Each degree hands the candidate the instruments of a real building site and then turns
            them over: the operative use first, the moral application second. The jewels the three
            principal officers wear are the Fellow Craft&rsquo;s tools — square, level, and plumb —
            which is the system saying, in its own emblem language, that authority is a form of
            measurement.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {WORKING_TOOLS.map((group) => (
              <div key={group.degree} className="temple-border rounded bg-black/40 p-5">
                <p className="text-center text-[.7rem] uppercase tracking-[.22em] text-gold">{group.degree}</p>
                <ul role="list" className="mt-4 grid gap-4">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="grid grid-cols-[3.5rem_1fr] items-center gap-4">
                      <ToolGlyph icon={tool.icon} />
                      <div className="min-w-0">
                        <p className="font-display text-base leading-tight text-ivory">{tool.name}</p>
                        <p className="text-[.7rem] leading-4 text-limestone">{tool.operative}</p>
                        <p className="mt-0.5 text-xs leading-5 text-parchment/85">{tool.speculative}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-limestone">
            The allocation above is the English working. American Craft ritual gives the Master
            Mason a single tool instead — the trowel, for spreading the cement of brotherly love.
          </p>
        </div>

        {/* ------------------------------------------------ the lodge as cosmos */}
        <div className="mt-16">
          <h3 className="font-display text-2xl text-ivory">The lodge as cosmos</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">
            A lodge room is laid out as a model of the world: oriented east to west as temples
            anciently were, the mosaic pavement underfoot for the dualities every life walks
            across, the starry heavens for a ceiling. The Master rules from the East where light
            rises; the Wardens mark the sun&rsquo;s setting and its meridian; the Tyler stands
            outside a guarded door. The three tapers about the altar are the lesser lights — Sun,
            Moon, and Master of the lodge.
          </p>
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
            <div className="temple-border rounded bg-black/40 p-4">
              <svg viewBox="0 0 340 212" className="block w-full" aria-hidden="true">
                {/* walls, with the west door gap */}
                <path d="M30 16 H330 V196 H30 V122 M30 90 V16" fill="none" stroke="rgba(181,146,85,.5)" strokeWidth="1.6" />
                {/* compass names */}
                <text x="180" y="10" textAnchor="middle" fontSize="8" letterSpacing="2" fill="rgb(129,118,107)">NORTH · THE PLACE OF DARKNESS</text>
                <text x="180" y="208" textAnchor="middle" fontSize="8" letterSpacing="2" fill="rgb(129,118,107)">SOUTH</text>
                <text x="338" y="109" textAnchor="middle" fontSize="8" letterSpacing="2" fill="rgb(181,146,85)" transform="rotate(90 334 106)">EAST</text>
                <text x="8" y="109" textAnchor="middle" fontSize="8" letterSpacing="2" fill="rgb(129,118,107)" transform="rotate(-90 10 106)">WEST</text>
                {/* dais line in the East */}
                <line x1="298" y1="40" x2="298" y2="172" stroke="rgba(181,146,85,.25)" strokeWidth="1" />
                {/* mosaic pavement */}
                {Array.from({ length: 32 }, (_, i) => {
                  const col = i % 8;
                  const row = Math.floor(i / 8);
                  return (col + row) % 2 === 0 ? (
                    <rect key={i} x={140 + col * 10} y={86 + row * 10} width="10" height="10" fill="rgba(231,221,204,.22)" />
                  ) : null;
                })}
                <rect x="140" y="86" width="80" height="40" fill="none" stroke="rgba(181,146,85,.35)" strokeWidth="1" />
                {/* altar on the pavement */}
                <rect x="172" y="98" width="16" height="16" fill="rgba(8,8,8,.85)" stroke="rgb(181,146,85)" strokeWidth="1.6" />
                <text x="180" y="109" textAnchor="middle" fontSize="7" fill="rgb(231,221,204)">VSL</text>
                {/* the three lesser lights */}
                {[[158, 80], [202, 80], [180, 138]].map(([x, y]) => (
                  <g key={`${x}-${y}`}>
                    <line x1={x} y1={y} x2={x} y2={y - 7} stroke="rgb(181,146,85)" strokeWidth="1.4" />
                    <circle cx={x} cy={y - 9.5} r="2.2" fill="rgb(231,221,204)" />
                  </g>
                ))}
                {/* officers */}
                {([[312, 106, "WM"], [52, 106, "SW"], [180, 180, "JW"], [292, 84, "SD"], [70, 84, "JD"], [44, 106, "IG"]] as const).map(([x, y, label]) => (
                  <g key={label}>
                    <circle cx={x} cy={y} r="7.5" fill="rgba(8,8,8,.9)" stroke="rgba(181,146,85,.8)" strokeWidth="1.3" />
                    <text x={x} y={y + 2.6} textAnchor="middle" fontSize="6.5" fill="rgb(231,221,204)">{label}</text>
                  </g>
                ))}
                {/* the pillars of the porch, flanking the west door */}
                {[[58, 78], [58, 134]].map(([x, y]) => (
                  <g key={`${x}-${y}`}>
                    <circle cx={x} cy={y} r="6" fill="none" stroke="rgb(181,146,85)" strokeWidth="1.6" />
                    <circle cx={x} cy={y} r="2" fill="rgba(181,146,85,.6)" />
                  </g>
                ))}
                {/* tyler, outside the door with the point of a sword */}
                <circle cx="14" cy="106" r="6.5" fill="rgba(8,8,8,.9)" stroke="rgba(122,17,26,.9)" strokeWidth="1.4" />
                <text x="14" y="122" textAnchor="middle" fontSize="6.5" fill="rgb(200,184,158)">Tyler</text>
              </svg>
              <p className="mt-2 text-center text-[.68rem] leading-4 text-limestone">
                The plan is schematic — an English-pattern lodge at labour. The paired circles at
                the door are the pillars of the porch; their letters belong to the ritual, not to a
                diagram.
              </p>
            </div>
            <ul role="list" className="grid content-start gap-2">
              {LODGE_LEGEND.map((officer) => (
                <li key={officer.key} className="rounded border border-gold/15 bg-black/40 p-3">
                  <p className="font-display text-base text-ivory">
                    <span className="mr-2 font-cinzel-brand text-sm text-gold">{officer.key}</span>
                    {officer.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-parchment/85">{officer.note}</p>
                </li>
              ))}
              <li className="rounded border border-gold/15 bg-black/40 p-3 text-xs leading-5 text-parchment/85">
                The letter G — for Geometry, and for more than geometry — hangs in the ceiling or
                shines in the East, by jurisdiction; the North holds no station, being the side the
                sun of the ancient world never reached.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
