"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  minutesUntilPeriodEnd,
  nextPeriod,
  organClockFaqs,
  organClockFrameworks,
  organClockPeriods,
  organClockSources,
  organPhaseLabels,
  periodById,
  periodForMinute,
  previousPeriod,
  type OrganClockPeriod,
  type OrganClockPeriodId,
} from "@/lib/data/organ-clock";
import { browserTimeZone, timeZoneOptionsForSelection } from "./time-zones";
import { instrumentNotesKey, prependSavedCalculation, prependToolHistory, readJson, type ResearchNote, writeJson } from "./instrument-storage";

const modes = ["live", "explore", "pair", "five-phase", "flow", "compare", "journal", "scholar", "textual"] as const;
const appearances = ["ink-parchment", "jade-bronze", "cinnabar-gold", "celestial-tao"] as const;
const timeFormats = ["12", "24"] as const;

const stateSchema = z.object({
  mode: z.enum(modes).catch("live"),
  period: z.enum(["gallbladder", "liver", "lung", "large-intestine", "stomach", "spleen", "heart", "small-intestine", "bladder", "kidney", "pericardium", "san-jiao"]).catch("lung"),
  compare: z.enum(["gallbladder", "liver", "lung", "large-intestine", "stomach", "spleen", "heart", "small-intestine", "bladder", "kidney", "pericardium", "san-jiao"]).catch("large-intestine"),
  phase: z.enum(["wood", "fire", "earth", "metal", "water"]).catch("metal"),
  time: z.string().catch(""),
  timezone: z.string().catch("local"),
  format: z.enum(timeFormats).catch("12"),
  appearance: z.enum(appearances).catch("jade-bronze")
});

type InstrumentState = z.infer<typeof stateSchema>;

const styles = {
  "ink-parchment": { label: "Ink and Parchment", shell: "from-[#1d1710] via-[#0b0a08] to-[#302418]", panel: "bg-[#17120d]/90", accent: "#c6a45d" },
  "jade-bronze": { label: "Jade and Bronze", shell: "from-[#071713] via-[#080808] to-[#2b2110]", panel: "bg-[#071713]/84", accent: "#b59255" },
  "cinnabar-gold": { label: "Cinnabar and Gold", shell: "from-[#220709] via-[#090706] to-[#23170c]", panel: "bg-[#150606]/88", accent: "#d0a85a" },
  "celestial-tao": { label: "Celestial Tao", shell: "from-[#07101d] via-[#070707] to-[#331013]", panel: "bg-[#08101b]/86", accent: "#d2b36b" }
};

function readInitialState() {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  const parsed = stateSchema.parse(Object.fromEntries(params.entries()));
  const appearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem("aetherica-organ-clock-appearance"));
  const timezone = window.localStorage.getItem("aetherica-organ-clock-timezone");
  return {
    ...parsed,
    timezone: timezone || parsed.timezone,
    appearance: appearance.success ? appearance.data : parsed.appearance
  };
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    mode: state.mode,
    period: state.period,
    compare: state.compare,
    phase: state.phase,
    time: state.time,
    timezone: state.timezone,
    format: state.format,
    appearance: state.appearance
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function minutesForDateInTimeZone(date: Date, timeZone: string) {
  if (timeZone === "local") return date.getHours() * 60 + date.getMinutes();
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? date.getHours());
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? date.getMinutes());
    return hour * 60 + minute;
  } catch {
    return date.getHours() * 60 + date.getMinutes();
  }
}

