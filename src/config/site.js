// Public details are shared by Next.js and the static-content generator.
// Keep image imports in assets.js so this module also works in Node scripts.
export const DEFAULT_SITE_URL = "https://nguwahaung.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

const profile = {
  name: "Ngu Wah Aung",
  nickname: "Charm",
  jobTitle: "Senior Product Designer",
  taglineFocus: "Fintech & SaaS",
  email: "nguwah106@gmail.com",
  location: "Bangkok, Thailand",
  careerStartYear: 2013,
  availability: "Open to SEA & Remote roles",
  roles: ["Product Design", "Product Ownership", "Design Handoff"],
  domains: ["Fintech", "HR SaaS", "Education", "Multi-role Systems"],
};

export function createSite(overrides = {}, year = new Date().getFullYear()) {
  const values = { ...profile, ...overrides };
  return {
    ...values,
    displayName: values.nickname,
    seoName: `${values.name} (${values.nickname})`,
    tagline: `${values.jobTitle} • ${values.taglineFocus}`,
    experienceYears: year - values.careerStartYear,
  };
}

export const SITE = createSite();

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/itscharmm9/",
  linkedin: "https://www.linkedin.com/in/nguwah106/",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/10ca6MgWRG0n2AwIk7yJbKf0tGVFJqzFC/view?usp=sharing";

export const REPOSITORY_URL = "https://github.com/charm91/my-portfolio";
