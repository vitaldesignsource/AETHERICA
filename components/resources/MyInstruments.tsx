"use client";

import Link from "next/link";
import { Bell, Clock3, Compass, FileText, MapPin, NotebookPen, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { activeBlock, calculateSolarTimes, formatDuration, planetaryHours, planets, tattvas, tattvicTides } from "./calculations";
import { isNumericOffset, localTimezoneOffset, timezoneOffsetFor } from "./time-zones";
import {
  instrumentNotesKey,
  readJson,
  savedCalculationsKey,
  scheduledAlertsKey,
  toolHistoryKey,
  type ResearchNote,
  type SavedCalculation,
  type ScheduledAlert,
  type ToolHistory,
  writeJson
} from "./instrument-storage";
import { readPreferences } from "@/components/personalization/preferences";

function currentMinute() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function MyInstruments() {
  const [saved, setSaved] = useState<SavedCalculation[]>([]);
  const [alerts, setAlerts] = useState<ScheduledAlert[]>([]);
  const [history, setHistory] = useState<ToolHistory[]>([]);
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [draftNote, setDraftNote] = useState("");
  const [now, setNow] = useState(() => new Date());

  const preferences = readPreferences();
  const latitude = Number(preferences.instrumentLatitude || "39.7392");
  const longitude = Number(preferences.instrumentLongitude || "-104.9903");
  const savedTimeZone = preferences.instrumentTimeZone || localTimezoneOffset();

  const current = useMemo(() => {
    const date = new Date(`${now.toISOString().slice(0, 10)}T12:00:00`);
    const timezoneOffset = isNumericOffset(savedTimeZone) ? Number(savedTimeZone) : timezoneOffsetFor(date, savedTimeZone);
    const minute = currentMinute();
    const planetary = planetaryHours(date, latitude, longitude, timezoneOffset);
    const planetaryStatus = activeBlock(planetary.hours, minute);
    const solar = calculateSolarTimes(date, latitude, longitude, timezoneOffset);
    const tides = tattvicTides(solar.sunrise, minute, 24, true);
    const tideStatus = activeBlock(tides, minute);
    return { planetaryStatus, tideStatus };
  }, [latitude, longitude, savedTimeZone, now]);

  useEffect(() => {
    const refresh = () => {
      setSaved(readJson<SavedCalculation[]>(savedCalculationsKey, []));
      setAlerts(readJson<ScheduledAlert[]>(scheduledAlertsKey, []));
      setHistory(readJson<ToolHistory[]>(toolHistoryKey, []));
      setNotes(readJson<ResearchNote[]>(instrumentNotesKey, []));
      setNow(new Date());
    };
    refresh();
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener("aetherica-instruments-changed", refresh);
    window.addEventListener("aetherica-preferences-changed", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("aetherica-instruments-changed", refresh);
      window.removeEventListener("aetherica-preferences-changed", refresh);
    };
  }, []);

  function removeSaved(id: string) {
    const next = saved.filter((item) => item.id !== id);
    setSaved(next);
    writeJson(savedCalculationsKey, next);
  }

  function addNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draftNote.trim()) return;
    const next = [
      { id: crypto.randomUUID(), tool: "My Instruments", note: draftNote.trim(), savedAt: new Date().toISOString() },
      ...notes
    ].slice(0, 12);
    setNotes(next);
    writeJson(instrumentNotesKey, next);
    setDraftNote("");
  }

  return (
    <section id="my-instruments" className="temple-border rounded p-5">
      <div className="flex flex-col gap-4 border-b border-gold/15 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-gold">My Instruments</p>
          <h2 className="mt-2 font-display text-3xl text-ivory">Timing tools and saved calculations</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">
            Instrument preferences, saved calculations, alerts, recent use, and research notes live privately in this browser.
          </p>
        </div>
        <Link className="focus-ring rounded border border-gold/40 px-4 py-2 text-sm uppercase tracking-[.16em] text-gold hover:bg-gold/10" href="/resources">
          Open Resources
        </Link>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        <InstrumentStat icon={Clock3} label="Current planetary hour" value={current.planetaryStatus.current.name} detail={`${planets[current.planetaryStatus.current.name].glyph} ${formatDuration(current.planetaryStatus.remaining)} remaining`} />
        <InstrumentStat icon={Compass} label="Current tattvic tide" value={current.tideStatus.current.name} detail={`${tattvas[current.tideStatus.current.name].symbol} ${current.tideStatus.current.subName ? `within ${current.tideStatus.current.subName}` : "primary tide"}`} />
        <InstrumentStat icon={Bell} label="Scheduled alerts" value={String(alerts.length)} detail={preferences.instrumentNotifications ? "Notifications enabled" : "Notifications disabled"} />
        <InstrumentStat icon={MapPin} label="Default location" value={preferences.instrumentLocationName || "Saved location"} detail={`${preferences.instrumentLatitude}, ${preferences.instrumentLongitude}`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="grid gap-6">
          <Panel title="Saved calculations" icon={FileText}>
            {saved.length ? (
              <div className="grid gap-3">
                {saved.map((item) => (
                  <article key={item.id} className="rounded border border-gold/15 bg-black/25 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[.16em] text-gold">{item.kind}</p>
                        <h3 className="mt-1 font-display text-xl text-ivory">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-parchment">{item.detail}</p>
                      </div>
                      <button className="focus-ring rounded p-2 text-parchment hover:bg-crimson/20 hover:text-ivory" type="button" onClick={() => removeSaved(item.id)} aria-label={`Remove ${item.title}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <p className="text-sm text-limestone">No calculations saved yet. Open a resource calculator and save the current hour or tide.</p>}
          </Panel>

          <Panel title="Research notes" icon={NotebookPen}>
            <form className="grid gap-3" onSubmit={addNote}>
              <textarea className="focus-ring min-h-24 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={draftNote} onChange={(event) => setDraftNote(event.target.value)} placeholder="Note a timing experiment, observation, or preferred method..." />
              <button className="focus-ring rounded bg-gold px-4 py-2 font-semibold text-obsidian hover:bg-ivory">Save Note</button>
            </form>
            <div className="mt-4 grid gap-3">
              {notes.map((note) => (
                <p key={note.id} className="rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-parchment">{note.note}</p>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-6">
          <Panel title="Scheduled alerts" icon={Bell}>
            {alerts.length ? alerts.map((alert) => (
              <div key={alert.id} className="rounded border border-gold/15 p-3 text-sm text-parchment">{alert.title} · {alert.time}</div>
            )) : <p className="text-sm text-limestone">No alerts scheduled yet.</p>}
          </Panel>
          <Panel title="Recent tool history" icon={Clock3}>
            {history.length ? history.slice(0, 8).map((item) => (
              <div key={item.id} className="rounded border border-gold/15 p-3 text-sm text-parchment">
                <p className="text-gold">{item.tool}</p>
                <p>{item.detail}</p>
              </div>
            )) : <p className="text-sm text-limestone">No recent tool history yet.</p>}
          </Panel>
        </div>
      </div>
    </section>
  );
}

function InstrumentStat({ icon: Icon, label, value, detail }: { icon: typeof Clock3; label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-gold/15 bg-black/25 p-4">
      <Icon className="text-gold" size={20} />
      <p className="mt-3 text-xs uppercase tracking-[.16em] text-gold">{label}</p>
      <p className="mt-2 font-display text-2xl text-ivory">{value}</p>
      <p className="mt-1 text-sm text-parchment">{detail}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Clock3; children: React.ReactNode }) {
  return (
    <section className="rounded border border-gold/15 bg-black/20 p-4">
      <div className="mb-4 flex items-center gap-3">
        <Icon className="text-gold" size={18} />
        <h3 className="font-display text-2xl text-ivory">{title}</h3>
      </div>
      {children}
    </section>
  );
}
