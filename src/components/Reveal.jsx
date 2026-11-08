"use client";

import { useEffect, useRef } from "react";
import { spring } from "framer-motion";
import { animate } from "framer-motion/dom/mini";
import { MOTION, revealPresets } from "@/config/motion";

function useReveal(ref, preset, group = false, mobileOnly = false) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver || !window.matchMedia) return;

    const elements = group ? Array.from(root.children) : [root];
    const pending = new Set(elements);
    const running = new Map();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const config = revealPresets[preset];

    const finish = (element) => {
      running.get(element)?.stop();
      running.delete(element);
      pending.delete(element);
      element.dataset.reveal = "done";
      element.style.opacity = "1";
      element.style.transform = "none";
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !pending.has(entry.target)) continue;
        const element = entry.target;
        observer.unobserve(element);
        pending.delete(element);
        if (reduced.matches || (mobileOnly && desktop.matches) || element.contains(document.activeElement)) {
          finish(element);
          continue;
        }

        const distance = desktop.matches ? config.distance : Math.min(12, config.distance);
        const stagger = preset === "process" ? MOTION.processStagger : MOTION.stagger;
        // Coordinate pairs on desktop; each mobile card waits for its own entry.
        const delay = group && desktop.matches ? (elements.indexOf(element) % 2) * stagger : 0;
        element.dataset.reveal = "running";
        const controls = animate(element, {
          opacity: [0, 1],
          transform: [`translateY(${distance}px) scale(${config.scale})`, "translateY(0px) scale(1)"],
        }, {
          ...config.transition,
          ...(config.transition.type === "spring" ? { type: spring } : {}),
          delay,
          opacity: { duration: MOTION.reveal, ease: MOTION.easeOut, delay },
        });
        running.set(element, controls);
        controls.then(() => {
          if (!running.has(element)) return;
          running.delete(element);
          element.dataset.reveal = "done";
          element.style.transform = "none";
        });
      }
    }, { rootMargin: "0px 0px -16px 0px", threshold: 0 });

    for (const element of elements) {
      // Restored positions and first-paint content must not disappear on hydration.
      if (reduced.matches || (mobileOnly && desktop.matches) || element.getBoundingClientRect().top < window.innerHeight) {
        finish(element);
      } else {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }

    const reduceMotion = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      elements.forEach(finish);
    };
    const widen = () => {
      if (mobileOnly && desktop.matches) {
        observer.disconnect();
        elements.forEach(finish);
      }
    };
    reduced.addEventListener?.("change", reduceMotion);
    desktop.addEventListener?.("change", widen);
    return () => {
      observer.disconnect();
      reduced.removeEventListener?.("change", reduceMotion);
      desktop.removeEventListener?.("change", widen);
      running.forEach((controls) => controls.stop());
      running.clear();
    };
  }, [ref, preset, group, mobileOnly]);
}

export function Reveal({ as = "div", preset = "section", mobileOnly = false, className = "", children, ...props }) {
  const ref = useRef(null);
  useReveal(ref, preset, false, mobileOnly);
  const Component = as;
  return <Component {...props} ref={ref} className={`motion-reveal ${className}`}>{children}</Component>;
}

export function RevealGrid({ preset = "section", children, ...props }) {
  const ref = useRef(null);
  useReveal(ref, preset, true);
  return <div {...props} ref={ref}>{children}</div>;
}
