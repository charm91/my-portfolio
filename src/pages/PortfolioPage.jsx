import { Header } from "@/components/Header";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const backgroundImageLink = "/background-2.png";

export function PortfolioPage() {
  return (
    <>
      <Header />
      <main
        style={{
          scrollBehavior: "smooth",
          backgroundImage: `url(${backgroundImageLink})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Portfolio />
        <Journey />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
