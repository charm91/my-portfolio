# ngu-wah-portfolio

Personal portfolio site for Ngu Wah Aung (Charm), Senior Product Designer — showcasing case studies in fintech, HR SaaS, and education products.

Live at **[nguwahaung.com](https://www.nguwahaung.com/)**

## Install

Requires Node.js 18+.

```bash
npm install
```

## Usage

```bash
npm run dev      # development server → http://localhost:3002
npm run build    # production build
npm run lint     # ESLint
npm test         # run test suite (Vitest, 60 tests)
```

### Project structure

| Path | Purpose |
|---|---|
| `src/config/site.js` | All personal info — name, email, social links, availability |
| `src/components/` | Homepage sections (Hero, Portfolio, FAQ, etc.) |
| `src/views/` | Case study page content (BetterHR, KBZ, UniLinks, WCT) |
| `app/contact-me/` | Contact form (EmailJS) |
| `src/__tests__/` | Test files |

### Editing content

- **Personal info** (name, email, availability, links): edit `src/config/site.js`
- **Homepage copy**: edit the matching component in `src/components/`
- **Case study prose**: edit the matching file in `src/views/`

## Contributing

Solo project — no pull requests. Changes go directly to `main`.

## License

All rights reserved. Source visible for reference only.

<!-- last-reviewed: 1135aace89e5c9861cc162e04782635422e0c722 -->
