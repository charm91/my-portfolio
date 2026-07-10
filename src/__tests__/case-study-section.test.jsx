import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudySection } from "../components/CaseStudySection";

describe("CaseStudySection", () => {
  it("renders children", () => {
    render(<CaseStudySection><p>Test content</p></CaseStudySection>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders an h2 when title is provided", () => {
    render(<CaseStudySection title="My Section"><p>content</p></CaseStudySection>);
    expect(screen.getByRole("heading", { level: 2, name: "My Section" })).toBeInTheDocument();
  });

  it("does not render an h2 when title is omitted", () => {
    render(<CaseStudySection><p>content</p></CaseStudySection>);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });
});
