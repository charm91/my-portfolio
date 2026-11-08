import { COLORS } from "@/config/theme";

export const textPrimary = COLORS.textPrimary;
export const textSecondary = COLORS.textSecondaryCaseStudy;
export const bgPage = COLORS.bgPage;

// Match the shell's max-width and responsive padding, including section padding.
export const CASE_STUDY_HERO_IMAGE_SIZES =
  "(min-width: 1024px) 704px, (min-width: 768px) 720px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)";
export const CASE_STUDY_IMAGE_SIZES =
  "(min-width: 1024px) 672px, (min-width: 768px) 688px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 64px)";
export const CASE_STUDY_GRID_IMAGE_SIZES =
  "(min-width: 1024px) 336px, (min-width: 768px) 344px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 64px)";

export const pageTransition = { duration: 0.4, ease: "easeOut" };

export const scrollRevealTransition = { duration: 0.5, ease: "easeOut" };

export const scrollReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px", amount: 0.15 },
  transition: scrollRevealTransition,
};
