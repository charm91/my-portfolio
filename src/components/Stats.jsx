import { motion } from "framer-motion";

const stats = [
  { value: "10+ Years", label: "Product, Design & Frontend Experience" },
  { value: "Domain Experience", label: "Fintech, HR Tech & EdTech" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Stats() {
  return (
    <section className="py-16 md:py-24 border-y border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item} className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-2 text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
