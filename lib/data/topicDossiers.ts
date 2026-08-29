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
      { era: "1st century", title: "Jewish, Platonic, and Christian seedbed", summary: "Apocalyptic, wisdom, baptismal, Platonic, and early Christian currents create the symbolic world in which later Gnostic myth develops." },
      { era: "2nd century", title: "Great system-builders", summary: "Sethian, Valentinian, Basilidean, and related currents develop elaborate myths of emanation, fall, archons, and return." },
      { era: "180 CE", title: "Heresiological witness", summary: "Irenaeus and other polemicists preserve hostile but important evidence for ancient Gnostic teachers and schools." },
      { era: "3rd century", title: "Mani and global dualism", summary: "Manichaeism turns a Gnostic-style light-dark cosmology into a transregional religious movement." },
      { era: "4th century", title: "Suppression and survival", summary: "Imperial Christianity and anti-heretical efforts marginalize many Gnostic communities, while texts survive in translation and hidden libraries." },
      {
        era: "1945",
        title: "Nag Hammadi discovery",
        summary: "A major cache of Coptic codices transforms modern study by giving direct access to texts beyond hostile summaries.",
        plate: {
          image: "/images/topics/gnosticism-nag-hammadi",
          alt: "An Egyptian farmer crouched in a cliff hollow at sunset, examining leather-bound codices spilling from a broken clay jar",
          caption:
            "December 1945, below the cliffs of Jabal al-Tarif: a farmer digging for fertilizer breaks open a sealed jar and finds a library — thirteen codices that give these traditions back their own voice after fifteen centuries of being quoted only by their enemies.",
          focus: "50% 55%"
        }
      },
      { era: "Modern period", title: "Scholarly and esoteric reception", summary: "Gnostic materials enter comparative religion, depth psychology, esotericism, and modern spiritual discourse, sometimes carefully and sometimes loosely." }
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
