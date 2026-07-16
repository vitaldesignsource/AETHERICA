import { describe, expect, it } from "vitest";
import { searchArchive } from "@/lib/search/local";

describe("archive search", () => {
  it("returns transcript timestamp results", () => {
    const results = searchArchive("origins of freemasonry and the knights templar");
    expect(results.some((result) => result.href.includes("/episodes/on-the-mysteries?t=0"))).toBe(true);
  });
});
