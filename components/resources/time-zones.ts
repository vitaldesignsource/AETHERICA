export const timeZoneOptions = [
  { label: "Use this device", value: "local" },
  { label: "US Eastern", value: "America/New_York" },
  { label: "US Central", value: "America/Chicago" },
  { label: "US Mountain", value: "America/Denver" },
  { label: "US Pacific", value: "America/Los_Angeles" },
  { label: "Alaska", value: "America/Anchorage" },
  { label: "Hawaii", value: "Pacific/Honolulu" },
  { label: "UTC", value: "UTC" },
  { label: "London", value: "Europe/London" },
  { label: "Paris / Berlin", value: "Europe/Paris" },
  { label: "Athens", value: "Europe/Athens" },
  { label: "Jerusalem", value: "Asia/Jerusalem" },
  { label: "Cairo", value: "Africa/Cairo" },
  { label: "Delhi", value: "Asia/Kolkata" },
  { label: "Tokyo", value: "Asia/Tokyo" },
  { label: "Sydney", value: "Australia/Sydney" },
  { label: "Manual UTC offset", value: "manual" }
] as const;

export function browserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
}

export function isNumericOffset(value: string) {
  return /^-?\d+(\.\d+)?$/.test(value.trim());
}

export function timeZoneSelectionFromPreference(value: string) {
  if (!value) return browserTimeZone();
  if (isNumericOffset(value)) return "manual";
  return value;
}

export function manualOffsetFromPreference(value: string) {
  return isNumericOffset(value) ? value : localTimezoneOffset();
}

export function localTimezoneOffset() {
  return String(-new Date().getTimezoneOffset() / 60);
}

export function timezoneOffsetFor(date: Date, timeZone: string) {
  if (timeZone === "manual") return Number(localTimezoneOffset());
  if (timeZone === "local") return -date.getTimezoneOffset() / 60;
  if (timeZone === "UTC") return 0;

  try {
    const offsetName = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset"
    }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value;

    if (!offsetName || offsetName === "GMT" || offsetName === "UTC") return 0;
    const match = offsetName.match(/GMT([+-]\d{1,2})(?::?(\d{2}))?/);
    if (!match) return -date.getTimezoneOffset() / 60;

    const hour = Number(match[1]);
    const minute = Number(match[2] || "0") / 60;
    return hour < 0 ? hour - minute : hour + minute;
  } catch {
    return -date.getTimezoneOffset() / 60;
  }
}

export function formattedUtcOffset(offset: number) {
  const sign = offset >= 0 ? "+" : "-";
  const absolute = Math.abs(offset);
  const hours = Math.floor(absolute);
  const minutes = Math.round((absolute - hours) * 60);
  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""}`;
}

export function timeZoneOptionsForSelection(selected: string) {
  if (!selected || timeZoneOptions.some((option) => option.value === selected)) return timeZoneOptions;
  return [{ label: selected.replace(/_/g, " "), value: selected }, ...timeZoneOptions];
}
