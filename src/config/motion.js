// Seconds for Motion; matching CSS tokens live in app/globals.css.
export const MOTION = {
  feedback: 0.14,
  panel: 0.2,
  reveal: 0.36,
  expressive: 0.52,
  stagger: 0.06,
  processStagger: 0.08,
  easeOut: [0.22, 1, 0.36, 1],
  easeStandard: [0.2, 0, 0.38, 0.9],
};

export const revealPresets = {
  section: { distance: 16, scale: 1, transition: { duration: MOTION.reveal, ease: MOTION.easeOut } },
  overview: { distance: 16, scale: 0.98, transition: { duration: 0.4, ease: MOTION.easeOut } },
  process: { distance: 20, scale: 1, transition: { duration: 0.42, ease: MOTION.easeOut } },
  project: { distance: 28, scale: 0.97, transition: { type: "spring", duration: MOTION.expressive, bounce: 0.12 } },
  testimonial: { distance: 8, scale: 1, transition: { duration: 0.32, ease: MOTION.easeOut } },
  visual: { distance: 20, scale: 0.99, transition: { duration: 0.42, ease: MOTION.easeOut } },
};

export const menuMotion = {
  initial: { opacity: 0, y: -8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: {
    opacity: 0, y: -4, scale: 0.98,
    transition: { duration: MOTION.feedback, ease: MOTION.easeStandard },
  },
  transition: { duration: MOTION.panel, ease: MOTION.easeOut },
};
