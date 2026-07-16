"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Gem, Search, Sparkles, Table2 } from "lucide-react";
import { useState } from "react";

type ResourceKind = "sacred-calendar" | "golden-dawn" | "tarot" | "timing-journal";

type CalendarItem = {
  title: string;
  month: number;
  day: number;
  tradition: string;
  theme: string;
  note: string;
};

type CorrespondenceItem = {
  title: string;
  group: string;
  glyph: string;
  primary: string;
  secondary: string;
  colors: string[];
  keywords: string[];
  note: string;
};

type TarotItem = {
  key: string;
  title: string;
  hebrew: string;
  letter: string;
  attribution: string;
  path: string;
  keywords: string[];
  note: string;
};

const calendarItems: CalendarItem[] = [
  { title: "Epiphany / Theophany", month: 1, day: 6, tradition: "Christian liturgical", theme: "revelation", note: "A feast of manifestation, baptismal symbolism, and divine disclosure." },
  { title: "Candlemas", month: 2, day: 2, tradition: "Christian liturgical", theme: "purification", note: "Associated with light, purification, presentation, and the hinge between winter and spring." },
  { title: "Spring Equinox", month: 3, day: 20, tradition: "Solar calendar", theme: "balance", note: "Approximate seasonal marker for equalizing light and dark; exact astronomical date varies by year." },
  { title: "Summer Solstice", month: 6, day: 21, tradition: "Solar calendar", theme: "solar fullness", note: "Approximate marker of maximum daylight in the northern hemisphere." },
  { title: "Autumn Equinox", month: 9, day: 22, tradition: "Solar calendar", theme: "harvest balance", note: "Approximate seasonal marker for harvest, balance, and descent into the dark half of the year." },
  { title: "Michaelmas", month: 9, day: 29, tradition: "Christian liturgical", theme: "angelic order", note: "A traditional feast of Michael and the angels, often linked with protection and judgment imagery." },
  { title: "All Saints / All Hallows", month: 11, day: 1, tradition: "Christian liturgical", theme: "ancestral remembrance", note: "A remembrance of saints and the communion of the faithful departed." },
  { title: "Winter Solstice", month: 12, day: 21, tradition: "Solar calendar", theme: "returning light", note: "Approximate marker of longest night and the symbolic rebirth of light." }
];

