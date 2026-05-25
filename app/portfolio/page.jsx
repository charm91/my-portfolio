import { Header } from "@/components/Header";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Portfolio — Charm Aung",
  description: "Case studies and projects by Charm Aung — product design, UX, and delivery.",
  openGraph: {
    title: "Portfolio — Charm Aung",
    description: "Case studies and projects by Charm Aung — product design, UX, and delivery.",
    url: "/portfolio",
    images: [
      {
        url: "/profile-photo.png",
        width: 1152,
        height: 832,
        alt: "Charm Aung — Portfolio",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="home-bg-layer" />
        <main id="main-content">
          <Portfolio />
          <Journey />
          <Testimonials />
          <FAQ />
          <Footer />
        </main>
      </div>
    </>
  );
}
