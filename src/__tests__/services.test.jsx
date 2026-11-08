import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Services } from "../components/Services";

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

  it("renders Explore Projects as a native portfolio link", () => {
    render(<Services />);
    const link = screen.getByRole("link", { name: "Explore Projects" });
    expect(link).toHaveAttribute("href", "#portfolio");
    expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
  });
});
