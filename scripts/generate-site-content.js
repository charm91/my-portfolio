import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SITE_URL, REPOSITORY_URL, SITE } from "../src/config/site.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifacts = [
  ["README.md", "markdown"],
  ["legal/privacy-policy.md", "markdown"],
  ["app/legal/terms/page.mdx", "markdown"],
  [".github/ISSUE_TEMPLATE/01-bug.yml", "text"],
];
const urlKeys = new Set(["siteURL", "repositoryURL", "emailURL"]);

export function getTemplateValues(site = SITE, siteURL = DEFAULT_SITE_URL, repositoryURL = REPOSITORY_URL) {
  return {
    name: site.name,
    nickname: site.nickname,
    seoName: site.seoName,
    jobTitle: site.jobTitle,
    email: site.email,
    emailURL: `mailto:${site.email}`,
    siteURL,
    siteDomain: new URL(siteURL).host,
    repositoryURL,
  };
}

export function renderTemplate(template, values, format) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(values, key) || typeof values[key] !== "string") {
      throw new Error(`Unknown or non-text template value: ${key}`);
    }
    if (format === "markdown") {
      if (urlKeys.has(key)) return values[key].replace(/[()]/g, character => character === "(" ? "%28" : "%29");
      return values[key].replace(/[\\`*_{}\[\]<>|]/g, "\\$&");
    }
    return values[key];
  });
}

export function renderArtifacts(values = getTemplateValues()) {
  return artifacts.map(([file, format]) => ({
    file,
    content: renderTemplate(
      readFileSync(resolve(root, "src/content/templates", file), "utf8"),
      values,
      format,
    ),
  }));
}

export function generate({ check = false } = {}) {
  // Render all templates before writing to avoid partial updates from bad tokens.
  const outputs = renderArtifacts();
  const stale = outputs.filter(({ file, content }) => (
    !existsSync(resolve(root, file)) || readFileSync(resolve(root, file), "utf8") !== content
  ));
  if (check) {
    if (stale.length) throw new Error(`Stale generated content: ${stale.map(({ file }) => file).join(", ")}. Run npm run generate:content.`);
    return;
  }
  for (const { file, content } of stale) {
    writeFileSync(resolve(root, file), content);
    process.stdout.write(`Generated ${file}\n`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    generate({ check: process.argv.includes("--check") });
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
