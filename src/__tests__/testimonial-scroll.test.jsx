import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Testimonials } from "../components/Testimonials";

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

afterEach(() => vi.unstubAllGlobals());

function setupScroll(matches = true) {
  let resize;
  const observer = { observe: vi.fn(), disconnect: vi.fn() };
  vi.stubGlobal("ResizeObserver", class {
    constructor(callback) { resize = callback; return observer; }
  });
  const media = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal("matchMedia", () => media);
  return { media, observer, resize: () => resize() };
}

const viewportFor = () => screen.getAllByRole("article")[0].parentElement.parentElement;

describe("testimonial scrolling", () => {
  it("restores the desktop viewport and measures the full content travel", () => {
    const { observer, resize } = setupScroll();
    const { container, unmount } = render(<Testimonials />);
    const viewport = viewportFor();
    const track = viewport.firstChild;
    Object.defineProperty(track, "scrollHeight", { value: 1400 });
    act(() => resize());
    expect(viewport.style.height).toBe("800px");
    expect(viewport.style.overflow).toBe("hidden");
    expect(container.firstChild.style.minHeight).toBe("900px");
    expect(observer.observe).toHaveBeenCalledWith(track);
    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("releases clipping when the viewport shrinks or reduced motion is enabled", () => {
    const { media } = setupScroll();
    const { container, unmount } = render(<Testimonials />);
    const change = media.addEventListener.mock.calls[0][1];
    media.matches = false;
    act(() => change());
    expect(viewportFor().style.height).toBe("auto");
    expect(viewportFor().style.overflow).toBe("visible");
    expect(container.firstChild.style.minHeight).toBe("");
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByText(/make a positive impact on any team she joins/)).toBeVisible();
    unmount();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", change);
  });

  it("keeps every quote readable on initial narrow or reduced-motion rendering", () => {
    setupScroll(false);
    render(<Testimonials />);
    expect(viewportFor().style.overflow).toBe("visible");
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByText("Thiri Aung")).toBeVisible();
  });
});
