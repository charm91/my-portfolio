"use client";

import Image from "next/image";
import kCoverAsset from "../../public/k-cover.png";
import kbzThumbnailAsset from "../../public/kbz/thumbnail.png";
import kbzDiagramAsset from "../../public/kbz/diagram.png";
import kbzFlowchartAsset from "../../public/kbz/flowchart.png";
import kbzUi1Asset from "../../public/kbz/ui1.png";
import kbzUi2Asset from "../../public/kbz/ui2.png";
import kbzUi3Asset from "../../public/kbz/ui3.png";
import kbzUi4Asset from "../../public/kbz/ui4.png";
import kbzUi5Asset from "../../public/kbz/ui5.png";
import { CASE_STUDY_IMAGE_SIZES } from "@/config/caseStudy";
import { Clock, Globe, TabletSmartphone } from "lucide-react";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import { CaseStudySection as Section } from "@/components/CaseStudySection";

export function KBZBankPage() {
  return (
    <CaseStudyShell
      coverImage={kCoverAsset.src}
      title="KBZ Bank Digital Banking Authentication System"
      tags={[
        { icon: TabletSmartphone, label: "WebApp (Responsive)" },
        { icon: Globe, label: "Fintech / Digital Banking" },
        { icon: Clock, label: "Scale phase" },
      ]}
      liveUrl="https://selfservice.kbzbank.com/"
      thumbnail={{ src: kbzThumbnailAsset.src, width: 1492, height: 1028 }}
    >
      <Section title="Project Overview">
        <p className="mb-4">
          KBZ Bank set out to enable customers to open bank accounts
          digitally, reducing dependency on physical branches. However,
          onboarding in banking is inherently complex: requiring identity
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
          The onboarding flow was not a simple sign-up; it was a multi-step
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
              src={kbzDiagramAsset.src}
              alt="KBZ account-opening workflow across customer access, verification, and registration systems"
              width={1440}
              height={835}
              sizes={CASE_STUDY_IMAGE_SIZES}
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="mb-4">
          The biggest issue was not just the number of steps, but the lack of
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
          onboarding logic, making the system behavior clearer and reducing
          unnecessary effort.
        </p>
      </Section>
      <Section title="Designing a Structured Journey">
        <p className="mb-4">
          The onboarding process included multiple dependent steps, from
          identity capture to account activation. I redesigned the flow into
          a guided, progressive journey, where each step builds on the
          previous one and reduces user effort whenever possible.
        </p>
        <div className="bg-white my-8">
          <div className="overflow-hidden">
            <Image
              src={kbzFlowchartAsset.src}
              alt="Detailed KBZ onboarding flowchart with decisions, validation steps, and system outcomes"
              width={1440}
              height={1637}
              sizes={CASE_STUDY_IMAGE_SIZES}
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
              src={kbzUi1Asset.src}
              alt="KBZ onboarding screens for personal details, identity capture, and identity verification"
              width={1440}
              height={1180}
              sizes={CASE_STUDY_IMAGE_SIZES}
              className="w-full h-auto"
            />
          </div>
        </div>
      </Section>

      <Section title="Creating a Multi-System Validation Flow">
        <p className="mb-4">
          Authentication doesn't happen in a single step; it spans across
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
              src={kbzUi2Asset.src}
              alt="KBZ sign-in, password, OTP verification, and account-opening confirmation screens"
              width={1440}
              height={487}
              sizes={CASE_STUDY_IMAGE_SIZES}
              className="w-full h-auto"
            />
          </div>
        </div>
      </Section>

      <Section title="Designing for Real System States, Not Just Errors">
        <p className="mb-4">
          The onboarding journey doesn't end at submission; it continues
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
              src={kbzUi3Asset.src}
              alt="KBZ verification outcomes including successful, failed, expired, and incomplete states"
              width={1440}
              height={1357}
              sizes={CASE_STUDY_IMAGE_SIZES}
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
              src={kbzUi4Asset.src}
              alt="KBZ branch selection, additional services, account review, and terms screens"
              width={1440}
              height={741}
              sizes={CASE_STUDY_IMAGE_SIZES}
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
              src={kbzUi5Asset.src}
              alt="KBZ account dashboard, account details, and account-activation confirmation screens"
              width={1440}
              height={487}
              sizes={CASE_STUDY_IMAGE_SIZES}
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
            complexity cannot be removed, but it can be structured in a way
            users can navigate with confidence.
          </p>
          <p className="mb-4">
            It also reinforced the importance of understanding how multiple
            systems interact, which is critical when designing real-world
            banking products.
          </p>
        </div>
      </Section>
    </CaseStudyShell>
  );
}
