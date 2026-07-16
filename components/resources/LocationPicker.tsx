"use client";

import type { PointerEvent } from "react";
import { LocateFixed, MapPin } from "lucide-react";
import { localTimezoneOffset } from "./time-zones";

export type LocationPreset = {
  label: string;
  country: string;
  region: string;
  latitude: string;
  longitude: string;
  timeZone: string;
};

export const locationPresets: LocationPreset[] = [
  { label: "Denver, Colorado", country: "United States", region: "Mountain", latitude: "39.7392", longitude: "-104.9903", timeZone: "America/Denver" },
  { label: "Chicago, Illinois", country: "United States", region: "Central", latitude: "41.8781", longitude: "-87.6298", timeZone: "America/Chicago" },
  { label: "New York City, New York", country: "United States", region: "Eastern", latitude: "40.7128", longitude: "-74.0060", timeZone: "America/New_York" },
  { label: "Los Angeles, California", country: "United States", region: "Pacific", latitude: "34.0522", longitude: "-118.2437", timeZone: "America/Los_Angeles" },
  { label: "Seattle, Washington", country: "United States", region: "Pacific", latitude: "47.6062", longitude: "-122.3321", timeZone: "America/Los_Angeles" },
  { label: "Austin, Texas", country: "United States", region: "Central", latitude: "30.2672", longitude: "-97.7431", timeZone: "America/Chicago" },
  { label: "London", country: "United Kingdom", region: "England", latitude: "51.5072", longitude: "-0.1276", timeZone: "Europe/London" },
  { label: "Paris", country: "France", region: "Ile-de-France", latitude: "48.8566", longitude: "2.3522", timeZone: "Europe/Paris" },
  { label: "Athens", country: "Greece", region: "Attica", latitude: "37.9838", longitude: "23.7275", timeZone: "Europe/Athens" },
  { label: "Jerusalem", country: "Israel", region: "Judean Mountains", latitude: "31.7683", longitude: "35.2137", timeZone: "Asia/Jerusalem" },
  { label: "Cairo", country: "Egypt", region: "Cairo Governorate", latitude: "30.0444", longitude: "31.2357", timeZone: "Africa/Cairo" },
  { label: "Delhi", country: "India", region: "National Capital Territory", latitude: "28.6139", longitude: "77.2090", timeZone: "Asia/Kolkata" },
  { label: "Tokyo", country: "Japan", region: "Kanto", latitude: "35.6762", longitude: "139.6503", timeZone: "Asia/Tokyo" },
  { label: "Sydney", country: "Australia", region: "New South Wales", latitude: "-33.8688", longitude: "151.2093", timeZone: "Australia/Sydney" },
  { label: "Mexico City", country: "Mexico", region: "Central Mexico", latitude: "19.4326", longitude: "-99.1332", timeZone: "America/Mexico_City" },
  { label: "Toronto", country: "Canada", region: "Ontario", latitude: "43.6532", longitude: "-79.3832", timeZone: "America/Toronto" },
  { label: "Vancouver", country: "Canada", region: "British Columbia", latitude: "49.2827", longitude: "-123.1207", timeZone: "America/Vancouver" },
  { label: "Sao Paulo", country: "Brazil", region: "Southeast", latitude: "-23.5558", longitude: "-46.6396", timeZone: "America/Sao_Paulo" }
];

type LocationPickerProps = {
  latitude: string;
  longitude: string;
  locationName: string;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
  setLocationName: (value: string) => void;
  setTimeZone: (value: string) => void;
  setManualTimezoneOffset: (value: string) => void;
  setNotice: (value: string) => void;
};

