import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { OverviewGrid } from "../components/OverviewGrid";
import { SITE } from "../config/site.js";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("lucide-react", () => ({
  Star: () => <svg />,
  ArrowDown: () => <svg />,
  ArrowRight: () => <svg />,
}));

describe("OverviewGrid", () => {
  it("renders the greeting with the display name", () => {
    render(<OverviewGrid />);
    expect(screen.getByText(`Hi, I'm ${SITE.displayName}`)).toBeInTheDocument();
  });

  it("shows the correct years of experience derived from careerStartYear", () => {
    const expectedYears = new Date().getFullYear() - SITE.careerStartYear;
    render(<OverviewGrid />);
    expect(screen.getByText(new RegExp(`${expectedYears}\\+ Years`))).toBeInTheDocument();
  });

  it("renders all roles from SITE config", () => {
    render(<OverviewGrid />);
    SITE.roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("renders the scroll-down control as a native services link", () => {
    render(<OverviewGrid />);
    const link = screen.getByRole("link", { name: /scroll down/i });
    expect(link).toHaveAttribute("href", "#services");
    expect(fireEvent.click(link, { metaKey: true })).toBe(true);
  });

  it("keeps Let's Connect native, including modified clicks", () => {
    render(<OverviewGrid />);
    const link = screen.getByRole("link", { name: /Let's Connect/i });
    expect(link).toHaveAttribute("href", "#contact");
    expect(fireEvent.click(link, { button: 0 })).toBe(true);
    expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
  });
});
