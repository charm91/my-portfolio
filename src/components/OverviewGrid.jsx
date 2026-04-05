import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars -- used as motion.div and motion.article
import { Star, ExternalLink, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";
const textPrimary = "#242424";
const textSecondary = "#323744";

export function OverviewGrid() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop layout: two columns as before */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-2 gap-6 md:gap-5"
        >
          {/* Left column: 3 cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Card 5: Profile / About */}
            <motion.article
              variants={item}
              className="rounded-2xl bg-white overflow-hidden flex-1 flex flex-col"
              style={{ boxShadow: cardShadow }}
            >
              <div className="relative aspect-6/3 min-h-[150px]">
                <img
                  src="/profile-photo.png"
                  alt="Charm Aung"
                  className="w-full h-full object-cover"
                />
                <div className="z-10 absolute bottom-1 right-3 px-4 py-2 rounded-full text-primary text-sm font-normal whitespace-nowrap bg-background">
                  Product Owner • Design-to-Dev Builder
                </div>
                <img
                  src="/corner-white.png"
                  alt="corner-white"
                  className="absolute -bottom-0.5 right-0 w-1/2 h-20 overflow-visible"
                />
              </div>
              <div className="p-5 md:p-6 flex-1">
                <h2
                  className="text-xl font-medium mb-3"
                  style={{ color: textPrimary }}
                >
                  Hi, I'm Charm
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: textSecondary }}
                >
                  I work at the intersection of product strategy, UX, and
                  engineering. With experience as both a Product Owner and
                  Product Designer, I lead products from discovery to delivery —
                  shaping not just interfaces, but how systems work end-to-end.
                  My background in interaction-focused MBA and certifications
                  (PSPO II, PSM II) allows me to bridge business goals, user
                  needs, and technical execution to build scalable, real-world
                  products.
                </p>
              </div>
            </motion.article>
            {/* Card 4: Let's Connect */}
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-7"
              style={{ boxShadow: cardShadow }}
            >
              <a
                href="#contact"
                onClick={scrollToContact}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
              >
                <span className="size-6 bg-emerald-200 rounded-full shrink-0 relative animate-pulse">
                  <span
                    className="size-3 rounded-full bg-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                  />
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <div className="min-w-0">
                  <h2 className="font-semibold" style={{ color: textPrimary }}>
                    Let's Connect
                  </h2>
                  <div>
                    <span
                      className="text-sm font-normal"
                      style={{ color: textSecondary }}
                    >
                      Open to Product Owner roles SEA / Remote
                    </span>
                  </div>
                </div>
                <ExternalLink
                  className="size-5 shrink-0 mt-1 text-[#242424] group-hover:opacity-70 transition-opacity"
                  strokeWidth={2}
                />
              </a>
            </motion.article>
          </div>

          {/* Right column: 2 cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Card 1: 10+ Years */}
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-7"
              style={{ boxShadow: cardShadow }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span
                  className="font-medium shrink-0"
                  style={{ color: textPrimary }}
                >
                  12+ Years
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <span
                  className="text-sm font-normal"
                  style={{ color: textSecondary }}
                >
                  • Product Owner • Product Designer <br />• Design-to-Dev
                  Builder
                </span>
              </div>
            </motion.article>

            {/* Card 2: Domain Experience */}
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-7"
              style={{ boxShadow: cardShadow }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span
                  className="text-sm md:text-base font-medium shrink-0"
                  style={{ color: textSecondary }}
                >
                  Domain Experience
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <span className="text-sm" style={{ color: textPrimary }}>
                  Fintech, HR SaaS, and Multi-role Platforms across complex,
                  data-driven systems
                </span>
              </div>
            </motion.article>
            {/* Card 3: Testimonial */}
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-7"
              style={{ boxShadow: cardShadow }}
            >
              <div className="flex gap-2 mb-2 bg-background rounded-full px-4 py-2 w-fit">
                <Star className="size-4 fill-[#f97316] text-[#f97316] shrink-0" />
                <span
                  className="text-sm font-medium text-center"
                  style={{ color: textPrimary }}
                >
                  Endorsed by founders and peers
                </span>
              </div>
              <p
                className="text-sm md:text-sm leading-relaxed mb-2 pt-4 pb-6"
                style={{ color: textSecondary }}
              >
                I am happy to recommend Charm, a great UI/UX designer with a
                talent for coding. She has the ability to blend aesthetics and
                functionality very well, creating good experiences for users.
                She will be an asset to any organisation that she joins.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <img
                      src="/ye-myat-min.jpeg"
                      alt="Ye Myat Min"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-medium text-base"
                      style={{ color: textPrimary }}
                    >
                      Ye Myat Min
                    </p>
                    <p className="text-sm" style={{ color: textSecondary }}>
                      CEO, nexlabs
                    </p>
                  </div>
                </div>

                <img src="/linkedin.svg" alt="LinkedIn" className="size-8" />
              </div>
            </motion.article>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full bg-white border-0 shadow-sm size-10"
            onClick={() => {
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ArrowDown className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