const goldenDawnItems: CorrespondenceItem[] = [
  { title: "Kether", group: "Sephiroth", glyph: "1", primary: "Crown", secondary: "Primum Mobile / source", colors: ["Brilliance", "White brilliance"], keywords: ["unity", "source", "crown"], note: "Shown as Golden Dawn-style color and symbolic material, not a universal Kabbalistic table." },
  { title: "Chokmah", group: "Sephiroth", glyph: "2", primary: "Wisdom", secondary: "Zodiac / fixed stars", colors: ["Pure soft blue", "Grey"], keywords: ["wisdom", "zodiac", "father"], note: "Correspondence systems vary; this entry follows the Hermetic table already used in the Tree explorer." },
  { title: "Binah", group: "Sephiroth", glyph: "3", primary: "Understanding", secondary: "Saturn", colors: ["Crimson", "Black"], keywords: ["form", "saturn", "mother"], note: "Binah is shown through the Hermetic color scale layer." },
  { title: "Chesed", group: "Sephiroth", glyph: "4", primary: "Mercy", secondary: "Jupiter", colors: ["Deep violet", "Blue"], keywords: ["mercy", "jupiter", "order", "expansion"], note: "Chesed is presented through the Hermetic table of ordered benevolence, law, and expansion." },
  { title: "Gevurah", group: "Sephiroth", glyph: "5", primary: "Severity / Strength", secondary: "Mars", colors: ["Orange", "Scarlet red"], keywords: ["severity", "mars", "judgment", "discipline"], note: "Gevurah is shown as force under judgment: discipline, severance, and protection." },
  { title: "Tiphareth", group: "Sephiroth", glyph: "6", primary: "Beauty", secondary: "Sun", colors: ["Clear rose pink", "Yellow / gold"], keywords: ["beauty", "sun", "heart", "harmony"], note: "Tiphareth is the solar heart of the Hermetic Tree, joining beauty, balance, and spiritual identity." },
  { title: "Netzach", group: "Sephiroth", glyph: "7", primary: "Victory / Eternity", secondary: "Venus", colors: ["Amber", "Emerald green"], keywords: ["venus", "desire", "art", "emotion"], note: "Netzach is shown as the sphere of attraction, aesthetic force, imagination, and desire." },
  { title: "Hod", group: "Sephiroth", glyph: "8", primary: "Splendor", secondary: "Mercury", colors: ["Violet purple", "Orange"], keywords: ["mercury", "language", "ritual", "symbol"], note: "Hod orders experience through language, analysis, ritual form, and precise names." },
  { title: "Yesod", group: "Sephiroth", glyph: "9", primary: "Foundation", secondary: "Moon", colors: ["Indigo", "Violet"], keywords: ["moon", "foundation", "dream", "image"], note: "Yesod is presented as the imaginal foundation where patterns gather before manifestation." },
  { title: "Malkuth", group: "Sephiroth", glyph: "10", primary: "Kingdom", secondary: "Earth / the elements", colors: ["Yellow", "Citrine", "Olive", "Russet", "Black"], keywords: ["kingdom", "earth", "elements", "manifestation"], note: "Malkuth is the visible kingdom of body, matter, and embodied ritual action." },
  { title: "Sun", group: "Planets", glyph: "☉", primary: "Radiance and integration", secondary: "Identity, vitality, illumination", colors: ["Gold", "Yellow", "Orange"], keywords: ["radiance", "vitality", "clarity", "integration"], note: "Solar language is traditional symbolic correspondence, not a causal or scientific claim." },
  { title: "Moon", group: "Planets", glyph: "☽", primary: "Reflection and formation", secondary: "Memory, image, rhythm, dream", colors: ["Silver", "Blue", "Violet"], keywords: ["reflection", "dream", "memory", "rhythm"], note: "Lunar attributions are presented as part of the Hermetic symbolic vocabulary." },
  { title: "Mercury", group: "Planets", glyph: "☿", primary: "Language and mediation", secondary: "Writing, learning, commerce", colors: ["Orange", "Yellow", "Iridescent grey"], keywords: ["study", "communication", "divination"], note: "Planetary activity language is traditional correspondence, not causal claim." },
  { title: "Venus", group: "Planets", glyph: "♀", primary: "Attraction and harmony", secondary: "Art, music, reconciliation", colors: ["Emerald green", "Rose", "Copper-gold"], keywords: ["beauty", "relationship", "union"], note: "Planetary correspondences are presented as inherited symbolic vocabulary." },
  { title: "Mars", group: "Planets", glyph: "♂", primary: "Force and separation", secondary: "Courage, conflict, heat, decision", colors: ["Scarlet", "Red", "Rust"], keywords: ["force", "courage", "conflict", "separation"], note: "Martial language is a traditional symbolic framework and is not presented as physical causation." },
  { title: "Jupiter", group: "Planets", glyph: "♃", primary: "Expansion and order", secondary: "Law, generosity, authority, growth", colors: ["Violet", "Blue", "Purple"], keywords: ["expansion", "law", "generosity", "growth"], note: "Jovial correspondences are presented within a named Hermetic system." },
  { title: "Saturn", group: "Planets", glyph: "♄", primary: "Boundary and duration", secondary: "Form, time, limitation, maturity", colors: ["Indigo", "Black", "Deep violet"], keywords: ["boundary", "time", "limitation", "maturity"], note: "Saturnine correspondences are presented as symbolic and historically system-dependent." },
  { title: "Air", group: "Elements", glyph: "🜁", primary: "Movement and mediation", secondary: "Breath, intellect, relation, exchange", colors: ["Pale yellow", "Sky blue", "White"], keywords: ["breath", "intellect", "movement", "exchange"], note: "Elemental color and activity language varies across tables and ritual contexts." },
  { title: "Fire", group: "Elements", glyph: "🜂", primary: "Heat and consecration", secondary: "Will, purification, illumination", colors: ["Scarlet", "Flame", "Gold"], keywords: ["will", "consecration", "force"], note: "Elemental language is symbolic and varies by source." },
  { title: "Water", group: "Elements", glyph: "🜄", primary: "Reflection and receptivity", secondary: "Dream, memory, dissolution", colors: ["Blue", "Sea green", "Silver"], keywords: ["dream", "memory", "receptivity"], note: "Shown as a study matrix, not a ritual instruction." },
  { title: "Earth", group: "Elements", glyph: "🜃", primary: "Embodiment and stability", secondary: "Matter, structure, fertility, completion", colors: ["Citrine", "Olive", "Russet", "Black"], keywords: ["matter", "structure", "stability", "completion"], note: "Earth is shown through the fourfold Malkuth color language used in the Hermetic table." }
];

