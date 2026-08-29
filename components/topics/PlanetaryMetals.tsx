import Link from "next/link";

/**
 * The tria prima and the seven planetary metals.
 *
 * Glyph note: only the U+2600-block planetary signs are used (♄ ♃ ♂ ☉ ♀ ☿ ☽), the same set already
 * shipped by components/sections/PlanetaryHeptagram.tsx. The Alchemical Symbols block (U+1F700–1F77F)
 * is deliberately avoided — font coverage for it is close to nonexistent. Sulphur and salt are drawn
 * as inline SVG for the same reason.
 */

type Principle = {
  name: string;
  mark: "sulphur" | "mercury" | "salt";
  body: string;
};

const principles: Principle[] = [
  {
    name: "Sulphur",
    mark: "sulphur",
    body: "The combustible, active principle: what burns, and what gives a body its form, colour, and desire. Male, hot, dry. In the older two-principle theory it is one of the two exhalations from which all metals are compounded."
  },
  {
    name: "Mercury",
    mark: "mercury",
    body: "The volatile, fusible principle: what flows, vaporises, and carries. Female, cold, moist. Philosophical mercury is expressly not common quicksilver; the texts belabour the point."
  },
  {
    name: "Salt",
    mark: "salt",
    body: "The fixed, incombustible principle: the ash that remains after burning, the ground of manifestation. Paracelsus's addition, c. 1520s–30s, to a sulphur-mercury theory that was already seven centuries old when he found it."
  }
];

type Metal = {
  glyph: string;
  planet: string;
  metal: string;
  latin: string;
  gloss: string;
  /** Approximate lustre of the metal itself — the band's only colour information. */
  sheen: string;
  ring: string;
};

const metals: Metal[] = [
  {
    glyph: "♄",
    planet: "Saturn",
    metal: "Lead",
    latin: "plumbum",
    gloss: "Heaviest and basest of the seven: soft, dull, quickly filmed over by air. The usual starting matter, and the metal tied to putrefaction, melancholy, and the leaden body.",
    sheen: "linear-gradient(145deg,#6f6f74,#3a3a3f 62%,#232327)",
    ring: "rgba(129,118,107,.5)"
  },
  {
    glyph: "♃",
    planet: "Jupiter",
    metal: "Tin",
    latin: "stannum",
    gloss: "Soft, white, low-melting; it cries audibly when bent. The expansive, jovial metal; alloyed with copper it makes bronze.",
    sheen: "linear-gradient(145deg,#d6d9d8,#9aa0a1 60%,#666c6e)",
    ring: "rgba(214,217,216,.42)"
  },
  {
    glyph: "♂",
    planet: "Mars",
    metal: "Iron",
    latin: "ferrum",
    gloss: "Hard, martial, and alone among the seven in rusting: its red crocus martis makes it the metal of Mars in colour as well as in temper.",
    sheen: "linear-gradient(145deg,#9c6a5a,#6d3b30 58%,#3d1d18)",
    ring: "rgba(122,17,26,.6)"
  },
  {
    glyph: "☉",
    planet: "Sol",
    metal: "Gold",
    latin: "aurum",
    gloss: "The fixed and incorruptible body. It does not tarnish and yields to no common solvent but aqua regia. Not a stage of the work but its end.",
    sheen: "linear-gradient(145deg,#f2d489,#b59255 58%,#7c5a25)",
    ring: "rgba(181,146,85,.75)"
  },
  {
    glyph: "♀",
    planet: "Venus",
    metal: "Copper",
    latin: "cuprum",
    gloss: "Warm-coloured, ductile, and green when it weathers; verdigris is its signature. The name runs back to aes cyprium, the metal of Cyprus — Venus's island.",
    sheen: "linear-gradient(145deg,#d08a5c,#94512f 58%,#5c2f1b)",
    ring: "rgba(208,138,92,.5)"
  },
  {
    glyph: "☿",
    planet: "Mercury",
    metal: "Quicksilver",
    latin: "argentum vivum",
    gloss: "The only metal liquid at ordinary heat, and so the hinge between body and spirit. The sources insist their philosophical mercury is not the apothecary's quicksilver.",
    sheen: "linear-gradient(145deg,#e4e8ea,#a9b0b4 54%,#6b7175)",
    ring: "rgba(228,232,234,.45)"
  },
  {
    glyph: "☽",
    planet: "Luna",
    metal: "Silver",
    latin: "argentum",
    gloss: "The second perfect metal: white, ductile, tarnishing but never rusting. Goal of the lesser work, argyropoeia, as gold is of chrysopoeia.",
    sheen: "linear-gradient(145deg,#eef0f2,#c2c7cc 56%,#878d93)",
    ring: "rgba(238,240,242,.5)"
  }
];

