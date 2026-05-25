export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ngu-wah-portfolio.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/betterhr`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/kbz-bank`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/unilinks`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/wct`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/contact-me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
