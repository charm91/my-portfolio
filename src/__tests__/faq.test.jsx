import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQ } from "../components/FAQ";

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        ({ children, initial, animate, transition, viewport, whileInView, ...props }) =>
          <div {...props}>{children}</div>,
    }
  ),
}));

vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div>{children}</div>,
  AccordionItem: ({ children }) => <div>{children}</div>,
  AccordionTrigger: ({ children }) => <button>{children}</button>,
  AccordionContent: ({ children }) => <div>{children}</div>,
}));

describe("FAQ", () => {
  it("renders all 6 questions", () => {
    render(<FAQ />);
    expect(screen.getByText("What roles are you looking for?")).toBeInTheDocument();
    expect(screen.getByText("Do you work only as a Product Designer?")).toBeInTheDocument();
    expect(screen.getByText("What types of products have you worked on?")).toBeInTheDocument();
    expect(screen.getByText("How do you usually work with teams?")).toBeInTheDocument();
    expect(screen.getByText("Are you open to freelance or contract work?")).toBeInTheDocument();
    expect(screen.getByText("What makes your background different?")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<FAQ />);
    expect(screen.getByText("Working With Me")).toBeInTheDocument();
  });
});
