"use client";

import { useEffect, useRef } from "react";
import { spring } from "framer-motion";
import { animate } from "framer-motion/dom/mini";
import { MOTION, revealPresets } from "@/config/motion";

function useReveal(ref, preset, group = false, mobileOnly = false, entryDelay = 0) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver || !window.matchMedia) return;

    const elements = group ? Array.from(root.children) : [root];
    const pending = new Set(elements);
    const running = new Map();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const config = revealPresets[preset];
    // Short landscape viewports must still be able to reveal a tall card.
    const visibleFraction = (window.innerHeight * 0.6) / (root.getBoundingClientRect().height || 1);
    const amount = Math.min(config.amount ?? 0, visibleFraction);
    const startTransform = `translateY(${config.distance}px) scale(${config.scale})`;

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
        if (
          !entry.isIntersecting ||
          (entry.intersectionRatio ?? 1) < amount ||
          !pending.has(entry.target)
        ) continue;
        const element = entry.target;
        observer.unobserve(element);
        pending.delete(element);
        if (reduced.matches || (mobileOnly && desktop.matches) || element.contains(document.activeElement)) {
          finish(element);
          continue;
        }

        const stagger = preset === "process" ? MOTION.processStagger : MOTION.stagger;
        // Restore the full desktop sequence; mobile cards enter independently.
        const desktopDelay = group ? elements.indexOf(element) * stagger : entryDelay;
        const delay = desktop.matches ? desktopDelay : 0;
        element.dataset.reveal = "running";
        const controls = animate(element, {
          opacity: [0, 1],
          transform: [startTransform, "translateY(0px) scale(1)"],
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
    }, { rootMargin: group ? "0px 0px -60px 0px" : "0px", threshold: amount });

    for (const element of elements) {
      const bounds = element.getBoundingClientRect();
      // Skip content above a restored scroll position. Overview and project
      // cards also play their original entrance when visible on a fresh visit.
      const skipVisible = !config.animateOnMount && bounds.top < window.innerHeight;
      if (reduced.matches || (mobileOnly && desktop.matches) || bounds.bottom <= 0 || skipVisible) {
        finish(element);
      } else {
        element.dataset.reveal = "pending";
        // Prepare below the viewport so a later reveal never visibly snaps
        // from full size back to its starting scale at the trigger point.
        element.style.opacity = "0";
        element.style.transform = startTransform;
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
    const showFocused = (event) => {
      const element = elements.find((candidate) => candidate.contains(event.target));
      if (!element) return;
      observer.unobserve(element);
      finish(element);
    };
    root.addEventListener("focusin", showFocused);
    reduced.addEventListener?.("change", reduceMotion);
    desktop.addEventListener?.("change", widen);
    return () => {
      observer.disconnect();
      reduced.removeEventListener?.("change", reduceMotion);
      desktop.removeEventListener?.("change", widen);
      root.removeEventListener("focusin", showFocused);
      running.forEach((controls) => controls.stop());
      running.clear();
    };
  }, [ref, preset, group, mobileOnly, entryDelay]);
}

export function Reveal({ as = "div", preset = "section", mobileOnly = false, delay = 0, className = "", children, ...props }) {
  const ref = useRef(null);
  useReveal(ref, preset, false, mobileOnly, delay);
  const Component = as;
  return <Component {...props} ref={ref} className={`motion-reveal ${className}`}>{children}</Component>;
}

export function RevealGrid({ preset = "section", children, ...props }) {
  const ref = useRef(null);
  useReveal(ref, preset, true);
  return <div {...props} ref={ref}>{children}</div>;
}
