import { Link } from "react-router-dom";
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
      <div className="fixed top-0 left-0 right-0 h-[50vh] z-0" aria-hidden>
        <img
          src="/unilinks.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content and page content scroll over the fixed image */}
      <section className="relative flex flex-col justify-end z-10 mt-28 min-h-[50vh] ">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-12 w-full bg-background rounded-t-2xl pt-10"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6 pt-5"
            style={{ color: textPrimary }}
          >
            UniLinks All-in-One Study Abroad Platform
          </h1>
          <div className="flex flex-wrap gap-2">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Briefcase className="size-4" />
              EdTech Platform
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Globe className="size-4" />
              WebApp
            </span>
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ color: textPrimary }}
            >
              <Clock className="size-4" />1 year
            </span>
          </div>
        </motion.div>
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-12 w-full bg-background grid grid-cols-1 md:grid-cols-2 gap-4 h-full md:h-[600px]"
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/unilinks/display-1.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/unilinks/display-2.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/unilinks/display-3.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="rounded-2xl overflow-hidden hidden md:inline-block">
            <img
              src="/unilinks/display-4.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </section>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 bg-background rounded-b-2xl">
        <Section title="Project Overview">
          <p className="mb-4" style={{ color: textSecondary }}>
            UniLinks is a student-to-student education platform designed to help
            students discover suitable international programs, understand real
            admission requirements, and receive guidance directly from mentors
            who are already studying the same program at the same university.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            The platform is built around a simple belief:
          </p>
          <blockquote
            className="pl-4 border-l-4 border-[#1f2937] py-2 my-4 font-semibold italic text-lg"
            style={{ color: textPrimary }}
          >
            Students can help students better than traditional education
            agencies.
          </blockquote>
          <p className="mb-4" style={{ color: textSecondary }}>
            UniLinks removes unnecessary intermediaries and replaces them with
            real experiences, transparent information, and mutual support, while
            also helping existing students earn contribution bonuses to support
            their living costs abroad.
          </p>
        </Section>

        <Section title="Why UniLinks Exists (The Motivation)">
          <p className="mb-4" style={{ color: textSecondary }}>
            I co-founded UniLinks while pursuing my Master's degree at
            Harbour.Space, originally as a capstone project. The idea emerged
            from close friends who were informally helping students navigate
            real challenges — unclear admission information, difficulty choosing
            the right programs, financial pressure abroad, and reliance on
            costly, opaque education agencies.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            Having experienced student life overseas myself, I understood how
            information gaps and financial stress can shape a student's entire
            academic journey. At the same time, I saw a powerful opportunity:
            existing students already held the knowledge junior students needed.
          </p>
          <p style={{ color: textSecondary }}>
            UniLinks was created to bridge that gap — enabling students to guide
            students, transparently and sustainably.
          </p>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/unilinks/group-photo.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Section>

        <Section title="The Core Problem">
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            Students lack real, trustworthy admission insight.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            Most rely on marketing-heavy university pages, costly agents, or
            fragmented social content—making it hard to understand what studying
            a program is actually like.
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            International students face financial pressure.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            Many struggle with living costs, have limited work options, and want
            to help others—but lack a structured, ethical way to do so.
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            Admissions are still agency-driven and inefficient.
          </p>
          <p style={{ color: textSecondary }}>
            Traditional flows depend on third parties, lack transparency, and
            put business incentives above student experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/flow-chart-1.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/flow-chart-2.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Section>

        <Section title="Our Approach: A Student-First Admission Model">
          <p className="mb-6" style={{ color: textSecondary }}>
            That's why we built UniLinks — to redesign the admission journey
            from a student's perspective. Instead of relying on marketing
            content or third-party agencies, UniLinks connects prospective
            students directly with those already studying the same program and
            university, enabling honest, experience-based guidance.
          </p>
          <p className="mb-6" style={{ color: textSecondary }}>
            At the same time, the platform creates a structured and ethical way
            for existing students to contribute meaningfully and earn support
            for their living costs abroad. To ensure this model works at scale,
            UniLinks operates as a three-sided ecosystem where students discover
            and decide, mentors guide and support, and the admin team ensures
            quality, transparency, and process integrity throughout the journey.
          </p>
        </Section>

        <Section title="1. Student Portal — Discover & Decide with Confidence">
          <p className="mb-2" style={{ color: textSecondary }}>
            Students can:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Find programs based on interests, background, and goals</li>
            <li>Read full curriculum details with no hidden information</li>
            <li>Compare programs across universities</li>
            <li>
              Understand requirements, timelines, and expectations upfront
            </li>
          </ul>
          <p style={{ color: textSecondary }}>
            Instead of pushing universities, UniLinks helps students make
            informed decisions first.
          </p>
        </Section>

        <Section title="2. Mentor Portal — Students Helping Students">
          <p className="mb-2" style={{ color: textSecondary }}>
            Mentors are:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>
              Existing students studying the same program at the same university
            </li>
            <li>Sharing real, authentic experiences</li>
            <li>Guiding juniors through the admission journey</li>
          </ul>
          <p className="mb-2" style={{ color: textSecondary }}>
            Mentors help with:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Program expectations</li>
            <li>Application preparation</li>
            <li>Personal insights about student life</li>
          </ul>
          <p className="mb-4" style={{ color: textSecondary }}>
            In return, mentors receive a contribution bonus from UniLinks after
            successful admissions — helping them support their living costs
            abroad. This creates a sustainable, ethical incentive model.
          </p>
        </Section>

        <Section title="3. Admin Portal — Quality, Trust & Process Management">
          <p className="mb-2" style={{ color: textSecondary }}>
            The UniLinks admin team:
          </p>
          <ul
            className="list-disc pl-6 mb-4 space-y-1"
            style={{ color: textSecondary }}
          >
            <li>Monitors student–mentor interactions</li>
            <li>Reviews consultation processes</li>
            <li>Supports both sides when issues arise</li>
            <li>Ensures information accuracy and process integrity</li>
          </ul>
          <p style={{ color: textSecondary }}>
            The admin portal keeps the ecosystem transparent, fair, and
            scalable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/product-ui-1.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/product-ui-2.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Section>

        <Section title="End-to-End Flow (How It Works)">
          <ol
            className="list-decimal pl-6 mb-4 space-y-2"
            style={{ color: textSecondary }}
          >
            <li>Student discovers programs on UniLinks</li>
            <li>Student reviews full curriculum & compares options</li>
            <li>
              Student books consultation with a mentor from the same program
            </li>
            <li>Mentor guides the student through admission steps</li>
            <li>UniLinks admin supports and verifies the process</li>
            <li>Student successfully passes admission</li>
            <li>Mentor receives contribution bonus</li>
          </ol>
          <blockquote
            className="pl-4 border-l-4 border-[#1f2937] py-2 my-4 font-semibold italic text-lg"
            style={{ color: textPrimary }}
          >
            No education agency involved! No hidden fees! A true
            student-to-student journey.
          </blockquote>
        </Section>

        <Section title="My Role & Contribution">
          <p className="mb-4" style={{ color: textSecondary }}>
            As Co-Founder and Product Owner, I was responsible for shaping both
            the vision and execution of UniLinks. I led the product direction
            from early concept to system design, defining how students, mentors,
            and administrators interact within a single platform. My work
            covered end-to-end user journeys, including program discovery,
            comparison, consultation flows, mentoring interactions, and the
            incentive model that rewards mentors for their contributions.
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            I also established the design system and scalable UI structure to
            support future growth, ensuring consistency across the student,
            mentor, and admin portals. Throughout the process, I translated real
            student pain points into product decisions, balancing trust,
            transparency, and scalability while designing flows that worked not
            only for users, but also for operational and administrative needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/website-1.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="rounded-2xl overflow-hidden">
              <img
                src="/unilinks/website-2.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Section>

        <Section title="Impact & Value">
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            For students,
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            UniLinks provided clear and honest program information, reduced
            reliance on costly education agencies, and offered both emotional
            and practical support from peers who had already walked the same
            path. This helped students make better-informed decisions before
            committing financially to studying abroad.
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            For mentors,
          </p>
          <p className="mb-4" style={{ color: textSecondary }}>
            the platform created an opportunity to contribute meaningfully to
            the student community while receiving ethical financial support to
            help cover living costs abroad. Mentors were recognized for their
            real experience and able to support others in a structured and
            sustainable way.
          </p>
          <p className="font-semibold mb-2" style={{ color: textPrimary }}>
            For the education ecosystem,
          </p>
          <p className="mb-6" style={{ color: textSecondary }}>
            UniLinks reduced dependency on traditional intermediaries, increased
            transparency in the admission process, and introduced a scalable,
            community-driven model that places students at the center of
            academic decision-making.
          </p>
          <a
            href="https://unilinks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-[#1f2937] hover:underline"
          >
            Live project: Unilinks All-in-One University Application Platform
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
