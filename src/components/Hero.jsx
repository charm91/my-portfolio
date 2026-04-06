import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center pt-24 pb-10 md:pt-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-category text-xs"
        >
          Strategy → UX → Delivery
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium text-foreground leading-tight tracking-tight  text-center mx-auto"
        >
          Product Design with
          <span className="font-serif italic font-normal"> Impact</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-md md:text-lg text-element-content font-light tracking-wide max-w-lg mx-auto"
        >
          I connect product strategy, UX systems, and development to deliver
          measurable outcomes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 group p-4 py-5 my-2 "
            onClick={() =>
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Case Studies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
