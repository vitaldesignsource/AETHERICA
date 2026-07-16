export type UniversalLayerCategory =
  | "dense_body"
  | "vital_body"
  | "formative_double"
  | "desire_body"
  | "emotional_soul"
  | "dream_image_body"
  | "rational_mind"
  | "heart_intellect"
  | "causal_soul"
  | "luminous_spirit_body"
  | "divine_spark"
  | "absolute_root"
  | "shadow_identity"
  | "name_identity"
  | "magical_vehicle"
  | "postmortem_body";

export type StratifiedLayer = {
  id: string;
  name: string;
  translation?: string;
  universalLayer: UniversalLayerCategory;
  definition: string;
  function: string;
  ritualSignificance: string;
  postmortemSignificance?: string;
  relatedTerms: string[];
  notes?: string;
};

export type StratifiedModel = {
  id: string;
  name: string;
  tradition: string;
  summary: string;
  historicalContext: string;
  layers: StratifiedLayer[];
  relatedConcepts: string[];
  tags: UniversalLayerCategory[];
  recommendedComparisons: string[];
};

export const universalLayerLabels: Record<UniversalLayerCategory, string> = {
  dense_body: "Dense body",
  vital_body: "Vital body",
  formative_double: "Formative double",
  desire_body: "Desire body",
  emotional_soul: "Emotional-soul body",
  dream_image_body: "Dream / image body",
  rational_mind: "Rational mind",
  heart_intellect: "Heart-intellect",
  causal_soul: "Causal soul",
  luminous_spirit_body: "Luminous spirit body",
  divine_spark: "Divine spark",
  absolute_root: "Absolute root",
  shadow_identity: "Shadow / identity",
  name_identity: "Name / identity",
  magical_vehicle: "Magical vehicle",
  postmortem_body: "Postmortem body"
};

