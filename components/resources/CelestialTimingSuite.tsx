"use client";

import { CalendarPlus, Copy, Moon, Orbit, Shield, Sparkles, Star, Sun, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateSolarTimes, formatClock, parseClock, planets, type PlanetName } from "./calculations";
import {
  activeZodiacalHour,
  approximateMoonLongitude,
  approximateSolarLongitude,
  decanForLongitude,
  electionCandidates,
  starContacts,
  lunarMansion,
  moonPhase,
  planetaryDay,
  zodiacalHourCycle,
  zodiacPosition,
  type ElectionFocus,
  type ZodiacSign
} from "./celestial-calculations";
import { LocationPicker } from "./LocationPicker";
import { formattedUtcOffset, manualOffsetFromPreference, timeZoneOptionsForSelection, timeZoneSelectionFromPreference, timezoneOffsetFor } from "./time-zones";
import { readPreferences } from "@/components/personalization/preferences";

type InstrumentTab = "overview" | "planetary-day" | "moon-phase" | "lunar-mansion" | "decan" | "zodiacal-hour" | "election-planner" | "fixed-stars";
type ZodiacSignInfo = { name: ZodiacSign; glyph: string; element: string; mode: string };
const zodiacNames: ZodiacSign[] = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const planetaryCorrespondences: Record<PlanetName, {
  nature: string[];
  contrast: string;
  esoteric: string;
  manifestations: string[];
  kabbalah: { sphere: string; governs: string[]; note: string };
  alchemy: { metal: string; note: string; qualities: string[] };
  colors: string[];
  scents: string[];
  spiritualPractice: string[];
  questions: string[];
  intelligence: string;
  spirit: string;
}> = {
  Saturn: {
    nature: ["Boundary", "Time", "Discipline", "Endurance", "Memory", "Structure", "Silence", "Concentration"],
    contrast: "If Jupiter expands, Saturn gives form, consequence, and durable limits.",
    esoteric: "Saturn represents the principle that gives things weight, duration, and initiatory seriousness.",
    manifestations: ["plans to become commitments", "wisdom to ripen through time", "energy to become discipline", "vision to meet responsibility"],
    kabbalah: { sphere: "Binah", governs: ["understanding", "form", "limitation", "contemplation", "ancestral memory"], note: "Binah is often approached as the great matrix of form and mature comprehension." },
    alchemy: { metal: "Lead", note: "Lead's density and gravity made it a traditional Saturnian emblem.", qualities: ["patience", "contraction", "protection", "endurance"] },
    colors: ["Black", "Deep Indigo", "Lead Grey", "Bone White"],
    scents: ["Myrrh", "Cypress", "Patchouli", "Vetiver"],
    spiritualPractice: ["solitude", "ancestral reflection", "long-term vows", "protective boundaries", "study of limits"],
    questions: ["What needs structure?", "What must be completed?", "Where is patience the real work?"],
    intelligence: "Agiel",
    spirit: "Zazel"
  },
  Jupiter: {
    nature: ["Expansion", "Mercy", "Wisdom", "Prosperity", "Counsel", "Law", "Blessing", "Generosity"],
    contrast: "If Saturn binds and tests, Jupiter opens the field and gives increase.",
    esoteric: "Jupiter represents ordered abundance, wise counsel, and the principle of benevolent growth.",
    manifestations: ["knowledge to become teaching", "resources to become generosity", "law to become justice", "authority to become stewardship"],
    kabbalah: { sphere: "Chesed", governs: ["mercy", "order", "benevolence", "magnanimity", "spiritual authority"], note: "Chesed is the sphere of expansive order, kindness, and rightful governance." },
    alchemy: { metal: "Tin", note: "Tin was traditionally linked with Jupiter's bright, expansive, and tempering qualities.", qualities: ["growth", "temperance", "blessing", "stability"] },
    colors: ["Royal Blue", "Purple", "Gold", "Sky Blue"],
    scents: ["Cedar", "Sage", "Nutmeg", "Frankincense"],
    spiritualPractice: ["gratitude", "charitable action", "teaching", "counsel", "blessing work"],
    questions: ["Where can generosity increase?", "What deserves wise protection?", "What growth is actually beneficial?"],
    intelligence: "Iophiel",
    spirit: "Hismael"
  },
  Mars: {
    nature: ["Force", "Courage", "Heat", "Defense", "Separation", "Will", "Conflict", "Vital Action"],
    contrast: "If Venus reconciles and unites, Mars separates, asserts, and cuts through.",
    esoteric: "Mars represents directed force: the power to protect, purify, sever, and act decisively.",
    manifestations: ["confusion to become decision", "fear to become courage", "stagnation to become movement", "boundaries to become defended"],
    kabbalah: { sphere: "Gevurah", governs: ["severity", "strength", "judgment", "discipline", "purifying fire"], note: "Gevurah is the sphere of force, restraint, and necessary severity." },
    alchemy: { metal: "Iron", note: "Iron's hardness and martial use made it the classic metal of Mars.", qualities: ["heat", "cutting", "defense", "activation"] },
    colors: ["Red", "Scarlet", "Iron Grey", "Blackened Red"],
    scents: ["Dragon's Blood", "Tobacco", "Pepper", "Ginger"],
    spiritualPractice: ["courage work", "protection", "exercise", "severing unhealthy ties", "purification by fire"],
    questions: ["What must be defended?", "What needs decisive action?", "Where is anger asking to become clarity?"],
    intelligence: "Graphiel",
    spirit: "Bartzabel"
  },
  Sun: {
    nature: ["Vitality", "Clarity", "Authority", "Health", "Illumination", "Honor", "Purpose", "Visibility"],
    contrast: "If the Moon reflects and changes, the Sun centers, clarifies, and radiates.",
    esoteric: "The Sun represents the integrating center: the power by which life, meaning, and purpose become visible.",
    manifestations: ["ideas to become purpose", "health to become radiance", "leadership to become service", "truth to become illumination"],
    kabbalah: { sphere: "Tiphereth", governs: ["beauty", "harmony", "sacrifice", "solar consciousness", "the heart"], note: "Tiphereth is the solar center where balance, beauty, and spiritual identity converge." },
    alchemy: { metal: "Gold", note: "Gold's incorruptibility and luminosity made it the central solar metal.", qualities: ["perfection", "clarity", "vitality", "nobility"] },
    colors: ["Gold", "Yellow", "White", "Amber"],
    scents: ["Frankincense", "Cinnamon", "Bay", "Saffron"],
    spiritualPractice: ["consecration", "health practices", "public work", "clarity rituals", "heart-centered prayer"],
    questions: ["What is asking to be illuminated?", "Where is my center?", "What would dignified action look like?"],
    intelligence: "Nakhiel",
    spirit: "Sorath"
  },
  Venus: {
    nature: ["Attraction", "Harmony", "Beauty", "Love", "Relationship", "Art", "Music", "Pleasure", "Fertility", "Friendship", "Diplomacy", "Union", "Affection", "Refinement"],
    contrast: "If Mars separates and asserts, Venus reconciles and unites.",
    esoteric: "Venus governs the force that draws things into relationship. It is not merely romantic love, but the power by which the soul recognizes meaning in form.",
    manifestations: ["notes to become music", "colors to become beauty", "individuals to become communities", "opposites to seek balance", "the soul to recognize meaning in form"],
    kabbalah: { sphere: "Netzach", governs: ["beauty", "desire", "inspiration", "emotion", "imagination", "artistic creation"], note: "Netzach is often understood as the realm where ideals become attractive and compelling." },
    alchemy: { metal: "Copper", note: "Copper's beauty, conductivity, and warm color were seen as manifestations of Venusian qualities.", qualities: ["receptivity", "harmony", "attraction", "generation"] },
    colors: ["Emerald Green", "Rose Pink", "Soft Blue-Green", "Copper-Gold"],
    scents: ["Rose", "Jasmine", "Sandalwood", "Vanilla", "Myrtle", "Apple Blossom"],
    spiritualPractice: ["gratitude", "appreciation", "beauty", "generosity", "receptivity"],
    questions: ["What in my life seeks harmony?", "What seeks reconciliation?", "What seeks beauty and right relationship?"],
    intelligence: "Hagiel",
    spirit: "Kedemel"
  },
  Mercury: {
    nature: ["Communication", "Writing", "Study", "Commerce", "Interpretation", "Travel", "Cleverness", "Divination"],
    contrast: "If Jupiter teaches from established wisdom, Mercury moves between systems, names, and messages.",
    esoteric: "Mercury represents mediation, translation, and the intelligence that connects unlike things through language and symbol.",
    manifestations: ["thought to become speech", "symbols to become meaning", "exchange to become commerce", "questions to become inquiry"],
    kabbalah: { sphere: "Hod", governs: ["language", "analysis", "ritual form", "intellect", "symbolic precision"], note: "Hod gives names, forms, correspondences, and articulate pattern to experience." },
    alchemy: { metal: "Mercury or Quicksilver", note: "Quicksilver's mobility and volatility made it the alchemical emblem of Mercury.", qualities: ["adaptability", "mediation", "volatility", "transmission"] },
    colors: ["Yellow", "Orange", "Iridescent Grey", "Violet"],
    scents: ["Mastic", "Lavender", "Storax", "Anise"],
    spiritualPractice: ["writing", "study", "language practice", "divination", "negotiation"],
    questions: ["What needs to be named?", "What message is trying to move?", "Where can clearer language create order?"],
    intelligence: "Tiriel",
    spirit: "Taphthartharath"
  },
  Moon: {
    nature: ["Receptivity", "Dream", "Memory", "Change", "Tides", "Imagination", "Embodiment", "Reflection"],
    contrast: "If the Sun radiates from the center, the Moon receives, mirrors, and distributes light through change.",
    esoteric: "The Moon represents the subtle vessel of images, moods, dreams, and embodied cycles.",
    manifestations: ["experience to become memory", "dreams to become images", "water to become tide", "ritual to become habit"],
    kabbalah: { sphere: "Yesod", governs: ["foundation", "dream", "image", "subtle body", "astral pattern"], note: "Yesod is the imaginal foundation where patterns gather before they take form." },
    alchemy: { metal: "Silver", note: "Silver's reflective luminosity made it the traditional lunar metal.", qualities: ["reflection", "purity", "receptivity", "fluidity"] },
    colors: ["Silver", "White", "Pearl", "Pale Blue"],
    scents: ["Jasmine", "Camphor", "Lotus", "Willow"],
    spiritualPractice: ["dreamwork", "cleansing", "memory work", "devotion", "household rites"],
    questions: ["What is changing?", "What does the dream reveal?", "What needs gentle tending?"],
    intelligence: "Malcha betharsithim hed beruah schehakim",
    spirit: "Chasmodai"
  }
};

