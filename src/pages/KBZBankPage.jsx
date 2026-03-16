import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars -- motion used as namespace (motion.div)
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, ExternalLink, Globe } from "lucide-react";
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

      {/* Hero: fixed background image at top (does not scroll) */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] z-0" aria-hidden>
        <img
          src="/kbz/background.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content and page content scroll over the fixed image */}
      <section className="relative flex flex-col justify-end z-10 mt-28">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 w-full bg-background"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6 pt-5"
            style={{ color: textPrimary }}
          >
            Building a Secure Authentication System for KBZ Bank's Self-Service
            Portal
          </h1>
          <div className="flex flex-wrap gap-2">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Briefcase className="size-4" />
              FinTech & Banking platform
            </span>
            <span
              className="flex items-center gap-2
               px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Globe className="size-4" />
              WebApp and Mobile
            </span>
            <span
              className="flex items-center gap-2
               px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Clock className="size-4" />8 mons
            </span>
          </div>
        </motion.div>
        <motion.div
          {...scrollReveal}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-background"
        >
          <div className="col-span-1 rounded-2xl overflow-hidden">
            <img
              src="/kbz/project-1.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 rounded-2xl overflow-hidden">
            <img
              src="/kbz/project-2.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 rounded-2xl overflow-hidden">
            <img
              src="/kbz/project-3.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="col-span-1 rounded-2xl overflow-hidden">
            <img
              src="/kbz/project-4.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </section>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-background">
        <Section title="Project Overview">
          <p className="mb-4" style={{ color: textSecondary }}>
            KBZ Bank initiated the development of a new Self-Service Banking
            Portal to enable customers to access banking services digitally
            without visiting branches.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            A core challenge of the project was designing a secure
            authentication system that:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Supports existing bank customers</li>
            <li>Minimizes repeated KYC friction</li>
            <li>Meets banking-grade security standards</li>
            <li>Builds user trust during digital onboarding</li>
          </ul>
          <p style={{ color: textSecondary }}>
            This case study focuses on designing the authentication architecture
            and registration flow for existing KBZ customers transitioning to
            digital banking.
          </p>
        </Section>

        {/* The Core Problem */}
        <Section title="The Core Problem">
          <p className="mb-4" style={{ color: textSecondary }}>
            Existing KBZ customers already have verified bank accounts and KYC
            records. However, activating digital banking required users to:
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            Key issues included:
          </p>
          <ul
            className="list-disc pl-6 mb-6 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Re-enter personal details</li>
            <li>Repeat identity verification steps</li>
            <li>
              Navigate unclear system differences between KBZPay and digital
              banking
            </li>
            <li>Visit branches for failed attempts</li>
          </ul>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            This created:
          </p>
          <ul
            className="list-disc pl-6 mb-6 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Redundant KYC submission</li>
            <li>Drop-offs during OTP verification</li>
            <li>Increased branch dependency</li>
            <li>User confusion between login systems</li>
            <li>Trust concerns around phishing and fake portals</li>
          </ul>
          <p className="font-medium mb-2" style={{ color: textPrimary }}>
            The core design challenge:
          </p>
          <blockquote
            className="text-base md:text-lg pl-4 border-l-4 border-[#1f2937] py-2 my-4 italic font-semibold"
            style={{ color: textPrimary }}
          >
            How might we build a secure authentication system that reduces
            friction without compromising banking-level security?
          </blockquote>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/design-1.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/design-2.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Section>

        {/* Design Principles */}
        <Section title="Design Principles">
          <p className="mb-6" style={{ color: textSecondary }}>
            To guide decisions, I established four core principles:
          </p>
          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "Reuse Verified Data",
                desc: "Avoid unnecessary re-entry of KYC information already stored in the banking system.",
              },
              {
                n: "2",
                title: "Visible but Calm Security",
                desc: "Make security steps clear and reassuring without overwhelming users.",
              },
              {
                n: "3",
                title: "Progressive Verification",
                desc: "Only request additional verification when risk level increases.",
              },
              {
                n: "4",
                title: "Transparent Failure Handling",
                desc: "Explain rejection reasons clearly and provide recovery paths.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: textPrimary }}
                >
                  {n}. {title}
                </h3>
                <p style={{ color: textSecondary }}>{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Authentication Architecture */}
        <Section title="Authentication Architecture">
          <p className="mb-6" style={{ color: textSecondary }}>
            The system was designed around three core components:
          </p>
          <div className="space-y-6">
            <div>
              <h3
                className="font-semibold text-lg mb-2"
                style={{ color: textPrimary }}
              >
                1. Identity Recognition Layer
              </h3>
              <ul
                className="list-disc pl-6 space-y-1"
                style={{ color: textSecondary }}
              >
                <li>Account number / NRC / Phone matching</li>
                <li>Existing customer database validation</li>
                <li>Auto-prefill of stored information</li>
              </ul>
            </div>
            <div>
              <h3
                className="font-semibold text-lg mb-2"
                style={{ color: textPrimary }}
              >
                2. Multi-Factor Verification
              </h3>
              <ul
                className="list-disc pl-6 space-y-1"
                style={{ color: textSecondary }}
              >
                <li>OTP confirmation</li>
                <li>Secure password setup</li>
                <li>Device binding</li>
              </ul>
            </div>
            <div>
              <h3
                className="font-semibold text-lg mb-2"
                style={{ color: textPrimary }}
              >
                3. Access Control & Session Security
              </h3>
              <ul
                className="list-disc pl-6 space-y-1"
                style={{ color: textSecondary }}
              >
                <li>Role-based access</li>
                <li>Session timeout management</li>
                <li>Secure login retry limits</li>
              </ul>
            </div>
          </div>
          <p className="mt-6" style={{ color: textSecondary }}>
            This ensured compliance with security standards while optimizing
            user flow.
          </p>
        </Section>

        {/* Key Flows */}
        <Section title="Key Flow 1: Existing Customer Registration">
          <p className="mb-2" style={{ color: textSecondary }}>
            <strong style={{ color: textPrimary }}>Objective:</strong> Allow
            verified bank customers to activate digital access without repeating
            full KYC.
          </p>
          <p className="font-semibold mb-1" style={{ color: textPrimary }}>
            Improvements:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Auto-filled customer data</li>
            <li>Clear progress indicator</li>
            <li>Reduced activation screens</li>
            <li>Inline error validation</li>
          </ul>
          <p className="font-semibold mb-1" style={{ color: textPrimary }}>
            Impact:
          </p>
          <ul className="list-disc pl-6" style={{ color: textSecondary }}>
            <li>Reduced redundant data entry</li>
            <li>Shortened activation journey</li>
            <li>Lowered cognitive load</li>
          </ul>
        </Section>

        <Section title="Key Flow 2: Handling Fragmented Customer Records">
          <p className="mb-4" style={{ color: textSecondary }}>
            Some users had inconsistent phone or KYC records across systems.
          </p>
          <p className="font-semibold mb-1" style={{ color: textPrimary }}>
            Solution:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Real-time validation feedback</li>
            <li>Clear system mismatch explanations</li>
            <li>Guided next-step resolution</li>
            <li>Escalation to branch only when necessary</li>
          </ul>
          <p style={{ color: textSecondary }}>
            This prevented silent failures and increased transparency.
          </p>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/keyflow-1.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/keyflow-2.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Section>

        <Section title="Key Flow 3: Mobile Banking Linking">
          <p className="mb-4" style={{ color: textSecondary }}>
            To avoid confusion between KBZPay and digital banking:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Clarified system differences</li>
            <li>Unified account visibility</li>
            <li>Clear login hierarchy</li>
            <li>Cross-platform consistency</li>
          </ul>
          <p style={{ color: textSecondary }}>
            This reduced misdirected login attempts.
          </p>
        </Section>

        <Section title="Key Flow 4: Secure Login & Recovery">
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            Designed:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Clear password rules</li>
            <li>Visible OTP status feedback</li>
            <li>Secure reset flow</li>
            <li>Account lock prevention guidance</li>
          </ul>
          <p style={{ color: textSecondary }}>
            Security was enforced without creating intimidation.
          </p>
        </Section>

        {/* Risk & Edge Case */}
        <Section title="Risk & Edge Case Considerations">
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Multiple failed OTP attempts</li>
            <li>Expired session handling</li>
            <li>Phishing awareness messaging</li>
            <li>Partial onboarding abandonment</li>
            <li>Device switching scenarios</li>
          </ul>
          <p style={{ color: textSecondary }}>
            By mapping these cases early, system resilience improved
            significantly.
          </p>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/keyflow-3.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/kbz/keyflow-4.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Section>

        {/* My Role */}
        <Section title="My Role">
          <p className="mb-4" style={{ color: textSecondary }}>
            I designed the end-to-end identity verification and flow routing
            experience across both mobile and web platforms.
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            My responsibilities included:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>End-to-end authentication flow design</li>
            <li>User journey mapping</li>
            <li>Error state and edge case definition</li>
            <li>Security-usability tradeoff analysis</li>
            <li>Cross-team collaboration with engineering</li>
          </ul>
          <p style={{ color: textSecondary }}>
            I worked closely with technical stakeholders to ensure alignment
            between UX intent and system constraints.
          </p>
        </Section>

        {/* Outcome */}
        <Section title="Outcome">
          <p className="mb-4" style={{ color: textSecondary }}>
            The Self-Service Banking Portal successfully handled customer
            identity across multiple fintech products and legacy systems. By
            introducing NRC-based verification at the start of the journey and
            routing existing customers through mobile banking authentication,
            the platform prevented duplicate customer records and protected KYC
            integrity.
          </p>
          <p className="mb-6" style={{ color: textSecondary }}>
            The solution reduced operational risk, aligned with compliance
            requirements, and created a scalable foundation for future digital
            onboarding and self-service features. The platform is{" "}
            <strong>live and actively used</strong> across both mobile and web.
          </p>
          <a
            href="https://selfservice.kbzbank.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-[#1f2937] hover:underline"
          >
            Live project: Self-service Banking Portal
            <ExternalLink className="size-4" />
          </a>
        </Section>
      </main>
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
      className="mb-12 md:mb-16"
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
