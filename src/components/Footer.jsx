"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, SOCIAL_LINKS, RESUME_URL } from "@/config/site";
import { COLORS } from "@/config/theme";

const textPrimary = COLORS.textPrimary;
const textSecondary = COLORS.textSecondary;

function ContactCard({ icon: Icon, heading, description, ...linkProps }) {
  return (
    <a
      className="flex items-center gap-4 rounded-full bg-white p-5 md:p-6 transition-shadow duration-150 hover:shadow-md focus-visible:shadow-md"
      {...linkProps}
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: textPrimary }}
      >
        <Icon className="size-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-base" style={{ color: textPrimary }}>
          {heading}
        </p>
        <p className="mt-0.5 text-sm" style={{ color: textSecondary }}>
          {description}
        </p>
      </div>
      <span className="hidden h-10 w-px bg-border/50 md:inline-block"></span>
      <ExternalLink
        className="size-5 shrink-0"
        style={{ color: textPrimary }}
        strokeWidth={2}
      />
    </a>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-28 z-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA card - white, rounded, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 md:p-10 text-center mb-8 md:mb-10"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-5"
            style={{ backgroundColor: COLORS.inputBg, color: textPrimary }}
          >
            Let&apos;s Connect
          </span>
          <h2
            className="section-title text-center mb-4"
            style={{ color: textPrimary }}
          >
            Open to the
            <span className="font-serif italic font-normal">
              {" "}
              Right Opportunity
            </span>
          </h2>
          <p
            className="text-sm md:text-base max-w-xl font-light mx-auto mb-8"
            style={{ color: textSecondary }}
          >
            I help teams shape intuitive product experiences through research, interaction design, and close design and engineering collaboration.
          </p>
          <Button
            size="lg"
            className="rounded-full text-white font-medium px-8"
            asChild
          >
            <Link href="/contact-me">Contact Me</Link>
          </Button>
        </motion.div>

        {/* Contact link cards - two cards, horizontal on desktop, stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          <ContactCard
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            title="Opens in a new tab"
            aria-label="LinkedIn (opens in a new tab)"
            rel="noopener noreferrer"
            icon={Linkedin}
            heading="LinkedIn"
            description="Connect on LinkedIn"
          />
          <ContactCard
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Hello ${SITE.displayName}`)}`}
            icon={Mail}
            heading="Email"
            description="Reach me directly"
          />
        </motion.div>

        {/* Footer bar - copyright left, links right; stack on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-[#d1d5db]"
        >
          <p
            className="text-sm text-center sm:text-left"
            style={{ color: textSecondary }}
          >
            © {new Date().getFullYear()} {SITE.name} ({SITE.displayName}). All rights reserved.
          </p>
          <div className="flex justify-center sm:justify-end gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              title="Opens in a new tab"
              aria-label="Resume (opens in a new tab)"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150 hover:bg-black text-secondary hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white px-4 py-1.5 rounded-full"
            >
              Resume
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/#portfolio"
              className="text-sm transition-colors duration-150 hover:bg-black text-secondary hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white px-4 py-1.5 rounded-full"
            >
              Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
