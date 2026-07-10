import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Hero } from "../components/Hero";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, ...props }) =>
        React.createElement(tag, props, children),
  }),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock("@/lib/utils", () => ({ scrollToSection: vi.fn() }));

vi.mock("lucide-react", () => ({ ArrowRight: () => <svg /> }));

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Product Design with/i);
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(/shape product experiences/i)).toBeInTheDocument();
  });

  it("renders the View Case Studies CTA button", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: /View Case Studies/i })).toBeInTheDocument();
  });
});
