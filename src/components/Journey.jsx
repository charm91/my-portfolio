"use client";

import { motion } from "framer-motion";
import {
  Search,
  PencilRuler,
  CheckCircle,
  Rocket,
  PaintRoller,
  Layers,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover & Frame",
    description:
      "I work with stakeholders, users, and domain experts to understand problems, map workflows, and define the right design direction.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Structure & Design",
    description:
      "I translate complex requirements into user flows, information architecture, wireframes, and interaction patterns that make products clearer and more usable.",
  },
  {
    number: "03",
    icon: PaintRoller,
    title: "Prototype & Validate",
    description:
      "I explore ideas through prototypes, feedback, and usability validation, refining the experience to improve clarity, usability, and product fit.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Align & Deliver",
    description:
      "I collaborate closely with product and engineering teams to support design handoff, implementation quality, and scalable product improvements.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};
const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";

export function Journey() {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-5 items-center mb-10 text-center"
        >
          <p className="section-category text-xs">Product Design Process</p>
          <h2 className="section-title mb-1">
            From Complexity to{" "}
            <span className="font-serif italic font-normal">Clarity</span>
          </h2>
          <p className="text-element-content max-w-96 text-base font-light tracking-wide">
            A practical, collaborative design process for turning complex
            workflows into clear, scalable digital product experiences.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative bg-white rounded-2xl"
            >
              <div className="p-6  h-full flex flex-col">
                <div className="text-primary w-fit mb-2 md:mb-4">
                  <step.icon className="size-6" />
                </div>
                <hr className="border-gray-200/50 my-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
