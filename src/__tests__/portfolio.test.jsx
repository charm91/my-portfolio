import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Portfolio } from "../components/Portfolio";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Portfolio", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  it("renders all 4 project titles", () => {
    render(<Portfolio />);
    expect(screen.getByText("Better HR Cloud-based HR Management Platform")).toBeInTheDocument();
    expect(screen.getByText("UniLinks All-in-One Study Abroad Platform")).toBeInTheDocument();
    expect(screen.getByText("KBZ Bank Digital Banking Authentication System")).toBeInTheDocument();
    expect(screen.getByText("WCT Pay Crypto–Fiat Payment Dashboard")).toBeInTheDocument();
  });

  it("each card links to the correct slug", () => {
    render(<Portfolio />);
    for (const [title, href] of [
      ["Better HR Cloud-based HR Management Platform", "/betterhr"],
      ["UniLinks All-in-One Study Abroad Platform", "/unilinks"],
      ["KBZ Bank Digital Banking Authentication System", "/kbz-bank"],
      ["WCT Pay Crypto–Fiat Payment Dashboard", "/wct"],
    ]) {
      expect(screen.getByRole("link", { name: new RegExp(title) })).toHaveAttribute("href", href);
    }
  });

  it("offers one keyboard destination per project without nested controls", () => {
    render(<Portfolio />);
    for (const article of screen.getAllByRole("article")) {
      expect(article.querySelectorAll("a")).toHaveLength(1);
      expect(article.querySelector("button, [tabindex]")).toBeNull();
      expect(article.querySelector("a")).toHaveTextContent("See Details");
    }
  });

  it("shows See All button when not on /portfolio", () => {
    render(<Portfolio />);
    expect(screen.getByText("See All")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See All" })).toHaveAttribute("href", "/portfolio");
  });

  it("hides See All button when on /portfolio", () => {
    mockPathname.mockReturnValue("/portfolio");
    render(<Portfolio />);
    expect(screen.queryByText("See All")).not.toBeInTheDocument();
  });

  it.each([["/", 2], ["/portfolio", 1]])("uses the correct heading level on %s", (path, level) => {
    mockPathname.mockReturnValue(path);
    render(<Portfolio />);
    expect(screen.getByRole("heading", { level, name: /Selected Work Across Product Systems/ })).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 1 })).toHaveLength(path === "/portfolio" ? 1 : 0);
  });
});
