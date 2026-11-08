# AGENTS.md: ngu-wah-portfolio

## Project Identity

Personal portfolio for Ngu Wah Aung (Charm), a Senior Product Designer, at https://www.nguwahaung.com/.
Next.js 15 App Router, React 19, Tailwind CSS 4 and Framer Motion. One application, with no application backend, database or authentication.
Public-facing, single-owner site. Deployed copy and layout changes affect visitors; contact submissions go directly from the browser to EmailJS.

## Project Config

- ship-method: direct
- git-auto-commit: true
- git-merge-strategy: squash
- readme-style: custom

## Dev Commands

Use Node.js 22.13+ on the 22.x line, or Node.js 24+, for the locked development tooling; Node.js 18 is insufficient for the current test toolchain.
The project `.npmrc` enables `legacy-peer-deps`.

```bash
npm install
npm run dev             # starts at PORT or 3002; probes upward for a free port
npm run build           # production build
npm start               # serves the production build
npm run lint            # ESLint, including JSX; configured in eslint.config.js
npm test                # Vitest run
npm run test:watch
npm run test:coverage   # V8 text and HTML coverage
npx vitest run src/__tests__/contact-form-validation.test.jsx
```

## Architecture Pointers

| Path | Purpose |
|---|---|
| `src/config/site.js` | Personal information, social links, resume URL and `SITE_URL`; update personal details here. |
| `app/resume.pdf/route.js` | Redirects `/resume.pdf` to `RESUME_URL` with a 308. |
| `src/lib/seo.js` / `src/components/JsonLd.jsx` | `getPageMetadata()` builds title, canonical, Open Graph and Twitter metadata for every page; `getProfileStructuredData()` feeds the homepage JSON-LD. |
| `src/config/caseStudies.js` | Registry mapping case slugs to view components and route metadata. |
| `app/[case]/page.jsx` | Generates static case routes from the registry; `dynamicParams = false`, unknown cases call `notFound()`. |
| `app/page.jsx` / `app/portfolio/page.jsx` | Server pages composing homepage sections and the separate portfolio listing. |
| `src/components/HomeShell.jsx` | Shared header, fixed background layer and main-content landmark for home and portfolio pages. |
| `src/components/CaseStudyShell.jsx` | Shared case-study hero, fixed cover image, content container, author and footer. |
| `src/components/CaseStudySection.jsx` / `src/views/*.jsx` | Plain content sections and inline case-study prose for Better HR, KBZ Bank, UniLinks and WCT Pay. |
| `src/config/theme.js` / `src/config/caseStudy.js` | Shared color tokens; case-study token exports and transition/reveal configurations. |
| `app/globals.css` | Tailwind 4 theme, shared section styles and fixed homepage background; no `tailwind.config.js`. |
| `src/lib/utils.js` | `cn()` merges Tailwind classes; `getScrollBehavior()` respects reduced motion for query-driven section navigation. Section CTAs use native fragment links. |
| `app/contact-me/ContactPageClient.jsx` | Client-side form validation, invisible reCAPTCHA v2, honeypot, cooldown and EmailJS delivery. |
| `app/sitemap.js` / `app/robots.js` | Hand-maintained sitemap and crawler configuration, both using `SITE_URL`. |
| `src/__tests__/` / `vitest.setup.js` | Vitest, jsdom and React Testing Library; shared motion mock in `src/__tests__/test-utils/mockMotion.js`. |
| `public/` | Local branding, portraits, cover images and case-study screenshots, imported as modules so Next emits content-hashed URLs. |

## Domain Rules

- Adding a case study requires its view, a registry entry in `src/config/caseStudies.js`, a card in `src/components/Portfolio.jsx`, a manual entry in `app/sitemap.js` and an updated entry count in `src/__tests__/sitemap.test.js`.
- `SITE_URL` uses `NEXT_PUBLIC_SITE_URL` or defaults to `https://www.nguwahaung.com`; unset development environments therefore use production metadata URLs.
- Contact validation trims fields and requires a name of at least 2 characters, a valid email shape and a message of at least 10 characters.
- Contact anti-spam uses EmailJS-verified invisible reCAPTCHA v2, a hidden honeypot and a 30-second cooldown started when a send is attempted, including failed sends.
- EmailJS service/template/public-key values are intentionally hardcoded in the client component, not environment variables.

## Behavior Rules

- Edit homepage copy in its section component and case-study prose directly in `src/views/*.jsx`; there is no CMS.
- Update personal details, availability, social links and the resume URL in `src/config/site.js` only.
- Commit directly to `main`. No branches or PRs.
- Preserve intentional section-specific color differences documented in `src/config/theme.js`.
- Import images from `public/` as modules and use `.src`; do not hard-code root-relative paths, which would lose the content-hashed immutable URLs.
- External links open in the same tab. Only LinkedIn, Resume and each case study's Live Project open a new tab, with a `title` and an `aria-label` ending in `(opens in a new tab)`; the tests assert those names.

## Hard Safety Rules

- Do not push to `main` without the owner's explicit instruction.
- Do not add new npm dependencies without confirming with the owner.
- Do not change EmailJS service/template/public-key values without confirmation.
- Do not remove or weaken any contact-form anti-spam layer without discussing it with the owner.

## Known Traps

- `app/ScrollToSection.jsx` reads `useSearchParams`; retain its `<Suspense>` wrapper in `app/page.jsx` to avoid a build failure.
- Case-study root scrolling belongs to the document. Do not add `overflow-auto` to `CaseStudyShell`'s root motion element; div-level scrolling caused compositor performance problems.
- Keep `whileInView` observers sparse on long case studies. `CaseStudySection` intentionally stays a plain `<section>`.
- Motion mocks cache component identity per tag; uncached proxies remount form subtrees and lose focus/value during `userEvent.type()`.
- jsdom observer stubs must be constructible classes; arrow-function `IntersectionObserver` mocks fail with `new`. Testimonials also need `ResizeObserver` and motion scroll-hook mocks.
- Header section navigation uses `/?scrollTo=<id>` when leaving another route; keep target section IDs aligned with its navigation items.
- Legal sources are `app/legal/terms/page.mdx` and `legal/privacy-policy.md`, but package/Next configuration has no MDX integration and neither has a route. Verify routing before treating them as published pages.
- Vitest resolves `public/` image imports through the plugin in `vitest.config.js`, which returns only `{ src }`; width and height are not available in tests.

## Rules

This project follows the rules shipped in agent-helm:
- .claude/rules/git.md
- .claude/rules/safety.md
- .claude/rules/writing.md
- .claude/rules/design.md

At the start of every session, read the rule files at the paths above and follow them.

At the start of every session, check whether the paths above exist on this machine.
If either is missing, inform the user: "helm rules are referenced in CLAUDE.md but the
plugin is not installed on this machine. Install it with: /plugin install agent-helm"

<!-- last-reviewed: 1dc301e75bb253150d71f3a02266152d4a7deef6 -->
