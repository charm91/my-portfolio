import { describe, it, expect, vi, afterEach } from "vitest";
import { cn, scrollToSection } from "../lib/utils";

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

describe("scrollToSection", () => {
  afterEach(() => vi.restoreAllMocks());

  it("queries the correct element ID and calls scrollIntoView with smooth behavior", () => {
    const el = { scrollIntoView: vi.fn() };
    vi.spyOn(document, "querySelector").mockReturnValue(el);
    scrollToSection("portfolio");
    expect(document.querySelector).toHaveBeenCalledWith("#portfolio");
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does not throw when element is not found", () => {
    vi.spyOn(document, "querySelector").mockReturnValue(null);
    expect(() => scrollToSection("missing")).not.toThrow();
  });
});
