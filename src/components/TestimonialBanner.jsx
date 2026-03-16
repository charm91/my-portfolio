import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialBanner() {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-background/70 mb-6">Endorsed by founders and peers</p>
          <Quote className="size-10 md:size-12 text-background/40 mb-6" />
          <p className="text-lg md:text-xl leading-relaxed">
            I am happy to recommend Charm, a great UI/UX designer with a talent for coding. She has the ability to blend aesthetics and functionality very well, creating good experiences for users.
          </p>
          <p className="mt-6 font-semibold">Ye Myat Min</p>
          <p className="text-sm text-background/80">CEO, nexlabs</p>
        </motion.div>
      </div>
    </section>
  );
}
