import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FAQ } from "../components/FAQ";

describe("FAQ", () => {
  it("renders all 6 question triggers", () => {
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

  it("answers are hidden before any trigger is clicked", () => {
    render(<FAQ />);
    expect(screen.getByRole("button", { name: "What roles are you looking for?" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("clicking a trigger reveals its answer", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByText("What roles are you looking for?");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/I'm looking for senior roles/)).toBeVisible();
    expect(screen.getByRole("region", { name: "What roles are you looking for?" })).toBeVisible();
  });

  it("clicking an open trigger collapses it", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByText("What roles are you looking for?");
    await user.click(trigger);
    expect(screen.getByText(/I'm looking for senior roles/)).toBeInTheDocument();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region", { name: "What roles are you looking for?" })).not.toBeInTheDocument();
  });

  it("opening another question closes the previously open answer", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const first = screen.getByRole("button", { name: "What roles are you looking for?" });
    const second = screen.getByRole("button", { name: "Do you work only as a Product Designer?" });
    await user.click(first);
    expect(screen.getByRole("region", { name: first.textContent })).toBeVisible();
    await user.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByRole("region", { name: first.textContent })).not.toBeInTheDocument();
    expect(screen.getByRole("region", { name: second.textContent })).toBeVisible();
    expect(screen.getAllByRole("region")).toHaveLength(1);
  });

  it.each([["Enter", "{Enter}"], ["Space", " "]])("supports %s to open and collapse a focused question", async (_, key) => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByRole("button", { name: "What roles are you looking for?" });
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard(key);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/I'm looking for senior roles/)).toBeVisible();
    await user.keyboard(key);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });
});
