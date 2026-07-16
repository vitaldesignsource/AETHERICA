"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, ClipboardCopy, Pause, Play, RotateCcw, Search, Sparkles } from "lucide-react";
import { formatClock } from "@/components/resources/calculations";
import {
  calculateElectionalGates,
  calculateLiveSky,
  calculatePlanetaryHourRows,
  castMockChart,
  formatPosition,
  planetLabels
} from "@/lib/astrology/mock-adapter";
import type { CastChartInput, CastChartResult, GateStatus, Planet, SelectedLocation } from "@/lib/astrology/types";
import { AstrologyPromptActions } from "./AstrologyPromptActions";
import { DignityMatrix } from "./DignityMatrix";
import { EphemerisTable } from "./EphemerisTable";
import { HermeticLotsPanel } from "./HermeticLotsPanel";
import { LocationAutocomplete } from "./LocationAutocomplete";

type TabId = "live-sky" | "chart-caster" | "planetary-hours" | "episode-timing" | "electional-gates";
type StepSize = "1 min" | "1 hour" | "1 day" | "1 week" | "1 month";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "live-sky", label: "Live Sky" },
  { id: "chart-caster", label: "Chart Caster" },
  { id: "planetary-hours", label: "Planetary Hours" },
  { id: "episode-timing", label: "Episode Timing" },
  { id: "electional-gates", label: "Electional Gates" }
];

const stepMinutes: Record<StepSize, number> = {
  "1 min": 1,
  "1 hour": 60,
  "1 day": 1440,
  "1 week": 10080,
  "1 month": 43200
};

const episodeOptions = [
  "QABALISTICA PT 2",
  "Symbolism, Emanationism, Color Magick, Etheric Tides & Universal Planes",
  "Dion Fortune, Theosophy, Hermeneutics, Qabalah, Thought Forms",
  "Daniel Wiseman: Metallic Alchemy & The Animating Spark of Life"
];

const operationTypes = ["constructive", "destructive", "divinatory", "study/research", "publication/release"];
const planets = Object.keys(planetLabels) as Planet[];

function inputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function inputTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function fromInputs(date: string, time: string) {
  return new Date(`${date}T${time || "12:00"}:00`);
}

