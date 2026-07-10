import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import emailjs from "@emailjs/browser";
import ContactPageClient from "../../app/contact-me/ContactPageClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
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

vi.mock("@/lib/utils", () => ({
  cn: (...classes) => classes.filter(Boolean).join(" "),
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
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  function renderAndAdvanceTime() {
    render(<ContactPageClient />);
    vi.setSystemTime(4000);
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
    setField("Your Name", "Charm", "name");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });

  it("silently blocks submission when form is filled too fast (bot guard)", () => {
    render(<ContactPageClient />);
    setField("Your Name", "Charm", "name");
    setField("Email Address", "valid@example.com", "email");
    setField("Message", "Long enough message here", "message");
    submitForm();
    expect(screen.queryByText(/please enter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it("calls EmailJS with correct parameters on successful submission", async () => {
    renderAndAdvanceTime();
    setField("Your Name", "Charm Test", "name");
    setField("Email Address", "charm@example.com", "email");
    setField("Message", "This is a long enough test message", "message");
    await act(async () => { submitForm(); });
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_tgrxl4a",
      "template_hbeyl4c",
      { from_name: "Charm Test", from_email: "charm@example.com", message: "This is a long enough test message" },
      "cXgAIzNSkZVXYkXyE"
    );
  });

  it("shows success message after email sends", async () => {
    renderAndAdvanceTime();
    setField("Your Name", "Charm Test", "name");
    setField("Email Address", "charm@example.com", "email");
    setField("Message", "This is a long enough test message", "message");
    await act(async () => { submitForm(); });
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
  });
});