function PrincipleMark({ mark }: { mark: Principle["mark"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const };

  if (mark === "mercury") {
    return (
      <span aria-hidden className="text-2xl leading-none text-gold">
        ☿
      </span>
    );
  }

  if (mark === "salt") {
    // Circle bisected horizontally.
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" aria-hidden>
        <circle cx="12" cy="12" r="8" {...common} />
        <line x1="4" y1="12" x2="20" y2="12" {...common} />
      </svg>
    );
  }

  // Sulphur: triangle over a cross.
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" aria-hidden>
      <path d="M12 3.5 5.5 13.5h13L12 3.5Z" {...common} strokeLinejoin="round" />
      <line x1="12" y1="13.5" x2="12" y2="21" {...common} />
      <line x1="8.5" y1="17.6" x2="15.5" y2="17.6" {...common} />
    </svg>
  );
}

export function PlanetaryMetals() {
  return (
    <section className="relative isolate overflow-hidden border-y border-gold/20 bg-black/50">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(181,146,85,.12),transparent_58%),linear-gradient(180deg,rgba(8,8,8,.92),rgba(8,8,8,.98))]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">Metallic doctrine</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            Three principles, seven metals
          </h2>
          <p className="mt-4 leading-8 text-parchment">
            Beneath the colour sequence sits the theory the colours were about: what bodies are made of, and
            which bodies the art recognised.
          </p>
        </div>

        {/* Tria prima */}
        <ul className="grid gap-4 sm:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.name} className="rounded border border-gold/20 bg-black/45 p-5">
              <div className="flex items-center gap-3">
                <PrincipleMark mark={principle.mark} />
                <h3 className="font-cinzel-brand text-xl text-ivory">{principle.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-parchment/90">{principle.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-7 text-limestone">
          Sulphur and mercury are the older pair; salt is Paracelsus&rsquo;s third. The trio is a theory of
          composition, not a restatement of the four colours — the sources do not map one onto the other.
        </p>

        {/* Seven metals, Chaldean descending order — the order the texts use. */}
        <div className="relative mt-14">
          <div
            className="opus-rail pointer-events-none absolute left-0 right-0 top-[46px] hidden h-px overflow-hidden bg-gradient-to-r from-transparent via-gold/30 to-transparent lg:block"
            aria-hidden
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {metals.map((metal) => (
              <li key={metal.planet} className="group">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <div
                    className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full transition duration-500 group-hover:scale-[1.04]"
                    style={{
                      background: metal.sheen,
                      boxShadow: `0 0 0 1px ${metal.ring}, 0 12px 34px rgba(0,0,0,.55), inset 0 4px 16px rgba(255,255,255,.14), inset 0 -6px 18px rgba(0,0,0,.5)`
                    }}
                  >
                    <span className="text-3xl text-obsidian/85 drop-shadow-[0_1px_1px_rgba(255,255,255,.25)]" aria-hidden>
                      {metal.glyph}
                    </span>
                  </div>

                  <div className="lg:mt-6">
                    <p className="text-[.7rem] uppercase tracking-[.2em] text-gold">{metal.planet}</p>
                    <h3 className="font-cinzel-brand mt-1 text-xl text-ivory">{metal.metal}</h3>
                    <p className="font-manuscript-title font-display text-base italic text-parchment">
                      {metal.latin}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-7 text-parchment/90">{metal.gloss}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid gap-5 border-t border-gold/15 pt-8 lg:grid-cols-2">
          <p className="leading-8 text-parchment">
            The metal and the planet share one sigil because they were held to be one thing in two states. The
            glyph is the doctrine, not a mnemonic.
          </p>
          <p className="leading-8 text-parchment">
            Metals were understood to ripen in the earth — Aristotle&rsquo;s two exhalations, transmitted
            through Avicenna — so the art claimed only to hasten what nature was already doing. That premise,
            not credulity, is what made transmutation intelligible. Metals isolated later (antimony, bismuth,
            zinc) never joined the seven: the scheme is cosmological, not empirical.
          </p>
        </div>

        <Link
          href="/resources/celestial-timing"
          className="focus-ring mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[.18em] text-gold transition hover:text-ivory"
        >
          Step every third position around this circle and the weekday order falls out →
        </Link>
      </div>
    </section>
  );
}
