import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars -- used as motion.div, motion.article, etc.
import { Settings, Globe, Layers, Code2 } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: Settings,
    title: "Product Ownership",
    description:
      "I define product direction, prioritize scope, and work closely with stakeholders and engineers to deliver meaningful outcomes.",
    tags: ["Roadmaps", "Backlog Prioritization", "OKRs"],
  },
  {
    icon: Globe,
    title: "Product Design",
    description:
      "I design clear, practical UX that supports product goals and real user needs.",
    tags: ["UI/UX", "Wireframes", "Prototypes"],
  },
  {
    icon: Layers,
    title: "User Research & Strategy",
    description:
      "I turn user insights and data into clear product and design decisions.",
    tags: ["Interviews", "Usability Testing", "Data Analysis"],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "I collaborate closely with engineers and can implement UI to ensure designs ship as intended.",
    tags: ["Vue.js", "Nuxt", "Tailwind"],
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

const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";
const textPrimary = "#242424";
const textSecondary = "#323744";

export function Services() {
  const scrollToPortfolio = (e) => {
    e.preventDefault();
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-5"
        >
          <span className="section-category">What I Do</span>
        </motion.div>

        {/* Main heading - centered */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          From Product Strategy to <br />
          <span className="font-serif italic font-normal">Execution.</span>
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
              style={{ boxShadow: cardShadow }}
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
                      className="text-sm font-normal px-3 py-1.5 rounded-full bg-[#f6f7f9]"
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
            className="rounded-full gap-2 group px-4 py-4"
            onClick={scrollToPortfolio}
          >
            Explore Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
