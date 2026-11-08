import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MotionProvider } from "../components/MotionProvider";

// The shared setup mock has no MotionConfig, so capture the props MotionProvider passes to it.
vi.mock("framer-motion", () => ({
  MotionConfig: ({ reducedMotion, children }) => (
    <div data-testid="motion-config" data-reduced-motion={reducedMotion}>{children}</div>
  ),
}));

describe("MotionProvider", () => {
  it("lets the visitor's reduced-motion preference control animations around its children", () => {
    render(<MotionProvider><p>content</p></MotionProvider>);
    const config = screen.getByTestId("motion-config");
    expect(config).toHaveAttribute("data-reduced-motion", "user");
    expect(config).toContainElement(screen.getByText("content"));
  });
});
