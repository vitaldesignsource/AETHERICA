import type { InstrumentBriefData } from "@/components/resources/InstrumentBrief";

/**
 * Editorial context for the celestial and correspondence instruments.
 *
 * Deliberately conservative: these describe what each system IS and where it comes from, naming
 * only works the attributions are securely associated with. Where a instrument computes an
 * approximation, the caveat says so plainly rather than implying ephemeris-grade precision.
 */
export const instrumentBriefs: Record<string, InstrumentBriefData> = {
  "planetary-correspondences": {
    tradition: [
      "The seven classical planets — Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn — are the oldest organising frame in Western esoteric practice. Everything visible that moved against the fixed stars was a planet, and each was read as a distinct quality rather than merely a body.",
      "From that came the correspondence habit of mind: a planet gathers a metal, a day, a colour, a plant, a metal's temperament, an hour. The lists are not arbitrary decoration. They are a memory system and a working vocabulary, letting a practitioner move between registers — botanical, temporal, metallic, psychological — while holding one idea."
    ],
    reading: [
      "Each planet's panel gathers its traditional attributions side by side, so the pattern across registers is visible rather than buried in a table.",
      "Correspondences differ between sources and centuries. Where a tradition disagrees with another, that is a fact about the tradition, not an error to resolve.",
      "Read a column downward to learn one planet; read a row across to see how a single register — metals, say — divides the whole heaven."
    ],
    sources: [
      { title: "Three Books of Occult Philosophy", note: "Agrippa's 1533 compendium, the most influential single gathering of planetary correspondence material in the Western tradition." },
      { title: "Picatrix (Ghāyat al-Ḥakīm)", note: "The Arabic magical compendium, later Latinised, behind much of the planetary and talismanic material Agrippa inherited." }
    ],
    caveat:
      "This is a reference to a body of traditional attribution, not a claim that any correspondence produces a physical effect. Sources disagree; the instrument presents the common inheritance rather than adjudicating between them.",
    related: [
      { href: "/resources/planetary-hours", label: "Planetary Hours" },
      { href: "/resources/planetary-day", label: "Planetary Day" },
      { href: "/resources/golden-dawn-correspondences", label: "Golden Dawn Correspondences" }
    ],
    topics: [
      { href: "/topics/hermeticism", label: "Hermeticism" },
      { href: "/topics/astrology", label: "Astrology" },
      { href: "/topics/symbolism", label: "Symbolism" }
    ]
  },

  "golden-dawn-correspondences": {
    tradition: [
      "The Hermetic Order of the Golden Dawn, founded in London in 1887, did something the earlier tradition had not: it welded planetary, elemental, zodiacal, tarot, Hebrew-letter and Tree of Life attributions into a single interlocking table intended to be learned as one system.",
      "That synthesis is why so much twentieth-century esotericism speaks a common language. When a modern deck assigns a path on the Tree to a trump, or a grade to an element, it is usually inheriting a Golden Dawn decision — one made deliberately, and not always the only option the older sources allow."
    ],
    reading: [
      "Entries are cross-indexed: a single row ties a sephirah or path to its planet, element, letter, colour scale, and tarot card.",
      "Where the Golden Dawn departed from earlier attribution, treat the divergence as the interesting part — it marks a choice, and the choice has consequences downstream.",
      "The colour scales belong to four worlds; a colour is meaningful relative to its scale, not on its own."
    ],
    sources: [
      { title: "The Golden Dawn", note: "Israel Regardie's publication of the Order's papers, the reason the system is documented at all rather than remaining oath-bound." },
      { title: "Liber 777", note: "Crowley's tabulation of correspondences drawn from Golden Dawn material, the form in which the tables reached most later readers." }
    ],
    caveat:
      "These tables record one influential nineteenth-century synthesis. They are not the only valid set of attributions, and older sources frequently assign differently.",
    related: [
      { href: "/resources/tree-of-life", label: "Tree of Life" },
      { href: "/resources/tarot-correspondences", label: "Tarot Correspondences" },
      { href: "/resources/hebrew-letters", label: "Hebrew Letters" }
    ],
    topics: [
      { href: "/topics/kabbalah", label: "Kabbalah" },
      { href: "/topics/hermeticism", label: "Hermeticism" },
      { href: "/topics/freemasonry", label: "Freemasonry" }
    ]
  },

  "decan-calculator": {
    tradition: [
      "The decans divide the zodiac into thirty-six segments of ten degrees. They are Egyptian in origin, where a sequence of stars rising in succession through the night marked the hours and, across the year, the calendar.",
      "Hellenistic and later Arabic astrology absorbed the scheme and assigned each decan a planetary ruler in the Chaldean order — the arrangement that gives the decans their alternative name, the faces. A planet in its own face carries a minor dignity: not the strength of rulership, but not nothing."
    ],
    reading: [
      "The instrument reports the decan the Sun and the Moon occupy for the selected moment, with the zodiacal range and traditional ruler of each.",
      "Decan boundaries are exact tenths of a sign: 0°–10°, 10°–20°, 20°–30°. A body near a boundary is worth checking against a precise ephemeris.",
      "The ruler shown follows the Chaldean-order face attribution, which is the common traditional assignment — some sources use the triplicity-based scheme instead."
    ],
    sources: [
      { title: "Egyptian decan lists", note: "Star tables from coffin lids and tomb ceilings, the earliest surviving form of the thirty-six-fold division." },
      { title: "Picatrix and Agrippa", note: "The route by which decan imagery and planetary faces entered Latin magical practice." }
    ],
    caveat:
      "Solar and lunar positions are compact approximations intended for study and planning. Near a decan boundary, or where exact timing matters, consult a high-precision ephemeris.",
    related: [
      { href: "/resources/celestial-instrument", label: "Celestial Instrument" },
      { href: "/resources/lunar-mansions", label: "Lunar Mansions" },
      { href: "/resources/zodiacal-hours", label: "Zodiacal Hours" }
    ],
    topics: [
      { href: "/topics/astrology", label: "Astrology" },
      { href: "/topics/hermeticism", label: "Hermeticism" }
    ]
  },

  "lunar-mansions": {
    tradition: [
      "Where the decans divide the zodiac by the Sun's year, the mansions divide it by the Moon's month. Twenty-eight stations, each roughly 12°51', mark where the Moon rests on successive nights of its circuit.",
      "The system is best documented in the Arabic tradition as the manāzil al-qamar, though comparable lunar station schemes appear independently in Indian and Chinese astronomy — a reminder that the Moon's monthly circuit invites the same solution wherever the sky is watched carefully."
    ],
    reading: [
      "The instrument reports the mansion the Moon occupies for the selected moment, with its zodiacal range.",
      "Twenty-eight stations do not divide 360° evenly; each spans 12°51'26\" and boundaries fall mid-sign rather than at neat degrees.",
      "Traditional mansion material is strongly electional — it was used to choose moments for undertakings, which is why sources attach activities rather than character readings to each station."
    ],
    sources: [
      { title: "Picatrix (Ghāyat al-Ḥakīm)", note: "The fullest transmission of the mansions into Latin magical literature, with their electional attributions." },
      { title: "Agrippa, Three Books of Occult Philosophy", note: "Book II carries the mansion list that most later European sources reproduce." }
    ],
    caveat:
      "The lunar position is an approximation. The Moon moves roughly its own diameter every hour, so mansion boundaries are the place where a compact model is least reliable — verify against a precise ephemeris before acting on a boundary case.",
    related: [
      { href: "/resources/moon-phase", label: "Moon Phase" },
      { href: "/resources/decan-calculator", label: "Decan Calculator" },
      { href: "/resources/election-planner", label: "Election Planner" }
    ],
    topics: [
      { href: "/topics/astrology", label: "Astrology" },
      { href: "/topics/symbolism", label: "Symbolism" }
    ]
  },

  "celestial-instrument": {
    tradition: [
      "Traditional astrology is less a matter of reading meanings off a list than of judging condition: where a planet sits, what it rules, what it sees, and whether the place strengthens or weakens it. The dignity schemes exist to make that judgement systematic.",
      "The hermetic lots — the Part of Fortune the best known among them — are computed points rather than bodies, derived from arcs between the luminaries and the ascendant. They shift the chart's emphasis toward a particular question, which is why the older literature carries so many of them."
    ],
    reading: [
      "The dignity matrix reports each planet's essential dignities by sign, so a planet's condition can be judged rather than assumed.",
      "Lots are calculated points, and most reverse their formula between day and night charts — check which sect the chart is before reading them.",
      "The ephemeris table gives positions for the selected moment; the chart is cast for the location as well as the time, so both must be right."
    ],
    sources: [
      { title: "Hellenistic and Perso-Arabic astrology", note: "The dignity schemes and lots reach modern practice through this transmission rather than from a single author." },
      { title: "Agrippa and the Latin tradition", note: "The route by which much of this material became available to European practitioners." }
    ],
    caveat:
      "Positions use compact approximations suitable for study, teaching, and planning. This is not an ephemeris-grade calculator, and it makes no predictive claim about events or persons.",
    related: [
      { href: "/resources/decan-calculator", label: "Decan Calculator" },
      { href: "/resources/planetary-hours", label: "Planetary Hours" },
      { href: "/resources/fixed-stars", label: "Fixed Stars" }
    ],
    topics: [
      { href: "/topics/astrology", label: "Astrology" },
      { href: "/topics/hermeticism", label: "Hermeticism" }
    ]
  },

  "zodiacal-hours": {
    tradition: [
      "Before clocks imposed equal hours, the day was divided by light. Sunrise to sunset made twelve hours and sunset to sunrise made twelve more, so an hour stretched and contracted with the season — long summer days, short summer nights.",
      "The zodiacal division applies the same instinct to the signs rather than the planets: the daily circuit is cut into twelve zodiacal periods, so each stretch of the day carries a sign's character. It is a way of reading the day as a compressed year."
    ],
    reading: [
      "The instrument divides sunrise to the following sunrise into twelve periods, beginning from the Sun's approximate sign for the chosen date.",
      "Because the periods are keyed to actual sunrise, their length shifts with latitude and season — this is a feature of the system, not drift.",
      "Compare against planetary hours: the two schemes divide the same day differently and are often used together rather than as alternatives."
    ],
    sources: [
      { title: "The unequal-hour tradition", note: "The seasonal-hour reckoning shared by Greek, Roman, and medieval timekeeping, from which planetary and zodiacal hour schemes both descend." },
      { title: "Picatrix and Agrippa", note: "The magical literature in which hour divisions are put to electional use." }
    ],
    caveat:
      "Sunrise and sunset are computed approximately and depend on the location supplied. At high latitudes, and near the solstices, the model degrades — verify locally before relying on a boundary.",
    related: [
      { href: "/resources/planetary-hours", label: "Planetary Hours" },
      { href: "/resources/celestial-timing", label: "Celestial Timing Suite" },
      { href: "/resources/sacred-calendar", label: "Sacred Calendar" }
    ],
    topics: [
      { href: "/topics/astrology", label: "Astrology" },
      { href: "/topics/hermeticism", label: "Hermeticism" }
    ]
  }
};
