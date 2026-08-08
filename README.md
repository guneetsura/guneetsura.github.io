# Guneet Sura — Portfolio

Live site: **[https://guneetsura.github.io](https://guneetsura.github.io)**

Portfolio of [Guneet Sura](https://github.com/guneetsura), a frontend-focused software engineer building production web applications with React, Next.js, and TypeScript.

## Stack

- **Next.js 16** (App Router, static export for GitHub Pages)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **lucide-react**
- **GitHub Pages** via GitHub Actions

## Getting Started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

Build and lint:

```bash
npm run lint
npm run build
```

## Deploy

`main` auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`. The workflow builds a static export to `out/`, uploads it, and verifies the live site responds after deploy.

## Contact Form Backend

The form posts to a private Google Apps Script Web App. See [docs/contact-form-setup.md](docs/contact-form-setup.md) for how storage, notifications, and the GitHub Actions endpoint variable work.
