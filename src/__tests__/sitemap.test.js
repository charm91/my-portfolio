import { describe, it, expect } from "vitest";
import sitemapFn from "../../app/sitemap.js";
import { SITE_URL } from "../config/site.js";

describe("sitemap", () => {
  const entries = sitemapFn();

  it("returns 7 entries", () => {
    expect(entries).toHaveLength(7);
  });

  it("first entry is the homepage with priority 1.0", () => {
    expect(entries[0].url).toBe(SITE_URL);
    expect(entries[0].priority).toBe(1.0);
  });

  it("includes all 4 case study slugs", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/betterhr`);
    expect(urls).toContain(`${SITE_URL}/kbz-bank`);
    expect(urls).toContain(`${SITE_URL}/unilinks`);
    expect(urls).toContain(`${SITE_URL}/wct`);
  });

  it("includes /contact-me", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/contact-me`);
  });

  it("every entry has a url string and numeric priority", () => {
    entries.forEach((e) => {
      expect(typeof e.url).toBe("string");
      expect(e.url.length).toBeGreaterThan(0);
      expect(typeof e.priority).toBe("number");
    });
  });
});
