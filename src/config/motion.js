export const motionEase = [0.22, 1, 0.36, 1];

export const sectionReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: motionEase },
};

// One viewport observer coordinates each group instead of observing every card.
export const staggerReveal = {
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: 0.075 } },
  },
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.1 },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionEase },
  },
};

export const overviewReveal = {
  ...sectionReveal,
  initial: { opacity: 0, y: 16, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
};

export const projectReveal = {
  initial: { opacity: 0, y: 36, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { type: "spring", stiffness: 110, damping: 22, mass: 0.7 },
};
