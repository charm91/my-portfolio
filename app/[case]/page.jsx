import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/config/caseStudies";
import { SITE } from "@/config/site";
import { getPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((caseSlug) => ({ case: caseSlug }));
}

export async function generateMetadata({ params }) {
  const { case: slug } = await params;
  const entry = CASE_STUDIES[slug];
  if (!entry) return {};

  return getPageMetadata({
    title: `${entry.title} | ${SITE.name}`,
    description: `${entry.description}, a product design case study by ${SITE.name} (${SITE.displayName}).`,
    path: `/${slug}`,
    image: entry.thumbnail,
  });
}

export default async function Page({ params }) {
  const { case: slug } = await params;
  const entry = CASE_STUDIES[slug];
  if (!entry) notFound();

  const { Component } = entry;
  return <Component />;
}
