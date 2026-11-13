"use client";

import { MotionConfig } from "framer-motion";
import { useSyncExternalStore } from "react";

function subscribe(listener) {
  const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  media?.addEventListener("change", listener);
  return () => media?.removeEventListener("change", listener);
}

function getSnapshot() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function MotionProvider({ children }) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return (
    <MotionConfig reducedMotion="user" transition={{ reduceMotion: reducedMotion }}>
      {children}
    </MotionConfig>
  );
}
