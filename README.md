# Space Portfolio

A space-inspired portfolio built with React, TypeScript, Vite, Three.js, React Three Fiber, Drei, and Framer Motion.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Run `npm run build` to type-check and build, or `npm run preview` to preview the production build.

## Make it yours

Update the placeholder name, biography, project descriptions, links, and contact details in the React components under `src/`. Replace any placeholder imagery and update the page title and description in `index.html`. The favicon is in `public/favicon.svg`.

## Deploy to Vercel

Import this repository into Vercel and select the Vite framework preset. Use `npm run build` as the build command and `dist` as the output directory, then deploy. No environment variables are required by the starter configuration.

## Content and placeholders

Edit `src/data/portfolio.ts` to configure the skill groups, project descriptions and status, journey, and contact email / GitHub / LinkedIn URLs. Project examples are illustrative concepts, not claims of completed work; replace them with verified information. Contact links and the copy button appear only after valid details are supplied. The placeholder name appears in `src/sections/Hero.tsx`, `src/components/Navbar.tsx`, and `src/components/Footer.tsx`; update the biography in `src/components/Sections.tsx`. Add real project URLs to the data only when available. Review all copy and metadata before publishing.

The decorative 3D scene is lazy-loaded, reduces detail on mobile, respects reduced-motion preferences, and falls back when WebGL is unavailable. The production build may warn about the separate Three.js chunk size.
