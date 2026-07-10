import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Services } from "../components/Services";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, variants, ...props }) =>
        React.createElement(tag, props, children),
  }),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock("@/lib/utils", () => ({ scrollToSection: vi.fn() }));

vi.mock("lucide-react", () => ({
  Settings: () => <svg />,
  Globe: () => <svg />,
  Layers: () => <svg />,
  Code2: () => <svg />,
}));

describe("Services", () => {
  it("renders all 4 service titles", () => {
    render(<Services />);
    expect(screen.getByText("Product Design")).toBeInTheDocument();
    expect(screen.getByText("Product Ownership")).toBeInTheDocument();
    expect(screen.getByText("User Research & Strategy")).toBeInTheDocument();
    expect(screen.getByText("Frontend Collaboration")).toBeInTheDocument();
  });

  it("renders the Explore Projects CTA button", () => {
    render(<Services />);
    expect(screen.getByRole("button", { name: /Explore Projects/i })).toBeInTheDocument();
  });
});
