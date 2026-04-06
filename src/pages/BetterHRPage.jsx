// eslint-disable-next-line no-unused-vars -- motion used as namespace (motion.section, motion.div)
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  ExternalLink,
  Globe,
  Play,
  CirclePlay,
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
      <div className="fixed top-0 left-0 right-0 h-[30vh] z-0" aria-hidden>
        <img
          src="/b-cover.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content and page content scroll over the fixed image */}
      <section className="relative flex flex-col z-10 mt-28 min-h-[50vh]">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-14 w-full bg-white rounded-t-2xl pt-10"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl px-4 font-medium text-center leading-tight mb-6 pt-5"
            style={{ color: textPrimary }}
          >
            BetterHR Cloud-based HR Management Platform
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium"
              style={{ color: textPrimary }}
            >
              <Briefcase className="size-4" />
              Cloud-based HR Management
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium"
              style={{ color: textPrimary }}
            >
              <Globe className="size-4" />
              Web & Mobile
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
              href="https://betterhr.com/"
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
                src="/betterhr/thumbnail.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
        <main
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-12 tracking-tight rounded-b-2xl bg-white"
          style={{ color: textSecondary }}
        >
          <Section title="Project Overview">
            <p className="mb-4">
              BetterHR is a cloud-based HR management platform designed for
              small and medium-sized businesses across Southeast Asia. The
              platform helps companies manage attendance, leave, payroll, and
              employee data through a single, centralized system.
            </p>
            <p className="mb-4">
              I joined BetterHR as a founding member of the product team,
              working in a hybrid role that combined product design, frontend
              development, and direct collaboration with clients and internal
              stakeholders. At this early stage, the team was small, which meant
              my responsibilities extended beyond UI execution into product
              discovery, validation, and delivery.
            </p>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              This project became the foundation of my product mindset and
              hands-on experience.
            </div>
          </Section>
          <Section title="Problem Statements">
            <p className="mb-4">
              These challenges defined the core problem space the product needed
              to solve:
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/betterhr/problem.png"
                alt="problem-statement"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </Section>
          <Section title="The Context">
            <p className="mb-4">
              Before BetterHR, many SMEs relied on spreadsheets, paper forms,
              and disconnected tools to manage HR operations. These workflows
              were time-consuming, error-prone, and difficult to scale as
              companies grew. The challenge was not only to design a usable
              interface, but to translate complex HR workflows into a system
              that non-technical users could adopt easily, while still
              supporting real operational needs.
            </p>
          </Section>

          <Section title="Discovery & Stakeholder Collaboration">
            <p>
              As a founding team member, I was involved from early discovery
              through delivery. A key part of my work was joining client
              meetings and interviews to understand real HR practices.{" "}
            </p>
            <p>I regularly worked with HR teams to learn:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>How attendance and leave were tracked in practice.</li>
              <li>Common payroll errors and pain points</li>
              <li>Approval flows and reporting needs</li>
              <li>Differences between company policies</li>
            </ul>
            <p>
              These insights ensured the product reflected real-world workflows,
              not assumptions.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="hidden md:block overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/group1.png"
                    alt="Meeting room discussion"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/group2.png"
                    alt="Presentation session"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Design Strategy & Solution">
            <p>
              Based on discovery insights, I focused on designing a system that
              emphasized clarity, consistency, and error prevention.
            </p>
            <p>Key design principles: </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Guide users step-by-step through complex HR tasks</li>
              <li>Reduce manual inputs and repeated data entry </li>
              <li>Make approval states and system feedback visible </li>
              <li>Keep workflows flexible for different company rules</li>
            </ul>
            <p>Insights were translated into: </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Clear and predictable user flows</li>
              <li>Simplified data structures </li>
              <li>Interfaces that reduced confusion and manual effort</li>
            </ul>

            <div className="overflow-hidden md:px-3 sm:px-2 mt-8">
              <img
                src="/betterhr/ux1.png"
                alt="Presentation session"
                className="h-full w-full object-cover max-h-80"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="/betterhr/ux2.png"
                alt="Presentation session"
                className="h-full w-full object-cover bg-gray-100"
              />
            </div>
          </Section>

          <Section title="Key Modules & Flows">
            <p>
              I designed both low- and high-fidelity prototypes across core
              modules, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attendance & overtime tracking </li>
              <li>Leave management and approvals </li>
              <li>Payroll preparation workflows </li>
              <li>Employee profiles and HR records</li>
            </ul>
            <p>
              Each flow was designed to handle edge cases, such as corrections,
              approvals, and policy variations.
            </p>
            <div className="rounded-lg bf-gray-100 p-2 my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/ui1.png"
                    alt="betterhrUI"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/ui2.png"
                    alt="betterhrUI"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Design–Development Collaboration">
            <p>
              Alongside design, I also contributed to frontend development.
              Working closely with engineers allowed me to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Clarify edge cases during implementation </li>
              <li>Adjust designs based on technical constraints </li>
              <li>Ensure design intent matched final product behavior </li>
              <li>Maintain consistency across different parts of the system</li>
            </ul>
            <p>
              This collaboration helped bridge the gap between design and
              delivery.
            </p>
            <div className="rounded-lg bf-gray-100 p-2 my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/ui3.png"
                    alt="betterhrUI"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Outcome">
            <p>
              BetterHR evolved into a stable HR platform used by companies
              across multiple countries in Southeast Asia. The system helped HR
              teams move away from manual processes and manage core operations
              digitally in one place.
            </p>
            <p>
              The modular design also allowed the product to scale by adding new
              features without redesigning the core experience.
            </p>
            <div className="rounded-lg bf-gray-100 p-2 my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/betterhr/ui4.png"
                    alt="betterhrUI"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <div className="bg-gray-50 px-6 py-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Reflection
              </h2>
              <p className="mb-4">
                Being part of BetterHR from an early stage taught me the
                importance of deep user understanding, early validation, and
                cross-functional collaboration. The project strengthened my
                experience in:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Designing systems with complex business rules </li>
                <li>Working directly with real clients and stakeholders </li>
                <li>Bridging product design and frontend development </li>
                <li>Contributing to product decisions beyond UI </li>
              </ul>
              <p>
                This experience reinforced my interest in product ownership and
                building systems that solve real operational problems—not just
                surface-level usability issues.
              </p>
            </div>
          </Section>

          <div class="border-t border-gray-200 py-4 mx-4">
            <div class="flex items-center justify-between gap-6 mt-2">
              <div class="flex items-center gap-5">
                <img
                  src="/profile-photo.png"
                  alt="Charm"
                  class="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 class="text-base text-gray-900">Charm</h3>
                  <p class="text-sm text-gray-500">
                    Product Owner • Design-to-Dev Builder
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/itscharmm9/"
                  class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M13 22v-8h3l1-4h-4V8c0-1.03 0-2 2-2h2V2h-3c-3.6 0-5 1.79-5 5v3H6v4h3v8h4z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/nguwah106/"
                  class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
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
