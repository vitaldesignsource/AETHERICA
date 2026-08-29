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
      </div>
    </section>
  );
}
