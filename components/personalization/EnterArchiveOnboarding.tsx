"use client";

import Link from "next/link";
import { Archive, BookOpenCheck, Check, Compass, Headphones, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  type ArchivePreferences,
  explorationModes,
  interestOptions,
  playerInstruments,
  readPreferences,
  savePreferences,
  startingPaths
} from "./preferences";

const modeIcons = {
  Listen: Headphones,
  Study: BookOpenCheck,
  Research: Search
};

function nextInterests(current: string[], interest: string) {
  return current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest];
}

export function EnterArchiveOnboarding() {
  const [preferences, setPreferences] = useState<ArchivePreferences>(() => readPreferences());
  const [visible, setVisible] = useState(() => !readPreferences().onboarded);
  const [step, setStep] = useState(0);

  const update = (partial: Partial<ArchivePreferences>) => {
    setPreferences((current) => ({ ...current, ...partial }));
  };

  const finish = (partial: Partial<ArchivePreferences> = {}) => {
    const next = { ...preferences, ...partial, onboarded: true };
    setPreferences(next);
    savePreferences(next);
    setVisible(false);
  };

  if (!visible) {
    return (
      <section className="mx-auto -mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="focus-ring temple-border inline-flex items-center gap-2 rounded px-4 py-3 text-sm text-ivory hover:border-gold/60"
          onClick={() => setVisible(true)}
        >
          <Archive className="h-4 w-4 text-gold" aria-hidden="true" />
          Enter the Archive
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto -mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="temple-border rounded p-5 shadow-aureate">
        <div className="flex flex-col gap-4 border-b border-gold/15 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Optional onboarding</p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Enter the Archive</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">
              Choose a starting orientation. This shapes the first page and can be changed later in My Archive.
            </p>
          </div>
          <button className="focus-ring rounded border border-gold/30 px-4 py-2 text-sm text-parchment hover:text-ivory" type="button" onClick={() => finish()}>
            Skip for now
          </button>
        </div>

        {step === 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {explorationModes.map((mode) => {
              const Icon = modeIcons[mode.title];
              const selected = preferences.explorationMode === mode.title;
              return (
                <button
                  key={mode.title}
                  className={`focus-ring rounded border p-5 text-left transition ${selected ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
                  type="button"
                  onClick={() => update({ explorationMode: mode.title })}
                >
                  <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-2xl text-ivory">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-parchment">{mode.description}</p>
                </button>
              );
            })}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-5">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">Choose your interests</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const selected = preferences.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    className={`focus-ring inline-flex items-center gap-2 rounded border px-3 py-2 text-sm ${selected ? "border-gold bg-gold text-obsidian" : "border-gold/25 text-parchment hover:text-ivory"}`}
                    type="button"
                    onClick={() => update({ interests: nextInterests(preferences.interests, interest) })}
                  >
                    {selected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gold">Choose your player instrument</p>
              <div className="mt-4 grid gap-2">
                {playerInstruments.map((instrument) => (
                  <button
                    key={instrument}
                    className={`focus-ring rounded border px-4 py-3 text-left text-sm ${preferences.playerInstrument === instrument ? "border-gold bg-gold/10 text-ivory" : "border-gold/20 text-parchment hover:text-ivory"}`}
                    type="button"
                    onClick={() => update({ playerInstrument: instrument })}
                  >
                    {instrument}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded border border-gold/20 bg-black/35 p-5">
              <div className="absolute inset-0 opacity-35" style={{ background: previewBackground(preferences.playerInstrument) }} />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">Live preview</p>
                <h3 className="mt-3 font-display text-3xl text-ivory">The Temple Has No Guard</h3>
                <p className="mt-2 text-sm leading-6 text-parchment">Same episode, tuned through the {preferences.playerInstrument.toLowerCase()} interface.</p>
                <div className="mt-6 h-2 rounded-full bg-ivory/10">
                  <div className="h-full w-1/3 rounded-full bg-gold" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.16em] text-parchment">
                  <span className="rounded border border-gold/20 py-2">Transcript</span>
                  <span className="rounded border border-gold/20 py-2">Chapters</span>
                  <span className="rounded border border-gold/20 py-2">Notes</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-5">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">Choose a starting path</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {startingPaths.map((path) => (
                <button
                  key={path}
                  className={`focus-ring rounded border p-4 text-left ${preferences.startingPath === path ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
                  type="button"
                  onClick={() => update({ startingPath: path })}
                >
                  <Compass className="h-5 w-5 text-gold" aria-hidden="true" />
                  <span className="mt-3 block font-display text-xl text-ivory">{path}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <button
              className="focus-ring rounded border border-gold bg-gold/10 p-5 text-left"
              type="button"
              onClick={() => finish({ profileIntent: "Continue without account" })}
            >
              <Sparkles className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl text-ivory">Continue without account</h3>
              <p className="mt-2 text-sm leading-6 text-parchment">Your choices, saves, playlists, and notes stay private in this browser.</p>
            </button>
            <Link
              className="focus-ring rounded border border-gold/25 p-5 text-left hover:border-gold/60"
              href="/library#profile"
              onClick={() => finish({ profileIntent: "Create profile later" })}
            >
              <Archive className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl text-ivory">Prepare profile settings</h3>
              <p className="mt-2 text-sm leading-6 text-parchment">Set your archive identity and sync-ready preferences before accounts are connected.</p>
            </Link>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 border-t border-gold/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-limestone">Step {step + 1} of 5</p>
          <div className="flex gap-2">
            <button
              className="focus-ring rounded border border-gold/25 px-4 py-2 text-sm text-parchment disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Back
            </button>
            {step < 4 ? (
              <button className="focus-ring rounded bg-gold px-4 py-2 text-sm font-semibold text-obsidian hover:bg-ivory" type="button" onClick={() => setStep((value) => value + 1)}>
                Continue
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function previewBackground(instrument: string) {
  if (instrument === "Astrological") return "radial-gradient(circle at 50% 45%, rgba(181,146,85,.4), transparent 18rem), conic-gradient(from 20deg, rgba(181,146,85,.22), rgba(122,17,26,.2), transparent, rgba(181,146,85,.22))";
  if (instrument === "Alchemical") return "linear-gradient(135deg, rgba(181,146,85,.28), transparent 35%), radial-gradient(circle at 20% 80%, rgba(122,17,26,.35), transparent 18rem)";
  if (instrument === "Rosicrucian") return "radial-gradient(circle at 50% 50%, rgba(122,17,26,.38), transparent 16rem), linear-gradient(90deg, rgba(181,146,85,.18), transparent, rgba(181,146,85,.18))";
  if (instrument === "Minimal Archive") return "linear-gradient(180deg, rgba(231,221,204,.08), rgba(0,0,0,.28))";
  return "radial-gradient(circle at 50% 45%, rgba(181,146,85,.38), transparent 14rem), linear-gradient(135deg, rgba(181,146,85,.18), rgba(122,17,26,.18))";
}
