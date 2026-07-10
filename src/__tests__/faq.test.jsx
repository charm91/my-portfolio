import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
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

// Stateful mock that simulates real expand/collapse so click tests are meaningful
vi.mock("@/components/ui/accordion", () => {
  const AccordionContext = React.createContext({ open: false, onToggle: () => {} });

  const Accordion = ({ children }) => <div>{children}</div>;

  const AccordionItem = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <AccordionContext.Provider value={{ open, onToggle: () => setOpen((o) => !o) }}>
        <div>{children}</div>
      </AccordionContext.Provider>
    );
  };

  const AccordionTrigger = ({ children }) => {
    const { open, onToggle } = React.useContext(AccordionContext);
    return <button aria-expanded={open} onClick={onToggle}>{children}</button>;
  };

  const AccordionContent = ({ children }) => {
    const { open } = React.useContext(AccordionContext);
    return open ? <div>{children}</div> : null;
  };

  return { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
});

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
    expect(screen.queryByText(/I'm looking for senior roles/)).not.toBeInTheDocument();
  });

  it("clicking a trigger reveals its answer", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByText("What roles are you looking for?");
    await user.click(trigger);
    expect(screen.getByText(/I'm looking for senior roles/)).toBeInTheDocument();
  });

  it("clicking an open trigger collapses it", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const trigger = screen.getByText("What roles are you looking for?");
    await user.click(trigger);
    expect(screen.getByText(/I'm looking for senior roles/)).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByText(/I'm looking for senior roles/)).not.toBeInTheDocument();
  });
});
