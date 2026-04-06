import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OverviewGrid } from "@/components/OverviewGrid";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

import { ContactPage } from "@/pages/ContactPage";
import { KBZBankPage } from "@/pages/KBZBankPage";
import { UniLinksPage } from "@/pages/UniLinksPage";
import { BetterHRPage } from "@/pages/BetterHRPage";
import { WctPage } from "@/pages/WctPage";
import { PortfolioPage } from "@/pages/PortfolioPage";

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, state?.scrollTo]);

  return null;
}

function HomeScrollToSection() {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo;

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      !scrollTo ||
      typeof scrollTo !== "string"
    ) {
      return;
    }

    const id = scrollTo.replace(/^#/, "");
    const el = document.getElementById(id);

    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState({}, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, scrollTo]);

  return null;
}

function HomePage() {
  return (
    <>
      <HomeScrollToSection />
      <Header />
      <div className="home-wrapper">
        <div className="home-bg-layer" />
        <main className="home-content min-h-screen">
          <Hero />
          <OverviewGrid />
          <Services />
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

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-me" element={<ContactPage />} />
        <Route path="/kbz-bank" element={<KBZBankPage />} />
        <Route path="/unilinks" element={<UniLinksPage />} />
        <Route path="/betterhr" element={<BetterHRPage />} />
        <Route path="/wct" element={<WctPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default App;
