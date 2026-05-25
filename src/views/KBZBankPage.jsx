"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Globe, CirclePlay, TabletSmartphone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudyAuthor } from "@/components/CaseStudyAuthor";
import {
  textPrimary,
  textSecondary,
  bgPage,
  pageTransition,
  scrollReveal,
  scrollRevealTransition,
} from "@/config/caseStudy";

export function KBZBankPage() {
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
            Building a Secure Authentication System for KBZ Bank's Self-Service
            Portal
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
              Fintech / Digital Banking
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
              href="https://selfservice.kbzbank.com/"
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
                src="/kbz/thumbnail.png"
                alt=""
                width={1492}
                height={1028}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
        <main
          id="main-content"
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-12 tracking-tight rounded-b-2xl bg-white"
          style={{ color: textSecondary }}
        >
          <Section title="Project Overview">
            <p className="mb-4">
              KBZ Bank set out to enable customers to open bank accounts
              digitally, reducing dependency on physical branches. However,
              onboarding in banking is inherently complex—requiring identity
              verification, regulatory compliance, and multiple layers of data
              validation.
            </p>
            <p className="mb-4">
              My role was to design an onboarding experience that could handle
              this complexity while still feeling clear, guided, and trustworthy
              for users.
            </p>
          </Section>
          <Section title="The Challenge">
            <p className="mb-4">
              The onboarding flow was not a simple sign-up—it was a multi-step
              process with strict requirements and frequent failure points.
            </p>
            <p className="mb-4">Users had to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Upload identity documents and complete biometric verification
              </li>
              <li>
                Fill in detailed personal, financial, and address information
              </li>
              <li>
                Provide introducer details (a unique banking requirement){" "}
              </li>
              <li>Select branch and additional services </li>
              <li>Complete OTP verification and activation</li>
            </ul>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/diagram.png"
                  alt="Work Flow Diagram"
                  width={1440}
                  height={835}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="mb-4">
              The biggest issue was not just the number of steps—but the lack of
              clarity in how the system works.
            </p>
            <p className="mb-4">Users didn't understand:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Why they needed to input so much data</li>
              <li>What would happen after identity verification</li>
              <li>
                How different systems (KBZPay, mobile/internet banking, bank
                account) were connected
              </li>
            </ul>
          </Section>

          <Section title="Approach">
            <p className="mb-4">
              Instead of simplifying only the UI, I focused on restructuring the
              onboarding logic—making the system behavior clearer and reducing
              unnecessary effort.
            </p>
          </Section>
          <Section title="Designing a Structured Journey">
            <p className="mb-4">
              The onboarding process included multiple dependent steps—from
              identity capture to account activation. I redesigned the flow into
              a guided, progressive journey, where each step builds on the
              previous one and reduces user effort whenever possible.
            </p>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/flowchart.png"
                  alt="User Interface"
                  width={1440}
                  height={1637}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section title="Reducing Friction with Smart Data Reuse">
            <p className="mb-4">
              Rethinking how user data is handled was a key improvement. After
              successful biometric verification, the system retrieves and
              pre-fills existing customer data, allowing users to simply review
              and adjust before continuing.
            </p>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              Users shift from form filling to validating pre-verified data and
              progressing seamlessly.
            </div>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/ui1.png"
                  alt="User Interface"
                  width={1440}
                  height={1180}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section title="Creating a Multi-System Validation Flow">
            <p className="mb-4">
              Authentication doesn't happen in a single step—it spans across
              multiple systems. <br />
              After onboarding, validation continues through different channels:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>KBZPay (KPay): OTP or biometric face verification </li>
              <li>Mobile / Internet Banking: OTP or biometric verification </li>
              <li>
                Bank Account Security: Verification through security question
                (hint answer)
              </li>
            </ul>
            <p className="mb-4">
              I designed this as a connected validation journey, making it
              clearer how each step contributes to overall account security.
            </p>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/ui2.png"
                  alt="Flow Chart"
                  width={1440}
                  height={487}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section title="Designing for Real System States, Not Just Errors">
            <p className="mb-4">
              The onboarding journey doesn't end at submission—it continues
              through multiple system responses delivered via inbox
              notifications. <br /> Users may encounter different outcomes such
              as:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account successfully created</li>
              <li>Activation required (pending funding) </li>
              <li>Funding received confirmation</li>
              <li>Verification failed</li>
              <li>
                Invitation to complete additional steps (e.g., joint account,
                mobile banking)
              </li>
            </ul>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/ui3.png"
                  alt="User Interface"
                  width={1440}
                  height={1357}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section title="Final Activation & Offline Touchpoint">
            <p className="mb-4">
              Even after completing digital onboarding, the journey doesn't
              fully end online.
            </p>
            <p className="mb-4">
              Users are required to visit a selected branch to collect their
              bank passbook, which remains an important part of banking
              operations. <br />
              To support this, I ensured:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Branch selection is clearly integrated during onboarding </li>
              <li>Users understand the next step after activation </li>
              <li>
                The transition from digital to physical experience feels
                seamless
              </li>
            </ul>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/ui4.png"
                  alt="User Interface"
                  width={1440}
                  height={741}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section title="Outcome">
            <p className="mb-4">The redesigned onboarding experience:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reduced manual data entry through smart data reuse </li>
              <li>
                Improved clarity across a complex, multi-system validation flow
              </li>
              <li>
                Increased user confidence with better guidance and feedback
              </li>
              <li>Made a long onboarding process feel more manageable </li>
              <li>
                Bridged digital onboarding with necessary offline banking steps
              </li>
            </ul>
            <div className="bg-white my-8">
              <div className="overflow-hidden">
                <Image
                  src="/kbz/ui5.png"
                  alt="User Interface"
                  width={1440}
                  height={487}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          <Section>
            <div className="bg-gray-50 px-6 py-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Reflection
              </h2>
              <p className="mb-4">
                This project shifted my perspective from designing screens to
                designing systems. I learned that in financial products,
                complexity cannot be removed—but it can be structured in a way
                users can navigate with confidence.
              </p>
              <p className="mb-4">
                It also reinforced the importance of understanding how multiple
                systems interact, which is critical when designing real-world
                banking products.
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
