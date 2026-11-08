import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BetterHRPage } from "../views/BetterHRPage";
import { KBZBankPage } from "../views/KBZBankPage";
import { UniLinksPage } from "../views/UniLinksPage";
import { WctPage } from "../views/WctPage";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("@/components/Header", () => ({ Header: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/CaseStudyAuthor", () => ({ CaseStudyAuthor: () => null }));

vi.mock("lucide-react", () => ({
  Clock: () => <svg />,
  Globe: () => <svg />,
  ExternalLink: () => <svg />,
  TabletSmartphone: () => <svg />,
  Briefcase: () => <svg />,
}));

describe("BetterHRPage", () => {
  it("renders the main heading", () => {
    render(<BetterHRPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Better HR Cloud-based HR Management Platform"
    );
  });
});

describe("Live-project navigation", () => {
  it.each([
    [BetterHRPage, "https://betterhr.com/"],
    [KBZBankPage, "https://selfservice.kbzbank.com/"],
    [UniLinksPage, "https://unilinks.co/"],
    [WctPage, "https://www.wctpay.com/"],
  ])("opens %s in a new tab with an accessible warning", (Page, href) => {
    render(<Page />);
    const link = screen.getByRole("link", { name: "Live Project (opens in a new tab)" });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("title", "Opens in a new tab");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
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
