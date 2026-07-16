import { describe, expect, it } from "vitest";
import { calculateSolarTimes, dayRuler, planetaryHours, tattvicTides } from "@/components/resources/calculations";

function minutesFor(hour: number, minute: number) {
  return hour * 60 + minute;
}

describe("resource timing calculations", () => {
  it("keeps sunrise and sunset within trusted external-reference tolerance", () => {
    const samples = [
      {
        name: "Denver, CO",
        date: "2026-07-12",
        latitude: 39.7392,
        longitude: -104.9903,
        offset: -6,
        referenceSunrise: minutesFor(5, 41),
        referenceSunset: minutesFor(20, 30)
      },
      {
        name: "Queen Valley, AZ",
        date: "2026-07-12",
        latitude: 33.2987,
        longitude: -111.2985,
        offset: -7,
        referenceSunrise: minutesFor(5, 23),
        referenceSunset: minutesFor(19, 37)
      },
      {
        name: "London, UK",
        date: "2026-07-12",
        latitude: 51.5074,
        longitude: -0.1278,
        offset: 1,
        referenceSunrise: minutesFor(4, 55),
        referenceSunset: minutesFor(21, 16)
      }
    ];

    for (const sample of samples) {
      const result = calculateSolarTimes(new Date(`${sample.date}T12:00:00`), sample.latitude, sample.longitude, sample.offset);

      expect(Math.abs(result.sunrise - sample.referenceSunrise), sample.name).toBeLessThanOrEqual(3);
      expect(Math.abs(result.sunset - sample.referenceSunset), sample.name).toBeLessThanOrEqual(3);
    }
  });

  it("follows traditional planetary day rulers and Chaldean planetary-hour order", () => {
    const sunday = new Date("2026-07-12T12:00:00");
    const result = planetaryHours(sunday, 39.7392, -104.9903, -6);

    expect(dayRuler(sunday)).toBe("Sun");
    expect(result.ruler).toBe("Sun");
    expect(result.hours.slice(0, 7).map((hour) => hour.name)).toEqual(["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"]);
    expect(result.hours[12].name).toBe("Jupiter");
    expect(result.hours[0].phase).toBe("day");
    expect(result.hours[12].phase).toBe("night");
  });

  it("produces the common 24-minute tattvic tide sequence with five sub-tides", () => {
    const tides = tattvicTides(minutesFor(6, 0), minutesFor(6, 0), 24, true);

    expect(tides.slice(0, 10).map((tide) => [tide.name, tide.subName])).toEqual([
      ["Akasha", "Akasha"],
      ["Akasha", "Vayu"],
      ["Akasha", "Tejas"],
      ["Akasha", "Apas"],
      ["Akasha", "Prithivi"],
      ["Vayu", "Akasha"],
      ["Vayu", "Vayu"],
      ["Vayu", "Tejas"],
      ["Vayu", "Apas"],
      ["Vayu", "Prithivi"]
    ]);
    expect(tides[0].end - tides[0].start).toBeCloseTo(4.8);
    expect(tides[5].start - tides[0].start).toBe(24);
  });
});
