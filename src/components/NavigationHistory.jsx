"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NavigationHistory = createContext(null);
const STATE_KEY = "portfolioNavigation";
const currentUrl = () => location.pathname + location.search + location.hash;

function validEntry(entry) {
  if (!entry || typeof entry.key !== "string" || !Number.isInteger(entry.index) || entry.index < 0) return false;
  if (typeof entry.url !== "string" || !entry.url.startsWith("/") || entry.url.startsWith("//")) return false;
  return Number.isFinite(entry.x) && Number.isFinite(entry.y);
}

function saveEntry(entry) {
  history.replaceState({ ...history.state, [STATE_KEY]: entry }, "");
}

export function NavigationHistoryProvider({ children }) {
  const pathname = usePathname();
  const [entry, setEntry] = useState(null);
  const active = useRef(null);
  const pending = useRef(null);
  const restore = useRef(null);
  const synchronize = useRef(null);

  useEffect(() => {
    const sync = () => {
      const url = currentUrl();
      const stored = history.state?.[STATE_KEY];
      let next = validEntry(stored) && stored.url === url ? stored : null;
      // Router state updates can remove custom fields from the same history entry.
      if (!next && active.current?.url === url) {
        next = active.current;
        saveEntry(next);
      }
      if (!next) {
        const source = pending.current?.destination === url ? pending.current.source : null;
        const samePage = active.current && new URL(active.current.url, location.origin).pathname === location.pathname
          && new URL(active.current.url, location.origin).search === location.search;
        const previous = source || (samePage ? active.current : null);
        next = {
          key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          index: previous ? previous.index + 1 : 0,
          url,
          x: scrollX,
          y: scrollY,
          previous: source && new URL(source.url, location.origin).pathname !== location.pathname
            ? { key: source.key, index: source.index, url: source.url, x: source.x, y: source.y, focus: source.focus }
            : previous?.previous ?? null,
        };
        saveEntry(next);
      }
      pending.current = null;
      active.current = next;
      setEntry(current => current?.key === next.key ? current : next);
    };

    const remember = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.href === location.href) return;
      const source = {
        ...active.current,
        url: currentUrl(), x: scrollX, y: scrollY,
        focus: { href: link.getAttribute("href"), section: link.closest("[id]")?.id, menu: !!link.closest("header") },
      };
      if (!validEntry(source)) return;
      saveEntry(source);
      active.current = source;
      pending.current = { destination: url.pathname + url.search + url.hash, source };
    };

    synchronize.current = sync;
    sync();
    document.addEventListener("click", remember, true);
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      synchronize.current = null;
      document.removeEventListener("click", remember, true);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => { synchronize.current?.(); }, [pathname]);

  useEffect(() => {
    const target = restore.current;
    if (!target || target.key !== entry?.key || new URL(target.url, location.origin).pathname !== pathname) return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ left: target.x, top: target.y, behavior: "instant" });
      const scope = target.focus?.section ? document.getElementById(target.focus.section) : document;
      const control = target.focus?.menu
        ? document.querySelector('header button[aria-controls]')
        : Array.from(scope?.querySelectorAll("a[href]") ?? []).find(link => link.getAttribute("href") === target.focus?.href);
      control?.focus({ preventScroll: true });
      restore.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [entry, pathname]);

  const previous = validEntry(entry?.previous) && entry.previous.index < entry.index ? entry.previous : null;
  const goBack = () => {
    if (!previous) return;
    pending.current = null;
    restore.current = previous;
    history.go(previous.index - entry.index);
  };

  return <NavigationHistory.Provider value={{ previous, goBack }}>{children}</NavigationHistory.Provider>;
}

export const useReturnNavigation = () => useContext(NavigationHistory);
