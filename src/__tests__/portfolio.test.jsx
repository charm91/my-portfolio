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
});