export const universalLayers: Array<{
  id: UniversalLayerCategory;
  title: string;
  definition: string;
  function: string;
  significance: string;
  postmortem: string;
  examples: string[];
}> = [
  {
    id: "dense_body",
    title: "Dense Body",
    definition: "The material organism and embodied vehicle through which a tradition describes earthly life.",
    function: "Provides incarnation, sensory experience, limitation, and contact with the physical world.",
    significance: "Often purified, disciplined, consecrated, or ritually aligned so higher faculties may act through it.",
    postmortem: "Usually treated as mortal, returned to earth, or transformed only through exceptional resurrection or glory-body doctrines.",
    examples: ["Sthula Sharira", "Khat / Khet", "Soma", "Corpus", "Guf", "Annamaya Kosha"]
  },
  {
    id: "vital_body",
    title: "Vital Body",
    definition: "The life-force layer that animates the organism and carries breath, vitality, and organic power.",
    function: "Mediates between the physical body and subtler psychic or energetic operations.",
    significance: "Central to breath work, ritual vitality, healing symbolism, and practices of containment or circulation.",
    postmortem: "Some systems describe it as dispersing, being refined, or sustaining a transitional subtle form.",
    examples: ["Prana", "Qi", "Ka", "Pneuma", "Nefesh", "Vital Body"]
  },
  {
    id: "formative_double",
    title: "Formative Double",
    definition: "A pattern-body, etheric double, or subtle template that shapes embodiment.",
    function: "Gives form, image, proportion, and continuity to the dense body.",
    significance: "Important in magic, image theory, subtle diagnosis, dream work, and symbolic reconstruction.",
    postmortem: "May appear as a subtle double, corpse-image, or temporary vehicle depending on the tradition.",
    examples: ["Linga Sharira", "Tzelem", "Sahu", "Etheric double", "Subtle template"]
  },
  {
    id: "desire_body",
    title: "Desire Body",
    definition: "The seat of appetite, attraction, aversion, craving, instinct, and lower astral movement.",
    function: "Moves the person toward objects, pleasures, fears, and attachments.",
    significance: "Frequently purified through discipline, prayer, contemplation, or initiatic ordeal.",
    postmortem: "Often connected with astral residue, craving bodies, or intermediate states.",
    examples: ["Kama", "Nafs", "Nephesh", "Lower astral body", "Desire body"]
  },
  {
    id: "emotional_soul",
    title: "Emotional-Soul Body",
    definition: "The affective soul-field of feeling, devotion, memory, value, and relational life.",
    function: "Carries love, grief, courage, attachment, moral emotion, and devotional orientation.",
    significance: "Refined through prayer, beauty, music, ethical work, and heart-centered contemplation.",
    postmortem: "May be judged, weighed, harmonized, purified, or remembered as an enduring soul-quality.",
    examples: ["Ib", "Qalb", "Sentient soul", "Heart", "Emotional body"]
  },
  {
    id: "dream_image_body",
    title: "Dream / Image Body",
    definition: "The imaginal or astral body by which the soul dreams, journeys, visualizes, and receives symbols.",
    function: "Enables visionary perception, symbolic travel, ritual visualization, and image-based knowing.",
    significance: "Closely related to body-of-light work, dream yoga, scrying, and imaginal ascent.",
    postmortem: "Often functions as a transitional vehicle in afterlife, bardo, or ascent doctrines.",
    examples: ["Ba", "Ochema", "Astral body", "Body of Light", "Illusory body", "Eikon"]
  },
  {
    id: "rational_mind",
    title: "Rational Mind",
    definition: "The discriminating mind that thinks, compares, reasons, names, and interprets.",
    function: "Orders experience through language, logic, doctrine, ethical reflection, and memory.",
    significance: "Must be sharpened and then subordinated to wisdom in many contemplative systems.",
    postmortem: "Some systems preserve a higher rational principle while lower discursive habits dissolve.",
    examples: ["Manas", "Ruach", "Aql", "Psyche", "Mens", "Lower Nous"]
  },
  {
    id: "heart_intellect",
    title: "Heart-Intellect",
    definition: "A higher intelligence in which knowledge, love, conscience, and direct insight converge.",
    function: "Receives unitive meaning and mediates between rational thought and spiritual illumination.",
    significance: "The chamber of gnosis, wisdom, purified contemplation, and sacred discernment.",
    postmortem: "Frequently described as the faculty capable of ascent, vision, or divine recognition.",
    examples: ["Buddhi", "Neshamah", "Qalb", "Nous", "Vijnanamaya Kosha"]
  },
  {
    id: "causal_soul",
    title: "Causal Soul",
    definition: "The deep soul-root carrying continuity, seed-pattern, karma, vocation, and spiritual memory.",
    function: "Holds the enduring pattern behind personality and repeated formation.",
    significance: "Approached through initiation, deep contemplation, karmic purification, and self-knowledge.",
    postmortem: "Often treated as a carrier of continuity across states, worlds, or incarnations.",
    examples: ["Karana Sharira", "Higher Manas", "Causal body", "Mazal", "Anandamaya Kosha"]
  },
  {
    id: "luminous_spirit_body",
    title: "Luminous Spirit Body",
    definition: "A radiant or perfected vehicle associated with illumination, transfiguration, and glorified embodiment.",
    function: "Allows spiritual presence to appear as light, form, glory, or awakened subtle embodiment.",
    significance: "A goal of body-of-light, resurrection, rainbow body, and alchemical glorification teachings.",
    postmortem: "Frequently framed as the perfected body that survives, ascends, or shines beyond death.",
    examples: ["Akh", "Augoeides", "Rainbow body", "Garment of Light", "Body of Glory"]
  },
  {
    id: "divine_spark",
    title: "Divine Spark",
    definition: "The innermost spiritual principle, divine identity, or uncreated point within the person.",
    function: "Anchors the human being in spirit, God, Dao, Purusha, Monad, or ultimate source.",
    significance: "The object of remembrance, liberation, union, or reintegration.",
    postmortem: "Often described as returning, awakening, or recognizing its own transcendent origin.",
    examples: ["Atma", "Yechidah", "Spinther", "Purusha", "Ruh", "Spirit"]
  },
  {
    id: "absolute_root",
    title: "Absolute Root",
    definition: "The transpersonal source beyond body, soul, mind, and even individual spirit.",
    function: "Serves as metaphysical ground rather than a personal layer in the ordinary sense.",
    significance: "Approached through apophasis, nondual realization, mystical union, silence, and surrender.",
    postmortem: "Not an afterlife state so much as the root reality into which all differentiated states are resolved.",
    examples: ["Monad", "Dao", "Ain Soph", "Brahman", "The One", "Absolute"]
  }
];