function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

function timeInput() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function dateTimeFromInputs(date: string, time: string) {
  return new Date(`${date}T${time || "12:00"}`);
}

function formatDateTime(date: Date) {
  return date.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function calendarHref(title: string, date: string, time: string) {
  const start = dateTimeFromInputs(date, time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(start)}/${stamp(end)}`;
}

export function CelestialTimingSuite({ initialTab = "overview" }: { initialTab?: InstrumentTab }) {
  const [date, setDate] = useState(todayInput);
  const [time, setTime] = useState(timeInput);
  const [locationName, setLocationName] = useState(() => readPreferences().instrumentLocationName || "Denver, CO");
  const [latitude, setLatitude] = useState(() => readPreferences().instrumentLatitude || "39.7392");
  const [longitude, setLongitude] = useState(() => readPreferences().instrumentLongitude || "-104.9903");
  const [timeZone, setTimeZone] = useState(() => timeZoneSelectionFromPreference(readPreferences().instrumentTimeZone));
  const [manualTimezoneOffset, setManualTimezoneOffset] = useState(() => manualOffsetFromPreference(readPreferences().instrumentTimeZone));
  const [focus, setFocus] = useState<ElectionFocus>("Study");
  const [tab, setTab] = useState<InstrumentTab>(initialTab);
  const [notice, setNotice] = useState("");

  const selectedDate = useMemo(() => dateTimeFromInputs(date, time), [date, time]);
  const timezoneOffset = timeZone === "manual" ? manualTimezoneOffset : String(timezoneOffsetFor(selectedDate, timeZone));
  const selectableTimeZones = timeZoneOptionsForSelection(timeZone);
  const ruler = planetaryDay(selectedDate);
  const phase = moonPhase(selectedDate);
  const mansion = lunarMansion(selectedDate);
  const sunPosition = zodiacPosition(approximateSolarLongitude(selectedDate));
  const moonPosition = zodiacPosition(approximateMoonLongitude(selectedDate));
  const solarDecan = decanForLongitude(approximateSolarLongitude(selectedDate));
  const moonDecan = decanForLongitude(approximateMoonLongitude(selectedDate));
  const zodiacalHours = zodiacalHourCycle(selectedDate, Number(latitude), Number(longitude), Number(timezoneOffset));
  const activeZodiacal = activeZodiacalHour(zodiacalHours, parseClock(time));
  const elections = electionCandidates(selectedDate, focus);
  const stars = starContacts(selectedDate);
  const solar = calculateSolarTimes(selectedDate, Number(latitude), Number(longitude), Number(timezoneOffset));

  async function copySummary() {
    const text = [
      `Celestial timing for ${date} ${time}`,
      `Planetary day: ${ruler}`,
      `Moon phase: ${phase.name}, ${Math.round(phase.illumination * 100)}% illuminated`,
      `Lunar mansion: ${mansion.index}. ${mansion.name}`,
      `Sun: ${sunPosition.display}`,
      `Moon: ${moonPosition.display}`,
      `Zodiacal hour: ${activeZodiacal.sign.name}`,
      `Closest fixed star contact: ${stars[0].name} by ${stars[0].closest}`
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setNotice("Celestial timing summary copied.");
  }

  function saveSummary() {
    setNotice("Saved celestial timing records are coming soon with sign up and login.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[23rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Celestial timing controls</p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-parchment">
            Date
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Time
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </label>
          <div className="grid gap-2">
            {([
              ["overview", "Overview"],
              ["planetary-day", "Planetary Day"],
              ["moon-phase", "Moon Phase"],
              ["lunar-mansion", "Lunar Mansion"],
              ["decan", "Decan"],
              ["zodiacal-hour", "Zodiacal Hour"],
              ["election-planner", "Election Planner"],
              ["fixed-stars", "Fixed Stars"]
            ] as Array<[InstrumentTab, string]>).map(([value, label]) => (
              <button key={value} className={`rounded border px-3 py-2 text-left text-sm uppercase tracking-[.14em] ${tab === value ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-gold hover:bg-gold/10"}`} type="button" onClick={() => setTab(value)}>
                {label}
              </button>
            ))}
          </div>
          <details className="rounded border border-gold/15 bg-black/20 p-3">
            <summary className="cursor-pointer text-sm uppercase tracking-[.16em] text-gold">Location and time zone</summary>
            <div className="mt-4 grid gap-4">
              <LocationPicker
                latitude={latitude}
                longitude={longitude}
                locationName={locationName}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setLocationName={setLocationName}
                setTimeZone={setTimeZone}
                setManualTimezoneOffset={setManualTimezoneOffset}
                setNotice={setNotice}
              />
              <label className="grid gap-2 text-sm text-parchment">
                Time zone
                <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={timeZone} onChange={(event) => setTimeZone(event.target.value)}>
                  {selectableTimeZones.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              {timeZone === "manual" ? (
                <label className="grid gap-2 text-sm text-parchment">
                  Manual UTC offset
                  <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="number" step="0.5" value={manualTimezoneOffset} onChange={(event) => setManualTimezoneOffset(event.target.value)} />
                </label>
              ) : (
                <p className="rounded border border-gold/15 bg-black/25 px-3 py-2 text-xs uppercase tracking-[.14em] text-limestone">
                  Calculated offset: {formattedUtcOffset(Number(timezoneOffset))}
                </p>
              )}
            </div>
          </details>
          {tab === "election-planner" ? (
            <label className="grid gap-2 text-sm text-parchment">
              Election focus
              <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={focus} onChange={(event) => setFocus(event.target.value as ElectionFocus)}>
                {(["Study", "Prosperity", "Protection", "Devotion", "Creative Work", "Ritual Action"] as ElectionFocus[]).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={copySummary}>
              <Copy className="mr-2 inline" size={15} />Copy
            </button>
            <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={saveSummary}>
              <Sparkles className="mr-2 inline" size={15} />Save Soon
            </button>
          </div>
          <a className="rounded border border-gold/20 px-3 py-2 text-center text-sm text-parchment hover:border-gold/45 hover:text-ivory" href={calendarHref("Celestial timing note", date, time)} target="_blank" rel="noreferrer">
            <CalendarPlus className="mr-2 inline" size={15} />Add note to calendar
          </a>
          {notice ? <p className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-sm text-parchment">{notice}</p> : null}
        </div>
      </aside>

      <section className="grid gap-6">
        <CelestialOverview
          visible={tab === "overview"}
          ruler={ruler}
          phase={phase}
          mansion={mansion}
          sunSign={sunPosition.sign}
          moonSign={moonPosition.sign}
          zodiacalSign={activeZodiacal.sign}
          closestStar={stars[0].name}
          dateLabel={`${date} · ${formatClock(selectedDate.getHours() * 60 + selectedDate.getMinutes(), "12")} / ${formatClock(selectedDate.getHours() * 60 + selectedDate.getMinutes(), "24")}`}
        />
        {tab === "planetary-day" ? <PlanetaryDayPanel ruler={ruler} selectedDate={selectedDate} /> : null}
        {tab === "moon-phase" ? <MoonPhasePanel phase={phase} moonSign={moonPosition.sign} /> : null}
        {tab === "lunar-mansion" ? <LunarMansionPanel mansion={mansion} /> : null}
        {tab === "decan" ? <DecanPanel solarDecan={solarDecan} moonDecan={moonDecan} /> : null}
        {tab === "zodiacal-hour" ? <ZodiacalHourPanel hours={zodiacalHours} active={activeZodiacal} sunrise={solar.sunrise} /> : null}
        {tab === "election-planner" ? <ElectionPlannerPanel focus={focus} candidates={elections} /> : null}
        {tab === "fixed-stars" ? <FixedStarsPanel stars={stars} /> : null}
      </section>
    </div>
  );
}

function CelestialOverview({
  visible,
  ruler,
  phase,
  mansion,
  sunSign,
  moonSign,
  zodiacalSign,
  closestStar,
  dateLabel
}: {
  visible: boolean;
  ruler: PlanetName;
  phase: ReturnType<typeof moonPhase>;
  mansion: ReturnType<typeof lunarMansion>;
  sunSign: ZodiacSignInfo;
  moonSign: ZodiacSignInfo;
  zodiacalSign: ZodiacSignInfo;
  closestStar: string;
  dateLabel: string;
}) {
  if (!visible) return null;
  return (
    <div className="grid gap-5">
      <div className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_30%,rgba(181,146,85,.22),transparent_18rem),linear-gradient(135deg,rgba(122,17,26,.18),transparent_48%,rgba(181,146,85,.12))]" />
        <p className="text-xs uppercase tracking-[.26em] text-gold">Celestial timing instrument</p>
        <h2 className="font-manuscript-title mt-3 font-display text-5xl text-ivory">Daily celestial snapshot</h2>
        <p className="mt-3 text-parchment">{dateLabel}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <TimingStat icon={Orbit} label="Planetary day" value={ruler} detail={planets[ruler].quality} glyph={planets[ruler].glyph} />
          <TimingStat icon={Moon} label="Moon phase" value={phase.name} detail={`${Math.round(phase.illumination * 100)}% illuminated`} glyph="☾" />
          <TimingStat icon={Star} label="Lunar mansion" value={`${mansion.index}. ${mansion.name}`} detail={mansion.position.display} glyph="✦" />
          <TimingStat icon={Sun} label="Solar / lunar signs" value={sunSign.name} detail={`Moon: ${moonSign.name}`} glyph="☉" />
          <TimingStat icon={Timer} label="Zodiacal hour" value={zodiacalSign.name} detail={`${zodiacalSign.element} · ${zodiacalSign.mode}`} glyph={zodiacalSign.glyph} />
          <TimingStat icon={Shield} label="Fixed-star proximity" value={closestStar} detail="Closest Sun or Moon contact from the reference set." glyph="✶" />
        </div>
      </div>
      <p className="rounded border border-gold/15 bg-black/25 p-4 text-sm leading-7 text-parchment">
        These instruments use compact traditional approximations for study and planning. They are not a substitute for high-precision ephemerides when exact astronomical timing is required.
      </p>
    </div>
  );
}

function TimingStat({ icon: Icon, label, value, detail, glyph }: { icon: typeof Orbit; label: string; value: string; detail: string; glyph: string }) {
  return (
    <article className="rounded border border-gold/15 bg-black/35 p-4">
      <div className="flex items-start justify-between gap-3">
        <Icon className="text-gold" size={22} strokeWidth={1.25} />
        <AstrologicalGlyph glyph={glyph} size="sm" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <h3 className="mt-2 font-display text-2xl leading-tight text-ivory">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-parchment">{detail}</p>
    </article>
  );
}

function PlanetaryDayPanel({ ruler, selectedDate }: { ruler: PlanetName; selectedDate: Date }) {
  const planet = planets[ruler];
  const correspondence = planetaryCorrespondences[ruler];
  return (
    <InstrumentPanel eyebrow="Planetary day" title={`Day of ${ruler}`} glyph={planet.glyph} color={planet.color}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,.92fr)_minmax(20rem,1.08fr)]">
        <div className="grid gap-4 content-start">
          <p>The traditional day ruler for {selectedDate.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })} is {ruler}.</p>
          <p>{planet.quality}</p>
          <TagList items={planet.activities} />
          <p className="rounded border border-gold/15 bg-black/25 p-4 text-sm leading-7 text-parchment/85">
            {correspondence.contrast}
          </p>
          <p className="text-sm text-parchment/80">Use this alongside planetary hours when planning traditional symbolic timing.</p>
        </div>

        <div className="grid gap-4">
          <article className="rounded border border-gold/15 bg-black/30 p-4">
            <h3 className="font-display text-2xl text-ivory">Essential Nature of {ruler}</h3>
            <TagList items={correspondence.nature} />
          </article>

          <article className="rounded border border-gold/15 bg-black/30 p-4">
            <h3 className="font-display text-2xl text-ivory">Esoteric Meaning</h3>
            <p className="mt-3 leading-7">{correspondence.esoteric}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-parchment">
              {correspondence.manifestations.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <CorrespondenceCard title="In Kabbalah" eyebrow={correspondence.kabbalah.sphere} items={correspondence.kabbalah.governs} note={correspondence.kabbalah.note} />
            <CorrespondenceCard title="Alchemical Correspondence" eyebrow={correspondence.alchemy.metal} items={correspondence.alchemy.qualities} note={correspondence.alchemy.note} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <CorrespondenceCard title="Traditional Colors" items={correspondence.colors} />
            <CorrespondenceCard title="Traditional Scents" items={correspondence.scents} />
          </div>

          <article className="rounded border border-gold/15 bg-black/30 p-4">
            <h3 className="font-display text-2xl text-ivory">Activities Favored on {selectedDate.toLocaleDateString([], { weekday: "long" })}</h3>
            <TagList items={correspondence.spiritualPractice} />
          </article>

          <article className="rounded border border-gold/15 bg-black/30 p-4">
            <h3 className="font-display text-2xl text-ivory">Spiritual Interpretation</h3>
            <div className="mt-3 grid gap-2">
              {correspondence.questions.map((question) => (
                <p key={question} className="rounded border border-gold/10 bg-black/25 px-3 py-2 text-sm italic text-parchment">{question}</p>
              ))}
            </div>
          </article>

          <article className="rounded border border-gold/15 bg-black/30 p-4">
            <h3 className="font-display text-2xl text-ivory">Planetary Intelligence</h3>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[.18em] text-gold">Intelligence</dt>
                <dd className="mt-1 text-ivory">{correspondence.intelligence}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[.18em] text-gold">Spirit</dt>
                <dd className="mt-1 text-ivory">{correspondence.spirit}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-5 text-limestone">Presented as traditional Renaissance magical correspondence, not as scientific causation.</p>
          </article>
        </div>
      </div>
    </InstrumentPanel>
  );
}

