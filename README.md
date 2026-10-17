# Muhammad Abdullah — portfolio

Personal site built with Next.js 16 (App Router), Tailwind CSS v4 and Motion. Fully static, dark theme,
with scroll-reveal animations, cursor-spotlight cards and a live StyleZone demo at `/projects/stylezone`.

## Develop

```bash
npm install
npm run dev
```

## Editing content

Every piece of text — profile, projects, experience, skills, education — lives in
[`src/lib/content.ts`](src/lib/content.ts). Project screenshots go in `public/work/`, the resume is
`public/Muhammad-Abdullah-Resume.pdf`.

## Deploy

Push to GitHub and import the repo on Vercel; no environment variables are needed.
