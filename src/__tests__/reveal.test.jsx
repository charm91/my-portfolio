import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { animate } from "framer-motion/dom/mini";
import { Reveal, RevealGrid } from "../components/Reveal";

class Observer {
  static instances = [];
  constructor(notify) {
    this.notify = notify;
    Observer.instances.push(this);
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

function mediaQuery(matches = false) {
  return { matches, addEventListener: vi.fn(), removeEventListener: vi.fn() };
}

let reduced;
let desktop;
function enter(element) {
  act(() => Observer.instances.at(-1).notify([{ target: element, isIntersecting: true }]));
}

beforeEach(() => {
  Observer.instances = [];
  reduced = mediaQuery();
  desktop = mediaQuery();
  vi.stubGlobal("IntersectionObserver", Observer);
  vi.stubGlobal("matchMedia", vi.fn(query => query.includes("reduced") ? reduced : desktop));
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({ top: window.innerHeight + 100 });
  vi.mocked(animate).mockClear();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("progressive scroll reveals", () => {
  it("keeps server-rendered content visible before JavaScript runs", () => {
    const html = renderToString(<RevealGrid><article>Readable card</article></RevealGrid>);
    expect(html).toContain("Readable card");
    expect(html).not.toMatch(/opacity|hidden|transform/);
  });

  it("waits for each mobile card's own viewport entry and plays it only once", () => {
    render(<RevealGrid><article>First</article><article>Second</article></RevealGrid>);
    const [first, second] = screen.getAllByRole("article");
    expect(first).not.toHaveStyle({ opacity: "0" });
    expect(animate).not.toHaveBeenCalled();
    enter(first);
    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate.mock.calls[0][0]).toBe(first);
    expect(animate.mock.calls[0][2].delay).toBe(0);
    expect(second).toHaveAttribute("data-reveal", "pending");
    enter(first);
    expect(animate).toHaveBeenCalledTimes(1);
    enter(second);
    expect(animate).toHaveBeenCalledTimes(2);
    expect(animate.mock.calls[1][2].delay).toBe(0);
  });

  it.each([["section", 0.06], ["process", 0.08]])("coordinates desktop pairs with the %s rhythm", (preset, delay) => {
    desktop.matches = true;
    render(<RevealGrid preset={preset}><article>First</article><article>Second</article></RevealGrid>);
    enter(screen.getAllByRole("article")[1]);
    expect(animate.mock.calls[0][2].delay).toBe(delay);
  });

  it("does not hide content already visible at hydration or a restored scroll position", () => {
    Element.prototype.getBoundingClientRect.mockReturnValue({ top: -10 });
    render(<Reveal as="article">Visible</Reveal>);
    expect(screen.getByRole("article")).toHaveAttribute("data-reveal", "done");
    expect(Observer.instances[0].observe).not.toHaveBeenCalled();
    expect(animate).not.toHaveBeenCalled();
  });

  it("shows every card immediately for reduced motion", () => {
    reduced.matches = true;
    render(<RevealGrid><article>First</article><article>Second</article></RevealGrid>);
    for (const card of screen.getAllByRole("article")) {
      expect(card).toHaveAttribute("data-reveal", "done");
      expect(card).toHaveStyle({ opacity: "1", transform: "none" });
    }
    expect(animate).not.toHaveBeenCalled();
  });

  it("keeps a keyboard-focused action visible when focus scrolls its card into view", () => {
    render(<Reveal as="article"><button>Project</button></Reveal>);
    screen.getByRole("button").focus();
    enter(screen.getByRole("article"));
    expect(animate).not.toHaveBeenCalled();
    expect(screen.getByRole("article")).toHaveStyle({ opacity: "1", transform: "none" });
  });

  it("cancels running reveals and makes pending content static when reduced motion changes", () => {
    render(<RevealGrid><article>First</article><article>Second</article></RevealGrid>);
    enter(screen.getAllByRole("article")[0]);
    const controls = animate.mock.results[0].value;
    reduced.matches = true;
    act(() => reduced.addEventListener.mock.calls[0][1]());
    expect(controls.stop).toHaveBeenCalledTimes(1);
    expect(Observer.instances[0].disconnect).toHaveBeenCalled();
    for (const card of screen.getAllByRole("article")) expect(card).toHaveStyle({ opacity: "1", transform: "none" });
  });

  it("leaves desktop testimonials to their native scroll animation", () => {
    desktop.matches = true;
    render(<Reveal as="article" mobileOnly>Testimonial</Reveal>);
    expect(Observer.instances[0].observe).not.toHaveBeenCalled();
    expect(animate).not.toHaveBeenCalled();
  });

  it("disconnects observers and stops running animations on unmount", () => {
    const { unmount } = render(<Reveal as="article">Card</Reveal>);
    enter(screen.getByRole("article"));
    const controls = animate.mock.results[0].value;
    unmount();
    expect(Observer.instances[0].disconnect).toHaveBeenCalled();
    expect(controls.stop).toHaveBeenCalled();
    expect(reduced.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
