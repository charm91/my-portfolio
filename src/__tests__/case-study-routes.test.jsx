import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { notFound } from "next/navigation";
import CasePage, { dynamicParams, generateMetadata, generateStaticParams } from "../../app/[case]/page";
import sitemap from "../../app/sitemap";
import { Portfolio } from "../components/Portfolio";
import { SITE, SITE_URL } from "../config/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/portfolio",
  notFound: vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }),
}));
vi.mock("next/link", () => ({ default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a> }));
vi.mock("next/image", () => ({ default: ({ src, alt }) => <img src={src} alt={alt} /> }));
vi.mock("@/components/Header", () => ({ Header: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/CaseStudyAuthor", () => ({ CaseStudyAuthor: () => null }));

const cases = [
  { slug: "betterhr", title: "Better HR Case Study", heading: "Better HR Cloud-based HR Management Platform", image: "/betterhr/thumbnail.png" },
  { slug: "kbz-bank", title: "KBZ Bank Case Study", heading: "KBZ Bank Digital Banking Authentication System", image: "/kbz/thumbnail.png" },
  { slug: "unilinks", title: "UniLinks Case Study", heading: "UniLinks All-in-One Study Abroad Platform", image: "/unilinks/thumbnail.png" },
  { slug: "wct", title: "WCT Pay Case Study", heading: "WCT Pay Crypto–Fiat Payment Dashboard", image: "/wct/thumbnail.png" },
];

describe("Case-study route contracts", () => {
  beforeEach(() => vi.clearAllMocks());

  // Direct calls check route dispatch; the production build separately checks
  // Next 15's framework-provided params and static route generation.
  it.each(cases)("/$slug renders its matching case-study headline", async ({ slug, heading }) => {
    render(await CasePage({ params: Promise.resolve({ case: slug }) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(heading);
    expect(notFound).not.toHaveBeenCalled();
  });

  it.each(cases)("/$slug generates matching search and share metadata", async ({ slug, title, heading, image }) => {
    const metadata = await generateMetadata({ params: Promise.resolve({ case: slug }) });
    const expectedTitle = `${title} | ${SITE.name}`;
    const expectedDescription = `${heading}, a product design case study by ${SITE.name} (${SITE.displayName}).`;
    expect(metadata.title).toBe(expectedTitle);
    expect(metadata.description).toBe(expectedDescription);
    expect(metadata.openGraph).toMatchObject({ title: expectedTitle, description: expectedDescription, url: `/${slug}` });
    expect(metadata.alternates.canonical).toBe(`/${slug}`);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", title: expectedTitle, description: expectedDescription });
    expect(metadata.openGraph.images).toHaveLength(1);
    expect(metadata.openGraph.images[0]).toMatchObject({ url: image, alt: title });
  });

  it("uses Next's not-found boundary for an unsupported slug", async () => {
    await expect(CasePage({ params: Promise.resolve({ case: "missing-case-study" }) })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledTimes(1);
    expect(dynamicParams).toBe(false);
  });

  it("returns no case metadata for an unsupported slug", async () => {
    expect(await generateMetadata({ params: Promise.resolve({ case: "missing-case-study" }) })).toEqual({});
  });

  it("connects every visible case card to a generated route and sitemap entry", () => {
    render(<Portfolio />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(cases.length);
    const cardPaths = articles.map((article) => within(article).getByRole("link").getAttribute("href"));
    const generatedPaths = generateStaticParams().map(({ case: slug }) => `/${slug}`);
    expect(new Set(cardPaths)).toEqual(new Set(generatedPaths));
    const sitemapUrls = sitemap().map(({ url }) => url);
    for (const path of cardPaths) expect(sitemapUrls).toContain(`${SITE_URL}${path}`);
  });
});
