export type TopicDossier = {
  slug: string;
  subtitle: string;
  orientation: string[];
  lenses: Array<{
    title: string;
    summary: string;
    points: string[];
  }>;
  traditions: Array<{
    name: string;
    period: string;
    summary: string;
    metaphysics: string[];
    sourceTexts: string[];
  }>;
  timeline: Array<{
    era: string;
    title: string;
    summary: string;
    /**
     * GEOMETRY ONLY — never displayed as authored. Inclusive first year CE at the conventional
     * boundary; negative for BCE. Set equal to endYear for a dated point event, which renders as
     * a lozenge rather than a zero-width bar. Entries without these render without a bar.
     */
    startYear?: number;
    /** GEOMETRY ONLY. Inclusive last year CE. */
    endYear?: number;
    /**
     * The period has not closed. Fades the bar's right edge and prints "present" instead of a
     * year. This is why the component needs no clock: an authored endYear lagging the real year
     * by a few years moves the axis end by a fraction of a percent and nothing reads wrong.
     */
    open?: boolean;
    /** Dating caveat for THIS entry, shown italic on a gold rule beneath the summary. */
    note?: string;
    /** Two short dated anchors justifying the extent. */
    anchors?: string[];
    /** Explains the computed gap preceding this entry, so absence is not read as a void. */
    gapNote?: string;
    /** Optional framed artwork rendered inside the entry — for events with an image of their own. */
    plate?: { image: string; alt: string; caption?: string; focus?: string };
  }>;
  figures: Array<{
    name: string;
    period: string;
    importance: string;
  }>;
  sourceTexts: Array<{
    title: string;
    tradition: string;
    note: string;
  }>;
  researchWorkbench: {
    glossary: Array<{
      /**
       * The headword. NOTE: also spread into `archiveTerms` in app/topics/[slug]/page.tsx,
       * where it widens the Featured Episodes match. Keep it the exact phrase.
       */
      term: string;
      definition: string;
      /** Which register the definition belongs to. Omit rather than guess. */
      register?: string;
      /**
       * Where to send the reader when the archive holds nothing but a better treatment exists
       * on this page. Without it a term with no episodes links to an empty search result.
       */
      seeAlso?: { label: string; href: string };
    }>;
  };
};

