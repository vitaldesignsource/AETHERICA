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
  astrology: {
    image: "/images/topics/astrology-armillary",
    alt: "A vast brass armillary sphere hung in a roofless gothic hall, its zodiacal band lit against a field of stars",
    kicker: "As above",
    epigraph:
      "The armillary is not a picture of the sky but a model of it — rings for the ecliptic, the equator, the meridian. To read a chart is to hold that machine in mind and ask where a body stood inside it.",
    focus: "50% 34%"
  },
  hermeticism: {
    image: "/images/topics/hermeticism-thrice-great",
    alt: "A colossal bronze figure of a hooded, bearded sage seated beside a gilded armillary sphere, one hand raised, rain falling through the open dome above",
    kicker: "Trismegistus",
    epigraph:
      "The Hermetic writings are not one book but a library assembled across centuries, attributed to a teacher who may never have lived. What they share is a conviction that the cosmos is intelligible, and that the mind reading it is of the same order as the thing read.",
    focus: "48% 40%"
  },
  freemasonry: {
    image: "/images/topics/freemasonry-ashlars",
    alt: "A rough ashlar and a perfect ashlar set on a pavement beside square, compasses, plumb and level, in a ruined hall with a chequered floor",
    kicker: "Ars Regia",
    epigraph:
      "The rough ashlar and the perfect ashlar are the same stone at two moments. Every working tool on the pavement is an instrument of measurement before it is a symbol of anything.",
    focus: "50% 44%"
  },
  mysticism: {
    image: "/images/topics/mysticism-ascent",
    alt: "A stair rising through seven receding arches, each with a standing figure, the metals darkening to gold as the ascent reaches open sky",
    kicker: "The Ascent",
    epigraph:
      "The ladder, the seven gates, the graded spheres: the mystical literatures of very different traditions keep arriving at the same shape. Ascent is described far more often than arrival is.",
    focus: "50% 36%"
  },
  "christian-mysticism": {
    image: "/images/topics/christian-mysticism-vigil",
    alt: "A hooded figure kneeling in a ruined nave before a cross of light, weeping angels flanking the aisle and candles burning on the wet stone",
    kicker: "Via Negativa",
    epigraph:
      "The apophatic tradition proceeds by refusal: God is not this, not that, not the words being used. What remains after the subtractions is what Dionysius called the divine darkness — and it is described as brighter than light.",
    focus: "50% 40%"
  },
  "sacred-architecture": {
    image: "/images/topics/sacred-architecture-rose",
    alt: "Low sun through a gothic rose window casting its full geometry across a wet stone floor, an architect at a scale model in the aisle",
    kicker: "Geometria",
    epigraph:
      "The rose window is an argument in stone: that proportion is not decoration but structure, and that light entering a building can be made to draw the building's own reasoning on the floor.",
    focus: "50% 42%"
  },
  "western-esotericism": {
    image: "/images/topics/western-esotericism-circle",
    alt: "A robed figure standing inside a gilded circle inscribed on wet marble, veiled and winged statues surrounding the platform under a shaft of rain-lit sky",
    kicker: "The Current",
    epigraph:
      "Not one tradition but a current running through many: Hermetic, Neoplatonic, Kabbalistic, alchemical, Rosicrucian, Masonic. What holds them together is less a doctrine than a habit of reading the world as legible.",
    focus: "50% 46%"
  },
  symbolism: {
    image: "/images/topics/symbolism-colossus",
    alt: "A small robed figure standing before an enormous seated statue that holds a stone sphere, a narrow chasm of sunset opening behind them",
    kicker: "Symbolon",
    epigraph:
      "A symbolon was originally a broken token: two halves that proved their bearers belonged together. A symbol is not a picture standing for a thing — it is the half that asks for its counterpart.",
    focus: "40% 40%"
  },
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
    focus: "50% 50%",
    feature: {
      image: "/images/topics/kabbalah-lamps",
      alt: "Ten lit glass globes joined by brass arms in the arrangement of the sephirot, standing in a dark library beneath a starlit vault",
      label: "The Ten Utterances",
      caption:
        "Ten lamps and the paths between them. The diagram is late — the sephirotic tree as drawn is a medieval and early modern development — but what it organises is much older: the problem of how an unbounded source becomes a world without ceasing to be unbounded.",
      focus: "50% 40%"
    }
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
