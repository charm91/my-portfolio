import { SITE_URL } from "@/config/site";

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/betterhr`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/kbz-bank`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/unilinks`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/wct`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact-me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
