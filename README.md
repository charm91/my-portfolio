# Ngu Wah Aung’s Portfolio

Personal portfolio of Ngu Wah Aung (Charm), Senior Product Designer.

[Visit the portfolio](https://nguwahaung.com)

## About this portfolio

A selection of product design work across fintech, HR SaaS, and education. The case studies cover the problems, design decisions, and collaboration behind Better HR, UniLinks, KBZ Bank, and WCT Pay.

The site also includes my design approach, recommendations from former teammates, and a way to get in touch.

Built with Next.js, React, Tailwind CSS, and Framer Motion.

## Updating shared details

Edit [src/config/site.js](src/config/site.js) for personal details, availability, account links, resume and the canonical site URL. `SITE.name` is the legal name; `SITE.nickname` supplies the visible display name and the bracketed name in metadata. `SITE.seoName`, the tagline and experience years are derived from those settings. Shared image imports live in [src/config/assets.js](src/config/assets.js) so Next.js retains content-hashed image URLs.

Run `npm run generate:content` to refresh README, the legal documents and the bug-report URL. This also runs before `npm run dev` and `npm run build`. Run `npm run check:content` to check for stale output without writing files.

Edit static wording in [src/content/templates](src/content/templates), then regenerate; direct edits to generated output will be replaced. Legal clauses and review dates remain explicit reviewed content. The terms and privacy documents do not currently have published page routes; generation does not publish them. Testimonials and past job details retain their original wording.

`DEFAULT_SITE_URL` supplies the canonical domain for generated documents. `NEXT_PUBLIC_SITE_URL` can override application metadata, sitemap and crawler URLs. GitHub About is managed separately. Live website updates require rebuilding and deploying.

## Contributing

This is my personal portfolio of product design work. If something doesn’t work or you have feedback on the case studies, [open an issue](https://github.com/charm91/my-portfolio/issues/new/choose). Pull requests aren’t expected.

## License

All rights reserved. No project-wide reuse license is provided. © Ngu Wah Aung.

<!-- last-reviewed: 56c73bbe25a6f4ff8f670082ccabdb1d9b6a85af -->
