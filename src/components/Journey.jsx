"use client";

import { Reveal, RevealGrid } from "@/components/Reveal";
import { Search, Rocket, PaintRoller, Layers } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover & Frame",
    description:
      "I work with stakeholders, users, and domain experts to understand problems, clarify goals, map workflows, and define the right design direction.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Structure & Design",
    description:
      "I translate requirements into user flows, information architecture, wireframes, and interaction patterns that make products easier to use.",
  },
  {
    number: "03",
    icon: PaintRoller,
    title: "Prototype & Validate",
    description:
      "I test ideas through prototypes, feedback, and usability review, then refine the experience and address key findings before delivery.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Align & Deliver",
    description:
      "I prepare clear design handoff, support implementation, and help teams maintain design quality and consistency as the product evolves.",
  },
];

export function Journey() {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          className="flex flex-col justify-center gap-5 items-center mb-10 text-center"
        >
          <p className="section-category text-xs">Product Design Process</p>
          <h2 className="section-title mb-1">
            From Complexity to{" "}
            <span className="font-serif italic font-normal">Clarity</span>
          </h2>
          <p className="text-element-content max-w-96 text-base font-light tracking-wide">
            How I move from problem framing to structured design, validation,
            and implementation support.
          </p>
        </Reveal>

        <RevealGrid
          preset="process"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {steps.map((step) => (
            <div
              key={step.number}
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
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
