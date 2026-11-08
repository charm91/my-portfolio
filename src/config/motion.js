// Seconds for Motion; matching CSS tokens live in app/globals.css.
export const MOTION = {
  feedback: 0.14,
  panel: 0.2,
  reveal: 0.5,
  expressive: 0.5,
  stagger: 0.1,
  processStagger: 0.15,
  easeOut: [0, 0, 0.58, 1],
  easeStandard: [0.2, 0, 0.38, 0.9],
};

export const revealPresets = {
  section: { distance: 16, scale: 1, transition: { type: "spring", stiffness: 500, damping: 25 } },
  service: { distance: 24, scale: 1, transition: { type: "spring", stiffness: 500, damping: 25 } },
  overview: {
    distance: 16, scale: 0.96, animateOnMount: true,
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
  process: { distance: 28, scale: 1, transition: { type: "spring", stiffness: 500, damping: 25 } },
  project: {
    distance: 48, scale: 0.88, amount: 0.4, animateOnMount: true,
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
  },
  testimonial: { distance: 16, scale: 1, transition: { type: "spring", stiffness: 500, damping: 25 } },
  visual: { distance: 28, scale: 1, amount: 0.15, transition: { duration: 0.5, ease: MOTION.easeOut } },
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
