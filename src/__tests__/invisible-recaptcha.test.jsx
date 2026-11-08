import { createRef } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InvisibleRecaptcha } from "@/components/InvisibleRecaptcha";

const script = vi.hoisted(() => ({ props: null }));
vi.mock("next/script", () => ({
  default: (props) => {
    script.props = props;
    return null;
  },
}));

describe("InvisibleRecaptcha", () => {
  let ref;
  let callbacks;

  beforeEach(() => {
    vi.useFakeTimers();
    ref = createRef();
    window.grecaptcha = {
      ready: vi.fn((callback) => callback()),
      render: vi.fn((_, options) => { callbacks = options; return 0; }),
      execute: vi.fn(),
      reset: vi.fn(),
    };
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    delete window.grecaptcha;
  });

  function renderReady() {
    const view = render(<InvisibleRecaptcha ref={ref} />);
    act(() => script.props.onReady());
    return view;
  }

  it("waits for the Google API and renders an invisible widget only once", async () => {
    let ready;
    window.grecaptcha.ready.mockImplementation((callback) => { ready = callback; });
    renderReady();
    await expect(ref.current.execute()).rejects.toThrow("still loading");
    expect(window.grecaptcha.render).not.toHaveBeenCalled();
    act(() => ready());
    act(() => script.props.onReady());
    act(() => ready());
    expect(window.grecaptcha.render).toHaveBeenCalledTimes(1);
    expect(callbacks).toMatchObject({ size: "invisible", badge: "bottomright" });
  });

  it("returns the token and resets widget zero before every fresh verification", async () => {
    renderReady();
    for (const token of ["first-token", "second-token"]) {
      const verification = ref.current.execute();
      expect(window.grecaptcha.execute).toHaveBeenLastCalledWith(0);
      act(() => callbacks.callback(token));
      await expect(verification).resolves.toBe(token);
    }
    expect(window.grecaptcha.reset).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each([
    ["expired-callback", "expired"],
    ["error-callback", "check your connection"],
    ["callback", "failed"],
  ])("rejects on %s and permits retry", async (callback, message) => {
    renderReady();
    const verification = ref.current.execute();
    const result = expect(verification).rejects.toThrow(message);
    act(() => callbacks[callback](""));
    await result;
    const retry = ref.current.execute();
    act(() => callbacks.callback("retry-token"));
    await expect(retry).resolves.toBe("retry-token");
  });

  it("rejects duplicate executions and cancels an active challenge", async () => {
    renderReady();
    const verification = ref.current.execute();
    const result = expect(verification).rejects.toMatchObject({ name: "AbortError" });
    await expect(ref.current.execute()).rejects.toThrow("already in progress");
    act(() => ref.current.cancel());
    await result;
    expect(window.grecaptcha.reset).toHaveBeenLastCalledWith(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("times out a challenge and clears the pending request", async () => {
    renderReady();
    const result = expect(ref.current.execute()).rejects.toThrow("timed out");
    act(() => vi.advanceTimersByTime(120000));
    await result;
    expect(vi.getTimerCount()).toBe(0);
  });

  it("cancels pending verification on unmount", async () => {
    const { unmount } = renderReady();
    const result = expect(ref.current.execute()).rejects.toMatchObject({ name: "AbortError" });
    unmount();
    await result;
    expect(vi.getTimerCount()).toBe(0);
  });

  it("reports blocked scripts and render failures without sending", async () => {
    render(<InvisibleRecaptcha ref={ref} />);
    act(() => script.props.onError());
    await expect(ref.current.execute()).rejects.toThrow("could not load");
    cleanup();
    window.grecaptcha.render.mockImplementation(() => { throw new Error("render failed"); });
    renderReady();
    await expect(ref.current.execute()).rejects.toThrow("could not load");
  });

  it("does not render when API readiness arrives after unmount", () => {
    let ready;
    window.grecaptcha.ready.mockImplementation((callback) => { ready = callback; });
    const { unmount } = renderReady();
    unmount();
    act(() => ready());
    expect(window.grecaptcha.render).not.toHaveBeenCalled();
  });
});
