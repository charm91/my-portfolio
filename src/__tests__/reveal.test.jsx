import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "../components/Reveal";
import { MockIntersectionObserver } from "./test-utils/mocks";

const offscreenBelow = () => ({ top: window.innerHeight + 100, bottom: window.innerHeight + 200 });
const offscreenAbove = () => ({ top: -200, bottom: -100 });
const onscreen = () => ({ top: 100, bottom: 200 });

function mockBounds(bounds) {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(bounds());
}

describe("Reveal", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", MockIntersectionObserver));

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each([
    ["below", offscreenBelow],
    ["above", offscreenAbove],
  ])("enables the entrance effect for content %s the viewport", (_, bounds) => {
    mockBounds(bounds);
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveAttribute("data-reveal-ready", "true");
  });

  it("keeps content that is already on screen readable instead of hiding it", () => {
    mockBounds(onscreen);
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).not.toHaveAttribute("data-reveal-ready");
  });

  it("enables an intentional entrance for content that is already on screen", () => {
    mockBounds(onscreen);
    render(<Reveal entrance>content</Reveal>);
    expect(screen.getByText("content")).toHaveAttribute("data-reveal-ready", "true");
  });

  it("never enables the effect without IntersectionObserver, even for an entrance", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    mockBounds(offscreenBelow);
    render(<Reveal entrance>content</Reveal>);
    expect(screen.getByText("content")).not.toHaveAttribute("data-reveal-ready");
  });

  it("keeps the scroll-reveal class beside the caller's classes", () => {
    render(<Reveal className="mt-10">content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("scroll-reveal", "mt-10");
  });

  it.each(["article", "p", "h1", "h2", "header", "form"])("renders the requested %s element", (tag) => {
    render(<Reveal as={tag}>content</Reveal>);
    expect(screen.getByText("content").tagName).toBe(tag.toUpperCase());
  });
});
