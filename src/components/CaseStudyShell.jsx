"use client";

import Image from "next/image";
import { CirclePlay } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudyAuthor } from "@/components/CaseStudyAuthor";
import {
  textPrimary,
  textSecondary,
  bgPage,
  CASE_STUDY_HERO_IMAGE_SIZES,
} from "@/config/caseStudy";

export function CaseStudyShell({ coverImage, title, tags, liveUrl, thumbnail, children }) {
  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: bgPage }}
    >
      <Header />

      {/* Hero: fixed background image at top (does not scroll).
          will-change promotes this to its own compositor layer so the
          browser doesn't repaint it on every scroll frame. */}
      <div
        className="fixed top-0 left-0 right-0 h-[30vh] z-0"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div className="relative h-full w-full">
          <Image
            src={coverImage}
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
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-14 w-full bg-white rounded-t-2xl pt-10"
        >
          <h1
            className="text-4xl md:text-5xl px-4 font-medium text-center leading-tight mb-6 pt-5 tracking-tight entrance-rise"
            style={{ color: textPrimary }}
          >
            {title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 entrance-rise entrance-delay-1">
            {tags.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium"
                style={{ color: textPrimary }}
              >
                <Icon className="size-4" />
                {label}
              </span>
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-4 entrance-rise entrance-delay-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-3xl bg-[#1f2937] px-5 py-2.5 font-medium text-white transition-[transform,background-color] duration-(--motion-duration-feedback) motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 hover:bg-[#111827] focus-visible:bg-[#111827] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <CirclePlay className="size-5 transition-transform duration-(--motion-duration-feedback) motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110" />
              <span>
                Live Project
              </span>
            </a>
          </div>
          <div className="mt-10 entrance-rise entrance-delay-3">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={thumbnail.src}
                alt={`${title}, desktop and mobile interface preview`}
                width={thumbnail.width}
                height={thumbnail.height}
                sizes={CASE_STUDY_HERO_IMAGE_SIZES}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <main
          id="main-content"
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-12 tracking-tight rounded-b-2xl bg-white"
          style={{ color: textSecondary }}
        >
          {children}
          <CaseStudyAuthor />
        </main>
      </section>

      <Footer />
    </div>
  );
}