export function CelestialInstrument({ standalone = false }: { standalone?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabId>("live-sky");
  const [nowDate, setNowDate] = useState(() => inputDate(new Date()));
  const [nowTime, setNowTime] = useState(() => inputTime(new Date()));
  const [stepSize, setStepSize] = useState<StepSize>("1 hour");
  const [isPlaying, setIsPlaying] = useState(false);
  const [location, setLocation] = useState<SelectedLocation | undefined>();
  const [notice, setNotice] = useState("");
  const [chartInput, setChartInput] = useState<CastChartInput>({ date: inputDate(new Date()), time: inputTime(new Date()), unknownTime: false });
  const [chartResult, setChartResult] = useState<CastChartResult | undefined>();
  const [chartError, setChartError] = useState("");
  const [episode, setEpisode] = useState(episodeOptions[0]);
  const [publishDate, setPublishDate] = useState(inputDate(new Date()));
  const [publishTime, setPublishTime] = useState("12:00");
  const [targetPlanet, setTargetPlanet] = useState<Planet>("jupiter");
  const [operation, setOperation] = useState("publication/release");

  const currentDate = useMemo(() => fromInputs(nowDate, nowTime), [nowDate, nowTime]);
  const liveSky = useMemo(() => calculateLiveSky(currentDate, location), [currentDate, location]);
  const planetaryRows = useMemo(() => calculatePlanetaryHourRows(currentDate, location), [currentDate, location]);
  const episodeSky = useMemo(() => calculateLiveSky(fromInputs(publishDate, publishTime), location), [publishDate, publishTime, location]);
  const gates = useMemo(() => calculateElectionalGates(currentDate, targetPlanet, operation, location), [currentDate, targetPlanet, operation, location]);

  function shift(direction: -1 | 1) {
    const next = new Date(currentDate);
    next.setMinutes(next.getMinutes() + direction * stepMinutes[stepSize]);
    setNowDate(inputDate(next));
    setNowTime(inputTime(next));
  }

  async function copyLiveSky() {
    await navigator.clipboard.writeText(JSON.stringify(liveSky, null, 2));
    setNotice("Current sky data copied.");
  }

  function castChart() {
    setChartError("");
    if (chartInput.location === undefined) {
      setChartError("Select a city from the suggestions to calculate houses and local angles.");
      return;
    }
    setChartResult(castMockChart(chartInput));
  }

  const panelId = `celestial-panel-${activeTab}`;

  return (
    <div className={standalone ? "mx-auto max-w-7xl" : ""}>
      <div className="relative overflow-hidden rounded border border-gold/20 bg-[#0b0b09] shadow-aureate">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_18%,rgba(63,89,66,.18),transparent_22rem),radial-gradient(circle_at_84%_18%,rgba(122,17,26,.16),transparent_24rem)]" />
        <div className="relative grid gap-5 p-4 sm:p-5">
          <header className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.28em] text-gold">Test instrument / astrology</p>
              <h2 className="font-manuscript-title mt-2 font-display text-4xl leading-none text-ivory sm:text-5xl">Celestial Instrument</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">
                A compact astrology console for live sky study, chart casting, planetary hours, episode timing, and symbolic electional review.
              </p>
            </div>
            <div className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-xs uppercase tracking-[.18em] text-limestone">
              Mock ephemeris adapter • real engine ready
            </div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[19rem_1fr]">
            <aside className="rounded border border-gold/15 bg-black/35 p-4">
              <div className="grid gap-4">
                <div role="tablist" aria-label="Celestial instrument tools" className="flex gap-2 overflow-x-auto pb-1 xl:grid xl:overflow-visible">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={panelId}
                      className={`min-w-max rounded border px-3 py-2 text-left text-xs uppercase tracking-[.18em] transition ${
                        activeTab === tab.id
                          ? "border-gold bg-gold/20 text-ivory shadow-[0_0_18px_rgba(181,146,85,.18)]"
                          : "border-gold/15 bg-black/30 text-gold hover:border-gold/45 hover:text-ivory"
                      }`}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <LocationAutocomplete selected={location} onSelect={(next) => {
                  setLocation(next);
                  setChartInput((input) => ({ ...input, location: next }));
                }} />
                {notice ? <p className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-xs text-parchment">{notice}</p> : null}
              </div>
            </aside>

            <section id={panelId} role="tabpanel" aria-label={tabs.find((tab) => tab.id === activeTab)?.label} className="min-w-0 rounded border border-gold/15 bg-black/30 p-4">
              {activeTab === "live-sky" ? (
                <LiveSkyPanel
                  date={nowDate}
                  time={nowTime}
                  stepSize={stepSize}
                  isPlaying={isPlaying}
                  liveSky={liveSky}
                  onDate={setNowDate}
                  onTime={setNowTime}
                  onStep={setStepSize}
                  onShift={shift}
                  onPlay={() => setIsPlaying((value) => !value)}
                  onReset={() => {
                    const next = new Date();
                    setNowDate(inputDate(next));
                    setNowTime(inputTime(next));
                  }}
                  onCopy={copyLiveSky}
                />
              ) : null}
              {activeTab === "chart-caster" ? (
                <ChartCasterPanel input={chartInput} setInput={setChartInput} result={chartResult} error={chartError} onCast={castChart} />
              ) : null}
              {activeTab === "planetary-hours" ? <PlanetaryHoursPanel rows={planetaryRows} date={currentDate} /> : null}
              {activeTab === "episode-timing" ? (
                <EpisodeTimingPanel episode={episode} setEpisode={setEpisode} publishDate={publishDate} setPublishDate={setPublishDate} publishTime={publishTime} setPublishTime={setPublishTime} snapshot={episodeSky} />
              ) : null}
              {activeTab === "electional-gates" ? (
                <ElectionalGatesPanel targetPlanet={targetPlanet} setTargetPlanet={setTargetPlanet} operation={operation} setOperation={setOperation} gates={gates} snapshot={{ date: currentDate.toISOString(), targetPlanet, operation, gates }} />
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveSkyPanel({
  date,
  time,
  stepSize,
  isPlaying,
  liveSky,
  onDate,
  onTime,
  onStep,
  onShift,
  onPlay,
  onReset,
  onCopy
}: {
  date: string;
  time: string;
  stepSize: StepSize;
  isPlaying: boolean;
  liveSky: ReturnType<typeof calculateLiveSky>;
  onDate: (value: string) => void;
  onTime: (value: string) => void;
  onStep: (value: StepSize) => void;
  onShift: (direction: -1 | 1) => void;
  onPlay: () => void;
  onReset: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="grid gap-5">
      <InstrumentHeading eyebrow="Live sky" title="Current astrological conditions" detail="Calculation and interpretation are kept separate. The current adapter is deterministic test data until a validated ephemeris is connected." />
      <div className="grid gap-3 lg:grid-cols-4">
        <Metric label="Date / time" value={`${date} — ${time}`} />
        <Metric label="Moon phase" value={`${liveSky.moonPhase ?? "Unknown"} • ${liveSky.moonIllumination ?? 0}%`} />
        <Metric label="Ascendant" value={liveSky.ascendant ?? "Choose location"} />
        <Metric label="Planetary hour" value={liveSky.planetaryHour ? planetLabels[liveSky.planetaryHour] : "Choose location"} />
      </div>
      <div className="grid gap-3 rounded border border-gold/15 bg-black/25 p-3 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Date<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="date" value={date} onChange={(event) => onDate(event.target.value)} /></label>
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Time<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="time" value={time} onChange={(event) => onTime(event.target.value)} /></label>
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Step<select className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" value={stepSize} onChange={(event) => onStep(event.target.value as StepSize)}>{Object.keys(stepMinutes).map((step) => <option key={step}>{step}</option>)}</select></label>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <IconButton label="Step back" onClick={() => onShift(-1)}><ChevronLeft size={16} /></IconButton>
          <IconButton label={isPlaying ? "Pause sky animation" : "Play sky animation"} onClick={onPlay}>{isPlaying ? <Pause size={16} /> : <Play size={16} />}</IconButton>
          <IconButton label="Step forward" onClick={() => onShift(1)}><ChevronRight size={16} /></IconButton>
          <IconButton label="Reset to now" onClick={onReset}><RotateCcw size={16} /></IconButton>
          <IconButton label="Copy current sky data" onClick={onCopy}><ClipboardCopy size={16} /></IconButton>
        </div>
      </div>
      <EphemerisTable positions={liveSky.positions} />
      <AstrologyPromptActions tool="live-sky" snapshot={liveSky} prompts={["Give a traditional astrology reading, but separate calculation from interpretation.", "Explain the Moon phase with citations from the archive.", "Compare this sky to the symbols discussed in an Aetherica episode."]} />
    </div>
  );
}

function ChartCasterPanel({ input, setInput, result, error, onCast }: { input: CastChartInput; setInput: (value: CastChartInput | ((value: CastChartInput) => CastChartInput)) => void; result?: CastChartResult; error: string; onCast: () => void }) {
  return (
    <div className="grid gap-5">
      <InstrumentHeading eyebrow="Chart caster" title="Cast a test chart" detail="Unknown time disables houses, ascendant-dependent lots, and time-sensitive synthesis." />
      <div className="grid gap-3 rounded border border-gold/15 bg-black/25 p-3 lg:grid-cols-2">
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Name<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" value={input.name ?? ""} onChange={(event) => setInput((value) => ({ ...value, name: event.target.value }))} placeholder="Optional chart name" /></label>
        <LocationAutocomplete required selected={input.location} onSelect={(location) => setInput((value) => ({ ...value, location }))} />
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Date<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="date" value={input.date} onChange={(event) => setInput((value) => ({ ...value, date: event.target.value }))} /></label>
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Time<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory disabled:opacity-45" type="time" disabled={input.unknownTime} value={input.time ?? ""} onChange={(event) => setInput((value) => ({ ...value, time: event.target.value }))} /></label>
        <label className="flex items-center gap-2 text-sm text-parchment"><input className="accent-gold" type="checkbox" checked={input.unknownTime} onChange={(event) => setInput((value) => ({ ...value, unknownTime: event.target.checked }))} /> Unknown time</label>
        <button className="rounded border border-gold bg-gold/20 px-4 py-2 text-sm uppercase tracking-[.16em] text-ivory hover:bg-gold/30" type="button" onClick={onCast}>Cast Chart</button>
      </div>
      {error ? <p className="rounded border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-ivory" role="alert">{error}</p> : null}
      {result ? (
        <div className="grid gap-4">
          <div className="grid gap-3 lg:grid-cols-3">
            <Metric label="Chart" value={result.input.name || "Untitled chart"} />
            <Metric label="Location" value={result.input.location?.label ?? "None"} />
            <Metric label="Sect" value={result.sect ?? "unknown"} />
          </div>
          <EphemerisTable positions={result.positions} />
          <DignityMatrix positions={result.positions} />
          <HermeticLotsPanel result={result} />
          <AstrologyPromptActions tool="chart-caster" snapshot={result} prompts={["Analyze Essential Dignity.", "Delineate Moon & Aspects.", "Sect, Fortune & Synthesis.", "Compare With Episode Theme."]} />
        </div>
      ) : (
        <EmptyState title="No chart cast yet" detail="Select a location suggestion, date, and time. If time is unknown, the instrument will preserve positions while hiding houses and lots." />
      )}
    </div>
  );
}

function PlanetaryHoursPanel({ rows, date }: { rows?: ReturnType<typeof calculatePlanetaryHourRows>; date: Date }) {
  if (!rows) {
    return <EmptyState title="Choose a location" detail="Choose a location to calculate local sunrise, sunset, and planetary hours." />;
  }
  const currentMinute = date.getHours() * 60 + date.getMinutes();
  return (
    <div className="grid gap-5">
      <InstrumentHeading eyebrow="Planetary hours" title={`Day of ${rows.dayRuler}`} detail={`Sunrise ${rows.sunriseLabel} • Sunset ${rows.sunsetLabel}`} />
      <HourTable title="Day hours" hours={rows.hours.filter((hour) => hour.phase === "day")} currentMinute={currentMinute} />
      <HourTable title="Night hours" hours={rows.hours.filter((hour) => hour.phase === "night")} currentMinute={currentMinute} />
      <AstrologyPromptActions tool="planetary-hours" snapshot={rows} prompts={["Create listener-friendly show notes from this timing.", "Suggest the next three useful Mercury or Jupiter hours.", "Explain these planetary hours as traditional correspondences, not scientific causation."]} />
    </div>
  );
}

function EpisodeTimingPanel({ episode, setEpisode, publishDate, setPublishDate, publishTime, setPublishTime, snapshot }: { episode: string; setEpisode: (value: string) => void; publishDate: string; setPublishDate: (value: string) => void; publishTime: string; setPublishTime: (value: string) => void; snapshot: ReturnType<typeof calculateLiveSky> }) {
  return (
    <div className="grid gap-5">
      <InstrumentHeading eyebrow="Episode timing" title="Tie the sky to the archive" detail="Use this panel to draft symbolic timing notes for publication moments, recording sessions, or research themes." />
      <div className="grid gap-3 rounded border border-gold/15 bg-black/25 p-3 lg:grid-cols-3">
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Episode<select className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" value={episode} onChange={(event) => setEpisode(event.target.value)}>{episodeOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Publish date<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="date" value={publishDate} onChange={(event) => setPublishDate(event.target.value)} /></label>
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Publish time<input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="time" value={publishTime} onChange={(event) => setPublishTime(event.target.value)} /></label>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Metric label="Sky at publication" value={snapshot.positions.slice(0, 2).map(formatPosition).join(" / ")} />
        <Metric label="Moon phase" value={`${snapshot.moonPhase} • ${snapshot.moonIllumination}%`} />
        <Metric label="Podcast bridge" value="Related by planet, sign, theme, and transcript keywords" />
      </div>
      <div className="rounded border border-gold/15 bg-black/25 p-4">
        <p className="text-xs uppercase tracking-[.22em] text-gold">Symbolic correspondences</p>
        <p className="mt-3 text-sm leading-6 text-parchment">Use planetary and lunar language to frame episode notes without pretending the calculation is the content itself. The episode remains the primary archive object; timing is a symbolic lens.</p>
      </div>
      <AstrologyPromptActions tool="episode-timing" snapshot={{ episode, snapshot }} prompts={["Generate episode timing notes.", "Ask the archive about this sky.", "Compare this episode with the current sky."]} />
    </div>
  );
}

function ElectionalGatesPanel({ targetPlanet, setTargetPlanet, operation, setOperation, gates, snapshot }: { targetPlanet: Planet; setTargetPlanet: (value: Planet) => void; operation: string; setOperation: (value: string) => void; gates: ReturnType<typeof calculateElectionalGates>; snapshot: unknown }) {
  const failures = gates.filter((gate) => gate.status === "fail").length;
  const warnings = gates.filter((gate) => gate.status === "warning").length;
  const recommendation = failures ? "Do not rely on this moment without resolving missing calculation context." : warnings ? "Usable as a symbolic window with cautions." : "Strong symbolic support in the current gate set.";
  return (
    <div className="grid gap-5">
      <InstrumentHeading eyebrow="Electional Gate Validator" title="Symbolic gate review" detail="For symbolic, historical, and reflective use only." />
      <div className="grid gap-3 rounded border border-gold/15 bg-black/25 p-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Target planet<select className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm capitalize tracking-normal text-ivory" value={targetPlanet} onChange={(event) => setTargetPlanet(event.target.value as Planet)}>{planets.map((planet) => <option key={planet} value={planet}>{planetLabels[planet]}</option>)}</select></label>
        <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">Operation type<select className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm tracking-normal text-ivory" value={operation} onChange={(event) => setOperation(event.target.value)}>{operationTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="rounded border border-gold/25 bg-black/35 p-4">
        <p className="text-xs uppercase tracking-[.22em] text-gold">Overall recommendation</p>
        <p className="mt-2 font-display text-2xl text-ivory">{recommendation}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {gates.map((gate) => <GateCard key={gate.label} gate={gate} />)}
      </div>
      <AstrologyPromptActions tool="electional-gates" snapshot={snapshot} prompts={["Explain each gate and separate calculation from interpretation.", "Turn this electional review into practical release timing notes.", "Create a Codex prompt to improve this electional module."]} />
    </div>
  );
}

function HourTable({ title, hours, currentMinute }: { title: string; hours: Array<{ index: number; name: string; start: number; end: number }>; currentMinute: number }) {
  return (
    <div className="overflow-x-auto rounded border border-gold/15">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">{title}</caption>
        <thead className="bg-gold/10 text-xs uppercase tracking-[.16em] text-gold">
          <tr><th className="px-3 py-3" scope="col">{title}</th><th className="px-3 py-3" scope="col">Ruler</th><th className="px-3 py-3" scope="col">Start</th><th className="px-3 py-3" scope="col">End</th><th className="px-3 py-3" scope="col">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-gold/10">
          {hours.map((hour) => {
            const active = currentMinute >= hour.start && currentMinute < hour.end;
            return (
              <tr key={hour.index} className={active ? "bg-gold/10 text-ivory" : "text-parchment"}>
                <td className="px-3 py-3">{hour.index}</td>
                <td className="px-3 py-3">{hour.name}</td>
                <td className="px-3 py-3">{formatClock(hour.start)}</td>
                <td className="px-3 py-3">{formatClock(hour.end)}</td>
                <td className="px-3 py-3">{active ? "Current hour" : "Pending"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function InstrumentHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[.24em] text-gold">{eyebrow}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight text-ivory">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment/85">{detail}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-gold/15 bg-black/35 p-3">
      <p className="text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ivory">{value}</p>
    </div>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="grid min-h-64 place-items-center rounded border border-dashed border-gold/25 bg-black/25 p-6 text-center">
      <div>
        <Search className="mx-auto text-gold" size={28} />
        <h3 className="mt-3 font-display text-2xl text-ivory">{title}</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-parchment">{detail}</p>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button className="grid size-10 place-items-center rounded border border-gold/25 bg-black/40 text-gold hover:border-gold hover:bg-gold/10 hover:text-ivory" type="button" onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}

function GateCard({ gate }: { gate: { label: string; status: GateStatus; detail: string } }) {
  const styles: Record<GateStatus, string> = {
    pass: "border-emerald-700/55 bg-emerald-950/20 text-emerald-200",
    warning: "border-gold/40 bg-gold/10 text-parchment",
    fail: "border-crimson/50 bg-crimson/10 text-ivory"
  };
  return (
    <div className={`rounded border p-4 ${styles[gate.status]}`}>
      <p className="flex items-center gap-2 text-xs uppercase tracking-[.18em]">
        <Sparkles size={14} /> {gate.status}
      </p>
      <h4 className="mt-2 font-display text-xl text-ivory">{gate.label}</h4>
      <p className="mt-2 text-sm leading-6">{gate.detail}</p>
    </div>
  );
}
