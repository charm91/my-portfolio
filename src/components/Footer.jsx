import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars -- used as motion.div
import { Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const textPrimary = "#1f2937";
const textSecondary = "#323744";

export function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-24 z-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA card - white, rounded, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 md:p-10 text-center mb-8 md:mb-10"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
          }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ backgroundColor: "#f6f7f9", color: textPrimary }}
          >
            Let's Connect
          </span>
          <h2
            className="section-title text-center mb-4"
            style={{ color: textPrimary }}
          >
            Open to Product <br /> Owner
            <span className="font-serif italic font-normal">
              {" "}
              Opportunities
            </span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto mb-8"
            style={{ color: textSecondary }}
          >
            I bring experience across product strategy, UX, <br /> and delivery
            to help teams build and scale <br /> meaningful products.
          </p>
          <Button
            size="lg"
            className="rounded-full text-white font-medium px-8"
            asChild
          >
            <Link to="/contact-me">Contact Me</Link>
          </Button>
        </motion.div>

        {/* Contact link cards - two cards, horizontal on desktop, stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          <a
            href="https://www.linkedin.com/in/ngu-wah-aung-859b2011a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-full bg-white p-5 md:p-6 hover:shadow-md transition-shadow"
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
            href="mailto:nguwah106@gmail.com"
            className="flex items-center gap-4 rounded-full bg-white p-5 md:p-6 hover:shadow-md transition-shadow"
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
              <p className="text-sm mt-0.5" style={{ color: textSecondary }}>
                Reach me directly
              </p>
            </div>
            <span className="w-px h-10 bg-border/50 hidden md:inline-block"></span>
            <ExternalLink
              className="size-5 shrink-0"
              style={{ color: textPrimary }}
              strokeWidth={2}
            />
          </a>
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
            © {new Date().getFullYear()} Charm. All rights reserved.
          </p>
          <div className="flex justify-center sm:justify-end gap-2">
            <a
              href="/resume.pdf"
              download="charm-resume.pdf"
              className="text-base transition-colors hover:bg-black text-secondary hover:text-white px-4 py-1.5 rounded-full"
            >
              Resume
            </a>
            <a
              href="#portfolio"
              className="text-base transition-colors hover:bg-black text-secondary hover:text-white px-4 py-1.5 rounded-full"
            >
              Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
