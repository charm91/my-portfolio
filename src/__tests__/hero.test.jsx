import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Hero } from "../components/Hero";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

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

  it("renders the View Case Studies CTA button and scrolls to portfolio", async () => {
    const user = userEvent.setup();
    render(<><Hero /><section id="portfolio" /></>);
    const target = document.getElementById("portfolio");
    target.scrollIntoView = vi.fn();
    const button = screen.getByRole("button", { name: /View Case Studies/i });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(target.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth" });
  });
});
