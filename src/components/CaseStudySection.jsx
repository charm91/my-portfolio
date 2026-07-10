"use client";

import { motion } from "framer-motion";
import { textPrimary, scrollRevealTransition } from "@/config/caseStudy";

export function CaseStudySection({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px", amount: 0.15 }}
      transition={scrollRevealTransition}
      className="mb-12 md:mb-16 px-4"
    >
      {title && (
        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: textPrimary }}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4 text-base leading-relaxed">{children}</div>
    </motion.section>
  );
}
