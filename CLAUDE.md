# CLAUDE.md — ngu-wah-portfolio

## 1. Project Identity

Personal portfolio site for Ngu Wah Aung (Charm), a Senior Product Designer.
Built with Next.js 15 / React 19. Deployed at https://www.nguwahaung.com/.

**Blast radius:** Public-facing, single-owner site. No backend, no database, no auth.
Changes to copy or layout are immediately visible after deploy.

---

## 2. Project Config

```
git-solo: true
git-auto-commit: true
```

---

## 3. Dev Commands

```bash
npm install           # install dependencies
npm run dev           # dev server on http://localhost:3002
npm run build         # production build
npm run lint          # ESLint
npm test              # run all tests (Vitest)
npm run test:watch    # run tests in watch mode
```

---

## 4. Architecture Pointers

| Path | Why it matters |
|---|---|
| `src/config/site.js` | Single source of truth for personal info (name, email, tagline, availability, roles, domains, SITE_URL). Change here, not in components. |
| `src/config/caseStudy.js` | Shared design tokens (textPrimary, bgPage) and animation configs (pageTransition, scrollReveal) for all case study pages. |
| `src/lib/utils.js` | `cn()` for Tailwind class merging; `scrollToSection(id)` used by Hero, Services, OverviewGrid, Header for smooth nav. |
| `app/page.jsx` | Homepage entry — Server Component. Composes all section components in order. Handles `?scrollTo=` query param via `<ScrollToSection>` in `<Suspense>`. |
| `app/ScrollToSection.jsx` | Client Component; reads `useSearchParams` and scrolls to target section. Must stay in `<Suspense>` to avoid Next.js build error. |
| `src/components/` | Homepage section components (Hero, OverviewGrid, Services, Portfolio, Journey, Testimonials, FAQ, Footer, Header). One file per section. |
| `src/views/` | Full case study page content (BetterHRPage, KBZBankPage, UniLinksPage, WctPage). Long JSX files with inline prose. |
| `app/[case]/page.jsx` | Thin route files — sets metadata/OG tags, renders the matching view from `src/views/`. |
| `app/contact-me/ContactPageClient.jsx` | Contact form with EmailJS integration, honeypot spam guard, and submission cooldown. |
| `app/globals.css` | Tailwind 4 config via `@theme` block. No `tailwind.config.js` exists. |
| `src/__tests__/` | 17 test files, 60 tests. Vitest + React Testing Library. Ledger at `.claude/test-log.json`. |

---

## 5. Behavior Rules

- Edit copy directly in component files or `src/config/site.js` — no CMS.
- Personal details (name, email, availability, social links, resume URL) must be updated in `src/config/site.js` only.
- Case study prose lives in `src/views/*.jsx` as inline JSX — no separate data files.
- EmailJS credentials are hardcoded in `ContactPageClient.jsx` (not env vars) — this is intentional.
- Commit directly to `main`. No branches or PRs.

---

## 6. Hard Safety Rules

- Do not push to `main` without the owner's explicit instruction.
- Do not add new npm dependencies without confirming with the owner.
- Do not change EmailJS service/template/public key values without confirmation.

---

## 7. Known Traps

- `ScrollToSection` uses `useSearchParams` — it must be wrapped in `<Suspense>` in `app/page.jsx` or Next.js build fails.
- Dev port is `3002` (not the Next.js default 3000) — set in `package.json` `dev` script.
- Tailwind 4 is in use — config lives in `globals.css` via `@theme`, not `tailwind.config.js`.
- Case study root `motion.div` must **not** have `overflow-auto` — it forces div-level scroll and kills compositor-thread scroll performance.
- `whileInView` observers fire on the main thread. Keep them sparse on long content pages; `CaseStudySection` is intentionally a plain `<section>` for this reason.
- `IntersectionObserver` mock in tests must use a class, not an arrow function — arrow functions cannot be used as constructors (`new` will throw).

---

## Rules

This project follows the rules shipped in claude-helm:
- ~/.claude/plugins/marketplaces/claude-helm/rules/git.md
- ~/.claude/plugins/marketplaces/claude-helm/rules/safety.md

At the start of every session, check whether the paths above exist on this machine.
If either is missing, inform the user: "helm rules are referenced in CLAUDE.md but the
plugin is not installed on this machine. Install it with: /plugin install claude-helm"

<!-- last-reviewed: 24615053d6f5ee8cb4825dfee4df31cbc9c066c6 -->
