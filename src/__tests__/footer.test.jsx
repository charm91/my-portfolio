import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Footer } from "../components/Footer";
import { SITE, SOCIAL_LINKS, RESUME_URL } from "../config/site";

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
    expect(screen.getByRole("link", { name: /contact me/i })).toHaveAttribute("href", "/contact-me");
  });

  it("renders the LinkedIn card", () => {
    render(<Footer />);
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
  });

  it("renders the Email card", () => {
    render(<Footer />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    const destination = new URL(screen.getByRole("link", { name: /Email/i }).href);
    expect(destination.origin).toBe("https://mail.google.com");
    expect(destination.pathname).toBe("/mail/");
    expect(destination.searchParams.get("view")).toBe("cm");
    expect(destination.searchParams.get("to")).toBe(SITE.email);
    expect(destination.searchParams.get("su")).toBe(`Hello ${SITE.displayName}`);
  });

  it("links Resume to the configured document", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", RESUME_URL);
  });

  it("renders copyright with the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
