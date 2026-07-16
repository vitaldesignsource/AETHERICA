import { describe, expect, it } from "vitest";
import { formatSeconds, slugify } from "@/lib/format";

describe("format utilities", () => {
  it("formats playback time", () => {
    expect(formatSeconds(65)).toBe("1:05");
    expect(formatSeconds(3665)).toBe("1:01:05");
  });

  it("creates slugs", () => {
    expect(slugify("The Alchemy of Consciousness")).toBe("the-alchemy-of-consciousness");
  });
});