const tarotItems: TarotItem[] = [
  { key: "0", title: "The Fool", hebrew: "א", letter: "Aleph", attribution: "Air", path: "Kether to Chokmah", keywords: ["breath", "beginning", "openness"], note: "Common Golden Dawn-style attribution." },
  { key: "I", title: "The Magician", hebrew: "ב", letter: "Beth", attribution: "Mercury", path: "Kether to Binah", keywords: ["word", "skill", "mediation"], note: "Connects the letter Beth with Mercury in this Hermetic table." },
  { key: "II", title: "The High Priestess", hebrew: "ג", letter: "Gimel", attribution: "Moon", path: "Kether to Tiphareth", keywords: ["veil", "dream", "crossing"], note: "Often treated as the lunar path across the abyss in Hermetic pathwork." },
  { key: "III", title: "The Empress", hebrew: "ד", letter: "Daleth", attribution: "Venus", path: "Chokmah to Binah", keywords: ["door", "beauty", "form"], note: "System-labeled as Hermetic, not a universal tarot assignment." },
  { key: "IV", title: "The Emperor", hebrew: "ה", letter: "Heh", attribution: "Aries", path: "Chokmah to Tiphareth", keywords: ["authority", "window", "will"], note: "Shown in the common Hermetic ordering." },
  { key: "V", title: "The Hierophant", hebrew: "ו", letter: "Vav", attribution: "Taurus", path: "Chokmah to Chesed", keywords: ["teaching", "hook", "continuity"], note: "Vav is shown as a connecting principle in this table." },
  { key: "VI", title: "The Lovers", hebrew: "ז", letter: "Zayin", attribution: "Gemini", path: "Binah to Tiphareth", keywords: ["choice", "polarity", "union"], note: "A Hermetic path correspondence linked with Gemini." },
  { key: "VII", title: "The Chariot", hebrew: "ח", letter: "Cheth", attribution: "Cancer", path: "Binah to Gevurah", keywords: ["vehicle", "enclosure", "discipline"], note: "Presented as a path table entry, not a historical claim for all tarot traditions." },
  { key: "VIII", title: "Strength", hebrew: "ט", letter: "Teth", attribution: "Leo", path: "Chesed to Gevurah", keywords: ["serpent", "courage", "vital force"], note: "Golden Dawn-style Strength ordering; some decks switch VIII and XI." },
  { key: "IX", title: "The Hermit", hebrew: "י", letter: "Yod", attribution: "Virgo", path: "Chesed to Tiphareth", keywords: ["hand", "lamp", "discernment"], note: "Yod is shown here as the Hermetic path of Virgo." },
  { key: "X", title: "Wheel of Fortune", hebrew: "כ", letter: "Kaph", attribution: "Jupiter", path: "Chesed to Netzach", keywords: ["palm", "turning", "fortune"], note: "Kaph links Jupiter with cyclic expansion in this table." },
  { key: "XI", title: "Justice", hebrew: "ל", letter: "Lamed", attribution: "Libra", path: "Gevurah to Tiphareth", keywords: ["balance", "law", "adjustment"], note: "Golden Dawn-style Justice ordering; some decks switch VIII and XI." },
  { key: "XII", title: "The Hanged Man", hebrew: "מ", letter: "Mem", attribution: "Water", path: "Gevurah to Hod", keywords: ["suspension", "reversal", "sacrifice"], note: "Mem is shown as the elemental Water path." },
  { key: "XIII", title: "Death", hebrew: "נ", letter: "Nun", attribution: "Scorpio", path: "Tiphareth to Netzach", keywords: ["transformation", "threshold", "release"], note: "Nun links Scorpio with dissolution and transformation in the Hermetic scheme." },
  { key: "XIV", title: "Temperance", hebrew: "ס", letter: "Samekh", attribution: "Sagittarius", path: "Tiphareth to Yesod", keywords: ["support", "alchemy", "integration"], note: "Samekh is commonly read as the central path of testing and equilibration." },
  { key: "XV", title: "The Devil", hebrew: "ע", letter: "Ayin", attribution: "Capricorn", path: "Tiphareth to Hod", keywords: ["eye", "bondage", "material force"], note: "Ayin is shown in its standard Hermetic attribution to Capricorn." },
  { key: "XVI", title: "The Tower", hebrew: "פ", letter: "Peh", attribution: "Mars", path: "Netzach to Hod", keywords: ["mouth", "rupture", "force"], note: "Peh links Mars with upheaval, speech, and force." },
  { key: "XVII", title: "The Star", hebrew: "צ", letter: "Tzaddi", attribution: "Aquarius", path: "Netzach to Yesod", keywords: ["fishhook", "hope", "inspiration"], note: "This follows the Golden Dawn table; Thelemic arrangements may differ." },
  { key: "XVIII", title: "The Moon", hebrew: "ק", letter: "Qoph", attribution: "Pisces", path: "Netzach to Malkuth", keywords: ["back of head", "dream", "reflection"], note: "Qoph is associated with Pisces and the nocturnal threshold." },
  { key: "XIX", title: "The Sun", hebrew: "ר", letter: "Resh", attribution: "Sun", path: "Hod to Yesod", keywords: ["head", "radiance", "clarity"], note: "Resh is shown as the solar path in this Hermetic matrix." },
  { key: "XX", title: "Judgement", hebrew: "ש", letter: "Shin", attribution: "Fire", path: "Hod to Malkuth", keywords: ["tooth", "spirit", "awakening"], note: "Shin is presented as elemental Fire and Spirit in Golden Dawn-style tables." },
  { key: "XXI", title: "The World", hebrew: "ת", letter: "Tav", attribution: "Saturn / Earth", path: "Yesod to Malkuth", keywords: ["mark", "completion", "embodiment"], note: "Tav is shown with Saturn and Earth language in common Hermetic usage." }
];

