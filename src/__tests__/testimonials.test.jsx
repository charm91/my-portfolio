import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { scroll, useMotionValue, useTransform } from "framer-motion";
import { Testimonials } from "../components/Testimonials";

// Keep stable motion components while exposing the measured transform endpoint.
vi.mock("framer-motion", async () => {
  const { createMotionProxy } = await import("./test-utils/mockMotion");
  const progress = { get: () => 0, set: vi.fn() };
  return {
    motion: createMotionProxy(),
    scroll: vi.fn(() => vi.fn()),
    useMotionValue: () => progress,
    useTransform: vi.fn(() => 0),
  };
});

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("lucide-react", () => ({ Star: () => <svg /> }));

// jsdom does not implement ResizeObserver
class MockResizeObserver {
  static instances = [];
  constructor(callback) {
    this.notify = callback;
    MockResizeObserver.instances.push(this);
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function deliverHeight(observer, height) {
  const element = observer.observe.mock.calls[0][0];
  Object.defineProperty(element, "scrollHeight", { configurable: true, value: height });
  act(() => observer.notify([{ target: element }]));
}

describe("Testimonials", () => {
  let media;

  beforeEach(() => {
    MockResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    vi.clearAllMocks();
    media = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal("matchMedia", vi.fn(() => media));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders all 4 testimonial author names", () => {
    render(<Testimonials />);
    expect(screen.getByText("Zayar Zy")).toBeInTheDocument();
    expect(screen.getByText("Thet Maung Chaw")).toBeInTheDocument();
    expect(screen.getByText("Zin Thant")).toBeInTheDocument();
    expect(screen.getByText("Thiri Aung")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Colleagues Say")).toBeInTheDocument();
  });
  it("recomputes scroll bounds and section extent when the testimonial content resizes", () => {
    const { container } = render(<Testimonials />);
    const observer = MockResizeObserver.instances[0];
    const content = observer.observe.mock.calls[0][0];
    expect(content.querySelectorAll("article")).toHaveLength(4);
    const section = container.querySelector("#testimonials");

    deliverHeight(observer, 2000);
    expect(useTransform.mock.lastCall[2]).toEqual([0, 0, -1200, -1200]);
    expect(section).toHaveStyle({ minHeight: "1500px" });

    deliverHeight(observer, 1000);
    expect(useTransform.mock.lastCall[2]).toEqual([0, 0, -200, -200]);
    expect(section).toHaveStyle({ minHeight: "500px" });
  });

  it.each([600, 800])("clamps %ipx content to zero overflow instead of reversing its travel", (height) => {
    const { container } = render(<Testimonials />);
    deliverHeight(MockResizeObserver.instances[0], height);
    const endpoints = useTransform.mock.lastCall[2];
    expect(endpoints.every((value) => value === 0)).toBe(true);
    expect(container.querySelector("#testimonials")).toHaveStyle({ minHeight: "300px" });
  });

  it("disconnects its content observer on unmount", () => {
    const { unmount } = render(<Testimonials />);
    const observer = MockResizeObserver.instances[0];
    expect(observer.observe).toHaveBeenCalledTimes(1);
    expect(observer.disconnect).not.toHaveBeenCalled();
    const stopScroll = scroll.mock.results[0].value;
    unmount();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    expect(stopScroll).toHaveBeenCalledTimes(1);
    expect(media.removeEventListener).toHaveBeenCalledWith("change", media.addEventListener.mock.calls[0][1]);
  });

  it("keeps mobile cards readable without subscribing to scroll or content resize", () => {
    media.matches = false;
    render(<Testimonials />);
    expect(screen.getByText("Thiri Aung")).toBeInTheDocument();
    expect(scroll).not.toHaveBeenCalled();
    expect(MockResizeObserver.instances).toHaveLength(0);
  });

  it("starts and stops desktop tracking as the viewport crosses the breakpoint", () => {
    media.matches = false;
    const { unmount } = render(<Testimonials />);
    const change = media.addEventListener.mock.calls[0][1];
    media.matches = true;
    act(() => change());
    expect(scroll).toHaveBeenCalledTimes(1);
    const observer = MockResizeObserver.instances[0];
    const stopScroll = scroll.mock.results[0].value;
    act(() => scroll.mock.calls[0][0](0.5, { y: { progress: 0.5 } }));
    expect(useMotionValue().set).toHaveBeenLastCalledWith(0.5);

    media.matches = false;
    act(() => change());
    expect(stopScroll).toHaveBeenCalledTimes(1);
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    expect(useMotionValue().set).toHaveBeenLastCalledWith(0);

    media.matches = true;
    act(() => change());
    expect(scroll).toHaveBeenCalledTimes(2);
    expect(MockResizeObserver.instances).toHaveLength(2);
    unmount();
    expect(scroll.mock.results[1].value).toHaveBeenCalledTimes(1);
  });

});
