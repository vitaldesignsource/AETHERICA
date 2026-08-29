export type TopicHero = {
  /**
   * Path under /public, WITHOUT a file extension. The page resolves the real file at render
   * time against a list of accepted extensions, so saving .png/.jpg/.jpeg/.webp all work.
   * Falls back to the generative cover art when no matching file is present.
   */
  image: string;
  /** Descriptive alt text for the background plate. */
  alt: string;
  /** Short line set above the title. */
  kicker: string;
  /** Pull-quote rendered beneath the definition. */
  epigraph?: string;
  /** Focal point for object-position so the subject stays framed on narrow screens. */
  focus?: string;
  /** Editorial plate set beside the overview prose. */
  feature?: TopicPlate;
  /** Full-bleed band that breaks the page between the reading and the dossier. */
  interlude?: TopicPlate;
  /** Renders the four-stage Magnum Opus band. Alchemy-specific content, opt-in per topic. */
  showMagnumOpus?: boolean;
  /** Renders the tria prima + seven planetary metals band. Alchemy-specific, opt-in per topic. */
  showPlanetaryMetals?: boolean;
};

export type TopicPlate = {
  /** Path under /public, WITHOUT a file extension — resolved the same way as the hero. */
  image: string;
  alt: string;
  label: string;
  caption: string;
  focus?: string;
};

export const topicHeroes: Record<string, TopicHero> = {
  gnosticism: {
    image: "/images/topics/gnosticism-sophia",
    alt: "Weathered stone hands cradling a dark polished sphere that has been broken and rejoined along a single seam of gold",
    kicker: "Gnosis",
    epigraph:
      "The Sethian and Valentinian myths both turn on a rupture in the fullness — a break in the Pleroma that the whole cosmos is arranged around. What is held here is not unbroken; it is mended, and the mend is visible.",
    focus: "50% 42%"
  },
  kabbalah: {
    image: "/images/topics/kabbalah-hexagram",
    alt: "A hexagram cut in pale stone, set over a disc divided into quadrants of ochre, rust, olive and black",
    kicker: "Ma'aseh Merkavah",
    epigraph:
      "Two triangles interlocked: what is above answered by what is below, and neither legible without the other. The figure is older and wider than any single tradition that has claimed it.",
    focus: "50% 50%"
  },
  philosophy: {
    image: "/images/topics/philosophy-sisyphus",
    alt: "A figure braced against a vast stone sphere on a dark volcanic slope beneath a heavy sky",
    kicker: "Φιλοσοφία",
    epigraph:
      "The love of wisdom was never promised as an arrival. The oldest schools describe it as a discipline practised daily against a slope that does not flatten.",
    focus: "56% 38%"
  },
  theurgy: {
    image: "/images/topics/theurgy-annunciation",
    alt: "An engraved scene of a winged figure sounding a trumpet above a griffin, with a classical temple in the valley below",
    kicker: "Θεουργία",
    epigraph:
      "Iamblichus argued against Porphyry that the gods are not reached by reasoning alone. Theurgy is divine work — action in which the soul participates rather than merely contemplates.",
    focus: "42% 34%"
  },
  alchemy: {
    image: "/images/topics/alchemy-ouroboros",
    alt: "A weathered stone ouroboros — a scaled dragon biting its own tail — spilling water into a dark pool within a ruined, ivy-covered arch",
    kicker: "Solve et Coagula",
    epigraph:
      "ἓν τὸ πᾶν — the All is One. The motto written inside the ouroboros of the Chrysopoeia of Cleopatra (Codex Marcianus graecus 299, a tenth- or eleventh-century copy of a far older figure).",
    focus: "50% 24%",
    feature: {
      image: "/images/topics/alchemy-great-work",
      alt: "A glass vessel of molten, bubbling gold from which a branching tree rises, crowned by a radiant sun face, celestial spheres, and an all-seeing eye",
      label: "The Great Work",
      caption:
        "The vessel, the fire, and the tree that rises out of them: matter refined until it carries sun, star, and eye. The operation and the operator are not finally separable.",
      focus: "50% 42%"
    },
    interlude: {
      image: "/images/topics/alchemy-laboratory",
      alt: "A Renaissance alchemical laboratory: alembics and copper stills over an open fire, glassware crowding a long table, open manuscripts, and a lit archway beyond",
      label: "The Operative Art",
      caption: "Furnace, alembic, and notebook — alchemy as bench practice before it was ever a metaphor.",
      focus: "50% 46%"
    },
    showMagnumOpus: true,
    showPlanetaryMetals: true
  }
};