function MoonPhasePanel({ phase, moonSign }: { phase: ReturnType<typeof moonPhase>; moonSign: ZodiacSignInfo }) {
  return (
    <InstrumentPanel eyebrow="Moon phase" title={phase.name} glyph="☾" color="#c9d2db">
      <div className="h-3 overflow-hidden rounded-full border border-gold/20 bg-black">
        <div className="h-full bg-gold" style={{ width: `${phase.illumination * 100}%` }} />
      </div>
      <p>The Moon is approximately {phase.age.toFixed(1)} days into the lunation and {Math.round(phase.illumination * 100)}% illuminated.</p>
      <p className="flex items-center gap-2">Approximate lunar sign: <AstrologicalGlyph glyph={moonSign.glyph} size="xs" /> {moonSign.name}.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <p><span className="block text-xs uppercase tracking-[.18em] text-gold">Next full moon</span>{formatDateTime(phase.nextFullMoon)}</p>
        <p><span className="block text-xs uppercase tracking-[.18em] text-gold">Next new moon</span>{formatDateTime(phase.nextNewMoon)}</p>
      </div>
    </InstrumentPanel>
  );
}

function LunarMansionPanel({ mansion }: { mansion: ReturnType<typeof lunarMansion> }) {
  return (
    <InstrumentPanel eyebrow="Lunar mansion" title={`${mansion.index}. ${mansion.name}`} glyph="✦" color="#d6ad5d">
      <p>The Moon is placed in the {mansion.name} mansion by an approximate 28-mansion division of the ecliptic.</p>
      <p>Approximate zodiacal position: {mansion.position.display}.</p>
      <div className="h-3 overflow-hidden rounded-full border border-gold/20 bg-black">
        <div className="h-full bg-gold" style={{ width: `${mansion.progress * 100}%` }} />
      </div>
      <p className="text-sm text-parchment/80">Mansion correspondences differ by source tradition, so this first version identifies placement and progression before adding a fuller interpretive library.</p>
    </InstrumentPanel>
  );
}

