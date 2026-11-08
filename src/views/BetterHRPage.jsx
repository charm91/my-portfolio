"use client";

import Image from "next/image";
import bCoverAsset from "../../public/b-cover.png";
import betterhrThumbnailAsset from "../../public/betterhr/thumbnail.png";
import betterhrProblemAsset from "../../public/betterhr/problem.png";
import betterhrGroup1Asset from "../../public/betterhr/group1.png";
import betterhrGroup2Asset from "../../public/betterhr/group2.png";
import betterhrUx1Asset from "../../public/betterhr/ux1.png";
import betterhrUx2Asset from "../../public/betterhr/ux2.png";
import betterhrUi1Asset from "../../public/betterhr/ui1.png";
import betterhrUi2Asset from "../../public/betterhr/ui2.png";
import betterhrUi3Asset from "../../public/betterhr/ui3.png";
import betterhrUi4Asset from "../../public/betterhr/ui4.png";
import { CASE_STUDY_IMAGE_SIZES, CASE_STUDY_GRID_IMAGE_SIZES } from "@/config/caseStudy";
import { Clock, Globe, TabletSmartphone } from "lucide-react";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import { CaseStudySection as Section } from "@/components/CaseStudySection";

export function BetterHRPage() {
  return (
    <CaseStudyShell
      coverImage={bCoverAsset.src}
      title="Better HR Cloud-based HR Management Platform"
      tags={[
        { icon: TabletSmartphone, label: "WebApp + Mobile App" },
        { icon: Globe, label: "HRTech / Payroll Management" },
        { icon: Clock, label: "Founding phase" },
      ]}
      liveUrl="https://betterhr.com/"
      thumbnail={{ src: betterhrThumbnailAsset.src, width: 1488, height: 1050 }}
    >
      <Section title="Project Overview">
        <p className="mb-4">
          Better HR is a cloud-based HR management platform designed for
          small and medium-sized businesses across Southeast Asia. The
          platform helps companies manage attendance, leave, payroll, and
          employee data through a single, centralized system.
        </p>
        <p className="mb-4">
          I joined Better HR as a founding member of the product team,
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
          <Image
            src={betterhrProblemAsset.src}
            alt="problem-statement"
            width={1080}
            height={594}
            sizes={CASE_STUDY_IMAGE_SIZES}
            className="w-full h-auto"
          />
        </div>
      </Section>
      <Section title="The Context">
        <p className="mb-4">
          Before Better HR, many SMEs relied on spreadsheets, paper forms,
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
          These insights ensured the product reflected real-world workflows,
          not assumptions.
        </p>
        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-xs my-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="hidden md:block overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrGroup1Asset.src}
                alt="Meeting room discussion"
                width={678}
                height={542}
                sizes={CASE_STUDY_GRID_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>

            <div className="overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrGroup2Asset.src}
                alt="Presentation session"
                width={678}
                height={542}
                sizes={CASE_STUDY_GRID_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Design Strategy & Solution">
        <p>
          Based on discovery insights, I focused on designing a system that
          emphasized clarity, consistency, and error prevention.
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
          <Image
            src={betterhrUx1Asset.src}
            alt="Presentation session"
            width={479}
            height={335}
            sizes={CASE_STUDY_IMAGE_SIZES}
            className="w-full h-auto max-h-80 object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <Image
            src={betterhrUx2Asset.src}
            alt="Presentation session"
            width={778}
            height={444}
            sizes={CASE_STUDY_IMAGE_SIZES}
            className="w-full h-auto bg-gray-100"
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
          Each flow was designed to handle edge cases, such as corrections,
          approvals, and policy variations.
        </p>
        <div className="rounded-lg bg-gray-100 p-2 my-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrUi1Asset.src}
                alt="betterhrUI"
                width={504}
                height={512}
                sizes={CASE_STUDY_GRID_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>

            <div className="overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrUi2Asset.src}
                alt="betterhrUI"
                width={504}
                height={516}
                sizes={CASE_STUDY_GRID_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Design & Development Collaboration">
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
        <div className="rounded-lg bg-gray-100 p-2 my-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
            <div className="overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrUi3Asset.src}
                alt="betterhrUI"
                width={1440}
                height={878}
                sizes={CASE_STUDY_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Outcome">
        <p>
          Better HR evolved into a stable HR platform used by companies
          across multiple countries in Southeast Asia. The system helped HR
          teams move away from manual processes and manage core operations
          digitally in one place.
        </p>
        <p>
          The modular design also allowed the product to scale by adding new
          features without redesigning the core experience.
        </p>
        <div className="rounded-lg bg-gray-100 p-2 my-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
            <div className="overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={betterhrUi4Asset.src}
                alt="betterhrUI"
                width={720}
                height={520}
                sizes={CASE_STUDY_IMAGE_SIZES}
                className="w-full h-auto"
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
            Being part of Better HR from an early stage taught me the
            importance of deep user understanding, early validation, and
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
            This experience reinforced my interest in product ownership and
            building systems that solve real operational problems, not just
            surface-level usability issues.
          </p>
        </div>
      </Section>
    </CaseStudyShell>
  );
}
