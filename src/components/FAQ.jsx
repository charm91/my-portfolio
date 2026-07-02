"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What roles are you looking for?",
    a: "I'm looking for Senior Product Designer roles where I can work on complex product experiences across fintech, SaaS, and multi-role platforms. I'm especially interested in teams that value strong UX craft, product thinking, and close collaboration between design, product, and engineering.",
  },
  {
    q: "Do you work only as a Product Designer?",
    a: "Product design is my core focus, but I bring strong product ownership and frontend awareness from working closely with founders, product teams, and engineers. This helps me design experiences that are not only user-centered, but also practical to build and aligned with business goals.",
  },
  {
    q: "What types of products have you worked on?",
    a: "I've worked on fintech products, digital banking journeys, HR SaaS platforms, education platforms, internal tools, and multi-role systems. Much of my experience involves turning complex workflows into clear, scalable product experiences.",
  },
  {
    q: "How do you usually work with teams?",
    a: "I work closely with product managers, engineers, business stakeholders, and domain experts to understand problems, map workflows, explore solutions, prototype interactions, and refine designs through feedback and iteration.",
  },
  {
    q: "Are you open to freelance or contract work?",
    a: "I'm primarily open to full-time Senior Product Designer roles, but I'm also open to selective contract opportunities involving product design, UX strategy, design systems, complex workflow design, or early-stage product discovery.",
  },
  {
    q: "What makes your background different?",
    a: "My background combines product design, interaction design, product ownership, and frontend experience. This helps me bridge user needs, business requirements, and technical constraints when designing practical, scalable product experiences.",
  },
];

const textPrimary = "#242424";
const textSecondary = "#323744";
const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-4 mb-10"
        >
          <p className="section-category text-xs">FAQ</p>
          <h2 className="section-title mb-1">Working With Me</h2>
          <p className="text-element-content max-w-2xl text-base font-light tracking-wide text-center">
            Common questions about my role, approach, and <br /> collaboration
            style.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-[600px] mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <div className="bg-white px-6 py-3 rounded-3xl">
                  <AccordionTrigger className="text-base font-medium text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary">
                    {faq.a}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
