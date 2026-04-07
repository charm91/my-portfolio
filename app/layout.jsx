import "./globals.css";

export const metadata = {
  title: "Charm Aung — Product Designer",
  description:
    "Product design portfolio of Charm Aung. Strategy, UX, and delivery — turning complex problems into clear, usable products.",
  openGraph: {
    title: "Charm Aung — Product Designer",
    description:
      "Product design portfolio of Charm Aung. Strategy, UX, and delivery.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
