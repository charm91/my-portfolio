import profilePhotoAsset from "../../public/profile-photo.png";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nguwahaung.com";

export const SITE = {
  name: "Ngu Wah Aung",
  displayName: "Charm",
  jobTitle: "Senior Product Designer",
  tagline: "Senior Product Designer • Fintech & SaaS",
  profileImage: profilePhotoAsset.src,
  email: "nguwah106@gmail.com",
  location: "Bangkok, Thailand",
  careerStartYear: 2013,
  availability: "Open to SEA & Remote roles",
  roles: ["Product Design", "Product Ownership", "Design Handoff"],
  domains: ["Fintech", "HR SaaS", "Education", "Multi-role Systems"],
};

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/itscharmm9/",
  linkedin: "https://www.linkedin.com/in/nguwah106/",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/10ca6MgWRG0n2AwIk7yJbKf0tGVFJqzFC/view?usp=sharing";
