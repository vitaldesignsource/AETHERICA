"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { locationSuggestions } from "@/lib/astrology/mock-adapter";
import type { SelectedLocation } from "@/lib/astrology/types";

type Props = {
  label?: string;
  selected?: SelectedLocation;
  onSelect: (location: SelectedLocation | undefined) => void;
  required?: boolean;
};

export function LocationAutocomplete({ label = "Location", selected, onSelect, required = false }: Props) {
  const id = useId();
  const [query, setQuery] = useState(selected?.label ?? "");
  const [debounced, setDebounced] = useState(query);
  const [manual, setManual] = useState(false);
  const [manualLocation, setManualLocation] = useState<SelectedLocation>({
    label: "Manual location",
    city: "Manual location",
    country: "Manual",
    latitude: 0,
    longitude: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "local"
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  const suggestions = useMemo(() => {
    const needle = debounced.trim().toLowerCase();
    if (!needle) return locationSuggestions.slice(0, 5);
    return locationSuggestions.filter((location) => location.label.toLowerCase().includes(needle)).slice(0, 6);
  }, [debounced]);

  const typedButUnselected = required && query.trim().length > 0 && query !== selected?.label;

  function select(location: SelectedLocation) {
    setQuery(location.label);
    onSelect(location);
  }

  function updateManual(next: Partial<SelectedLocation>) {
    const updated = { ...manualLocation, ...next };
    updated.label = `${updated.city || "Manual location"} (${updated.latitude.toFixed(4)}, ${updated.longitude.toFixed(4)})`;
    setManualLocation(updated);
    onSelect(updated);
    setQuery(updated.label);
  }

  return (
    <div className="grid gap-2">
      <label className="text-xs uppercase tracking-[.2em] text-gold" htmlFor={id}>{label}</label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-3 text-gold" size={16} />
        <input
          id={id}
          className="w-full rounded border border-gold/25 bg-black/55 py-2 pl-9 pr-3 text-sm text-ivory outline-none transition focus:border-gold"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            onSelect(undefined);
          }}
          placeholder="Search city, country, or place"
          aria-describedby={`${id}-help`}
          autoComplete="off"
        />
      </div>
      <p id={`${id}-help`} className="text-xs leading-5 text-parchment/75">
        Select a suggestion to calculate houses, local angles, sunrise, sunset, and planetary hours.
      </p>
      {typedButUnselected ? (
        <p className="rounded border border-crimson/40 bg-crimson/10 px-3 py-2 text-xs text-ivory" role="alert">
          Select a city from the suggestions to calculate houses and local angles.
        </p>
      ) : null}
      {query.trim() && suggestions.length ? (
        <div className="grid gap-1" role="listbox" aria-label={`${label} suggestions`}>
          {suggestions.map((location) => (
            <button
              key={location.label}
              className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-left text-sm text-parchment transition hover:border-gold/40 hover:bg-gold/10 focus:border-gold"
              type="button"
              onClick={() => select(location)}
            >
              <span className="block text-ivory">{location.city}</span>
              <span className="text-xs uppercase tracking-[.12em] text-limestone">{[location.region, location.country, location.timezone].filter(Boolean).join(" • ")}</span>
            </button>
          ))}
        </div>
      ) : null}
      <button className="w-fit text-xs uppercase tracking-[.16em] text-gold hover:text-ivory" type="button" onClick={() => setManual((value) => !value)}>
        {manual ? "Hide manual fallback" : "Manual latitude / longitude"}
      </button>
      {manual ? (
        <div className="grid gap-3 rounded border border-gold/15 bg-black/25 p-3 sm:grid-cols-3">
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">
            City
            <input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" value={manualLocation.city} onChange={(event) => updateManual({ city: event.target.value, country: "Manual" })} />
          </label>
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">
            Latitude
            <input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="number" step="0.0001" value={manualLocation.latitude} onChange={(event) => updateManual({ latitude: Number(event.target.value) })} />
          </label>
          <label className="grid gap-1 text-xs uppercase tracking-[.16em] text-gold">
            Longitude
            <input className="rounded border border-gold/20 bg-black/45 px-3 py-2 text-sm normal-case tracking-normal text-ivory" type="number" step="0.0001" value={manualLocation.longitude} onChange={(event) => updateManual({ longitude: Number(event.target.value) })} />
          </label>
        </div>
      ) : null}
    </div>
  );
}