function DecanPanel({ solarDecan, moonDecan }: { solarDecan: ReturnType<typeof decanForLongitude>; moonDecan: ReturnType<typeof decanForLongitude> }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <DecanCard title="Solar decan" decan={solarDecan} />
      <DecanCard title="Lunar decan" decan={moonDecan} />
    </div>
  );
}

function DecanCard({ title, decan }: { title: string; decan: ReturnType<typeof decanForLongitude> }) {
  const planet = planets[decan.ruler];
  return (
    <InstrumentPanel eyebrow={title} title={`${decan.sign.name} Decan ${decan.decanWithinSign}`} glyph={decan.sign.glyph} color={planet.color}>
      <p>Range: {decan.range}</p>
      <p>Approximate position: {decan.position.display}</p>
      <p>Traditional decan ruler: {planet.glyph} {decan.ruler}</p>
      <TagList items={planet.activities.slice(0, 4)} />
    </InstrumentPanel>
  );
}

function ZodiacalHourPanel({ hours, active, sunrise }: { hours: ReturnType<typeof zodiacalHourCycle>; active: ReturnType<typeof activeZodiacalHour>; sunrise: number }) {
  return (
    <InstrumentPanel eyebrow="Zodiacal hour" title={`${active.sign.name} hour`} glyph={active.sign.glyph} color="#b59255">
      <p>
        This first model divides sunrise to the next sunrise into twelve zodiacal periods, beginning with the Sun’s approximate zodiacal sign for the selected date.
      </p>
      <p><span className="text-gold">Cycle begins:</span> {formatClock(sunrise, "12")} / {formatClock(sunrise, "24")}</p>
      <div className="grid gap-2">
        {hours.map((hour) => (
          <div key={hour.index} className={`grid gap-2 rounded border p-3 sm:grid-cols-[4rem_1fr_10rem] ${hour.index === active.index ? "border-gold bg-gold/10" : "border-gold/15 bg-black/25"}`}>
            <span className="text-xs uppercase tracking-[.16em] text-gold">{String(hour.index).padStart(2, "0")}</span>
            <span className="flex items-center gap-3 font-display text-xl text-ivory"><AstrologicalGlyph glyph={hour.sign.glyph} /> {hour.sign.name}</span>
            <span className="text-sm text-parchment">{formatClock(hour.start, "12")} / {formatClock(hour.start, "24")}</span>
          </div>
        ))}
      </div>
    </InstrumentPanel>
  );
}

