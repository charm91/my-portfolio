import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl bg-muted overflow-hidden">
              <img
                src="https://placehold.co/600x600/f5f5f5/999?text=Photo"
                alt="Charm Aung"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Product Owner • Design-to-Dev Builder
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hi, I'm Charm
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I work at the intersection of product, UX, and development. My background allows me to think in systems, design practical solutions, and support teams beyond visuals—through clear structure, workflows, and implementation-ready designs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
