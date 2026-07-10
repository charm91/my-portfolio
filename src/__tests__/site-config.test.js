import { describe, it, expect } from "vitest";
import { SITE } from "../config/site.js";

describe("SITE.careerStartYear", () => {
  it("matches the expected start year of 2013", () => {
    expect(SITE.careerStartYear).toBe(2013);
  });
});
