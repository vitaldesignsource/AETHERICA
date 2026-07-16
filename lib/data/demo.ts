import youtubeEpisodeSeeds from "../../content/youtube-episodes.json";
import rssEpisodeSeeds from "../../content/rss-episodes.json";
import ikeEventSeeds from "../../content/ike-events.json";
import vaticanJesuitTranscript from "../../content/transcripts/vatican-jesuit-episode-1.json";
import powerHeresyTranscript from "../../content/transcripts/power-heresy-episode-2.json";
import lightBearerTranscript from "../../content/transcripts/light-bearer-episode-3.json";
import onTheMysteriesTranscript from "../../content/transcripts/on-the-mysteries-episode-4.json";
import pathUnknownPhilosopherTranscript from "../../content/transcripts/path-of-the-unknown-philosopher-episode-5.json";
import esotericaCryptographiaTranscript from "../../content/transcripts/esoterica-cryptographia-episode-6.json";
import templeHasNoGuardTranscript from "../../content/transcripts/temple-has-no-guard-episode-7.json";
import yourTruthVsTheGoodTranscript from "../../content/transcripts/your-truth-vs-the-good-episode-8.json";
import qabalisticaFrameworksTranscript from "../../content/transcripts/qabalistica-frameworks-episode-10.json";
import qabalisticaPt2Transcript from "../../content/transcripts/qabalistica-pt-2-episode-11.json";
import watersPurificationFireConsecrationTranscript from "../../content/transcripts/waters-purification-fire-consecration-episode-12.json";
import enochianGoldenDawnAgrippaTranscript from "../../content/transcripts/enochian-golden-dawn-agrippa-episode-13.json";
import prophetsLawsArchitectureOrderTranscript from "../../content/transcripts/prophets-laws-architecture-order-episode-14.json";
import evolutionaryArcanaTranscript from "../../content/transcripts/evolutionary-arcana-episode-15.json";
import lilithMagicVsLogicTranscript from "../../content/transcripts/lilith-magic-vs-logic-society-of-8-episode-16.json";
import dionFortuneTranscript from "../../content/transcripts/dion-fortune-episode-17.json";
import circuitOfForceTranscript from "../../content/transcripts/circuit-of-force-episode-19.json";
import symbolismEminationismTranscript from "../../content/transcripts/symbolism-eminationism-episode-18.json";
import magiPreSocraticsTranscript from "../../content/transcripts/magi-pre-socratics-episode.json";
import sevenSagesTranscript from "../../content/transcripts/seven-sages-hermetic-current-episode.json";
import neoplatonismTheurgyTranscript from "../../content/transcripts/neoplatonism-theurgy-philosopher-magician-episode.json";
import masonicMagicianTranscript from "../../content/transcripts/masonic-magician-american-psyche-war-morality-episode.json";
import midrashMagikTranscript from "../../content/transcripts/midrash-magik-grimiore-tradition-episode.json";
import hekalotLiteratureTranscript from "../../content/transcripts/hekalot-literature-astral-gates-osirification-episode.json";
import drewMackinnonTeleologyTempleTranscript from "../../content/transcripts/drew-mackinnon-teleology-temple-episode.json";
import danielWisemanMetallicAlchemyTranscript from "../../content/transcripts/daniel-wiseman-metallic-alchemy-episode.json";
import freedomPt4Transcript from "../../content/transcripts/freedom-pt-4-founding-ideals-philosopher-kings-episode.json";
import liminalitySpeciesInitiationTranscript from "../../content/transcripts/liminality-species-initiation-episode.json";
import markStavishOccultTrainingTranscript from "../../content/transcripts/mark-stavish-occult-training-hermetic-practice-episode.json";
import windFormsAetherTranscript from "../../content/transcripts/wind-forms-aether-episode.json";
import type { Episode, EventItem, GuestProfile, Person, Topic } from "./types";