export function PracticalResourceSuite({ kind }: { kind: ResourceKind }) {
  if (kind === "sacred-calendar") return <SacredCalendarTool />;
  if (kind === "golden-dawn") return <GoldenDawnTool />;
  if (kind === "tarot") return <TarotMatrixTool />;
  return <TimingJournalTool />;
}

function SacredCalendarTool() {
  const [tradition, setTradition] = useState("All");
  const [query, setQuery] = useState("");
  const traditions = ["All", ...Array.from(new Set(calendarItems.map((item) => item.tradition)))];
  const today = new Date();
  const filtered = calendarItems
    .filter((item) => tradition === "All" || item.tradition === tradition)
    .filter((item) => [item.title, item.theme, item.note].join(" ").toLowerCase().includes(query.toLowerCase()))
    .map((item) => ({ ...item, sort: nextDate(item.month, item.day, today).getTime() }))
    .sort((a, b) => a.sort - b.sort);

  return (
    <ResourceShell eyebrow="Sacred calendar" title="Seasonal and liturgical study dates" icon={CalendarDays}>
      <Controls>
        <SearchBox value={query} onChange={setQuery} placeholder="Search revelation, solstice, angelic order..." />
        <SelectBox label="Tradition" value={tradition} options={traditions} onChange={setTradition} />
      </Controls>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <article key={`${item.month}-${item.day}-${item.title}`} className="rounded border border-gold/15 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[.18em] text-gold">{formatMonthDay(item.month, item.day)} · {item.tradition}</p>
            <h3 className="mt-2 font-display text-2xl text-ivory">{item.title}</h3>
            <p className="mt-2 text-sm uppercase tracking-[.14em] text-limestone">{item.theme}</p>
            <p className="mt-3 text-sm leading-6 text-parchment">{item.note}</p>
          </article>
        ))}
      </div>
    </ResourceShell>
  );
}

