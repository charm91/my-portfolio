// Color values are intentionally different across sections of the site (design intent) —
// these tokens name that drift explicitly instead of leaving it as same-named local
// constants with silently different hex values in each component.
export const COLORS = {
  // Primary text
  textPrimary: "#1f2937", // Footer, case study pages, Contact page
  textPrimaryHome: "#242424", // OverviewGrid, Services (homepage grid sections)

  // Secondary text
  textSecondary: "#323744", // Footer, OverviewGrid, Services
  textSecondaryCaseStudy: "#4b5563", // case study pages
  textSecondaryContact: "#6b7280", // Contact page

  // Page backgrounds
  bgPage: "#fafafa", // case study pages
  bgPageContact: "#F8F8F8", // Contact page

  // Input / badge backgrounds
  inputBg: "#f6f7f9", // Contact page form inputs, Footer badge
};
