import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Portfolio } from "../components/Portfolio";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, variants, style, ...props }) =>
        React.createElement(tag, { style, ...props }, children),
  }),
}));

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

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) =>
    asChild ? children : <button {...props}>{children}</button>,
}));

describe("Portfolio", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  it("renders all 4 project titles", () => {
    render(<Portfolio />);
    expect(screen.getByText("BetterHR Cloud-based HR Management Platform")).toBeInTheDocument();
    expect(screen.getByText("UniLinks All-in-One Study Abroad Platform")).toBeInTheDocument();
    expect(screen.getByText("KBZ Bank Digital Banking Authentication System")).toBeInTheDocument();
    expect(screen.getByText("WCT Pay Crypto–Fiat Payment Dashboard")).toBeInTheDocument();
  });

  it("each card links to the correct slug", () => {
    render(<Portfolio />);
    expect(document.querySelector('a[href="/betterhr"]')).not.toBeNull();
    expect(document.querySelector('a[href="/unilinks"]')).not.toBeNull();
    expect(document.querySelector('a[href="/kbz-bank"]')).not.toBeNull();
    expect(document.querySelector('a[href="/wct"]')).not.toBeNull();
  });

  it("shows See All button when not on /portfolio", () => {
    render(<Portfolio />);
    expect(screen.getByText("See All")).toBeInTheDocument();
  });

  it("hides See All button when on /portfolio", () => {
    mockPathname.mockReturnValue("/portfolio");
    render(<Portfolio />);
    expect(screen.queryByText("See All")).not.toBeInTheDocument();
  });
});