export const topicDossiers: Record<string, TopicDossier> = {
  astrology: {
    slug: "astrology",
    subtitle: "A dossier on the oldest continuous science of correspondence: omen lore to horoscopy, the great systems east and west, and the instruments this archive keeps for working them.",
    orientation: [
      "Astrology is not one system but a family of them, descended from Mesopotamian omen-watching through a Hellenistic synthesis that gave the West its horoscope: ascendant, houses, aspects, and lots, assembled in Greco-Roman Egypt around the second century BCE.",
      "The family then divides. India received the Hellenistic material and grew Jyotisha around the sidereal zodiac and the lunar mansions; China built an astrology on entirely different foundations — no ecliptic zodiac at all, but stems, branches, and the five phases; the Arabic world systematized what Rome let slip and handed it back to Europe twice over.",
      "The page holds the working parts: the four branches of practice, the tropical and sidereal zodiacs, the glyphs, the house systems, and the chart shapes — with the atlas below drawing what prose describes, and the archive's own instruments linked where they compute it."
    ],
    lenses: [
      {
        title: "Four Branches",
        summary: "One sky, four questions: the same machinery answers each differently.",
        points: ["Natal — the birth moment", "Horary — the question's moment", "Electional — choosing a moment", "Mundane — nations and epochs"]
      },
      {
        title: "Two Zodiacs",
        summary: "Tropical measures from the equinox; sidereal from the stars. They agreed around 285 CE and have drifted a degree every 72 years since.",
        points: ["Tropical: seasons", "Sidereal: constellations", "Ayanamsa: the offset", "Neither is 'wrong' — they measure different things"]
      },
      {
        title: "Aetherica Use",
        summary: "This topic is the reading room for the archive's largest instrument suite.",
        points: ["Celestial Instrument", "Decans and mansions", "Planetary hours", "Electional planner"]
      }
    ],
    traditions: [
      {
        name: "Hellenistic astrology",
        period: "2nd century BCE-7th century CE",
        summary: "The synthesis that invented the horoscope: ascendant, twelve places, aspects, lots, sect, and time-lords, worked in Greco-Roman Egypt and codified by Ptolemy and Vettius Valens.",
        metaphysics: ["Whole-sign houses", "Sect: day and night charts", "The lots, Fortune first", "Time-lord periods"],
        sourceTexts: ["Ptolemy, Tetrabiblos", "Vettius Valens, Anthology", "Dorotheus, Carmen Astrologicum"]
      },
      {
        name: "Jyotisha (Indian)",
        period: "2nd century CE-present",
        summary: "India's unbroken tradition: the sidereal zodiac, the twenty-seven nakshatras, planetary periods (dashas) that time the whole life, and a divisional-chart method of great refinement.",
        metaphysics: ["Sidereal zodiac with ayanamsa", "Nakshatras — the lunar mansions", "Vimshottari dasha periods", "Divisional (varga) charts"],
        sourceTexts: ["Yavanajataka", "Brihat Parashara Hora Shastra", "Varahamihira, Brihat Samhita"]
      },
      {
        name: "Chinese astrology",
        period: "Han dynasty-present",
        summary: "A parallel invention on different foundations: no ecliptic zodiac, but ten heavenly stems and twelve earthly branches crossing into the sixty-year cycle, read through the five phases — the Four Pillars of birth year, month, day, and hour.",
        metaphysics: ["Stems and branches", "The sixty-year cycle", "Five phases, not four elements", "Four Pillars (BaZi)"],
        sourceTexts: ["Han shu astronomical treatises", "Yuan Hai Zi Ping"]
      },
      {
        name: "Perso-Arabic and medieval Latin",
        period: "8th-17th century",
        summary: "The Abbasid translators systematized Greek and Indian material into the astrology Europe relearned twice — horary and electional practice at full sophistication, mundane cycles of Jupiter and Saturn, and the dignities elaborated into a scored system.",
        metaphysics: ["Essential and accidental dignity", "Horary judgment", "Great conjunction cycles", "Quadrant house division"],
        sourceTexts: ["Masha'allah, On Reception", "Abu Ma'shar, Great Introduction", "Bonatti, Liber Astronomiae", "Lilly, Christian Astrology"]
      },
      {
        name: "Modern and psychological",
        period: "1890-present",
        summary: "Alan Leo simplified the craft around character; Rudhyar and the Jungians rebuilt it as a psychology of individuation; the Uranian and midpoint schools re-engineered its geometry; and from 1993 the traditional sources returned in new translation.",
        metaphysics: ["Character as destiny", "Outer planets as generational", "Midpoints and harmonics", "The traditional revival"],
        sourceTexts: ["Alan Leo, The Art of Synthesis", "Rudhyar, The Astrology of Personality", "Project Hindsight translations"]
      }
    ],
    timeline: [
      {
        era: "c. 1800-1000 BCE",
        title: "Omen watching",
        summary: "Mesopotamian scholars compile celestial omens — eclipse, halo, planet rising — into the great series Enuma Anu Enlil: seventy tablets of if-then statements linking sky to kingdom. Astrology begins as state intelligence, not personal character.",
        startYear: -1800,
        endYear: -1000,
        anchors: ["Venus tablet of Ammisaduqa, c. 17th century BCE observations", "Enuma Anu Enlil compiled by c. 1000 BCE"]
      },
      {
        era: "410 BCE",
        title: "The first birth chart",
        summary: "A cuneiform tablet records planetary positions for a child born late in the fifth century — the earliest known natal horoscope. The sky's attention turns from the king to the individual.",
        startYear: -410,
        endYear: -410,
        anchors: ["Babylonian horoscope texts, earliest dated 410 BCE"]
      },
      {
        era: "2nd century BCE-2nd century CE",
        title: "The Hellenistic synthesis",
        summary: "In Ptolemaic and Roman Egypt the Babylonian zodiac meets Egyptian decans and Greek geometry: ascendant, twelve places, aspects, lots, and sect appear together as a working system — the horoscope as the West still recognizes it.",
        startYear: -150,
        endYear: 200,
        anchors: ["Nechepsos-Petosiris literature, 2nd century BCE", "Vettius Valens' Anthology, c. 150-175 CE"]
      },
      {
        era: "c. 150",
        title: "Ptolemy's Tetrabiblos",
        summary: "The astronomer of the Almagest writes astrology's most durable defense: a natural-philosophical account of celestial influence that will carry the art through fourteen centuries of respectability.",
        startYear: 150,
        endYear: 150
      },
      {
        era: "2nd-6th century",
        title: "India receives and transforms",
        summary: "The Yavanajataka — 'sayings of the Greeks' — carries Hellenistic horoscopy to India, where it fuses with the nakshatra tradition and the sidereal frame into Jyotisha: the same bones, a different living body.",
        startYear: 150,
        endYear: 600,
        anchors: ["Yavanajataka, 2nd-3rd century CE", "Varahamihira, 6th century"]
      },
      {
        era: "750-1000",
        title: "The Arabic golden age",
        summary: "Baghdad's translators and masters — Masha'allah, Sahl, Abu Ma'shar — systematize horary, perfect electional method, and build mundane astrology on Jupiter-Saturn conjunctions. Most of what medieval Europe knew, it learned from these books.",
        startYear: 750,
        endYear: 1000,
        anchors: ["Baghdad founded on an election, 762", "Abu Ma'shar dies 886"]
      },
      {
        era: "1100-1300",
        title: "Latin Europe relearns the art",
        summary: "Translation from Arabic restores astrology to the schools; it enters medicine, court, and calendar. Bonatti writes the Latin summa, and cathedral sculpture puts the zodiac over the doors.",
        startYear: 1100,
        endYear: 1300
      },
      {
        era: "1450-1650",
        title: "Apex and rupture",
        summary: "Print scatters ephemerides and almanacs; every court keeps an astrologer; Lilly's Christian Astrology gives English its horary classic in 1647 — while the new astronomy quietly removes the cosmology the art had rested on.",
        startYear: 1450,
        endYear: 1650,
        anchors: ["Regiomontanus' ephemerides, 1474", "Lilly, Christian Astrology, 1647"]
      },
      {
        era: "1650-1890",
        title: "The long eclipse",
        summary: "Astrology loses the universities and survives in almanacs and among surveyors of the curious. The practice thins to sun-sign fortune-telling's ancestors — but the texts wait.",
        startYear: 1650,
        endYear: 1890
      },
      {
        era: "1890-1930",
        title: "Revival through Theosophy",
        summary: "Alan Leo rebuilds astrology around character — 'character is destiny' — and mass-produces it by mail; prosecuted twice under the Vagrancy Act, he moves the art decisively from event-prediction toward psychology. In 1930 the modern sun-sign column is born.",
        startYear: 1890,
        endYear: 1930,
        anchors: ["Leo's Modern Astrology from 1895", "R. H. Naylor's column on Princess Margaret, 1930"]
      },
      {
        era: "1936-1980",
        title: "The psychological turn",
        summary: "Rudhyar reads the chart as a seed-pattern of individuation; Jung uses synchronicity to give correspondence a modern name; Ebertin's midpoints and the Hamburg school re-engineer the geometry. The chart becomes a mirror more than an oracle.",
        startYear: 1936,
        endYear: 1980,
        anchors: ["The Astrology of Personality, 1936", "Jung's foreword experiments, 1950s"]
      },
      {
        era: "1993-present",
        title: "The traditional revival",
        summary: "Project Hindsight begins translating the Hellenistic corpus; whole-sign houses, sect, and time-lords return to working practice. For the first time, the tradition's whole depth — Babylonian to modern — is in print at once.",
        startYear: 1993,
        endYear: 2024,
        open: true,
        anchors: ["Project Hindsight founded 1993", "Valens' Anthology complete in English, 2010"]
      }
    ],
    figures: [
      { name: "Berossus", period: "c. 300 BCE", importance: "Babylonian priest credited with carrying the omen tradition to the Greek world — the legendary hinge between Mesopotamia and the Hellenistic synthesis." },
      { name: "Claudius Ptolemy", period: "c. 100-170", importance: "Author of the Tetrabiblos, astrology's great apologia, and of the Almagest that fixed its sky." },
      { name: "Vettius Valens", period: "120-c. 175", importance: "Working astrologer whose Anthology preserves more actual Hellenistic practice — with worked charts — than any other source." },
      { name: "Abu Ma'shar", period: "787-886", importance: "Baghdad's great systematizer; his Great Introduction defined the art for the Arabic world and, in translation, for Latin Europe." },
      { name: "Guido Bonatti", period: "c. 1210-1296", importance: "The Latin Middle Ages' most cited astrologer — consulted by cities and condottieri, placed in Dante's Inferno for it." },
      { name: "William Lilly", period: "1602-1681", importance: "England's master of horary, whose Christian Astrology remains the working manual of the judgment of questions." },
      { name: "Alan Leo", period: "1860-1917", importance: "Father of the modern revival: character-centered, Theosophical, and twice prosecuted for it." },
      { name: "Dane Rudhyar", period: "1895-1985", importance: "Composer-philosopher who rebuilt astrology as a psychology of becoming — the chart as seed, not sentence." }
    ],
    sourceTexts: [
      { title: "Enuma Anu Enlil", tradition: "Mesopotamian", note: "The seventy-tablet omen series: the sky read as the gods' correspondence with the state." },
      { title: "Tetrabiblos", tradition: "Hellenistic", note: "Ptolemy's four books: the natural-philosophical case for celestial influence, and the tradition's anchor of respectability." },
      { title: "Anthology", tradition: "Hellenistic", note: "Valens' nine books of working technique with over a hundred example charts — the practitioner's counterpart to Ptolemy's theory." },
      { title: "Brihat Parashara Hora Shastra", tradition: "Jyotisha", note: "The foundational compendium of Indian natal method: houses, dashas, and the divisional charts." },
      { title: "Great Introduction", tradition: "Perso-Arabic", note: "Abu Ma'shar's summa, the channel through which Aristotelian cosmology and Persian cycles entered the art." },
      { title: "Christian Astrology", tradition: "Early modern", note: "Lilly's 1647 English classic — horary judgment taught by hundreds of worked examples." },
      { title: "The Astrology of Personality", tradition: "Modern", note: "Rudhyar's 1936 reformation: the birth chart as a whole-pattern of individuation rather than a list of fates." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Ascendant", definition: "The degree of the zodiac rising at the eastern horizon for a given moment and place — the hinge on which the whole chart turns." },
        { term: "Sect", definition: "The day/night division of Hellenistic practice: diurnal charts favor Sun, Jupiter, Saturn; nocturnal favor Moon, Venus, Mars. A planet's condition changes with the chart's sect.", register: "Hellenistic" },
        { term: "Dignity", definition: "A planet's strength by zodiacal position — domicile, exaltation, triplicity, term, face — scored and weighed in traditional judgment." },
        { term: "Lot (Part)", definition: "A calculated point projected from an arc between two bodies, the Lot of Fortune first among many; most reverse their formula by sect.", register: "Hellenistic" },
        { term: "Ayanamsa", definition: "The accumulating offset between tropical and sidereal zodiacs — about 24 degrees now, growing one degree every 72 years.", register: "Sanskrit" },
        { term: "Nakshatra", definition: "One of the 27 lunar mansions of Indian astrology, each spanning 13°20' — a finer zodiac keyed to the Moon.", register: "Sanskrit" },
        { term: "Horary", definition: "The branch that answers a question from the chart of the moment it is asked — judgment without a birth time." },
        { term: "Great conjunction", definition: "The Jupiter-Saturn meeting every twenty years, the clock of traditional mundane astrology's epochs." }
      ]
    }
  },
  mysticism: {
    slug: "mysticism",
    subtitle: "A comparative dossier on union, annihilation, and the dark: what the contemplative literatures claim, where they agree, and where the agreement may be an illusion.",
    orientation: [
      "Mysticism is a modern category laid over older practices: the word gathers together what Plotinus called henosis, the Sufis fana, the Kabbalists devekut, and the Christian contemplatives union — experiences of contact with, or absorption into, ultimate reality.",
      "The literatures divide by method as much as by tradition. The cataphatic way climbs by images, names, and love; the apophatic way proceeds by subtraction — not this, not that — toward what Dionysius called the divine darkness. Most traditions keep both ladders in the same house.",
      "Whether mystics of different traditions experience the same thing differently described, or different things shaped by their training, is the field's live quarrel — the perennialist and constructivist positions are both represented in this archive, and this page does not silently pick a side."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The self thins until something else is present: union described as marriage, annihilation, deification, or darkness.",
        points: ["Unio mystica", "Fana and baqa", "Theosis", "The dark night"]
      },
      {
        title: "Two Ladders",
        summary: "Affirmation and negation as complementary ascents — images carried up, then left behind.",
        points: ["Cataphatic: by names and images", "Apophatic: by unknowing", "Lectio, meditatio, contemplatio", "Ecstasy and sobriety"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic gathers episodes on contemplative practice, the ascent literatures, and the modern study of extraordinary experience.",
        points: ["Episode discovery", "Transcript search", "Comparative vocabularies", "Source lists"]
      }
    ],
    traditions: [
      {
        name: "Neoplatonic henosis",
        period: "3rd-6th century",
        summary: "Plotinus' return of the soul to the One — 'the flight of the alone to the Alone' — sets the grammar of ascent that Christian, Jewish, and Islamic mystics all inherit.",
        metaphysics: ["The One beyond being", "Emanation and return", "Purification, illumination, union", "Ecstasy as standing-out of self"],
        sourceTexts: ["Plotinus, Enneads", "Porphyry, Life of Plotinus", "Proclus, Elements of Theology"]
      },
      {
        name: "Christian apophatic tradition",
        period: "c. 500-17th century",
        summary: "From Dionysius' divine darkness through the Cloud of Unknowing to John of the Cross: God approached by negation, and the soul's progress mapped through nights it cannot see across.",
        metaphysics: ["Via negativa", "Purgation, illumination, union", "The dark night of sense and spirit", "Union as marriage of the soul"],
        sourceTexts: ["Dionysius, Mystical Theology", "The Cloud of Unknowing", "John of the Cross, Dark Night of the Soul", "Teresa of Avila, Interior Castle"]
      },
      {
        name: "Sufism",
        period: "8th century-present",
        summary: "Islam's mystical current: the annihilation of the self in God (fana) and the subsistence that follows (baqa), sung in Persian and Arabic poetry and disciplined in the orders.",
        metaphysics: ["Fana and baqa", "Dhikr, remembrance", "The stations and states", "Wahdat al-wujud, the unity of being"],
        sourceTexts: ["al-Hallaj, Diwan", "Rumi, Masnavi", "Ibn Arabi, Fusus al-Hikam", "Attar, Conference of the Birds"]
      },
      {
        name: "Jewish mysticism",
        period: "2nd century-present",
        summary: "From the Merkavah riders' ascent through the palaces to the Kabbalists' devekut — cleaving to God — and the ecstatic techniques of Abulafia: union sought while insisting on the Creator's otherness.",
        metaphysics: ["Merkavah ascent", "Devekut, cleaving", "The sefirot as ladder", "Ecstatic and theosophical Kabbalah"],
        sourceTexts: ["Hekhalot literature", "Zohar", "Abulafia's handbooks"]
      },
      {
        name: "The modern study",
        period: "1902-present",
        summary: "James made mysticism a subject; Underhill gave it a map; Huxley claimed a perennial core; Katz answered that every experience is shaped by its tradition. The argument is still open.",
        metaphysics: ["Ineffability and noetic quality", "The mystic way as psychology", "Perennialism", "Constructivism"],
        sourceTexts: ["James, Varieties of Religious Experience", "Underhill, Mysticism", "Huxley, The Perennial Philosophy", "Katz, Language, Epistemology and Mysticism"]
      }
    ],
    timeline: [
      {
        era: "204-270",
        title: "Plotinus and the One",
        summary: "The Enneads describe the soul's return to its source in union beyond thought — Porphyry says his teacher attained it four times in the years he knew him. The vocabulary of Western mysticism starts here.",
        startYear: 204,
        endYear: 270,
        anchors: ["Porphyry, Life of Plotinus 23", "Enneads edited c. 300"]
      },
      {
        era: "c. 500",
        title: "Dionysius names the darkness",
        summary: "The Mystical Theology — five short chapters — teaches ascent by negation into the 'brilliant darkness,' and hands every later Christian mystic both a method and an authority mistaken for apostolic.",
        startYear: 500,
        endYear: 530
      },
      {
        era: "858-922",
        title: "al-Hallaj",
        summary: "The Sufi who said 'I am the Real' — ana al-Haqq — and was executed at Baghdad for it. His death becomes Sufism's cautionary and defining story: what annihilation in God means, and what it costs to say so aloud.",
        startYear: 858,
        endYear: 922,
        anchors: ["Executed at Baghdad, 922", "Massignon's four-volume study, 1922"]
      },
      {
        era: "1090-1153",
        title: "Bernard and the bridal way",
        summary: "Bernard of Clairvaux preaches eighty-six sermons on the Song of Songs without leaving its first two chapters: mystical union read as marriage, and love made the engine of ascent for the medieval West.",
        startYear: 1090,
        endYear: 1153
      },
      {
        era: "c. 1260-1361",
        title: "The Rhineland masters",
        summary: "Eckhart preaches the birth of God in the soul and the Godhead beyond God — in German, to nuns and townspeople; Tauler and Suso carry the teaching on after the papal condemnation of 1329.",
        startYear: 1260,
        endYear: 1361,
        plate: {
          image: "/images/stock/lamp-bearer",
          alt: "A cloaked figure carrying a lantern down a wet stone path toward a lamplit town below",
          caption: "The Rhineland teaching travelled in the vernacular — sermons carried down from the schools into kitchens and convents. In Agnes' words at the papal court: the condemned propositions kept preaching.",
          focus: "48% 50%"
        },
        note: "In agro dominico (1329) condemned twenty-eight of Eckhart's propositions; he had died while the case was pending.",
        anchors: ["Eckhart's Paris questions, 1302", "Tauler dies 1361"]
      },
      {
        era: "c. 1375",
        title: "The Cloud of Unknowing",
        summary: "An anonymous English director tells a young contemplative to put everything created under a 'cloud of forgetting' and beat on the cloud above with 'a sharp dart of longing love' — Dionysian negation turned into plain pastoral advice.",
        startYear: 1375,
        endYear: 1375
      },
      {
        era: "1515-1591",
        title: "The Carmelite summit",
        summary: "Teresa of Avila maps the soul as a castle of seven dwelling places; John of the Cross charts the nights between them. Between them they give mystical progress its most systematic map — written under the Inquisition's eye.",
        startYear: 1515,
        endYear: 1591,
        anchors: ["Interior Castle, 1577", "John dies 1591; Dark Night written c. 1578-1585"]
      },
      {
        era: "1207-1273",
        title: "Rumi and the turning",
        summary: "Jalal al-Din Rumi meets Shams of Tabriz and grief becomes the Masnavi — and a practice: his Mevlevi order makes the turning body itself the prayer. Persian Sufism's high-water mark of union sung rather than argued.",
        startYear: 1207,
        endYear: 1273
      },
      {
        era: "1902-1911",
        title: "Mysticism becomes a subject",
        summary: "William James gives it four marks — ineffable, noetic, transient, passive — and Evelyn Underhill answers with a map of the whole mystic way. The academic study of mysticism begins as psychology and phenomenology at once.",
        startYear: 1902,
        endYear: 1911,
        gapNote: "The interval holds no landmark in this dossier, not no mysticism: Quietism's condemnation, Hasidism's rise, and the Romantics' recoveries all fall between the Carmelites and James.",
        anchors: ["Varieties of Religious Experience, 1902", "Underhill, Mysticism, 1911"]
      },
      {
        era: "1945-1978",
        title: "The perennialist quarrel",
        summary: "Huxley's Perennial Philosophy claims one summit behind every tradition's path; Zaehner distinguishes the summits; Katz's 1978 essay argues there is no unmediated experience at all. The field's central argument reaches its modern form.",
        startYear: 1945,
        endYear: 1978,
        anchors: ["The Perennial Philosophy, 1945", "Katz, Language, Epistemology and Mysticism, 1978"]
      },
      {
        era: "1978-present",
        title: "Contemplative studies now",
        summary: "Neuroscience scans meditators, philosophers re-litigate constructivism, and the traditions keep producing practitioners — the conversation between laboratory, seminar, and monastery remains unresolved and productive.",
        startYear: 1978,
        endYear: 2024,
        open: true
      }
    ],
    figures: [
      { name: "Plotinus", period: "204-270", importance: "The philosopher of the One, whose account of union set the terms for three religions' mystical literatures." },
      { name: "Pseudo-Dionysius", period: "c. 500", importance: "Author of the Mystical Theology; the divine darkness and the negative way descend from these few pages." },
      { name: "al-Hallaj", period: "858-922", importance: "Sufism's martyr of union, executed for saying aloud what the tradition holds can only be undergone." },
      { name: "Meister Eckhart", period: "c. 1260-1328", importance: "The Rhineland's boldest voice: the birth of God in the soul, preached in the vernacular and condemned at Avignon." },
      { name: "Rumi", period: "1207-1273", importance: "Persian Sufism's greatest poet; the Masnavi and the turning order both descend from his grief for Shams." },
      { name: "Teresa of Avila", period: "1515-1582", importance: "Cartographer of the Interior Castle and reformer whose accounts of union are precise enough to be argued with." },
      { name: "John of the Cross", period: "1542-1591", importance: "Poet of the dark night: the map of what contemplative progress feels like when it feels like nothing." },
      { name: "Evelyn Underhill", period: "1875-1941", importance: "Her 1911 Mysticism organized the whole field — awakening, purgation, illumination, dark night, union — for a century of readers." }
    ],
    sourceTexts: [
      { title: "Enneads", tradition: "Neoplatonic", note: "Plotinus' collected treatises; the final tractates describe union with the One directly." },
      { title: "Mystical Theology", tradition: "Christian apophatic", note: "Dionysius' five chapters on the ascent into darkness — the negative way's charter." },
      { title: "The Cloud of Unknowing", tradition: "English contemplative", note: "Anonymous fourteenth-century direction in the apophatic way, still in practical use." },
      { title: "Interior Castle", tradition: "Carmelite", note: "Teresa's seven dwelling places — the most systematic first-person map of the mystic way." },
      { title: "Dark Night of the Soul", tradition: "Carmelite", note: "John of the Cross on the purifications that feel like abandonment; the phrase every later writer borrows." },
      { title: "Masnavi", tradition: "Sufi", note: "Rumi's six books of teaching poetry — 'the Quran in Persian' — union sung in ten thousand couplets." },
      { title: "Varieties of Religious Experience", tradition: "Modern study", note: "James' 1902 lectures; the four marks of mystical experience begin the field's modern vocabulary." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Unio mystica", definition: "Union with the divine, the summit-term of the Christian literatures; its precise meaning — identity, marriage, participation — is exactly what the traditions dispute.", register: "Latin" },
        { term: "Apophatic", definition: "The way of negation: approaching the divine by unsaying every name and image, into what Dionysius called brilliant darkness.", register: "Greek" },
        { term: "Henosis", definition: "Oneness: Plotinus' term for the soul's union with the One, beyond intellect and being.", register: "Greek" },
        { term: "Fana", definition: "Annihilation of the self in God, in Sufi teaching — followed by baqa, subsistence in God after the self's extinction.", register: "Arabic" },
        { term: "Devekut", definition: "Cleaving to God: the Kabbalistic ideal of adhesion to the divine while the soul remains a creature.", register: "Hebrew" },
        { term: "Theosis", definition: "Deification: the Eastern Christian teaching that salvation is participation in the divine nature.", register: "Greek" },
        { term: "Dark night", definition: "John of the Cross' name for the purifying passages in which every consolation is withdrawn and progress feels like loss." }
      ]
    }
  },
  freemasonry: {
    slug: "freemasonry",
    subtitle: "A dossier on the Craft: operative roots, the grand lodge system, the rites and their degrees, and the long history of schism, recognition, and controversy.",
    orientation: [
      "Freemasonry is not one organization. It is a network of sovereign grand lodges, each supreme in its own territory, held together — and divided — by a system of mutual recognition. Two Masons from opposite ends of the earth may sit in the same lodge, or be forbidden to, depending on whether their grand lodges recognize one another.",
      "The Craft's documented history runs from medieval operative stonemasons' regulations, through the admission of non-masons in the seventeenth century, to the founding of the first Grand Lodge in 1717 and everything that followed: rival rites, schisms, exposures, a kidnapping that birthed an American political party, and a French split that still divides the fraternity today.",
      "This page keeps the strands distinct: the three Craft degrees that everything else presupposes, the appendant rites built above them, the separate and parallel histories of Prince Hall and Continental Masonry, and the difference between what grand lodges call regular, irregular, and clandestine."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The building site as a school: a man is his own rough ashlar, and the tools of measurement become instruments of judgment.",
        points: ["Rough and perfect ashlar", "Square and compasses", "The lodge as diagram", "Building as self-formation"]
      },
      {
        title: "Regular and Clandestine",
        summary: "Recognition is the fraternity's constitutional machinery — and the word 'clandestine' is a term of art, not an insult.",
        points: ["Sovereign grand lodges", "Landmarks and recognition", "The 1877 Grand Orient split", "Prince Hall's parallel history"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic gathers episodes on Masonic history, ritual, symbolism, and the Craft's entanglement with the wider esoteric current.",
        points: ["Episode discovery", "Transcript search", "Degree structure maps", "Source lists"]
      }
    ],
    traditions: [
      {
        name: "Craft (Blue Lodge) Masonry",
        period: "1717-present",
        summary: "The foundation everything else presupposes: three degrees conferred in a local lodge under a grand lodge's warrant. Whatever else a Mason joins, he is made here.",
        metaphysics: ["Entered Apprentice — the rough ashlar", "Fellow Craft — the winding stair", "Master Mason — the legend of Hiram", "No higher authority than the third degree"],
        sourceTexts: ["Anderson's Constitutions (1723)", "Preston, Illustrations of Masonry", "Emulation and Webb-form rituals"]
      },
      {
        name: "York Rite",
        period: "18th century-present",
        summary: "A sequence of separate bodies — Royal Arch chapter, Cryptic council, Knights Templar commandery — completing the Craft legend and, in its final orders, requiring Christian profession.",
        metaphysics: ["Royal Arch — the recovered Word", "Cryptic degrees — the vault", "Templar orders — chivalric Christianity", "A federation, not a single body"],
        sourceTexts: ["Webb, Freemason's Monitor (1797)", "General Grand Chapter constitutions"]
      },
      {
        name: "Scottish Rite (AASR)",
        period: "1801-present",
        summary: "Thirty degrees above the Craft, conferred by Supreme Councils descended from Charleston, 1801 — a philosophical library of Masonry staged as theatre, with the 33rd conferred as an honor.",
        metaphysics: ["Lodge of Perfection, 4-14", "Rose Croix, 15-18", "Council of Kadosh, 19-30", "Consistory 31-32; the 33rd honorary"],
        sourceTexts: ["Grand Constitutions of 1786", "Pike, Morals and Dogma (1871)"]
      },
      {
        name: "Prince Hall Masonry",
        period: "1775-present",
        summary: "The African American grand lodge tradition, descended from Prince Hall's African Lodge, chartered from London in 1784 after American lodges refused Black candidates — a complete, parallel grand lodge system with its own rites.",
        metaphysics: ["African Lodge No. 459", "A parallel grand lodge network", "Recognition withheld for two centuries", "Mutual recognition spreading since 1989"],
        sourceTexts: ["African Lodge charter (1784)", "Prince Hall's charges of 1792 and 1797"]
      },
      {
        name: "Continental (Liberal) Masonry",
        period: "1877-present",
        summary: "The tradition descending from the Grand Orient de France's 1877 decision to drop the required belief in a Supreme Being — adogmatic, often admitting women, and unrecognized by the Anglo-American grand lodges ever since.",
        metaphysics: ["Absolute liberty of conscience", "Adogmatic lodges", "Co-Masonry and women's obediences", "A rival definition of the Craft itself"],
        sourceTexts: ["Grand Orient constitution of 1877", "Le Droit Humain founding documents (1893)"]
      }
    ],
    timeline: [
      {
        era: "12th-16th century",
        title: "The operative lodge",
        summary: "Masons building cathedrals and castles organize around the site hut — the lodge — with trade secrets, recognition tokens, and geometry passed master to apprentice. The tools later moralized were first simply used.",
        startYear: 1150,
        endYear: 1550,
        plate: {
          image: "/images/topics/freemasonry-tracing",
          alt: "A medieval master mason kneeling on a cathedral floor, striking arcs with great dividers amid scaffolding and working crews",
          caption: "The tracing floor: full-scale geometry struck in plaster before it was cut in stone. The compasses were the master's instrument of command — what the drawing said, the building became.",
          focus: "50% 55%"
        },
        anchors: ["York Minster's tracing floor survives from the 13th century", "Regensburg ordinances of the German lodges, 1459"]
      },
      {
        era: "c. 1390",
        title: "The Regius Poem",
        summary: "The oldest of the Old Charges: rhymed regulations for the mason trade, opening with a legend that traces geometry from Euclid to England. Craft rules and craft myth are already bound together.",
        startYear: 1390,
        endYear: 1390,
        plate: {
          image: "/images/topics/freemasonry-plumb",
          alt: "Three masons working a wall at dusk — one on a scaffold dropping a plumb line, one levelling a course, one squaring a block",
          caption: "Plumb, level, and square: the working trio the Old Charges regulate and the later ritual moralizes — uprightness, equality, and rectitude were tools before they were virtues.",
          focus: "50% 45%"
        },
        note: "Dated on paleographic grounds; the Cooke manuscript follows c. 1410. More than a hundred Old Charges survive.",
        anchors: ["Regius MS, British Library, c. 1390", "Cooke MS, c. 1410"]
      },
      {
        era: "1598-1599",
        title: "The Schaw Statutes",
        summary: "William Schaw, Master of Works to the Scottish crown, issues statutes organizing Scotland's lodges as permanent institutions with records — the earliest lodge minutes in the world begin here.",
        startYear: 1598,
        endYear: 1599,
        anchors: ["First Schaw Statute, December 1598", "Lodge of Edinburgh (Mary's Chapel) minutes from 1599"]
      },
      {
        era: "17th century",
        title: "The accepted masons",
        summary: "Gentlemen with no trade connection begin joining operative lodges — 'accepted' masons. Why they wanted in, and what the lodges gave them, is the hinge question of Masonic historiography.",
        startYear: 1600,
        endYear: 1717,
        plate: {
          image: "/images/topics/freemasonry-ashlar-work",
          alt: "A stonemason cutting a rough block with mallet and chisel in his workshop while a finished, perfect cube stands in the courtyard behind him",
          caption: "The transition in one frame: the trade of shaping stone becoming a discipline for shaping men. The rough block under the chisel, the perfect ashlar already standing in the yard.",
          focus: "50% 45%"
        },
        anchors: ["Elias Ashmole records his initiation at Warrington, 1646", "Aberdeen lodge roll of 1670 is already mostly non-operative"]
      },
      {
        era: "1717",
        title: "The first Grand Lodge",
        summary: "Four London lodges meeting at the Goose and Gridiron alehouse form a Grand Lodge and elect a Grand Master — the moment the Craft acquires a central institution, and the calendar every later history counts from.",
        startYear: 1717,
        endYear: 1717,
        note: "Some scholarship argues for 1721 as the real institutional beginning, with 1717 back-dated by Anderson. The traditional date is kept here.",
        anchors: ["St John the Baptist's day, 24 June 1717", "Anderson's Constitutions published 1723"]
      },
      {
        era: "1730",
        title: "Exposures print the secrets",
        summary: "Samuel Prichard's Masonry Dissected sells out in days and prints the third-degree legend of Hiram Abiff for the first time — the murdered master builder, the lost word, the raising. The secret becomes the Craft's most public possession.",
        startYear: 1730,
        endYear: 1730,
        plate: {
          image: "/images/topics/freemasonry-acacia",
          alt: "A sprig of green acacia growing from a rough stone on which a white lambskin apron, mallet, plumb, square and compasses are laid, in a dark hall of pillars",
          caption: "The acacia marks the grave in the legend of the third degree: the master workman slain rather than betray the Word, and the sprig that shows where the lost is to be found. Prichard put it in print in 1730; the fraternity has been explaining it ever since.",
          focus: "50% 55%"
        },
        anchors: ["Masonry Dissected, October 1730", "Three editions inside a month"]
      },
      {
        era: "1751-1813",
        title: "Antients against Moderns",
        summary: "Irish Masons in London, shut out of the first Grand Lodge's circles, erect a rival 'Antient' Grand Lodge accusing the 'Moderns' of tampering with the ritual. Two grand lodges warrant lodges against each other for sixty years.",
        startYear: 1751,
        endYear: 1813,
        anchors: ["Antient Grand Lodge founded 1751", "Dermott's Ahiman Rezon, 1756"]
      },
      {
        era: "1775-1784",
        title: "Prince Hall and African Lodge",
        summary: "Prince Hall and fourteen other free Black men are initiated in a military lodge at Boston; refused by American grand lodges, they obtain a charter directly from London in 1784 as African Lodge No. 459 — the founding of a parallel Masonry that white American grand lodges would refuse to recognize for two centuries.",
        startYear: 1775,
        endYear: 1784,
        anchors: ["Initiation in Lodge No. 441 (Irish register), March 1775", "African Lodge No. 459 chartered 29 September 1784"]
      },
      {
        era: "1813",
        title: "The Union",
        summary: "Antients and Moderns merge as the United Grand Lodge of England, standardizing ritual and defining the Craft as three degrees 'including the Holy Royal Arch.' The settlement still governs English Masonry.",
        startYear: 1813,
        endYear: 1813,
        plate: {
          image: "/images/topics/freemasonry-pillars",
          alt: "A man standing between two colossal pillars, one of dark marble and one of light, at the porch of a temple against a stormy sunset",
          caption: "Boaz and Jachin, the pillars of the porch — and after 1813, an image of the Craft itself: two rival bodies, one dark with age and one polished new, holding up a single roof.",
          focus: "50% 55%"
        },
        anchors: ["Articles of Union, 27 December 1813", "Duke of Sussex first Grand Master of UGLE"]
      },
      {
        era: "1826-1840",
        title: "The Morgan affair",
        summary: "William Morgan, about to publish an exposure in upstate New York, is abducted and never seen again. The scandal births the Anti-Masonic Party — the first third party in American politics — and halves American membership within a decade.",
        startYear: 1826,
        endYear: 1840,
        anchors: ["Morgan abducted from Canandaigua jail, September 1826", "Anti-Masonic Party contests the presidency, 1832"]
      },
      {
        era: "1877",
        title: "The Grand Orient split",
        summary: "The Grand Orient de France removes the requirement of belief in a Supreme Being, appealing to absolute liberty of conscience. Anglo-American grand lodges withdraw recognition — the schism that still divides world Masonry into 'regular' and 'liberal' families.",
        startYear: 1877,
        endYear: 1877,
        note: "In grand lodge vocabulary, 'irregular' bodies depart from the landmarks; 'clandestine' ones lack lawful origin. Recognition, not ritual, is what the words track.",
        anchors: ["Grand Orient convent of September 1877", "UGLE reaffirms the Basic Principles in 1929"]
      },
      {
        era: "1893",
        title: "Women enter by another door",
        summary: "Le Droit Humain is founded in Paris as Co-Freemasonry, initiating women and men on equal terms after Maria Deraismes' initiation in 1882; women's grand lodges follow. Regular grand lodges do not admit women, and these obediences work outside recognition to this day.",
        startYear: 1893,
        endYear: 1893,
        anchors: ["Maria Deraismes initiated at Le Pecq, 1882", "Le Droit Humain founded 1893"]
      },
      {
        era: "1981",
        title: "Propaganda Due",
        summary: "Italy's P2 lodge — expelled by the Grand Orient of Italy years earlier — is exposed as a covert political network implicated in finance scandals and subversion. The affair remains the modern touchstone for Masonic conspiracy, and the clearest case of a lodge operating clandestinely in the strict sense.",
        startYear: 1981,
        endYear: 1981,
        anchors: ["Membership list seized at Licio Gelli's villa, March 1981", "Italian parliamentary commission report, 1984"]
      },
      {
        era: "1989-present",
        title: "Recognition, slowly",
        summary: "Mainstream American grand lodges begin recognizing their Prince Hall counterparts, state by state — a process still incomplete in parts of the American South. The fraternity's oldest injustice is unwound through its own constitutional machinery.",
        startYear: 1989,
        endYear: 2024,
        open: true,
        anchors: ["Connecticut extends recognition, 1989", "UGLE recognizes Prince Hall Grand Lodge of Massachusetts, 1994"]
      }
    ],
    figures: [
      { name: "William Schaw", period: "1550-1602", importance: "Master of Works to James VI whose statutes made Scottish lodges permanent record-keeping institutions — the Craft's documented pre-history begins with him." },
      { name: "Elias Ashmole", period: "1617-1692", importance: "Antiquary and founding Royal Society fellow whose 1646 diary entry is the most famous early record of a gentleman's initiation." },
      { name: "James Anderson", period: "c. 1679-1739", importance: "Presbyterian minister who compiled the 1723 Constitutions, replacing the old legendary histories with the Grand Lodge era's founding document." },
      { name: "Prince Hall", period: "c. 1735-1807", importance: "Abolitionist and founder of African Lodge No. 459, from which the entire Prince Hall grand lodge system descends." },
      { name: "Thomas Smith Webb", period: "1771-1819", importance: "Architect of the American York Rite: his Freemason's Monitor shaped the ritual worked in most United States lodges." },
      { name: "Albert Pike", period: "1809-1891", importance: "Sovereign Grand Commander who rewrote the Scottish Rite's degrees and whose Morals and Dogma made him both the rite's philosopher and the conspiracy literature's favorite quarry." },
      { name: "Maria Deraismes", period: "1828-1894", importance: "French feminist whose 1882 initiation broke the gender line and led to Co-Freemasonry's founding." }
    ],
    sourceTexts: [
      { title: "Regius Poem (Halliwell MS)", tradition: "Old Charges", note: "The oldest Masonic document: operative regulations in rhyme, with the craft's legendary history already attached." },
      { title: "Anderson's Constitutions", tradition: "Grand Lodge era", note: "The 1723 founding text: charges, regulations, and a rewritten traditional history for the new institution." },
      { title: "Masonry Dissected", tradition: "Exposure", note: "Prichard's 1730 exposure — hostile, bestselling, and the first print appearance of the Hiram legend. Historians rely on what the fraternity resented." },
      { title: "Illustrations of Masonry", tradition: "Craft", note: "William Preston's 1772 systematization of Masonic lecture and ceremony, ancestor of most English-language ritual work." },
      { title: "Ahiman Rezon", tradition: "Antient", note: "Laurence Dermott's constitution for the rival Grand Lodge — polemical, funny, and the Antients' case in their own words." },
      { title: "Morals and Dogma", tradition: "Scottish Rite", note: "Pike's 1871 degree commentary: a vast comparative-religion library, endlessly quoted and misquoted in controversy." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Ashlar", definition: "Building stone: rough as it leaves the quarry, perfect when squared for the wall — the Craft's central image of self-formation." },
        { term: "Landmarks", definition: "The principles a grand lodge holds unalterable; departing from them is what makes a body 'irregular' in another's eyes." },
        { term: "Clandestine", definition: "A term of art, not abuse: a lodge or grand lodge without lawful Masonic origin. Distinct from 'irregular,' which marks departure from the landmarks by an otherwise lawfully descended body." },
        { term: "Recognition", definition: "The treaty system between sovereign grand lodges; it decides whose members may sit in whose lodges, and it is where every schism becomes visible." },
        { term: "Appendant bodies", definition: "Rites and orders — York, Scottish, Shrine and the rest — built above the three Craft degrees, which they presuppose but cannot confer." },
        { term: "Tracing board", definition: "The painted diagram on which a degree's symbols are laid out for instruction — the lodge's teaching picture, descended from the master's tracing floor." },
        { term: "Hiram Abiff", definition: "The master builder of the third-degree legend, slain rather than betray the Word — the Craft's drama of fidelity and loss." }
      ]
    }
  },
  hermeticism: {
    slug: "hermeticism",
    subtitle: "A dossier on the Hermetica, their Greco-Egyptian world, and the long afterlife of Hermes Trismegistus.",
    orientation: [
      "Hermeticism names the traditions descending from Greek writings attributed to Hermes Trismegistus — the thrice-greatest — composed mainly in Roman Egypt between the first and third centuries CE, where the scribe-god Thoth had long been read as Hermes.",
      "The corpus divides in two: philosophical Hermetica on God, cosmos, mind, and rebirth, and the older technical Hermetica of astrology, medicine, alchemy, and talismans. The two families share an author and a cosmos of sympathies, not a single doctrine.",
      "This page keeps the ancient corpus, the Arabic transmission, the Renaissance revival, and the modern receptions distinct, because most confusions about 'Hermeticism' come from silently blending them into one continuous institution."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The human as a mortal-immortal double, capable of knowing the mind that made the cosmos.",
        points: ["Nous and Logos", "As above, so below", "Rebirth in Corpus Hermeticum XIII", "Ascent through the spheres"]
      },
      {
        title: "Two Corpora",
        summary: "Philosophical treatises of instruction beside technical manuals of astrology, alchemy, and talismans.",
        points: ["Corpus Hermeticum", "Asclepius", "Technical Hermetica", "Emerald Tablet"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic gathers episodes on Hermetic philosophy, correspondences, Renaissance magic, and the corpus' modern receptions.",
        points: ["Episode discovery", "Transcript search", "Correspondence instruments", "Source lists"]
      }
    ],
    traditions: [
      {
        name: "Philosophical Hermetica",
        period: "1st-3rd century CE",
        summary: "Greek treatises framed as the teaching of Hermes to Tat, Asclepius, and Ammon: revelation, cosmology, and the regeneration of the soul.",
        metaphysics: ["The One, the Good", "Nous as divine mind", "Logos ordering the cosmos", "The human as mortal-immortal double", "Rebirth (palingenesia)", "Ascent through the eight"],
        sourceTexts: ["Corpus Hermeticum I (Poimandres)", "Corpus Hermeticum XIII", "Asclepius", "Stobaeus excerpts"]
      },
      {
        name: "Technical Hermetica",
        period: "3rd century BCE-3rd century CE",
        summary: "Astrology, iatromathematics, stones, plants, and talismans under Hermes' name — older as a family than most of the philosophical treatises.",
        metaphysics: ["Cosmic sympathy", "Decans and melothesia", "Chains of stone, plant, and star", "Craft as participation in the cosmos"],
        sourceTexts: ["Liber Hermetis", "Cyranides", "Astrological Hermetica"]
      },
      {
        name: "Arabic and medieval Hermes",
        period: "8th-13th century",
        summary: "Hermes read as the prophet Idris and Enoch; the Emerald Tablet surfaces in Arabic and passes west with talismanic astrology.",
        metaphysics: ["Hermes as prophet of the sciences", "The three Hermeses of Abu Ma'shar", "Talismanic astral magic", "The Tablet's above-and-below"],
        sourceTexts: ["Kitab Sirr al-khaliqa (Emerald Tablet)", "Picatrix (Ghayat al-Hakim)", "Liber XXIV philosophorum"]
      },
      {
        name: "Renaissance revival",
        period: "1463-1614",
        summary: "Ficino's translation makes Hermes the most ancient theologian; the prisca theologia reads one wisdom running from Egypt to Plato.",
        metaphysics: ["Prisca theologia", "Man the great miracle", "Natural magic and correspondence", "Egyptian antiquity claimed, then lost"],
        sourceTexts: ["Ficino, Pimander (1471)", "Lazzarelli, Crater Hermetis", "Casaubon, De rebus sacris (1614)"]
      },
      {
        name: "Modern receptions",
        period: "1888-present",
        summary: "The occult revival takes the name while scholarship recovers the texts: two Hermeticisms that must not be confused with each other.",
        metaphysics: ["Golden Dawn synthesis", "The Kybalion's modern principles", "Nag Hammadi Hermetica", "The corpus re-read as Greco-Egyptian"],
        sourceTexts: ["The Kybalion (1908)", "Nag Hammadi codex VI", "Nock-Festugiere edition"]
      }
    ],
    timeline: [
      {
        era: "Ptolemaic Egypt",
        title: "Thoth becomes Hermes Trismegistus",
        summary: "In Greek-speaking Egypt the scribe-god Thoth is assimilated to Hermes, and astrological and technical writings begin to circulate under the name of the thrice-greatest.",
        startYear: -250,
        endYear: -30,
        anchors: ["Astrological Hermetica draw on the Nechepsos-Petosiris literature, 2nd century BCE", "Thoth's doubled 'greatest' epithet is attested in Egyptian usage before the Roman period"]
      },
      {
        era: "1st-3rd century CE",
        title: "The philosophical Hermetica",
        summary: "The treatises later gathered as the Corpus Hermeticum, together with the Perfect Discourse and the Stobaeus excerpts, are composed in Roman Egypt: dialogues of Hermes, Tat, and Asclepius on mind, cosmos, and rebirth.",
        startYear: 50,
        endYear: 300,
        anchors: ["Poimandres commonly placed in the 1st-2nd century CE", "Lactantius quotes the Perfect Discourse c. 305-311"]
      },
      {
        era: "Late antiquity",
        title: "Prophet to some, sorcerer to others",
        summary: "Lactantius enlists Hermes as a pagan witness to Christian truth; Augustine condemns the Asclepius' animation of statues; three Hermetic texts are copied into the Nag Hammadi codices and buried.",
        startYear: 300,
        endYear: 430,
        anchors: ["Nag Hammadi codex VI, buried mid-4th century, holds three Hermetica", "Augustine, City of God VIII, c. 413-426"]
      },
      {
        era: "Abbasid Baghdad",
        title: "Hermes, prophet of the sciences",
        summary: "Arabic writers identify Hermes with Idris and Enoch; the Emerald Tablet surfaces inside the Book of the Secret of Creation; Hermetic astrology and alchemy pass into Arabic science.",
        startYear: 750,
        endYear: 1000,
        gapNote: "Transmission rather than extinction: the Latin Asclepius keeps circulating and Greek copies survive in Byzantium. The dossier simply holds no dated landmark in the interval.",
        anchors: ["Kitab Sirr al-khaliqa, carrying the Emerald Tablet, c. 9th century", "Abu Ma'shar's account of the three Hermeses, 9th century"]
      },
      {
        era: "12th-13th century",
        title: "Latin Hermes returns",
        summary: "Translation from Arabic brings the Emerald Tablet and astral magic west; the Asclepius is quoted in the schools; the Book of the Twenty-Four Philosophers coins its God-as-infinite-sphere formula under Hermes' name.",
        startYear: 1120,
        endYear: 1300,
        anchors: ["Hugo of Santalla's Latin Emerald Tablet, 12th century", "Liber XXIV philosophorum in circulation by the late 12th century"]
      },
      {
        era: "1463-1614",
        title: "The Renaissance revival",
        summary: "Cosimo de' Medici has Ficino translate the Corpus before Plato; printed in 1471, the Pimander runs through edition after edition, and Hermes is read as the most ancient theologian.",
        startYear: 1463,
        endYear: 1614,
        anchors: ["Ficino's translation commissioned 1463, printed 1471", "Lazzarelli completes the corpus with CH XVI-XVIII before 1500"]
      },
      {
        era: "1614",
        title: "Casaubon's redating",
        summary: "Isaac Casaubon shows on philological grounds that the Greek of the Corpus is post-Christian. Hermes' claim to primeval antiquity collapses in learned Europe — without ending Hermetic practice in alchemical and Rosicrucian circles.",
        startYear: 1614,
        endYear: 1614,
        note: "The technical Hermetica were untouched by the argument, and the redating took the better part of a century to become consensus."
      },
      {
        era: "17th-19th century",
        title: "Underground continuities",
        summary: "The word 'Hermetic' migrates toward alchemy and secrecy; Rosicrucian manifestos, Hermetic compendia, and Masonic legend keep the figure at work beneath official learning.",
        startYear: 1614,
        endYear: 1888,
        anchors: ["Fama Fraternitatis printed 1614", "Musaeum Hermeticum, enlarged edition 1678"]
      },
      {
        era: "1888-1908",
        title: "The occult revival claims the name",
        summary: "The Hermetic Order of the Golden Dawn fuses Hermetica, Kabbalah, and ceremonial magic into one curriculum; The Kybalion popularizes seven 'Hermetic' principles that are modern New Thought rather than the ancient corpus.",
        startYear: 1888,
        endYear: 1908
      },
      {
        era: "20th century-present",
        title: "Scholarly recovery",
        summary: "Critical editions and the Nag Hammadi finds re-situate the Hermetica in Roman Egypt, read as Greco-Egyptian teaching rather than either primeval revelation or mere forgery.",
        startYear: 1924,
        endYear: 2024,
        open: true,
        anchors: ["Scott's edition from 1924; Nock-Festugiere, 1945-1954", "Nag Hammadi Hermetica published in translation through the 1970s"]
      }
    ],
    figures: [
      { name: "Hermes Trismegistus", period: "legendary", importance: "The attributed teacher: a fusion of Thoth and Hermes functioning as an author-name for a whole literature, not a recoverable person." },
      { name: "Marsilio Ficino", period: "1433-1499", importance: "Translator whose Pimander put the Corpus at the head of Renaissance philosophy and made Hermes the most ancient theologian." },
      { name: "Lodovico Lazzarelli", period: "1447-1500", importance: "Poet and Hermetist who translated the remaining treatises and wrote the Crater Hermetis, the revival's most devotional text." },
      { name: "Isaac Casaubon", period: "1559-1614", importance: "Philologist whose dating of the Corpus ended its claim to primeval antiquity and redrew the tradition's history." },
      { name: "G. R. S. Mead", period: "1863-1933", importance: "Theosophical scholar whose Thrice-Greatest Hermes carried the corpus into the occult revival's hands." },
      { name: "Andre-Jean Festugiere", period: "1898-1982", importance: "Co-editor of the critical edition and author of the mid-century synthesis that framed all later scholarship." },
      { name: "Frances Yates", period: "1899-1981", importance: "Historian whose Giordano Bruno and the Hermetic Tradition defined — and by later judgment overstated — the Hermetic thread in Renaissance thought." }
    ],
    sourceTexts: [
      { title: "Corpus Hermeticum", tradition: "Philosophical Hermetica", note: "Seventeen Greek treatises of revelation and instruction, from the vision of Poimandres to the rebirth of treatise XIII." },
      { title: "Asclepius", tradition: "Philosophical Hermetica", note: "The Perfect Discourse, surviving whole only in Latin; source of the god-making passage Augustine attacked." },
      { title: "Kore Kosmou and Stobaeus excerpts", tradition: "Anthology", note: "Hermetic fragments preserved in a fifth-century anthology, including the Virgin of the World." },
      { title: "Emerald Tablet", tradition: "Arabic transmission", note: "A short cosmological oracle first attested in Arabic — 'as above, so below' in its most quoted form." },
      { title: "Picatrix", tradition: "Technical Hermetica", note: "The talismanic compendium through which Hermetic astral magic reached Latin Europe." },
      { title: "The Kybalion", tradition: "Modern reception", note: "A 1908 New Thought work, widely influential; its seven principles are modern, not ancient." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Nous", definition: "Divine mind: in the Hermetica both an aspect of God and the faculty in the human that answers it.", register: "Greek" },
        { term: "Poimandres", definition: "The revealing intellect of the first treatise, and by extension the treatise's own name." },
        { term: "Palingenesia", definition: "Rebirth: the regeneration of the soul dramatized in Corpus Hermeticum XIII.", register: "Greek" },
        { term: "Prisca theologia", definition: "The Renaissance thesis of one ancient theology running from Hermes through Orpheus and Pythagoras to Plato.", register: "Latin" },
        { term: "Technical Hermetica", definition: "The astrological, medical, alchemical, and talismanic writings under Hermes' name — older as a family than the philosophical treatises." },
        { term: "Ogdoad", definition: "The eighth sphere beyond the seven planets: the stage of ascent where the soul joins the powers and sings." }
      ]
    }
  },
  theurgy: {
    slug: "theurgy",
    subtitle: "A dossier on divine work: the Chaldean Oracles, the Neoplatonic defense of rite, and the long argument over how the soul is raised.",
    orientation: [
      "Theurgy — theourgia, god-work — names the late-antique ritual tradition in which the divine is not merely discussed but engaged: rites, names, and consecrated symbols through which, its defenders insisted, the gods themselves act on the soul.",
      "Its scripture is the Chaldean Oracles; its defining argument is the exchange between Porphyry, who doubted that rite could do what reasoning could not, and Iamblichus, whose De Mysteriis answers that the gods are not moved by human craft but reach down through tokens they themselves have sown.",
      "The page keeps the Chaldean current, the Iamblichean defense, the Athenian synthesis, and the Christian and Renaissance transpositions distinct — the word travels further than any one of its theologies."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "Rite completes what reasoning begins: the soul is raised by symbols planted in matter and in itself.",
        points: ["Synthemata and symbola", "Ascent of the soul", "Divine names and light", "Prayer as participation"]
      },
      {
        title: "The Debate",
        summary: "Porphyry's questions and Iamblichus' answer frame everything that follows.",
        points: ["Letter to Anebo", "De Mysteriis", "Gods, daimones, heroes, souls", "Theurgy above theology"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic gathers episodes on Iamblichus, Neoplatonism, ritual philosophy, and the western reception of god-work.",
        points: ["Episode discovery", "Transcript search", "Comparative ritual maps", "Source lists"]
      }
    ],
    traditions: [
      {
        name: "Chaldean current",
        period: "2nd century CE",
        summary: "The hexameter Oracles attributed to the two Julians: fire and light mysticism with a liturgy of ascent, known now only in fragments.",
        metaphysics: ["The Paternal Intellect", "Hecate as life-giving membrane", "Iynges, Connectors, Teletarchs", "The flower of the mind"],
        sourceTexts: ["Chaldean Oracles (fragments)"]
      },
      {
        name: "Iamblichean theurgy",
        period: "c. 245-325",
        summary: "The defense of embodied rite: matter is not a prison but a field sown with divine tokens, and ritual fits the soul's actual rank rather than pretending it is already free.",
        metaphysics: ["Synthemata sown in matter", "The scale of gods, angels, daimones, heroes, souls", "Rite matched to the soul's rank", "Theurgy above theology"],
        sourceTexts: ["Iamblichus, De Mysteriis", "On the Soul (fragments)"]
      },
      {
        name: "Athenian school",
        period: "5th-6th century",
        summary: "Proclus and his successors weave theurgy through the whole Platonic curriculum: hymns, chains of sympathy, and the hieratic art.",
        metaphysics: ["Henads", "Chains (seirai) of sympathy", "Telestike, the consecration of statues", "Prayer according to rank"],
        sourceTexts: ["Proclus, On the Hieratic Art", "Proclus, Hymns", "Platonic Theology"]
      },
      {
        name: "Christian transposition",
        period: "c. 485-530",
        summary: "The Dionysian corpus reworks Proclean hierarchy into sacramental ascent — 'theurgy' becomes the divine work carried in the church's rites.",
        metaphysics: ["Celestial hierarchy", "Ecclesiastical hierarchy", "Divine darkness", "Sacrament as god-work"],
        sourceTexts: ["Pseudo-Dionysius, Celestial Hierarchy", "Ecclesiastical Hierarchy", "Mystical Theology"]
      },
      {
        name: "Renaissance and modern revivals",
        period: "15th century-present",
        summary: "Ficino softens theurgy into astral medicine; the occult revival takes the word for ceremonial magic; scholarship rehabilitates the original.",
        metaphysics: ["Astral spiritus", "Ceremonial 'theurgy' of the orders", "Academic recovery of Iamblichus"],
        sourceTexts: ["Ficino, De vita coelitus comparanda", "Shaw, Theurgy and the Soul"]
      }
    ],
    timeline: [
      {
        era: "2nd century",
        title: "The Chaldean Oracles",
        summary: "Hexameter oracles attributed to Julian the Chaldean and his son Julian the Theurgist: a revealed cosmology of fire and light with a rite of ascent. Later Platonists treat them as scripture.",
        startYear: 150,
        endYear: 200,
        note: "The attribution, and the collection's unity, are contested; the text survives only through quotation by later Neoplatonists.",
        anchors: ["Julian the Theurgist placed under Marcus Aurelius, r. 161-180", "Fragments preserved chiefly by Proclus and Damascius"]
      },
      {
        era: "c. 260-305",
        title: "Porphyry's doubts",
        summary: "The Letter to Anebo assembles the rationalist case against rite: why should gods need sacrifice, respond to names, or be reached through matter at all?",
        startYear: 260,
        endYear: 305
      },
      {
        era: "c. 280-325",
        title: "Iamblichus' answer",
        summary: "Writing as the priest Abamon, Iamblichus replies that theurgy is not human craft working on the gods but the gods working through tokens they planted — rite reaches what argument alone cannot.",
        startYear: 280,
        endYear: 325
      },
      {
        era: "361-363",
        title: "The theurgist on the throne",
        summary: "The emperor Julian, formed by Iamblichean teachers, briefly makes theurgic Hellenism the empire's religion; his death in Persia ends the experiment.",
        startYear: 361,
        endYear: 363,
        anchors: ["Julian reigns 361-363", "Hymn to King Helios, 362"]
      },
      {
        era: "437-529",
        title: "The Athenian school",
        summary: "Proclus heads the Academy and threads theurgy through systematic Platonism — hymns, the hieratic art, prayer graded to the soul's rank — until Justinian closes the school.",
        startYear: 437,
        endYear: 529,
        anchors: ["Proclus scholarch from 437", "Justinian's closure of the Athenian school, 529"]
      },
      {
        era: "c. 485-530",
        title: "Dionysius baptizes the hierarchy",
        summary: "A Christian writing under the name of Paul's Athenian convert reworks Proclean ranks into celestial and ecclesiastical hierarchy: 'theurgy' becomes the divine work carried in sacrament.",
        startYear: 485,
        endYear: 530
      },
      {
        era: "11th century",
        title: "Byzantine custody",
        summary: "Michael Psellos reads, excerpts, and criticizes the Chaldean material; his summaries carry much of what survives of the Oracles toward the West.",
        startYear: 1018,
        endYear: 1078,
        gapNote: "The interval is custody rather than practice: Byzantine copyists and commentators keep the texts legible while the rite itself has no institution."
      },
      {
        era: "15th-16th century",
        title: "Renaissance rereading",
        summary: "Plethon's recension of the Oracles reaches Italy; Ficino reads Iamblichus and softens theurgy into the astral medicine of De vita — respectable, Christianized, and deliberately less than its source.",
        startYear: 1440,
        endYear: 1600,
        anchors: ["Plethon's edition of the Oracles, before 1452", "Ficino, De vita coelitus comparanda, 1489"]
      },
      {
        era: "1875-1956",
        title: "The occult revival takes the word",
        summary: "Theosophy, the Golden Dawn, and their successors adopt 'theurgy' for ceremonial work — a genuine reception, but one whose ritual grammar is early modern rather than late antique.",
        startYear: 1875,
        endYear: 1956
      },
      {
        era: "1956-present",
        title: "Rehabilitation in the academy",
        summary: "Where an earlier generation dismissed theurgy as superstition grafted onto Platonism, Lewy's study and Shaw's Theurgy and the Soul re-read it as serious religion: embodied Platonism rather than its betrayal.",
        startYear: 1956,
        endYear: 2024,
        open: true,
        anchors: ["Lewy, Chaldaean Oracles and Theurgy, 1956", "Shaw, Theurgy and the Soul, 1995"]
      }
    ],
    figures: [
      { name: "Julian the Theurgist", period: "2nd century", importance: "Reputed co-author of the Chaldean Oracles, the hexameter revelation later Platonists treated as scripture." },
      { name: "Porphyry", period: "c. 234-305", importance: "Plotinus' editor and the tradition's indispensable critic: his Letter to Anebo provoked its defining defense." },
      { name: "Iamblichus", period: "c. 245-325", importance: "Author of De Mysteriis: rite over unaided reasoning, and the philosophical architecture the whole tradition stands on." },
      { name: "Julian the Apostate", period: "331-363", importance: "The emperor whose brief pagan restoration made Iamblichean theurgy, for two years, an imperial religion." },
      { name: "Proclus", period: "412-485", importance: "Systematized theurgy inside the Platonic curriculum: hymns, the hieratic art, and chains of sympathy." },
      { name: "Pseudo-Dionysius", period: "c. 500", importance: "Carried hierarchic theurgy into Christian sacramental theology under an apostolic name." },
      { name: "Michael Psellos", period: "1018-c. 1078", importance: "Byzantine polymath whose excerpts and critiques preserve much of the Chaldean material." }
    ],
    sourceTexts: [
      { title: "Chaldean Oracles", tradition: "Chaldean", note: "The theurgists' scripture, surviving as fragments in Neoplatonic quotation: fire, light, and the soul's ascent." },
      { title: "Porphyry, Letter to Anebo", tradition: "Critique", note: "The rationalist questionnaire on sacrifice, divination, and divine names that the whole tradition answers." },
      { title: "Iamblichus, De Mysteriis", tradition: "Iamblichean", note: "The Reply of Abamon: why the gods act through rite, and why theurgy stands above theology." },
      { title: "Proclus, On the Hieratic Art", tradition: "Athenian", note: "The short treatise on sympathy: heliotrope, lotus, cock, and stone as links in divine chains." },
      { title: "Julian, Hymn to King Helios", tradition: "Imperial", note: "The emperor's solar theology: Iamblichean metaphysics as public religion." },
      { title: "Pseudo-Dionysius, The Celestial Hierarchy", tradition: "Christian transposition", note: "Angelic ranks and sacramental ascent — Proclean architecture inside the church." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Theourgia", definition: "God-work: rite in which the gods act on the soul, coined against theologia — talk about the gods.", register: "Greek" },
        { term: "Synthema", definition: "A token sown by the gods in matter and in souls; the lever by which rite reaches what argument cannot.", register: "Greek" },
        { term: "Telestike", definition: "The consecration of statues so that a divine presence may inhabit and answer through them.", register: "Greek" },
        { term: "Anthos nou", definition: "The flower of the intellect: the summit of the soul, the faculty said to touch the One.", register: "Greek" },
        { term: "Iynx", definition: "A Chaldean intermediary power, imaged as a spinning wheel, drawing the divine and the soul toward each other.", register: "Greek" },
        { term: "Goeteia", definition: "Sorcery: coercive craft worked for advantage — the counter-term against which theurgists defined their work.", register: "Greek" }
      ]
    }
  },
  gnosticism: {
    slug: "gnosticism",
    subtitle: "A comparative dossier on gnosis, aeonology, mythic cosmology, and the drama of awakening.",
    orientation: [
      "Gnosticism is best approached as a family of ancient religious and philosophical currents rather than a single church or doctrine.",
      "Its systems often describe the soul as exiled, asleep, or entangled in a lower cosmos, and salvation as awakening through gnosis: direct, transformative knowledge of divine origin.",
      "The page distinguishes ancient sects, source texts, mythic cosmologies, and later esoteric receptions so they are not silently blended together."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The soul awakens from ignorance and remembers a higher origin.",
        points: ["Gnosis as salvific knowledge", "Alienation from the lower world", "Return to the divine fullness", "Myth as metaphysical diagram"]
      },
      {
        title: "Cosmic Drama",
        summary: "Many systems narrate a rupture between the divine fullness and the fashioned cosmos.",
        points: ["Pleroma", "Aeons", "Sophia", "Demiurge", "Archons", "Spark of light"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic connects episodes on archons, demiurgy, the soul, divine names, initiation, and the interpretation of myth.",
        points: ["Episode discovery", "Transcript search", "Comparative diagrams", "Textual source lists"]
      }
    ],
    traditions: [
      {
        name: "Sethian currents",
        period: "2nd-4th century",
        summary: "A mythic system centered on heavenly ascent, the seed of Seth, Barbelo, aeonic emanation, and the soul's liberation from archonic rule.",
        metaphysics: ["Invisible Spirit", "Barbelo as primal aeon", "Pleroma of emanated aeons", "Sophia's rupture", "Demiurge and archons", "Ascent through knowledge"],
        sourceTexts: ["Apocryphon of John", "The Holy Book of the Great Invisible Spirit", "Zostrianos", "Allogenes"]
      },
      {
        name: "Valentinian schools",
        period: "2nd-3rd century",
        summary: "A more ecclesial and philosophically subtle tradition associated with Valentinus, often reading Christian myth through aeonic emanation and restoration.",
        metaphysics: ["Bythos or primal depth", "Syzygies of aeons", "Sophia's passion", "Formation of psychic and material orders", "Christ as restorer", "Return through knowledge and integration"],
        sourceTexts: ["Gospel of Truth", "Tripartite Tractate", "Excerpts of Theodotus", "Gospel of Philip"]
      },
      {
        name: "Basilidean tradition",
        period: "2nd century",
        summary: "A complex Alexandrian current attributed to Basilides, remembered through hostile reports and fragments, with layered heavens and a strong interest in cosmic hierarchy.",
        metaphysics: ["Transcendent unbegotten source", "Layered heavens", "Cosmic rulers", "Ignorance and revelation", "Christic descent", "Liberation through knowledge"],
        sourceTexts: ["Fragments of Basilides", "Reports in Irenaeus", "Reports in Hippolytus", "Reports in Clement of Alexandria"]
      },
      {
        name: "Thomasine and wisdom Christianity",
        period: "1st-3rd century",
        summary: "Not always strictly called Gnostic, but often adjacent: a sayings and wisdom current emphasizing self-knowledge, inner light, and hidden interpretation.",
        metaphysics: ["Kingdom within and without", "Self-knowledge", "Hidden sayings", "Living Jesus as revealer", "Light imagery", "Single one or undivided state"],
        sourceTexts: ["Gospel of Thomas", "Book of Thomas the Contender", "Dialogue of the Savior"]
      },
      {
        name: "Manichaean religion",
        period: "3rd century onward",
        summary: "A world religion founded by Mani, combining Christian, Iranian, Buddhist, and Gnostic motifs into a radical dualist cosmology of light and darkness.",
        metaphysics: ["Two principles", "Light and darkness", "Mixture in the world", "Cosmic rescue of light particles", "Ascetic purification", "Prophetic succession"],
        sourceTexts: ["Kephalaia", "Manichaean Psalm-Book", "Shabuhragan fragments", "Cologne Mani Codex"]
      }
    ],
    timeline: [
      {
        era: "1st century",
        title: "Jewish, Platonic, and Christian seedbed",
        summary: "Apocalyptic, wisdom, baptismal, Platonic, and early Christian currents create the symbolic world in which later Gnostic myth develops.",
        startYear: 1,
        endYear: 130
      },
      {
        era: "2nd-3rd century",
        title: "Great system-builders",
        summary: "Sethian, Valentinian, Basilidean, and related currents develop elaborate myths of emanation, fall, archons, and return.",
        startYear: 120,
        endYear: 260,
        anchors: ["Valentinus teaching at Rome, c. 140-160", "Basilides active in Alexandria under Hadrian, 117-138"]
      },
      {
        era: "c. 180",
        title: "Heresiological witness",
        summary: "Irenaeus and other polemicists preserve hostile but important evidence for ancient Gnostic teachers and schools.",
        startYear: 180,
        endYear: 180
      },
      {
        era: "216-277",
        title: "Mani and global dualism",
        summary: "Manichaeism turns a Gnostic-style light-dark cosmology into a transregional religious movement, carried in time from the Atlantic to the China coast.",
        startYear: 216,
        endYear: 277,
        anchors: ["Mani born near Ctesiphon, 216", "Executed under Bahram I, c. 274-277"]
      },
      {
        era: "4th-5th century",
        title: "Suppression and survival",
        summary: "Imperial Christianity and anti-heretical law marginalize the Gnostic communities, while their texts survive in Coptic translation and buried libraries.",
        startYear: 300,
        endYear: 450,
        anchors: ["Nag Hammadi codices copied and buried, mid-4th century", "Theodosian anti-heretical legislation from 381"]
      },
      {
        era: "1945",
        title: "Nag Hammadi discovery",
        summary: "A major cache of Coptic codices transforms modern study by giving direct access to texts beyond hostile summaries.",
        startYear: 1945,
        endYear: 1945,
        gapNote: "Fifteen centuries in which the tradition speaks almost only through its enemies — with genuinely Gnostic currents surfacing at the margins: Manichaeism's long afterlife eastward, the Paulicians, the Bogomils, and the Cathar problem the historians still argue over.",
        plate: {
          image: "/images/topics/gnosticism-nag-hammadi",
          alt: "An Egyptian farmer crouched in a cliff hollow at sunset, examining leather-bound codices spilling from a broken clay jar",
          caption:
            "December 1945, below the cliffs of Jabal al-Tarif: a farmer digging for fertilizer breaks open a sealed jar and finds a library — thirteen codices that give these traditions back their own voice after fifteen centuries of being quoted only by their enemies.",
          focus: "50% 55%"
        }
      },
      {
        era: "1945-present",
        title: "Scholarly and esoteric reception",
        summary: "Gnostic materials enter comparative religion, depth psychology, esotericism, and modern spiritual discourse, sometimes carefully and sometimes loosely.",
        startYear: 1945,
        endYear: 2024,
        open: true,
        anchors: ["Jung receives the Codex Jung (Codex I), 1953", "Complete facsimile edition finished, 1977"]
      }
    ],
    figures: [
      { name: "Valentinus", period: "c. 100-160", importance: "A major Christian Gnostic teacher whose school shaped one of the most sophisticated aeonic systems." },
      { name: "Basilides", period: "2nd century", importance: "Alexandrian teacher associated with complex cosmological speculation and layered heavens." },
      { name: "Mani", period: "216-274", importance: "Founder of Manichaeism, a world religion with a powerful cosmology of light, darkness, and liberation." },
      { name: "Irenaeus of Lyon", period: "c. 130-202", importance: "A critic whose reports preserve important, though polemical, information about early Gnostic groups." },
      { name: "Plotinus", period: "204-270", importance: "Neoplatonic philosopher who criticized Gnostic movements while sharing parts of their late antique intellectual world." },
      { name: "Hans Jonas", period: "1903-1993", importance: "Modern scholar whose existential interpretation shaped twentieth-century readings of Gnosticism." }
    ],
    sourceTexts: [
      { title: "Apocryphon of John", tradition: "Sethian", note: "One of the clearest mythic accounts of emanation, Sophia, the Demiurge, archons, and awakening." },
      { title: "Gospel of Truth", tradition: "Valentinian", note: "A meditative homily on ignorance, error, revelation, and return to the Father." },
      { title: "Gospel of Philip", tradition: "Valentinian-adjacent", note: "A symbolic and sacramental text with bridal chamber, image, and mystery language." },
      { title: "Tripartite Tractate", tradition: "Valentinian", note: "A detailed theological treatise on emanation, fall, formation, and restoration." },
      { title: "Hypostasis of the Archons", tradition: "Sethian-adjacent", note: "A mythic retelling of Genesis through archonic powers and spiritual awakening." },
      { title: "Pistis Sophia", tradition: "Later Gnostic", note: "An elaborate post-resurrection dialogue with ascent, repentance, aeons, and cosmic orders." },
      { title: "Irenaeus, Against Heresies", tradition: "Heresiological source", note: "A hostile source that must be read critically but remains historically important." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Gnosis", definition: "Transformative knowledge of divine origin, not merely intellectual information." },
        { term: "Pleroma", definition: "The fullness or divine realm from which aeonic powers emanate." },
        { term: "Aeon", definition: "A divine emanation, principle, or hypostatic power within the fullness." },
        { term: "Sophia", definition: "Wisdom, often dramatized as the aeon whose rupture or passion helps explain cosmic descent." },
        { term: "Demiurge", definition: "The craftsman or fashioner of the lower cosmos, interpreted differently across Platonic and Gnostic systems." },
        { term: "Archon", definition: "A ruler or cosmic power associated with the administration, limitation, or binding of the lower world." }
      ],
    }
  },
  alchemy: {
    slug: "alchemy",
    subtitle: "A comparative dossier on metallic, spagyric, spiritual, laboratory, and inner alchemies.",
    orientation: [
      "Alchemy is not one thing. It is a long family of practices and symbolic languages concerned with transformation in matter, medicine, soul, body, cosmos, and divine knowledge.",
      "Some alchemies are explicitly laboratory based; others are medical, cosmological, devotional, initiatic, or contemplative.",
      "This page separates major lineages while showing why they repeatedly converge around purification, death and rebirth, conjunction, tincture, medicine, and the perfected body."
    ],
    lenses: [
      {
        title: "Core Operation",
        summary: "Transform the hidden nature of a thing through purification, separation, conjunction, and fixation.",
        points: ["Solve et coagula", "Purification", "Conjunction", "Tincture", "Elixir", "Philosophers' Stone"]
      },
      {
        title: "Three Registers",
        summary: "Alchemy moves across matter, medicine, and soul.",
        points: ["Metals and minerals", "Plants and spagyrics", "Subtle body and psyche", "Cosmic correspondences"]
      },
      {
        title: "Aetherica Use",
        summary: "The topic connects episodes on Daniel Wiseman, metallic alchemy, spagyrics, etheric force, freedom, and symbolic transformation.",
        points: ["Episode studies", "Process diagrams", "Reading lists", "Research prompts"]
      }
    ],
    traditions: [
      {
        name: "Hellenistic and Greco-Egyptian alchemy",
        period: "1st-4th century",
        summary: "Early alchemical literature develops in Egypt and the Mediterranean, combining craft, metallurgy, dyeing, cosmology, and sacred transformation.",
        metaphysics: ["Matter as living process", "Metals as growing bodies", "Dyeing and tincture", "Cosmic sympathy", "Temple and craft language", "Transformation through art"],
        sourceTexts: ["Zosimos fragments", "Physika kai Mystika", "Stockholm and Leyden papyri"]
      },
      {
        name: "Islamic alchemy",
        period: "8th-13th century",
        summary: "Arabic alchemy systematizes theory, laboratory method, medicine, balance, and the language later transmitted into Latin Europe.",
        metaphysics: ["Sulfur-mercury theory", "Balance", "Elixir", "Artificial generation", "Laboratory discipline", "Transmission into Latin alchemy"],
        sourceTexts: ["Jabirian corpus", "Kitab al-Asrar (al-Razi)", "Works attributed to al-Razi"]
      },
      {
        name: "Latin medieval alchemy",
        period: "12th-15th century",
        summary: "Alchemy enters Latin Europe through translation, becoming a learned, monastic, medical, and artisanal pursuit.",
        metaphysics: ["Mercury and sulfur", "Stone symbolism", "Generation of metals", "Purification of matter", "Christian allegory", "Secret transmission"],
        sourceTexts: ["Turba Philosophorum", "Rosarium Philosophorum", "Summa perfectionis (pseudo-Geber)", "Aurora Consurgens"]
      },
      {
        name: "Paracelsian and spagyric medicine",
        period: "16th-17th century",
        summary: "Paracelsian medicine reorients alchemy toward healing, extraction, signatures, astral correspondences, and the three principles.",
        metaphysics: ["Sulphur, mercury, salt — the tria prima", "Archeus", "Signatures", "Spagyric separation and recombination", "Medicinal tinctures", "Microcosm and macrocosm"],
        sourceTexts: ["Paracelsian corpus", "Archidoxis (c. 1526, printed 1569)", "Basilica chymica (Croll, 1609)", "Basil Valentine tradition"]
      },
      {
        name: "Rosicrucian and spiritual alchemy",
        period: "17th century onward",
        summary: "Alchemy becomes a language of initiation, Christian mysticism, inner regeneration, and the perfected human being.",
        metaphysics: ["Inner stone", "Christic regeneration", "Mystical death and rebirth", "Invisible college", "Temple of the heart", "Reintegration"],
        sourceTexts: ["Fama Fraternitatis", "Confessio Fraternitatis", "Chymical Wedding", "The Secret Symbols of the Rosicrucians"]
      },
      {
        name: "Chinese alchemy: waidan and neidan",
        period: "Early medieval China onward",
        summary: "Chinese alchemical traditions include external elixir practices and internal methods of refining essence, qi, and spirit.",
        metaphysics: ["Waidan and neidan", "Jing, qi, shen", "Cinnabar field", "Return to the Dao", "Inner furnace", "Immortality language"],
        sourceTexts: ["Cantong qi", "Baopuzi", "Wuzhen pian", "Daoist neidan commentarial traditions"]
      }
    ],
    timeline: [
      { era: "1st-4th century", title: "Greco-Egyptian foundations", summary: "Metallurgy, dyeing, temple symbolism, and Hellenistic cosmology produce early alchemical writing.", startYear: 100, endYear: 400, note: "100 CE reflects the earliest datable alchemical writing rather than the calendar century; nothing alchemical survives from before it.", anchors: ["Pseudo-Democritus, Physika kai mystika — the earliest surviving alchemical treatise", "Zosimos of Panopolis, fl. c. 300; the Leiden and Stockholm papyri, c. 300"] },
      { era: "8th-10th century", title: "Arabic systematization", summary: "Islamic alchemy develops laboratory vocabulary, sulfur-mercury theory, balances, elixirs, and medical applications.", startYear: 750, endYear: 1000, note: "The dating of the Jabirian corpus is contested — traditional attribution to a figure of c. 721-815, against Kraus's 1942 redating of the corpus to c. 850-950. This span is wide enough to hold either.", anchors: ["Abu Bakr al-Razi (865-925), Kitab al-Asrar", "Ibn Umayl (c. 900-960), al-Ma' al-waraqi"], gapNote: "Not a void. In the Greek East the tradition continues as commentary — Synesius, the alchemical Olympiodorus, and Stephanos of Alexandria, who lectured on the sacred art at Constantinople under Heraclius. This dossier simply holds no entry for it." },
      { era: "12th century", title: "Latin translation movement", summary: "Arabic alchemical texts enter Europe and begin a new medieval learned tradition.", startYear: 1140, endYear: 1200, note: "1144 is conventional, not certain: it rests on the colophon of Robert of Chester's translation, whose date and authorship have both been questioned.", anchors: ["Robert of Chester, Liber de compositione alchemiae, colophon dated 11 February 1144", "Gerard of Cremona (d. 1187) at Toledo"] },
      { era: "14th-15th century", title: "Image, allegory, and the Stone", summary: "European alchemy develops elaborate emblematic and allegorical language around the Philosophers' Stone.", startYear: 1300, endYear: 1500, anchors: ["Petrus Bonus, Pretiosa margarita novella, c. 1330", "Buch der heiligen Dreifaltigkeit, c. 1415-19 — the first substantially illustrated alchemical treatise"] },
      { era: "16th century", title: "Paracelsian medicine", summary: "Alchemy becomes medical, astral, and spagyric through Paracelsus and his followers.", startYear: 1520, endYear: 1620, note: "Deliberately a century, not a lifetime. Paracelsus (1493-1541) published almost nothing while alive; Paracelsianism is a posthumous editorial movement peaking c. 1570-1620 — which is why it overlaps the entry below.", anchors: ["Paracelsus, Der grossen Wundartzney, Augsburg 1536", "Oswald Croll, Basilica chymica, Frankfurt 1609"] },
      { era: "17th century", title: "Rosicrucian and spiritual readings", summary: "Alchemical language is put to work on initiation and Christian regeneration — and, by the same people, at the bench. The word of the period is chymistry and it does not distinguish alchemy from chemistry: Starkey, writing as Eirenaeus Philalethes, is the most read alchemical author of the age and Boyle\u2019s correspondent, and Newton leaves over a million words of alchemical manuscript.", startYear: 1600, endYear: 1700, anchors: ["Fama fraternitatis, Kassel 1614; Chymische Hochzeit, Strasbourg 1616", "Michael Maier, Atalanta fugiens, Oppenheim 1617"] },
      { era: "19th-20th century", title: "Occult and psychological revival", summary: "Alchemy is reread through Hermetic orders, Theosophy, depth psychology, and modern esoteric practice.", startYear: 1850, endYear: 1980, note: "1850 is a genuine hinge: the claim that alchemy was never really about matter is first stated in print by Atwood and Hitchcock within seven years of each other. Critical philology begins inside this same window and against its grain.", anchors: ["Atwood, A Suggestive Inquiry, 1850; Hitchcock, Remarks upon Alchemy, 1857", "Jung, Psychologie und Alchemie, 1944"] },
      { era: "Contemporary", title: "Laboratory, herbal, and symbolic renewal", summary: "Modern practitioners revisit metallic, mineral, plant, and inner alchemies through research, practice, and critical scholarship.", startYear: 1980, endYear: 2026, open: true, note: "An open period. The terminus is a container edge, not an event.", anchors: ["Dobbs, The Foundations of Newton's Alchemy, 1975", "Newman and Principe, 'Alchemy vs. Chemistry', 1998"] }
    ],
    figures: [
      { name: "Zosimos of Panopolis", period: "fl. c. 300", importance: "One of the earliest major alchemical authors, blending craft procedure with visionary symbolism. Our only real source for several earlier practitioners." },
      { name: "Maria the Jewess", period: "1st-3rd century", importance: "Known only through Zosimos, who cites her as a technical authority. The tribikos and kerotakis are described as hers, and the water bath still carries her name — balneum Mariae, bain-marie." },
      { name: "Ge Hong", period: "283-343", importance: "The Baopuzi neipian, c. 317-320, is the fullest early account of Chinese external alchemy: elixirs, ingredients, and the transcendents who took them." },
      { name: "Jabir ibn Hayyan tradition", period: "8th-10th century", importance: "A vast Arabic corpus by many hands, influential for theories of balance, elixir, and metallic transformation. Not the author of the Latin Summa perfectionis." },
      { name: "Abu Bakr al-Razi", period: "c. 854-925", importance: "Physician and alchemist, Latin Rhazes. His Kitab al-Asrar classifies substances, apparatus, and procedures with the allegory largely stripped out — the closest thing the tradition has to a laboratory manual. Not Fakhr al-Din al-Razi." },
      { name: "Zhang Boduan", period: "d. 1082", importance: "The Wuzhen pian, 1075, founds the southern neidan lineage and is the point at which internal alchemy becomes a systematic discourse rather than a reading of older elixir texts." },
      { name: "Paracelsus", period: "1493/94-1541", importance: "Recast alchemy as medicine: the tria prima, the archeus, the doctrine of signatures, preparation over Galenic prescription. His influence is largely posthumous, through printings from the 1560s to the Huser edition of 1589-91." },
      { name: "Michael Maier", period: "1568-1622", importance: "Physician to Rudolf II and the most inventive of the Rosicrucian-era emblematists. Atalanta fugiens (Oppenheim, 1617) sets fifty emblems against fifty fugues for three voices." },
      { name: "Thomas Vaughan", period: "1621-1666", importance: "Wrote as Eugenius Philalethes: a Welsh writer on spirit, nature, and the first matter, and the English translator of the Rosicrucian manifestos in 1652. Routinely confused with Eirenaeus Philalethes, who was George Starkey." },
      { name: "George Starkey", period: "1628-1665", importance: "Harvard-trained, wrote as Eirenaeus Philalethes, and was the most widely read alchemical author of the later seventeenth century. Boyle's correspondent and Newton's source." },
      { name: "Mary Anne Atwood", period: "1817-1910", importance: "A Suggestive Inquiry into the Hermetic Mystery (1850) is the founding text of the reading that alchemy was never really about matter. Her father bought back and burned the edition; the argument survived him." },
      { name: "Julius Evola", period: "1898-1974", importance: "Italian Traditionalist. La tradizione ermetica (1931) reads alchemy as an initiatic path and a doctrine of inner sovereignty rather than a laboratory art." }
    ],
    sourceTexts: [
      { title: "Physika kai mystika", tradition: "Greco-Egyptian, 1st-2nd c.", note: "The earliest substantial alchemical text, written under the name of Democritus by an author known only as pseudo-Democritus. Recipes for dyeing, gilding, and the imitation of gold and silver, framed as revealed secrets." },
      { title: "Leiden Papyrus X and the Stockholm Papyrus", tradition: "Greco-Egyptian, 3rd-4th c.", note: "Two Greek recipe collections from Thebes. No theory and no allegory: craft procedures for dyeing, gilding, and imitating gems and precious metals. The bench floor under everything else on this list." },
      { title: "Zosimos fragments", tradition: "Greco-Egyptian", note: "Visionary and technical fragments, surviving largely through Syriac and Arabic transmission rather than continuous Greek copying." },
      { title: "Tabula smaragdina", tradition: "Arabic, by the 9th c.; Latin from the 12th", note: "The Emerald Tablet. Not by Hermes Trismegistus and with no recovered Greek original: its earliest known text sits inside the Arabic Sirr al-khaliqa ascribed to Balinas. Fourteen lines that European alchemy read as its whole programme. It does not contain the phrase solve et coagula." },
      { title: "Turba Philosophorum", tradition: "Latin, 12th c., from a lost Arabic original", note: "A staged dialogue of pseudo-Presocratic philosophers, and the hinge on which Arabic alchemical vocabulary entered Latin Europe." },
      { title: "Summa perfectionis", tradition: "Latin, later 13th c.", note: "Circulates under the name Geber and is not by Jabir ibn Hayyan; there is no Arabic original. Newman's 1991 critical edition argues for Paul of Taranto. The most rigorous corpuscular theory of matter the tradition produced." },
      { title: "Rosarium philosophorum", tradition: "Latin, 15th c.; woodcuts printed 1550", note: "The compilation is fifteenth-century; the twenty woodcuts that made it famous — coniunctio, death, the returning soul — belong to the illustrated Frankfurt printing of 1550. Jung's 1946 commentary is on that image series, not on the medieval text." },
      { title: "Aurora consurgens", tradition: "Latin, 15th c.", note: "Circulates under the name of Thomas Aquinas; the ascription is spurious. A commentary that reads the Song of Songs and the Sapiential books as alchemy, leaning on the Latin Senior. Von Franz's edition defends the Aquinas attribution; that defence has not been accepted." },
      { title: "Chymische Hochzeit Christiani Rosencreutz", tradition: "Rosicrucian, 1616", note: "Published anonymously at Strasbourg. Johann Valentin Andreae later described it as a ludibrium — a piece of play. Read as initiatic allegory ever since, which may be the joke's most durable result." },
      { title: "Zhouyi cantong qi", tradition: "Chinese alchemy", note: "Ascribed to Wei Boyang and traditionally dated 142 CE; the received text is layered and the ascription legendary. Waidan and neidan commentators read the same lines as external elixir and as internal refinement, and both readings have long lineages." },
      { title: "Paracelsian corpus", tradition: "Medical alchemy", note: "A broad and unstable body of genuine, disputed, and outright spurious works, printed and reprinted from the 1560s. The pseudo-Paracelsian layer is large and was commercially useful." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Prima materia", definition: "The undifferentiated starting matter of the work. Named by dozens of cover-terms across the corpus and identified with a different substance by nearly every author; the concealment is deliberate.", register: "Operative" },
        { term: "Solve et coagula", definition: "Dissolve and fix: shorthand for separation, purification, and renewed coagulation. A late crystallisation of a much older pair, ubiquitous in modern occultism, and not — despite frequent claims — a phrase from the Emerald Tablet.", register: "Operative maxim" },
        { term: "Nigredo", definition: "Blackening. Putrefaction: the matter is reduced and allowed to rot. Melanosis in the Greek sequence.", register: "Colour stage", seeAlso: { label: "The four stages of the Work", href: "#magnum-opus" } },
        { term: "Albedo", definition: "Whitening. Ablution: what survived the rot is washed and the pure separated from the impure. Leukosis; the lunar stage, and in many texts the white tincture that transmutes to silver.", register: "Colour stage", seeAlso: { label: "The four stages of the Work", href: "#magnum-opus" } },
        { term: "Citrinitas", definition: "Yellowing. Xanthosis in the Greek four-colour sequence; most Latin texts drop it and run three colours to the red.", register: "Colour stage", seeAlso: { label: "The four stages of the Work", href: "#magnum-opus" } },
        { term: "Rubedo", definition: "Reddening. Fixation: body and spirit are wedded and the red tincture completed. Iosis; the end of the work, not a stage of it.", register: "Colour stage", seeAlso: { label: "The four stages of the Work", href: "#magnum-opus" } },
        { term: "Spagyric", definition: "A plant or mineral medicine prepared by separation, purification, and recombination. Paracelsus's coinage, from the Greek for to separate and to gather.", register: "Laboratory / medical" },
        { term: "Alkahest", definition: "The universal solvent: a reagent supposed to reduce any body to its first matter without being altered itself. Paracelsian in origin and pursued as a literal laboratory goal, above all by van Helmont and by Starkey, who spent years on it and did not find it.", register: "Laboratory / contested" },
        { term: "Chymistry", definition: "The period's own word, covering what later centuries split into alchemy and chemistry. Seventeenth-century authors did not recognise the division; it was made in the eighteenth and read backward onto them.", register: "Historiographical" }
      ]
    }
  }
};