function GoldenDawnTool() {
  const [group, setGroup] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("Tiphareth");
  const groups = ["All", ...Array.from(new Set(goldenDawnItems.map((item) => item.group)))];
  const filtered = goldenDawnItems
    .filter((item) => group === "All" || item.group === group)
    .filter((item) => [item.title, item.primary, item.secondary, ...item.keywords].join(" ").toLowerCase().includes(query.toLowerCase()));
  const selected = goldenDawnItems.find((item) => item.title === selectedTitle) ?? goldenDawnItems[0];

  return (
    <ResourceShell eyebrow="Hermetic correspondence" title="Golden Dawn-style reference table" icon={Sparkles}>
      <Controls>
        <SearchBox value={query} onChange={setQuery} placeholder="Search Saturn, Mercury, fire, crown..." />
        <SelectBox label="Group" value={group} options={groups} onChange={setGroup} />
      </Controls>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-gold/15 py-3 text-xs uppercase tracking-[.16em] text-limestone">
        <span><strong className="mr-2 text-gold">{goldenDawnItems.length}</strong> correspondences</span>
        <span><strong className="mr-2 text-gold">10</strong> Sephiroth</span>
        <span><strong className="mr-2 text-gold">7</strong> classical planets</span>
        <span><strong className="mr-2 text-gold">4</strong> elements</span>
      </div>
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,.6fr)]">
        <CorrespondenceGrid items={filtered} selectedTitle={selected.title} onSelect={setSelectedTitle} />
        <aside className="rounded border border-gold/25 bg-black/35 p-5 lg:sticky lg:top-28" aria-live="polite">
          <p className="text-xs uppercase tracking-[.22em] text-gold">Selected correspondence</p>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[.16em] text-limestone">{selected.group}</p>
              <h3 className="mt-1 font-display text-3xl text-ivory">{selected.title}</h3>
            </div>
            <span className="font-display text-5xl leading-none text-gold" aria-hidden="true">{selected.glyph}</span>
          </div>
          <p className="mt-5 text-lg text-parchment">{selected.primary}</p>
          <p className="mt-2 text-sm leading-6 text-limestone">{selected.secondary}</p>
          <div className="mt-5 border-t border-gold/15 pt-5">
            <p className="text-xs uppercase tracking-[.18em] text-gold">Color vocabulary</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.colors.map((color) => <span key={color} className="rounded border border-gold/20 bg-gold/[.06] px-2 py-1 text-xs text-parchment">{color}</span>)}
            </div>
          </div>
          <div className="mt-5 border-t border-gold/15 pt-5">
            <p className="text-xs uppercase tracking-[.18em] text-gold">Study terms</p>
            <p className="mt-2 text-sm leading-6 text-parchment">{selected.keywords.join(" · ")}</p>
          </div>
          <p className="mt-5 border-t border-gold/15 pt-5 text-sm leading-6 text-limestone">{selected.note}</p>
        </aside>
      </div>
      <div className="mt-6 flex flex-col gap-4 border-y border-gold/15 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-gold">Continue the matrix</p>
          <p className="mt-2 text-sm leading-6 text-parchment">Cross-reference the twenty-two Hebrew letters, Tarot keys, astrological attributions, and Tree paths.</p>
        </div>
        <Link href="/resources/tarot-correspondences" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm uppercase tracking-[.16em] text-gold hover:text-ivory">
          Open Major-key paths <ArrowRight size={16} />
        </Link>
      </div>
      <SystemNote />
    </ResourceShell>
  );
}

function TarotMatrixTool() {
  const [query, setQuery] = useState("");
  const filtered = tarotItems.filter((item) => [item.key, item.title, item.letter, item.attribution, item.path, ...item.keywords].join(" ").toLowerCase().includes(query.toLowerCase()));

  return (
    <ResourceShell eyebrow="Tarot correspondence" title="Major-key path matrix" icon={Table2}>
      <Controls>
        <SearchBox value={query} onChange={setQuery} placeholder="Search Aleph, Chariot, Gemini, Kether..." />
      </Controls>
      <div className="mt-5 overflow-hidden rounded border border-gold/20">
        <div className="grid gap-px bg-gold/10 md:grid-cols-[.45fr_1fr_.55fr_.9fr_1.1fr]">
          {["Key", "Tarot", "Letter", "Attribution", "Path"].map((heading) => <p key={heading} className="bg-black/60 p-3 text-xs uppercase tracking-[.18em] text-gold">{heading}</p>)}
          {filtered.map((item) => (
            <div key={item.title} className="contents">
              <p className="bg-black/30 p-3 font-display text-xl text-ivory">{item.key}</p>
              <p className="bg-black/30 p-3 text-parchment">{item.title}<span className="mt-1 block text-xs text-limestone">{item.note}</span></p>
              <p className="bg-black/30 p-3 text-parchment"><span className="torah-hebrew-letter text-xl" dir="rtl">{item.hebrew}</span> · {item.letter}</p>
              <p className="bg-black/30 p-3 text-parchment">{item.attribution}</p>
              <p className="bg-black/30 p-3 text-parchment">{item.path}</p>
            </div>
          ))}
        </div>
      </div>
      <SystemNote />
    </ResourceShell>
  );
}