export const topics: Topic[] = [
  {
    slug: "alchemy",
    title: "Alchemy",
    definition: "A symbolic and operative tradition concerned with transformation.",
    overview:
      "Aetherica treats alchemy as a living language of matter, soul, image, and disciplined inner change."
  },
  {
    slug: "theurgy",
    title: "Theurgy",
    definition: "Sacred ritual philosophy oriented toward divine participation.",
    overview: "Episodes gather ancient, late antique, and Christian mystical approaches to sacred action."
  },
  {
    slug: "hermeticism",
    title: "Hermeticism",
    definition: "A family of texts and practices associated with Hermes Trismegistus.",
    overview: "The archive follows Hermetic ideas through philosophy, magic, Christianity, and Renaissance revival."
  },
  {
    slug: "astrology",
    title: "Astrology",
    definition: "A symbolic cosmology relating celestial order to earthly life.",
    overview: "Astrology is presented historically, philosophically, and critically as part of sacred cosmology."
  },
  {
    slug: "kabbalah",
    title: "Kabbalah",
    definition: "Jewish mystical tradition and its later Christian and esoteric receptions.",
    overview: "Pages distinguish tradition, reception, and modern interpretation with care."
  },
  {
    slug: "gnosticism",
    title: "Gnosticism",
    definition: "A family of ancient currents centered on gnosis, cosmic exile, aeons, archons, and awakening.",
    overview:
      "Aetherica approaches Gnosticism as a complex field of texts, sects, mythic cosmologies, and later esoteric receptions rather than a single doctrine."
  },
  {
    slug: "freemasonry",
    title: "Freemasonry",
    definition: "An initiatic fraternity with symbolic, architectural, and moral teachings.",
    overview: "Coverage emphasizes symbolism, history, ritual architecture, and documented sources."
  },
  {
    slug: "mysticism",
    title: "Mysticism",
    definition: "Disciplines of contemplative experience and union with ultimate reality.",
    overview: "A comparative editorial path through Christian, philosophical, and esoteric sources."
  },
  {
    slug: "philosophy",
    title: "Philosophy",
    definition: "The love of wisdom as metaphysical, ethical, and contemplative inquiry.",
    overview: "Aetherica follows philosophy where it becomes practice, symbol, and spiritual architecture."
  },
  {
    slug: "christian-mysticism",
    title: "Christian Mysticism",
    definition: "Contemplative and symbolic currents within Christian tradition.",
    overview: "A careful home for theology, prayer, liturgy, angelology, and mystical texts."
  },
  {
    slug: "symbolism",
    title: "Symbolism",
    definition: "The study of images, signs, rites, and correspondences.",
    overview: "Symbols are treated as historical artifacts and disciplined contemplative instruments."
  },
  {
    slug: "sacred-architecture",
    title: "Sacred Architecture",
    definition: "Built forms designed around cosmology, ritual, proportion, and meaning.",
    overview: "Cathedrals, lodges, temples, and diagrams become readable as spatial theology."
  },
  {
    slug: "western-esotericism",
    title: "Western Esotericism",
    definition: "A scholarly umbrella for currents of hidden, initiatic, and alternative knowledge.",
    overview: "The site favors documented history, source literacy, and responsible interpretation."
  }
];

