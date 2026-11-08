import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Testimonials } from "../components/Testimonials";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("lucide-react", () => ({ Star: () => <svg /> }));

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => vi.unstubAllGlobals());

describe("Testimonials", () => {
  it("renders all 4 testimonial author names", () => {
    render(<Testimonials />);
    expect(screen.getByText("Zayar Zy")).toBeInTheDocument();
    expect(screen.getByText("Thet Maung Chaw")).toBeInTheDocument();
    expect(screen.getByText("Zin Thant")).toBeInTheDocument();
    expect(screen.getByText("Thiri Aung")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Colleagues Say")).toBeInTheDocument();
  });

  it("renders every complete quote and author in a readable card", () => {
    render(<Testimonials />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(4);
    const authors = ["Zayar Zy", "Thet Maung Chaw", "Zin Thant", "Thiri Aung"];
    cards.forEach((card, index) => {
      expect(within(card).getByRole("img", { name: authors[index] })).toBeInTheDocument();
      expect(within(card).getByLabelText("5 out of 5 stars")).toBeInTheDocument();
    });
    expect(within(cards[3]).getByText(/make a positive impact on any team she joins/)).toBeInTheDocument();
  });
});
