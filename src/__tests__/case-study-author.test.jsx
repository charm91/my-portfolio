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

  it("renders LinkedIn and Facebook social links", () => {
    render(<CaseStudyAuthor />);
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", SOCIAL_LINKS.facebook);
    for (const name of ["Facebook", "LinkedIn"]) {
      const link = screen.getByRole("link", { name });
      expect(link).not.toHaveAttribute("target");
      expect(link).toHaveClass("focus-visible:outline-2");
      expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      expect(link.querySelector("svg")).toHaveAttribute("focusable", "false");
    }
  });
});