export function LocationPicker({
  latitude,
  longitude,
  locationName,
  setLatitude,
  setLongitude,
  setLocationName,
  setTimeZone,
  setManualTimezoneOffset,
  setNotice
}: LocationPickerProps) {
  const matchingPresets = locationPresets.filter((preset) => {
    const query = locationName.toLowerCase();
    return !query || `${preset.label} ${preset.country} ${preset.region}`.toLowerCase().includes(query);
  }).slice(0, 8);

  function applyPreset(preset: LocationPreset) {
    setLocationName(`${preset.label}, ${preset.country}`);
    setLatitude(preset.latitude);
    setLongitude(preset.longitude);
    setTimeZone(preset.timeZone);
    setNotice(`Location set to ${preset.label}.`);
  }

  function useDeviceLocation() {
    if (!navigator.geolocation) {
      setNotice("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationName("Device location");
        setLatitude(position.coords.latitude.toFixed(4));
        setLongitude(position.coords.longitude.toFixed(4));
        setTimeZone("local");
        setManualTimezoneOffset(localTimezoneOffset());
        setNotice("Location set from this device.");
      },
      () => setNotice("Location permission was not granted.")
    );
  }

  function mapPointer(event: PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    const nextLongitude = (x * 360) - 180;
    const nextLatitude = 90 - (y * 180);
    setLocationName("Map selection");
    setLatitude(nextLatitude.toFixed(4));
    setLongitude(nextLongitude.toFixed(4));
    setNotice("Location set from the coordinate map. Choose the closest time zone separately if needed.");
  }

  const latitudeNumber = Number(latitude);
  const longitudeNumber = Number(longitude);
  const markerLeft = Number.isFinite(longitudeNumber) ? `${((longitudeNumber + 180) / 360) * 100}%` : "50%";
  const markerTop = Number.isFinite(latitudeNumber) ? `${((90 - latitudeNumber) / 180) * 100}%` : "50%";

  return (
    <div className="grid gap-3 rounded border border-gold/15 bg-black/20 p-3">
      <label className="grid gap-2 text-sm text-parchment">
        Country, city, or place
        <input
          className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory"
          value={locationName}
          onChange={(event) => setLocationName(event.target.value)}
          placeholder="Search or type a location"
        />
      </label>

      {matchingPresets.length ? (
        <div className="grid gap-2">
          {matchingPresets.map((preset) => (
            <button key={`${preset.label}-${preset.country}`} className="flex items-center justify-between gap-3 rounded border border-gold/15 bg-black/25 px-3 py-2 text-left text-sm text-parchment hover:border-gold/40 hover:bg-gold/10" type="button" onClick={() => applyPreset(preset)}>
              <span><MapPin className="mr-2 inline text-gold" size={14} />{preset.label}</span>
              <span className="text-xs uppercase tracking-[.12em] text-limestone">{preset.country}</span>
            </button>
          ))}
        </div>
      ) : null}

      <button className="relative min-h-44 overflow-hidden rounded border border-gold/25 bg-[radial-gradient(circle_at_50%_50%,rgba(181,146,85,.22),transparent_17rem),linear-gradient(135deg,rgba(20,12,10,.95),rgba(5,5,5,.92))] text-left" type="button" onPointerDown={mapPointer} aria-label="Select latitude and longitude on a coordinate map">
        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(181,146,85,.16)_25%,transparent_26%,transparent_49%,rgba(181,146,85,.22)_50%,transparent_51%,transparent_74%,rgba(181,146,85,.16)_75%,transparent_76%),linear-gradient(0deg,transparent_24%,rgba(181,146,85,.12)_25%,transparent_26%,transparent_49%,rgba(181,146,85,.2)_50%,transparent_51%,transparent_74%,rgba(181,146,85,.12)_75%,transparent_76%)]" />
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold/30" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-gold/30" />
        <span className="absolute left-3 top-3 text-xs uppercase tracking-[.18em] text-gold">Coordinate map</span>
        <span className="absolute bottom-3 left-3 text-xs text-limestone">Click anywhere to set latitude and longitude</span>
        <span className="absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-crimson shadow-[0_0_22px_rgba(181,146,85,.75)]" style={{ left: markerLeft, top: markerTop }}>
          <span className="size-1.5 rounded-full bg-ivory" />
        </span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-2 text-sm text-parchment">
          Latitude
          <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={latitude} onChange={(event) => setLatitude(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm text-parchment">
          Longitude
          <input className="rounded border border-gold/25 bg-black/45 px-3 py-2 text-ivory" value={longitude} onChange={(event) => setLongitude(event.target.value)} />
        </label>
      </div>

      <button className="rounded border border-gold/30 px-3 py-2 text-sm text-gold hover:bg-gold/10" onClick={useDeviceLocation} type="button">
        <LocateFixed className="mr-2 inline" size={15} />Use current location
      </button>
    </div>
  );
}
