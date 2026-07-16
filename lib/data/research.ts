import { episodes, hosts, topics } from "@/lib/data/demo";
import type { Episode, ListeningPath, TimelinePoint } from "@/lib/data/types";

export const listeningPaths: ListeningPath[] = [
  {
    slug: "foundations-of-hermeticism",
    title: "Foundations of Hermeticism",
    summary: "A careful path into Hermetic cosmology, correspondences, symbols, and practice.",
    difficulty: "Foundational",
    topics: ["Hermeticism", "Symbolism", "Philosophy"],
    steps: [
      {
        title: "Begin with symbolic consciousness",
        summary: "Start where the archive treats symbols as operative bridges rather than decorations.",
        episodeSlug: "symbolism-eminationism-color-magick-etheric-tides-universal-planes",
        prompt: "What changes when a symbol is treated as a disciplined instrument of perception?"
      },
      {
        title: "Map the Hermetic vocabulary",
        summary: "Move through archetypes, emanation, polarity, and the Tree of Life as related languages.",
        episodeSlug: "dion-fortune-theosophy-hermeneutics-qabalah-thought-forms-negative-existence-17",
        prompt: "Which terms feel philosophical, which feel devotional, and which feel practical?"
      },
      {
        title: "Read beside the archive",
        summary: "Pair listening with source literacy and a simple notebook of terms.",
        bookTitle: "The Mystical Qabalah",
        prompt: "Write three definitions in your own words before moving to advanced material."
      }
    ]
  },
  {
    slug: "the-path-of-the-theurgist",
    title: "The Path of the Theurgist",
    summary: "Episodes and prompts centered on sacred action, divine participation, and ritual philosophy.",
    difficulty: "Intermediate",
    topics: ["Theurgy", "Christian Mysticism", "Western Esotericism"],
    steps: [
      {
        title: "Locate the aim of theurgy",
        summary: "Distinguish ritual technique from the transformation of the practitioner.",
        episodeSlug: "theurgy-and-the-return-of-the-gods",
        prompt: "What is the difference between calling a force and becoming a worthy vessel?"
      },
      {
        title: "Study the Christian current",
        summary: "Follow angelology, hierarchy, liturgy, and contemplative ascent as a connected field.",
        episodeSlug: "prophets-laws-the-architechture-of-order-ike-baker-sky-mathis",
        prompt: "Where does law become order, and where does order become initiation?"
      },
      {
        title: "Continue the current",
        summary: "Use the recommendation engine to move toward a related guest, book, or chapter.",
        prompt: "Choose one related episode and one primary source to study next."
      }
    ]
  },
  {
    slug: "alchemy-and-inner-transformation",
    title: "Alchemy and Inner Transformation",
    summary: "A path through alchemical symbolism, psychic change, and the ethics of transformation.",
    difficulty: "Foundational",
    topics: ["Alchemy", "Symbolism", "Mysticism"],
    steps: [
      {
        title: "Enter the mysteries",
        summary: "Begin with mystery traditions, sacred language, and symbolic initiation in a real Aetherica episode.",
        episodeSlug: "on-the-mysteries",
        chapterStart: 0,
        prompt: "What changes when transformation is approached as initiation rather than self-improvement?"
      },
      {
        title: "Follow symbolic language",
        summary: "Track how esoteric traditions preserve meaning through myth, ritual, architecture, and image.",
        episodeSlug: "symbolism-eminationism-color-magick-etheric-tides-universal-planes",
        prompt: "Which symbolic terms need historical notes before they become useful?"
      },
      {
        title: "Collect passages",
        summary: "Save one quotation and one timestamp into the Commonplace Book.",
        prompt: "What passage would you want to return to six months from now?"
      }
    ]
  },
  {
    slug: "martinism-and-reintegration",
    title: "Martinism and Reintegration",
    summary: "A future-ready path for Christian esotericism, reintegration, prayer, repair, and initiation.",
    difficulty: "Intermediate",
    topics: ["Christian Mysticism", "Theurgy", "Mysticism"],
    steps: [
      {
        title: "Name the problem of reintegration",
        summary: "Prepare a shelf for episodes and texts that discuss fall, repair, and return.",
        prompt: "What does reintegration imply about the human person and the cosmos?"
      },
      {
        title: "Connect prayer and initiation",
        summary: "Link contemplative practice to symbolic orders, ritual forms, and moral transformation.",
        prompt: "Where does an initiatic system require ethical preparation?"
      },
      {
        title: "Build the bibliography",
        summary: "Attach primary texts and guest references as the archive grows.",
        prompt: "Which sources should be read before commentary?"
      }
    ]
  },
  {
    slug: "the-mysteries-of-symbol",
    title: "The Mysteries of Symbol",
    summary: "A path focused on image, rite, correspondence, analogy, and the disciplined imagination.",
    difficulty: "Foundational",
    topics: ["Symbolism", "Sacred Architecture", "Western Esotericism"],
    steps: [
      {
        title: "Symbols as tools",
        summary: "Begin with passages that define symbol as a way of knowing.",
        episodeSlug: "symbolism-eminationism-color-magick-etheric-tides-universal-planes",
        prompt: "How is a symbol different from a sign, a metaphor, or a mere illustration?"
      },
      {
        title: "Move from image to architecture",
        summary: "Follow symbols into temples, diagrams, lodges, and sacred buildings.",
        episodeSlug: "wind-forms-the-aether-anamnesis-and-th-heptagram-within",
        prompt: "What happens when a symbol becomes a place?"
      },
      {
        title: "Practice comparison",
        summary: "Compare one symbol across two traditions without collapsing their differences.",
        prompt: "What remains stable, and what changes with tradition, ritual, and history?"
      }
    ]
  },
  {
    slug: "astrology-and-cosmic-order",
    title: "Astrology and Cosmic Order",
    summary: "A route through celestial symbolism, order, timing, and cosmological imagination.",
    difficulty: "Intermediate",
    topics: ["Astrology", "Hermeticism", "Philosophy"],
    steps: [
      {
        title: "Begin with cosmic order",
        summary: "Use astrology as a symbolic cosmology rather than isolated prediction.",
        prompt: "What does an ordered cosmos ask of interpretation?"
      },
      {
        title: "Connect planets to virtues",
        summary: "Search the spoken archive for planetary virtues, Agrippa, and correspondences.",
        prompt: "When a planet names a virtue, what sort of claim is being made?"
      },
      {
        title: "Return through the player",
        summary: "Use the astrological player mode while taking notes in the Commonplace Book.",
        prompt: "Which topics should light up while the audio plays?"
      }
    ]
  },
  {
    slug: "freemasonry-and-initiation",
    title: "Freemasonry and Initiation",
    summary: "A path through lodge symbolism, moral architecture, rites, history, and related traditions.",
    difficulty: "Intermediate",
    topics: ["Freemasonry", "Sacred Architecture", "Symbolism"],
    steps: [
      {
        title: "Study initiation as form",
        summary: "Treat the rite as a symbolic architecture with ethical and contemplative dimensions.",
        prompt: "What does the candidate learn by moving through space?"
      },
      {
        title: "Compare traditions carefully",
        summary: "Link Freemasonry to adjacent esoteric currents without overclaiming sameness.",
        prompt: "Which connections are historical, which are symbolic, and which are speculative?"
      },
      {
        title: "Follow guest constellations",
        summary: "Use guest/topic/book overlaps to discover related researchers and episodes.",
        prompt: "Which guest would you listen to next, and why?"
      }
    ]
  }
];

