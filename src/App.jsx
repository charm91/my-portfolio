import { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OverviewGrid } from "@/components/OverviewGrid";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ContactPage } from "@/pages/ContactPage";
import { KBZBankPage } from "@/pages/KBZBankPage";
import { UniLinksPage } from "@/pages/UniLinksPage";
import { BetterHRPage } from "@/pages/BetterHRPage";
import { PortfolioPage } from "@/pages/PortfolioPage";

const backgroundImageLink = "/background-2.png";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [pathname, state?.scrollTo]);
  return null;
}

/** When navigating to home with state.scrollTo (e.g. #portfolio), scroll to that section. */
function HomeScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = location.state?.scrollTo;

  useEffect(() => {
    if (location.pathname !== "/" || !scrollTo || typeof scrollTo !== "string")
      return;
    const id = scrollTo.replace(/^#/, "");
    const el = document.getElementById(id);

    if (el) {
      const t = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
        // navigate(".", { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.pathname, scrollTo, navigate]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeScrollToSection />
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
                <Hero />
                <OverviewGrid />
                <Services />
                <Portfolio />
                <Journey />
                <Testimonials />
                <FAQ />
                <Footer />
              </main>
            </>
          }
        />
        <Route path="/contact-me" element={<ContactPage />} />
        <Route path="/kbz-bank" element={<KBZBankPage />} />
        <Route path="/unilinks" element={<UniLinksPage />} />
        <Route path="/betterhr" element={<BetterHRPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

export default App;