function ElectionPlannerPanel({ focus, candidates }: { focus: ElectionFocus; candidates: ReturnType<typeof electionCandidates> }) {
  return (
    <InstrumentPanel eyebrow="Election planner" title={`${focus} windows`} glyph="✧" color="#d6ad5d">
      <p>
        This compares the next ten days using planetary day, lunar phase, lunar mansion progression, and lunar sign as a starter electional triage.
      </p>
      <div className="grid gap-3">
        {candidates.slice(0, 5).map((candidate) => (
          <article key={candidate.date.toISOString()} className="rounded border border-gold/15 bg-black/30 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.16em] text-gold">{candidate.date.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}</p>
                <h3 className="mt-1 font-display text-2xl text-ivory">Day of {candidate.ruler}</h3>
              </div>
              <span className="rounded border border-gold/25 px-3 py-1 text-xs uppercase tracking-[.16em] text-gold">Score {candidate.score}/5</span>
            </div>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-parchment md:grid-cols-2">
              <p>{planets[candidate.ruler].glyph} {candidate.reason}</p>
              <p className="flex items-center gap-2">Moon: {candidate.phase.name}, <AstrologicalGlyph glyph={candidate.moonSign.glyph} size="xs" /> {candidate.moonSign.name}</p>
              <p>Mansion: {candidate.mansion.index}. {candidate.mansion.name}</p>
              <p>Pair with a planetary hour for a more exact election.</p>
            </div>
          </article>
        ))}
      </div>
    </InstrumentPanel>
  );
}