function minuteFromTimeInput(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatClockMinute(minute: number, format: "12" | "24") {
  const hour24 = Math.floor((minute % 1440) / 60);
  const mins = minute % 60;
  if (format === "24") return `${String(hour24).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(mins).padStart(2, "0")} ${suffix}`;
}

function formatRange(period: OrganClockPeriod, format: "12" | "24") {
  return `${formatClockMinute(period.startHour * 60, format)}–${formatClockMinute(period.endHour * 60, format)}`;
}

function formatRemaining(minutes: number) {
  const safe = Math.max(0, minutes);
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  if (!hours) return `${mins} min`;
  return `${hours} hr ${mins} min`;
}

export function OrganClockInstrument() {
  const [state, setState] = useState<InstrumentState>(() => readInitialState());
  const [now, setNow] = useState(() => new Date());
  const [flowing, setFlowing] = useState(false);
  const [journal, setJournal] = useState("");
  const [status, setStatus] = useState("");
  const style = styles[state.appearance];
  const manualMinute = minuteFromTimeInput(state.time);
  const activeMinute = manualMinute ?? minutesForDateInTimeZone(now, state.timezone === "local" ? browserTimeZone() : state.timezone);
  const currentPeriod = periodForMinute(activeMinute);
  const selectedPeriod = periodById(state.mode === "live" ? currentPeriod.id : state.period);
  const pairedPeriod = periodById(selectedPeriod.pairedPeriodId);
  const comparisonPeriod = periodById(state.compare);
  const previous = previousPeriod(selectedPeriod.id);
  const next = nextPeriod(selectedPeriod.id);
  const remaining = minutesUntilPeriodEnd(currentPeriod, activeMinute);
  const phasePeriods = useMemo(() => organClockPeriods.filter((period) => period.phaseId === state.phase), [state.phase]);

  useEffect(() => {
    prependToolHistory({ tool: "Taoist Organ Clock", detail: "Opened the organ-meridian clock" });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!flowing) return;
    const timer = window.setInterval(() => {
      setState((current) => ({ ...current, mode: "flow", period: nextPeriod(current.period).id }));
    }, 2600);
    return () => window.clearInterval(timer);
  }, [flowing]);

  useEffect(() => {
    updateUrl(state);
    window.localStorage.setItem("aetherica-organ-clock-appearance", state.appearance);
    window.localStorage.setItem("aetherica-organ-clock-timezone", state.timezone);
  }, [state]);

  function patch(nextState: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...nextState }));
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setStatus("Copied");
    window.setTimeout(() => setStatus(""), 1600);
  }

  function saveState() {
    prependSavedCalculation({
      kind: "Taoist Organ Clock",
      title: `${selectedPeriod.englishName} period`,
      detail: `${formatRange(selectedPeriod, state.format)} · ${organPhaseLabels[selectedPeriod.phaseId].name} · ${selectedPeriod.yinYang}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  function saveJournal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!journal.trim()) return;
    const notes = readJson<ResearchNote[]>(instrumentNotesKey, []);
    writeJson(instrumentNotesKey, [
      {
        id: crypto.randomUUID(),
        tool: "Taoist Organ Clock",
        note: `${selectedPeriod.englishName} period observation (${formatClockMinute(activeMinute, state.format)}): ${journal.trim()}`,
        savedAt: new Date().toISOString()
      },
      ...notes
    ].slice(0, 24));
    setJournal("");
    setStatus("Observation saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${style.shell} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / traditional Chinese medical theory</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">Taoist Organ Clock Instrument</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore the traditional twelve-period cycle of organ-meridian prominence across the day.
            </p>
            <p className="mt-4 max-w-4xl rounded border border-gold/20 bg-black/35 p-4 text-sm leading-7 text-limestone">
              This instrument is an educational and observational representation of traditional Chinese medical theory. It is not a medical diagnostic or treatment tool.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#clock" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">Open Clock <ArrowRight size={18} /></a>
              <Link href="/resources/taoist-cosmology" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">Cosmology Map <ArrowRight size={18} /></Link>
            </div>
          </div>
          <OrganClockWheel selectedId={currentPeriod.id} currentMinute={activeMinute} format={state.format} onSelect={(period) => patch({ mode: "explore", period, phase: periodById(period).phaseId })} preview />
        </div>
      </section>

      <section id="clock" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className={`rounded-lg border border-gold/30 ${style.panel} p-4 shadow-aureate md:p-6`}>
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" value={state.mode} options={modes} onChange={(mode) => patch({ mode })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setFlowing((value) => !value)}>{flowing ? <Pause size={16} /> : <Play size={16} />} Flow</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({ timezone: browserTimeZone() }))}><RotateCcw size={16} /> Reset</button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <OrganClockWheel selectedId={selectedPeriod.id} currentMinute={activeMinute} format={state.format} onSelect={(period) => patch({ mode: "explore", period, phase: periodById(period).phaseId })} />
            <Panel title={selectedPeriod.englishName} eyebrow={`${selectedPeriod.chineseName} · ${selectedPeriod.pinyin}`}>
              <p className="font-display text-2xl text-ivory">{formatRange(selectedPeriod, state.format)}</p>
              <Info label="Current local time" value={formatClockMinute(activeMinute, state.format)} />
              <Info label="Time remaining in current period" value={formatRemaining(remaining)} />
              <Info label="Five Phase" value={`${organPhaseLabels[selectedPeriod.phaseId].name}: ${organPhaseLabels[selectedPeriod.phaseId].note}`} />
              <Info label="Yin-yang category" value={titleCase(selectedPeriod.yinYang)} />
              <Info label="Paired system" value={pairedPeriod.englishName} />
              <Info label="Previous / Next" value={`${previous.englishName} / ${next.englishName}`} />
              {status ? <p className="mt-3 text-sm text-gold">{status}</p> : null}
            </Panel>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[.18em] text-gold">Manual time</span>
              <input className="mt-2 w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" type="time" value={state.time} onChange={(event) => patch({ time: event.target.value })} />
            </label>
            <SelectBlock label="Time zone" value={state.timezone} values={timeZoneOptionsForSelection(state.timezone).map((option) => option.value)} labels={Object.fromEntries(timeZoneOptionsForSelection(state.timezone).map((option) => [option.value, option.label]))} onChange={(timezone) => patch({ timezone })} />
            <SelectBlock label="Format" value={state.format} values={timeFormats} labels={{ "12": "12-hour", "24": "24-hour" }} onChange={(format) => patch({ format })} />
            <SelectBlock label="Appearance" value={state.appearance} values={appearances} onChange={(appearance) => patch({ appearance })} />
          </div>

          {state.mode === "pair" ? (
            <Panel title="Yin-Yang Pair" eyebrow="Framework-specific pairing">
              <div className="grid gap-4 md:grid-cols-2">
                <PeriodCard period={selectedPeriod} format={state.format} />
                <PeriodCard period={pairedPeriod} format={state.format} />
              </div>
            </Panel>
          ) : null}

          {state.mode === "five-phase" ? (
            <Panel title={`${organPhaseLabels[state.phase].name} Systems`} eyebrow="Five-Phase grouping">
              <div className="grid gap-3 md:grid-cols-2">
                {phasePeriods.map((period) => <PeriodCard key={period.id} period={period} format={state.format} />)}
              </div>
              <Link href={`/resources/five-phases?phase=${state.phase}`} className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-gold/30 px-3 py-2 text-sm text-gold hover:text-ivory">Open Wu Xing Instrument <ArrowRight size={15} /></Link>
            </Panel>
          ) : null}

          {state.mode === "compare" ? (
            <Panel title="Compare Periods" eyebrow="Shared and contrasting characteristics">
              <div className="grid gap-4 md:grid-cols-2">
                <PeriodCard period={selectedPeriod} format={state.format} />
                <div>
                  <SelectBlock label="Compare with" value={state.compare} values={organClockPeriods.map((period) => period.id)} onChange={(compare) => patch({ compare })} />
                  <PeriodCard period={comparisonPeriod} format={state.format} />
                </div>
              </div>
            </Panel>
          ) : null}

          {state.mode === "journal" ? (
            <Panel title="Observation Journal" eyebrow="Non-diagnostic reflection">
              <form onSubmit={saveJournal} className="grid gap-3">
                <p className="text-sm leading-6 text-limestone">Record observations without diagnosis. This tool will not infer deficiency, excess, or disease from your entries.</p>
                <textarea className="min-h-32 rounded border border-gold/20 bg-black/45 p-3 text-parchment" value={journal} onChange={(event) => setJournal(event.target.value)} placeholder="Energy, mood, dream, sleep/waking, digestion, or general observation..." />
                <button className="focus-ring rounded border border-gold/35 bg-gold/10 px-4 py-3 text-sm uppercase tracking-[.16em] text-ivory" type="submit">Save observation</button>
              </form>
            </Panel>
          ) : null}

          {state.mode === "scholar" || state.mode === "textual" || state.mode === "flow" ? (
            <Panel title={state.mode === "flow" ? "Meridian Flow Mode" : "Scholar and Textual View"} eyebrow="Traditional sequence of meridian prominence">
              <p className="text-sm leading-7 text-parchment">
                Selected period: {selectedPeriod.englishName}, {formatRange(selectedPeriod, state.format)}, {selectedPeriod.yinYang} {organPhaseLabels[selectedPeriod.phaseId].name}. Paired with {pairedPeriod.englishName}. This is a traditional body-clock model, not a biomedical diagnostic system.
              </p>
              <div className="mt-4 grid gap-2">
                {organClockFrameworks.map((framework) => (
                  <div key={framework.id} className="rounded border border-gold/15 bg-black/25 p-3">
                    <p className="font-display text-xl text-ivory">{framework.title}</p>
                    <p className="mt-1 text-sm leading-6 text-parchment">{framework.summary}</p>
                    <p className="mt-2 text-xs leading-5 text-limestone">{framework.caution}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}
        </div>

        <aside className="grid gap-4 content-start">
          <Panel title="Medical Safety" eyebrow="Visible disclaimer">
            <p className="text-sm leading-7 text-parchment">Traditional Chinese medical organ-meridian systems are broader functional categories and do not map directly onto modern anatomical organs. This page does not diagnose or recommend treatment.</p>
          </Panel>
          <Panel title="Sources and Methodology" eyebrow="Review visible">
            <div className="grid gap-3">
              {organClockSources.map((source) => (
                <div key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                  <p className="text-xs uppercase tracking-[.16em] text-gold">{source.type}</p>
                  <p className="mt-1 font-display text-xl text-ivory">{source.title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone">{source.note}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="FAQ" eyebrow="Important limits">
            <div className="grid gap-3">
              {organClockFaqs.map((faq) => (
                <div key={faq.question} className="border-b border-gold/10 pb-3">
                  <p className="font-display text-lg text-ivory">{faq.question}</p>
                  <p className="mt-1 text-sm leading-6 text-parchment">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function OrganClockWheel({ selectedId, currentMinute, format, onSelect, preview = false }: { selectedId: OrganClockPeriodId; currentMinute: number; format: "12" | "24"; onSelect: (period: OrganClockPeriodId) => void; preview?: boolean }) {
  const handAngle = (currentMinute / 1440) * 360 - 90;
  return (
    <div className={`relative mx-auto aspect-square w-full ${preview ? "max-w-sm" : "max-w-[36rem]"} rounded-full border border-gold/25 bg-black/35 shadow-[inset_0_0_70px_rgba(181,146,85,.13)]`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" aria-hidden="true">
        <circle cx="180" cy="180" r="162" fill="none" stroke="rgba(181,146,85,.32)" strokeWidth="2" />
        <circle cx="180" cy="180" r="96" fill="rgba(0,0,0,.28)" stroke="rgba(181,146,85,.18)" />
        {organClockPeriods.map((period, index) => {
          const angle = (index / organClockPeriods.length) * Math.PI * 2 - Math.PI / 2;
          const x1 = 180 + Math.cos(angle) * 96;
          const y1 = 180 + Math.sin(angle) * 96;
          const x2 = 180 + Math.cos(angle) * 162;
          const y2 = 180 + Math.sin(angle) * 162;
          return <line key={period.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(181,146,85,.18)" />;
        })}
        <line x1="180" y1="180" x2={180 + Math.cos((handAngle * Math.PI) / 180) * 142} y2={180 + Math.sin((handAngle * Math.PI) / 180) * 142} stroke="rgba(255,224,154,.92)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="180" cy="180" r="5" fill="rgba(255,224,154,.92)" />
      </svg>
      <div className="absolute inset-[34%] grid place-items-center rounded-full border border-gold/20 bg-black/72 text-center">
        <span className="text-xs uppercase tracking-[.16em] text-gold">Current</span>
        <span className="font-display text-xl text-ivory">{formatClockMinute(currentMinute, format)}</span>
      </div>
      {organClockPeriods.map((period, index) => {
        const angle = ((index + .5) / organClockPeriods.length) * Math.PI * 2 - Math.PI / 2;
        const radius = preview ? 37 : 39;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const active = period.id === selectedId;
        const phase = organPhaseLabels[period.phaseId];
        return (
          <button
            key={period.id}
            type="button"
            aria-label={`${period.englishName}, ${period.pinyin}, ${formatRange(period, format)}`}
            className={`focus-ring group absolute grid min-h-14 min-w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border px-2 py-2 text-center text-xs transition hover:z-20 hover:border-gold focus:z-20 ${active ? "border-gold bg-gold/15 text-ivory shadow-[0_0_24px_rgba(181,146,85,.34)]" : "border-gold/25 bg-black/75 text-parchment"}`}
            style={{ left: `${x}%`, top: `${y}%`, boxShadow: active ? `0 0 28px ${phase.color}55` : undefined }}
            onClick={() => onSelect(period.id)}
          >
            <OrganIcon id={period.id} active={active} />
            <span className="mt-1 block text-gold">{period.chineseName}</span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 min-w-max -translate-x-1/2 rounded border border-gold/35 bg-obsidian/95 px-3 py-2 text-xs text-ivory opacity-0 shadow-aureate transition group-hover:opacity-100 group-focus:opacity-100">
              {period.englishName}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OrganIcon({ id, active }: { id: OrganClockPeriodId; active: boolean }) {
  const stroke = active ? "#f2dfad" : "#c6a45d";
  const fill = active ? "rgba(181,146,85,.22)" : "rgba(181,146,85,.08)";
  const muted = active ? "#ffe09a" : "#7b6339";

  const common = {
    fill,
    stroke,
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  const icon = (() => {
    switch (id) {
      case "lung":
        return (
          <>
            <path {...common} d="M16 7v18" />
            <path {...common} d="M16 15c-2.6-4.5-7.2-7-10.2-3.7-2.4 2.6-2.2 12.9 3.5 15.3 3.6 1.5 6.7-1.7 6.7-6.8" />
            <path {...common} d="M16 15c2.6-4.5 7.2-7 10.2-3.7 2.4 2.6 2.2 12.9-3.5 15.3-3.6 1.5-6.7-1.7-6.7-6.8" />
            <path d="M11.5 15.8c-1.8 1.4-2.6 4.1-2.2 7M20.5 15.8c1.8 1.4 2.6 4.1 2.2 7" fill="none" stroke={muted} strokeWidth=".9" strokeLinecap="round" />
          </>
        );
      case "heart":
      case "pericardium":
        return (
          <>
            <path {...common} d="M16 27.5S5.2 20.8 5.2 12.5c0-4 2.9-7.2 6.6-7.2 2.2 0 3.9 1.1 4.2 3 1-2 3-3 5.3-3 3.5 0 6.5 3.1 6.5 7.2 0 8.3-11.8 15-11.8 15Z" />
            <path d="M9.8 14.2h3.2l1.7-3.1 2.2 7.2 1.8-4.1h3.8" fill="none" stroke={muted} strokeWidth=".95" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case "stomach":
      case "spleen":
        return (
          <>
            <path {...common} d="M15.8 4.8c5.6.8 8 4.2 6.3 8.8-1.3 3.4-4.9 4.2-3.7 8.1 1 3.5-1.9 6.2-6.2 5.4-4.7-.8-7.5-4.3-6.6-8.4.6-2.7 2.8-4.5 5.8-5.4 3.2-1 4.8-3.4 4.4-8.5Z" />
            <path d="M11.2 17.1c2.8-.3 5.2.7 6.6 2.8" fill="none" stroke={muted} strokeWidth=".9" strokeLinecap="round" />
          </>
        );
      case "liver":
      case "gallbladder":
        return (
          <>
            <path {...common} d="M4.8 17.2c2.1-7.7 9.5-11.8 18.1-9.7 4.7 1.2 6.4 4.5 4.6 8.5-2.4 5.4-9.1 8.3-17.2 8.5-4.4.1-6.5-2.8-5.5-7.3Z" />
            <path d="M10.3 17.1c4.2-.7 7.7-.3 12.1 1.3M18.7 9.2c.8 3.2.2 5.8-1.7 7.8" fill="none" stroke={muted} strokeWidth=".9" strokeLinecap="round" />
          </>
        );
      case "kidney":
      case "bladder":
        return (
          <>
            <path {...common} d="M12 6c-5 1-8 5-7 10 1 4 5 7 8 5 2-1 2-4 1-7-1-3 0-6 4-8" />
            <path {...common} d="M20 6c5 1 8 5 7 10-1 4-5 7-8 5-2-1-2-4-1-7 1-3 0-6-4-8" />
            <path {...common} d="M16 20v7" />
          </>
        );
      case "large-intestine":
      case "small-intestine":
        return (
          <>
            <path {...common} d="M9 8c-2.5 0-4 1.7-4 4v8c0 3 2.1 5 5 5h12c2.9 0 5-2 5-5v-8c0-2.3-1.5-4-4-4H9Z" />
            <path d="M10 12h12v9H10v-9Zm6 0v9M10 16.5h12" fill="none" stroke={muted} strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      case "san-jiao":
        return (
          <>
            <circle {...common} cx="16" cy="8" r="3" />
            <circle {...common} cx="16" cy="16" r="3" />
            <circle {...common} cx="16" cy="24" r="3" />
            <path {...common} d="M8 16h16" />
          </>
        );
      default:
        return <circle {...common} cx="16" cy="16" r="9" />;
    }
  })();

  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" role="img" aria-hidden="true">
      <circle cx="16" cy="16" r="14.2" fill="rgba(0,0,0,.42)" stroke="rgba(181,146,85,.18)" strokeWidth=".8" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="rgba(255,224,154,.08)" strokeWidth=".65" />
      {icon}
    </svg>
  );
}

function PeriodCard({ period, format }: { period: OrganClockPeriod; format: "12" | "24" }) {
  const phase = organPhaseLabels[period.phaseId];
  return (
    <div className="mt-3 rounded border border-gold/15 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{formatRange(period, format)}</p>
      <p className="mt-1 font-display text-2xl text-ivory">{period.englishName}</p>
      <p className="text-sm text-parchment">{period.chineseName} · {period.pinyin}</p>
      <p className="mt-2 text-sm" style={{ color: phase.color }}>{period.yinYang} {phase.name}</p>
      <p className="mt-3 text-sm leading-6 text-limestone">{period.caution}</p>
    </div>
  );
}

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} type="button" className={`focus-ring rounded border px-3 py-2 text-sm capitalize ${value === option ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:text-ivory"}`} onClick={() => onChange(option)}>{titleCase(option)}</button>)}
      </div>
    </div>
  );
}

function SelectBlock<T extends string>({ label, value, values, labels, onChange }: { label: string; value: T; values: readonly T[]; labels?: Partial<Record<T, string>>; onChange: (value: T) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span>
      <select className="mt-2 w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {values.map((item) => <option key={item} value={item}>{labels?.[item] ?? titleCase(item)}</option>)}
      </select>
    </label>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <article className="mt-5 rounded border border-gold/20 bg-black/35 p-4 first:mt-0">
      <p className="text-xs uppercase tracking-[.2em] text-gold">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl text-ivory">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 border-t border-gold/10 pt-3">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{label}</p>
      <p className="mt-1 text-sm text-parchment">{value}</p>
    </div>
  );
}
