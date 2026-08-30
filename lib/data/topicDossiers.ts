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
  },
  kabbalah: {
    slug: "kabbalah",
    subtitle: "A dossier on the Kabbalah in its three families — Jewish, Christian, and Hermetic — and on the discipline of not mistaking one for another.",
    orientation: [
      "Kabbalah is the mystical and theosophical tradition of Judaism, elaborated from late antique ascent literature into the sefirotic systems of medieval Provence and Castile, and reorganised in sixteenth-century Safed around contraction, rupture, and repair.",
      "This dossier keeps three families deliberately distinct — Jewish Kabbalah, Christian Cabala, and Hermetic Qabalah — because their conflation is the commonest and most consequential error in the field.",
      "Datings are given as the evidence allows: the Sefer Yetzirah is contested across four centuries, the Zohar is pseudepigraphic and says so here, and the Golden Dawn's Qabalah is stated plainly to be a nineteenth-century synthesis."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "Kabbalah's central gesture is to read the Godhead as a structured emanation and human action as consequential within it — the commandments, performed with intention, reach upward and repair.",
        points: [
          "Ein Sof beyond all language; the sefirot as the grammar by which the Infinite becomes speakable.",
          "Theurgy of the commandments — ritual act with kavvanah affects the configuration of the upper worlds.",
          "Exile and repair told as one story of God, Israel, and cosmos simultaneously.",
          "Scripture as infinite cipher, every letter load-bearing and every reading provisional.",
          "Secrecy as method: transmission restricted, then repeatedly broken open — Safed, Sabbatianism, Hasidism."
        ]
      },
      {
        title: "Three Kabbalahs",
        summary: "Three families share a vocabulary and a diagram while diverging in theology, community, and aim; keeping them distinct is the first act of precision in this field.",
        points: [
          "Jewish Kabbalah: a tradition internal to halakhic Judaism, from Provence and Castile through Safed to Hasidism, inseparable from commandment and community.",
          "Christian Cabala: Pico and Reuchlin reading kabbalistic method as confirmation of Christian doctrine — a Renaissance appropriation with its own apologetic aims.",
          "Hermetic Qabalah: the Golden Dawn's nineteenth-century synthesis, wiring the Tree of Life to tarot, astrology, and ceremonial magic; a modern occult system, not a form of Judaism.",
          "The shared Tree of Life conceals divergent theologies — the same diagram means differently in each family.",
          "Transmission ran largely one way, through Latin: Rosenroth's Kabbala Denudata carried Zoharic texts out of their halakhic setting, and Mathers carried Rosenroth into the lodge."
        ]
      },
      {
        title: "Aetherica Use",
        summary: "How the archive puts this dossier to work — indexing, retrieval, and comparison across episodes that touch any of the three families.",
        points: [
          "Episode discovery — episodes tagged by family, so Zoharic material does not surface under Golden Dawn queries.",
          "Transcript search — Hebrew technical terms normalised across transliterations (tzimtzum, tsimtsum, zimzum).",
          "Comparative diagrams — sefirotic trees rendered per family, with the divergences marked rather than merged.",
          "Source lists — primary texts sorted by tradition and by honest dating, contested where contested."
        ]
      }
    ],
    traditions: [
      {
        name: "Merkavah and Heikhalot",
        period: "c. 2nd-7th centuries CE",
        summary: "The ascent literature of late antique Judaism: practitioners styled descenders to the Chariot traverse seven heavenly palaces, past angelic guards, by means of seals, divine names, and hymns, toward the vision of the enthroned Glory. Redacted over centuries and socially elusive, it is the deep background from which later Kabbalah drew images and prestige — while remaining a distinct enterprise of vision rather than emanation.",
        metaphysics: [
          "Seven palaces (heikhalot) of graded ascent",
          "The Chariot (Merkavah) as the object of vision",
          "Angelic gatekeepers, seals, and divine names",
          "Hymnic technique as vehicle of ascent",
          "The measured divine form (Shi'ur Qomah)"
        ],
        sourceTexts: [
          "Heikhalot Rabbati",
          "Heikhalot Zutarti",
          "3 Enoch (Sefer Heikhalot)"
        ]
      },
      {
        name: "Zoharic and theosophical Kabbalah",
        period: "Provence, Gerona, Castile, c. 1150-1300",
        summary: "The Kabbalah proper: from the Bahir in Provence through the Gerona circle to the Castile of the Zohar, the sefirot become a living map of the Godhead, the Shekhinah an exiled divine presence, and the commandments instruments that act upon the upper structure. The Zohar, written as ancient midrash in the circle of Moses de Leon, gave this theosophy its canonical and pseudepigraphic scripture.",
        metaphysics: [
          "Ein Sof beyond all attribute",
          "Ten sefirot as structured emanation",
          "Shekhinah as exiled presence",
          "Torah as cosmic symbol read in four senses",
          "Theurgy of the commandments"
        ],
        sourceTexts: [
          "Sefer ha-Bahir",
          "Zohar",
          "Azriel of Gerona, Commentary on the Ten Sefirot"
        ]
      },
      {
        name: "Lurianic Kabbalah",
        period: "Safed, 16th century",
        summary: "In the Galilean hill town of Safed, in the generation after the Spanish expulsion, Isaac Luria retold the whole system as drama: the Infinite contracts to make room for the world, the vessels of emanation shatter, and the human task is the gathering of scattered sparks. Taught orally for barely two years and transmitted through Hayyim Vital, it became the common theology of early modern Jewish mysticism.",
        metaphysics: [
          "Tzimtzum — divine self-contraction",
          "Shevirat ha-kelim — the breaking of the vessels",
          "Tikkun — cosmic repair through commandment and intention",
          "Partzufim — the reconfigured divine countenances",
          "Gilgul — transmigration of souls"
        ],
        sourceTexts: [
          "Etz Hayyim (Hayyim Vital)",
          "Sha'ar ha-Gilgulim",
          "Cordovero, Pardes Rimmonim (the Safed background)"
        ]
      },
      {
        name: "Christian Cabala",
        period: "Italy and Germany, 1486 to the 17th century",
        summary: "Beginning with Pico's 900 Theses of 1486 and systematised in Reuchlin's De arte cabalistica of 1517, Christian Cabala read kabbalistic method as hidden confirmation of Christian doctrine — the Trinity in the sefirot, the name of Jesus in an amplified Tetragrammaton. It is a Renaissance appropriation with its own apologetic aims, and it, not Jewish Kabbalah, is the ancestor of most later occult receptions.",
        metaphysics: [
          "Kabbalah as confirmation of Christian doctrine",
          "The Pentagrammaton — the Name amplified toward Jesus",
          "Hebrew as the language of creation",
          "Prisca theologia — one ancient wisdom behind all traditions"
        ],
        sourceTexts: [
          "Pico, Conclusiones (900 Theses)",
          "Reuchlin, De verbo mirifico",
          "Reuchlin, De arte cabalistica",
          "Knorr von Rosenroth, Kabbala Denudata"
        ]
      },
      {
        name: "Hermetic Qabalah",
        period: "Golden Dawn line, 1888 onward",
        summary: "The Qabalah of the Hermetic Order of the Golden Dawn and its successors is a nineteenth-century synthesis, assembled from Christian Cabalist intermediaries — above all Rosenroth as translated by Mathers — and fused with tarot, astrology, and ceremonial magic. It is a coherent modern occult system with its own integrity, and it is not a form of Judaism; this dossier states the distinction plainly because the literature so often does not.",
        metaphysics: [
          "The Tree of Life as universal scheme of correspondences",
          "Tarot, planets, and elements keyed to paths and sefirot",
          "Pathworking — imaginal ascent through the Tree",
          "The Four Worlds as planes of magical operation"
        ],
        sourceTexts: [
          "Mathers, The Kabbalah Unveiled",
          "Fortune, The Mystical Qabalah",
          "Crowley, 777",
          "Regardie, The Golden Dawn"
        ]
      }
    ],
    timeline: [
      {
        era: "c. 200-700 CE",
        title: "Merkavah and Heikhalot",
        summary: "The ascent literature of late antiquity: descenders to the Chariot pass through seven palaces guarded by angelic gatekeepers, armed with seals and hymns. The corpus was redacted over centuries and its social setting is still argued; it is the deep background of Kabbalah, not yet Kabbalah itself.",
        startYear: 200,
        endYear: 700,
        anchors: [
          "Mishnah Hagigah restricts Merkavah exposition, c. 200",
          "3 Enoch compiled, c. 5th-6th c."
        ],
        note: "The visionary tradition looks back to Ezekiel's chariot and to tannaitic restrictions on expounding it."
      },
      {
        era: "3rd-7th c. (contested)",
        title: "Sefer Yetzirah",
        summary: "A brief, gnomic treatise describes creation through thirty-two paths of wisdom — ten sefirot and the twenty-two letters. Its date is contested across the whole span from the third century to the seventh, and its sefirot are numbers and limits, not yet the divine potencies of the later Kabbalah.",
        startYear: 250,
        endYear: 650,
        note: "Every later family — Jewish, Christian, and Hermetic — reads itself back into this book; the book itself resists all of them."
      },
      {
        era: "c. 1176",
        title: "The Bahir surfaces in Provence",
        summary: "The Sefer ha-Bahir appears in Provence around 1176, the first text to speak of the sefirot as living divine potencies arranged in a structure. It presents itself as ancient midrash; its actual prehistory is obscure, and the question of older oral or written sources remains open.",
        startYear: 1176,
        endYear: 1176,
        gapNote: "The centuries between the Heikhalot corpus and the Bahir are transmission rather than void — ascent texts copied in the geonic academies, Yetzirah commentaries, and channels into the Rhineland pietists that scholarship is still tracing.",
        anchors: [
          "Bahir circulating in Provence, c. 1176"
        ]
      },
      {
        era: "1280s",
        title: "The Zohar in Castile",
        summary: "The Zohar begins to circulate in Castile in the 1280s, in the circle of Moses de Leon, written in an artificial Aramaic as the ancient midrash of Shimon bar Yochai. The pseudepigraphy was suspected almost at once and is now established; the book's power was never diminished by it.",
        startYear: 1280,
        endYear: 1290,
        anchors: [
          "Zohar circulating in Castile, 1280s"
        ],
        note: "Between Bahir and Zohar stand Gerona and Nahmanides' guarded allusions — and, in the same decade as the Zohar, Abulafia's quite different ecstatic school."
      },
      {
        era: "1486-1517",
        title: "Christian Cabala",
        summary: "Pico della Mirandola's 900 Theses of 1486 announce that no science gives greater certainty of the divinity of Christ than magic and Kabbalah; Reuchlin's De arte cabalistica of 1517 builds the system. A second family is founded — Christian in aim, Latin in language, and from the outset distinct from the Judaism it borrowed from.",
        startYear: 1486,
        endYear: 1517,
        gapNote: "The gap before this entry is an artefact of the chart, not of history: Jewish Kabbalah continued without interruption through the fourteenth and fifteenth centuries, in Spain, Italy, and the East.",
        anchors: [
          "Pico's 900 Theses, 1486",
          "De arte cabalistica, 1517"
        ]
      },
      {
        era: "1492",
        title: "Expulsion from Spain",
        summary: "The expulsion of the Jews from Spain in 1492 scatters the Castilian kabbalistic inheritance across the Mediterranean — to Italy, North Africa, and the Ottoman lands. Within two generations the tradition's centre of gravity has moved to the Galilean town of Safed.",
        startYear: 1492,
        endYear: 1492,
        anchors: [
          "Edict of expulsion, 1492"
        ]
      },
      {
        era: "1570-1572",
        title: "Luria at Safed",
        summary: "Isaac Luria teaches at Safed for barely two years before his death in 1572, leaving almost nothing in writing. Through Hayyim Vital's redactions his system — tzimtzum, the breaking of the vessels, tikkun — becomes the dominant kabbalistic theology of early modern Judaism.",
        startYear: 1570,
        endYear: 1572,
        anchors: [
          "Luria arrives in Safed, 1570",
          "Luria dies, 1572"
        ]
      },
      {
        era: "1665-1666",
        title: "Sabbatai Zevi",
        summary: "Nathan of Gaza proclaims Sabbatai Zevi messiah in 1665, reading his mission through Lurianic categories of sparks and repair; the movement sweeps the diaspora until Sabbatai's conversion to Islam under Ottoman pressure in 1666. The apostasy discredits public messianic Kabbalah and drives its radical wing underground.",
        startYear: 1665,
        endYear: 1666,
        anchors: [
          "Proclamation at Gaza, 1665",
          "Apostasy at Adrianople, 1666"
        ]
      },
      {
        era: "c. 1740-1760",
        title: "Hasidism",
        summary: "From around 1740 the Baal Shem Tov, who dies in 1760, and his circle turn Lurianic and earlier kabbalistic materials toward a popular devotional revival in Podolia and Volhynia — devekut for the ordinary Jew, the rebbe as channel, Kabbalah internalised as psychology of worship.",
        startYear: 1740,
        endYear: 1760,
        anchors: [
          "Baal Shem Tov active, c. 1740",
          "Baal Shem Tov dies, 1760"
        ]
      },
      {
        era: "1888",
        title: "The Golden Dawn",
        summary: "The Hermetic Order of the Golden Dawn is founded in London in 1888, and with it Hermetic Qabalah takes settled form: the Tree of Life as a scheme of correspondences binding tarot, astrology, and ceremonial magic. It is a nineteenth-century synthesis built from Latin intermediaries, and should be named as such.",
        startYear: 1888,
        endYear: 1888,
        anchors: [
          "Mathers' Kabbalah Unveiled, 1887",
          "Golden Dawn founded, 1888"
        ]
      },
      {
        era: "1941-",
        title: "Scholem and the academy",
        summary: "Gershom Scholem's Major Trends in Jewish Mysticism of 1941 founds the modern academic study of Kabbalah; Idel, Liebes, and their successors have since revised his map without abandoning the enterprise. The three families are now studied, and distinguished, as history.",
        startYear: 1941,
        endYear: 2026,
        open: true,
        anchors: [
          "Major Trends in Jewish Mysticism, 1941"
        ]
      }
    ],
    figures: [
      {
        name: "Shimon bar Yochai",
        period: "2nd century CE",
        importance: "Tannaitic sage in whose name the Zohar was written a millennium after his death — the tradition's chosen ancient mouthpiece, not its author."
      },
      {
        name: "Moses de Leon",
        period: "c. 1240-1305",
        importance: "Castilian kabbalist in whose circle the Zohar was composed and circulated as ancient midrash; the pseudepigraphy was questioned immediately after his death."
      },
      {
        name: "Isaac Luria",
        period: "1534-1572",
        importance: "The Ari of Safed, whose two years of oral teaching reorganised Kabbalah around contraction, rupture, and repair."
      },
      {
        name: "Hayyim Vital",
        period: "1542-1620",
        importance: "Luria's principal disciple and recorder; nearly everything called Lurianic reaches us through his redactions."
      },
      {
        name: "Giovanni Pico della Mirandola",
        period: "1463-1494",
        importance: "Florentine philosopher whose 900 Theses of 1486 announced that Kabbalah confirmed Christianity — the founding gesture of Christian Cabala."
      },
      {
        name: "Johannes Reuchlin",
        period: "1455-1522",
        importance: "German Hebraist whose De arte cabalistica of 1517 gave Christian Cabala its systematic form and defended Jewish books against confiscation."
      },
      {
        name: "Samuel Liddell MacGregor Mathers",
        period: "1854-1918",
        importance: "Golden Dawn co-founder whose translation of Rosenroth wired kabbalistic diagrams into a new occult synthesis — Hermetic Qabalah, a creation of his own century."
      },
      {
        name: "Gershom Scholem",
        period: "1897-1982",
        importance: "Founder of the academic study of Jewish mysticism; Major Trends of 1941 gave the field its map and its arguments."
      }
    ],
    sourceTexts: [
      {
        title: "Sefer Yetzirah",
        tradition: "Proto-kabbalistic (Jewish)",
        note: "A terse cosmological treatise on creation through thirty-two paths — ten sefirot and twenty-two letters. Composed somewhere between the third and seventh centuries; the dating remains genuinely contested."
      },
      {
        title: "Sefer ha-Bahir",
        tradition: "Jewish Kabbalah",
        note: "The earliest text to treat the sefirot as divine potencies, surfacing in Provence around 1176 with no secure earlier history; presented as ancient midrash."
      },
      {
        title: "Zohar",
        tradition: "Jewish Kabbalah",
        note: "The tradition's central book, circulated in Castile in the 1280s within the circle of Moses de Leon and written in artificial Aramaic as the ancient midrash of Shimon bar Yochai."
      },
      {
        title: "Etz Hayyim",
        tradition: "Lurianic Kabbalah",
        note: "Hayyim Vital's great redaction of Luria's oral teaching — tzimtzum, the breaking of the vessels, and tikkun in systematic form; Luria himself wrote almost nothing."
      },
      {
        title: "De arte cabalistica",
        tradition: "Christian Cabala",
        note: "Reuchlin's dialogue of 1517, the systematic statement of Christian Cabala — kabbalistic method turned to Christian apologetic ends by a scholar who nonetheless defended Jewish books."
      },
      {
        title: "Kabbala Denudata",
        tradition: "Christian Cabala",
        note: "Knorr von Rosenroth's Latin anthology of Zoharic and Lurianic texts (1677-84) — the principal conduit through which Kabbalah reached readers without Hebrew, Mathers among them."
      },
      {
        title: "The Mystical Qabalah",
        tradition: "Hermetic Qabalah",
        note: "Dion Fortune's 1935 exposition of the Golden Dawn's Tree of Life as a system of magical correspondences — lucid, influential, and a document of the modern synthesis rather than of Judaism."
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Sefirot",
          definition: "The ten emanations through which the hidden God unfolds into a knowable structure — mere numbers in the Sefer Yetzirah, divine potencies in the Kabbalah proper.",
          register: "Hebrew"
        },
        {
          term: "Ein Sof",
          definition: "The Infinite without attribute or name, prior to the sefirot, of which nothing can strictly be said.",
          register: "Hebrew"
        },
        {
          term: "Tzimtzum",
          definition: "Luria's primal contraction, by which the Infinite withdraws into itself to clear the space in which a world can stand.",
          register: "Hebrew"
        },
        {
          term: "Shevirat ha-kelim",
          definition: "The breaking of the vessels — the primordial catastrophe in which the light of emanation shattered its containers and fell as sparks into matter.",
          register: "Hebrew"
        },
        {
          term: "Tikkun",
          definition: "The repair of the broken vessels; in the Lurianic system the human vocation itself, enacted through commandment performed with intention.",
          register: "Hebrew"
        },
        {
          term: "Devekut",
          definition: "Cleaving to God — the contemplative adhesion that Hasidism made the business of ordinary life rather than the privilege of adepts.",
          register: "Hebrew"
        },
        {
          term: "Shekhinah",
          definition: "The indwelling divine presence, figured in the Kabbalah as the feminine last sefirah, in exile with Israel and awaiting reunion.",
          register: "Hebrew"
        },
        {
          term: "Gematria",
          definition: "The arithmetic of the Hebrew letters, by which words of equal numerical sum are read as secretly conversant.",
          register: "Hebrew"
        }
      ]
    }
  },
  philosophy: {
    slug: "philosophy",
    subtitle: "A dossier on the ancient schools as ways of life — from Thales to the Neoplatonic curriculum, and Hadot's recovery of their spiritual exercises.",
    orientation: [
      "This dossier treats philosophy as the ancient schools understood it — not a body of doctrine to be mastered but a way of life to be practised, a daily formation of attention, desire, and judgement that Pierre Hadot recovered for modern readers under the name of spiritual exercises.",
      "The schools stand adjacent to the mystery traditions without dissolving into them: Pythagorean silence, Platonic ascent, and the Neoplatonic curriculum share gestures with initiation, yet the philosophers insisted that their instrument was argument, and the archive keeps that insistence in view.",
      "Dating is comparatively firm here — trials, foundations, and closures are matters of record — but the texts are not: no Presocratic work survives whole, Socrates wrote nothing, and much that circulates under Pythagoras' name is pseudepigraphic."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The central gesture of ancient philosophy, on Hadot's reading, is the conversion of attention: doctrine exists in the service of a transformed life, and the schools were less lecture halls than communities of formation in which the soul was worked on daily. The archive treats this as philosophy's own discipline — contiguous with the mystery traditions in its gestures, distinct from them in its instrument, which remains argument.",
        points: [
          "Philosophy as an art of living rather than a system of propositions",
          "Spiritual exercises — meditation on death, examination of conscience, premeditation of evils",
          "The school as a community of formation, with common meals, silence, and rule",
          "Doctrine memorised so as to be available at the moment of trial",
          "Conversion as the turning of the whole soul, not a change of opinion"
        ]
      },
      {
        title: "School as Way",
        summary: "Each school pairs a physics or metaphysics with a regimen, and the pairing is the point: what a school holds about the cosmos and what it asks of its members before breakfast are one teaching seen from two sides. Comparing doctrine against exercise across the five traditions shows rivals in theory converging in therapy — and shows where the Neoplatonists began to negotiate the border with rite.",
        points: [
          "Pythagorean — a cosmology of number paired with silence, self-examination, and dietary rule",
          "Platonic — the theory of Forms paired with dialectic as purification and the practice of dying",
          "Aristotelian — a metaphysics of substance paired with habituation and the contemplative life",
          "Stoic and Epicurean — rival physics, convergent therapy: tranquillity through retrained assent and desire",
          "Neoplatonic — a graded curriculum in which the order of reading is itself the ladder of ascent"
        ]
      },
      {
        title: "Aetherica Use",
        summary: "How this dossier serves the archive: philosophy is the connective tissue of the collection, the tradition against which the Hermetic, theurgic, and mystical dossiers measure their claims, and its glossary underwrites half the technical vocabulary elsewhere.",
        points: [
          "Episode discovery",
          "Transcript search",
          "Comparative diagrams",
          "Source lists",
          "Cross-links to the hermeticism, theurgy, and mysticism dossiers"
        ]
      }
    ],
    traditions: [
      {
        name: "Pythagorean and Presocratic",
        period: "6th-5th centuries BCE",
        summary: "The conventional opening: Thales at Miletus subjecting the cosmos to argument, and Pythagoras at Croton founding a community in which a cosmology of number was inseparable from a rule of life — silence, examination, dietary observance. Nothing from Pythagoras' own hand survives, and the school's history is reconstructed from later, often idealising sources; the Presocratics as a whole reach us only in fragments quoted by others.",
        metaphysics: [
          "Number as the architecture of the cosmos",
          "The transmigration and purification of the soul",
          "Harmony of the spheres",
          "Kinship of all ensouled beings"
        ],
        sourceTexts: [
          "The Presocratic fragments (Diels-Kranz)",
          "Iamblichus, On the Pythagorean Way of Life",
          "The Golden Verses (pseudepigraphic)"
        ]
      },
      {
        name: "Platonic (Academy)",
        period: "c. 387 BCE onward",
        summary: "Founded in the grove of Academus around 387 BCE, the Academy made philosophy an institution: common meals, mathematics as propaedeutic, dialectic as purification. The dialogues stage the discipline as erotic ascent and preparation for death, and the school proved supple enough to turn wholly sceptical under Arcesilaus without ceasing to be a way of life — the same formation, a different exercise.",
        metaphysics: [
          "The Forms as intelligible reality",
          "The tripartite soul",
          "Recollection (anamnesis)",
          "The Good beyond being",
          "Assimilation to god as the end"
        ],
        sourceTexts: [
          "Plato, Phaedo",
          "Plato, Republic",
          "Plato, Symposium"
        ]
      },
      {
        name: "Aristotelian (Lyceum)",
        period: "335 BCE onward",
        summary: "Aristotle returns to Athens in 335 BCE and teaches in the Lyceum's covered walks; the school takes its other name, Peripatetic, from them. What survives are lecture courses rather than published books — a systematic ordering of nature and soul in which virtue is acquired by habituation, and the contemplative life is argued, carefully and with reservations, to be the happiest available to a human being.",
        metaphysics: [
          "Substance, form, and matter",
          "The four causes",
          "Potentiality and actuality",
          "The unmoved mover",
          "The soul as form of the body"
        ],
        sourceTexts: [
          "Aristotle, Nicomachean Ethics",
          "Aristotle, Metaphysics",
          "Aristotle, De Anima"
        ]
      },
      {
        name: "Hellenistic therapies (Stoa and Garden)",
        period: "c. 306 BCE onward",
        summary: "Epicurus buys the Garden around 306 BCE; Zeno begins teaching in the painted colonnade around 300. The two schools are doctrinal rivals — atoms and void against a providential continuum of fire — yet their regimens converge: philosophy as medicine for the passions, administered through memorised maxims, examination of the day, and the premeditation of evils, with tranquillity as the promised cure.",
        metaphysics: [
          "Logos as the rational order of the cosmos (Stoa)",
          "Atoms and void (Garden)",
          "Fate, providence, and assent",
          "Pleasure as the absence of disturbance",
          "The dichotomy of what is and is not up to us"
        ],
        sourceTexts: [
          "Epicurus, Letter to Menoeceus",
          "Epictetus, Encheiridion",
          "Marcus Aurelius, Meditations",
          "Seneca, Letters to Lucilius"
        ]
      },
      {
        name: "Neoplatonic curriculum",
        period: "3rd-6th centuries CE",
        summary: "From Plotinus' seminars at Rome to the graded curricula of Iamblichus and Proclus, late Platonism organised the whole inheritance into a ladder: Aristotle read as the lesser mysteries preparing for Plato's greater, and the order of reading itself an instrument of ascent. It is here that philosophy and theurgy negotiate their border — Plotinus reticent about rite, Iamblichus insisting upon it — and the archive keeps the two dossiers adjacent for that reason.",
        metaphysics: [
          "The One beyond intellect and being",
          "Procession and return",
          "The hypostases: One, Intellect, Soul",
          "Contemplation as generative",
          "The undescended soul (contested within the school)"
        ],
        sourceTexts: [
          "Plotinus, Enneads",
          "Porphyry, Life of Plotinus",
          "Proclus, Elements of Theology"
        ]
      }
    ],
    timeline: [
      {
        era: "585 BCE",
        title: "Thales and the eclipse",
        summary: "By convention the history opens at Miletus, where Thales is said to have predicted the solar eclipse of 585 BCE — a report first found in Herodotus, a century and a half later, and more emblem than record. What matters is the gesture it commemorates: the cosmos treated as something argument can reach.",
        startYear: -585,
        endYear: -585,
        note: "The mechanics of the prediction are doubted by historians of astronomy; the anecdote's meaning — nature made subject to reason — is not.",
        anchors: [
          "Eclipse over the Halys, 28 May 585 BCE"
        ]
      },
      {
        era: "c. 530 BCE",
        title: "Pythagoras at Croton",
        summary: "Pythagoras leaves Samos and establishes at Croton, around 530 BCE, a community in which cosmology and rule of life are one discipline — silence, examination of conscience, dietary observance. Nothing from his own hand survives; the way of life is reconstructed from later and often idealising witnesses.",
        startYear: -530,
        endYear: -530
      },
      {
        era: "399 BCE",
        title: "The trial of Socrates",
        summary: "Socrates is tried and executed at Athens in 399 BCE on charges of impiety and corrupting the young. The Phaedo makes his last day the tradition's founding exercise — philosophy as the practice of dying — and every subsequent school claims his example.",
        startYear: -399,
        endYear: -399,
        note: "Socrates wrote nothing; he is known through Plato, Xenophon, and the hostile portrait in Aristophanes."
      },
      {
        era: "c. 387 BCE",
        title: "Foundation of the Academy",
        summary: "Plato begins teaching in the grove of Academus outside the walls of Athens — around 387 BCE by convention. The Academy is the first durable philosophical institution, a community of common meals, mathematics, and dialectic that persists, through refoundations and a long sceptical turn, for centuries.",
        startYear: -387,
        endYear: -387
      },
      {
        era: "335 BCE",
        title: "Aristotle in the Lyceum",
        summary: "Returning to Athens in 335 BCE, Aristotle teaches in the walkways of the Lyceum. The corpus that survives consists of school treatises rather than finished books — lecture courses in which happiness is argued to be activity of soul in accordance with virtue, and the contemplative life its completion.",
        startYear: -335,
        endYear: -335
      },
      {
        era: "c. 306-300 BCE",
        title: "Garden and Stoa",
        summary: "Epicurus purchases the Garden around 306 BCE; Zeno of Citium begins teaching in the Stoa Poikile around 300. Two rival physics — atoms and void against providential fire — are put to convergent use: philosophy as a therapy of desire and fear, promising tranquillity in an age of empires.",
        startYear: -306,
        endYear: -300,
        anchors: [
          "Epicurus buys the Garden, c. 306 BCE",
          "Zeno teaching in the Painted Stoa, c. 300 BCE"
        ]
      },
      {
        era: "204-270 CE",
        title: "Plotinus",
        summary: "Plotinus, born in 204, teaches at Rome from 244 until his death in 270; Porphyry later edits the seminars into the Enneads. Platonism becomes an itinerary of return to the One — contemplative, closely argued, and deliberately reticent about rite.",
        startYear: 204,
        endYear: 270,
        gapNote: "The five centuries between the Hellenistic foundations and Plotinus are not silence but continuous school life — Middle Platonists, Roman Stoics, and the first commentators kept every tradition in daily exercise.",
        anchors: [
          "Plotinus opens his school at Rome, 244",
          "Porphyry joins the circle, 263"
        ]
      },
      {
        era: "415",
        title: "The murder of Hypatia",
        summary: "Hypatia, mathematician and Platonist teacher at Alexandria, is killed by a mob in 415. The event is a matter of record and was condemned by contemporaries; it marks not the end of pagan philosophy — the Alexandrian school continued — but the new precariousness of its position.",
        startYear: 415,
        endYear: 415
      },
      {
        era: "c. 524",
        title: "Boethius writes the Consolation",
        summary: "Imprisoned at Pavia awaiting execution under Theoderic, Boethius composes the Consolation of Philosophy around 524 — Lady Philosophy administering the old therapies of the schools to a condemned man. The book carries the ancient exercises whole into the Latin Middle Ages.",
        startYear: 524,
        endYear: 524
      },
      {
        era: "529",
        title: "Justinian closes the Athenian school",
        summary: "In 529 Justinian's legislation ends pagan teaching at Athens; Damascius and six colleagues depart for the Persian court, returning under a negotiated safe conduct. It is the conventional terminus of ancient philosophy — though Alexandria's school taught on into the seventh century.",
        startYear: 529,
        endYear: 529,
        note: "How abruptly the Athenian school actually ceased, and where the seven philosophers finally settled, remain contested questions."
      },
      {
        era: "1484",
        title: "Ficino's Plato complete",
        summary: "Marsilio Ficino's complete Latin Plato is printed at Florence in 1484 — the first time the whole corpus stands open to the Latin West. Read alongside his Plotinus of 1492 and the Hermetica, it restores the ancient curriculum as a living option for Renaissance Europe.",
        startYear: 1484,
        endYear: 1484,
        gapNote: "The nine centuries between Justinian and Ficino are transmission, not void: Byzantine copyists, the Arabic falsafa, and Latin scholasticism kept the texts and the arguments in continuous circulation."
      },
      {
        era: "1981",
        title: "Hadot's recovery",
        summary: "Pierre Hadot publishes Exercices spirituels et philosophie antique in 1981, arguing that the ancient schools taught ways of life sustained by spiritual exercises, and that their texts must be read as instruments of formation rather than treatises. The reframing continues to shape scholarship and practice alike.",
        startYear: 1981,
        endYear: 2026,
        open: true,
        gapNote: "The interval since the Renaissance is quiet continuation rather than absence: the exercises persisted in monastic rule, in essayists such as Montaigne, and in the therapies of the moralists, even as academic philosophy professionalised."
      }
    ],
    figures: [
      {
        name: "Pythagoras",
        period: "c. 570-c. 495 BCE",
        importance: "Founder of the community at Croton where cosmology and rule of life were one discipline; known entirely through later and often idealising sources."
      },
      {
        name: "Socrates",
        period: "c. 469-399 BCE",
        importance: "Wrote nothing; his trial and death at Athens in 399 BCE gave every subsequent school its founding image of philosophy lived to the end."
      },
      {
        name: "Plato",
        period: "c. 428-348 BCE",
        importance: "Founder of the Academy, whose dialogues stage philosophy as erotic ascent and preparation for death, and set the curriculum for a millennium."
      },
      {
        name: "Aristotle",
        period: "384-322 BCE",
        importance: "Plato's pupil and the Lyceum's founder, whose surviving lecture courses made habituation and contemplation the twin engines of the good life."
      },
      {
        name: "Zeno of Citium",
        period: "c. 334-262 BCE",
        importance: "Founder of the Stoa, whose teaching in the painted colonnade from about 300 BCE turned philosophy into a daily therapy of assent and desire."
      },
      {
        name: "Plotinus",
        period: "204-270",
        importance: "Teacher at Rome whose seminars, edited by Porphyry as the Enneads, made Platonism an itinerary of return to the One."
      },
      {
        name: "Hypatia",
        period: "c. 355-415",
        importance: "Mathematician and Platonist teacher at Alexandria; her murder in 415, condemned by contemporaries, marks the new precariousness of the late schools."
      },
      {
        name: "Pierre Hadot",
        period: "1922-2010",
        importance: "Historian of ancient philosophy whose 1981 essays recovered the schools as ways of life sustained by spiritual exercises, and gave this archive its reading of the subject."
      }
    ],
    sourceTexts: [
      {
        title: "The Presocratic fragments (Diels-Kranz)",
        tradition: "Presocratic",
        note: "No Presocratic work survives whole; the corpus is a mosaic of quotations in later authors, each shaped by the purposes of the writer doing the quoting."
      },
      {
        title: "Plato, Phaedo",
        tradition: "Platonic",
        note: "The death scene of Socrates and the definition of philosophy as the practice of dying — the founding exercise of the whole tradition."
      },
      {
        title: "Aristotle, Nicomachean Ethics",
        tradition: "Aristotelian",
        note: "Lecture courses rather than a finished book; the argument that happiness is activity of soul in accordance with virtue, completed in contemplation."
      },
      {
        title: "Epicurus, Letter to Menoeceus",
        tradition: "Epicurean",
        note: "Preserved whole in Diogenes Laertius; a compact regimen against the fear of death and the disorder of desire, written to be memorised."
      },
      {
        title: "Epictetus, Encheiridion",
        tradition: "Stoic",
        note: "Arrian's handbook of his teacher's sayings; the dichotomy of control as a daily exercise, later adapted without embarrassment for Christian monastic use."
      },
      {
        title: "Plotinus, Enneads",
        tradition: "Neoplatonic",
        note: "Porphyry's edition of the Rome seminars, arranged by ascent rather than chronology — the ordering of the text is itself an exercise."
      },
      {
        title: "Pierre Hadot, Exercices spirituels et philosophie antique (1981)",
        tradition: "Modern scholarship",
        note: "The essays that recovered ancient philosophy as a way of life; enlarged in later editions and translated as Philosophy as a Way of Life in 1995."
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Theoria",
          definition: "Contemplation — the unhindered activity of the intellect upon what is highest, which Aristotle names the most complete human happiness.",
          register: "Greek"
        },
        {
          term: "Askesis",
          definition: "Exercise or training — the repeated practice by which a doctrine ceases to be a proposition and becomes a disposition of the soul.",
          register: "Greek"
        },
        {
          term: "Eudaimonia",
          definition: "Flourishing — the good life understood as activity rather than state, the end every school claimed its regimen delivered.",
          register: "Greek"
        },
        {
          term: "Logos",
          definition: "Reason, speech, and the ordering principle of the cosmos at once — the Stoics' name for the divine fire that pervades and governs matter.",
          register: "Greek"
        },
        {
          term: "Daimon",
          definition: "An intermediate spirit, or the divine element within the soul — Socrates' warning voice, and the being to which eudaimonia etymologically refers.",
          register: "Greek"
        },
        {
          term: "Ataraxia",
          definition: "Untroubledness — the tranquillity that Garden and Stoa alike promised as the fruit of retrained desire and disciplined assent.",
          register: "Greek"
        },
        {
          term: "Prosoche",
          definition: "Attention — continuous vigilance over one's judgements from moment to moment, Hadot's candidate for the fundamental attitude of the Stoic life.",
          register: "Greek"
        }
      ]
    }
  },
  "christian-mysticism": {
    slug: "christian-mysticism",
    subtitle: "A dossier on the Christian mystical tradition, its threefold way from purgation to union, and the church's long argument with its own contemplatives.",
    orientation: [
      "Christian mysticism names an architecture rather than a mood: the conviction, worked out across two millennia of practice and argument, that the soul can be purged, illumined, and united to God, and that this passage has a grammar — one that can be taught, mapped in castles and ladders and nights, and also mislaid. Its classic instruments are few and remarkably stable: the threefold way, the discipline of attention inherited from the Egyptian desert, and the slow reading of Scripture until the text turns and reads the reader.",
      "The tradition speaks two languages at once. The kataphatic names God through everything made and revealed; the apophatic unsays every name until the unsaying fails into what Dionysius called divine darkness — and between them runs a third, stranger idiom, the bridal reading of the Song of Songs, in which the soul is courted, wounded, and wed. Desert ascetics, Cistercian abbots, Beguine poets, Rhineland Dominicans, and Athonite hesychasts each weighted these languages differently, which is why the tradition is best read as five architectures under one roof rather than a single doctrine.",
      "It is also a history of institutional friction, and this dossier declines to soften it. The church has depended on its mystics for the substance of its sanctity while suspecting them of dissolving the very mediations — sacrament, hierarchy, creed — on which it stands; the result is a record in which Porete is burned and quietly read, Eckhart condemned and quietly absorbed, Palamas attacked and made doctrine, Teresa investigated and made Doctor. The pattern is stated here as fact, not romance: the archive's interest is in how the tradition survived its own censures, and at what cost."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "Christian mysticism's central gesture is the remaking of the soul rather than the collecting of experiences: a taught, mapped passage — purgation, illumination, union — toward a God who is named through everything and then sought past every name.",
        points: [
          "The threefold way — purgation, illumination, union — as the tradition's shared map, however differently each school draws it.",
          "Apophatic and kataphatic held in deliberate tension: God affirmed through his works, then unsaid beyond them, neither language allowed to stand alone.",
          "The Song of Songs read as the soul's own courtship — the boldest sustained wager of Christian exegesis, and the seedbed of its bridal vocabulary.",
          "Prayer understood as the transformation of the one praying, with visions and consolations treated by the best guides as by-products to be survived.",
          "Union that clarifies rather than abolishes the creature — the precise point on which orthodoxy, East and West, kept its hardest watch."
        ]
      },
      {
        title: "The Church and its Mystics",
        summary: "The institution and its contemplatives have never quite trusted one another: the same pages have been burned and canonized, the same claims condemned in one century and made doctrine in another, and the line between saint and suspect has often been drawn only after death.",
        points: [
          "Marguerite Porete burned in 1310 while her Mirror of Simple Souls circulated anonymously in impeccably orthodox company for six centuries.",
          "Eckhart's propositions condemned in 1329 'as the words sound' — a censure of sentences that stopped carefully short of the man, and did not stop his school.",
          "Palamas attacked as an innovator and vindicated by the councils of 1341 to 1351 — the rare case in which the mystics' party wrote the settlement.",
          "Teresa of Ávila examined by the Inquisition in her lifetime and declared a Doctor of the Church in 1970; John of the Cross imprisoned by his own order.",
          "The Quietist affair of 1687, in which the condemnation of Molinos placed contemplative passivity itself under suspicion and chilled Catholic mystical writing for two centuries."
        ]
      },
      {
        title: "Aetherica Use",
        summary: "How this dossier is wired into the archive: the five traditions, the condemnations, and the technical vocabulary all serve as handles for finding, searching, and comparing episodes.",
        points: [
          "Episode discovery — episodes tagged by tradition, from desert praktike to Athonite hesychasm and the Carmelite summit.",
          "Transcript search — glossary terms indexed across the archive: apophatic, theosis, hesychia, the dark night.",
          "Comparative diagrams — the threefold way set beside Plotinian ascent and the general mysticism dossier's typologies.",
          "Source lists — reading orders for each tradition, with editions, translations, and attribution notes."
        ]
      }
    ],
    traditions: [
      {
        name: "Desert ascetics",
        period: "3rd-5th centuries",
        summary: "The Egyptian and Palestinian withdrawal that made asceticism a science: Antony's flight to the desert around 270 gave the pattern, and Evagrius Ponticus — dead in 399, condemned posthumously, transmitted under other names — gave it a system of diagnosis and prayer that every later school inherits, knowingly or not.",
        metaphysics: [
          "Praktike, the ascetic combat with the eight thoughts",
          "Apatheia, the stilled and clarified passions",
          "Pure prayer beyond image and concept",
          "The cell as teacher",
          "Discernment of spirits as the master skill"
        ],
        sourceTexts: [
          "Life of Antony",
          "Praktikos",
          "Apophthegmata Patrum"
        ]
      },
      {
        name: "Dionysian apophatic line",
        period: "c. 500 onward",
        summary: "The corpus written around 500 under the Areopagite's name — a pseudepigraphon dependent on Proclus — that gave Christianity its grammar of negation: God beyond being, approached through hierarchies of mediation and finally through the failure of every name, a darkness above light that the Cloud author would later turn into method.",
        metaphysics: [
          "God beyond being and beyond negation itself",
          "Hierarchy as mediated ascent",
          "Negation as a discipline, not a mood",
          "Divine darkness above light",
          "Union past knowing"
        ],
        sourceTexts: [
          "The Mystical Theology",
          "The Divine Names",
          "The Cloud of Unknowing"
        ]
      },
      {
        name: "Bridal and Beguine mysticism",
        period: "12th-early 14th centuries",
        summary: "The Cistercian and Beguine reading of the Song of Songs as the soul's own courtship: Bernard's sermons from 1135 built the Latin edifice, and the Beguines — Hadewijch in the mid-thirteenth century, Mechthild, Porete at the tradition's dangerous edge — carried minne into the vernaculars, outside cloister walls and eventually outside the church's patience.",
        metaphysics: [
          "The Song of Songs as the soul's script",
          "Love as itself a mode of knowing",
          "Minne, courtly love transposed onto God",
          "The wound of love",
          "Annihilation of the will in Porete's furthest reach"
        ],
        sourceTexts: [
          "Sermons on the Song of Songs",
          "Hadewijch's Letters and Visions",
          "The Flowing Light of the Godhead",
          "The Mirror of Simple Souls"
        ]
      },
      {
        name: "Rhineland speculative school",
        period: "13th-14th centuries",
        summary: "The Dominican line of Eckhart, Tauler, and Suso, preaching in German a metaphysics of the ground: the uncreated depth of the soul where the Word is eternally born, reached by detachment rather than exercise — a teaching condemned in twenty-eight propositions in 1329 and absorbed by the tradition anyway.",
        metaphysics: [
          "The grunt, the uncreated ground of the soul",
          "The birth of the Word in the soul",
          "Gelassenheit, releasement or detachment",
          "The Godhead beyond God",
          "Living without a why"
        ],
        sourceTexts: [
          "Eckhart's German sermons",
          "Tauler's sermons",
          "The Little Book of Eternal Wisdom",
          "Theologia Deutsch"
        ]
      },
      {
        name: "Hesychasm",
        period: "4th-14th centuries, formalized 1341-1351",
        summary: "The Eastern discipline of stillness — the Jesus Prayer bound to the breath, the intellect drawn down into the heart — running from the desert and Sinai to Athos, and given dogmatic form when the councils of 1341 to 1351 vindicated Palamas: the light the hesychast sees is the uncreated energy of God, and deification is its end.",
        metaphysics: [
          "Hesychia, the stilled intellect in the heart",
          "The Jesus Prayer, breath-bound and continual",
          "The essence-energies distinction",
          "The uncreated light of Tabor",
          "Theosis as the creature's end"
        ],
        sourceTexts: [
          "The Ladder of Divine Ascent",
          "Triads in Defence of the Holy Hesychasts",
          "The Philokalia"
        ]
      }
    ],
    timeline: [
      {
        era: "c. 270-399",
        title: "The desert withdrawal",
        summary: "Antony withdraws into the Egyptian desert around 270, and Athanasius's Life of him makes withdrawal a programme; by the century's end Evagrius Ponticus, who dies in 399, has turned the desert's experience into a system — the eight thoughts, apatheia, prayer stripped of images.",
        startYear: 270,
        endYear: 399,
        anchors: [
          "Antony's withdrawal into the desert, c. 270",
          "Death of Evagrius Ponticus, 399"
        ],
        note: "Evagrius's condemnation as an Origenist in 553 meant his works travelled under other names — a first instance of the tradition surviving its censures by pseudonymity."
      },
      {
        era: "c. 500",
        title: "The Dionysian corpus",
        summary: "Writings appear under the name of Dionysius the Areopagite, Paul's Athenian convert — in fact the work of an unknown author of c. 500, steeped in Proclus. The Mystical Theology's divine darkness and the hierarchies' mediated ascent give Christian apophaticism its permanent grammar.",
        startYear: 500,
        endYear: 500,
        anchors: [
          "Corpus invoked at the Constantinople colloquy, 532"
        ]
      },
      {
        era: "1135-1153",
        title: "Bernard on the Song",
        summary: "From 1135 Bernard of Clairvaux preaches his sermons on the Song of Songs — eighty-six of them, unfinished at his death in 1153 — fixing the bridal reading for the Latin west: the soul as bride, love itself as a mode of knowing.",
        startYear: 1135,
        endYear: 1153,
        anchors: [
          "First sermon on the Song, 1135",
          "Death of Bernard, 1153"
        ],
        gapNote: "The centuries between Dionysius and Bernard are transmission, not silence: Gregory the Great, Maximus the Confessor, Eriugena's Latin Dionysius, and the unbroken monastic practice of lectio divina carry the tradition without producing a new school."
      },
      {
        era: "1141-1151",
        title: "Hildegard's Scivias",
        summary: "Hildegard of Bingen composes Scivias between 1141 and 1151, visionary rather than speculative in idiom; a papal reading at the Synod of Trier in 1147-48 gives her work a sanction most later women visionaries would be denied.",
        startYear: 1141,
        endYear: 1151
      },
      {
        era: "mid-13th century",
        title: "The Beguines",
        summary: "In the Low Countries and the Rhineland, women outside cloister walls — Hadewijch writing in the mid-thirteenth century, Mechthild of Magdeburg after her — compose a vernacular mysticism of minne, courtly love transposed onto God, in Dutch and German rather than clerical Latin.",
        startYear: 1230,
        endYear: 1290,
        anchors: [
          "Hadewijch's Letters and Visions, mid-13th century"
        ]
      },
      {
        era: "1310",
        title: "Porete burned",
        summary: "Marguerite Porete is burned at the Place de Grève on 1 June 1310, having refused to withdraw The Mirror of Simple Souls or answer her judges. The book outlives her anonymously, copied and translated in orthodox circles that did not know its author had been executed.",
        startYear: 1310,
        endYear: 1310,
        note: "The Council of Vienne's decree Ad nostrum (1312) against the so-called Free Spirit drew on articles from her trial, hardening suspicion of annihilationist language for a century."
      },
      {
        era: "1329",
        title: "In agro dominico",
        summary: "John XXII's bull In agro dominico of 1329 condemns twenty-eight propositions drawn from Meister Eckhart's works, shortly after Eckhart's death — seventeen as heretical, the rest as ill-sounding. The censure falls on sentences rather than, quite, on the man, and Tauler and Suso carry the Rhineland school forward under more guarded language.",
        startYear: 1329,
        endYear: 1329
      },
      {
        era: "1341-1351",
        title: "The hesychast councils",
        summary: "Councils at Constantinople between 1341 and 1351 vindicate Gregory Palamas against Barlaam and Akindynos: the hesychast's light is the uncreated energy of God, and the distinction between essence and energies becomes conciliar doctrine in the East.",
        startYear: 1341,
        endYear: 1351,
        anchors: [
          "First council against Barlaam, 1341",
          "Final vindication of Palamas, 1351"
        ]
      },
      {
        era: "c. 1375",
        title: "The Cloud of Unknowing",
        summary: "An anonymous English director writes The Cloud of Unknowing around 1375, translating Dionysian unknowing into plain pastoral instruction — a sign that the apophatic way had become, in the vernacular, something one could actually be taught to do.",
        startYear: 1375,
        endYear: 1375
      },
      {
        era: "1577-1591",
        title: "The Carmelite summit",
        summary: "Teresa of Ávila writes The Interior Castle in 1577, mapping the soul's seven dwelling-places; John of the Cross, her collaborator in the Carmelite reform, gives the purgative way its exact diagnostics in the dark night, and dies in 1591. Both wrote under Inquisitorial scrutiny; both were later declared Doctors of the Church.",
        startYear: 1577,
        endYear: 1591,
        anchors: [
          "The Interior Castle, 1577",
          "Death of John of the Cross, 1591"
        ],
        gapNote: "The two centuries after the Cloud are continuation rather than void: the devotio moderna, the English continuations of Hilton and Julian of Norwich, and the first printed editions of the mystics carry the material toward the Spanish revival."
      },
      {
        era: "1687",
        title: "The Quietist affair",
        summary: "Innocent XI's Coelestis Pastor condemns sixty-eight propositions of Miguel de Molinos in 1687, placing contemplative passivity itself under suspicion; the Fénelon-Bossuet quarrel over pure love follows within the decade, and Catholic mystical writing enters a long chill.",
        startYear: 1687,
        endYear: 1687
      },
      {
        era: "1948-present",
        title: "The modern retrieval",
        summary: "Thomas Merton's Seven Storey Mountain of 1948 returns contemplative life to a mass readership; English translations of the Philokalia, the centering-prayer movement, and the scholarly recovery of Eckhart and of Porete — her authorship of the Mirror restored only in 1946 — reopen the whole archive.",
        startYear: 1948,
        endYear: 2026,
        open: true,
        gapNote: "Between the Quietist condemnations and Merton the tradition persists in quieter channels — Carmelite and Athonite houses, the Philokalia's compilation in 1782, the Optina elders, and the first critical editions — transmission rather than absence.",
        anchors: [
          "The Seven Storey Mountain, 1948"
        ]
      }
    ],
    figures: [
      {
        name: "Evagrius Ponticus",
        period: "c. 345-399",
        importance: "Systematizer of the desert — the eight evil thoughts, apatheia, prayer beyond images — condemned as an Origenist in 553 and transmitted for centuries under safer names."
      },
      {
        name: "Pseudo-Dionysius the Areopagite",
        period: "fl. c. 500",
        importance: "The unknown author, probably a Syrian monk, whose apostolic mask carried a Christianized Proclan apophaticism into both East and West; the corpus is pseudepigraphal, its influence entirely real."
      },
      {
        name: "Bernard of Clairvaux",
        period: "1090-1153",
        importance: "Cistercian abbot whose eighty-six sermons on the Song of Songs, begun in 1135 and unfinished at his death, fixed the bridal reading of Scripture for the Latin west."
      },
      {
        name: "Marguerite Porete",
        period: "d. 1310",
        importance: "Beguine author of The Mirror of Simple Souls, burned at Paris after refusing to answer her judges; her book survived her anonymously and was read for six centuries in orthodox company."
      },
      {
        name: "Meister Eckhart",
        period: "c. 1260-1328",
        importance: "Dominican master of the Rhineland school — the ground of the soul, the birth of the Word, detachment — twenty-eight of whose propositions were condemned in 1329, shortly after his death."
      },
      {
        name: "Gregory Palamas",
        period: "1296-1359",
        importance: "Athonite defender of the hesychasts against Barlaam; his distinction between God's essence and energies was made conciliar doctrine at Constantinople between 1341 and 1351."
      },
      {
        name: "Teresa of Ávila",
        period: "1515-1582",
        importance: "Carmelite reformer whose Interior Castle of 1577 mapped the soul's dwelling-places with clinical exactness; examined by the Inquisition in life, declared a Doctor of the Church in 1970."
      },
      {
        name: "John of the Cross",
        period: "1542-1591",
        importance: "Poet and theologian of Carmel who read the felt absence of God as purgation rather than abandonment, and gave the tradition its most exact diagnostic language for the dark night."
      }
    ],
    sourceTexts: [
      {
        title: "The Mystical Theology",
        tradition: "Dionysian",
        note: "The five dense chapters, written c. 500 under the name of Paul's Athenian convert, that gave the West its vocabulary of divine darkness; a pseudepigraphon dependent on Proclus, and none the less consequential for it."
      },
      {
        title: "Sermons on the Song of Songs",
        tradition: "Cistercian",
        note: "Bernard of Clairvaux's eighty-six sermons, begun in 1135 and left unfinished at his death in 1153 — the founding monument of the bridal reading, continued by Gilbert of Hoyland and John of Ford."
      },
      {
        title: "The Mirror of Simple Souls",
        tradition: "Beguine",
        note: "Marguerite Porete's account of the soul annihilated in love, condemned with its author in 1310; it circulated anonymously in Latin, Italian, and Middle English until Romana Guarnieri restored her name to it in 1946."
      },
      {
        title: "The Cloud of Unknowing",
        tradition: "English",
        note: "An anonymous Middle English director's manual of c. 1375 that turns Dionysian unknowing into practical instruction — a naked intent stretched toward God, with all created things put under a cloud of forgetting."
      },
      {
        title: "Triads in Defence of the Holy Hesychasts",
        tradition: "Hesychast",
        note: "Gregory Palamas's reply to Barlaam, written 1338-1341, arguing that the light seen in prayer is the uncreated energy of God; the position the councils of 1341-1351 made doctrine."
      },
      {
        title: "The Interior Castle",
        tradition: "Carmelite",
        note: "Teresa of Ávila's 1577 map of the soul as a castle of seven dwelling-places, written under obedience and under the Inquisition's eye — the tradition's most exact phenomenology of the stages of prayer."
      },
      {
        title: "The Philokalia",
        tradition: "Hesychast",
        note: "The anthology of ascetical and mystical texts from the fourth to the fifteenth centuries, compiled by Nicodemus of the Holy Mountain and Macarius of Corinth and printed at Venice in 1782 — the channel through which hesychasm reached the modern world."
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Apophatic",
          definition: "The way of negation, which approaches God by unsaying every name and concept until the unsaying itself gives out into darkness.",
          register: "Greek"
        },
        {
          term: "Kataphatic",
          definition: "The way of affirmation, which names God through everything he has made and revealed — the ladder that the negations afterwards kick away.",
          register: "Greek"
        },
        {
          term: "Theosis",
          definition: "Deification: the creature's real participation in the divine life — in the Palamite formulation, in God's energies and never his essence — the stated end of the Greek ascetical tradition.",
          register: "Greek"
        },
        {
          term: "Hesychia",
          definition: "The stillness of an intellect gathered down into the heart; the condition the Jesus Prayer is designed to produce and then to guard.",
          register: "Greek"
        },
        {
          term: "The dark night",
          definition: "John of the Cross's noche oscura: the withdrawal of every felt consolation, read not as God's absence but as his too-close approach purging the faculties.",
          register: "Spanish"
        },
        {
          term: "Unio mystica",
          definition: "The soul's union with God — for most Latin writers a union of wills that leaves the creature intact, and in Eckhart and Porete something the censors found considerably less reassuring.",
          register: "Latin"
        },
        {
          term: "Lectio divina",
          definition: "The slow monastic reading of Scripture — reading, meditation, prayer, contemplation — that served for a millennium as the ordinary door to the extraordinary.",
          register: "Latin"
        }
      ]
    }
  },
  symbolism: {
    slug: "symbolism",
    subtitle: "A dossier on the theory of the symbol — from Horapollo's hieroglyphs to Jung's archetypes — and the long claim that a symbol participates in what it shows.",
    orientation: [
      "This dossier concerns the theory of the symbol, not a dictionary of meanings: how symbols were held to work, from the late-antique dream of Egyptian writing to the modern quarrel with linguistics.",
      "Its through-line is a single claim, made and remade across fifteen centuries — that a symbol participates in what it shows, where a mere sign only points by agreement.",
      "The traditions gathered here were often built on misreadings — Horapollo on a script he could not read, Kircher on inscriptions he could not decipher — and the dossier records the error and the fertility together."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The tradition's central gesture is the claim that a true symbol participates in what it shows — it is the broken half that rejoins its whole, not a label fastened by agreement. Every tradition in this dossier is a variation on that claim, and every crisis in its history is an argument with the arbitrary sign.",
        points: [
          "The symbolon: a tally broken and rejoined — recognition rather than reference",
          "Cassian's four senses: events that signify as words do, because history itself is authored",
          "The Renaissance hieroglyph: writing that shows essences without the detour through sound",
          "Coleridge's formula: the symbol partakes of the reality it renders intelligible",
          "The recurring disenchantment: each theory of participation eventually meets its Champollion"
        ]
      },
      {
        title: "Symbol against Sign",
        summary: "Set the participatory symbol against Saussure's arbitrary sign and the whole history reads as one long argument. The moderns gathered here did not misunderstand linguistics; they dissented from it, holding that at least some signs are motivated all the way down.",
        points: [
          "Saussure, published 1916: signifier joined to signified by convention alone",
          "Saussure's own concession: the 'symbol' — his example the scales of justice — is never wholly arbitrary",
          "Jung, 1912: the symbol as the best possible expression of something not yet known",
          "Eliade, 1952: hierophany — the sacred showing itself in things, not being agreed upon",
          "The Symbolist movement of 1886 as the art-world carrier of the participatory thesis"
        ]
      },
      {
        title: "Aetherica Use",
        summary: "How this dossier works within the archive: what to search, what to set side by side, and where the episode material runs deepest.",
        points: [
          "Episode discovery: emblematics and the hieroglyphic reverie carry the richest episode threads",
          "Transcript search: symbolon, impresa, hierophany, and quadriga are high-yield terms",
          "Comparative diagrams: the fourfold sense set against Romantic symbol-allegory repays charting",
          "Source lists: Alciato, Ripa, and Horapollo survive in early printings listed under sources"
        ]
      }
    ],
    traditions: [
      {
        name: "Hieroglyphic imagination",
        period: "c. 5th century - 1822",
        summary: "The long European conviction, seeded by Horapollo's Hieroglyphica and rediscovered in 1419, that Egyptian writing bypassed sound to show essences directly — a conviction that produced the Hypnerotomachia's dream-script and Kircher's vast mistranslations before Champollion ended it in 1822.",
        metaphysics: [
          "Writing that shows essences",
          "The world as divine script",
          "Wisdom veiled from the profane",
          "Egypt as primal revelation"
        ],
        sourceTexts: [
          "Hieroglyphica",
          "Hypnerotomachia Poliphili",
          "Oedipus Aegyptiacus"
        ]
      },
      {
        name: "Fourfold sense of scripture",
        period: "3rd - 16th centuries",
        summary: "The exegetical discipline, systematised from Origen by Cassian around 420, that read a single text at four ascending levels — letter, allegory, moral, anagogy — and thereby trained the medieval West to treat events themselves as signifying, since history had an author.",
        metaphysics: [
          "History as the letter",
          "Allegory pointing to Christ",
          "Tropology shaping the soul",
          "Anagogy opening heaven",
          "Events that signify as words do"
        ],
        sourceTexts: [
          "Conferences",
          "On First Principles",
          "De doctrina Christiana"
        ]
      },
      {
        name: "Emblematics",
        period: "1531 - c. 1700",
        summary: "The early-modern culture of the assembled image: Alciato's emblem of 1531 joined motto, picture, and epigram into a puzzle the reader completes, while the impresa made the device personal and Ripa's Iconologia of 1593 turned personification into a working reference for the arts.",
        metaphysics: [
          "Picture, motto, and epigram in concert",
          "Meaning assembled, not given",
          "Wit as a mode of knowledge",
          "The learned image as social currency"
        ],
        sourceTexts: [
          "Emblemata",
          "Iconologia",
          "Dialogo dell'imprese"
        ]
      },
      {
        name: "Romantic symbol theory",
        period: "c. 1790 - 1860",
        summary: "The elevation of the symbol over allegory in Goethe, Coleridge, and Creuzer: where allegory translates between separable terms, the symbol was held to partake of the reality it discloses — a doctrine that remade aesthetics and provoked philology's fiercest quarrel over myth.",
        metaphysics: [
          "The symbol as partaking of what it shows",
          "Translucence of the eternal in the temporal",
          "Allegory as mere translation",
          "Myth as the symbolic speech of early peoples"
        ],
        sourceTexts: [
          "The Statesman's Manual",
          "Maximen und Reflexionen",
          "Symbolik und Mythologie der alten Völker"
        ]
      },
      {
        name: "Archetypal and semiotic moderns",
        period: "1886 - present",
        summary: "The twentieth-century contest between the participatory symbol and the arbitrary sign: Jung and Eliade restated participation in the registers of psyche and sacred, Saussure's posthumous Course of 1916 axiomatised convention, and the Symbolist movement carried the older thesis through the arts.",
        metaphysics: [
          "The archetype behind the image",
          "Hierophany in profane time",
          "The arbitrary sign as rival thesis",
          "Art as the symbol's refuge"
        ],
        sourceTexts: [
          "Symbols of Transformation",
          "Images and Symbols",
          "Course in General Linguistics"
        ]
      }
    ],
    timeline: [
      {
        era: "c. 420",
        title: "Cassian's four senses",
        summary: "John Cassian's Conferences, written for the monks of Gaul around 420, fix the fourfold reading of scripture — literal, allegorical, tropological, anagogical — with Jerusalem as the worked example: a city, the Church, the soul, and the heavenly home at once.",
        startYear: 420,
        endYear: 420,
        note: "The scheme systematises Origen's older three senses; the medieval mnemonic distich 'littera gesta docet' is a later coinage, not Cassian's own.",
        anchors: [
          "Conferences XIV, c. 420"
        ]
      },
      {
        era: "c. 5th century",
        title: "Horapollo's Hieroglyphica",
        summary: "A Greek treatise ascribed to Horapollo of Nilopolis explains the hieroglyphs as allegorical pictures — the goose for filial devotion, the tail-biting serpent for the cosmos. As a guide to the script it is mostly wrong; as a theory of writing that shows essences rather than spelling sounds, it will govern European imagination for four centuries.",
        startYear: 450,
        endYear: 450,
        note: "Both attribution and date are conventional; the text presents itself as translated from Egyptian by one Philippus, otherwise unknown."
      },
      {
        era: "1419-1499",
        title: "The hieroglyphic revival",
        summary: "Cristoforo Buondelmonti buys a manuscript of the Hieroglyphica on Andros in 1419 and carries it to Florence, where the humanists receive it as primal wisdom. The Hypnerotomachia Poliphili of 1499 prints invented hieroglyphs as the dream-language of its romance, and educated Europe now believes Egypt wrote in essences.",
        startYear: 1419,
        endYear: 1499,
        gapNote: "The intervening millennium is transmission, not silence: the fourfold sense kept allegorical reading in constant exercise, and the Physiologus and the bestiaries carried the habit of reading creatures as meanings.",
        anchors: [
          "Hieroglyphica rediscovered, 1419",
          "Hypnerotomachia Poliphili, 1499"
        ]
      },
      {
        era: "1531",
        title: "Alciato's Emblemata",
        summary: "Andrea Alciato's Emblemata, first printed at Augsburg in 1531 — without his supervision and to his displeasure — invents the emblem book: motto, picture, and epigram made to be read together. Roughly a thousand emblem books follow across two centuries, a European industry of assembled meaning.",
        startYear: 1531,
        endYear: 1531,
        note: "Alciato's own manuscript circulated without pictures; the woodcuts were the printer's addition, which is itself a lesson in how the form worked."
      },
      {
        era: "1555-1593",
        title: "Impresa culture and Ripa's Iconologia",
        summary: "Paolo Giovio's Dialogo dell'imprese of 1555 codifies the personal device — picture as body, motto as soul — and courtly Europe takes up the game. Cesare Ripa's Iconologia of 1593 supplies the public counterpart: a dictionary of personifications consulted by painters and pageant-masters for two hundred years.",
        startYear: 1555,
        endYear: 1593,
        anchors: [
          "Giovio's Dialogo dell'imprese, 1555",
          "Ripa's Iconologia, 1593"
        ]
      },
      {
        era: "1652-1654",
        title: "Kircher's Oedipus Aegyptiacus",
        summary: "Athanasius Kircher publishes the Oedipus Aegyptiacus in Rome, three volumes rendering hieroglyphic inscriptions as compressed Hermetic theosophy. The readings are almost entirely wrong; the conviction behind them — that the hieroglyph is a symbol and not a spelling — is the hieroglyphic imagination at its most complete.",
        startYear: 1652,
        endYear: 1654
      },
      {
        era: "1797-1816",
        title: "The Romantic symbol",
        summary: "Goethe distinguishes the symbol, which reveals the general in the particular, from allegory, which merely seeks a particular for its general; Coleridge's Statesman's Manual of 1816 gives the doctrine its English formula, the symbol partaking of the reality it renders intelligible. Allegory, the medieval workhorse, is demoted to mechanism.",
        startYear: 1797,
        endYear: 1816,
        anchors: [
          "The Statesman's Manual, 1816"
        ]
      },
      {
        era: "1810-1812",
        title: "Creuzer's Symbolik",
        summary: "Friedrich Creuzer's Symbolik und Mythologie der alten Völker argues that Greek myth preserves a symbolic wisdom transmitted from eastern priesthoods. The philologists, Voss loudest among them, attack it at length, and the quarrel fixes the fault-line between symbolic and historical-critical readings of antiquity.",
        startYear: 1810,
        endYear: 1812
      },
      {
        era: "1822",
        title: "Champollion's decipherment",
        summary: "Jean-François Champollion's Lettre à M. Dacier announces that the hieroglyphs are in large part phonetic. Four centuries of the hieroglyphic reverie end: Egyptian writing spells sounds like any other script, and Horapollo and Kircher pass from authorities to curiosities.",
        startYear: 1822,
        endYear: 1822,
        note: "The demonstration was completed in the Précis of 1824; symbolically minded readers resisted the result for decades."
      },
      {
        era: "1886",
        title: "The Symbolist manifesto",
        summary: "Jean Moréas' manifesto in Le Figaro names the movement: a poetry that would clothe the Idea in sensible form, suggestion preferred to naming. Symbolism becomes the art-world carrier of the participatory symbol, the route by which the doctrine passes intact into the twentieth century.",
        startYear: 1886,
        endYear: 1886
      },
      {
        era: "1912-1916",
        title: "Jung and Saussure",
        summary: "Jung's Wandlungen und Symbole der Libido of 1912 reads the symbol as the psyche's natural speech, the best available expression of what is not yet known. Saussure's Course in General Linguistics, assembled by his students and published in 1916, makes the arbitrariness of the sign the founding axiom of modern linguistics. The century's two positions are on the table.",
        startYear: 1912,
        endYear: 1916,
        note: "Saussure himself reserved the word 'symbol' for the non-arbitrary case — the scales of justice — conceding the distinction even as he founded the rival school."
      },
      {
        era: "1952-present",
        title: "The archetypal afterlife",
        summary: "Mircea Eliade's Images and Symbols of 1952 defends the symbol as hierophany — the mode by which the sacred shows itself in profane things — while structuralism and semiotics carry Saussure's axiom through the human sciences. The claim of participation survives in depth psychology, in the history of religions, and wherever art keeps faith with the image.",
        startYear: 1952,
        endYear: 2026,
        open: true,
        anchors: [
          "Images and Symbols, 1952"
        ]
      }
    ],
    figures: [
      {
        name: "Horapollo",
        period: "fl. 5th century (attributed)",
        importance: "Name attached to the Hieroglyphica, the late-antique treatise that taught Europe to read Egyptian writing as a script of essences rather than sounds."
      },
      {
        name: "John Cassian",
        period: "c. 360-435",
        importance: "Monastic writer whose Conferences fixed the fourfold sense of scripture — the discipline in which the Latin West learned to read symbolically."
      },
      {
        name: "Andrea Alciato",
        period: "1492-1550",
        importance: "Milanese jurist whose Emblemata of 1531 founded the emblem book and made the assembly of motto, picture, and epigram a European pastime."
      },
      {
        name: "Athanasius Kircher",
        period: "1602-1680",
        importance: "Jesuit polymath whose Oedipus Aegyptiacus is the hieroglyphic imagination at full pressure — encyclopaedic, magnificent, and wrong about the script."
      },
      {
        name: "Samuel Taylor Coleridge",
        period: "1772-1834",
        importance: "Poet-philosopher whose Statesman's Manual of 1816 gave English its classic formula for the symbol as partaking of the reality it renders intelligible."
      },
      {
        name: "Friedrich Creuzer",
        period: "1771-1858",
        importance: "Heidelberg philologist whose Symbolik provoked the century's great quarrel over whether Greek myth conceals a transmitted symbolic wisdom."
      },
      {
        name: "Carl Gustav Jung",
        period: "1875-1961",
        importance: "Psychologist who relocated the participatory symbol to the psyche, reading the archetypal image as the best available expression of what is not yet known."
      },
      {
        name: "Mircea Eliade",
        period: "1907-1986",
        importance: "Historian of religions who defended the symbol as hierophany against the arbitrary sign, giving the tradition its last general theory."
      }
    ],
    sourceTexts: [
      {
        title: "Hieroglyphica",
        tradition: "Hieroglyphic imagination",
        note: "Greek, ascribed to Horapollo of Nilopolis, conventionally 5th century; rediscovered 1419 and printed by Aldus in 1505. Mostly wrong about the script, entirely formative for the theory."
      },
      {
        title: "Conferences",
        tradition: "Fourfold sense of scripture",
        note: "John Cassian, c. 420. Conference XIV states the four senses, with Jerusalem — city, Church, soul, heavenly home — as the worked example."
      },
      {
        title: "Emblemata",
        tradition: "Emblematics",
        note: "Andrea Alciato, Augsburg 1531; the first printing appeared without his supervision. The template for roughly a thousand emblem books over two centuries."
      },
      {
        title: "Iconologia",
        tradition: "Emblematics",
        note: "Cesare Ripa, Rome 1593, illustrated from 1603. The working dictionary of personification for Baroque painting, pageantry, and print."
      },
      {
        title: "Oedipus Aegyptiacus",
        tradition: "Hieroglyphic imagination",
        note: "Athanasius Kircher, Rome 1652-54. Its hieroglyphic 'translations' are monuments of learned error; its conviction that the hieroglyph is a symbol is the tradition's purest statement."
      },
      {
        title: "The Statesman's Manual",
        tradition: "Romantic symbol theory",
        note: "Samuel Taylor Coleridge, 1816. Source of the classic English definition of the symbol against allegory."
      },
      {
        title: "Images and Symbols",
        tradition: "Archetypal and semiotic moderns",
        note: "Mircea Eliade, Paris 1952, as Images et symboles; Englished in 1961. The symbol defended as hierophany, argued in full awareness of the century of the arbitrary sign."
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Symbolon",
          definition: "The broken tally whose halves recognise one another on rejoining — the root image of a sign that participates in what it reunites.",
          register: "Greek"
        },
        {
          term: "Allegory",
          definition: "Saying one thing by means of another; in the Romantic account, a mere translation between separable terms, and so the symbol's demoted twin.",
          register: "Greek"
        },
        {
          term: "Fourfold sense",
          definition: "The exegetical scheme — literal, allegorical, tropological, anagogical — by which a single text was read as four ascending registers of truth.",
          register: "Latin"
        },
        {
          term: "Hieroglyph",
          definition: "In the Renaissance sense, a character believed to show an essence directly, without the detour through sound — an idea the decipherment of 1822 ended.",
          register: "Greek"
        },
        {
          term: "Emblem",
          definition: "A tripartite learned device of motto, picture, and epigram whose meaning arises only from the reader's work of assembling the three.",
          register: "Latin"
        },
        {
          term: "Impresa",
          definition: "A personal device of picture and motto, deliberately incomplete without the bearer's intention, and prized for the wit that joins its body to its soul.",
          register: "Italian"
        },
        {
          term: "Archetype",
          definition: "In Jung's usage, an inherited disposition of the psyche that clothes itself in recurring symbolic images without ever being a fixed picture itself.",
          register: "Greek"
        },
        {
          term: "Sigil",
          definition: "A compressed graphic seal — of a name, a spirit, an intent — in which the mark is held to retain a working connection to what it condenses.",
          register: "Latin"
        }
      ]
    }
  },
  "sacred-architecture": {
    figures: [
      {
        name: "Imhotep",
        period: "fl. c. 2650 BCE",
        importance: "Architect of Djoser's complex at Saqqara, the first monumental architecture in dressed stone; later deified — the first named builder in the record."
      },
      {
        name: "Iktinos",
        period: "5th century BCE",
        importance: "Architect of the Parthenon with Kallikrates; his treatise on the temple, among the earliest recorded architectural writings, survives only as a mention."
      },
      {
        name: "Vitruvius",
        period: "1st century BCE",
        importance: "Roman architect-engineer whose De architectura, the sole treatise to survive from antiquity, grounded architectural proportion in the well-made human body."
      },
      {
        name: "Anthemius of Tralles",
        period: "c. 474 - before 558",
        importance: "Geometer who, with Isidore of Miletus, raised the dome of Hagia Sophia — the moment mathematical science visibly displaced craft tradition in great church building."
      },
      {
        name: "Abbot Suger",
        period: "c. 1081-1151",
        importance: "Abbot of Saint-Denis whose rebuilt choir, consecrated 1144, conventionally opens Gothic, and whose writings clothe its light in Dionysian anagogy."
      },
      {
        name: "Leon Battista Alberti",
        period: "1404-1472",
        importance: "Humanist whose De re aedificatoria — the first full architectural treatise since Vitruvius — refounded the art on concinnitas and the ratios of musical consonance."
      },
      {
        name: "Andrea Palladio",
        period: "1508-1580",
        importance: "Vicentine architect whose Quattro Libri carried harmonic proportion into built rooms and, through its woodcut plates, across Europe and the Anglophone world."
      },
      {
        name: "Rudolf Wittkower",
        period: "1901-1971",
        importance: "Historian whose Architectural Principles in the Age of Humanism (1949) recovered Renaissance proportion as cosmology rather than taste, and set off the mid-century proportion debates."
      }
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "Sacred architecture's central gesture is the claim that a building can be true — that by orientation, proportion, and plan a made thing participates in the order it depicts, so that to stand within the temple is to stand in the world rightly arranged.",
        points: [
          "Orientation binds the plan to the sky before any wall rises",
          "Proportion is held to be ontological, not decorative",
          "The temple recapitulates cosmogony — mound, first light, ordered precinct",
          "The body supplies the canon; the building is a person enlarged",
          "The method is guarded — priestly rite, lodge secret, or learned treatise"
        ]
      },
      {
        title: "The Body and the Building",
        summary: "From Vitruvius' figure inscribed in circle and square to Francesco di Giorgio's church plans drawn over a human frame, the body is the tradition's recurring measure — sometimes a proportional canon, sometimes a mystical identification of temple and person.",
        points: [
          "Vitruvius: the navel-centred body as warrant for temple symmetria",
          "1 Corinthians and its heirs: the person and the community as temple",
          "Francesco di Giorgio lays basilica plans over the human figure",
          "The medieval homo quadratus joins microcosm to church fabric",
          "Le Corbusier's Modulor of 1948 — the body's return in a secular key"
        ]
      },
      {
        title: "Aetherica Use",
        summary: "How this dossier functions within the archive — routes into the episodes, transcripts, and comparative apparatus that treat buildings as cosmology.",
        points: [
          "Episode discovery",
          "Transcript search",
          "Comparative diagrams",
          "Source lists"
        ]
      }
    ],
    orientation: [
      "Sacred architecture is the practice of building as though the building were a statement about the world — oriented to the sky, proportioned to the body, planned as a diagram of the cosmos. This dossier follows that practice from Imhotep's stone precinct at Saqqara to the twentieth century's attempted recoveries of it.",
      "The evidence is uneven in kind: stones and alignments where treatises are absent, treatises where the buildings are lost, and one long stretch — the Gothic — in which the method was deliberately kept in the lodge and surfaces only in late booklets and one extraordinary set of committee minutes at Milan.",
      "Throughout, the dossier separates what the builders demonstrably did from what later admirers wished they had done. The golden section, in particular, is treated as the largely modern artefact it is."
    ],
    slug: "sacred-architecture",
    sourceTexts: [
      {
        title: "De architectura",
        tradition: "Classical",
        note: "Vitruvius' ten books, dedicated to Augustus around 25 BCE — the only architectural treatise to survive antiquity, and therefore disproportionately authoritative from its Carolingian copies onward."
      },
      {
        title: "1 Kings 6-7",
        tradition: "Ancient Near East (scriptural)",
        note: "The description of Solomon's Temple, conventionally set around 960 BCE; the building is known from this text and from Ezekiel's visionary counterpart, not from any confirmed remains."
      },
      {
        title: "Suger, De administratione and De consecratione",
        tradition: "Gothic",
        note: "The abbot's own accounts of rebuilding Saint-Denis, whose choir was consecrated in 1144; the anagogical light-language is borrowed from the pseudo-Dionysius, whom Suger took for his abbey's patron."
      },
      {
        title: "Annali della Fabbrica del Duomo di Milano",
        tradition: "Gothic",
        note: "The cathedral fabric's minutes, kept from 1387, preserving the expertises of 1392-1401 in which ad quadratum and ad triangulum were argued on the record."
      },
      {
        title: "De re aedificatoria",
        tradition: "Renaissance",
        note: "Alberti's ten books, presented to Nicholas V around 1452 and printed in 1485; beauty is defined as concinnitas and tied to the ratios of musical consonance."
      },
      {
        title: "I quattro libri dell'architettura",
        tradition: "Renaissance",
        note: "Palladio's treatise of 1570, its villa plans annotated with harmonic room dimensions — among the most influential architectural books ever printed."
      },
      {
        title: "Architectural Principles in the Age of Humanism",
        tradition: "Modern scholarship",
        note: "Wittkower's study of 1949, through which Renaissance harmonic proportion is now read — and the unintended seed of the proportion debates of the 1950s."
      }
    ],
    subtitle: "A dossier on buildings made as cosmology — orientation, proportion, and the temple as image of the world and of the body.",
    timeline: [
      {
        era: "c. 2650 BCE",
        title: "Djoser's complex at Saqqara",
        summary: "At Saqqara, Imhotep raises for Djoser the first great architecture in dressed stone — a stepped mound within a vast enclosure whose dummy shrines eternalise the rites of kingship. The complex fixes a grammar Egypt keeps for millennia: the sanctuary as primeval mound, the walled precinct as ordered world set against the desert.",
        startYear: -2650,
        endYear: -2650,
        anchors: [
          "Step Pyramid of Djoser, c. 2650 BCE"
        ]
      },
      {
        era: "c. 960 BCE",
        title: "Solomon's Temple",
        summary: "The temple of Solomon is raised in Jerusalem — conventionally around 960 BCE, though both the dating and the building itself are known only from scripture, above all the description in 1 Kings 6-7. Whatever stood on the site, the text's tripartite plan, cherubim, and molten sea became the most consequential building description in the West, endlessly reconstructed on paper by people who had never seen it.",
        startYear: -960,
        endYear: -960,
        note: "No archaeologically confirmed remains of the First Temple have been identified; the building survives as a text.",
        gapNote: "The seventeen centuries between Saqqara and Jerusalem are not empty — Egyptian and Mesopotamian temple building runs continuously through them; these entries are fixed points, not the whole record."
      },
      {
        era: "447-432 BCE",
        title: "The Parthenon",
        summary: "Iktinos and Kallikrates build the Parthenon on the Athenian acropolis between 447 and 432 BCE. Its refinements — the swelling of the columns, the rise of the stylobate, a recurrent 9:4 ratio — are measurable fact; the intentions behind them are reconstruction, and the golden-section readings so often draped over the west front are a modern imposition.",
        startYear: -447,
        endYear: -432,
        anchors: [
          "Parthenon begun, 447 BCE",
          "Dedication of the cult statue, 438 BCE"
        ],
        gapNote: "Half a millennium of Near Eastern and archaic Greek temple building lies between these entries — continuous practice and transmission, not silence."
      },
      {
        era: "c. 25 BCE",
        title: "Vitruvius' De architectura",
        summary: "Around 25 BCE Vitruvius dedicates De architectura to Augustus — ten books in which the well-shaped human body, its span equal to its height, becomes the warrant for architectural symmetria and the temple's proportions. It is the only architectural treatise to survive from antiquity, which lends one Roman engineer's opinions an authority no single book should bear.",
        startYear: -25,
        endYear: -25,
        anchors: [
          "De architectura, c. 25 BCE"
        ],
        gapNote: "The four centuries between the Parthenon and Vitruvius span the whole of Hellenistic architectural writing — treatises Vitruvius cites and time has lost."
      },
      {
        era: "532-537",
        title: "Hagia Sophia",
        summary: "Justinian's Great Church rises in Constantinople in under six years, 532 to 537, under Anthemius of Tralles and Isidore of Miletus — geometers rather than master masons in the old sense. Procopius records the dome seeming to hang from heaven on a golden chain; the building argues, more forcibly than any text, that a vaulted interior can be an image of the cosmos.",
        startYear: 532,
        endYear: 537,
        anchors: [
          "Consecration of Hagia Sophia, 537"
        ],
        gapNote: "Between Vitruvius and Justinian lies the whole imperial Roman achievement, the Pantheon above all — continuous building rather than a lapse in the tradition."
      },
      {
        era: "1144",
        title: "Suger's choir at Saint-Denis",
        summary: "On 11 June 1144 Suger consecrates the new choir of Saint-Denis, its chevet dissolved into stained glass — conventionally the birth of Gothic. Suger's own writings frame the light in anagogical terms borrowed from the pseudo-Dionysius, whom he took, wrongly but productively, to be his abbey's patron saint.",
        startYear: 1144,
        endYear: 1144,
        anchors: [
          "Consecration of the choir, 11 June 1144"
        ],
        gapNote: "Six centuries of Byzantine, Carolingian, and Romanesque church building separate Hagia Sophia from Saint-Denis — a continuous tradition of oriented, cosmically framed churches, thinly documented in theoretical terms."
      },
      {
        era: "1392-1401",
        title: "The Milan cathedral expertises",
        summary: "Between 1392 and 1401 the fabric council of Milan cathedral summons foreign experts and puts geometry on the record: should the section rise ad quadratum, by the square, or ad triangulum, by the equilateral triangle? The minutes — with the mathematician Stornaloco's calculation of 1391 and the stormy expertise of Jean Mignot, who insisted that ars sine scientia nihil est — are the rare place where medieval proportional method was argued aloud rather than kept in the lodge.",
        startYear: 1391,
        endYear: 1401,
        anchors: [
          "Stornaloco's calculation, 1391",
          "Mignot's expertise, 1400"
        ],
        gapNote: "The two and a half centuries after Saint-Denis are the high tide of Gothic construction; the tradition is continuous, merely reticent about its geometry until Milan."
      },
      {
        era: "c. 1452",
        title: "Alberti's De re aedificatoria",
        summary: "Alberti presents De re aedificatoria to Nicholas V around 1452 — the first full architectural treatise since antiquity, printed in 1485. Beauty is defined as concinnitas, a harmony of parts such that nothing may be added or taken away except for the worse, and the ratios of musical consonance are proposed as its instrument.",
        startYear: 1452,
        endYear: 1452,
        anchors: [
          "De re aedificatoria presented, c. 1452",
          "First printed edition, 1485"
        ]
      },
      {
        era: "1570",
        title: "Palladio's Quattro Libri",
        summary: "Palladio publishes I quattro libri dell'architettura in Venice in 1570 — plans of his own villas annotated with room dimensions in harmonic series. The book's woodcuts, more than the buildings themselves, carry the doctrine of proportion across Europe and into the Anglophone world.",
        startYear: 1570,
        endYear: 1570,
        anchors: [
          "I quattro libri dell'architettura, 1570"
        ]
      },
      {
        era: "1949",
        title: "Wittkower's Architectural Principles",
        summary: "Rudolf Wittkower's Architectural Principles in the Age of Humanism recovers the musical and cosmological seriousness of Renaissance proportion — against the standing view of Palladio as a mere aesthete — and, almost accidentally, hands the mid-century avant-garde a usable past; the proportion debates of the 1950s, the RIBA's contested motion of 1957 among them, stand in its shadow.",
        startYear: 1949,
        endYear: 1949,
        anchors: [
          "Architectural Principles in the Age of Humanism, 1949"
        ],
        gapNote: "Between Palladio and Wittkower the doctrine travels through Palladianism and the academies — transmission and the slow secularisation of proportion, not a void."
      },
      {
        era: "Later 20th century onward",
        title: "The sacred geometry revival",
        summary: "A popular literature — with a prehistory in Zeising's golden-section aesthetics of the 1850s and Ghyka's number mysticism of the 1930s, and a landmark in Lawlor's primer of 1982 — reads golden sections and vesicae into monuments from Giza to Chartres. Some of its geometry is genuinely ancient or medieval; much is not, and the ubiquitous golden-section claims are largely a nineteenth- and twentieth-century construction. The honest position is the interesting one: the old builders used geometry constantly, and rarely the geometry the modern shelf ascribes to them.",
        startYear: 1950,
        endYear: 2026,
        open: true,
        anchors: [
          "Lawlor, Sacred Geometry, 1982"
        ]
      }
    ],
    traditions: [
      {
        name: "Temple cosmologies of the Near East and Egypt",
        period: "c. 3000-330 BCE",
        summary: "In Egypt and Mesopotamia the temple is not a metaphor for the world but its working model: founded on the primeval mound, oriented by the stretching of the cord toward stars or the solstitial sun, and walled against the unformed. The ziggurat is a mountain built where no mountain is; the Egyptian sanctuary's floors rise and its ceilings lower toward the holy of holies, recapitulating the first emergence of land from flood. What these builders intended survives in ritual texts and in the alignments of the stones, not in anything resembling a treatise.",
        metaphysics: [
          "The temple as primeval mound",
          "Orientation as founding rite",
          "The axis between heaven and underworld",
          "The precinct against the unformed"
        ],
        sourceTexts: [
          "Pyramid Texts",
          "Enuma Elish",
          "1 Kings 6-7"
        ]
      },
      {
        name: "Classical and Vitruvian proportion",
        period: "5th-1st centuries BCE",
        summary: "Greek temple design proceeds by commensurable ratio and optical refinement; Vitruvius, at the tradition's Roman end, codifies what he can and grounds it in the human figure — the well-made body, navel at the centre, inscribable in circle and square. The claim is precise: a temple without symmetria, the proportionate agreement of part with part and of parts with the whole, can no more be well formed than a body can. Because De architectura alone survived antiquity, this became the ancient world's entire voice on the matter.",
        metaphysics: [
          "The body as canon of number",
          "Symmetria of part and whole",
          "The module as generative unit",
          "Optical refinement of the ideal"
        ],
        sourceTexts: [
          "De architectura"
        ]
      },
      {
        name: "Gothic geometry",
        period: "12th-15th centuries",
        summary: "The Gothic lodges design by constructive geometry — squares rotated within squares, triangulated sections — a craft method transmitted by demonstration and largely unwritten until late texts such as Roriczer's booklet on pinnacles. Above the method sits a theology of light: Suger frames the glazed choir of Saint-Denis in anagogical language drawn from the pseudo-Dionysius, the mind rising through material radiance toward immaterial light. Whether the masons' geometry ever encoded that theology, or merely built it a container, is precisely the kind of question the sources decline to settle.",
        metaphysics: [
          "Geometry as craft secret",
          "Light as anagogical ascent",
          "The square and the triangle as generators",
          "The church as heavenly Jerusalem"
        ],
        sourceTexts: [
          "Suger, De administratione",
          "Annali della Fabbrica del Duomo di Milano",
          "Roriczer, Büchlein von der Fialen Gerechtigkeit"
        ]
      },
      {
        name: "Renaissance harmonic proportion",
        period: "15th-16th centuries",
        summary: "Alberti and Palladio transpose Pythagorean harmonics into stone: if the same simple ratios that please the ear govern the cosmos, then rooms proportioned 1:2, 2:3, 3:4 participate in that order whether or not anyone measures them. The centralised church — circle, square, Greek cross — becomes the image of a geometrised God. Wittkower's account of 1949 recovered the seriousness of all this against the suspicion that it was mere taste, while insisting the system was a cosmology rather than an acoustics: the harmonies were held to be real, not heard.",
        metaphysics: [
          "Musical consonance made spatial",
          "Concinnitas — nothing added, nothing taken away",
          "The centralised plan as image of God",
          "Number as bond between world and building"
        ],
        sourceTexts: [
          "De re aedificatoria",
          "I quattro libri dell'architettura",
          "Architectural Principles in the Age of Humanism"
        ]
      },
      {
        name: "Modern recoveries and the sacred geometry revival",
        period: "19th century - present",
        summary: "The modern literature of sacred geometry — from Zeising's golden-section aesthetics of the 1850s through Ghyka to Lawlor and a broad popular shelf — retrojects a single perennial canon onto Giza, the Parthenon, and Chartres. The retrojection is mostly demonstrable myth: the golden section is all but absent from the documented proportional practice of antiquity and the Middle Ages, which preferred commensurable ratios and constructive figures. Yet the revival answers to something real — the older traditions genuinely did build cosmologies — and its errors are themselves a chapter in the history of the idea.",
        metaphysics: [
          "A perennial canon, retrojected",
          "The golden section as modern myth",
          "Measurement in search of meaning"
        ],
        sourceTexts: [
          "Lawlor, Sacred Geometry",
          "Ghyka, The Geometry of Art and Life"
        ]
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Axis mundi",
          definition: "The world-axis: the vertical line, marked by mound, pillar, or spire, along which heaven, earth, and underworld are held in register.",
          register: "Latin"
        },
        {
          term: "Orientation",
          definition: "The deliberate alignment of a building on a celestial or cardinal line — properly, toward the rising sun — so that the plan repeats an order first read in the sky.",
          register: "Latin-derived"
        },
        {
          term: "Ad quadratum",
          definition: "Design 'by the square': the Gothic proportioning method that generates plan and elevation from a square, its diagonal, and its rotations.",
          register: "Latin"
        },
        {
          term: "Ad triangulum",
          definition: "Design 'by the triangle': the rival Gothic method deriving the section from the equilateral triangle, argued for on the record at Milan in the 1390s.",
          register: "Latin"
        },
        {
          term: "Vesica piscis",
          definition: "The almond-shaped figure formed by two circles drawn through one another's centres — a workaday constructive device of medieval draughtsmen, and a talisman of the modern revival.",
          register: "Latin"
        },
        {
          term: "Module",
          definition: "Vitruvius' modulus: a chosen unit — the column's lower diameter or its half, varying by order — from which every other dimension of the order is derived by ratio.",
          register: "Latin"
        },
        {
          term: "Harmonic proportion",
          definition: "The Renaissance conviction, articulated by Alberti and built by Palladio, that the ratios of musical consonance — 1:2, 2:3, 3:4 — should govern the dimensions of rooms.",
          register: "English, after the Latin"
        },
        {
          term: "Temenos",
          definition: "The cut-off precinct: the boundary that separates sacred ground from profane before a single stone of the temple is laid.",
          register: "Greek"
        }
      ]
    }
  },
  "western-esotericism": {
    slug: "western-esotericism",
    subtitle: "A dossier on Western esotericism — the family of currents assembled into a \"tradition\" by the Renaissance, dispersed through the modern occult, and reconstituted since 1979 as a field of study.",
    orientation: [
      "Western esotericism is not one tradition but a family of currents — Hermetic, gnostic, kabbalistic, alchemical, theosophical, initiatic — that came, at a datable moment, to be read as one; this dossier maps both the currents and the reading.",
      "The 'single unbroken lineage' running from Egypt to the present is itself a historical artefact, assembled in Florence in the 1460s around the idea of a prisca theologia; the construction must be described, and cannot honestly be repeated.",
      "Since 1979 the subject has also been an academic discipline, with chairs at Paris and Amsterdam and a working definition — Faivre's four characteristics — which the archive treats as a finding aid rather than a creed."
    ],
    lenses: [
      {
        title: "Core Motif",
        summary: "The recurring gesture across every current is genealogical: a claim to knowledge at once older than scripture, higher than doctrine, and transformative of its knower — and the assembling of disparate texts into the pedigree that claim requires.",
        points: [
          "A claimed knowledge older than scripture and higher than doctrine",
          "Concordance: disparate sources read as one perennial wisdom",
          "Transmission imagined as lineage, master to pupil, seal to seal",
          "Correspondence binding cosmos, text, and soul into one legible order",
          "Each revival rediscovering an 'original' behind its predecessors"
        ]
      },
      {
        title: "Current, not Conspiracy",
        summary: "What actually persists is philological — manuscripts copied, translated, printed, and re-read — while the lineages are repeatedly invented after the fact; the honest history distinguishes the transmission of texts from the construction of tradition, and finds the second as instructive as the first.",
        points: [
          "Texts travelled; the 'tradition' was assembled around them afterwards",
          "Continuity is manuscript and print, not institution or succession",
          "Invented lineages — Rosicrucian, Masonic, Theosophical — are facts about their inventors' present",
          "No hidden college steered the currents; translation, patronage, and polemic did",
          "Rupture is as characteristic as survival: Casaubon's redating, the Enlightenment's exclusions"
        ]
      },
      {
        title: "Aetherica Use",
        summary: "This dossier is the archive's hub: the page from which the Hermetic, gnostic, kabbalistic, alchemical, Rosicrucian, Masonic, and Theosophical dossiers can be reached, compared, and heard in their historical order rather than their mythical one.",
        points: [
          "Episode discovery",
          "Transcript search",
          "Comparative diagrams",
          "Source lists",
          "Cross-dossier navigation"
        ]
      }
    ],
    traditions: [
      {
        name: "Ancient matrices",
        period: "c. 100–400 CE",
        summary: "In Roman Egypt and the Greek east, three distinct milieux — the Hermetic treatises, the gnostic scriptures, and the Neoplatonic defence of theurgy — furnish the raw material of everything that follows. They overlapped in vocabulary more than in membership, and were not yet a tradition; their unification lies over a millennium ahead.",
        metaphysics: [
          "Gnosis above discursive reason",
          "A cosmos of sympathies and powers",
          "Descent and reascent of the soul",
          "Ritual as the completion of philosophy"
        ],
        sourceTexts: [
          "Corpus Hermeticum",
          "Nag Hammadi codices",
          "Iamblichus, De mysteriis"
        ]
      },
      {
        name: "Medieval transmissions",
        period: "8th–14th centuries",
        summary: "Astrology and alchemy pass into Arabic at Baghdad and Harran, return to Latin Europe through the translators of Toledo and Sicily, and arrive as science rather than heresy; in Castile, meanwhile, kabbalah acquires its central scripture. The channels here are translation and commentary — transmission at its most concrete and least conspiratorial.",
        metaphysics: [
          "Celestial causation and elected times",
          "Transmutation of matter and of self",
          "Sefirotic emanation",
          "Correspondence of letter, number, and world"
        ],
        sourceTexts: [
          "Picatrix (Ghāyat al-Ḥakīm)",
          "Sefer ha-Zohar",
          "Turba Philosophorum"
        ]
      },
      {
        name: "Renaissance synthesis",
        period: "1462–1600",
        summary: "The moment the 'tradition' was assembled. Ficino's Latin Hermetica (1471) and Pico's nine hundred theses (1486) bind Hermes, Plato, Moses, and the kabbalists into a single prisca theologia — a genealogy of ancient wisdom that the sources themselves never claimed, and that Agrippa's printed synthesis (1533) makes portable across Europe.",
        metaphysics: [
          "Prisca theologia: one wisdom behind many names",
          "Concordance of Plato, Moses, and Hermes",
          "Natural magic as operative philosophy",
          "Man as nodal point between the worlds"
        ],
        sourceTexts: [
          "Ficino's Pimander (1471)",
          "Pico, Conclusiones (1486)",
          "Agrippa, De occulta philosophia (1533)"
        ]
      },
      {
        name: "Early modern currents",
        period: "1520s–1780s",
        summary: "The synthesis fragments into vigorous vernacular currents: Paracelsian chemical philosophy, the Rosicrucian manifestos' invisible brotherhood — announced in print in 1614–1616 and never existing as described — Boehme's theosophy of divine self-revelation, and, from 1717, the graded initiatic architecture of speculative Freemasonry.",
        metaphysics: [
          "Chemical philosophy of macrocosm and microcosm",
          "Signatures legible in nature",
          "God known through self-revelation in nature and soul",
          "Initiatic brotherhood and graded degrees"
        ],
        sourceTexts: [
          "Boehme, Aurora (1612)",
          "Fama Fraternitatis (1614)",
          "Anderson's Constitutions (1723)"
        ]
      },
      {
        name: "Occult revival and the academy",
        period: "1875–present",
        summary: "The Theosophical Society (1875) and the Golden Dawn (1888) recast the older currents as occult science and graded curriculum, each claiming lineages its own historians cannot locate; a century later the currents become an academic object, with Faivre's Sorbonne chair (1979), his four characteristics (1992), and Hanegraaff's Amsterdam chair (1999) defining the field.",
        metaphysics: [
          "Ancient wisdom recast as occult science",
          "Comparative synthesis of East and West",
          "Initiation systematized into curricula",
          "Esotericism as an object of historical study"
        ],
        sourceTexts: [
          "Blavatsky, The Secret Doctrine (1888)",
          "Faivre, Access to Western Esotericism (1994)",
          "Dictionary of Gnosis and Western Esotericism (2005)"
        ]
      }
    ],
    timeline: [
      {
        era: "c. 100–300 CE",
        title: "The ancient matrices",
        summary: "In Roman Egypt and the Greek east the Hermetica are composed and the gnostic scriptures multiply, and at the period's very edge, around 300, Iamblichus's De mysteriis mounts the Neoplatonic defence of theurgy — three distinct milieux, not yet a tradition, that will furnish later centuries with their raw material.",
        startYear: 100,
        endYear: 300,
        anchors: [
          "Corpus Hermeticum composed, c. 100–300 CE"
        ],
        note: "These milieux shared vocabulary more than membership; reading them as one movement is the later construction this dossier describes."
      },
      {
        era: "8th–13th centuries",
        title: "Arabic learning and Latin translation",
        summary: "Astrology and alchemy are elaborated in Arabic at Baghdad and Harran and return to Europe through the translators of Toledo and Sicily — the Picatrix, the Emerald Tablet, and the astrological corpus arriving in Latin dress as natural knowledge, not forbidden lore.",
        startYear: 750,
        endYear: 1280,
        gapNote: "The centuries between the last pagan schools and Baghdad are transmission, not silence: Byzantine copyists, Syriac translators, and the Harranian milieu carried the texts that the Abbasid capital would receive.",
        anchors: [
          "Castilian Picatrix commissioned by Alfonso X, 1256"
        ]
      },
      {
        era: "c. 1280–1305",
        title: "The Zohar in Castile",
        summary: "Moses de León circulates the Zohar under a pseudepigraphic attribution to the second-century Shimon bar Yochai — kabbalah's sefirotic architecture given its central scripture, and an early model of antiquity claimed for a contemporary work.",
        startYear: 1280,
        endYear: 1305,
        note: "The attribution was already doubted by contemporaries; Gershom Scholem's demonstration of de León's authorship is the modern consensus."
      },
      {
        era: "1471",
        title: "Ficino's Pimander",
        summary: "Marsilio Ficino, instructed by Cosimo de' Medici in 1463 to set Plato aside for Hermes, completes the Latin Corpus Hermeticum that reaches print at Treviso in 1471 — the moment the prisca theologia acquires its founding text, and the moment the 'ancient unbroken tradition' begins to be assembled rather than inherited.",
        startYear: 1471,
        endYear: 1471,
        gapNote: "The interval since the Zohar is manuscript transmission — Latin alchemical pseudepigrapha circulating steadily, and Byzantine émigrés such as Plethon carrying Plato and the Chaldean Oracles west to Florence.",
        anchors: [
          "Ficino completes the translation, 1463"
        ]
      },
      {
        era: "1486",
        title: "Pico's nine hundred theses",
        summary: "Giovanni Pico della Mirandola publishes his Conclusiones, drawing Christian doctrine, kabbalah, and Hermetic philosophy into one proposed concordance; Rome condemns thirteen theses, and the syncretic method survives the censure to become the tradition's engine.",
        startYear: 1486,
        endYear: 1486
      },
      {
        era: "1533",
        title: "Agrippa printed in full",
        summary: "The complete De occulta philosophia appears at Cologne, ordering natural, celestial, and ceremonial magic into a three-storey architecture — the Renaissance synthesis made portable, and the occult library's most reprinted handbook thereafter.",
        startYear: 1533,
        endYear: 1533
      },
      {
        era: "1612–1616",
        title: "Theosophy and the Rosicrucian moment",
        summary: "Boehme's unfinished Aurora (1612) begins German theosophy; the Fama and Confessio (1614–1615) announce an invisible brotherhood that never existed as described; and in the same years Casaubon's redating of the Hermetica (1614) strips Hermes of his antiquity. The invented lineage and its philological undoing are exact contemporaries.",
        startYear: 1612,
        endYear: 1616,
        anchors: [
          "Fama Fraternitatis printed, 1614",
          "Casaubon's De rebus sacris, 1614"
        ]
      },
      {
        era: "1717",
        title: "The Grand Lodge",
        summary: "Four London lodges federate as a Grand Lodge — 1717 by the traditional account, though recent scholarship has argued for 1721 — and speculative Freemasonry organizes initiatic brotherhood into a durable institution whose degrees carry esoteric symbolism across the eighteenth century.",
        startYear: 1717,
        endYear: 1717
      },
      {
        era: "1875–1888",
        title: "The occult revival",
        summary: "The Theosophical Society (New York, 1875) and the Hermetic Order of the Golden Dawn (London, 1888) recast the older currents as occult science and graded curriculum — Blavatsky's hidden Masters and the Golden Dawn's charter from an untraceable German adept each supplying a lineage its own historians cannot find.",
        startYear: 1875,
        endYear: 1888,
        gapNote: "The interval since 1717 is not a void: Masonic high degrees, Swedenborgians, Mesmerists, and French illuminists kept the currents moving while Enlightenment polemic was redefining them as rejected knowledge.",
        anchors: [
          "Theosophical Society founded, 1875",
          "Isis-Urania Temple opened, 1888"
        ]
      },
      {
        era: "1979–1999",
        title: "The academy arrives",
        summary: "Antoine Faivre takes the Sorbonne chair in the history of esoteric currents in 1979, and in 1992 publishes the four intrinsic characteristics — correspondences, living nature, imagination and mediation, the experience of transmutation — that give the field its working definition; in 1999 Wouter Hanegraaff's Amsterdam chair gives it a second centre.",
        startYear: 1979,
        endYear: 1999,
        anchors: [
          "Faivre's L'ésotérisme, 1992",
          "Amsterdam chair founded, 1999"
        ],
        note: "Frances Yates's Giordano Bruno and the Hermetic Tradition (1964) had prepared the ground, though her 'Hermetic tradition' is precisely what the newer scholarship has qualified."
      },
      {
        era: "1999–present",
        title: "A field, not a lineage",
        summary: "The discipline consolidates — journals, learned societies, the Dictionary of Gnosis and Western Esotericism (2005) — while its central finding stands: the currents are real and datable, the single secret tradition was a Renaissance construction, and the history of that construction is itself the subject.",
        startYear: 1999,
        endYear: 2026,
        open: true
      }
    ],
    figures: [
      {
        name: "Marsilio Ficino",
        period: "1433–1499",
        importance: "Translator of Plato and the Hermetica whose Pimander of 1471 gave the prisca theologia its charter and the 'ancient tradition' its founding assembly."
      },
      {
        name: "Giovanni Pico della Mirandola",
        period: "1463–1494",
        importance: "Author of the nine hundred theses of 1486, who bound kabbalah into the Christian syncretism and made concordance the tradition's working method."
      },
      {
        name: "Heinrich Cornelius Agrippa",
        period: "1486–1535",
        importance: "Systematizer whose De occulta philosophia, printed in full in 1533, fixed the three-world architecture of Renaissance magic for every later revival."
      },
      {
        name: "Jacob Boehme",
        period: "1575–1624",
        importance: "Görlitz shoemaker whose Aurora of 1612 founded Christian theosophy and supplied later esotericism with its language of divine self-revelation in nature and soul."
      },
      {
        name: "Helena Petrovna Blavatsky",
        period: "1831–1891",
        importance: "Co-founder of the Theosophical Society in 1875, whose synthesis of Western occultism and Indian thought remade the currents for the modern world — on the authority of Masters and sources her historians cannot locate."
      },
      {
        name: "Frances Yates",
        period: "1899–1981",
        importance: "Warburg historian whose Giordano Bruno and the Hermetic Tradition (1964) made the Renaissance synthesis a respectable object of study, and whose grand 'Hermetic tradition' the field has since carefully qualified."
      },
      {
        name: "Antoine Faivre",
        period: "1934–2021",
        importance: "Holder from 1979 of the Sorbonne chair in the history of esoteric currents — a chair founded in 1965 for the history of Christian esotericism and renamed for his tenure — whose four characteristics of 1992 gave the discipline its working definition."
      },
      {
        name: "Wouter Hanegraaff",
        period: "b. 1961",
        importance: "Holder of the Amsterdam chair from 1999; historian of the field's own construction, who reframed esotericism as the West's 'rejected knowledge'."
      }
    ],
    sourceTexts: [
      {
        title: "Corpus Hermeticum",
        tradition: "Hermetic",
        note: "Seventeen Greek treatises of Roman Egypt, c. 100–300 CE — the tradition's imagined fountainhead, and in fact its late-antique anthology."
      },
      {
        title: "Picatrix (Ghāyat al-Ḥakīm)",
        tradition: "Arabic astral magic",
        note: "Tenth- or eleventh-century Arabic compendium of astral magic, translated into Castilian at Alfonso X's court in 1256, the Latin version deriving from it; the principal channel of talismanic theory into Europe."
      },
      {
        title: "Sefer ha-Zohar",
        tradition: "Kabbalah",
        note: "Circulated in Castile from the 1280s by Moses de León under a second-century attribution — kabbalah's central scripture, and a study in claimed antiquity."
      },
      {
        title: "De occulta philosophia",
        tradition: "Renaissance magic",
        note: "Agrippa's three books, drafted by 1510 and printed in full in 1533; the synthesis's most influential and most reprinted handbook."
      },
      {
        title: "Fama Fraternitatis",
        tradition: "Rosicrucianism",
        note: "Anonymous manifesto of 1614 announcing a brotherhood that existed only on paper — the clearest case of an invented lineage generating a real current."
      },
      {
        title: "The Secret Doctrine",
        tradition: "Theosophy",
        note: "Blavatsky's synthesis of 1888, built on the Stanzas of Dzyan, a source no scholar has located; the occult revival's summa."
      },
      {
        title: "Dictionary of Gnosis and Western Esotericism",
        tradition: "Scholarship",
        note: "The reference work edited by Hanegraaff and colleagues in 2005 — the field's map of the currents this archive follows, dossier by dossier."
      }
    ],
    researchWorkbench: {
      glossary: [
        {
          term: "Esotericism",
          definition: "A noun younger than most of what it names: French ésotérisme is first attested in 1828, in Jacques Matter's history of Gnosticism, and the word designates a modern grouping of currents rather than a term those currents used of themselves.",
          register: "French, 1828"
        },
        {
          term: "Correspondences",
          definition: "Faivre's first characteristic: the doctrine that all levels of the cosmos mirror and signify one another, so that stars, stones, scriptures, and souls can be read across.",
          register: "Faivre, 1992"
        },
        {
          term: "Living nature",
          definition: "The second characteristic: a cosmos understood as animate and traversed by sympathies, to be known by participation rather than dissection.",
          register: "Faivre, 1992"
        },
        {
          term: "Mediation and imagination",
          definition: "The third characteristic: access to the higher through intermediaries — images, symbols, angels, rites — grasped by a trained imagination treated as an organ of cognition rather than fancy.",
          register: "Faivre, 1992"
        },
        {
          term: "Transmutation",
          definition: "The fourth characteristic: the expectation that esoteric knowledge changes its knower — the alchemical metamorphosis of the soul, not merely of metal.",
          register: "Faivre, 1992"
        },
        {
          term: "Prisca theologia",
          definition: "The Renaissance thesis of one ancient theology handed down from Zoroaster or Hermes through Orpheus and Pythagoras to Plato — the intellectual machinery by which the 'single tradition' was built.",
          register: "Latin"
        },
        {
          term: "Rejected knowledge",
          definition: "Hanegraaff's name for what esotericism became after the Enlightenment: the category of everything polite learning discarded, whose contents thereby acquired their family resemblance.",
          register: "Scholarly"
        }
      ]
    }
  }
};
