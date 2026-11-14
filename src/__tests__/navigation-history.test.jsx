import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Link from "next/link";
import { NavigationHistoryProvider, useReturnNavigation } from "../components/NavigationHistory";

const { pathname } = vi.hoisted(() => ({ pathname: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: pathname }));
vi.mock("next/link", async () => (await import("./test-utils/mocks")).nextLinkMock);

function Controls() {
  const navigation = useReturnNavigation();
  return <>
    <Link href="/contact-me" onClick={event => event.preventDefault()}>Contact</Link>
    <Link href="/betterhr" onClick={event => event.preventDefault()}>Project</Link>
    <Link href="#main-content" onClick={event => event.preventDefault()}>Skip</Link>
    <Link href="/contact-me" target="_blank" onClick={event => event.preventDefault()}>New tab</Link>
    <output>{navigation.previous?.url ?? "none"}</output>
    <button onClick={navigation.goBack}>Back</button>
  </>;
}

function mount() {
  const element = () => <NavigationHistoryProvider><Controls /></NavigationHistoryProvider>;
  const result = render(element());
  return {
    ...result,
    navigate(url, state = { nextField: "preserved" }) {
      act(() => {
        history.pushState(state, "", url);
        pathname.mockReturnValue(location.pathname);
        result.rerender(element());
      });
    },
    pop(url, state, replaceRouterState = false) {
      act(() => {
        history.replaceState(state, "", url);
        pathname.mockReturnValue(location.pathname);
        dispatchEvent(new PopStateEvent("popstate", { state }));
        if (replaceRouterState) history.replaceState({ nextField: "updated" }, "", url);
        result.rerender(element());
      });
    },
  };
}

beforeEach(() => {
  history.replaceState({ initialField: true }, "", "/portfolio");
  pathname.mockReturnValue("/portfolio");
  vi.stubGlobal("scrollX", 0);
  vi.stubGlobal("scrollY", 1350);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("return navigation", () => {
  it("has no guessed return point for a directly opened page", () => {
    history.replaceState(null, "", "/contact-me");
    pathname.mockReturnValue("/contact-me");
    mount();
    expect(screen.getByRole("status")).toHaveTextContent("none");
  });

  it.each(["/", "/portfolio"])("remembers the exact %s source position and preserves other history fields", source => {
    history.replaceState({ initialField: true }, "", source);
    pathname.mockReturnValue(source);
    const app = mount();
    fireEvent.click(screen.getByText("Contact"));
    expect(history.state.initialField).toBe(true);
    app.navigate("/contact-me");
    expect(screen.getByRole("status")).toHaveTextContent(source);
    expect(history.state.portfolioNavigation.previous).toMatchObject({ url: source, y: 1350 });
    expect(history.state.nextField).toBe("preserved");
  });

  it("uses the known history entry and restores its position on return", async () => {
    const app = mount();
    fireEvent.click(screen.getByText("Project"));
    const sourceState = history.state;
    app.navigate("/betterhr");
    const go = vi.spyOn(history, "go").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(go).toHaveBeenCalledWith(-1);
    app.pop("/portfolio", sourceState);
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledWith({ left: 0, top: 1350, behavior: "instant" }));
  });

  it("retains the known entry when the router replaces custom history fields during Back", async () => {
    const app = mount();
    fireEvent.click(screen.getByText("Project"));
    const sourceState = history.state;
    app.navigate("/betterhr");
    vi.spyOn(history, "go").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    app.pop("/portfolio", sourceState, true);
    expect(history.state.portfolioNavigation.key).toBe(sourceState.portfolioNavigation.key);
    expect(history.state.nextField).toBe("updated");
    await waitFor(() => expect(screen.getByText("Project")).toHaveFocus());
  });

  it("skips in-page history entries when returning to the source page", () => {
    const app = mount();
    fireEvent.click(screen.getByText("Project"));
    app.navigate("/betterhr");
    fireEvent.click(screen.getByText("Skip"));
    history.pushState(null, "", "/betterhr#main-content");
    act(() => dispatchEvent(new HashChangeEvent("hashchange")));
    const go = vi.spyOn(history, "go").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(go).toHaveBeenCalledWith(-2);
  });

  it("retains each origin through a nested journey and browser Forward", () => {
    const app = mount();
    fireEvent.click(screen.getByText("Contact"));
    const portfolioState = history.state;
    app.navigate("/contact-me");
    fireEvent.click(screen.getByText("Project"));
    const contactState = history.state;
    app.navigate("/betterhr");
    const projectState = history.state;
    expect(history.state.portfolioNavigation.previous).not.toHaveProperty("previous");
    app.pop("/contact-me", contactState);
    expect(screen.getByRole("status")).toHaveTextContent("/portfolio");
    app.pop("/portfolio", portfolioState);
    expect(screen.getByRole("status")).toHaveTextContent("none");
    app.pop("/betterhr", projectState);
    expect(screen.getByRole("status")).toHaveTextContent("/contact-me");
  });

  it("retains the verified return point after a refresh", () => {
    const app = mount();
    fireEvent.click(screen.getByText("Contact"));
    app.navigate("/contact-me");
    app.unmount();
    mount();
    expect(screen.getByRole("status")).toHaveTextContent("/portfolio");
  });

  it.each(["ctrlKey", "metaKey", "shiftKey", "altKey"])("does not create return state for a %s click", modifier => {
    const app = mount();
    fireEvent.click(screen.getByText("Contact"), { [modifier]: true });
    app.navigate("/contact-me");
    expect(screen.getByRole("status")).toHaveTextContent("none");
  });

  it("does not create return state for a link opened in a new tab", () => {
    const app = mount();
    fireEvent.click(screen.getByText("New tab"));
    app.navigate("/contact-me");
    expect(screen.getByRole("status")).toHaveTextContent("none");
  });
});
