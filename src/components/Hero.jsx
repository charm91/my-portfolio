"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center pt-24 pb-10 md:pt-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <p
          className="section-category text-xs entrance-rise"
        >
          Strategy → UX → Delivery
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl mt-2 font-medium text-foreground leading-tight tracking-tight text-center mx-auto entrance-rise entrance-delay-1"
        >
          Product Design with
          <span className="font-serif italic font-normal"> Impact</span>
        </h1>
        <p
          className="mt-2 text-md md:text-lg text-element-content font-light tracking-wide max-w-lg mx-auto entrance-rise entrance-delay-2"
        >
          I shape product experiences that turn complex workflows into
          something clear, usable, and shippable.
        </p>
        <div
          className="mt-6 entrance-rise entrance-delay-3"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 group p-4 py-5 my-2 "
            asChild
          >
            <a href="#portfolio">
              View Case Studies
              <ArrowRight className="size-4 transition-transform duration-(--motion-duration-feedback) motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