export const hosts: Person[] = [
  {
    slug: "sky-mathis",
    name: "Sky Mathis",
    role: "Host, creator, researcher, and esoteric media architect",
    imageUrl:
      "https://yt3.googleusercontent.com/ydQA6F2f6qGXkoutgjJt8IZ4wtxc0TDKX8bYt9wk07i1jNUjC6tQbPjZE6cwgR6Lgd-Y1yB8hCk=s900-c-k-c0x00ffffff-no-rj",
    imageAlt: "Public channel image for Philosophical Minds Podcast, associated with Sky Mathis.",
    shortBio:
      "Sky Mathis is the co-host of Aetherica and is also associated with Philosophical Minds Podcast. This biography remains intentionally concise until a verified long-form bio is supplied.",
    longBio:
      "Sky Mathis is presented here as Aetherica co-host and creator, with additional public work connected to Philosophical Minds Podcast. This profile is structured for verified biography, creative projects, media work, publications, collaborations, and professional inquiries.",
    studyAreas: ["Esoteric media", "Symbolism", "Design systems", "Podcast production"],
    socials: [
      { label: "Aetherica YouTube", url: "https://www.youtube.com/@AETHERICAPODCAST" },
      { label: "Philosophical Minds Website", url: "https://philosophicalmindspodcast.com" },
      { label: "Philosophical Minds Podcast", url: "https://www.youtube.com/@PhilosophicalMindsPodcast" },
      { label: "Philosophical Minds Patreon", url: "https://www.patreon.com/philosophicalminds" },
      { label: "Aetherica Patreon", url: "https://www.patreon.com/Aetherica" },
      { label: "Instagram", url: "https://www.instagram.com/aethericapodcast/" }
    ]
  },
  {
    slug: "ike-baker",
    name: "Ike Baker",
    role: "Co-host, researcher, lecturer, and writer",
    imageUrl: "https://img1.wsimg.com/isteam/ip/c0d9d5f8-4d12-4dca-ae6d-eb759f7705a3/Ike%20Baker1.jpg",
    imageAlt: "Portrait of Ike Baker from ikebaker.com.",
    shortBio:
      "Ike Baker is an author, teacher, and Aetherica co-host whose public work centers on Western esotericism, theurgy, magic, symbolism, and initiatory traditions.",
    longBio:
      "Ike Baker is the creator of ARCANVM and co-host of Aetherica with Sky Mathis. His public website presents courses, lectures, private study, podcast appearances, and books on Western esotericism, theurgy, elemental and celestial magic, alchemy, and magical traditions of the West.",
    studyAreas: ["Western esotericism", "Mysticism", "Symbolism", "Tradition"],
    socials: [
      { label: "Website", url: "https://ikebaker.com" },
      { label: "ARCANVM YouTube", url: "https://www.youtube.com/@arcanvm" },
      { label: "ARCANVM Patreon", url: "https://www.patreon.com/arcanvm" },
      { label: "Aetherica Patreon", url: "https://www.patreon.com/Aetherica" }
    ],
    books: [
      {
        title: "Esoteric Mythology",
        subtitle: "The Generative and Transformative Power of Imagination",
        publisher: "Inner Traditions / Simon & Schuster",
        status: "Pre-order",
        coverImage: "https://cdn.shopify.com/s/files/1/0674/5433/7265/files/9798888504000_p0.jpg?v=1771248446",
        sourceUrl: "https://www.simonandschuster.com/books/Esoteric-Mythology/Ike-Baker/9798888504000",
        description:
          "Forthcoming book listed from Ike Baker's website with publisher and retailer pre-order links."
      },
      {
        title: "Ætheric Magic",
        subtitle: "A Complete System of Elemental, Celestial & Alchemical Magic",
        publisher: "Llewellyn",
        status: "Available",
        coverImage: "https://gaia.llewellyn.com/product_images/200/9780738777818.jpg",
        sourceUrl: "https://www.llewellyn.com/product.php?ean=9780738777818",
        description:
          "A Llewellyn title by Ike Baker focused on ætheric magic, elemental work, celestial magic, and alchemical practice."
      },
      {
        title: "A Formless Fire",
        subtitle: "Rediscovering the Magical Traditions of the West",
        publisher: "Tria Prima",
        status: "Available",
        coverImage: "https://triaprimapress.com/cdn/shop/files/A_Formless_Fire_Cover_square.png?v=1720496079",
        sourceUrl: "https://triaprimapress.com/products/a-formless-fire",
        description:
          "A Tria Prima title by Ike Baker on Western magical traditions and esoteric practice."
      }
    ]
  }
];

