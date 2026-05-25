import { Header } from "@/components/Header";
import { SITE } from "@/config/site";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const title = "Portfolio — Charm Aung";
const description = "Case studies and projects by Charm Aung — product design, UX, and delivery.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/portfolio",
    images: [
      {
        url: SITE.profileImage,
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
