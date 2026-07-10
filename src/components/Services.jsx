"use client";

import { motion } from "framer-motion";
import { Settings, Globe, Layers, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { scrollToSection } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Product Design",
    description:
      "I design practical product experiences that help users move through demanding workflows with less effort.",
    tags: ["UI/UX", "Wireframes", "Prototypes"],
  },
  {
    icon: Settings,
    title: "Product Ownership",
    description:
      "I bring product ownership experience to clarify goals, prioritize scope, and align design work with business needs.",
    tags: ["Product Strategy", "Prioritization", "Stakeholders"],
  },
  {
    icon: Layers,
    title: "User Research & Strategy",
    description:
      "I use research, feedback, and product context to understand user needs and shape better designs.",
    tags: ["UX Research", "Usability Testing", "Product Discovery"],
  },
  {
    icon: Code2,
    title: "Frontend Collaboration",
    description:
      "I understand frontend constraints and bridge the gap between design intent and implementation.",
    tags: ["Developer Handoff", "HTML/CSS", "Tailwind"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const textPrimary = "#242424";
const textSecondary = "#323744";

export function Services() {
  const scrollToPortfolio = (e) => {
    e.preventDefault();
    scrollToSection("portfolio");
  };

  return (
    <section id="services" className="py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-category text-xs">What I Do</span>
        </motion.div>

        {/* Main heading - centered */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Where Product Design <br />
          <span className="font-serif italic font-normal">Meets Strategy.</span>
        </motion.h2>

        {/* 2x2 grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {services.map((s, i) => (
            <motion.article
              key={i}
              variants={item}
              className="rounded-2xl bg-white p-4 md:p-6"
            >
              <div className="flex flex-col">
                <s.icon
                  className="size-6 mb-4 shrink-0"
                  style={{ color: textPrimary }}
                  strokeWidth={1.75}
                />
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: textPrimary }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: textSecondary }}
                >
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-normal px-3 py-1 text-xs rounded-full bg-[#f6f7f9]"
                      style={{ color: textPrimary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Explore Projects button - centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-14 flex justify-center"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 group px-4 py-5"
            onClick={scrollToPortfolio}
          >
            Explore Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
