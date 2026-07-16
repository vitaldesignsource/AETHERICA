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
      term: string;
      definition: string;
    }>;
    archiveQueries: string[];
    studyQuestions: string[];
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
      archiveQueries: ["demiurge", "archons", "Sophia", "gnosis", "Pleroma", "Gnostic cosmology"],
      studyQuestions: [
        "How does each system describe the relation between the highest God and the fashioned cosmos?",
        "Where does Sophia function as theology, myth, psychology, or metaphysical diagram?",
        "Which episodes distinguish Platonic demiurgy from Gnostic demiurgy?",
        "How do archons operate as cosmic rulers, psychic forces, or symbolic constraints?"
      ]
    }
  },
  alchemy: {
    slug: "alchemy",
    subtitle: "A comparative dossier on metallic, spagyric, spiritual, laboratory, and inner alchemies.",
    orientation: [
      "Alchemy is not one thing. It is a long family of practices and symbolic languages concerned with transformation in matter, medicine, soul, body, cosmos, and divine knowledge.",
      "Some alchemies are explicitly laboratory based; others are medical, cosmological, devotional, initiatic, psychological, or contemplative.",
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
        sourceTexts: ["Jabirian corpus", "Book of the Secret of Secrets", "Works attributed to al-Razi"]
      },
      {
        name: "Latin medieval alchemy",
        period: "12th-15th century",
        summary: "Alchemy enters Latin Europe through translation, becoming a learned, monastic, medical, and artisanal pursuit.",
        metaphysics: ["Mercury and sulfur", "Stone symbolism", "Generation of metals", "Purification of matter", "Christian allegory", "Secret transmission"],
        sourceTexts: ["Turba Philosophorum", "Rosarium Philosophorum", "Summa Perfectionis", "Aurora Consurgens"]
      },
      {
        name: "Paracelsian and spagyric medicine",
        period: "16th-17th century",
        summary: "Paracelsian medicine reorients alchemy toward healing, extraction, signatures, astral correspondences, and the three principles.",
        metaphysics: ["Salt, sulfur, mercury", "Archeus", "Signatures", "Spagyric separation and recombination", "Medicinal tinctures", "Microcosm and macrocosm"],
        sourceTexts: ["Paracelsian corpus", "Archidoxis Magica", "Oswald Croll", "Basil Valentine tradition"]
      },
      {
        name: "Rosicrucian and spiritual alchemy",
        period: "17th century onward",
        summary: "Alchemy becomes a language of initiation, Christian mysticism, inner regeneration, and the perfected human being.",
        metaphysics: ["Inner stone", "Christic regeneration", "Mystical death and rebirth", "Invisible college", "Temple of the heart", "Reintegration"],
        sourceTexts: ["Fama Fraternitatis", "Confessio Fraternitatis", "Chymical Wedding", "The Secret Symbols of the Rosicrucians"]
      },
      {
        name: "Daoist internal and external alchemy",
        period: "Early medieval China onward",
        summary: "Chinese alchemical traditions include external elixir practices and internal methods of refining essence, qi, and spirit.",
        metaphysics: ["Waidan and neidan", "Jing, qi, shen", "Cinnabar field", "Return to the Dao", "Inner furnace", "Immortality language"],
        sourceTexts: ["Cantong qi", "Baopuzi", "Wuzhen pian", "Daoist neidan commentarial traditions"]
      }
    ],
    timeline: [
      { era: "1st-4th century", title: "Greco-Egyptian foundations", summary: "Metallurgy, dyeing, temple symbolism, and Hellenistic cosmology produce early alchemical writing." },
      { era: "8th-10th century", title: "Arabic systematization", summary: "Islamic alchemy develops laboratory vocabulary, sulfur-mercury theory, balances, elixirs, and medical applications." },
      { era: "12th century", title: "Latin translation movement", summary: "Arabic alchemical texts enter Europe and begin a new medieval learned tradition." },
      { era: "14th-15th century", title: "Image, allegory, and the Stone", summary: "European alchemy develops elaborate emblematic and allegorical language around the Philosophers' Stone." },
      { era: "16th century", title: "Paracelsian medicine", summary: "Alchemy becomes medical, astral, and spagyric through Paracelsus and his followers." },
      { era: "17th century", title: "Rosicrucian and spiritual readings", summary: "Alchemy becomes central to Christian esotericism, initiation, and interior regeneration." },
      { era: "19th-20th century", title: "Occult and psychological revival", summary: "Alchemy is reread through Hermetic orders, Theosophy, depth psychology, and modern esoteric practice." },
      { era: "Contemporary", title: "Laboratory, herbal, and symbolic renewal", summary: "Modern practitioners revisit metallic, mineral, plant, and inner alchemies through research, practice, and critical scholarship." }
    ],
    figures: [
      { name: "Zosimos of Panopolis", period: "3rd-4th century", importance: "One of the earliest major alchemical authors, blending craft, visionary symbolism, and transformation." },
      { name: "Maria the Jewess", period: "Early alchemical tradition", importance: "Legendary early alchemist associated with apparatus, heating methods, and foundational laboratory lore." },
      { name: "Jabir ibn Hayyan tradition", period: "8th-10th century", importance: "A vast Arabic corpus influential for theories of balance, elixir, and metallic transformation." },
      { name: "al-Razi", period: "865-925", importance: "Physician and alchemical author associated with practical classification and laboratory work." },
      { name: "Paracelsus", period: "1493-1541", importance: "Recast alchemy as medicine, emphasizing the three principles, signatures, and healing." },
      { name: "Michael Maier", period: "1568-1622", importance: "Rosicrucian-era alchemical author known for emblematic, musical, and mythic alchemical works." },
      { name: "Thomas Vaughan", period: "1621-1666", importance: "English alchemical writer connecting Hermeticism, spirit, nature, and Christian mysticism." },
      { name: "Julius Evola", period: "1898-1974", importance: "Modern esoteric interpreter whose alchemical reading is influential but should be approached critically." }
    ],
    sourceTexts: [
      { title: "Physika kai Mystika", tradition: "Greco-Egyptian", note: "A foundational early alchemical text attributed to pseudo-Democritus." },
      { title: "Zosimos fragments", tradition: "Greco-Egyptian", note: "Visionary and technical fragments central to early alchemical history." },
      { title: "Turba Philosophorum", tradition: "Arabic-Latin", note: "A key medieval dialogue of philosophers in the Latin alchemical tradition." },
      { title: "Rosarium Philosophorum", tradition: "Latin medieval", note: "A major emblematic source for conjunction, death, rebirth, and the Stone." },
      { title: "Aurora Consurgens", tradition: "Christian alchemy", note: "A richly symbolic alchemical text drawing on biblical and wisdom imagery." },
      { title: "The Chymical Wedding of Christian Rosenkreutz", tradition: "Rosicrucian", note: "A classic initiatic-alchemical allegory of purification and transformation." },
      { title: "Cantong qi", tradition: "Daoist alchemy", note: "A foundational Chinese alchemical classic connecting cosmology, change, and refinement." },
      { title: "Paracelsian corpus", tradition: "Medical alchemy", note: "A broad body of texts associated with spagyric medicine, signatures, and the three principles." }
    ],
    researchWorkbench: {
      glossary: [
        { term: "Solve et coagula", definition: "Dissolve and recombine: a shorthand for separation, purification, and renewed fixation." },
        { term: "Nigredo", definition: "The blackening or putrefactive phase of breakdown, crisis, and reduction to prima materia." },
        { term: "Albedo", definition: "The whitening or purification phase associated with washing, clarification, and lunar imagery." },
        { term: "Rubedo", definition: "The reddening or completion phase associated with fixation, solarization, and embodied integration." },
        { term: "Spagyric", definition: "A plant or mineral medicine process of separation, purification, and recombination." },
        { term: "Alkahest", definition: "A universal solvent in alchemical literature, often treated as literal, symbolic, or medicinal depending on context." }
      ],
      archiveQueries: ["spagyric", "alkahest", "metallic alchemy", "solve coagula", "nigredo", "Daniel Wiseman"],
      studyQuestions: [
        "Where does Aetherica treat alchemy as laboratory practice, and where as initiatic formula?",
        "How do metallic, plant, and spiritual alchemies use similar language differently?",
        "Which episodes connect alchemy to planetary timing, signatures, and medicine?",
        "How does the formula of breakdown and recomposition appear across initiation, ethics, and symbolic transformation?"
      ]
    }
  }
};
