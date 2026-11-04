import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { OverviewGrid } from "../components/OverviewGrid";
import { SITE } from "../config/site.js";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Star: () => <svg />,
  ExternalLink: () => <svg />,
  ArrowDown: () => <svg />,
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

  it("renders the scroll-down button and scrolls to services", async () => {
    const user = userEvent.setup();
    render(<><OverviewGrid /><section id="services" /></>);
    const target = document.getElementById("services");
    target.scrollIntoView = vi.fn();
    const button = screen.getByRole("button", { name: /scroll down/i });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(target.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth" });
  });

  it("Let's Connect scrolls to the contact section", async () => {
    const user = userEvent.setup();
    render(<><OverviewGrid /><section id="contact" /></>);
    const target = document.getElementById("contact");
    target.scrollIntoView = vi.fn();
    await user.click(screen.getByRole("link", { name: /Let's Connect/i }));
    expect(target.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth" });
  });
});