export const guests: GuestProfile[] = [
  ...hosts.map((host) => ({
    ...host,
    profileType: "host" as const,
    relatedGuests:
      host.slug === "ike-baker"
        ? ["Sky Mathis", "Frater R.C.", "Aaron Leitch", "Jaime Paul Lamb"]
        : ["Ike Baker", "Philosophical Minds Podcast"]
  })),
  {
    slug: "jaime-paul-lamb",
    name: "Jaime Paul Lamb",
    role: "Author, astrologer, Freemasonic researcher, and esoteric writer",
    shortBio:
      "Jaime Paul Lamb is represented in the Aetherica guest constellation as a researcher connected with Freemasonry, astrology, symbolism, and related esoteric currents.",
    longBio:
      "This permanent guest profile is prepared for a verified long-form biography, portrait, official links, book data, Aetherica appearances, transcript excerpts, topics discussed, and related guests. The current profile uses the Aetherica archive's local guest-constellation data until a fuller verified biography is supplied.",
    studyAreas: ["Freemasonry", "Astrology", "Symbolism", "Western esotericism"],
    socials: [],
    books: [
      {
        title: "The Archetypal Temple",
        description: "Listed as a relevant book in the Aetherica guest constellation.",
        sourceUrl: "/guests/jaime-paul-lamb"
      },
      {
        title: "Myth, Magick, and Masonry",
        description: "Listed as a relevant book in the Aetherica guest constellation.",
        sourceUrl: "/guests/jaime-paul-lamb"
      }
    ],
    profileType: "guest",
    relatedGuests: ["Aaron Leitch", "Frater R.C.", "Ike Baker"]
  },
  {
    slug: "daniel-wiseman",
    name: "Daniel Wiseman",
    role: "Founder of Secret Fire Apothecary, registered clinical herbalist, herbalist, and spagyrist",
    imageUrl: "https://secret-fire.com/cdn/shop/files/Daniel-Wiseman.jpg?v=1734667545&width=1500",
    imageAlt: "Portrait of Daniel Wiseman from the Secret Fire Apothecary about page.",
    shortBio:
      "Daniel Wiseman is the founder of Secret Fire Apothecary, where his public work brings together herbalism, Spagyria, alchemy, natural medicine, education, and research.",
    longBio:
      "Daniel Wiseman is the founder of Secret Fire Apothecary and is presented publicly as a registered clinical herbalist whose studies span Ayurveda, traditional Chinese medicine, Western herbal medicine, and Spagyria. Secret Fire Apothecary describes his work as an effort to unite Spagyria with clinical natural medicine, modern science, art, education, research, and direct experience of Nature through the lens of alchemy. His Aetherica appearance centers on metallic alchemy, herbal medicine, plant and mineral energetics, opening and purifying metals, the alkahest, spagyric medicine, planetary signatures, and the philosophical nature of transformation.",
    studyAreas: ["Alchemy", "Spagyrics", "Herbal medicine", "Natural medicine", "Metallic alchemy", "Planetary signatures"],
    socials: [
      { label: "Secret Fire Apothecary", url: "https://secret-fire.com" },
      { label: "About Secret Fire", url: "https://secret-fire.com/pages/about" }
    ],
    books: [],
    profileType: "guest",
    relatedGuests: ["Ike Baker", "Sky Mathis"]
  },
  {
    slug: "drew-mackinnon",
    name: "Drew MacKinnon",
    role: "Temple researcher, traveler, and Aetherica guest",
    shortBio:
      "Drew MacKinnon joins Aetherica for a study of sacred architecture, ancient temples, initiatory space, and the pressures modern technology places on spiritual attention.",
    longBio:
      "Drew MacKinnon appears in the Aetherica archive in a wide-ranging conversation on ancient temples, sacred architecture, Theosophy, Eastern traditions, spiritual discipline, technology, and the modern crisis of attention. This profile gathers his Aetherica appearance and the topics connected to that conversation while a fuller verified biography and official links are prepared.",
    studyAreas: ["Sacred architecture", "Ancient temples", "Theosophy", "Eastern traditions", "Spiritual discipline"],
    socials: [],
    books: [],
    profileType: "guest",
    relatedGuests: ["Ike Baker", "Sky Mathis"]
  },
  {
    slug: "mark-stavish",
    name: "Mark Stavish",
    role: "Author, Hermetic practitioner, esoteric educator, and Aetherica guest",
    shortBio:
      "Mark Stavish joins Aetherica for a sustained discussion of occult training, Hermetic practice, alchemical psychology, discipline, and esoteric development.",
    longBio:
      "Mark Stavish appears in the Aetherica archive in a conversation centered on practical esotericism, alchemical transformation, thought-forms, initiatory training, discernment, and the moral demands of sustained inner work. This profile connects that appearance to its episode, transcript, and research themes while verified official links and a fuller bibliography are prepared.",
    studyAreas: ["Hermeticism", "Alchemy", "Occult training", "Initiation", "Esoteric psychology"],
    socials: [],
    books: [],
    profileType: "guest",
    relatedGuests: ["Ike Baker", "Sky Mathis"]
  },
  {
    slug: "david-sherb",
    name: "David Sherb",
    role: "Aetherica guest on initiation, discernment, and living tradition",
    shortBio:
      "David Sherb joins Aetherica for a personal and philosophical exploration of occult orders, trauma, spiritual discernment, vocation, family, and living initiatory work.",
    longBio:
      "David Sherb appears in the Aetherica archive in a conversation about occult communities, spiritual discernment, trauma, religious identity, family, vocation, and the difference between a living tradition and an institutional shell. This profile gathers his episode and its connected themes while a fuller verified biography and official links are prepared.",
    studyAreas: ["Initiation", "Spiritual discernment", "Living tradition", "Vocation", "Ethics"],
    socials: [],
    books: [],
    profileType: "guest",
    relatedGuests: ["Ike Baker", "Sky Mathis"]
  }
];

