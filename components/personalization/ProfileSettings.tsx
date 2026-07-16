"use client";

import { Download, EyeOff, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import {
  type ArchivePreferences,
  avatarStyles,
  explorationModes,
  interestOptions,
  listeningModes,
  playerInstruments,
  readPreferences,
  savePreferences,
  startingPaths
} from "./preferences";

function toggleList(current: string[], value: string) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ProfileSettings() {
  const [preferences, setPreferences] = useState<ArchivePreferences>(() => readPreferences());
  const [savedAt, setSavedAt] = useState("");

  const update = (partial: Partial<ArchivePreferences>) => {
    const next = { ...preferences, ...partial };
    setPreferences(next);
    savePreferences(next);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
  };

  const exportPreferences = () => {
    downloadText(
      "aetherica-archive-preferences.md",
      [
        "# Aetherica Archive Preferences",
        "",
        `Display name: ${preferences.displayName || "Private listener"}`,
        `Public profile: ${preferences.publicProfile ? "Enabled" : "Private by default"}`,
        `Exploration mode: ${preferences.explorationMode}`,
        `Listening mode: ${preferences.listeningMode}`,
        `Player instrument: ${preferences.playerInstrument}`,
        `Starting path: ${preferences.startingPath}`,
        `Avatar style: ${preferences.avatarStyle}`,
        `Interests: ${preferences.interests.join(", ") || "None selected"}`,
        `Notifications: ${preferences.notifications ? "Enabled" : "Disabled"}`,
        `Reduced motion: ${preferences.reducedMotion ? "Enabled" : "Disabled"}`
      ].join("\n")
    );
  };

  return (
    <section id="profile" className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <article className="temple-border rounded p-5">
        <div className="flex items-center gap-3">
          <UserRound className="text-gold" aria-hidden="true" />
          <h2 className="font-display text-2xl text-ivory">Archive Identity</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-parchment">
          Public profiles are private by default. These settings prepare a scholarly profile without follower counts or popularity scoring.
        </p>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-parchment">
            Display name
            <input
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.displayName}
              onChange={(event) => update({ displayName: event.target.value })}
              placeholder="Private listener"
            />
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Symbolic avatar style
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.avatarStyle}
              onChange={(event) => update({ avatarStyle: event.target.value })}
            >
              {avatarStyles.map((style) => <option key={style}>{style}</option>)}
            </select>
          </label>
          <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
            <span className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-gold" aria-hidden="true" />
              Keep public profile private
            </span>
            <input
              type="checkbox"
              checked={!preferences.publicProfile}
              onChange={(event) => update({ publicProfile: !event.target.checked })}
            />
          </label>
        </div>
      </article>

      <article className="temple-border rounded p-5">
        <div className="flex items-center gap-3">
          <Settings className="text-gold" aria-hidden="true" />
          <h2 className="font-display text-2xl text-ivory">Interface Preferences</h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-parchment">
            Exploration mode
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.explorationMode}
              onChange={(event) => update({ explorationMode: event.target.value as ArchivePreferences["explorationMode"] })}
            >
              {explorationModes.map((mode) => <option key={mode.title}>{mode.title}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Listening mode
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.listeningMode}
              onChange={(event) => update({ listeningMode: event.target.value as ArchivePreferences["listeningMode"] })}
            >
              {listeningModes.map((mode) => <option key={mode}>{mode}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Player instrument
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.playerInstrument}
              onChange={(event) => update({ playerInstrument: event.target.value as ArchivePreferences["playerInstrument"] })}
            >
              {playerInstruments.map((instrument) => <option key={instrument}>{instrument}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-parchment">
            Starting path
            <select
              className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              value={preferences.startingPath}
              onChange={(event) => update({ startingPath: event.target.value })}
            >
              {startingPaths.map((path) => <option key={path}>{path}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-5">
          <p className="text-sm uppercase tracking-[0.18em] text-gold">Followed interests</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const selected = preferences.interests.includes(interest);
              return (
                <button
                  key={interest}
                  className={`focus-ring rounded border px-3 py-2 text-sm ${selected ? "border-gold bg-gold text-obsidian" : "border-gold/25 text-parchment hover:text-ivory"}`}
                  type="button"
                  onClick={() => update({ interests: toggleList(preferences.interests, interest) })}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
            Reduced motion preference
            <input type="checkbox" checked={preferences.reducedMotion} onChange={(event) => update({ reducedMotion: event.target.checked })} />
          </label>
          <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
            Event reminders
            <input type="checkbox" checked={preferences.notifications} onChange={(event) => update({ notifications: event.target.checked })} />
          </label>
        </div>

        <div className="mt-6 border-t border-gold/15 pt-5">
          <p className="text-sm uppercase tracking-[0.18em] text-gold">Instrument defaults</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-parchment">
              Default location
              <input
                className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
                value={preferences.instrumentLocationName}
                onChange={(event) => update({ instrumentLocationName: event.target.value })}
                placeholder="Denver, CO"
              />
            </label>
            <label className="grid gap-2 text-sm text-parchment">
              Time zone or UTC offset
              <input
                className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
                value={preferences.instrumentTimeZone}
                onChange={(event) => update({ instrumentTimeZone: event.target.value })}
                placeholder="America/Chicago or -5"
              />
            </label>
            <label className="grid gap-2 text-sm text-parchment">
              Latitude
              <input
                className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
                value={preferences.instrumentLatitude}
                onChange={(event) => update({ instrumentLatitude: event.target.value })}
                placeholder="39.7392"
              />
            </label>
            <label className="grid gap-2 text-sm text-parchment">
              Longitude
              <input
                className="focus-ring min-h-11 rounded border border-gold/25 bg-obsidian px-3 text-ivory"
                value={preferences.instrumentLongitude}
                onChange={(event) => update({ instrumentLongitude: event.target.value })}
                placeholder="-104.9903"
              />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
              Tool notifications
              <input type="checkbox" checked={preferences.instrumentNotifications} onChange={(event) => update({ instrumentNotifications: event.target.checked })} />
            </label>
            <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
              Planetary alerts
              <input type="checkbox" checked={preferences.planetaryAlerts} onChange={(event) => update({ planetaryAlerts: event.target.checked })} />
            </label>
            <label className="flex items-center justify-between gap-4 rounded border border-gold/15 p-3 text-sm text-parchment">
              Tattvic alerts
              <input type="checkbox" checked={preferences.tattvicAlerts} onChange={(event) => update({ tattvicAlerts: event.target.checked })} />
            </label>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-gold/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-limestone">{savedAt ? `Saved at ${savedAt}` : "Changes save privately in this browser."}</p>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/40 px-4 py-2 text-sm text-ivory hover:bg-gold/10" type="button" onClick={exportPreferences}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export Settings
          </button>
        </div>
      </article>
    </section>
  );
}
