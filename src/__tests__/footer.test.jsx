import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Footer } from "../components/Footer";
import { SITE, SOCIAL_LINKS, RESUME_URL } from "../config/site";

vi.mock("next/link", async () => (await import("./test-utils/mocks")).nextLinkMock);

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) =>
    asChild ? children : <button {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Linkedin: () => <svg />,
  Mail: () => <svg />,
  ExternalLink: () => <svg data-testid="external-link-icon" />,
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
    expect(destination.protocol).toBe("mailto:");
    expect(destination.pathname).toBe(SITE.email);
    expect(destination.searchParams.get("subject")).toBe(`Hello ${SITE.displayName}`);
    expect(screen.getByRole("link", { name: "Email Reach me directly" })).not.toHaveAttribute("target");
  });

  it("links Resume to the configured document", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", RESUME_URL);
  });

  it("opens the selected external destinations in a new tab without an opening notice", () => {
    render(<Footer />);
    expect(screen.queryByText(/opens? in (?:a )?new (?:tab|window)/i)).not.toBeInTheDocument();
    for (const name of ["LinkedIn", "Resume"]) {
      const link = screen.getByRole("link", { name: `${name}` });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).not.toHaveAttribute("title");
      expect(link).not.toHaveAccessibleDescription();
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it.each([["LinkedIn", true], ["Email Reach me directly", false]])("shows the external-link arrow on the %s card only for web destinations: %s", (name, external) => {
    render(<Footer />);
    expect(within(screen.getByRole("link", { name })).queryByTestId("external-link-icon") !== null).toBe(external);
  });

  it.each([["LinkedIn", true], ["Email Reach me directly", false]])("shows the divider before the arrow on the %s card only for web destinations: %s", (name, external) => {
    render(<Footer />);
    expect(screen.getByRole("link", { name }).querySelector(".w-px") !== null).toBe(external);
  });

  it("returns to the homepage portfolio section from any route", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Case Studies" })).toHaveAttribute("href", "/#portfolio");
  });

  it("renders copyright with the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
