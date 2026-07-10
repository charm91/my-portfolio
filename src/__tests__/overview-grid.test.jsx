import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { OverviewGrid } from "../components/OverviewGrid";
import { SITE } from "../config/site.js";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, variants, ...props }) =>
        React.createElement(tag, props, children),
  }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock("@/lib/utils", () => ({ scrollToSection: vi.fn() }));

vi.mock("lucide-react", () => ({
  Star: () => <svg />,
  ExternalLink: () => <svg />,
  ArrowDown: () => <svg />,
}));

describe("OverviewGrid", () => {
  it("renders the greeting with the display name", () => {
    render(<OverviewGrid />);
    expect(screen.getByText(`Hi, I'm ${SITE.displayName}`)).toBeInTheDocument();
  });

  it("shows the correct years of experience derived from careerStartYear", () => {
    const expectedYears = new Date().getFullYear() - SITE.careerStartYear;
    render(<OverviewGrid />);
    expect(screen.getByText(new RegExp(`${expectedYears}\\+ Years`))).toBeInTheDocument();
  });

  it("renders all roles from SITE config", () => {
    render(<OverviewGrid />);
    SITE.roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("renders the scroll-down button", () => {
    render(<OverviewGrid />);
    expect(screen.getByRole("button", { name: /scroll down/i })).toBeInTheDocument();
  });
});
