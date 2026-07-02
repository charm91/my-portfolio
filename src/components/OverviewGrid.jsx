"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ExternalLink, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { SITE, SOCIAL_LINKS } from "@/config/site";

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
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-5 gap-6 md:gap-5"
        >
          <div className="flex flex-col gap-4 md:gap-5 lg:col-span-3 w-full">
            <motion.article
              variants={item}
              className="rounded-2xl bg-white overflow-hidden flex-1 flex flex-col"
            >
              <div className="relative aspect-6/3 min-h-[150px]">
                <Image
                  src="/profile-photo.png"
                  alt={SITE.displayName}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 480px"
                />
                <div className="z-10 absolute bottom-1 right-3 px-4 py-2 rounded-full text-primary text-sm font-normal whitespace-nowrap bg-background">
                  {SITE.tagline}
                </div>
                <img
                  src="/corner-white.png"
                  alt=""
                  className="absolute -bottom-0.5 right-0 w-1/2 h-20 overflow-visible"
                />
              </div>
              <div className="p-5 md:p-6 flex-1">
                <h2
                  className="text-xl font-medium mb-3"
                  style={{ color: textPrimary }}
                >
                  Hi, I'm {SITE.displayName}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: textSecondary }}
                >
                  I'm a Senior Product Designer working across product strategy,
                  UX, and engineering collaboration. With experience in product
                  design, product ownership, and frontend-aware delivery, I turn
                  complex workflows into clear, scalable product experiences.
                  <br />
                  <br />
                  My background in interaction design, business strategy, and
                  Scrum helps me bridge user needs, business goals, and technical
                  constraints across discovery, UX direction, design systems,
                  prototypes, and developer handoff.
                </p>
              </div>
            </motion.article>
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-6"
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
                  <div className="flex items-center justify-between md:gap-4">
                    <div
                      className="text-sm font-normal"
                      style={{ color: textSecondary }}
                    >
                      {SITE.availability}
                    </div>

                    <ExternalLink
                      className="size-5 shrink-0 text-[#242424] group-hover:opacity-70 transition-opacity"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </a>
            </motion.article>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 w-full">
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span
                  className="font-medium shrink-0"
                  style={{ color: textPrimary }}
                >
                  {new Date().getFullYear() - SITE.careerStartYear}+ Years
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <ul
                  className="list-disc pl-2 text-sm font-normal"
                  style={{ color: textSecondary }}
                >
                  {SITE.roles.map((role) => <li key={role}>{role}</li>)}
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <span
                  className="text-sm md:text-base font-medium shrink-0 md:w-[100px]"
                  style={{ color: textSecondary }}
                >
                  Domain Experience
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <ul
                  className="text-sm font-normal pl-2 list-disc"
                  style={{ color: textSecondary }}
                >
                  {SITE.domains.map((domain) => <li key={domain}>{domain}</li>)}
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-6"
            >
              <div className="flex gap-2 mb-2 bg-background rounded-full px-3 py-2 w-fit">
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
                I am happy to recommend {SITE.displayName}, a great UI/UX designer with a
                talent for coding. She has the ability to blend aesthetics and
                functionality very well, creating good experiences for users.
                She will be an asset to any organisation that she joins.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <Image
                      src="/ye-myat-min.jpeg"
                      alt="Ye Myat Min"
                      width={40}
                      height={40}
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
            aria-label="Scroll down"
            className="rounded-full bg-white border-0 shadow-sm size-10"
            onClick={() => {
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ArrowDown className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
