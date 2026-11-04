import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { ScrollToSection } from "../../app/ScrollToSection";

const query = vi.hoisted(() => ({ value: null }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(query.value === null ? "" : { scrollTo: query.value }),
}));

function renderTargets() {
  const result = render(<>
    <section id="portfolio" />
    <section id="contact" />
    <ScrollToSection />
  </>);
  const portfolio = document.getElementById("portfolio");
  const contact = document.getElementById("contact");
  portfolio.scrollIntoView = vi.fn();
  contact.scrollIntoView = vi.fn();
  return { ...result, portfolio, contact };
}

describe("ScrollToSection query navigation", () => {
  beforeEach(() => {
    query.value = null;
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it.each(["portfolio", "#portfolio"])("scrolls to %s after the layout delay", (value) => {
    query.value = value;
    const { portfolio, contact } = renderTargets();
    act(() => vi.advanceTimersByTime(99));
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(portfolio.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth", block: "start" });
    expect(contact.scrollIntoView).not.toHaveBeenCalled();
  });

  it.each([null, "", "missing-section"])("leaves existing sections alone for query %s", (value) => {
    query.value = value;
    const { portfolio, contact } = renderTargets();
    act(() => vi.runAllTimers());
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
    expect(contact.scrollIntoView).not.toHaveBeenCalled();
  });

  it("cancels the previous target when the query changes before its deadline", () => {
    query.value = "portfolio";
    const { rerender, portfolio, contact } = renderTargets();
    act(() => vi.advanceTimersByTime(50));
    query.value = "contact";
    rerender(<><section id="portfolio" /><section id="contact" /><ScrollToSection /></>);
    act(() => vi.advanceTimersByTime(50));
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
    expect(contact.scrollIntoView).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(50));
    expect(contact.scrollIntoView).toHaveBeenCalledExactlyOnceWith({ behavior: "smooth", block: "start" });
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
  });

  it("cancels a queued scroll when the query is removed", () => {
    query.value = "portfolio";
    const { rerender, portfolio } = renderTargets();
    query.value = null;
    rerender(<><section id="portfolio" /><section id="contact" /><ScrollToSection /></>);
    act(() => vi.runAllTimers());
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
  });

  it("cancels a queued scroll on unmount", () => {
    query.value = "portfolio";
    const { unmount, portfolio } = renderTargets();
    unmount();
    act(() => vi.runAllTimers());
    expect(portfolio.scrollIntoView).not.toHaveBeenCalled();
  });
});
