import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Testimonials } from "../components/Testimonials";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, style, ...props }) =>
        React.createElement(tag, props, children),
  }),
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("lucide-react", () => ({ Star: () => <svg /> }));

// jsdom does not implement ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("ResizeObserver", MockResizeObserver);

describe("Testimonials", () => {
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
});