const fallbackBooks = ["The Mystical Qabalah", "Three Books of Occult Philosophy", "The Kybalion"];

export function topicDefinition(label: string) {
  const normalized = label.toLowerCase();
  return topics.find((topic) => topic.title.toLowerCase() === normalized || topic.slug === normalized)?.definition;
}

export function episodeBySlug(slug?: string) {
  if (!slug) return undefined;
  return episodes.find((episode) => episode.slug === slug);
}

export function chapterSummary(episode: Episode, title: string) {
  const titleWords = title.toLowerCase().split(/\W+/).filter((word) => word.length > 4).slice(0, 4);
  const matchedTopic = episode.topics.find((topic) => title.toLowerCase().includes(topic.toLowerCase()));
  if (matchedTopic) return `A focused chapter on ${matchedTopic.toLowerCase()} inside ${episode.title}.`;
  if (titleWords.length) return `A focused passage on ${titleWords.join(", ")} from ${episode.title}.`;
  return `A chapter-level entry point into ${episode.title}.`;
}

export function chapterKeywords(episode: Episode, title: string) {
  const words = title
    .split(/\W+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 4)
    .slice(0, 5);
  return Array.from(new Set([...episode.topics.slice(0, 3), ...words]));
}

export function allChapterEntries() {
  return episodes.flatMap((episode) =>
    episode.chapters.map((chapter, index) => {
      const nextChapter = episode.chapters[index + 1];
      return {
        episode,
        chapter,
        summary: chapter.summary ?? chapterSummary(episode, chapter.title),
        keywords: chapter.keywords ?? chapterKeywords(episode, chapter.title),
        nextChapter
      };
    })
  );
}

