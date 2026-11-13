import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portfolio } from "../components/Portfolio";
import { MockIntersectionObserver } from "./test-utils/mocks";

vi.mock("next/image", async () => (await import("./test-utils/mocks")).nextImageMock);

vi.mock("next/link", async () => (await import("./test-utils/mocks")).nextLinkMock);

const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Portfolio", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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

  it.each([["/", false], ["/portfolio", true]])("enables the entrance for on-screen cards on %s: %s", (path, entrance) => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 100, bottom: 200 });
    mockPathname.mockReturnValue(path);
    render(<Portfolio />);
    expect(screen.getAllByRole("article").every((card) => card.hasAttribute("data-reveal-ready"))).toBe(entrance);
  });

  it.each([["/", 2], ["/portfolio", 1]])("uses the correct heading level on %s", (path, level) => {
    mockPathname.mockReturnValue(path);
    render(<Portfolio />);
    expect(screen.getByRole("heading", { level, name: /Selected Work Across Product Systems/ })).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 1 })).toHaveLength(path === "/portfolio" ? 1 : 0);
  });
});
