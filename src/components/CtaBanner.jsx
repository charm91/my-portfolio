import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="py-12 md:py-16 border-b border-border bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Let's Connect
            </h2>
            <p className="text-muted-foreground mt-1">
              Open to Product Owner roles SEA / Remote • Product-led teams
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center font-medium text-primary hover:underline underline-offset-4"
          >
            Contact Me →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
