import { HomeShell } from "@/components/HomeShell";
import { SITE } from "@/config/site";
import { Portfolio } from "@/components/Portfolio";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: `Product Design Case Studies | ${SITE.name}`,
  description: `Explore fintech, digital banking, HR SaaS, and education case studies by ${SITE.name} (${SITE.displayName}), ${SITE.jobTitle}.`,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <HomeShell>
      <Portfolio />
      <Journey />
      <Testimonials />
      <FAQ />
      <Footer />
    </HomeShell>
  );
}
