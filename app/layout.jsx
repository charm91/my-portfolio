import { Inter } from "next/font/google";
import faviconAsset from "../public/favicon.png";
import "./globals.css";
import { SITE, SITE_URL } from "@/config/site";
import { MotionProvider } from "@/components/MotionProvider";
import { getPageMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...getPageMetadata({
    title: `${SITE.name} (${SITE.displayName}) | ${SITE.jobTitle}`,
    description: `Explore product design work by ${SITE.name} (${SITE.displayName}), a ${SITE.jobTitle.toLowerCase()} working across fintech, banking, HR SaaS, and education platforms.`,
  }),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href={faviconAsset.src} type="image/png" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-[#1f2937] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
