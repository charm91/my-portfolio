import { SITE_URL } from "@/config/site";

// Update this date when page content or metadata changes, not at each build.
const lastModified = new Date("2026-11-08");

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/betterhr`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/kbz-bank`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/unilinks`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/wct`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact-me`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
