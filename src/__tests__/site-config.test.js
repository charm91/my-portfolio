import { afterEach, describe, it, expect, vi } from "vitest";
import { SITE } from "../config/site.js";

vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "test-inter" }) }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("SITE.careerStartYear", () => {
  it("matches the expected start year of 2013", () => {
    expect(SITE.careerStartYear).toBe(2013);
  });
});

describe("SITE_URL and SEO consumers", () => {
  it.each([
    ["unset", undefined, "https://nguwahaung.com"],
    ["configured", "https://portfolio.example", "https://portfolio.example"],
  ])("uses the %s site origin consistently", async (_, value, expectedOrigin) => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", value);
    vi.resetModules();
    const [site, { default: sitemap }, { default: robots }, { metadata }] = await Promise.all([
      import("../config/site.js"),
      import("../../app/sitemap.js"),
      import("../../app/robots.js"),
      import("../../app/layout.jsx"),
    ]);
    expect(site.SITE_URL).toBe(expectedOrigin);
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain(expectedOrigin);
    expect(urls).toContain(`${expectedOrigin}/contact-me`);
    for (const url of urls) expect(new URL(url).origin).toBe(expectedOrigin);
    expect(robots().sitemap).toBe(`${expectedOrigin}/sitemap.xml`);
    expect(metadata.metadataBase.href).toBe(`${expectedOrigin}/`);
  });
});

describe("Next.js build isolation", () => {
  it("keeps development assets separate while build and start share production output", async () => {
    const { default: nextConfig } = await import("../../next.config.js");
    const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } = await import("next/constants.js");
    const configFor = (phase) => typeof nextConfig === "function" ? nextConfig(phase) : nextConfig;
    const development = configFor(PHASE_DEVELOPMENT_SERVER).distDir ?? ".next";
    const build = configFor(PHASE_PRODUCTION_BUILD).distDir ?? ".next";
    const production = configFor(PHASE_PRODUCTION_SERVER).distDir ?? ".next";

    expect(development).not.toBe(build);
    expect(production).toBe(build);
  });
});
