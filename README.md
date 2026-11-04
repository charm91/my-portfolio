# Ngu Wah Aung Portfolio _(my-portfolio)_

Personal portfolio for Ngu Wah Aung (Charm), Senior Product Designer.

**[Visit the portfolio](https://www.nguwahaung.com/)**

A Next.js 15, React 19 and Tailwind CSS 4 site showcasing product design work across fintech, HR SaaS and education. It includes four case studies, a portfolio listing and an EmailJS contact form.

The repository is named `my-portfolio`; its application package is named `ngu-wah-portfolio`.

## Install

Use Node.js 22.13+ on the 22.x line, or Node.js 24+, with npm. Node.js 18 does not support the current development and test tooling.

From the repository root:

```bash
npm install
```

The included `.npmrc` enables `legacy-peer-deps` for dependency installation.

## Usage

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3002`. If that port is occupied, the launcher selects the next free port and prints it. To start probing from a different port:

```bash
PORT=3005 npm run dev
```

Build and serve the production app locally:

```bash
npm run build
npm start
```

### Configuration

`NEXT_PUBLIC_SITE_URL` optionally overrides the base URL used in metadata, the sitemap and robots configuration. Set it in `.env.local` when needed. It defaults to `https://www.nguwahaung.com`, including in local development.

The contact form uses the EmailJS configuration in [ContactPageClient.jsx](app/contact-me/ContactPageClient.jsx). That configuration is shared with local development; local submissions still send through the configured EmailJS account.

## Development

| Command | Purpose |
|---|---|
| `npm run lint` | Run the configured Next.js ESLint checks. |
| `npm test` | Run the Vitest suite with jsdom and React Testing Library. |
| `npm run test:watch` | Watch tests while editing. |
| `npm run test:coverage` | Generate V8 coverage with text and HTML reports. |

Run a focused test file:

```bash
npx vitest run src/__tests__/contact-form-validation.test.jsx
```

### Editing content

- **Personal details and links:** [src/config/site.js](src/config/site.js).
- **Homepage sections:** [src/components](src/components).
- **Case-study prose:** [src/views](src/views), rendered through the shared case-study shell.
- **Images:** [public](public), referenced using root-relative URLs.
- **Styling:** [app/globals.css](app/globals.css) contains the Tailwind 4 theme; [src/config/theme.js](src/config/theme.js) holds shared color tokens.

To add a case study, create its view, register it in [src/config/caseStudies.js](src/config/caseStudies.js), add its portfolio card in [Portfolio.jsx](src/components/Portfolio.jsx), and add its URL to [app/sitemap.js](app/sitemap.js).

## Contributing

This is a solo project. Changes are maintained directly on `main`; pull requests are not used.

For questions, [contact Charm](https://www.nguwahaung.com/contact-me).

## License

UNLICENSED. © Ngu Wah Aung. All rights reserved.

Source is visible for reference only; no reuse license is included.

<!-- last-reviewed: 75c385c9703b00b5b25d46935198db5ffcdc6804 -->
