import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

async function setField(user, label, value) {
  const input = screen.getByLabelText(label);
  await user.clear(input);
  await user.type(input, value);
}

async function submitForm(user) {
  await user.click(screen.getByRole("button", { name: /send message/i }));
}

describe("Contact form validation", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
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

  it("shows error when name is too short", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "A");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
  });

  it("shows error when email is invalid", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "not-an-email");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("shows error when message is too short", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Short");
    await submitForm(user);
    expect(screen.getByText("Your message is too short. Please add more detail.")).toBeInTheDocument();
  });

  it("clears error when user corrects input after a validation failure", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "A");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    await setField(user, "Your Name", "Charm");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
  });

  it("silently blocks submission when form is filled too fast (bot guard)", async () => {
    render(<ContactPageClient />);
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.queryByText(/please enter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it("calls EmailJS with correct parameters on successful submission", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm Test");
    await setField(user, "Email Address", "charm@example.com");
    await setField(user, "Message", "This is a long enough test message");
    await submitForm(user);
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_tgrxl4a",
      "template_hbeyl4c",
      { from_name: "Charm Test", from_email: "charm@example.com", message: "This is a long enough test message" },
      "cXgAIzNSkZVXYkXyE"
    );
  });

  it("shows success message after email sends", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm Test");
    await setField(user, "Email Address", "charm@example.com");
    await setField(user, "Message", "This is a long enough test message");
    await submitForm(user);
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
  });
});
