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
| `src/config/site.js` | Single source of truth for personal info (name, email, tagline, availability, roles, domains). Change here, not in components. |
| `src/config/caseStudy.js` | Shared design tokens and animation configs for all case study pages. |
| `app/page.jsx` | Homepage entry — composes all section components in order. Also handles `?scrollTo=` query param for cross-page anchor nav. |
| `src/components/` | Homepage section components (Hero, OverviewGrid, Services, Portfolio, Journey, Testimonials, FAQ, Footer). One file per section. |
| `src/views/` | Full case study page content (BetterHRPage, KBZBankPage, UniLinksPage, WctPage). Long JSX files with inline prose. |
| `app/[case]/page.jsx` | Thin route files — sets metadata/OG tags, renders the matching view from `src/views/`. |
| `app/contact-me/ContactPageClient.jsx` | Contact form with EmailJS integration, honeypot spam guard, and submission cooldown. |
| `public/` | Static images organised by project (betterhr/, kbz/, unilinks/, wct/). |

---

## 5. Behavior Rules

- Edit copy directly in component files or `src/config/site.js` — no CMS.
- Personal details (name, email, availability, social links, resume URL) must be updated in `src/config/site.js` only.
- Case study prose lives in `src/views/*.jsx` as inline JSX — no separate data files.
- EmailJS credentials are hardcoded in `ContactPageClient.jsx` (not env vars).
- Commit directly to `main`. No branches or PRs.

---

## 6. Hard Safety Rules

- Do not push to `main` without the owner's explicit instruction.
- Do not add new npm dependencies without confirming with the owner.
- Do not change EmailJS service/template/public key values without confirmation.

---

## 7. Known Traps

- `app/page.jsx` is a Client Component (`"use client"`) due to `useSearchParams`. Wrapping `ScrollToSection` in `<Suspense>` is required to avoid a Next.js build error.
- Dev port is `3002` (not the Next.js default 3000) — set in `package.json` `dev` script.
- Tailwind 4 is in use — config lives in `globals.css` via `@theme`, not `tailwind.config.js`.

---

## Rules

This project follows the rules shipped in claude-helm:
- ~/.claude/plugins/marketplaces/claude-helm/rules/git.md
- ~/.claude/plugins/marketplaces/claude-helm/rules/safety.md

At the start of every session, check whether the paths above exist on this machine.
If either is missing, inform the user: "helm rules are referenced in CLAUDE.md but the
plugin is not installed on this machine. Install it with: /plugin install claude-helm"

<!-- last-reviewed: ff983ea -->
