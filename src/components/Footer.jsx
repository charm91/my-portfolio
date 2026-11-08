"use client";

import Link from "next/link";
import { Reveal, RevealGrid } from "@/components/Reveal";
import { Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, SOCIAL_LINKS, RESUME_URL } from "@/config/site";
import { COLORS } from "@/config/theme";

const textPrimary = COLORS.textPrimary;
const textSecondary = COLORS.textSecondary;

export function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-28 z-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA card - white, rounded, centered */}
        <Reveal
          className="rounded-3xl bg-white p-8 md:p-10 text-center mb-8 md:mb-10"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-5"
            style={{ backgroundColor: COLORS.inputBg, color: textPrimary }}
          >
            Let's Connect
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
        </Reveal>

        {/* Contact link cards - two cards, horizontal on desktop, stack on mobile */}
        <RevealGrid
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          <a
            href={SOCIAL_LINKS.linkedin}
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-full bg-white p-5 md:p-6 hover:shadow-md focus-visible:shadow-md transition-shadow duration-(--motion-duration-feedback) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: textPrimary }}
            >
              <Linkedin className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-base" style={{ color: textPrimary }}>
                LinkedIn
              </p>
              <p className="text-sm mt-0.5" style={{ color: textSecondary }}>
                Connect on LinkedIn
              </p>
            </div>
            <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
            <ExternalLink
              className="size-5 shrink-0"
              style={{ color: textPrimary }}
              strokeWidth={2}
            />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=Hello%20${encodeURIComponent(SITE.displayName)}`}
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-full bg-white p-5 md:p-6 transition-shadow duration-(--motion-duration-feedback) hover:shadow-md focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: textPrimary }}
            >
              <Mail className="size-6" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-bold text-base" style={{ color: textPrimary }}>
                Email
              </p>
              <p className="mt-0.5 text-sm" style={{ color: textSecondary }}>
                Reach me directly
              </p>
            </div>

            <span className="hidden h-10 w-px bg-border/50 md:inline-block"></span>

            <ExternalLink
              className="size-5 shrink-0"
              style={{ color: textPrimary }}
              strokeWidth={2}
            />
          </a>
        </RevealGrid>

        {/* Footer bar - copyright left, links right; stack on mobile */}
        <Reveal
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
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm transition-colors duration-(--motion-duration-feedback) hover:bg-black text-secondary hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary px-4 py-1.5 rounded-full"
            >
              Resume
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/#portfolio"
              className="text-sm transition-colors duration-(--motion-duration-feedback) hover:bg-black text-secondary hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary px-4 py-1.5 rounded-full"
            >
              Case Studies
            </Link>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
