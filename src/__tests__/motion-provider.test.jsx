import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MotionProvider } from "../components/MotionProvider";

// The shared setup mock has no MotionConfig, so capture the props MotionProvider passes to it.
vi.mock("framer-motion", () => ({
  MotionConfig: ({ reducedMotion, transition, children }) => (
    <div data-testid="motion-config" data-reduced-motion={reducedMotion} data-reduce-transition={String(transition?.reduceMotion)}>{children}</div>
  ),
}));

describe("MotionProvider", () => {
  let media;
  let listeners;

  beforeEach(() => {
    listeners = new Set();
    media = {
      matches: false,
      addEventListener: vi.fn((event, listener) => listeners.add(listener)),
      removeEventListener: vi.fn((event, listener) => listeners.delete(listener)),
    };
    vi.stubGlobal("matchMedia", () => media);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("updates motion in both directions without losing typed input", () => {
    render(<MotionProvider><input aria-label="Message" /></MotionProvider>);
    const input = screen.getByRole("textbox", { name: "Message" });
    fireEvent.change(input, { target: { value: "Keep this message" } });
    const config = screen.getByTestId("motion-config");
    expect(config).toHaveAttribute("data-reduce-transition", "false");
    for (const matches of [true, false]) {
      act(() => {
        media.matches = matches;
        listeners.forEach(listener => listener());
      });
      expect(config).toHaveAttribute("data-reduce-transition", String(matches));
      expect(screen.getByRole("textbox", { name: "Message" })).toBe(input);
      expect(input).toHaveValue("Keep this message");
    }
  });

  it("starts with the active preference and removes its subscription on unmount", () => {
    media.matches = true;
    const { unmount } = render(<MotionProvider>content</MotionProvider>);
    expect(screen.getByTestId("motion-config")).toHaveAttribute("data-reduce-transition", "true");
    expect(listeners.size).toBe(1);
    unmount();
    expect(listeners.size).toBe(0);
  });

  it("lets the visitor's reduced-motion preference control animations around its children", () => {
    render(<MotionProvider><p>content</p></MotionProvider>);
    const config = screen.getByTestId("motion-config");
    expect(config).toHaveAttribute("data-reduced-motion", "user");
    expect(config).toContainElement(screen.getByText("content"));
  });
});
