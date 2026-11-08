import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "../components/JsonLd";
import { getProfileStructuredData } from "../lib/seo";
import { SITE, SITE_URL, SOCIAL_LINKS, RESUME_URL } from "../config/site";
import { GET } from "../../app/resume.pdf/route";

vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "test-inter" }) }));

describe("SEO", () => {
  it("gives each main page its own canonical URL and consistent search and social identity", async () => {
    const pages = await Promise.all([
      import("../../app/layout"),
      import("../../app/portfolio/page"),
      import("../../app/contact-me/page"),
    ]);
    pages.forEach(({ metadata }, index) => {
      expect(metadata.title).toContain(SITE.name);
      expect(metadata.description).toContain(SITE.name);
      expect(metadata.alternates.canonical).toBe(["/", "/portfolio", "/contact-me"][index]);
      expect(metadata.openGraph.title).toBe(metadata.title);
      expect(metadata.twitter.title).toBe(metadata.title);
      expect(metadata.twitter.card).toBe("summary_large_image");
    });
  });

  it("connects the public profile, person, and website using configured identity and absolute URLs", () => {
    const data = getProfileStructuredData();
    const graph = data["@graph"];
    const person = graph.find((entity) => entity["@type"] === "Person");
    const profile = graph.find((entity) => entity["@type"] === "ProfilePage");
    const website = graph.find((entity) => entity["@type"] === "WebSite");
    expect(person).toMatchObject({ name: SITE.name, alternateName: SITE.displayName, jobTitle: SITE.jobTitle });
    expect(person.sameAs).toEqual(Object.values(SOCIAL_LINKS));
    expect(new URL(person.image).origin).toBe(new URL(SITE_URL).origin);
    expect(profile.mainEntity["@id"]).toBe(person["@id"]);
    expect(profile.isPartOf["@id"]).toBe(website["@id"]);
    for (const entity of graph) expect(new URL(entity.url).origin).toBe(new URL(SITE_URL).origin);
  });

  it("serializes structured data without allowing text to close the script tag", () => {
    const data = { name: '</script><script>alert("test")</script>' };
    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0].type).toBe("application/ld+json");
    expect(scripts[0].textContent).not.toContain("<");
    expect(JSON.parse(scripts[0].textContent)).toEqual(data);
  });

  it("permanently redirects the legacy resume path to the configured resume", () => {
    const response = GET();
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(RESUME_URL);
  });
});
