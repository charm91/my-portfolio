import { describe, it, expect, vi, afterEach } from "vitest";
import { cn, getScrollBehavior } from "../lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — last class wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("getScrollBehavior", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("uses smooth scrolling when no reduced-motion preference is set", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
    expect(getScrollBehavior()).toBe("smooth");
  });

  it("uses immediate scrolling when the visitor prefers reduced motion", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    expect(getScrollBehavior()).toBe("auto");
    expect(window.matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });
});
