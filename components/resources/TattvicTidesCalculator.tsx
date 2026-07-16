"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Copy } from "lucide-react";
import {
  activeBlock,
  calculateSolarTimes,
  formatClock,
  formatDuration,
  parseClock,
  tattvas,
  tattvicTides,
  type TattvaName,
  type TimeBlock
} from "./calculations";
import { prependToolHistory } from "./instrument-storage";
import { LocationPicker } from "./LocationPicker";
import { formattedUtcOffset, manualOffsetFromPreference, timeZoneOptionsForSelection, timeZoneSelectionFromPreference, timezoneOffsetFor } from "./time-zones";
import { readPreferences } from "@/components/personalization/preferences";

type TideView = "instrument" | "timeline" | "table" | "minimal";
type Method = "sunrise" | "fixed" | "custom";
type ClockMode = "both" | "12" | "24";

function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

function timeInput() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function calendarHref(block: TimeBlock<TattvaName>, date: string) {
  const start = toCalendarStamp(date, block.start);
  const end = toCalendarStamp(date, block.end);
  const label = block.subName ? `${block.name} / ${block.subName}` : block.name;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Tattvic tide: ${label}`)}&dates=${start}/${end}`;
}

function toCalendarStamp(date: string, minutes: number) {
  const base = new Date(`${date}T00:00:00`);
  base.setMinutes(Math.round(minutes));
  return base.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function formatTideClock(minutes: number, mode: ClockMode = "both") {
  if (mode === "12") return formatClock(minutes, "12");
  if (mode === "24") return formatClock(minutes, "24");
  return `${formatClock(minutes, "12")} / ${formatClock(minutes, "24")}`;
}

function formatTideRange(block: TimeBlock<TattvaName>, mode: ClockMode = "both") {
  return `${formatTideClock(block.start, mode)} - ${formatTideClock(block.end, mode)}`;
}

export function TattvicTidesCalculator() {
  const [date, setDate] = useState(todayInput);
  const [time, setTime] = useState(timeInput);
  const [locationName, setLocationName] = useState(() => readPreferences().instrumentLocationName || "Denver, CO");
  const [latitude, setLatitude] = useState(() => readPreferences().instrumentLatitude || "39.7392");
  const [longitude, setLongitude] = useState(() => readPreferences().instrumentLongitude || "-104.9903");
  const [timeZone, setTimeZone] = useState(() => timeZoneSelectionFromPreference(readPreferences().instrumentTimeZone));
  const [manualTimezoneOffset, setManualTimezoneOffset] = useState(() => manualOffsetFromPreference(readPreferences().instrumentTimeZone));
  const [clockMode, setClockMode] = useState<ClockMode>("both");
  const [method, setMethod] = useState<Method>("sunrise");
  const [customStart, setCustomStart] = useState("06:00");
  const [cycleDuration, setCycleDuration] = useState("24");
  const [includeSubTattvas, setIncludeSubTattvas] = useState(true);
  const [view, setView] = useState<TideView>("instrument");
  const [filter, setFilter] = useState<"All" | TattvaName>("All");
  const [notice, setNotice] = useState("");
  const [note, setNote] = useState("");

  const dateObject = useMemo(() => new Date(`${date}T12:00:00`), [date]);
  const timezoneOffset = timeZone === "manual" ? manualTimezoneOffset : String(timezoneOffsetFor(dateObject, timeZone));
  const selectableTimeZones = timeZoneOptionsForSelection(timeZone);
  const solar = useMemo(() => calculateSolarTimes(dateObject, Number(latitude), Number(longitude), Number(timezoneOffset)), [dateObject, latitude, longitude, timezoneOffset]);
  const startMinute = method === "sunrise" ? solar.sunrise : method === "fixed" ? 360 : parseClock(customStart);
  const currentMinute = parseClock(time);
  const tides = useMemo(() => tattvicTides(startMinute, currentMinute, Number(cycleDuration), includeSubTattvas), [startMinute, currentMinute, cycleDuration, includeSubTattvas]);
  const status = activeBlock(tides, currentMinute);
  const primary = tattvas[status.current.name];
  const sub = status.current.subName ? tattvas[status.current.subName] : undefined;
  const visibleTides = filter === "All" ? tides.slice(0, 80) : tides.filter((tide) => tide.name === filter).slice(0, 80);

  useEffect(() => {
    prependToolHistory({ tool: "Tattvic Tides", detail: "Opened tattvic tides calculator" });
  }, []);

  function methodDescription() {
    if (method === "sunrise") return `Cycle begins at calculated sunrise: ${formatTideClock(solar.sunrise, clockMode)}.`;
    if (method === "fixed") return "Cycle begins at 6:00 AM local clock time.";
    return `Cycle begins at custom start time: ${formatTideClock(parseClock(customStart), clockMode)}.`;
  }

  async function copyCurrentTide() {
    const label = status.current.subName ? `${status.current.name} / ${status.current.subName}` : status.current.name;
    await navigator.clipboard.writeText(`${label}: ${formatTideRange(status.current, clockMode)} on ${date}`);
    setNotice("Current tide copied.");
  }

  function saveCurrentTide() {
    setNotice("Saved instrument data is coming soon with sign up and login.");
  }

  function scheduleCurrentAlert() {
    setNotice("Scheduled alerts are coming soon with sign up and login.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[23rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Calculation method</p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-parchment">
            Date
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Current time
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Method
            <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={method} onChange={(event) => setMethod(event.target.value as Method)}>
              <option value="sunrise">Sunrise-based cycle</option>
              <option value="fixed">Fixed clock-based cycle</option>
              <option value="custom">Custom starting point</option>
            </select>
          </label>
          {method === "custom" ? (
            <label className="grid gap-2 text-sm text-parchment">
              Custom start
              <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="time" value={customStart} onChange={(event) => setCustomStart(event.target.value)} />
            </label>
          ) : null}
          <label className="grid gap-2 text-sm text-parchment">
            Primary cycle duration, minutes
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="number" min="5" step="1" value={cycleDuration} onChange={(event) => setCycleDuration(event.target.value)} />
          </label>
          <label className="flex items-center justify-between gap-4 rounded border border-gold/20 bg-black/30 px-3 py-2 text-sm text-parchment">
            Primary and sub-tattvas
            <input type="checkbox" checked={includeSubTattvas} onChange={(event) => setIncludeSubTattvas(event.target.checked)} />
          </label>
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
          <label className="grid gap-2 text-sm text-parchment">
            Display
            <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={clockMode} onChange={(event) => setClockMode(event.target.value as ClockMode)}>
              <option value="both">Regular + military</option>
              <option value="12">Regular time</option>
              <option value="24">Military time</option>
            </select>
          </label>
          {notice ? <p className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-sm text-parchment">{notice}</p> : null}
        </div>
      </aside>

      <section className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
          <div className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
            <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 72% 38%, ${primary.color}55, transparent 18rem), linear-gradient(135deg, rgba(8,8,8,.8), ${primary.color}22)` }} />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.26em] text-gold">Current tide</p>
                <h2 className="font-manuscript-title mt-2 font-display text-5xl text-ivory">{status.current.name}</h2>
                {status.current.subName ? <p className="mt-1 text-lg text-parchment">Sub-tide: {status.current.subName}</p> : null}
              </div>
              <div className="grid size-24 place-items-center rounded-full border border-gold/35 text-6xl text-gold" style={{ color: primary.color }}>
                {primary.symbol}
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-parchment sm:grid-cols-4">
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Starts</span>{formatTideClock(status.current.start, clockMode)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Ends</span>{formatTideClock(status.current.end, clockMode)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Remaining</span>{formatDuration(status.remaining)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Next</span>{status.next.name}</p>
            </div>
            <p className="mt-5 max-w-3xl leading-7 text-parchment">{primary.quality}</p>
            <p className="mt-3 text-sm leading-7 text-parchment/80">{methodDescription()} Results are shown as traditional timing correspondences rather than a universal authority.</p>
          </div>
          <div className="temple-border rounded p-5">
            <p className="text-xs uppercase tracking-[.24em] text-gold">Traditional associations</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {primary.activities.map((activity) => (
                <span key={activity} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{activity}</span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-parchment">{primary.caution}</p>
            {sub ? <p className="mt-3 text-sm leading-6 text-parchment/80">Sub-tide quality: {sub.quality}</p> : null}
            <div className="mt-5 flex gap-2">
              <button className="rounded border border-gold/30 p-2 text-gold" onClick={copyCurrentTide} type="button" aria-label="Copy current tide"><Copy size={18} /></button>
              <a className="rounded border border-gold/30 p-2 text-gold" href={calendarHref(status.current, date)} target="_blank" rel="noreferrer" aria-label="Add current tide to calendar"><CalendarPlus size={18} /></a>
            </div>
            <div className="mt-4 grid gap-2">
              <textarea className="min-h-20 rounded border border-gold/20 bg-black/35 px-3 py-2 text-sm text-ivory" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Research note for this tide..." />
              <button className="rounded border border-gold/35 px-3 py-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={saveCurrentTide}>Save coming soon</button>
              <button className="rounded border border-gold/25 px-3 py-2 text-sm text-parchment hover:bg-gold/10 hover:text-ivory" type="button" onClick={scheduleCurrentAlert}>Alerts coming soon</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["instrument", "timeline", "table", "minimal"] as TideView[]).map((mode) => (
            <button key={mode} className={`rounded border px-4 py-2 text-sm uppercase tracking-[.16em] ${view === mode ? "border-gold bg-gold/15 text-ivory" : "border-gold/25 text-gold"}`} onClick={() => setView(mode)} type="button">
              {mode}
            </button>
          ))}
        </div>

        {view === "instrument" ? <TattvaInstrument tides={tides.slice(0, 25)} current={status.current} /> : null}
        {view === "timeline" ? <TideTimeline tides={tides.slice(0, 80)} current={status.current} clockMode={clockMode} /> : null}
        {view === "table" ? (
          <div className="temple-border rounded p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[.24em] text-gold">Daily tide table</p>
              <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={filter} onChange={(event) => setFilter(event.target.value as "All" | TattvaName)}>
                <option>All</option>
                {(Object.keys(tattvas) as TattvaName[]).map((tattva) => <option key={tattva}>{tattva}</option>)}
              </select>
            </div>
            <TideTable tides={visibleTides} current={status.current} clockMode={clockMode} />
          </div>
        ) : null}
        {view === "minimal" ? (
          <div className="temple-border rounded p-6 text-center">
            <p className="text-xs uppercase tracking-[.24em] text-gold">Minimal view</p>
            <p className="mt-3 font-display text-4xl text-ivory">{primary.symbol} {status.current.name}{status.current.subName ? ` / ${status.current.subName}` : ""}</p>
            <p className="mt-2 text-parchment">{formatTideRange(status.current, clockMode)} · {formatDuration(status.remaining)} remaining</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function TattvaInstrument({ tides, current }: { tides: TimeBlock<TattvaName>[]; current: TimeBlock<TattvaName> }) {
  const primary = tattvas[current.name];
  return (
    <div className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/80 p-6 shadow-aureate">
      <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 44%, ${primary.color}55, transparent 17rem), conic-gradient(from 12deg, rgba(181,146,85,.18), rgba(8,8,8,.6), ${primary.color}44, rgba(8,8,8,.7))` }} />
      <div className="mx-auto grid aspect-square max-w-2xl place-items-center rounded-full border border-gold/25 bg-black/50 p-8">
        <div className="relative size-full rounded-full border border-gold/20">
          {tides.slice(0, 25).map((tide, index) => {
            const angle = (index / 25) * 360 - 90;
            const isCurrent = tide.index === current.index;
            return (
              <div key={tide.index} className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black/80 text-xl" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-260%) rotate(${-angle}deg)`, borderColor: isCurrent ? tattvas[tide.name].color : "rgba(181,146,85,.22)", color: isCurrent ? tattvas[tide.name].color : "#b59255", boxShadow: isCurrent ? `0 0 28px ${tattvas[tide.name].color}` : undefined }}>
                {tattvas[tide.name].symbol}
              </div>
            );
          })}
          <div className="absolute inset-[34%] grid place-items-center rounded-full border border-gold/35 bg-black text-center">
            <span className="text-5xl" style={{ color: primary.color }}>{primary.symbol}</span>
            <span className="text-xs uppercase tracking-[.18em] text-parchment">{current.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TideTimeline({ tides, current, clockMode }: { tides: TimeBlock<TattvaName>[]; current: TimeBlock<TattvaName>; clockMode: ClockMode }) {
  return (
    <div className="grid gap-2">
      {tides.map((tide) => (
        <div key={tide.index} className={`grid gap-3 rounded border p-3 sm:grid-cols-[8rem_13rem_1fr] ${tide.index === current.index ? "border-gold bg-gold/10" : "border-gold/15 bg-black/30"}`}>
          <span className="text-gold">{tide.name}{tide.subName ? ` / ${tide.subName}` : ""}</span>
          <span className="text-parchment">{formatTideRange(tide, clockMode)}</span>
          <span className="text-ivory">{tattvas[tide.name].symbol} {tattvas[tide.name].quality}</span>
        </div>
      ))}
    </div>
  );
}

function TideTable({ tides, current, clockMode }: { tides: TimeBlock<TattvaName>[]; current: TimeBlock<TattvaName>; clockMode: ClockMode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[50rem] border-collapse text-left">
        <thead className="text-xs uppercase tracking-[.18em] text-gold">
          <tr className="border-b border-gold/20">
            <th className="py-3">Start</th>
            <th>End</th>
            <th>Primary</th>
            <th>Sub</th>
            <th>Element</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {tides.map((tide) => (
            <tr key={tide.index} className={`border-b border-gold/10 ${tide.index === current.index ? "bg-gold/10" : ""}`}>
              <td className="py-3 text-parchment">{formatTideClock(tide.start, clockMode)}</td>
              <td className="text-parchment">{formatTideClock(tide.end, clockMode)}</td>
              <td className="text-ivory">{tattvas[tide.name].symbol} {tide.name}</td>
              <td className="text-parchment">{tide.subName ? `${tattvas[tide.subName].symbol} ${tide.subName}` : "—"}</td>
              <td className="text-parchment">{tattvas[tide.name].element}</td>
              <td className="max-w-sm text-sm text-parchment">{tattvas[tide.name].quality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