const transcriptImports = [
  vaticanJesuitTranscript,
  powerHeresyTranscript,
  lightBearerTranscript,
  onTheMysteriesTranscript,
  pathUnknownPhilosopherTranscript,
  esotericaCryptographiaTranscript,
  templeHasNoGuardTranscript,
  yourTruthVsTheGoodTranscript,
  qabalisticaFrameworksTranscript,
  qabalisticaPt2Transcript,
  watersPurificationFireConsecrationTranscript,
  enochianGoldenDawnAgrippaTranscript,
  prophetsLawsArchitectureOrderTranscript,
  evolutionaryArcanaTranscript,
  lilithMagicVsLogicTranscript,
  dionFortuneTranscript,
  symbolismEminationismTranscript,
  circuitOfForceTranscript,
  magiPreSocraticsTranscript,
  sevenSagesTranscript,
  neoplatonismTheurgyTranscript,
  masonicMagicianTranscript,
  midrashMagikTranscript,
  hekalotLiteratureTranscript,
  drewMackinnonTeleologyTempleTranscript,
  danielWisemanMetallicAlchemyTranscript,
  freedomPt4Transcript,
  liminalitySpeciesInitiationTranscript,
  markStavishOccultTrainingTranscript,
  windFormsAetherTranscript
];

const transcriptBySlug = new Map(
  transcriptImports.flatMap((transcriptImport) =>
    transcriptImport.episodeSlugs.map((slug) => [
      slug,
      {
        chapters: transcriptImport.chapters,
        episodeNumber: transcriptImport.episodeNumber,
        transcript: transcriptImport.segments
      }
    ] as const)
  )
);

function comparableTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/aetherica|podcast|ike baker|sky mathis|hidden currents in the church of rome|#\d+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleTokens(value: string) {
  return new Set(comparableTitle(value).split(" ").filter((token) => token.length > 3));
}

function sharedTokenCount(a: string, b: string) {
  const aTokens = titleTokens(a);
  const bTokens = titleTokens(b);
  return [...aTokens].filter((token) => bTokens.has(token)).length;
}

function episodeTopics(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();
  const inferred = new Set(["Western Esotericism", "Philosophy", "Mysticism"]);
  if (text.includes("alchemy") || text.includes("spagyric") || text.includes("alkahest")) inferred.add("Alchemy");
  if (text.includes("qabalah") || text.includes("kabbalah") || text.includes("cabala")) inferred.add("Kabbalah");
  if (text.includes("astrology") || text.includes("planetary")) inferred.add("Astrology");
  if (text.includes("gnostic") || text.includes("demiurge") || text.includes("archon")) inferred.add("Gnosticism");
  if (text.includes("freemasonry") || text.includes("masonic")) inferred.add("Freemasonry");
  if (text.includes("theurgy") || text.includes("theurgic")) inferred.add("Theurgy");
  if (text.includes("hermetic")) inferred.add("Hermeticism");
  if (text.includes("symbol")) inferred.add("Symbolism");
  if (text.includes("architecture") || text.includes("temple")) inferred.add("Sacred Architecture");
  if (text.includes("christian")) inferred.add("Christian Mysticism");
  return [...inferred];
}

const youtubeEpisodes: Episode[] = youtubeEpisodeSeeds.map((episode, index) => {
  const description = episode.description.split("\n\n")[0] || episode.description;
  const transcriptData = transcriptBySlug.get(episode.slug);
  return {
    slug: episode.slug,
    guid: `youtube-${episode.youtubeVideoId}`,
    number: index + 1,
    season: 1,
    title: episode.title,
    subtitle: "Public YouTube episode metadata imported from the Aetherica channel",
    guest: episode.title.includes(":") ? episode.title.split(":")[0].trim() : "",
    hosts: ["Sky Mathis", "Ike Baker"],
    publishedLabel: episode.publishedLabel,
    duration: "",
    durationSeconds: 0,
    description,
    longIntroduction: episode.description,
    topics: episodeTopics(episode.title, episode.description),
    coverImage: `https://i.ytimg.com/vi/${episode.youtubeVideoId}/hq720.jpg`,
    youtubeUrl: episode.youtubeUrl,
    youtubeVideoId: episode.youtubeVideoId,
    descriptionSource: "Public YouTube description",
    chapters: transcriptData?.chapters ?? episode.chapters,
    transcript: transcriptData?.transcript ?? [],
    demo: false
  };
});