const core: Record<UniversalLayerCategory, string> = {
  dense_body: "The tangible embodied level of the human being.",
  vital_body: "The animating current of vitality, breath, and life-process.",
  formative_double: "The subtle template or image-body that gives form and continuity.",
  desire_body: "The passionate, appetitive, and instinctive vehicle of attraction and aversion.",
  emotional_soul: "The feeling soul, heart-field, and affective register of personhood.",
  dream_image_body: "The imaginal vehicle of dream, symbol, vision, and subtle travel.",
  rational_mind: "The discursive and reflective mind that orders experience.",
  heart_intellect: "The higher heart-mind of wisdom, direct insight, and sacred discernment.",
  causal_soul: "The seed-level continuity behind personal formation and vocation.",
  luminous_spirit_body: "The radiant, perfected, or glorified subtle vehicle.",
  divine_spark: "The innermost spiritual identity or divine principle.",
  absolute_root: "The transpersonal source beyond layered individuality.",
  shadow_identity: "The shadow, reflection, or concealed companion of identity.",
  name_identity: "The name, memory, or identity-pattern by which a being is called and preserved.",
  magical_vehicle: "A constructed or awakened vehicle used for ritual, ascent, or visionary work.",
  postmortem_body: "A subtle form especially associated with death, transition, or afterlife survival."
};

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function layer(modelId: string, name: string, universalLayer: UniversalLayerCategory, relatedTerms: string[] = [], translation?: string): StratifiedLayer {
  const label = universalLayerLabels[universalLayer].toLowerCase();
  return {
    id: `${modelId}-${slug(name)}`,
    name,
    translation,
    universalLayer,
    definition: `${name} is presented here as ${core[universalLayer].toLowerCase()} In this model it should be read within its own tradition, not as a one-to-one equivalent with neighboring systems.`,
    function: `Functions as the ${label} register within the model's account of embodiment, perception, transformation, or spiritual ascent.`,
    ritualSignificance: `Symbolically relevant when practices address ${label}, purification, stabilization, visionary work, or reintegration.`,
    postmortemSignificance: ["postmortem_body", "luminous_spirit_body", "divine_spark", "causal_soul", "name_identity", "shadow_identity"].includes(universalLayer)
      ? "Frequently involved in teachings about survival, transition, remembrance, ascent, or return."
      : "Postmortem meaning varies by source and should be handled as tradition-specific.",
    relatedTerms
  };
}

function model(
  id: string,
  name: string,
  tradition: string,
  summary: string,
  historicalContext: string,
  specs: Array<[string, UniversalLayerCategory, string[]?, string?]>,
  relatedConcepts: string[],
  recommendedComparisons: string[]
): StratifiedModel {
  const layers = specs.map(([layerName, category, relatedTerms, translation]) => layer(id, layerName, category, relatedTerms, translation));
  return {
    id,
    name,
    tradition,
    summary,
    historicalContext,
    layers,
    relatedConcepts,
    tags: Array.from(new Set(layers.map((item) => item.universalLayer))),
    recommendedComparisons
  };
}

