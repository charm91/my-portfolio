"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Globe, CirclePlay, TabletSmartphone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudyAuthor } from "@/components/CaseStudyAuthor";
import { CaseStudySection as Section } from "@/components/CaseStudySection";
import {
  textPrimary,
  textSecondary,
  bgPage,
  pageTransition,
  scrollReveal,
  scrollRevealTransition,
} from "@/config/caseStudy";

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
        <div className="relative h-full w-full">
          <Image
            src="/k-cover.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
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
              <Image
                src="/wct/thumbnail.png"
                alt=""
                width={1488}
                height={1050}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
        <main
          id="main-content"
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
                <Image
                  src="/wct/preview.png"
                  alt="Problem"
                  width={1440}
                  height={960}
                  className="w-full h-auto"
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
                <Image
                  src="/wct/paper.png"
                  alt="Work Flow Diagram"
                  width={1440}
                  height={1100}
                  className="w-full h-auto"
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
                  <Image
                    src="/wct/solving.png"
                    alt="personas"
                    width={646}
                    height={1020}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/diagram.png"
                    alt="workflow"
                    width={710}
                    height={1020}
                    className="w-full h-auto"
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
                <Image
                  src="/wct/ui1.png"
                  alt="personas"
                  width={1440}
                  height={975}
                  className="w-full h-auto"
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
                  <Image
                    src="/wct/ui2.png"
                    alt="personas"
                    width={504}
                    height={359}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/ui3.png"
                    alt="workflow"
                    width={504}
                    height={358}
                    className="w-full h-auto"
                  />
                </div>
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/ui4.png"
                    alt="personas"
                    width={504}
                    height={359}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/ui5.png"
                    alt="workflow"
                    width={504}
                    height={359}
                    className="w-full h-auto"
                  />
                </div>
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/ui6.png"
                    alt="personas"
                    width={504}
                    height={357}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/wct/ui7.png"
                    alt="workflow"
                    width={504}
                    height={359}
                    className="w-full h-auto"
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

          <CaseStudyAuthor />
        </main>
      </section>
      <motion.div {...scrollReveal}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}
