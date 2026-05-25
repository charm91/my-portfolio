import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Charm Aung — Product Designer";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description:
    "Product design portfolio of Charm Aung. Strategy, UX, and delivery — turning complex problems into clear, usable products.",
  openGraph: {
    title,
    description:
      "Product design portfolio of Charm Aung. Strategy, UX, and delivery.",
    type: "website",
    url: "/",
    images: [
      {
        url: SITE.profileImage,
        width: 1152,
        height: 832,
        alt: "Charm Aung — Product Designer",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-[#1f2937] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
