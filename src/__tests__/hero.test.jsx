import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Hero } from "../components/Hero";

vi.mock("lucide-react", () => ({ ArrowRight: () => <svg /> }));

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Product Design with/i);
  });

  it("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(/shape product experiences/i)).toBeInTheDocument();
  });

  it("renders View Case Studies as a native portfolio link", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /View Case Studies/i });
    expect(link).toHaveAttribute("href", "#portfolio");
    expect(fireEvent.click(link, { metaKey: true })).toBe(true);
  });
});
