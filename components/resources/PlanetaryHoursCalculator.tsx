"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Copy, MapPin, Star } from "lucide-react";
import {
  activeBlock,
  dayRuler,
  formatClock,
  formatDuration,
  parseClock,
  planetaryHours,
  planets,
  type PlanetName,
  type TimeBlock
} from "./calculations";
import { prependToolHistory } from "./instrument-storage";
import { LocationPicker } from "./LocationPicker";
import { formattedUtcOffset, localTimezoneOffset, manualOffsetFromPreference, timeZoneOptionsForSelection, timeZoneSelectionFromPreference, timezoneOffsetFor } from "./time-zones";
import { readPreferences, savePreferences } from "@/components/personalization/preferences";

type ViewMode = "wheel" | "timeline" | "table" | "minimal";

function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

function timeInput() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function calendarHref(block: TimeBlock<PlanetName>, date: string) {
  const start = toCalendarStamp(date, block.start);
  const end = toCalendarStamp(date, block.end);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Planetary hour of ${block.name}`)}&dates=${start}/${end}`;
}

function toCalendarStamp(date: string, minutes: number) {
  const base = new Date(`${date}T00:00:00`);
  base.setMinutes(Math.round(minutes));
  return base.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function PlanetaryHoursCalculator() {
  const [date, setDate] = useState(todayInput);
  const [time, setTime] = useState(timeInput);
  const [locationName, setLocationName] = useState(() => readPreferences().instrumentLocationName || "Denver, CO");
  const [latitude, setLatitude] = useState(() => readPreferences().instrumentLatitude || "39.7392");
  const [longitude, setLongitude] = useState(() => readPreferences().instrumentLongitude || "-104.9903");
  const [timeZone, setTimeZone] = useState(() => timeZoneSelectionFromPreference(readPreferences().instrumentTimeZone));
  const [manualTimezoneOffset, setManualTimezoneOffset] = useState(() => manualOffsetFromPreference(readPreferences().instrumentTimeZone));
  const [clockMode, setClockMode] = useState<"12" | "24">("12");
  const [view, setView] = useState<ViewMode>("wheel");
  const [filterPlanet, setFilterPlanet] = useState<"All" | PlanetName>("All");
  const [notice, setNotice] = useState("");
  const [note, setNote] = useState("");

  const dateObject = useMemo(() => new Date(`${date}T12:00:00`), [date]);
  const timezoneOffset = timeZone === "manual" ? manualTimezoneOffset : String(timezoneOffsetFor(dateObject, timeZone));
  const selectableTimeZones = timeZoneOptionsForSelection(timeZone);
  const currentMinute = parseClock(time);
  const calculation = useMemo(
    () => planetaryHours(dateObject, Number(latitude), Number(longitude), Number(timezoneOffset)),
    [dateObject, latitude, longitude, timezoneOffset]
  );
  const status = activeBlock(calculation.hours, currentMinute);
  const activePlanet = planets[status.current.name];
  const daylightJupiter = calculation.hours.filter((hour) => hour.name === "Jupiter" && hour.phase === "day").slice(0, 3);
  const visibleHours = filterPlanet === "All" ? calculation.hours : calculation.hours.filter((hour) => hour.name === filterPlanet);

  useEffect(() => {
    prependToolHistory({ tool: "Planetary Hours", detail: "Opened planetary hours calculator" });
  }, []);

  function saveLocation() {
    const preferences = readPreferences();
    savePreferences({
      ...preferences,
      instrumentLatitude: latitude,
      instrumentLongitude: longitude,
      instrumentTimeZone: timeZone === "manual" ? manualTimezoneOffset : timeZone,
      instrumentLocationName: locationName || "Saved instrument location"
    });
    localStorage.setItem("aetherica-planetary-location", JSON.stringify({ locationName, latitude, longitude, timeZone, manualTimezoneOffset, timezoneOffset }));
    setNotice("Favorite location saved in this browser.");
  }

  function loadLocation() {
    const saved = localStorage.getItem("aetherica-planetary-location");
    if (!saved) {
      setNotice("No favorite location has been saved yet.");
      return;
    }
    const parsed = JSON.parse(saved) as { locationName?: string; latitude: string; longitude: string; timeZone?: string; manualTimezoneOffset?: string; timezoneOffset?: string };
    setLocationName(parsed.locationName || "Saved instrument location");
    setLatitude(parsed.latitude);
    setLongitude(parsed.longitude);
    setTimeZone(parsed.timeZone || (parsed.timezoneOffset ? "manual" : "local"));
    setManualTimezoneOffset(parsed.manualTimezoneOffset || parsed.timezoneOffset || localTimezoneOffset());
    setNotice("Favorite location loaded.");
  }

  async function copyCurrentHour() {
    await navigator.clipboard.writeText(`Hour of ${status.current.name}: ${formatClock(status.current.start, clockMode)}-${formatClock(status.current.end, clockMode)} on ${date}`);
    setNotice("Current planetary hour copied.");
  }

  function saveCurrentCalculation() {
    setNotice("Saved instrument data is coming soon with sign up and login.");
  }

  function scheduleCurrentAlert() {
    setNotice("Scheduled alerts are coming soon with sign up and login.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[23rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Calculation controls</p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-parchment">
            Date
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Current time
            <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
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
            <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={clockMode} onChange={(event) => setClockMode(event.target.value as "12" | "24")}>
              <option value="12">12-hour</option>
              <option value="24">24-hour</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded border border-gold/30 px-3 py-2 text-sm text-gold" onClick={saveLocation} type="button">Save</button>
            <button className="rounded border border-gold/30 px-3 py-2 text-sm text-gold" onClick={loadLocation} type="button">Load saved</button>
            <button className="rounded border border-gold/30 px-3 py-2 text-sm text-gold" onClick={() => setDate(todayInput())} type="button">Today</button>
          </div>
          {notice ? <p className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-sm text-parchment">{notice}</p> : null}
        </div>
      </aside>

      <section className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
          <div className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_46%,rgba(181,146,85,.22),transparent_18rem),linear-gradient(90deg,rgba(181,146,85,.08),transparent_50%,rgba(122,17,26,.16))]" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.26em] text-gold">Current planetary hour</p>
                <h2 className="font-manuscript-title mt-2 font-display text-5xl text-ivory">Hour of {status.current.name}</h2>
              </div>
              <div className="grid size-24 place-items-center rounded-full border border-gold/35 text-6xl text-gold" style={{ color: activePlanet.color }}>
                {activePlanet.glyph}
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-parchment sm:grid-cols-4">
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Starts</span>{formatClock(status.current.start, clockMode)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Ends</span>{formatClock(status.current.end, clockMode)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Remaining</span>{formatDuration(status.remaining)}</p>
              <p><span className="block text-xs uppercase tracking-[.2em] text-gold">Day ruler</span>{dayRuler(dateObject)}</p>
            </div>
            <p className="mt-5 max-w-3xl leading-7 text-parchment">{activePlanet.quality}</p>
          </div>
          <div className="temple-border rounded p-5">
            <p className="text-xs uppercase tracking-[.24em] text-gold">Traditional activities</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activePlanet.activities.map((activity) => (
                <span key={activity} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{activity}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="rounded border border-gold/30 p-2 text-gold" onClick={copyCurrentHour} type="button" aria-label="Copy current hour"><Copy size={18} /></button>
              <a className="rounded border border-gold/30 p-2 text-gold" href={calendarHref(status.current, date)} target="_blank" rel="noreferrer" aria-label="Add current hour to calendar"><CalendarPlus size={18} /></a>
            </div>
            <div className="mt-4 grid gap-2">
              <textarea className="min-h-20 rounded border border-gold/20 bg-black/35 px-3 py-2 text-sm text-ivory" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Research note for this hour..." />
              <button className="rounded border border-gold/35 px-3 py-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={saveCurrentCalculation}>Save coming soon</button>
              <button className="rounded border border-gold/25 px-3 py-2 text-sm text-parchment hover:bg-gold/10 hover:text-ivory" type="button" onClick={scheduleCurrentAlert}>Alerts coming soon</button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["wheel", "timeline", "table", "minimal"] as ViewMode[]).map((mode) => (
            <button key={mode} className={`rounded border px-4 py-2 text-sm uppercase tracking-[.16em] ${view === mode ? "border-gold bg-gold/15 text-ivory" : "border-gold/25 text-gold"}`} onClick={() => setView(mode)} type="button">
              {mode}
            </button>
          ))}
        </div>

        {view === "wheel" ? <PlanetaryWheel hours={calculation.hours} current={status.current} clockMode={clockMode} sunrise={calculation.sunrise} sunset={calculation.sunset} /> : null}
        {view === "timeline" ? <HourTimeline hours={calculation.hours} current={status.current} clockMode={clockMode} /> : null}
        {view === "table" ? (
          <div className="temple-border rounded p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[.24em] text-gold">Daily planetary hours table</p>
              <select className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={filterPlanet} onChange={(event) => setFilterPlanet(event.target.value as "All" | PlanetName)}>
                <option>All</option>
                {(Object.keys(planets) as PlanetName[]).map((planet) => <option key={planet}>{planet}</option>)}
              </select>
            </div>
            <HourTable hours={visibleHours} current={status.current} clockMode={clockMode} />
          </div>
        ) : null}
        {view === "minimal" ? (
          <div className="temple-border rounded p-6 text-center">
            <p className="text-xs uppercase tracking-[.24em] text-gold">Minimal view</p>
            <p className="mt-3 font-display text-4xl text-ivory">{planets[status.current.name].glyph} {status.current.name}</p>
            <p className="mt-2 text-parchment">{formatClock(status.current.start, clockMode)} - {formatClock(status.current.end, clockMode)} · {formatDuration(status.remaining)} remaining</p>
          </div>
        ) : null}

        <div className="temple-border rounded p-5">
          <p className="text-xs uppercase tracking-[.24em] text-gold">Best upcoming daylight Jupiter hours</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {daylightJupiter.map((hour) => (
              <div key={hour.index} className="rounded border border-gold/20 bg-black/30 p-4">
                <Star className="text-gold" size={18} />
                <p className="mt-2 text-ivory">Hour {hour.index}</p>
                <p className="text-sm text-parchment">{formatClock(hour.start, clockMode)} - {formatClock(hour.end, clockMode)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanetaryWheel({ hours, current, clockMode, sunrise, sunset }: { hours: TimeBlock<PlanetName>[]; current: TimeBlock<PlanetName>; clockMode: "12" | "24"; sunrise: number; sunset: number }) {
  return (
    <div className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/80 p-6 shadow-aureate">
      <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_180deg,rgba(181,146,85,.2),rgba(181,146,85,.06),rgba(122,17,26,.18),rgba(8,8,8,.5),rgba(181,146,85,.2))]" />
      <div className="mx-auto grid aspect-square max-w-2xl place-items-center rounded-full border border-gold/25 bg-black/50 p-8">
        <div className="relative size-full rounded-full border border-gold/20">
          <div className="absolute inset-8 rounded-full border border-gold/10 bg-[linear-gradient(90deg,rgba(181,146,85,.16)_0_50%,rgba(0,0,0,.45)_50%_100%)]" />
          {hours.map((hour, index) => {
            const angle = (index / 24) * 360 - 90;
            const isCurrent = hour.index === current.index;
            return (
              <div key={hour.index} className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black/80 text-xl" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-265%) rotate(${-angle}deg)`, borderColor: isCurrent ? planets[hour.name].color : "rgba(181,146,85,.22)", color: isCurrent ? planets[hour.name].color : "#b59255", boxShadow: isCurrent ? `0 0 28px ${planets[hour.name].color}` : undefined }}>
                {planets[hour.name].glyph}
              </div>
            );
          })}
          <div className="absolute inset-[36%] grid place-items-center rounded-full border border-gold/35 bg-black text-center">
            <span className="text-5xl text-gold">{planets[current.name].glyph}</span>
            <span className="text-xs uppercase tracking-[.18em] text-parchment">{current.name}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm text-parchment">
        <span><MapPin className="mr-1 inline text-gold" size={15} />Sunrise {formatClock(sunrise, clockMode)}</span>
        <span>Sunset {formatClock(sunset, clockMode)}</span>
      </div>
    </div>
  );
}

function HourTimeline({ hours, current, clockMode }: { hours: TimeBlock<PlanetName>[]; current: TimeBlock<PlanetName>; clockMode: "12" | "24" }) {
  return (
    <div className="grid gap-2">
      {hours.map((hour) => (
        <div key={hour.index} className={`grid gap-3 rounded border p-3 sm:grid-cols-[5rem_7rem_1fr] ${hour.index === current.index ? "border-gold bg-gold/10" : "border-gold/15 bg-black/30"}`}>
          <span className="text-gold">Hour {hour.index}</span>
          <span className="text-parchment">{formatClock(hour.start, clockMode)} - {formatClock(hour.end, clockMode)}</span>
          <span className="text-ivory">{planets[hour.name].glyph} {hour.name} · {hour.phase}</span>
        </div>
      ))}
    </div>
  );
}

function HourTable({ hours, current, clockMode }: { hours: TimeBlock<PlanetName>[]; current: TimeBlock<PlanetName>; clockMode: "12" | "24" }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[42rem] border-collapse text-left">
        <thead className="text-xs uppercase tracking-[.18em] text-gold">
          <tr className="border-b border-gold/20">
            <th className="py-3">Hour</th>
            <th>Planet</th>
            <th>Start</th>
            <th>End</th>
            <th>Phase</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour.index} className={`border-b border-gold/10 ${hour.index === current.index ? "bg-gold/10" : ""}`}>
              <td className="py-3 text-gold">{hour.index}</td>
              <td className="text-ivory">{planets[hour.name].glyph} {hour.name}</td>
              <td className="text-parchment">{formatClock(hour.start, clockMode)}</td>
              <td className="text-parchment">{formatClock(hour.end, clockMode)}</td>
              <td className="capitalize text-parchment">{hour.phase}</td>
              <td className="max-w-sm text-sm text-parchment">{planets[hour.name].quality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
