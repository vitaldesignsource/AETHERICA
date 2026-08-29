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
      { era: "1945", title: "Nag Hammadi discovery", summary: "A major cache of Coptic codices transforms modern study by giving direct access to texts beyond hostile summaries." },
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
