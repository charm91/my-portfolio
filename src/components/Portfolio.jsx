import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars -- motion used as namespace (motion.div, motion.article)
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const kbzBankImage = "/kbz.png";
const uniLinksImage = "/unilinks.jpg";
const betterhrImage = "/betterhr.jpg";

const projects = [
  {
    title:
      "Building a Secure Authentication System for KBZ Bank's Self-Service Portal",
    category: "Web and Mobile Application",
    image: kbzBankImage,
    href: "/kbz-bank",
  },
  {
    title: "UniLinks All-in-One Study Abroad Platform",
    category: "Web and Mobile Application",
    image: uniLinksImage,
    href: "/unilinks",
  },
  {
    title: "BetterHR Cloud-based HR Management Platform",
    category: "Web and Mobile Application",
    image: betterhrImage,
    href: "/betterhr",
  },
];

export function Portfolio() {
  const location = useLocation();
  const isPortfolioPage = location.pathname === "/portfolio";
  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-5 mb-10"
        >
          <p className="section-category">Portfolio Highlights</p>
          <h2 className="section-title">
            Showcasing Projects that <br /> Define
            <span className="font-serif italic font-normal"> My Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 max-w-xl mx-auto gap-2 md:gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 48, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                mass: 0.8,
                delay: 0.05 * i,
              }}
              className="group rounded-3xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 p-2"
            >
              <Link to={project.href} className="block">
                <div className="aspect-4/3 overflow-hidden rounded-3xl relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <img
                    src="/corner-white.png"
                    alt="corner-white"
                    className="absolute -bottom-0.5 -right-0.5 w-[190px] h-[90px] overflow-hidden"
                  />
                  <Button
                    size="lg"
                    variant="outline"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-[#f6f7f9] rounded-full absolute bottom-2 right-5 border-0"
                  >
                    See Details
                    <ArrowRight className="size-5 transition-transform duration-200 group-hover:rotate-330" />
                  </Button>
                </div>
                <div className="p-6 flex justify-between items-center gap-8">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-left text-lg">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground mt-2 text-right">
                    {project.category}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {!isPortfolioPage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button size="lg" className="rounded-full w-28" asChild>
              <Link to="/portfolio">See All</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
