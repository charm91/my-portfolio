import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Header } from "../components/Header";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

const mockPush = vi.fn();
const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }) =>
    asChild ? children : <button {...props}>{children}</button>,
}));

// jsdom does not implement IntersectionObserver — arrow fns can't be constructors
class MockIntersectionObserver {
  static instances = [];
  constructor(callback) {
    this.notify = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

const destinations = [
  ["Home", "home"],
  ["What I Do", "services"],
  ["Portfolio", "portfolio"],
  ["Testimonials", "testimonials"],
  ["FAQ", "faq"],
];

function renderWithSections() {
  const result = render(<>
    {destinations.map(([, id]) => <section id={id} key={id} />)}
    <Header />
  </>);
  const sections = Object.fromEntries(destinations.map(([, id]) => {
    const element = document.getElementById(id);
    element.scrollIntoView = vi.fn();
    return [id, element];
  }));
  return { ...result, sections };
}

describe("Header", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    mockPathname.mockReturnValue("/");
    mockPush.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders the logo image", () => {
    render(<Header />);
    expect(screen.getByAltText("Charm")).toBeInTheDocument();
  });

  it("renders a Menu button on the home page", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens the nav menu and shows all nav items on click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute("href", "/contact-me");
  });

  it("shows Back to Home link on non-home pages", () => {
    mockPathname.mockReturnValue("/betterhr");
    render(<Header />);
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("button", { name: /open menu/i })).not.toBeInTheDocument();
  });

  it("exposes its open state and restores trigger focus on Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(trigger.getAttribute("aria-controls")))
      .toContainElement(screen.getByRole("navigation"));
    await user.tab();
    expect(screen.getByRole("button", { name: "Home", exact: true })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("dismisses the disclosure when keyboard focus leaves it", async () => {
    const user = userEvent.setup();
    render(<><Header /><button>After header</button></>);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    for (let index = 0; index < 7; index += 1) await user.tab();
    expect(screen.getByRole("button", { name: "After header" })).toHaveFocus();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it.each(destinations)("choosing %s scrolls to %s and closes the menu", async (label, id) => {
    const user = userEvent.setup();
    const { sections } = renderWithSections();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: label, exact: true }));
    expect(sections[id].scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth" });
    for (const [otherId, element] of Object.entries(sections)) {
      if (otherId !== id) expect(element.scrollIntoView).not.toHaveBeenCalled();
    }
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("respects reduced motion for menu navigation", async () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    const user = userEvent.setup();
    const { sections } = renderWithSections();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Testimonials", exact: true }));
    expect(sections.testimonials.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "auto" });
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("keeps the menu open for interior clicks and dismisses it with the trigger or outside click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("navigation"));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(document.body);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("highlights the furthest visible section regardless of notification order and falls back when it leaves", async () => {
    const user = userEvent.setup();
    const { sections } = renderWithSections();
    const observer = MockIntersectionObserver.instances[0];
    expect(observer.observe.mock.calls.map(([element]) => element)).toEqual(Object.values(sections));
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Home", exact: true })).toHaveClass("text-white");

    act(() => observer.notify([
      { target: sections.portfolio, isIntersecting: true },
      { target: sections.home, isIntersecting: true },
      { target: sections.services, isIntersecting: true },
    ]));
    expect(screen.getByRole("button", { name: "Portfolio", exact: true })).toHaveClass("text-white");
    expect(screen.getByRole("button", { name: "Home", exact: true })).not.toHaveClass("text-white");
    act(() => observer.notify([{ target: sections.portfolio, isIntersecting: false }]));
    expect(screen.getByRole("button", { name: "What I Do", exact: true })).toHaveClass("text-white");
    act(() => observer.notify([{ target: sections.portfolio, isIntersecting: true }]));
    expect(screen.getByRole("button", { name: "Portfolio", exact: true })).toHaveClass("text-white");
  });
});
