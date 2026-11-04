import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Services } from "../components/Services";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => <button onClick={onClick} {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Settings: () => <svg />,
  Globe: () => <svg />,
  Layers: () => <svg />,
  Code2: () => <svg />,
}));

describe("Services", () => {
  it("renders all 4 service titles", () => {
    render(<Services />);
    expect(screen.getByText("Product Design")).toBeInTheDocument();
    expect(screen.getByText("Product Ownership")).toBeInTheDocument();
    expect(screen.getByText("User Research & Strategy")).toBeInTheDocument();
    expect(screen.getByText("Frontend Collaboration")).toBeInTheDocument();
  });

  it("renders Explore Projects and scrolls to portfolio", async () => {
    const user = userEvent.setup();
    render(<><Services /><section id="portfolio" /></>);
    const target = document.getElementById("portfolio");
    target.scrollIntoView = vi.fn();
    const button = screen.getByRole("button", { name: /Explore Projects/i });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(target.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth" });
  });
});