function FixedStarsPanel({ stars }: { stars: ReturnType<typeof starContacts> }) {
  return (
    <InstrumentPanel eyebrow="Fixed-star reference" title="Sun and Moon contacts" glyph="✶" color="#c9d2db">
      <p>
        This panel compares the Sun and Moon to a compact fixed-star reference set by zodiacal longitude. It is a study aid, not a full rising/setting engine yet.
      </p>
      <div className="grid gap-3">
        {stars.map((star) => (
          <article key={star.name} className="rounded border border-gold/15 bg-black/30 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.16em] text-gold">{star.constellation}</p>
                <h3 className="mt-1 font-display text-2xl text-ivory">{star.name}</h3>
              </div>
              <span className="rounded border border-gold/25 px-3 py-1 text-xs uppercase tracking-[.16em] text-gold">{star.distance.toFixed(1)}° from {star.closest}</span>
            </div>
            <p className="mt-2 text-sm text-parchment">{star.position.display}</p>
            <p className="mt-3 text-sm leading-6 text-parchment">{star.nature}</p>
          </article>
        ))}
      </div>
    </InstrumentPanel>
  );
}

function InstrumentPanel({ eyebrow, title, glyph, color, children }: { eyebrow: string; title: string; glyph: string; color: string; children: React.ReactNode }) {
  return (
    <article className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
      <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 80% 22%, ${color}44, transparent 18rem), linear-gradient(135deg, rgba(8,8,8,.92), rgba(122,17,26,.13))` }} />
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-gold">{eyebrow}</p>
          <h2 className="font-manuscript-title mt-3 font-display text-5xl leading-none text-ivory">{title}</h2>
        </div>
        <span className="grid size-20 place-items-center rounded-full border border-gold/30 bg-black/40 font-display text-5xl" style={{ color }}>
          {isZodiacGlyph(glyph) ? <AstrologicalGlyph glyph={glyph} size="lg" /> : glyph}
        </span>
      </div>
      <div className="mt-6 grid gap-4 text-parchment">{children}</div>
    </article>
  );
}

function isZodiacGlyph(glyph: string) {
  return zodiacNames.some((_, index) => glyph === ["♈︎", "♉︎", "♊︎", "♋︎", "♌︎", "♍︎", "♎︎", "♏︎", "♐︎", "♑︎", "♒︎", "♓︎"][index]);
}

function AstrologicalGlyph({ glyph, size = "md" }: { glyph: string; size?: "xs" | "sm" | "md" | "lg" }) {
  const sizeClass = {
    xs: "text-2xl",
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl"
  }[size];

  if (!isZodiacGlyph(glyph)) {
    return <span className={`font-serif leading-none text-gold ${sizeClass}`}>{glyph}</span>;
  }

  return (
    <span
      className={`inline-grid size-[1.35em] place-items-center rounded-full border border-gold/35 bg-[radial-gradient(circle,rgba(181,146,85,.24),rgba(0,0,0,.18)_58%,transparent_70%)] font-serif leading-none text-gold shadow-[0_0_18px_rgba(181,146,85,.34)] ${sizeClass}`}
      style={{
        textShadow: "0 1px 0 rgba(255,255,255,.28), 0 0 10px rgba(181,146,85,.9), 0 0 24px rgba(122,17,26,.45)"
      }}
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
}

function CorrespondenceCard({ title, eyebrow, items, note }: { title: string; eyebrow?: string; items: string[]; note?: string }) {
  return (
    <article className="rounded border border-gold/15 bg-black/30 p-4">
      {eyebrow ? <p className="text-xs uppercase tracking-[.18em] text-gold">{eyebrow}</p> : null}
      <h3 className="font-display text-2xl text-ivory">{title}</h3>
      {note ? <p className="mt-3 text-sm leading-6 text-parchment">{note}</p> : null}
      <div className="mt-3">
        <TagList items={items} />
      </div>
    </article>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{item}</span>
      ))}
    </div>
  );
}
