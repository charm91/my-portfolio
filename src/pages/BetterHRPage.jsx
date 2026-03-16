// eslint-disable-next-line no-unused-vars -- motion used as namespace (motion.section, motion.div)
import { motion } from "framer-motion";
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

export function BetterHRPage() {
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
          src="/betterhr.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content and page content scroll over the fixed image */}
      <section className="relative flex flex-col justify-end z-10 mt-28 min-h-[50vh]">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-14 w-full bg-background rounded-t-2xl pt-10"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6 pt-5"
            style={{ color: textPrimary }}
          >
            BetterHR Cloud-based HR Management Platform
          </h1>
          <div className="flex flex-wrap gap-2">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Briefcase className="size-4" />
              Cloud-based HR Management
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Globe className="size-4" />
              WebApp and Mobile
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Clock className="size-4" />
              Founding → Growth phase
            </span>
          </div>
          <motion.div
            {...scrollReveal}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/display-1.webp"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/display-2.webp"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/display-3.webp"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/display-4.webp"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 rounded-b-2xl bg-background">
        <Section title="Project Overview">
          <p className="mb-4" style={{ color: textSecondary }}>
            BetterHR is a cloud-based HR management platform designed for small
            and medium-sized businesses across Southeast Asia. The platform
            helps companies manage attendance, leave, payroll, and employee data
            through a single, centralized system.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            I joined BetterHR as a founding member of the product team, working
            in a hybrid role that combined product design, frontend development,
            and direct collaboration with clients and internal stakeholders. At
            this early stage, the team was small, which meant my
            responsibilities extended beyond UI execution into product
            discovery, validation, and delivery.
          </p>
          <p style={{ color: textSecondary }}>
            This project became{" "}
            <strong style={{ color: textPrimary }}>
              the foundation of my product mindset and hands-on experience.
            </strong>
          </p>
        </Section>

        <Section title="The Context">
          <p className="mb-4" style={{ color: textSecondary }}>
            Before BetterHR, many SMEs relied on{" "}
            <strong style={{ color: textPrimary }}>
              spreadsheets, paper forms, and disconnected tools
            </strong>{" "}
            to manage HR operations. These workflows were time-consuming,
            error-prone, and difficult to scale as companies grew.
          </p>
          <p style={{ color: textSecondary }}>
            The challenge was not only to design a usable interface, but to
            translate complex{" "}
            <strong style={{ color: textPrimary }}>HR workflows</strong> into a
            system that{" "}
            <strong style={{ color: textPrimary }}>
              non-technical users could adopt easily
            </strong>
            , while still supporting real operational needs.
          </p>
        </Section>

        <Section title="Problem Statements">
          <p className="mb-4" style={{ color: textSecondary }}>
            From early discovery and client discussions, several key problems
            emerged:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>
              HR data was scattered across multiple tools, causing duplication
              and errors
            </li>
            <li>
              Manual attendance and leave tracking led to payroll mistakes
            </li>
            <li>Approval flows lacked visibility and clear status tracking</li>
            <li>Existing HR tools were too complex for small teams</li>
            <li>
              Different companies followed different HR policies, but tools were
              inflexible
            </li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-10">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/group-photo-1.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/group-photo-2.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Section>

        <Section title="Discovery & Stakeholder Collaboration">
          <p className="mb-4" style={{ color: textSecondary }}>
            As a founding team member, I was involved from early discovery
            through delivery. A key part of my work was joining client meetings
            and interviews to understand real HR practices.
          </p>
          <p className="mb-2" style={{ color: textSecondary }}>
            I regularly worked with HR teams to learn:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>How attendance and leave were tracked in practice</li>
            <li>Common payroll errors and pain points</li>
            <li>Approval flows and reporting needs</li>
            <li>Differences between company policies</li>
          </ul>
          <p style={{ color: textSecondary }}>
            These insights ensured the product reflected{" "}
            <strong style={{ color: textPrimary }}>real-world workflows</strong>
            , not assumptions.
          </p>
        </Section>

        <Section title="Design Strategy & Solution">
          <p className="mb-4" style={{ color: textSecondary }}>
            Based on discovery insights, I focused on designing a system that
            emphasized{" "}
            <strong style={{ color: textPrimary }}>
              clarity, consistency, and error prevention
            </strong>
            .
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            Key design principles:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Guide users step-by-step through complex HR tasks</li>
            <li>Reduce manual inputs and repeated data entry</li>
            <li>Make approval states and system feedback visible</li>
            <li>Keep workflows flexible for different company rules</li>
          </ul>
          <p className="mb-4" style={{ color: textSecondary }}>
            Insights were translated into:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Clear and predictable user flows</li>
            <li>Simplified data structures</li>
            <li>Interfaces that reduced confusion and manual effort</li>
          </ul>
          <div className="rounded-2xl overflow-hidden mt-10">
            <img
              src="/betterhr/workflow.png"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Section>

        <Section title="Key Modules & Flows">
          <p className="mb-4" style={{ color: textSecondary }}>
            I designed both low- and high-fidelity prototypes across core
            modules, including:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Attendance & overtime tracking</li>
            <li>Leave management and approvals</li>
            <li>Payroll preparation workflows</li>
            <li>Employee profiles and HR records</li>
          </ul>
          <p style={{ color: textSecondary }}>
            Each flow was designed to handle{" "}
            <strong style={{ color: textPrimary }}>edge cases</strong>, such as
            corrections, approvals, and policy variations.
          </p>
        </Section>

        <Section title="Design–Development Collaboration">
          <p className="mb-4" style={{ color: textSecondary }}>
            Alongside design, I also contributed to frontend development.
            Working closely with engineers allowed me to:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Clarify edge cases during implementation</li>
            <li>Adjust designs based on technical constraints</li>
            <li>Ensure design intent matched final product behavior</li>
            <li>Maintain consistency across different parts of the system</li>
          </ul>
          <p style={{ color: textSecondary }}>
            This collaboration helped bridge the gap between design and
            delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-10">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/betterhr/flow-chart-1.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/betterhr/flow-chart-2.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Section>

        <Section title="Outcome">
          <p className="mb-4" style={{ color: textSecondary }}>
            BetterHR evolved into a stable HR platform used by companies across
            multiple countries in Southeast Asia. The system helped HR teams
            move away from manual processes and manage core operations digitally
            in one place.
          </p>
          <p style={{ color: textSecondary }}>
            The modular design also allowed the product to scale by adding new
            features without redesigning the core experience.
          </p>
        </Section>

        <Section title="Reflection">
          <p className="mb-4" style={{ color: textSecondary }}>
            Being part of BetterHR from an early stage taught me the importance
            of{" "}
            <strong style={{ color: textPrimary }}>
              deep user understanding, early validation, and cross-functional
              collaboration
            </strong>
            . The project strengthened my experience in:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Designing systems with complex business rules</li>
            <li>Working directly with real clients and stakeholders</li>
            <li>Bridging product design and frontend development</li>
            <li>Contributing to product decisions beyond UI</li>
          </ul>
          <p className="mb-6" style={{ color: textSecondary }}>
            This experience reinforced my interest in{" "}
            <strong style={{ color: textPrimary }}>product ownership</strong>{" "}
            and building systems that solve real operational problems—not just
            surface-level usability issues.
          </p>
          <a
            href="https://betterhr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-[#1f2937] hover:underline"
          >
            Live project: BetterHR Cloud-based HR Management Platform
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
