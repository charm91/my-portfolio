import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import ContactPageClient from "../../app/contact-me/ContactPageClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Render each motion.* as its correct HTML tag so form/button semantics work
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        ({ children, initial, animate, transition, viewport, whileInView, style, ...props }) =>
          React.createElement(tag, { style, ...props }, children),
    }
  ),
  AnimatePresence: ({ children }) => children,
}));

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn().mockResolvedValue({}) },
}));

vi.mock("@/config/site", () => ({
  SITE: { displayName: "Charm", email: "test@example.com" },
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  Loader2: () => <span data-testid="loader" />,
}));

function setField(label, value, fieldName) {
  fireEvent.change(screen.getByLabelText(label), {
    target: { name: fieldName, value },
  });
}

function submitForm() {
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));
}

describe("Contact form validation", () => {
  beforeEach(() => {
    // Only fake Date so form timing guard (MIN_SUBMIT_MS) is controllable
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function renderAndAdvanceTime() {
    render(<ContactPageClient />); // formLoadTime.current = Date.now() = 0
    vi.setSystemTime(4000);        // skip past MIN_SUBMIT_MS=3000
  }

  it("shows error when name is too short", () => {
    renderAndAdvanceTime();
    setField("Your Name", "A", "name");
    setField("Email Address", "valid@example.com", "email");
    setField("Message", "Long enough message here", "message");
    submitForm();
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
  });

  it("shows error when email is invalid", () => {
    renderAndAdvanceTime();
    setField("Your Name", "Charm", "name");
    setField("Email Address", "not-an-email", "email");
    setField("Message", "Long enough message here", "message");
    submitForm();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("shows error when message is too short", () => {
    renderAndAdvanceTime();
    setField("Your Name", "Charm", "name");
    setField("Email Address", "valid@example.com", "email");
    setField("Message", "Short", "message");
    submitForm();
    expect(screen.getByText("Your message is too short. Please add more detail.")).toBeInTheDocument();
  });

  it("clears error when user corrects input after a validation failure", () => {
    renderAndAdvanceTime();
    setField("Your Name", "A", "name");
    setField("Email Address", "valid@example.com", "email");
    setField("Message", "Long enough message here", "message");
    submitForm();
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();

    // Correcting the name clears the error
    setField("Your Name", "Charm", "name");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });

  it("silently blocks submission when form is filled too fast (bot guard)", () => {
    render(<ContactPageClient />); // Date stays at 0 — no time advance
    setField("Your Name", "Charm", "name");
    setField("Email Address", "valid@example.com", "email");
    setField("Message", "Long enough message here", "message");
    submitForm(); // Date.now() - formLoadTime = 0 < 3000 — silently ignored
    expect(screen.queryByText(/please enter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
