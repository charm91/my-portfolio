import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Header } from "../components/Header";

vi.mock("framer-motion", () => ({
  motion: new Proxy({}, {
    get: (_, tag) =>
      ({ children, initial, animate, transition, ...props }) =>
        React.createElement(tag, props, children),
  }),
  AnimatePresence: ({ children }) => <>{children}</>,
}));

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

vi.mock("@/lib/utils", () => ({ cn: (...c) => c.filter(Boolean).join(" ") }));

// jsdom does not implement IntersectionObserver — arrow fns can't be constructors
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

describe("Header", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
    mockPush.mockReset();
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
  });

  it("shows Back to Home link on non-home pages", () => {
    mockPathname.mockReturnValue("/betterhr");
    render(<Header />);
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /open menu/i })).not.toBeInTheDocument();
  });
});
