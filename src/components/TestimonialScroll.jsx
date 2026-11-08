"use client";

import { useEffect, useRef } from "react";

export function TestimonialScroll({ children }) {
  const railRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Progressive enhancement: all quotes remain in normal flow without support.
    if (
      !window.CSS?.supports?.("animation-timeline", "--testimonials") ||
      !window.CSS.supports("animation-range", "contain") ||
      !window.CSS.supports("view-timeline-inset", "1px") ||
      !window.ResizeObserver
    ) return;

    const rail = railRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const media = window.matchMedia(
      "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
    );

    const measure = () => {
      const travel = `${Math.max(0, track.scrollHeight - viewport.clientHeight)}px`;
      if (rail.style.getPropertyValue("--testimonial-travel") !== travel) {
        rail.style.setProperty("--testimonial-travel", travel);
      }
    };
    const observer = new ResizeObserver(measure);
    const sync = () => {
      observer.disconnect();
      if (media.matches) {
        rail.dataset.scroll = "true";
        measure();
        observer.observe(viewport);
        observer.observe(track);
      } else {
        delete rail.dataset.scroll;
        rail.style.removeProperty("--testimonial-travel");
      }
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={railRef} className="testimonial-rail">
      <div ref={viewportRef} className="testimonial-viewport">
        <div ref={trackRef} className="testimonial-track">
          {children}
        </div>
      </div>
    </div>
  );
}
