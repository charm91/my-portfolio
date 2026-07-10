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
      <div className="fixed top-0 left-0 right-0 h-[30vh] z-0" aria-hidden="true">
        <div className="relative h-full w-full">
          <Image
            src="/u-cover.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Hero content and page content scroll over the fixed image */}
      <section className="relative flex flex-col z-10 mt-28 min-h-[50vh]">
        <motion.div
          {...scrollReveal}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-14 w-full bg-white rounded-t-2xl pt-10"
        >
          <h1
            className="text-4xl md:text-5xl px-4 font-medium text-center leading-tight mb-6 pt-5 tracking-tight"
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
              <Image
                src="/unilinks/thumbnail.png"
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
                <Image
                  src="/unilinks/group-photo.png"
                  alt="Final Presentation"
                  width={1344}
                  height={680}
                  className="w-full h-auto"
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
                  <Image
                    src="/unilinks/flow1.png"
                    alt="personas"
                    width={710}
                    height={474}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/unilinks/flow2.png"
                    alt="workflow"
                    width={710}
                    height={474}
                    className="w-full h-auto"
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
            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                <div className="hidden md:block overflow-hidden rounded-sm">
                  <Image
                    src="/unilinks/flow3.png"
                    alt="personas"
                    width={2076}
                    height={2240}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm">
                  <Image
                    src="/unilinks/flow4.png"
                    alt="workflow"
                    width={2028}
                    height={1312}
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                <Image
                  src="/unilinks/ui1.png"
                  alt="User Interface Design"
                  width={1440}
                  height={687}
                  className="w-full h-auto"
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
                <Image
                  src="/unilinks/ui2.png"
                  alt="User Interface Design"
                  width={1440}
                  height={687}
                  className="w-full h-auto"
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
                <Image
                  src="/unilinks/ui3.png"
                  alt="User Interface Design"
                  width={1440}
                  height={687}
                  className="w-full h-auto"
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
                  <Image
                    src="/unilinks/display-1.jpg"
                    alt="personas"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/unilinks/display-2.jpg"
                    alt="workflow"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/unilinks/display-3.jpg"
                    alt="workflow"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
                  />
                </div>

                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/unilinks/display-4.jpg"
                    alt="workflow"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
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

          <CaseStudyAuthor />
        </main>
      </section>

      <motion.div {...scrollReveal}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}
