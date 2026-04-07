"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OverviewGrid } from "@/components/OverviewGrid";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Handles /?scrollTo=services-style navigation from other pages (Header "Menu" items)
function ScrollToSection() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  useEffect(() => {
    if (!scrollTo) return;

    const id = scrollTo.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollTo]);

  return null;
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
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
