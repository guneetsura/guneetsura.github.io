<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project-specific guidance for AI coding agents

## Who this is for
This is Guneet Sura's personal portfolio — a frontend-focused Software Engineer with full-stack range. Production experience includes React, Next.js, TypeScript, Tailwind CSS, Framer Motion, REST APIs, PostgreSQL/NeonDB, Drizzle ORM, Clerk, Supabase, Python, Vercel, and Oracle Cloud Infrastructure, plus Figma for design handoff. He has shipped production applications — including a full HRMS — at Ad2connect, not just hackathon projects (KAVACH 2023 national win included), so prefer production-quality implementations over demo-quality shortcuts: proper error handling, loading states, accessibility, and responsive behavior, not just "it renders."

Firebase is present in this repo (`src/lib/firebase.ts`, `src/lib/data-provider.ts`) as an optional CMS-swap backend for content, not a resume-listed production skill — treat it as part of this repo's architecture, not as evidence of broader Firebase experience.

## Stack (verify against package.json — do not assume versions)
Next.js 16 (App Router, static export for GitHub Pages), React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, Firebase (optional). Deployed via GitHub Actions to GitHub Pages (`main` auto-deploys, see `.github/workflows/deploy.yml`).

## Priorities (in order)
1. Visual quality and interaction polish — this is a portfolio; how it looks and feels is the product.
2. Responsive behavior across breakpoints — never hardcode desktop-only pixel values.
3. Accessibility — semantic markup, keyboard navigation, aria labels on icon-only controls, respect `prefers-reduced-motion`.
4. Performance — prefer transform/opacity animation over layout-triggering properties; avoid unnecessary re-renders and dependencies.
5. Maintainability — follow existing patterns rather than introducing new ones for a single feature.

## Architecture
- `src/app/` — Next.js App Router pages, root layout, global styles (`globals.css`).
- `src/components/` — one component per site section (Navbar, Hero, About, Experience, Projects, Skills, Contact, etc.).
- `src/lib/` — `types.ts` (shared types), `data.ts` (static resume-derived content), `data-provider.ts` (data-source abstraction), `firebase.ts` (guarded Firebase init).
- `google-apps-script/` — backend for the Contact form, which posts to a private Google Apps Script Web App (see `docs/contact-form-setup.md`). Do not replace this with a simulated/fake submit handler — it is a working integration.
- `docs/` — supporting documentation.

## Data-provider pattern
All page content (profile, experience, projects, skills, education, awards) is read through functions in `src/lib/data-provider.ts` (e.g. `getProfile()`, `getExperiences()`), not hardcoded directly in components. These functions read from static data in `data.ts` by default, and switch to Firestore when `NEXT_PUBLIC_USE_FIREBASE=true` and valid Firebase config are present — falling back silently to static data on any failure. New content types should follow this same pattern rather than being hardcoded.

## Design tokens (`src/app/globals.css`)
Dark background, single accent color used sparingly: `--accent: #E2A945`. Typography is Ubuntu. Reuse existing CSS variables (`--accent`, `--accent-soft`, `--border`, `--border-strong`, `--surface`, etc.) rather than introducing new colors for a single feature.

## Animation and scroll-driven interactions
Motion should be restrained and purposeful: fade-up on scroll into view, no exploding stagger cascades, no neon glow/box-shadow spam. Any scroll-driven effect (e.g. the Experience timeline) must genuinely track scroll position (Framer Motion `useScroll`/`useTransform` or equivalent) — never a one-shot `whileInView` or `setTimeout` sequence dressed up as "scroll-driven." Verify existing scroll-driven implementations behave correctly in both scroll directions before extending them.

## Responsive requirements
No hardcoded desktop-only pixel coordinates. Derive layout-dependent values (e.g. SVG/path geometry) from actual DOM measurements or `ResizeObserver` where needed. Verify behavior at mobile, tablet, and desktop breakpoints, and after content height changes (e.g. expanding text).

## `prefers-reduced-motion`
Respect the `prefers-reduced-motion: reduce` media query in `globals.css`. Users who prefer reduced motion should see the site's content and layout fully intact, with continuous/decorative animation disabled or replaced with a static equivalent.

## TypeScript and React standards
Strict typing — no implicit `any`. Function components with explicit prop types. Prefer composition over duplication. Keep components scoped to one section/responsibility, matching the existing one-component-per-section pattern.

## Scope discipline
Do not perform unrelated refactors, rename working files, or replace working architecture (e.g. the data-provider pattern, the Google Apps Script contact backend) as a side effect of an unrelated task. Touch only what the task requires.

## Security
Never commit or expose credentials, API keys, or environment secrets. Firebase config and the Google Apps Script endpoint are read from environment variables — do not hardcode them.

## Verification before considering a task done
Run `npm run lint` and `npm run build`. Both must pass with no TypeScript errors. For any change with visual or interactive impact, describe (or where possible, capture) what changed on screen — don't rely on "it compiles" as sufficient verification for UI work.

## Git / change management
Keep commits scoped to the stated task. Open a PR rather than pushing directly to `main` where possible, and describe what was verified (lint/build/manual check) in the PR description.
