"use client";

import Image from "next/image";
import cornerWhiteAsset from "../../public/corner-white.png";
import yeMyatMinAsset from "../../public/ye-myat-min.jpeg";
import linkedinAsset from "../../public/linkedin.svg";
import { motion } from "framer-motion";
import { Star, ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { SITE } from "@/config/site";
import { COLORS } from "@/config/theme";

const textPrimary = COLORS.textPrimaryHome;
const textSecondary = COLORS.textSecondary;

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

export function OverviewGrid() {
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
                  src={SITE.profileImage}
                  alt={SITE.displayName}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 480px"
                />
                <div className="z-10 absolute bottom-1 right-3 max-w-[calc(100%_-_1.5rem)] px-4 py-2 rounded-full text-primary text-sm font-normal text-center bg-background">
                  {SITE.tagline}
                </div>
                <Image
                  src={cornerWhiteAsset.src}
                  alt=""
                  width={200}
                  height={80}
                  aria-hidden="true"
                  className="absolute -bottom-0.5 right-0 w-1/2 h-20 overflow-visible"
                />
              </div>
              <div className="p-5 md:p-6 flex-1">
                <h2
                  className="text-xl font-medium mb-3"
                  style={{ color: textPrimary }}
                >
                  Hi, I&apos;m {SITE.displayName}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: textSecondary }}
                >
                  I&apos;m a Senior Product Designer with 13+ years of experience
                  across fintech, banking, HR SaaS, education platforms, and
                  multi-role digital products.
                  <br />
                  <br />
                  My background spans product design, product ownership,
                  interaction design, and frontend-aware collaboration. I work
                  closely with product, engineering, and business teams to shape
                  practical experiences from early discovery to implementation.
                </p>
              </div>
            </motion.article>
            <motion.article
              variants={item}
              className="rounded-2xl bg-white p-5 md:p-6"
            >
              <a
                href="#contact"
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <span className="size-6 bg-emerald-200 rounded-full shrink-0 relative motion-safe:animate-pulse">
                  <span
                    className="size-3 rounded-full bg-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-hidden
                  />
                </span>
                <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
                <div className="min-w-0">
                  <h2 className="font-semibold" style={{ color: textPrimary }}>
                    Let&apos;s Connect
                  </h2>
                  <div className="flex items-center justify-between md:gap-4">
                    <div
                      className="text-sm font-normal"
                      style={{ color: textSecondary }}
                    >
                      {SITE.availability}
                    </div>

                    <ArrowRight
                      className="size-5 shrink-0 text-[#242424] group-hover:opacity-70 group-focus-visible:opacity-70 transition-[transform,opacity] duration-150 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
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
                  className="font-medium shrink-0 md:w-[80px]"
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
                  className="text-sm md:text-base font-medium shrink-0 md:w-[80px]"
                  style={{ color: textSecondary }}
                >
                  Domain Focus
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
                      src={yeMyatMinAsset.src}
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

                <Image src={linkedinAsset.src} alt="LinkedIn" width={32} height={32} />
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
            asChild
          >
            <a href="#services">
              <ArrowDown className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
