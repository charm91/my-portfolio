import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Website Design",
    badge: "New",
    price: "$3200.00",
    description: "Ideal for showcasing your brand and services to potential clients",
    features: [
      "SEO optimization",
      "Inventory management",
      "Email marketing",
      "Performance analytics",
      "Commenting System",
    ],
    popular: false,
  },
  {
    name: "Multi-Pages Website",
    badge: "Popular",
    price: "$5500.00",
    description: "Ideal for creating a seamless mobile shopping experience for your customers",
    features: [
      "SEO optimization",
      "Inventory management",
      "Email marketing",
      "Performance analytics",
      "Commenting System",
    ],
    popular: true,
  },
  {
    name: "UI/UX Motion Design",
    badge: null,
    price: null,
    description: "High-quality every time. Senior designer, nothing less. 100% percent. Yours Custom work, fully owned by you.",
    features: [],
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Pricing() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-muted-foreground mb-2">Pricing Plan</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Flexible Pricing for <span className="italic font-semibold">Business Expansion</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, i) => (
            <motion.article
              key={i}
              variants={cardItem}
              className={`relative rounded-2xl border p-6 md:p-8 flex flex-col ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-lg scale-[1.02] md:scale-100 md:shadow-xl"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold text-foreground pr-20">{plan.name}</h3>
              {plan.price && (
                <p className="mt-4 text-2xl font-bold text-foreground">{plan.price}</p>
              )}
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {plan.description}
              </p>
              {plan.features.length > 0 && (
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <Button
                className="mt-8 w-full rounded-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                asChild
              >
                <a href="#contact">Get Started</a>
              </Button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
