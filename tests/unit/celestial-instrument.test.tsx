import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CelestialInstrument } from "@/components/resources/CelestialInstrument";

describe("CelestialInstrument", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("switches tabs without stale panel headings", () => {
    render(<CelestialInstrument standalone />);

    expect(screen.getByRole("heading", { name: "Current astrological conditions" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Chart Caster" }));
    expect(screen.getByRole("heading", { name: "Cast a test chart" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Current astrological conditions" })).not.toBeInTheDocument();
  });

  it("validates chart location selection before casting houses", () => {
    render(<CelestialInstrument standalone />);

    fireEvent.click(screen.getByRole("tab", { name: "Chart Caster" }));
    fireEvent.click(screen.getByRole("button", { name: "Cast Chart" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Select a city from the suggestions to calculate houses and local angles.");
  });

  it("casts a chart with unknown time and hides lots", () => {
    render(<CelestialInstrument standalone />);

    fireEvent.click(screen.getByRole("tab", { name: "Chart Caster" }));
    const locationInputs = screen.getAllByPlaceholderText("Search city, country, or place");
    fireEvent.change(locationInputs[0], { target: { value: "Chicago" } });
    fireEvent.click(screen.getByRole("button", { name: /Chicago/i }));
    fireEvent.click(screen.getByLabelText("Unknown time"));
    fireEvent.click(screen.getByRole("button", { name: "Cast Chart" }));

    expect(screen.getByText(/Lots require known time and local angles/)).toBeInTheDocument();
    expect(screen.getAllByText(/^unknown$/i).length).toBeGreaterThan(0);
  });

  it("shows useful empty state when planetary hours have no location", () => {
    render(<CelestialInstrument standalone />);

    fireEvent.click(screen.getByRole("tab", { name: "Planetary Hours" }));

    expect(screen.getByRole("heading", { name: "Choose a location" })).toBeInTheDocument();
    expect(screen.getByText("Choose a location to calculate local sunrise, sunset, and planetary hours.")).toBeInTheDocument();
  });

  it("renders the ephemeris table with symbols and clean encoding", () => {
    render(<CelestialInstrument standalone />);

    const table = screen.getByTestId("ephemeris-table");
    expect(within(table).getByText("☉")).toBeInTheDocument();
    expect(within(table).getAllByText(/° \/ day/).length).toBeGreaterThan(0);
    expect(table.textContent).toContain("•");
    expect(table.textContent).not.toContain("Â°");
    expect(table.textContent).not.toContain("â€”");
    expect(table.textContent).not.toContain("â€¢");
  });

  it("renders electional gate result states", () => {
    render(<CelestialInstrument standalone />);

    fireEvent.click(screen.getByRole("tab", { name: "Electional Gates" }));

    expect(screen.getByRole("heading", { name: "Symbolic gate review" })).toBeInTheDocument();
    expect(screen.getByText("Planetary condition")).toBeInTheDocument();
    expect(screen.getByText("Planetary hour alignment")).toBeInTheDocument();
    expect(screen.getAllByText(/pass|warning|fail/i).length).toBeGreaterThan(0);
  });

  it("keeps tabs mobile-safe with horizontal scrolling", () => {
    render(<CelestialInstrument standalone />);

    const tablist = screen.getByRole("tablist", { name: "Celestial instrument tools" });
    expect(tablist).toHaveClass("overflow-x-auto");
  });
});
