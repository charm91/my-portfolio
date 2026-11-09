"use client";

import Image from "next/image";
import kbzAsset from "../../public/kbz.png";
import unilinksAsset from "../../public/unilinks.png";
import betterAsset from "../../public/better.png";
import wctAsset from "../../public/wct.png";
import cornerWhiteAsset from "../../public/corner-white.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const kbzBankImage = kbzAsset.src;
const uniLinksImage = unilinksAsset.src;
const betterhrImage = betterAsset.src;
const wctImage = wctAsset.src;

const projects = [
  {
    title: "Better HR Cloud-based HR Management Platform",
    category: "Web + Mobile Apps",
    image: betterhrImage,
    href: "/betterhr",
  },
  {
    title: "UniLinks All-in-One Study Abroad Platform",
    category: "Web App",
    image: uniLinksImage,
    href: "/unilinks",
  },
  {
    title: "KBZ Bank Digital Banking Authentication System",
    category: "Web App",
    image: kbzBankImage,
    href: "/kbz-bank",
  },
  {
    title: "WCT Pay Crypto–Fiat Payment Dashboard",
    category: "Web App",
    image: wctImage,
    href: "/wct",
  },
];

export function Portfolio() {
  const pathname = usePathname();
  const isPortfolioPage = pathname === "/portfolio";
  const Heading = isPortfolioPage ? "h1" : "h2";

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-5 mb-10"
        >
          <p className="section-category text-xs">Portfolio Highlights</p>
          <Heading className="section-title">
            Selected Work Across <br />
            <span className="font-serif italic font-normal">Product Systems.</span>
          </Heading>

        </motion.div>

        <div className="grid grid-cols-1 max-w-xl mx-auto gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.article
              initial={{ opacity: 0, y: 48, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                mass: 0.8,
                delay: 0.05 * index,
              }}
              key={project.href}
              className="rounded-3xl bg-card hover:shadow-xs focus-within:shadow-xs transition-shadow duration-300"
            >
              <Link href={project.href} className="group block rounded-3xl p-2">
                <div className="aspect-4/3 overflow-hidden rounded-3xl relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                  <Image
                    src={cornerWhiteAsset.src}
                    alt=""
                    width={190}
                    height={90}
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-[190px] h-[90px] overflow-hidden"
                  />
                  <span
                    className={buttonVariants({
                      size: "lg", variant: "outline",
                      className: "mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary bg-[#f6f7f9] rounded-full absolute bottom-2 right-5 border-0",
                    })}
                  >
                    See Details
                    <ArrowRight className="size-5 transition-transform duration-200 motion-safe:group-hover:rotate-330 motion-safe:group-focus-visible:rotate-330" />
                  </span>
                </div>
                <div className="p-6 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-baseline sm:gap-6">
                  <h3 className="min-w-0 font-medium text-foreground group-hover:text-primary transition-colors sm:line-clamp-2 text-left text-base">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground text-left sm:text-right shrink-0">
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
            <Button size="lg" className="rounded-full px-8 h-10" asChild>
              <Link href="/portfolio">See All</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
