"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock,
  ExternalLink,
  Globe,
  Play,
  CirclePlay,
  TabletSmartphone,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const textPrimary = "#1f2937";
const textSecondary = "#4b5563";
const bgPage = "#fafafa";

const pageTransition = { duration: 0.4, ease: "easeOut" };
const scrollRevealTransition = { duration: 0.5, ease: "easeOut" };
const scrollReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px", amount: 0.15 },
  transition: scrollRevealTransition,
};

export function WctPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={pageTransition}
      className="min-h-screen overflow-auto relative"
      style={{ backgroundColor: bgPage }}
    >
      <Header />

      <div className="fixed top-0 left-0 right-0 h-[30vh] z-0" aria-hidden>
        <img
          src="/k-cover.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <section className="relative flex flex-col z-10 mt-28 min-h-[50vh]">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-14 w-full bg-white rounded-t-2xl pt-10"
        >
          <h1
            className="text-4xl sm:text-4xl md:text-5xl font-medium text-center leading-tight mb-6 pt-5 tracking-tight"
            style={{ color: textPrimary }}
          >
            WCT Pay Crypto–Fiat Payment Dashboard
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium"
              style={{ color: textPrimary }}
            >
              <TabletSmartphone className="size-4" />
              WebApp (Responsive)
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium"
              style={{ color: textPrimary }}
            >
              <Globe className="size-4" />
              Crypto–Fiat Management Platform
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium"
              style={{ color: textPrimary }}
            >
              <Clock className="size-4" />
              Founding → Growth phase
            </span>
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <a
              href="https://www.wctpay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-3xl bg-[#1f2937] px-5 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#111827] hover:shadow-lg active:translate-y-0 active:scale-100"
            >
              <CirclePlay className="size-5 transition-all duration-200 group-hover:scale-110 group-hover:translate-x-0.5" />
              <span className="transition-all duration-200 group-hover:translate-x-0.5">
                Live Project
              </span>
            </a>
          </div>
          <motion.div {...scrollReveal} className="mt-10">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/wct/thumbnail.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
        <main
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-12 rounded-b-2xl tracking-tight bg-white"
          style={{ color: textSecondary }}
        >
          <Section title="Project Overview">
            <p className="mb-4">
              When I joined the WCT Pay project, the core challenge wasn’t just
              designing screens — it was making sense of a system that most
              users don’t fully understand. Crypto payments, fiat settlements,
              invoicing, payouts — all of these existed, but they were
              fragmented. Merchants had to mentally connect multiple steps,
              often across different tools. The goal was simple on paper:
            </p>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              A unified dashboard to manage the full payment lifecycle from
              crypto to fiat with clarity.
            </div>
            <p className="mb-4">
              But in reality, this meant solving one of the hardest UX problems
              in fintech:{" "}
              <b>
                making invisible financial complexity feel simple and
                trustworthy.
              </b>
            </p>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <img
                  src="/wct/preview.png"
                  alt="Problem"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>
          <Section title="Understanding the Problem">
            <p className="mb-4">
              At first, it looked like a typical fintech system: multiple flows,
              multiple features, multiple data points. But after going through
              the product more carefully, I realized the issue wasn’t about what
              was missing.
            </p>
            <p className="mb-4">It was about how everything was connected</p>
            <p className="mb-4">
              <b>From a user’s perspective,</b> the experience wasn’t one
              journey — it was several disconnected steps. And worse, users had
              to think in two different mental models at the same time: Crypto…
              and fiat.
            </p>
            <p>
              <b>The system expected them to translate</b> between the two,
              understand where their money was, and make decisions confidently —
              all without enough clarity.
            </p>
            <p>
              <b>That gap is subtle,</b> but critical. Because in financial
              products, confusion doesn’t just slow users down. It breaks trust.
            </p>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <img
                  src="/wct/paper.png"
                  alt="Work Flow Diagram"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>
          <Section title="Reframing the Product">
            <p className="mb-4">
              Instead of starting with UI, I stepped back and reframed the
              problem: This isn’t a dashboard. It’s a money lifecycle.
            </p>
            <p className="mb-4">
              Every action — whether it’s invoicing, receiving funds, or
              withdrawing, is just part of one continuous journey:
            </p>

            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              Request → Receive → Understand → Withdraw
            </div>
            <p className="mb-4">
              That shift changed everything.
              <br /> Instead of designing separate features, I focused on making
              the flow between them feel seamless and predictable.
            </p>
          </Section>

          <Section title="Design Principle: Reduce Thinking">
            <p className="mb-4">
              The biggest opportunity wasn’t adding anything new. It was
              removing the need for users to think too much. One clear example
              was how balances were presented, users could see multiple
              currencies and tokens, but that didn’t answer their real question:
            </p>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              How much money do I actually have?
            </div>
            <p className="mb-4">
              So I changed the perspective. <br /> Instead of showing crypto and
              fiat as separate concepts, the system translates everything into
              value. Users still see what they hold, but more importantly, they
              understand what it means.
              <br /> It’s a small shift — but it removes constant mental
              calculation. <br /> And that’s where clarity starts.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/solving.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/diagram.png"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Designing for Trust Moments">
            <p className="mb-4">
              Not every part of the product carries the same weight.
              <br /> Some moments matter more than others. I focused heavily on
              the moments where users feel the most uncertainty:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>When they receive payment</li>
              <li>When they send money </li>
              <li>When they withdraw funds </li>
            </ul>
            <p className="mb-4">
              These are not just interactions, they are trust moments. <br />
              Instead of optimizing for speed or visual complexity, I made sure
              these moments feel clear, controlled, and intentional.
              <br /> Sometimes that meant simplifying the interface. Sometimes
              it meant adding friction — like confirmation steps — to help users
              feel more confident before completing an action.
              <br /> Because in fintech, fast doesn’t always mean good.
              Confident does.
            </p>
            <div className="my-8">
              <div className="overflow-hidden ">
                <img
                  src="/wct/ui1.png"
                  alt="personas"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>

          <Section title="From Tool to System">
            <p className="mb-4">
              As the structure became clearer, the product naturally shifted. It
              stopped feeling like a collection of features and started behaving
              like a system. Everything connected back to the same goal: helping
              users move and manage money without confusion. That alignment made
              the experience more predictable, and more importantly, more
              trustworthy.
            </p>
            <div className="my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui2.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui3.png"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui4.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui5.png"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui6.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/wct/ui7.png"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section title="What I Learned">
            <p className="mb-4">
              This project changed how I approach complex products.
            </p>
            <p>
              I learned that clarity doesn’t come from simplifying the system
              itself — it comes from simplifying how users experience it.
            </p>
            <p>
              It’s not about removing complexity, It’s about absorbing it into
              the design so users don’t have to.
            </p>
          </Section>

          <Section>
            <div className="bg-gray-50 px-6 py-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Reflection
              </h2>
              <p className="mb-4">
                If I look back, the most important shift wasn’t visual.
              </p>
              <p className="mb-4">
                It was structural. Once the product was reframed as a single
                lifecycle instead of separate features, the design decisions
                became much more obvious.
              </p>
              <p className="mb-4">
                And that’s something I carry forward: Good product design isn’t
                about adding more.It’s about making everything feel connected,
                clear, and reliable.
              </p>
            </div>
          </Section>

          <div className="border-t border-gray-200 py-4 mx-4">
            <div className="flex items-center justify-between gap-6 mt-2">
              <div className="flex items-center gap-5">
                <img
                  src="/profile-photo.png"
                  alt="Charm"
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-base text-gray-900">Charm</h3>
                  <p className="text-sm text-gray-500">
                    Product Owner • Design-to-Dev Builder
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/itscharmm9/"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M13 22v-8h3l1-4h-4V8c0-1.03 0-2 2-2h2V2h-3c-3.6 0-5 1.79-5 5v3H6v4h3v8h4z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/nguwah106/"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.03 2.03 0 1 0 5.3 7.06 2.03 2.03 0 0 0 5.25 3zM20.44 12.64c0-3.03-1.62-4.44-3.79-4.44-1.75 0-2.53.96-2.97 1.64V8.5h-3.38c.04.89 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.89-1.38 1.93-1.38 1.36 0 1.91 1.04 1.91 2.57V20H21v-6.96z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </main>
      </section>
      <motion.div {...scrollReveal}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px", amount: 0.15 }}
      transition={scrollRevealTransition}
      className="mb-12 md:mb-16 px-4"
    >
      <h2
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: textPrimary }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed">{children}</div>
    </motion.section>
  );
}