export const stratifiedModels: StratifiedModel[] = [
  model("theosophy", "Theosophical Sevenfold Constitution", "Theosophy", "A sevenfold constitution extending from dense embodiment through vitality, desire, mind, spiritual intuition, and divine spirit.", "Modern Theosophy systematized Indic, Buddhist, Hermetic, and esoteric Christian vocabulary into a layered anthropology.", [
    ["Sthula Sharira", "dense_body", ["Khat", "Soma", "Corpus", "Guf", "Annamaya Kosha"], "gross body"],
    ["Linga Sharira", "formative_double", ["Etheric double", "Tzelem", "Sahu"], "sign body"],
    ["Prana", "vital_body", ["Ka", "Qi", "Pneuma", "Nefesh"], "life-force"],
    ["Kama", "desire_body", ["Nafs", "Nephesh", "Desire body"], "desire"],
    ["Lower Manas", "rational_mind", ["Ruach", "Aql", "Concrete mind"]],
    ["Higher Manas", "causal_soul", ["Causal soul", "Higher mind"]],
    ["Buddhi", "heart_intellect", ["Neshamah", "Qalb", "Spiritual soul"], "wisdom"],
    ["Atma", "divine_spark", ["Yechidah", "Purusha", "Spirit"], "Self"],
    ["Monad", "absolute_root", ["Divine root", "The One"]]
  ], ["astral body", "etheric double", "monad", "seven principles"], ["kabbalah", "vedanta", "golden-dawn"]),
  model("egyptian", "Egyptian Body-Soul Complex", "Ancient Egyptian religion", "A richly plural model of personhood including body, name, shadow, heart, power, double, soul-bird, and luminous transfigured being.", "Egyptian funerary texts preserve multiple personhood terms that cannot be reduced to a single soul/body split.", [
    ["Khat / Khet", "dense_body", ["Soma", "Sthula Sharira"]],
    ["Sah / Sahu", "postmortem_body", ["Luminous corpse", "Transfigured body"]],
    ["Ka", "vital_body", ["Prana", "Qi", "Vital double"]],
    ["Ba", "dream_image_body", ["Ochema", "Astral body"]],
    ["Ib", "emotional_soul", ["Heart", "Qalb"]],
    ["Ren", "name_identity", ["Name", "Memory"]],
    ["Sheut / Shut", "shadow_identity", ["Shadow", "Umbra"]],
    ["Sekhem", "magical_vehicle", ["Power", "Potency"]],
    ["Akh", "luminous_spirit_body", ["Glorified spirit", "Augoeides"]],
    ["Heka", "magical_vehicle", ["Magic power", "Creative utterance"]],
    ["Khu", "luminous_spirit_body", ["Radiant intelligence"]]
  ], ["ka", "ba", "akh", "ren", "sheut"], ["theosophy", "gnostic", "neoplatonic"]),
  model("neoplatonic", "Neoplatonic Soul Vehicle", "Late antique Platonism", "A hierarchy of body, pneuma, soul, intellect, luminous vehicle, and the soul's divine root.", "Neoplatonic sources describe the descent and ascent of soul through vehicles, images, stars, and intellect.", [
    ["Soma", "dense_body", ["Corpus", "Khat"]],
    ["Pneuma", "vital_body", ["Spiritus", "Prana", "Qi"]],
    ["Ochema", "dream_image_body", ["Soul vehicle", "Astral body"]],
    ["Irrational Soul", "desire_body", ["Kama", "Nafs"]],
    ["Rational Soul", "rational_mind", ["Ruach", "Manas"]],
    ["Higher Soul", "causal_soul", ["Higher Manas"]],
    ["Nous", "heart_intellect", ["Intellect", "Mens"]],
    ["Augoeides", "luminous_spirit_body", ["Radiant body", "Akh"]],
    ["Henadic Root", "absolute_root", ["The One", "Monad"]]
  ], ["ochema", "augoeides", "nous", "pneuma"], ["hermetic", "gnostic", "kabbalah"]),
  model("kabbalah", "Kabbalistic Soul Levels", "Jewish Kabbalah / Hermetic Qabalah", "A model of body, vital soul, spirit, higher soul, living essence, unique divine root, and related identity structures.", "Kabbalistic terms shift across sources; this tool labels them as interpretive correspondences rather than flattened equivalences.", [
    ["Guf", "dense_body", ["Body", "Corpus"]],
    ["Tzelem", "formative_double", ["Image", "Subtle template"]],
    ["Nefesh", "vital_body", ["Vital soul", "Ka", "Prana"]],
    ["Ruach", "rational_mind", ["Spirit", "Moral mind"]],
    ["Neshamah", "heart_intellect", ["Higher soul", "Buddhi"]],
    ["Chayah", "causal_soul", ["Living essence"]],
    ["Yechidah", "divine_spark", ["Unique one", "Atma"]],
    ["Lev", "emotional_soul", ["Heart", "Qalb"]],
    ["Yetzer ha-Ra", "desire_body", ["Inclination", "Shadow desire"]],
    ["Yetzer ha-Tov", "heart_intellect", ["Good inclination"]],
    ["Mazal", "causal_soul", ["Root influence", "Higher destiny"]]
  ], ["nefesh", "ruach", "neshamah", "tzelem", "yechidah"], ["theosophy", "golden-dawn", "sufi"]),
  model("golden-dawn", "Golden Dawn / Western Magical Anatomy", "Hermetic magic", "A magical anatomy of physical, etheric, astral, soul, spirit, sphere of sensation, body of light, and angelic contact.", "The Hermetic Order of the Golden Dawn adapted Kabbalistic, Hermetic, Rosicrucian, astrological, and ritual vocabularies.", [
    ["Physical Body", "dense_body"],
    ["Etheric Body", "formative_double", ["Linga Sharira"]],
    ["Astral Body", "dream_image_body", ["Ochema", "Body of Light"]],
    ["Nephesh", "vital_body", ["Nefesh"]],
    ["Ruach", "rational_mind"],
    ["Neshamah", "heart_intellect"],
    ["Chiah", "causal_soul"],
    ["Yechidah", "divine_spark"],
    ["Sphere of Sensation", "magical_vehicle"],
    ["Body of Light", "magical_vehicle", ["Astral vehicle"]],
    ["Holy Guardian Angel", "divine_spark", ["Daimon", "Augoeides"]]
  ], ["body of light", "sphere of sensation", "holy guardian angel"], ["kabbalah", "hermetic", "rosicrucian"]),
  model("hermetic", "Hermetic Model", "Hermeticism", "A layered account of corpus, spiritus, psyche, nous, logos, daimon, star-body, and immortal light.", "Hermetic sources vary from philosophical dialogues to magical and astrological bodies of practice.", [
    ["Corpus", "dense_body"],
    ["Pneuma / Spiritus", "vital_body", ["Breath", "Spirit"]],
    ["Psyche / Anima", "emotional_soul", ["Soul"]],
    ["Nous / Mens", "heart_intellect", ["Intellect"]],
    ["Logos", "causal_soul", ["Word", "Reason"]],
    ["Daimon", "divine_spark", ["Holy Guardian Angel"]],
    ["Star-Body", "magical_vehicle", ["Sidereal body"]],
    ["Immortal Man", "divine_spark"],
    ["Light-Body", "luminous_spirit_body"]
  ], ["nous", "logos", "daimon", "star-body"], ["neoplatonic", "gnostic", "alchemical"]),
  model("gnostic", "Gnostic Model", "Gnostic traditions", "A dramatic anthropology of body, psychic soul, pneumatic spark, image, garment of light, and heavenly human.", "Gnostic systems differ widely; many describe a divine element concealed within psychic and material strata.", [
    ["Soma", "dense_body"],
    ["Hylikon", "dense_body", ["Material nature"]],
    ["Psyche", "emotional_soul"],
    ["Psychikon", "rational_mind"],
    ["Pneuma", "divine_spark"],
    ["Pneumatikon", "causal_soul"],
    ["Divine Spark / Spinther", "divine_spark"],
    ["Eikon", "formative_double", ["Image"]],
    ["Garment of Light", "luminous_spirit_body"],
    ["Anthropos", "absolute_root", ["Heavenly Human"]]
  ], ["spark", "garment of light", "anthropos"], ["hermetic", "neoplatonic", "christian-esoteric"]),
  model("vedanta", "Vedantic Five Koshas", "Vedanta", "A sheath model moving from food-body through breath, mind, intelligence, bliss, and Atman.", "The kosha model is an interpretive map of embodiment and realization in Vedantic discourse.", [
    ["Annamaya Kosha", "dense_body", ["Food sheath"]],
    ["Pranamaya Kosha", "vital_body", ["Breath sheath"]],
    ["Manomaya Kosha", "rational_mind", ["Mind sheath"]],
    ["Vijnanamaya Kosha", "heart_intellect", ["Wisdom sheath"]],
    ["Anandamaya Kosha", "causal_soul", ["Bliss sheath"]],
    ["Atman", "divine_spark", ["Self"]]
  ], ["koshas", "atman", "prana"], ["theosophy", "yoga", "tantric"]),
  model("yoga", "Samkhya / Yoga Model", "Samkhya and Yoga", "A discriminating map of gross, subtle, causal body, mind-functions, nature, and pure witness.", "Classical yoga and Samkhya distinguish consciousness from nature through careful analysis of faculties.", [
    ["Sthula Sharira", "dense_body"],
    ["Sukshma Sharira", "formative_double", ["Subtle body"]],
    ["Karana Sharira", "causal_soul", ["Causal body"]],
    ["Prana", "vital_body"],
    ["Manas", "rational_mind"],
    ["Ahamkara", "shadow_identity", ["I-maker"]],
    ["Buddhi", "heart_intellect"],
    ["Chitta", "dream_image_body", ["Mind-stuff"]],
    ["Purusha", "divine_spark"],
    ["Prakriti", "absolute_root", ["Nature"]]
  ], ["purusha", "prakriti", "chitta"], ["vedanta", "tantric", "theosophy"]),
  model("tantric", "Tantric Subtle Body", "Tantra", "A subtle anatomy of gross and subtle bodies, prana, channels, chakras, kundalini, bindu, Shakti, Shiva, and divine body.", "Tantric systems vary by lineage; this resource keeps symbolic anatomy separate from practice instruction.", [
    ["Sthula Deha", "dense_body"],
    ["Sukshma Deha", "formative_double"],
    ["Karana Deha", "causal_soul"],
    ["Prana", "vital_body"],
    ["Nadis", "vital_body", ["Channels"]],
    ["Chakras", "magical_vehicle", ["Wheels"]],
    ["Kundalini", "divine_spark", ["Serpent power"]],
    ["Bindu", "causal_soul", ["Seed point"]],
    ["Shakti", "divine_spark"],
    ["Shiva", "absolute_root"],
    ["Divya-Deha", "luminous_spirit_body", ["Divine body"]]
  ], ["kundalini", "nadis", "chakras", "bindu"], ["vajrayana", "yoga", "vedanta"]),
  model("vajrayana", "Vajrayana Subtle Body", "Vajrayana Buddhism", "A layered subtle body of channels, winds, drops, subtle mind, clear light, illusory body, and rainbow body.", "Vajrayana subtle anatomy belongs to specific initiatory contexts; here it is presented for comparative study only.", [
    ["Gross Body", "dense_body"],
    ["Subtle Body", "formative_double"],
    ["Very Subtle Body", "causal_soul"],
    ["Channels", "vital_body"],
    ["Winds", "vital_body"],
    ["Drops", "causal_soul"],
    ["Ordinary Mind", "rational_mind"],
    ["Subtle Mind", "heart_intellect"],
    ["Clear Light Mind", "divine_spark"],
    ["Illusory Body", "magical_vehicle"],
    ["Rainbow Body", "luminous_spirit_body"]
  ], ["channels", "winds", "drops", "clear light", "rainbow body"], ["tantric", "vedanta", "gnostic"]),
  model("taoist", "Taoist Internal Alchemy", "Taoist internal alchemy", "A transformative map of jing, qi, shen, heart-mind, spirits, emptiness, Dao, yang spirit, embryo, and golden elixir body.", "Neidan terms vary by lineage; this atlas treats them as symbolic and historical categories, not instructions.", [
    ["Jing", "dense_body", ["Essence"]],
    ["Qi", "vital_body", ["Vital breath"]],
    ["Shen", "heart_intellect", ["Spirit"]],
    ["Yi", "rational_mind", ["Intention"]],
    ["Xin", "emotional_soul", ["Heart-mind"]],
    ["Hun", "dream_image_body", ["Ethereal soul"]],
    ["Po", "desire_body", ["Corporeal soul"]],
    ["Zhi", "rational_mind", ["Will"]],
    ["Ling", "divine_spark", ["Numinous spirit"]],
    ["Xu", "absolute_root", ["Emptiness"]],
    ["Dao", "absolute_root"],
    ["Yangshen", "luminous_spirit_body", ["Yang spirit"]],
    ["Immortal Embryo", "causal_soul"],
    ["Golden Elixir Body", "luminous_spirit_body"]
  ], ["jing", "qi", "shen", "yangshen", "golden elixir"], ["tantric", "alchemical", "five-spirits"]),
  model("five-spirits", "Chinese Five Spirits Model", "Chinese medicine / Daoist psychology", "A five-spirit model of shen, hun, po, yi, zhi, and supporting vital substances.", "The Five Spirits appear in medical, cosmological, and Taoist symbolic contexts with different emphases.", [
    ["Shen", "heart_intellect"],
    ["Hun", "dream_image_body"],
    ["Po", "desire_body"],
    ["Yi", "rational_mind"],
    ["Zhi", "rational_mind"],
    ["Jing", "dense_body"],
    ["Qi", "vital_body"],
    ["Xue", "vital_body", ["Blood"]],
    ["Mingmen", "causal_soul", ["Gate of life"]]
  ], ["shen", "hun", "po", "yi", "zhi", "mingmen"], ["taoist", "tantric", "sufi"]),
  model("sufi", "Sufi Lata'if / Subtle Centers", "Sufism", "A subtle anthropology of body, nafs, heart, spirit, secret centers, intellect, subtle body, and perfected human.", "Sufi subtle anatomy differs among orders; this atlas presents a comparative, non-exhaustive research view.", [
    ["Jism", "dense_body"],
    ["Nafs", "desire_body"],
    ["Qalb", "emotional_soul"],
    ["Ruh", "divine_spark"],
    ["Sirr", "heart_intellect"],
    ["Khafi", "causal_soul"],
    ["Akhfa", "absolute_root"],
    ["Aql", "rational_mind"],
    ["Lubb", "heart_intellect"],
    ["Jism Latif", "luminous_spirit_body"],
    ["Insan al-Kamil", "luminous_spirit_body"]
  ], ["lataif", "nafs", "qalb", "ruh", "sirr"], ["kabbalah", "christian-esoteric", "theosophy"]),
  model("anthroposophy", "Anthroposophical Model", "Anthroposophy", "A developmental model of physical, etheric, astral, ego, soul faculties, and future spiritual members.", "Anthroposophy extends Theosophical vocabulary into a Christian-esoteric evolutionary anthropology.", [
    ["Physical Body", "dense_body"],
    ["Etheric Body", "vital_body"],
    ["Astral Body", "dream_image_body"],
    ["Ego / I", "rational_mind"],
    ["Sentient Soul", "emotional_soul"],
    ["Intellectual Soul", "rational_mind"],
    ["Consciousness Soul", "heart_intellect"],
    ["Spirit Self", "causal_soul"],
    ["Life Spirit", "luminous_spirit_body"],
    ["Spirit Man", "divine_spark"]
  ], ["etheric", "astral", "ego", "spirit self"], ["theosophy", "rosicrucian", "christian-esoteric"]),
  model("paracelsian", "Paracelsian Model", "Paracelsian medicine", "A medical-magical anthropology of visible body, sidereal body, archeus, several ens, mumia, yliaster, and inner physician.", "Paracelsian medicine blends Christian, alchemical, astrological, and natural-philosophical languages.", [
    ["Visible Body", "dense_body"],
    ["Sidereal Body", "magical_vehicle"],
    ["Archaeus", "vital_body"],
    ["Ens Naturale", "dense_body"],
    ["Ens Astrale", "dream_image_body"],
    ["Ens Veneni", "shadow_identity"],
    ["Ens Spirituale", "emotional_soul"],
    ["Ens Dei", "divine_spark"],
    ["Mumia", "postmortem_body"],
    ["Yliaster", "absolute_root"],
    ["Inner Physician", "heart_intellect"]
  ], ["archaeus", "sidereal body", "mumia", "yliaster"], ["alchemical", "hermetic", "rosicrucian"]),
  model("bardon", "Bardonian Model", "Franz Bardon / modern Hermeticism", "A practical magical anatomy of physical, astral, mental body, akasha, fluids, elemental matrix, and equilibrium.", "Bardon's system organizes Hermetic training around elements, fluids, bodies, and equilibrium.", [
    ["Physical Body", "dense_body"],
    ["Astral Body", "dream_image_body"],
    ["Mental Body", "rational_mind"],
    ["Akasha Principle", "absolute_root"],
    ["Electric Fluid", "magical_vehicle"],
    ["Magnetic Fluid", "magical_vehicle"],
    ["Electromagnetic Equilibrium", "heart_intellect"],
    ["Elemental Matrix", "formative_double"],
    ["Vital Force", "vital_body"]
  ], ["akasha", "electric fluid", "magnetic fluid"], ["hermetic", "golden-dawn", "alchemical"]),
  model("rosicrucian", "Rosicrucian Model", "Rosicrucianism", "A Christian esoteric model of dense body, vital body, desire body, mind, spirits, soul body, and golden wedding garment.", "Rosicrucian systems vary; this presentation focuses on a modern esoteric anatomy used for comparative study.", [
    ["Dense Body", "dense_body"],
    ["Vital Body", "vital_body"],
    ["Desire Body", "desire_body"],
    ["Mind", "rational_mind"],
    ["Human Spirit", "causal_soul"],
    ["Life Spirit", "luminous_spirit_body"],
    ["Divine Spirit", "divine_spark"],
    ["Soul Body", "luminous_spirit_body"],
    ["Golden Wedding Garment", "luminous_spirit_body"]
  ], ["vital body", "desire body", "golden wedding garment"], ["anthroposophy", "christian-esoteric", "alchemical"]),
  model("christian-esoteric", "Christian Esoteric / Mystical Model", "Christian mysticism", "A mystical anthropology of body, soul, spirit, heart, nous, image, likeness, resurrection body, glory, and angelic accompaniment.", "Christian esoteric sources include patristic, mystical, hesychast, Hermetic Christian, and initiatic streams.", [
    ["Body", "dense_body"],
    ["Soul", "emotional_soul"],
    ["Spirit", "divine_spark"],
    ["Heart", "heart_intellect"],
    ["Nous", "heart_intellect"],
    ["Logos Within", "causal_soul"],
    ["Image of God", "formative_double"],
    ["Likeness of God", "luminous_spirit_body"],
    ["Resurrection Body", "postmortem_body"],
    ["Body of Glory", "luminous_spirit_body"],
    ["Guardian Angel", "divine_spark"]
  ], ["nous", "heart", "image of god", "body of glory"], ["gnostic", "sufi", "rosicrucian"]),
  model("alchemical", "Alchemical Human Model", "Alchemy", "A symbolic human of corpus, anima, spiritus, salt, sulfur, mercury, radical moisture, archeus, astrum, limbus, and glorified body.", "Alchemical anthropology links matter, soul, spirit, medicine, cosmology, and transformation through symbolic operations.", [
    ["Corpus", "dense_body"],
    ["Anima", "emotional_soul"],
    ["Spiritus", "vital_body"],
    ["Salt", "dense_body"],
    ["Sulfur", "desire_body"],
    ["Mercury", "magical_vehicle"],
    ["Radical Moisture", "vital_body"],
    ["Archaeus", "vital_body"],
    ["Astrum", "dream_image_body"],
    ["Limbus", "absolute_root"],
    ["Glorified Body", "luminous_spirit_body"],
    ["Stone-Body", "luminous_spirit_body"]
  ], ["salt", "sulfur", "mercury", "archeus", "stone-body"], ["hermetic", "paracelsian", "rosicrucian"])
];
