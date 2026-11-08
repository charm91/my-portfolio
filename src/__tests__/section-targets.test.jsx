import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { OverviewGrid } from "../components/OverviewGrid";
import { Services } from "../components/Services";
import { Portfolio } from "../components/Portfolio";
import { Journey } from "../components/Journey";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// jsdom does not implement these browser APIs, and the mocks must be constructible classes.
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
}

const homeSectionIds = ["home", "services", "portfolio", "testimonials", "faq", "contact"];

describe("Home section navigation targets", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  async function renderHomeWithMenuOpen() {
    const { container } = render(<>
      <Header />
      <Hero />
      <OverviewGrid />
      <Services />
      <Portfolio />
      <Journey />
      <Testimonials />
      <FAQ />
      <Footer />
    </>);
    await userEvent.setup().click(screen.getByRole("button", { name: "Open menu" }));
    return container;
  }

  it.each(homeSectionIds)("renders exactly one real element with id %s", async (id) => {
    const container = await renderHomeWithMenuOpen();
    expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
  });

  it("points every in-page link at a rendered section", async () => {
    const container = await renderHomeWithMenuOpen();
    const fragmentLinks = [...container.querySelectorAll('a[href^="#"]')];
    const targets = new Set(fragmentLinks.map((link) => link.getAttribute("href").slice(1)));
    expect(targets).toEqual(new Set(homeSectionIds));
    for (const link of fragmentLinks) {
      expect(container.querySelector(`[id="${link.getAttribute("href").slice(1)}"]`), link.outerHTML).not.toBeNull();
    }
  });
});