const rssEpisodes: Episode[] = rssEpisodeSeeds.map((episode) => {
  const transcriptData = transcriptBySlug.get(episode.slug);
  const matchingYouTube = youtubeEpisodeSeeds.find(
    (youtubeEpisode) =>
      (Boolean(transcriptData) && transcriptBySlug.has(youtubeEpisode.slug)) ||
      youtubeEpisode.slug === episode.slug ||
      comparableTitle(youtubeEpisode.title).includes(comparableTitle(episode.title).slice(0, 24)) ||
      comparableTitle(episode.title).includes(comparableTitle(youtubeEpisode.title).slice(0, 24)) ||
      sharedTokenCount(youtubeEpisode.title, episode.title) >= 3
  );
  return {
    slug: episode.slug,
    guid: episode.guid,
    number: transcriptData?.episodeNumber ?? episode.episodeNumber ?? 0,
    season: 1,
    title: episode.title,
    subtitle: "Podcast RSS audio episode",
    guest: episode.title.includes(":") ? episode.title.split(":")[0].trim() : "",
    hosts: ["Sky Mathis", "Ike Baker"],
    publishedAt: episode.publishedAt,
    duration: episode.duration,
    durationSeconds: episode.durationSeconds,
    description: episode.description.split(". ").slice(0, 2).join(". "),
    longIntroduction: episode.description,
    topics: episodeTopics(episode.title, episode.description),
    coverImage: episode.coverImage ?? "/images/aetherica-hero.png",
    audioUrl: episode.audioUrl,
    youtubeUrl: matchingYouTube?.youtubeUrl,
    youtubeVideoId: matchingYouTube?.youtubeVideoId,
    descriptionSource: "Aetherica RSS feed",
    chapters: transcriptData?.chapters ?? matchingYouTube?.chapters ?? [],
    transcript: transcriptData?.transcript ?? [],
    demo: false
  };
});

const youtubeOnlyEpisodes = youtubeEpisodes.filter(
  (youtubeEpisode) =>
    !rssEpisodes.some(
      (rssEpisode) =>
        rssEpisode.slug === youtubeEpisode.slug ||
        rssEpisode.title.toLowerCase().includes(youtubeEpisode.title.toLowerCase().slice(0, 28)) ||
        youtubeEpisode.title.toLowerCase().includes(rssEpisode.title.toLowerCase().slice(0, 28))
    )
);

export const episodes: Episode[] = [...rssEpisodes, ...youtubeOnlyEpisodes];

export const events: EventItem[] = [
  ...ikeEventSeeds.map((event) => ({
    slug: event.slug,
    title: event.title,
    shortDescription: event.shortDescription,
    longDescription: event.longDescription,
    type: "Appearance / Project",
    startDate: event.publishedAt ?? "2024-01-01T00:00:00Z",
    endDate: event.publishedAt ?? "2024-01-01T00:00:00Z",
    timeZone: "America/New_York",
    location: "See source page",
    status: "past" as const,
    speakers: ["Ike Baker"],
    sourceUrl: event.sourceUrl,
    imageUrl: event.imageUrl,
    demo: false
  })),
  {
    slug: "arcana-synaxis-v",
    title: "Arcana Synaxis V",
    shortDescription: "Demo event placeholder for the Aetherica event system.",
    longDescription:
      "This event is seeded demonstration content. Date, speakers, and title are provided by the brief; location and ticketing must be replaced with verified information before publication.",
    type: "Conference",
    startDate: "2026-05-15T10:00:00",
    endDate: "2026-05-15T17:00:00",
    timeZone: "America/Chicago",
    location: "Location to be announced",
    status: "past",
    speakers: ["Frater Eleftheria", "Ike Baker", "Frater R.C.", "Sky Mathis"],
    demo: true
  }
];
