# Ngu Wah Aung — Portfolio

Personal product design portfolio. Built with Next.js 15, deployed to Vercel.

Live: [nguwahaung.com](https://www.nguwahaung.com)

---

## Project Overview

A portfolio site for Ngu Wah Aung, a Product Owner and Product Designer. It presents case studies, a professional journey timeline, testimonials, and a contact form. The target audience is hiring managers, collaborators, and recruiters in the product and design space.

---

## Tech Stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript / JSX (no TypeScript) |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui (radix-nova style, button + accordion) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Images | Next.js `<Image>` |
| Contact form | EmailJS (client-side, no backend) |
| Deployment | Vercel |

---

## Rendering Model

All case study pages and the portfolio page are **fully static** (SSG — prerendered at build time with no server runtime). The homepage is a client component (`"use client"`) because it uses `useSearchParams` for scroll-to-section navigation from other pages.

```
○ /               client component (Suspense + useSearchParams)
○ /portfolio      static
○ /betterhr       static
○ /kbz-bank       static
○ /unilinks       static
○ /wct            static
○ /contact-me     client component (EmailJS form)
○ /robots.txt     generated
○ /sitemap.xml    generated
```

---

## Project Structure

```
portfolio/
├── app/                        # Next.js App Router
│   ├── layout.jsx              # Root layout: fonts, metadata, skip-to-content
│   ├── page.jsx                # Homepage ("use client")
│   ├── globals.css
│   ├── robots.js               # Auto-generated robots.txt
│   ├── sitemap.js              # Auto-generated sitemap.xml
│   ├── betterhr/page.jsx
│   ├── kbz-bank/page.jsx
│   ├── unilinks/page.jsx
│   ├── wct/page.jsx
│   ├── portfolio/page.jsx
│   └── contact-me/
│       ├── page.jsx            # Metadata-only server wrapper
│       └── ContactPageClient.jsx  # "use client" form
│
├── src/                        # All source modules (@/* resolves here)
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # shadcn/ui primitives (button, accordion)
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── OverviewGrid.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Journey.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   └── CaseStudyAuthor.jsx
│   ├── views/                  # Full-page case study layouts
│   │   ├── BetterHRPage.jsx
│   │   ├── KBZBankPage.jsx
│   │   ├── UniLinksPage.jsx
│   │   └── WctPage.jsx
│   ├── config/
│   │   ├── site.js             # Identity, URLs, social links, resume URL
│   │   └── caseStudy.js        # Shared animation constants for case study views
│   ├── lib/
│   │   └── utils.js            # cn() Tailwind class merge helper
│   └── assets/
│
└── public/                     # Static assets served at /
    ├── profile-photo.png
    ├── logo.svg
    ├── favicon.png
    ├── betterhr/               # BetterHR case study images
    ├── kbz/                    # KBZ Bank case study images
    ├── unilinks/               # UniLinks case study images
    └── wct/                    # WCT Pay case study images
```

**Important:** The `@/*` path alias resolves to `./src/*`, not the project root. `app/` is outside `src/` and is not reachable via `@/`.

---

## Features

**Homepage** — Hero, overview grid, services, portfolio cards, journey timeline, testimonials, FAQ, footer. Sections are anchor-navigable via `#id`. Cross-page navigation uses `/?scrollTo=sectionId`.

**Case studies** — Four full-length case study pages (BetterHR, KBZ Bank, UniLinks, WCT Pay). Each shares a consistent layout: page transition, scroll-reveal sections, and a `<CaseStudyAuthor />` footer block.

**Contact form** — EmailJS-powered, client-side only. Includes honeypot spam protection, a minimum fill-time check (3 seconds), and a 30-second resubmit cooldown. Validates name, email format, and message length before sending.

**SEO** — Per-page `export const metadata` with title, description, and OpenGraph data. `metadataBase` set in root layout. Auto-generated `robots.txt` and `sitemap.xml`. All identity strings sourced from `src/config/site.js`.

**Accessibility** — Skip-to-content link in root layout. All pages expose `id="main-content"`. Interactive elements use semantic HTML and ARIA labels.

**Animations** — Framer Motion scroll-reveal on all content sections (`whileInView`, fires once). Shared animation config in `src/config/caseStudy.js`. Page-entry transitions on all views.

---

## Local Development

**Prerequisites:** Node.js 18+, npm

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Serve production build locally
npm run start

# Lint
npm run lint
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials.

```bash
cp .env.example .env.local
```

| Variable | Purpose | Where to find |
|---|---|---|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | dashboard.emailjs.com → Account |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | dashboard.emailjs.com → Email Services |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | dashboard.emailjs.com → Email Templates |

**Optional:**

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap and robots | `https://www.nguwahaung.com/` |

If `NEXT_PUBLIC_EMAILJS_*` variables are missing at runtime, the contact form shows a configuration error message instead of attempting to send. No silent failures.

---

## Deployment

The site deploys automatically via Vercel on every push to `main`.

```
git push origin main
  → Vercel detects push
  → runs: npm run build
  → deploys static output
```

`vercel.json` contains only `{"framework": "nextjs"}`. No custom build commands, rewrites, or headers are configured.

Environment variables must be set in the Vercel project dashboard (Settings → Environment Variables). They are not committed to the repository.

---

## Maintenance Notes

**Identity and URLs** — All person identity values (`name`, `displayName`, `tagline`, `email`, `profileImage`) live in `src/config/site.js`. All page metadata references these via `SITE.name`, `SITE.displayName`, etc. Do not hardcode identity strings in page files.

**Metadata** — Each `app/*/page.jsx` exports its own `metadata` object. Titles follow the pattern `` `Page — ${SITE.displayName}` ``. The root layout (`app/layout.jsx`) sets `metadataBase` — do not remove it or OG image URLs will break.

**Case study animations** — `src/config/caseStudy.js` holds the shared animation constants (`scrollReveal`, `scrollRevealTransition`, `pageTransition`, color tokens) used by all four view files. Changing values there affects all case studies simultaneously.

**Cross-page scroll navigation** — When the Header is on a non-home page and a user clicks a nav item, it navigates to `/?scrollTo=sectionId`. The homepage reads this query param via `useSearchParams` inside a `Suspense` boundary and scrolls after a 100ms delay. This pattern is required because Next.js `useSearchParams` needs `Suspense`.

**Images** — Case study images live in `public/<case-study>/` and are referenced with absolute paths like `/betterhr/thumbnail.png`. Thumbnails used in OG images are 1488×1050 (case studies) or 1152×832 (profile-based pages). The profile photo is `/profile-photo.png`.

**Path alias** — `@/*` maps to `src/*`. Anything in `app/` must use relative imports if importing from outside `src/`.

**shadcn/ui** — Only `button` and `accordion` are installed. To add more components: `npx shadcn@latest add <component>`. Config is in `components.json`.

---

## Intentional Decisions

**No backend.** The site is entirely static. There is no API, database, or server runtime. EmailJS handles contact form delivery client-side.

**No CMS.** Content is hardcoded in JSX. Case study copy, testimonials, FAQ answers, and service descriptions are directly in component files. There is no content that changes frequently enough to justify a CMS.

**EmailJS over a form API route.** Avoids any server infrastructure. The tradeoff is that EmailJS credentials are exposed in the client bundle (hence `NEXT_PUBLIC_*`). This is acceptable for a contact form on a personal portfolio.

**JavaScript over TypeScript.** The project uses JSX throughout with no type annotations. This keeps the setup simple and was the original project decision.

**Static-first.** Every page that can be static is static. The homepage is the only exception (client component) due to `useSearchParams`. This keeps TTFB low and removes any Vercel function invocations.

**Vercel only.** No multi-cloud setup. Deployment configuration is minimal. Recovery means connecting the GitHub repo to a new Vercel project and setting the three EmailJS environment variables.

---

## Future Improvements

- Migrate homepage to a server component by moving `useSearchParams` to a smaller client island, removing the `"use client"` requirement from the page root
- Add TypeScript for better refactor safety as the project grows
- Replace hardcoded testimonial and FAQ content with a lightweight JS data file if content changes frequently
