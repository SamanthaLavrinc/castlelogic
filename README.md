# Castle Logic

Portfolio site for Samantha Lavrinc — full-stack engineer & designer. Built with React, Vite, and Tailwind CSS v4.

## Stack

- **React 19** + **React Router v7** (client-side routing)
- **Vite 7** for the dev server and build
- **Tailwind CSS v4** via `@tailwindcss/vite` — theme config (fonts, etc.) lives in `src/styles/global.css` via a `@theme` block, **not** `tailwind.config.js`. Tailwind v4 doesn't read that file without an explicit `@config` directive, which this project doesn't have. Don't reintroduce one without checking it actually gets picked up.
- **react-helmet-async** for per-route SEO (title/description/OG tags)
- **@formspree/react** for the contact form
- **lucide-react** for icons

## Local development

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Building

```bash
npm run build
```

Runs three steps in sequence:

1. `vite build` — standard production build to `dist/`
2. Prerenders every route with a headless browser (`scripts/prerender.mjs`), writing real static HTML per route (`dist/home/index.html`, `dist/projects/ux-lab/index.html`, etc.) so crawlers and social-share bots get actual content instead of an empty SPA shell
3. Generates `dist/sitemap.xml` and `dist/robots.txt` from the same route list the prerender step already builds

### Deploying (Vercel)

**Vercel's dashboard Build Command must be `npm run build`** (or "Default"), not `vite build`. If it's hardcoded to `vite build`, the prerender/sitemap step gets silently skipped and none of the SEO work above actually ships, even though the rest of the site still builds and deploys fine. Check: Project Settings → Build and Deployment → Build Command.

The prerender step uses Puppeteer. Locally it launches its own downloaded Chrome; on Vercel (detected via `process.env.VERCEL`) it uses `@sparticuz/chromium` instead, since Vercel's build container is missing the system libraries regular Chrome needs to run. See the comments in `scripts/prerender.mjs` if this ever needs revisiting.

## Adding a case study

Case studies live in `src/content/case-studies/` as one JSON file per project, auto-indexed at build time via `import.meta.glob` (see `src/content/case-studies/index.js`). To add one:

1. Copy `_template.json` — filenames starting with `_` are excluded from the build, so this one never shows up as a real project
2. Rename it and fill in the fields
3. Done. No component or route code needs to change — it'll automatically appear on `/projects`, get its own `/projects/<slug>` detail page, and show up in the sitemap on the next build.

Required fields: `slug`, `title`, `category`, `summary`. Everything else (`role`, `stack`, `problem`, `approach`, `results`, `image`, `links`) is optional and only renders on the detail page if present.

## Contact form

Wired to Formspree (`@formspree/react`, form ID lives in `src/pages/Contact.jsx`). Every submission carries the subject `[Castle Logic Contact]` so it's easy to filter in Gmail.

## Image optimization

`scripts/optimize-images.mjs` converts PNGs in `src/assets/design/` to WebP. This is **not** part of the build — run it manually after adding new illustration assets:

```bash
node scripts/optimize-images.mjs
```

## Project structure

- `src/pages/` — one file per route
- `src/components/` — shared UI (`Header`, `Footer`, `Layout`, `SEO`, `CaseStudyCard`, `Skills`, `Timeline`, `Illustrations`)
- `src/content/case-studies/` — case study data (see above)
- `src/styles/global.css` — Tailwind imports, `@theme` font config, and the custom `castlepink` / `castlepurple` color utilities
- `scripts/` — build-time tooling (prerender, image optimization)
