import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyAuthor } from "../components/CaseStudyAuthor";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

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
  });
});
