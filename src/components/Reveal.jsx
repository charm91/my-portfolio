"use client";

import { useContext, useEffect, useRef } from "react";
import { motion, MotionConfigContext } from "framer-motion";
import { cn } from "@/lib/utils";

const elements = { div: motion.div, article: motion.article, h2: motion.h2 };

export function Reveal({ as = "div", className, transition, ...props }) {
  const ref = useRef(null);
  const { transition: defaults } = useContext(MotionConfigContext);
  const Component = elements[as];

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const bounds = ref.current.getBoundingClientRect();
    // Content already on screen stays visible when hydration finishes late.
    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      ref.current.dataset.revealReady = "true";
    }
  }, []);

  return (
    <Component
      {...props}
      ref={ref}
      className={cn("scroll-reveal", className)}
      transition={{ ...defaults, ...transition }}
    />
  );
}
