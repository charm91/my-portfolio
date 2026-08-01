import { Suspense } from "react";
import { ScrollToSection } from "./ScrollToSection";
import { HomeShell } from "@/components/HomeShell";
import { Hero } from "@/components/Hero";
import { OverviewGrid } from "@/components/OverviewGrid";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      <HomeShell className="home-content min-h-screen">
        <Hero />
        <OverviewGrid />
        <Services />
        <Portfolio />
        <Journey />
        <Testimonials />
        <FAQ />
        <Footer />
      </HomeShell>
    </>
  );
}
