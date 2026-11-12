import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyAuthor } from "../components/CaseStudyAuthor";
import { SOCIAL_LINKS } from "../config/site";

vi.mock("next/image", async () => (await import("./test-utils/mocks")).nextImageMock);

describe("CaseStudyAuthor", () => {
  it("renders the display name", () => {
    render(<CaseStudyAuthor />);
    expect(screen.getByText("Charm")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<CaseStudyAuthor />);
    expect(screen.getByText("Senior Product Designer • Fintech & SaaS")).toBeInTheDocument();
  });

  it.each([
    ["Facebook", SOCIAL_LINKS.facebook],
    ["LinkedIn", SOCIAL_LINKS.linkedin],
  ])("opens %s in a new tab without an opening notice", (label, href) => {
    render(<CaseStudyAuthor />);
    const link = screen.getByRole("link", { name: `${label}` });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).not.toHaveAttribute("title");
    expect(link).not.toHaveAccessibleDescription();
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("focus-visible:outline-2");
    for (const icon of link.querySelectorAll("svg")) {
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).toHaveAttribute("focusable", "false");
    }
  });
});