function TimingJournalTool() {
  return (
    <ResourceShell eyebrow="Research journal" title="Astrological timing log" icon={BookOpenText}>
      <div className="rounded border border-gold/20 bg-black/25 p-5">
        <p className="text-xs uppercase tracking-[.18em] text-gold">Coming soon with profiles</p>
        <h3 className="mt-3 font-display text-3xl text-ivory">Saved timing notes will return with the account system</h3>
        <p className="mt-3 max-w-3xl leading-7 text-parchment">
          This journal will eventually hold astrological timing notes, instrument research notes, saved dates, observations, and outcomes. For now, saved data features are paused until sign up and login are available.
        </p>
      </div>
    </ResourceShell>
  );
}

function CorrespondenceGrid({
  items,
  selectedTitle,
  onSelect
}: {
  items: CorrespondenceItem[];
  selectedTitle: string;
  onSelect: (title: string) => void;
}) {
  if (!items.length) {
    return (
      <div className="rounded border border-gold/15 bg-black/25 p-6 text-sm leading-6 text-limestone">
        No correspondence matches this search. Try a planet, Sephirah, element, color, or study term.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <button
          type="button"
          key={`${item.group}-${item.title}`}
          onClick={() => onSelect(item.title)}
          aria-pressed={selectedTitle === item.title}
          className={`focus-ring relative overflow-hidden rounded border p-4 text-left transition ${selectedTitle === item.title ? "border-gold bg-gold/[.1] shadow-aureate" : "border-gold/15 bg-black/25 hover:border-gold/35 hover:bg-gold/[.05]"}`}
        >
          <div className="absolute right-4 top-4 text-5xl text-gold/20">{item.glyph}</div>
          <p className="text-xs uppercase tracking-[.18em] text-gold">{item.group}</p>
          <h3 className="mt-2 font-display text-3xl text-ivory">{item.title}</h3>
          <p className="mt-2 text-sm text-parchment">{item.primary}</p>
          <p className="mt-1 text-sm text-limestone">{item.secondary}</p>
          <p className="mt-4 text-xs uppercase tracking-[.14em] text-gold/80">View correspondence</p>
        </button>
      ))}
    </div>
  );
}

function ResourceShell({ eyebrow, title, icon: Icon, children }: { eyebrow: string; title: string; icon: typeof Gem; children: React.ReactNode }) {
  return (
    <section className="temple-border rounded p-5">
      <div className="flex items-start justify-between gap-4 border-b border-gold/15 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-gold">{eyebrow}</p>
          <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">{title}</h2>
        </div>
        <div className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/25 bg-black/35 text-gold">
          <Icon size={25} strokeWidth={1.25} />
        </div>
      </div>
      {children}
    </section>
  );
}

function Controls({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 grid gap-3 md:grid-cols-[1fr_16rem]">{children}</div>;
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={17} />
      <input className="w-full rounded border border-gold/20 bg-black/55 py-3 pl-10 pr-3 text-parchment" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectBox({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select className="w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function SystemNote() {
  return <p className="mt-5 rounded border border-gold/15 bg-black/25 p-4 text-sm leading-6 text-limestone">System label: these tables present a compact Hermetic / Golden Dawn-style correspondence layer for study. Other Jewish, Christian, magical, tarot, and modern esoteric systems may arrange correspondences differently.</p>;
}

function nextDate(month: number, day: number, now: Date) {
  const candidate = new Date(now.getFullYear(), month - 1, day);
  if (candidate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    candidate.setFullYear(now.getFullYear() + 1);
  }
  return candidate;
}

function formatMonthDay(month: number, day: number) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(2026, month - 1, day));
}
