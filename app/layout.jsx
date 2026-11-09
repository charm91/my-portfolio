import { Inter } from "next/font/google";
import faviconAsset from "../public/favicon.png";
import faviconVectorAsset from "../public/favicon.svg";
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
        <link rel="icon" href={faviconAsset.src} type="image/png" sizes="96x96" />
        <link rel="icon" href={faviconVectorAsset.src} type="image/svg+xml" sizes="any" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-[#1f2937] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