function scoreText(text: string, terms: string[]) {
  const haystack = text.toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

export function searchSpokenArchive(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const transcriptResults = episodes.flatMap((episode) =>
    episode.transcript
      .map((segment) => {
        const chapter = activeChapterForEpisode(episode, segment.start);
        const score = scoreText([segment.text, segment.speaker, segment.section, chapter?.title ?? ""].join(" "), terms);
        return {
          type: "Transcript passage" as const,
          score,
          episode,
          speaker: segment.speaker,
          start: segment.start,
          chapter: chapter?.title ?? segment.section,
          passage: segment.text,
          relatedBooks: relatedBooksForEpisode(episode)
        };
      })
      .filter((result) => result.score > 0)
  );

  const chapterResults = allChapterEntries()
    .map(({ episode, chapter, summary, keywords }) => {
      const score = scoreText([episode.title, chapter.title, summary, keywords.join(" "), episode.longIntroduction].join(" "), terms);
      return {
        type: "Chapter match" as const,
        score,
        episode,
        speaker: episode.hosts.join(" & "),
        start: chapter.start,
        chapter: chapter.title,
        passage: summary,
        relatedBooks: relatedBooksForEpisode(episode)
      };
    })
    .filter((result) => result.score > 0);

  const descriptionResults = episodes
    .map((episode) => {
      const score = scoreText([episode.title, episode.description, episode.longIntroduction, episode.topics.join(" ")].join(" "), terms);
      return {
        type: "Show notes match" as const,
        score,
        episode,
        speaker: episode.hosts.join(" & "),
        start: 0,
        chapter: "Show notes",
        passage: episode.description,
        relatedBooks: relatedBooksForEpisode(episode)
      };
    })
    .filter((result) => result.score > 0);

  return [...transcriptResults, ...chapterResults, ...descriptionResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 24);
}

export function activeChapterForEpisode(episode: Episode, position: number) {
  return episode.chapters.reduce<(typeof episode.chapters)[number] | undefined>(
    (active, chapter) => (chapter.start <= position ? chapter : active),
    undefined
  );
}

export function relatedBooksForEpisode(episode: Episode) {
  const ikeBooks = hosts.find((host) => host.slug === "ike-baker")?.books?.map((book) => book.title) ?? [];
  const text = [episode.title, episode.description, episode.longIntroduction, episode.topics.join(" ")].join(" ").toLowerCase();
  const books = [
    ...ikeBooks.filter((title) => scoreText(text, title.toLowerCase().split(/\W+/).filter((word) => word.length > 4)) > 0),
    ...fallbackBooks.filter((title) => scoreText(text, title.toLowerCase().split(/\W+/).filter((word) => word.length > 4)) > 0)
  ];
  return Array.from(new Set(books)).slice(0, 3);
}

export function continueTheCurrent(episode: Episode) {
  const related = episodes
    .filter((item) => item.guid !== episode.guid)
    .map((item) => ({
      episode: item,
      score: item.topics.filter((topic) => episode.topics.includes(topic)).length + (item.guest && item.guest === episode.guest ? 2 : 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.episode);

  return {
    label: episode.topics.includes("Christian Mysticism") ? "Continue the current of Christian theurgy" : `Continue the current of ${episode.topics[0] ?? "Aetherica"}`,
    foundational: related[0],
    advanced: related[1],
    guest: episode.guest || "Ike Baker",
    book: relatedBooksForEpisode(episode)[0] ?? "The Mystical Qabalah",
    chapter: allChapterEntries().find((entry) => entry.episode.guid !== episode.guid && entry.keywords.some((keyword) => episode.topics.includes(keyword)))
  };
}

export const timelines: TimelinePoint[] = [
  {
    year: "1st-3rd c.",
    title: "Hermetic texts circulate in late antique Egypt",
    summary: "Dialogues attributed to Hermes Trismegistus frame philosophy as revelation, cosmology, and spiritual ascent.",
    topic: "History of Hermeticism"
  },
  {
    year: "3rd-5th c.",
    title: "Theurgy develops in Neoplatonic ritual philosophy",
    summary: "Iamblichean theurgy distinguishes divine action from ordinary discursive thought and becomes central for later esoteric reception.",
    topic: "Development of Theurgy"
  },
  {
    year: "12th-13th c.",
    title: "Alchemy enters Latin intellectual culture",
    summary: "Arabic and Greek materials move into Latin translation streams, expanding alchemy as laboratory, cosmology, and symbolism.",
    topic: "History of Alchemy"
  },
  {
    year: "15th c.",
    title: "Renaissance Hermetic revival",
    summary: "Florentine translation projects reconnect Hermetic, Platonic, Christian, and magical vocabularies.",
    topic: "History of Hermeticism"
  },
  {
    year: "1614-1616",
    title: "Rosicrucian manifestos appear",
    summary: "The manifestos intensify dreams of reform, hidden brotherhood, Christian esotericism, and symbolic healing.",
    topic: "Christian Esotericism"
  },
  {
    year: "1717",
    title: "Grand Lodge formation in London",
    summary: "Speculative Freemasonry enters a new public institutional phase with ritual, moral, and architectural symbolism.",
    topic: "Evolution of Freemasonry"
  },
  {
    year: "1888",
    title: "The Hermetic Order of the Golden Dawn is founded",
    summary: "A modern initiatic synthesis joins Qabalah, astrology, tarot, ritual magic, color symbolism, and temple work.",
    topic: "Astrology through the Ages",
    episodeSlug: "symbolism-eminationism-color-magick-etheric-tides-universal-planes"
  }
];

export const guestConstellations = [
  {
    name: "Ike Baker",
    traditions: ["Hermeticism", "Theurgy", "Western Esotericism"],
    overlaps: ["Sky Mathis", "Frater R.C.", "Aaron Leitch", "Jaime Paul Lamb"],
    books: ["A Formless Fire", "Ætheric Magic", "Esoteric Mythology"]
  },
  {
    name: "Sky Mathis",
    traditions: ["Symbolism", "Philosophy", "Esoteric media"],
    overlaps: ["Ike Baker", "Philosophical Minds Podcast"],
    books: ["The Mystical Qabalah", "Three Books of Occult Philosophy"]
  },
  {
    name: "Aaron Leitch",
    traditions: ["Solomonic magic", "Golden Dawn", "Angelology"],
    overlaps: ["Ike Baker", "Frater R.C.", "Jaime Paul Lamb"],
    books: ["Secrets of the Magickal Grimoires", "The Angelical Language"]
  },
  {
    name: "Frater R.C.",
    traditions: ["Freemasonry", "Rosicrucianism", "Christian esotericism"],
    overlaps: ["Ike Baker", "Aaron Leitch", "Jaime Paul Lamb"],
    books: ["Rosicrucian and Masonic source texts"]
  },
  {
    name: "Jaime Paul Lamb",
    traditions: ["Freemasonry", "Astrology", "Symbolism"],
    overlaps: ["Aaron Leitch", "Frater R.C.", "Ike Baker"],
    books: ["The Archetypal Temple", "Myth, Magick, and Masonry"]
  }
];
