import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BetterHRPage } from "../views/BetterHRPage";
import { KBZBankPage } from "../views/KBZBankPage";
import { UniLinksPage } from "../views/UniLinksPage";
import { WctPage } from "../views/WctPage";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, style, ...props }) =>
        React.createElement(tag, { style, ...props }, children),
  }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("@/components/Header", () => ({ Header: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/CaseStudyAuthor", () => ({ CaseStudyAuthor: () => null }));

vi.mock("lucide-react", () => ({
  Clock: () => <svg />,
  Globe: () => <svg />,
  CirclePlay: () => <svg />,
  TabletSmartphone: () => <svg />,
  Briefcase: () => <svg />,
}));

describe("BetterHRPage", () => {
  it("renders the main heading", () => {
    render(<BetterHRPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "BetterHR Cloud-based HR Management Platform"
    );
  });
});

describe("KBZBankPage", () => {
  it("renders the main heading", () => {
    render(<KBZBankPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "KBZ Bank Digital Banking Authentication System"
    );
  });
});

describe("UniLinksPage", () => {
  it("renders the main heading", () => {
    render(<UniLinksPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "UniLinks All-in-One Study Abroad Platform"
    );
  });
});

describe("WctPage", () => {
  it("renders the main heading", () => {
    render(<WctPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "WCT Pay Crypto–Fiat Payment Dashboard"
    );
  });
});
