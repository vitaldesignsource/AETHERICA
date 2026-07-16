import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PlayerProvider } from "@/components/audio/PlayerProvider";
import { LivingArchiveCarouselClient } from "@/components/home/LivingArchiveCarousel/LivingArchiveCarouselClient";
import { buildLivingArchiveSlides } from "@/components/home/LivingArchiveCarousel/data";
import type { Episode } from "@/lib/data/types";

const episode: Episode = {
  slug: "the-alchemy-of-consciousness",
  guid: "episode-test",
  number: 1,
  season: 1,
  title: "The Alchemy of Consciousness",
  subtitle: "A test episode",
  guest: "Aetherica",
  hosts: ["Sky Mathis", "Ike Baker"],
  publishedAt: "2026-01-01",
  duration: "01:04:26",
  durationSeconds: 3866,
  description: "A featured episode about consciousness, symbol, and transformation.",
  longIntroduction: "A featured episode about consciousness, symbol, and transformation.",
  topics: ["Alchemy", "Symbolism"],
  coverImage: "/images/aetherica-hero.png",
  audioUrl: "https://example.com/audio.mp3",
  chapters: [{ title: "Opening", start: 0 }],
  transcript: [],
  demo: true
};

const slides = buildLivingArchiveSlides({
  featured: episode,
  paths: [
    {
      slug: "foundations-of-hermeticism",
      title: "Foundations of Hermeticism",
      summary: "A path into Hermetic cosmology.",
      difficulty: "Foundational",
      topics: ["Hermeticism"],
      steps: [
        { title: "Begin", summary: "Start here.", prompt: "What is the first symbol?" },
        { title: "Continue", summary: "Continue here.", prompt: "What follows?" }
      ]
    }
  ]
});

function renderCarousel(nextSlides = slides) {
  return render(
    <PlayerProvider>
      <LivingArchiveCarouselClient slides={nextSlides} />
    </PlayerProvider>
  );
}

describe("LivingArchiveCarousel", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
  });

  it("renders the initial portal and accessible controls", () => {
    renderCarousel();

    expect(screen.getByRole("heading", { name: "Choose a Portal Into Ætherica" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Alchemy of Consciousness" })).toBeInTheDocument();
    expect(screen.getByLabelText("Next archive portal")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide: The Alchemy of Consciousness")).toHaveAttribute("aria-current", "true");
  });

  it("moves with previous and next navigation", () => {
    renderCarousel();

    fireEvent.click(screen.getByLabelText("Next archive portal"));
    expect(screen.getByLabelText("Go to slide: Foundations of Hermeticism")).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByLabelText("Previous archive portal"));
    expect(screen.getByLabelText("Go to slide: The Alchemy of Consciousness")).toHaveAttribute("aria-current", "true");
  });

  it("supports keyboard navigation", () => {
    renderCarousel();
    const carousel = screen.getByLabelText("Living Archive portal carousel. Use arrow keys to move between portals.");

    fireEvent.keyDown(carousel, { key: "End" });
    expect(screen.getByLabelText("Go to slide: Is Symbol Merely Representative, or Can It Become Causative?")).toHaveAttribute("aria-current", "true");

    fireEvent.keyDown(carousel, { key: "Home" });
    expect(screen.getByLabelText("Go to slide: The Alchemy of Consciousness")).toHaveAttribute("aria-current", "true");
  });

  it("activates a side portal when clicked", () => {
    renderCarousel();

    fireEvent.click(screen.getByLabelText("2 of 5: Foundations of Hermeticism"));
    expect(screen.getByLabelText("Go to slide: Foundations of Hermeticism")).toHaveAttribute("aria-current", "true");
  });

  it("uses the drag threshold before changing slides", () => {
    renderCarousel();
    const stage = screen.getByTestId("living-archive-stage");

    fireEvent.pointerDown(stage, { clientX: 240, pointerType: "mouse", button: 0 });
    fireEvent.pointerMove(stage, { clientX: 180, pointerType: "mouse" });
    fireEvent.pointerUp(stage, { clientX: 170, pointerType: "mouse" });

    expect(screen.getByLabelText("Go to slide: Foundations of Hermeticism")).toHaveAttribute("aria-current", "true");
  });

  it("hides navigation in one-slide mode but keeps content and links", () => {
    renderCarousel([slides[0]]);

    expect(screen.queryByLabelText("Next archive portal")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view episode/i })).toHaveAttribute("href", "/episodes/the-alchemy-of-consciousness");
  });

  it("renders with missing optional fields", () => {
    renderCarousel([{ ...slides[0], image: undefined, metadata: undefined, secondaryAction: undefined }]);

    expect(screen.getByRole("heading", { name: "The Alchemy of Consciousness" })).toBeInTheDocument();
    expect(screen.getByText("Play Episode").closest("button")).toBeInTheDocument();
  });

  it("keeps navigation functional when reduced motion is preferred", () => {
    renderCarousel();

    fireEvent.click(screen.getByLabelText("Next archive portal"));

    expect(screen.getByLabelText("Go to slide: Foundations of Hermeticism")).toHaveAttribute("aria-current", "true");
  });

  it("opens the existing player from the audio action", () => {
    renderCarousel([slides[0]]);

    const portalPlayButton = screen.getByText("Play Episode").closest("button");
    expect(portalPlayButton).not.toBeNull();
    fireEvent.click(portalPlayButton!);

    expect(screen.getByRole("dialog", { name: "Aetherica full audio player" })).toBeInTheDocument();
  });
});
