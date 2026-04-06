import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars -- motion used as namespace (motion.section, motion.div)
import { motion } from "framer-motion";
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

export function UniLinksPage() {
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
          src="/u-cover.png"
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
            UniLinks All-in-One Study Abroad Platform
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
              Admission Platform
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
              href="https://unilinks.co/"
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
                src="/unilinks/thumbnail.png"
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
              UniLinks is a student-to-student education platform designed to
              help students discover suitable international programs, understand
              real admission requirements, and receive guidance directly from
              mentors who are already studying the same program at the same
              university. The platform is built around a simple belief:
            </p>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              Students can help students better than traditional education
              agencies.
            </div>
            <p className="mb-4">
              UniLinks removes unnecessary intermediaries and replaces them with
              real experiences, transparent information, and mutual support,
              while also helping existing students earn contribution bonuses to
              support their living costs abroad.
            </p>
          </Section>
          <Section title="Why UniLinks Exists (The Motivation)">
            <p className="mb-4">
              I co-founded UniLinks while pursuing my Master's degree at
              Harbour.Space, originally as a capstone project. The idea emerged
              from close friends who were informally helping students navigate
              real challenges — unclear admission information, difficulty
              choosing the right programs, financial pressure abroad, and
              reliance on costly, opaque education agencies.
            </p>
            <p className="mb-4">
              Having experienced student life overseas myself, I understood how
              information gaps and financial stress can shape a student's entire
              academic journey. At the same time, I saw a powerful opportunity:
              existing students already held the knowledge junior students
              needed.
            </p>
            <p className="mb-4">
              UniLinks was created to bridge that gap — enabling students to
              guide students, transparently and sustainably.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="overflow-hidden rounded-sm bg-gray-100">
                <img
                  src="/unilinks/group-photo.png"
                  alt="Fianl Presentation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>

          <Section title="The Core Problem">
            <p className="mb-4">
              <b>Students lack real, trustworthy admission insight.</b> <br />
              Most rely on marketing-heavy university pages, costly agents, or
              fragmented social content—making it hard to understand what
              studying a program is actually like.
            </p>
            <p className="mb-4">
              <b>International students face financial</b> <br />
              pressure. Many struggle with living costs, have limited work
              options, and want to help others—but lack a structured, ethical
              way to do so.
            </p>
            <p className="mb-4">
              <b>Admissions are still agency-driven and inefficient.</b>
              <br />
              Traditional flows depend on third parties, lack transparency, and
              put business incentives above student experience.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/flow1.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/flow2.png"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section title="Our Approach: A Student-First Admission Model">
            <p className="mb-4">
              That's why we built UniLinks — to redesign the admission journey
              from a student's perspective. Instead of relying on marketing
              content or third-party agencies, UniLinks connects prospective
              students directly with those already studying the same program and
              university, enabling honest, experience-based guidance.
            </p>
            <p className="mb-4">
              At the same time, the platform creates a structured and ethical
              way for existing students to contribute meaningfully and earn
              support for their living costs abroad. To ensure this model works
              at scale, UniLinks operates as a three-sided ecosystem where
              students discover and decide, mentors guide and support, and the
              admin team ensures quality, transparency, and process integrity
              throughout the journey.
            </p>
            <p className="mb-4">
              <b>Admissions are still agency-driven and inefficient.</b>
              <br />
              Traditional flows depend on third parties, lack transparency, and
              put business incentives above student experience.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                <div className="hidden md:block overflow-hidden rounded-sm">
                  <img
                    src="/unilinks/flow3.png"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <img
                    src="/unilinks/flow4.png"
                    alt="workflow"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              1. Student Portal — Discover & Decide with Confidence
            </h3>
            <p className="mb-4">Students can:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Find programs based on interests, background, and goals</li>
              <li>Read full curriculum details with no hidden information</li>
              <li>Compare programs across universities </li>
              <li>
                Understand requirements, timelines, and expectations upfront
              </li>
            </ul>
            <p className="mb-4">
              Instead of pushing universities, UniLinks helps students make
              informed decisions first.
            </p>
            <div className="rounded-lg my-8">
              <div className="overflow-hidden rounded-sm bg-gray-100">
                <img
                  src="/unilinks/ui1.png"
                  alt="User Interface Design"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>

          <Section>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              2. Mentor Portal — Students Helping Students
            </h3>
            <p className="mb-4">Mentors are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Existing students studying the same program at the same
                university
              </li>
              <li> Sharing real, authentic experiences</li>
              <li>Guiding juniors through the admission journey</li>
            </ul>
            <p className="mb-4">Mentors help with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Program expectations</li>
              <li>Application preparation </li>
              <li>Personal insights about student life</li>
            </ul>
            <p className="mb-4">
              In return, mentors receive a contribution bonus from UniLinks
              after successful admissions — helping them support their living
              costs abroad. This creates a sustainable, ethical incentive model.
            </p>
            <div className="rounded-lg my-8">
              <div className="overflow-hidden rounded-sm bg-gray-100">
                <img
                  src="/unilinks/ui2.png"
                  alt="User Interface Design"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>

          <Section>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              3. Admin Portal — Quality, Trust & Process Management
            </h3>
            <p className="mb-4">The UniLinks admin team:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monitors student–mentor interactions</li>
              <li>Reviews consultation processes </li>
              <li>Supports both sides when issues arise </li>
              <li>Ensures information accuracy and process integrity</li>
            </ul>
            <p className="mb-4">
              The admin portal keeps the ecosystem transparent, fair, and
              scalable.
            </p>
            <div className="rounded-lg my-8">
              <div className="overflow-hidden rounded-sm bg-gray-100">
                <img
                  src="/unilinks/ui3.png"
                  alt="User Interface Design"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Section>
          <Section title="End-to-End Flow (How It Works)">
            <ul className="list-decimal pl-5 space-y-1">
              <li>Student discovers programs on UniLinks </li>
              <li>Student reviews full curriculum & compares options </li>
              <li>
                Student books consultation with a mentor from the same program
              </li>
              <li>Mentor guides the student through admission steps </li>
              <li>UniLinks admin supports and verifies the process </li>
              <li>Student successfully passes admission</li>
              <li>Mentor receives contribution bonus </li>
            </ul>
            <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
              No education agency involved! No hidden fees! A true
              student-to-student journey.
            </div>
          </Section>
          <Section title="My Role & Contribution">
            <p className="mb-4">
              As Co-Founder and Product Owner, I was responsible for shaping
              both the vision and execution of UniLinks. I led the product
              direction from early concept to system design, defining how
              students, mentors, and administrators interact within a single
              platform. My work covered end-to-end user journeys, including
              program discovery, comparison, consultation flows, mentoring
              interactions, and the incentive model that rewards mentors for
              their contributions.
            </p>
            <p className="mb-4">
              I also established the design system and scalable UI structure to
              support future growth, ensuring consistency across the student,
              mentor, and admin portals. Throughout the process, I translated
              real student pain points into product decisions, balancing trust,
              transparency, and scalability while designing flows that worked
              not only for users, but also for operational and administrative
              needs.
            </p>
            <div className="rounded-lg my-8">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/display-1.jpg"
                    alt="personas"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/display-2.jpg"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/display-3.jpg"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src="/unilinks/display-4.jpg"
                    alt="workflow"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className="bg-gray-50 px-6 py-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                Impact & Value
              </h2>
              <p className="mb-4">
                <b>For students,</b> <br /> UniLinks provided clear and honest
                program information, reduced reliance on costly education
                agencies, and offered both emotional and practical support from
                peers who had already walked the same path. This helped students
                make better-informed decisions before committing financially to
                studying abroad.
              </p>
              <p className="mb-4">
                <b>For mentors,</b> <br /> The platform created an opportunity
                to contribute meaningfully to the student community while
                receiving ethical financial support to help cover living costs
                abroad. Mentors were recognized for their real experience and
                able to support others in a structured and sustainable way.
              </p>
              <p className="mb-4">
                <b>For the education ecosystem,</b> <br /> UniLinks reduced
                dependency on traditional intermediaries, increased transparency
                in the admission process, and introduced a scalable,
                community-driven model that places students at the center of
                academic decision-making.
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
