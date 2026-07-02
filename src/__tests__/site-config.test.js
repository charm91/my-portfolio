import { describe, it, expect } from "vitest";
import { SITE } from "../config/site.js";

describe("SITE.careerStartYear", () => {
  it("yields more than 10 years of experience", () => {
    const years = new Date().getFullYear() - SITE.careerStartYear;
    expect(years).toBeGreaterThan(10);
  });

  it("matches the expected start year of 2013", () => {
    expect(SITE.careerStartYear).toBe(2013);
  });
});
