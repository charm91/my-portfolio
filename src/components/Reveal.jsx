"use client";

import { useContext, useEffect, useRef } from "react";
import { motion, MotionConfigContext } from "framer-motion";
import { cn } from "@/lib/utils";

const elements = {
  div: motion.div,
  article: motion.article,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  header: motion.header,
  form: motion.form,
};

// The standard section reveal: fade up by `y` pixels once, when scrolled into view.
export const fadeUp = (y) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
});

export function Reveal({ as = "div", entrance = false, className, transition, ...props }) {
  const ref = useRef(null);
  const { transition: defaults } = useContext(MotionConfigContext);
  const Component = elements[as];

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const bounds = ref.current.getBoundingClientRect();
    // Keep already-visible content readable unless its introduction is intentional.
    if (entrance || bounds.top >= window.innerHeight || bounds.bottom <= 0) {
      ref.current.dataset.revealReady = "true";
    }
  }, [entrance]);

  return (
    <Component
      {...props}
      ref={ref}
      className={cn("scroll-reveal", className)}
      transition={{ ...defaults, ...transition }}
    />
  );
}
