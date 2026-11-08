import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialScroll } from "../components/TestimonialScroll";

afterEach(() => vi.unstubAllGlobals());

function setupScrollSupport(matches = true) {
  let resize;
  const observer = { observe: vi.fn(), disconnect: vi.fn() };
  vi.stubGlobal("CSS", { supports: () => true });
  vi.stubGlobal("ResizeObserver", class {
    constructor(callback) { resize = callback; return observer; }
  });
  const media = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal("matchMedia", () => media);
  return { media, observer, resize: () => resize() };
}

describe("TestimonialScroll", () => {
  it("keeps all content in normal flow when scroll timelines are unsupported", () => {
    vi.stubGlobal("CSS", { supports: () => false });
    const { container } = render(<TestimonialScroll><article>Complete quote</article></TestimonialScroll>);
    expect(screen.getByRole("article")).toHaveTextContent("Complete quote");
    expect(container.firstChild).not.toHaveAttribute("data-scroll");
  });

  it("measures the full travel and releases tracking when motion is disabled or the viewport shrinks", () => {
    const { media, observer, resize } = setupScrollSupport();
    const { container, unmount } = render(<TestimonialScroll><article>Final quote</article></TestimonialScroll>);
    const rail = container.firstChild;
    const viewport = rail.firstChild;
    const track = viewport.firstChild;
    Object.defineProperty(track, "scrollHeight", { value: 1000 });
    Object.defineProperty(viewport, "clientHeight", { value: 400 });
    resize();
    expect(rail).toHaveAttribute("data-scroll", "true");
    expect(rail.style.getPropertyValue("--testimonial-travel")).toBe("600px");
    expect(observer.observe).toHaveBeenCalledWith(track);

    const change = media.addEventListener.mock.calls[0][1];
    media.matches = false;
    change();
    expect(rail).not.toHaveAttribute("data-scroll");
    expect(rail.style.getPropertyValue("--testimonial-travel")).toBe("");
    expect(screen.getByRole("article")).toHaveTextContent("Final quote");
    unmount();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", change);
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("does not activate clipping for a narrow viewport or reduced-motion preference", () => {
    const { observer } = setupScrollSupport(false);
    const { container } = render(<TestimonialScroll><article>Readable quote</article></TestimonialScroll>);
    expect(container.firstChild).not.toHaveAttribute("data-scroll");
    expect(observer.observe).not.toHaveBeenCalled();
    expect(screen.getByRole("article")).toBeVisible();
  });
});
