import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Journey } from "../components/Journey";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, variants, ...props }) =>
        React.createElement(tag, props, children),
  }),
}));

vi.mock("lucide-react", () => ({
  Search: () => <svg data-testid="icon-search" />,
  Rocket: () => <svg data-testid="icon-rocket" />,
  PaintRoller: () => <svg data-testid="icon-paint-roller" />,
  Layers: () => <svg data-testid="icon-layers" />,
}));

describe("Journey", () => {
  it("renders all 4 process step titles", () => {
    render(<Journey />);
    expect(screen.getByText("Discover & Frame")).toBeInTheDocument();
    expect(screen.getByText("Structure & Design")).toBeInTheDocument();
    expect(screen.getByText("Prototype & Validate")).toBeInTheDocument();
    expect(screen.getByText("Align & Deliver")).toBeInTheDocument();
  });

  it("renders all 4 step icons (catches missing icon imports)", () => {
    render(<Journey />);
    expect(screen.getByTestId("icon-search")).toBeInTheDocument();
    expect(screen.getByTestId("icon-rocket")).toBeInTheDocument();
    expect(screen.getByTestId("icon-paint-roller")).toBeInTheDocument();
    expect(screen.getByTestId("icon-layers")).toBeInTheDocument();
  });
});
