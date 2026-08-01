import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/config/caseStudies";
import { SITE } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((caseSlug) => ({ case: caseSlug }));
}

export function generateMetadata({ params }) {
  const entry = CASE_STUDIES[params.case];
  if (!entry) return {};

  const title = `${entry.title} — ${SITE.displayName}`;
  const description = `${entry.description} — a product design case study by ${SITE.displayName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${params.case}`,
      images: [entry.thumbnail],
    },
  };
}

export default function Page({ params }) {
  const entry = CASE_STUDIES[params.case];
  if (!entry) notFound();

  const { Component } = entry;
  return <Component />;
}
