export const textPrimary = "#1f2937";
export const textSecondary = "#4b5563";
export const bgPage = "#fafafa";

export const pageTransition = { duration: 0.4, ease: "easeOut" };

export const scrollRevealTransition = { duration: 0.5, ease: "easeOut" };

export const scrollReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px", amount: 0.15 },
  transition: scrollRevealTransition,
};
