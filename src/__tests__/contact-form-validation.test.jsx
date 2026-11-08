import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import ContactPageClient from "../../app/contact-me/ContactPageClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/contact-me",
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

async function fillValidForm(user) {
  await setField(user, "Your Name", "Charm Test");
  await setField(user, "Email Address", "charm@example.com");
  await setField(user, "Message", "This is a long enough test message");
}

function expectNoSendFeedback() {
  expect(emailjs.send).not.toHaveBeenCalled();
  expect(screen.queryByText(/please enter|something went wrong|your message has been sent/i)).not.toBeInTheDocument();
}

describe("Contact form validation", () => {
  let user;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(0);
    user = userEvent.setup();
    emailjs.send.mockReset().mockResolvedValue({});
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  function renderAndAdvanceTime() {
    render(<ContactPageClient />);
    vi.setSystemTime(4000);
  }

  it("links the logo and Back to Home to the homepage", () => {
    render(<ContactPageClient />);
    expect(screen.getByRole("link", { name: "Charm" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
  });

  it("shows error when name is too short", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "A");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter your full name.");
    expect(screen.getByLabelText("Your Name")).toHaveFocus();
    expect(screen.getByLabelText("Your Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Your Name")).toHaveAccessibleDescription("Please enter your full name.");
  });

  it("shows error when email is invalid", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "not-an-email");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toHaveFocus();
    expect(screen.getByLabelText("Email Address")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email Address")).toHaveAccessibleDescription("Please enter a valid email address.");
  });

  it("shows error when message is too short", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Short");
    await submitForm(user);
    expect(screen.getByText("Your message is too short. Please add more detail.")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toHaveFocus();
    expect(screen.getByLabelText("Message")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Message")).toHaveAccessibleDescription("Your message is too short. Please add more detail.");
  });

  it("clears error when user corrects input after a validation failure", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "A");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    await setField(user, "Email Address", "updated@example.com");
    expect(screen.getByLabelText("Your Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    await setField(user, "Your Name", "Charm");
    expect(screen.queryByText("Please enter your full name.")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Your Name")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByLabelText("Your Name")).not.toHaveAttribute("aria-describedby");
  });

  it("silently blocks submission when form is filled too fast (bot guard)", async () => {
    render(<ContactPageClient />);
    await setField(user, "Your Name", "Charm");
    await setField(user, "Email Address", "valid@example.com");
    await setField(user, "Message", "Long enough message here");
    await submitForm(user);
    expect(emailjs.send).not.toHaveBeenCalled();
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
    expect(screen.getByRole("status")).toHaveTextContent(/your message has been sent/i);
    expect(screen.getByLabelText("Your Name")).toHaveValue("");
    expect(screen.getByLabelText("Email Address")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("blocks at 2999ms and permits a send at the 3000ms fill-time boundary", async () => {
    render(<ContactPageClient />);
    await fillValidForm(user);
    vi.setSystemTime(2999);
    await submitForm(user);
    expectNoSendFeedback();

    vi.setSystemTime(3000);
    await submitForm(user);
    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
  });

  it("silently rejects a filled honeypot even with valid fields and enough fill time", async () => {
    const { container } = render(<ContactPageClient />);
    await fillValidForm(user);
    vi.setSystemTime(4000);
    fireEvent.change(container.querySelector('input[name="website"]'), {
      target: { value: "https://bot.example" },
    });
    await submitForm(user);
    expectNoSendFeedback();
  });

  it("does not start a cooldown for validation errors", async () => {
    renderAndAdvanceTime();
    await setField(user, "Your Name", "A");
    await submitForm(user);
    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled();

    await fillValidForm(user);
    await submitForm(user);
    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });

  it.each(["success", "failure"])("enforces the full 30s cooldown after %s and permits a retry at the boundary", async (outcome) => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    if (outcome === "failure") {
      emailjs.send.mockRejectedValueOnce(new Error("Synthetic delivery failure"));
    }
    const { container } = render(<ContactPageClient />);
    vi.setSystemTime(4000);
    await fillValidForm(user);
    // Only the cooldown uses scheduled fake timers. Keep userEvent's async
    // cleanup on real timers while typing, then submit inside act directly.
    vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
    await act(async () => fireEvent.submit(container.querySelector("form")));
    expect(emailjs.send).toHaveBeenCalledTimes(1);

    if (outcome === "failure") {
      expect(consoleError).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Something went wrong. Please try again in a moment.")).toBeInTheDocument();
      expect(screen.getByLabelText("Your Name")).toHaveValue("Charm Test");
      expect(screen.getByLabelText("Email Address")).toHaveValue("charm@example.com");
      expect(screen.getByLabelText("Message")).toHaveValue("This is a long enough test message");
    } else {
      for (const [label, value] of [
        ["Your Name", "Charm Test"],
        ["Email Address", "charm@example.com"],
        ["Message", "This is a long enough test message"],
      ]) {
        fireEvent.change(screen.getByLabelText(label), { target: { value } });
      }
    }

    const submit = screen.getByRole("button", { name: "Try again in 30s" });
    expect(submit).toBeDisabled();
    fireEvent.click(submit);
    fireEvent.submit(container.querySelector("form"));
    expect(emailjs.send).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(29999));
    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent("Try again in 1s");
    fireEvent.submit(container.querySelector("form"));
    expect(emailjs.send).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(1));
    expect(submit).toBeEnabled();
    expect(submit).toHaveTextContent("Send Message");
    await act(async () => fireEvent.click(submit));
    expect(emailjs.send).toHaveBeenCalledTimes(2);
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
  });

  it("locks inputs and prevents another button submission while delivery is pending, even after cooldown", async () => {
    let resolveDelivery;
    emailjs.send.mockReturnValueOnce(new Promise((resolve) => { resolveDelivery = resolve; }));
    renderAndAdvanceTime();
    await fillValidForm(user);
    vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
    await act(async () => fireEvent.click(screen.getByRole("button", { name: /send message/i })));

    const sending = screen.getByRole("button", { name: /sending/i });
    expect(sending).toBeDisabled();
    for (const label of ["Your Name", "Email Address", "Message"]) {
      expect(screen.getByLabelText(label)).toBeDisabled();
    }
    act(() => vi.advanceTimersByTime(30000));
    fireEvent.click(sending);
    expect(sending).toBeDisabled();
    expect(emailjs.send).toHaveBeenCalledTimes(1);

    await act(async () => resolveDelivery({}));
    expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument();
    for (const label of ["Your Name", "Email Address", "Message"]) {
      expect(screen.getByLabelText(label)).toBeEnabled();
      expect(screen.getByLabelText(label)).toHaveValue("");
    }
  });
});
