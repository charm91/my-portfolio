import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Footer } from "../components/Footer";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, viewport, whileInView, ...props }) =>
        React.createElement(tag, props, children),
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) =>
    asChild ? children : <button {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Linkedin: () => <svg />,
  Mail: () => <svg />,
  ExternalLink: () => <svg />,
}));

describe("Footer", () => {
  it("renders the Contact Me link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /contact me/i })).toBeInTheDocument();
  });

  it("renders the LinkedIn card", () => {
    render(<Footer />);
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("renders the Email card", () => {
    render(<Footer />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders copyright with the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
