import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What roles are you looking for?",
    a: "I'm looking for Product Owner or Product Manager roles in product-led teams, working closely with design and engineering to shape strategy and delivery.",
  },
  {
    q: "Do you work only as a Product Owner?",
    a: "While my long-term focus is Product Ownership, I bring hands-on experience in UX design and frontend development, which helps me collaborate closely with designers and engineers.",
  },
  {
    q: "What types of products have you worked on?",
    a: "I've worked on internal platforms, B2B and B2C products, and multi-role systems in areas like HR tech and education platforms.",
  },
  {
    q: "How do you usually work with teams?",
    a: "I work closely with stakeholders, designers, and engineers to clarify problems, prioritize scope, and move ideas from concept to delivery in an iterative way.",
  },
  {
    q: "Are you open to freelance or contract work?",
    a: "I'm open to full-time Product Owner roles and selective contract opportunities that involve product discovery, UX strategy, or early-stage product setup.",
  },
];

const textPrimary = "#242424";
const textSecondary = "#323744";
const cardShadow = "0 2px 5px rgba(0, 0, 0, 0.06)";

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-4 mb-10"
        >
          <p className="section-category">FAQ</p>
          <h2 className="section-title mb-1">Working With Me</h2>
          <p className="text-element-content max-w-2xl text-lg tracking-wide text-center">
            Common questions about my role, approach, and <br /> collaboration
            style.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-[600px] mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <div
                  className="bg-white px-6 py-3 rounded-3xl"
                  style={{ boxShadow: cardShadow }}
                >
                  <AccordionTrigger className="text-lg text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary">
                    {faq.a}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
