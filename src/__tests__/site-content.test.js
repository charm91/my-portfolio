import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createSite, SITE } from "../config/site.js";
import {
  generate, getTemplateValues, renderArtifacts, renderTemplate,
} from "../../scripts/generate-site-content.js";

describe("shared site details and static documents", () => {
  it("propagates changed identity and contact settings to every document", () => {
    const site = createSite({
      name: "Alex River", nickname: "Lex", jobTitle: "Product Designer",
      email: "alex_river@example.com",
    });
    const outputs = Object.fromEntries(renderArtifacts(getTemplateValues(
      site, "https://example.com", "https://github.com/alex/portfolio",
    )).map(({ file, content }) => [file, content]));

    expect(outputs["README.md"]).toContain("Alex River (Lex), Product Designer");
    expect(outputs["README.md"]).toContain("https://github.com/alex/portfolio/issues/new/choose");
    expect(outputs[".github/ISSUE_TEMPLATE/01-bug.yml"]).toContain("https://example.com, Better HR");
    for (const file of ["legal/privacy-policy.md", "app/legal/terms/page.mdx"]) {
      expect(outputs[file]).toContain('Alex River ("Lex")');
      expect(outputs[file]).toContain("https://example.com/contact-me");
      expect(outputs[file]).not.toContain(SITE.name);
    }
    expect(outputs["legal/privacy-policy.md"]).toContain("mailto:alex_river@example.com");
    expect(outputs["legal/privacy-policy.md"]).not.toContain(SITE.email);
    // Personal settings must never alter legal dates or jurisdiction.
    expect(outputs["legal/privacy-policy.md"]).toContain("2026-11-13");
    expect(outputs["app/legal/terms/page.mdx"]).toContain("laws of Thailand");
    expect(outputs["app/legal/terms/page.mdx"]).toContain("2026-08-01");
  });

  it("derives visible names, metadata names, tagline and experience from the profile", () => {
    const site = createSite({ nickname: "Lex", jobTitle: "Design Lead", careerStartYear: 2020 }, 2030);
    expect(site.displayName).toBe("Lex");
    expect(site.seoName).toBe(`${SITE.name} (Lex)`);
    expect(site.tagline).toBe("Design Lead • Fintech & SaaS");
    expect(site.experienceYears).toBe(10);
  });

  it("escapes Markdown names without corrupting email or URL destinations", () => {
    const values = getTemplateValues(createSite({ name: "Alex *River*", email: "alex_river@example.com" }));
    expect(renderTemplate("{{name}} [{{email}}]({{emailURL}})", values, "markdown"))
      .toBe("Alex \\*River\\* [alex\\_river@example.com](mailto:alex_river@example.com)");
  });

  it("rejects unknown placeholders instead of publishing unresolved values", () => {
    expect(() => renderTemplate("{{missing}}", getTemplateValues(), "markdown"))
      .toThrow("Unknown or non-text template value");
  });

  it("keeps generated outputs in sync and supports checking without writing", () => {
    for (const { file, content } of renderArtifacts()) {
      expect(readFileSync(resolve(file), "utf8"), file).toBe(content);
    }
    expect(() => generate({ check: true })).not.toThrow();
  });
});
