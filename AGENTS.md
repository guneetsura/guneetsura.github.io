<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Developer Context
Guneet Sura is a frontend-focused Software Engineer with full-stack range and production experience across React, Next.js, TypeScript, Tailwind CSS, Framer Motion, REST APIs, PostgreSQL / NeonDB, Drizzle ORM, Clerk, Supabase, Python, Vercel, Oracle Cloud Infrastructure (OCI), and Figma for design handoff.

Firebase is used in this repository's data-provider abstraction (`src/lib/data-provider.ts`) as an optional CMS/data backend architecture — describe it as repository architecture, **not as a resume-listed production skill**.

Guneet has shipped real production applications, including an HRMS at Ad2connect, client websites, and SaaS platforms. Do not characterize his experience as being limited to hackathons.

## Engineering Preferences
Coding agents working on this repository must prioritize:
- **Production Quality**: Avoid demo-quality shortcuts, fragile hacks, or superficial patches.
- **Frontend Visual Quality**: High design standards with dark/amber technical aesthetics, clean layout, typography, and cohesive spacing.
- **Responsive Behavior**: Mobile-first design, fluid flex/grid layouts, no desktop-only assumptions.
- **Accessibility**: Semantic HTML, proper keyboard focus indicators (`focus-visible`), appropriate ARIA attributes.
- **Performance**: High frame rate scroll interactions, lightweight SVG/CSS transitions, proper React hook dependency arrays, and no layout thrashing.
- **Maintainability**: Clean TypeScript interfaces and modular component structure.
- **Interaction Design**: Purposeful, restrained motion that enhances usability without distracting.

## Repository Guidance
- **Source Directory**: `src/`
- **Key Components**:
  - `src/components/Navbar.tsx`: Sticky navigation header with scroll progress indicator & mobile menu.
  - `src/components/Hero.tsx`: Interactive hero section with HUD elements and social links.
  - `src/components/About.tsx`: Professional bio and background summary.
  - `src/components/Experience.tsx`: Interactive work experience timeline featuring scroll-driven electrical current lightning effect, expandable entries, and responsive DOM geometry tracking.
  - `src/components/Projects.tsx`: Featured portfolio projects with tech stack chips and links.
  - `src/components/Writing.tsx`: Dedicated articles section rendering post excerpts with Substack CTA.
  - `src/components/Skills.tsx`: Grouped technical skills and platform proficiencies.
  - `src/components/Contact.tsx`: Contact form with validation feedback and modal dialogs.
  - `src/components/BackToTop.tsx`: Floating scroll-to-top button.
- **Data Architecture & Fallback Pattern**:
  - Types defined in `src/lib/types.ts`.
  - Data provider abstraction in `src/lib/data-provider.ts` fetches from Firestore when `NEXT_PUBLIC_USE_FIREBASE=true` and valid Firebase config (`src/lib/firebase.ts`) is present.
  - Falls back seamlessly to static data in `src/lib/data.ts` (`portfolioData`) if Firebase is disabled or fails.
- **Styles & Design Tokens**:
  - Global stylesheet: `src/app/globals.css`.
  - CSS variables define design tokens: `--bg` (`#0B0C10`), `--surface` (`#121319`), `--surface-2` (`#191B22`), `--border` (`rgba(255, 255, 255, 0.08)`), `--border-strong` (`rgba(255, 255, 255, 0.14)`), `--text` (`#EDEDF0`), `--text-muted` (`#9297A3`), `--text-faint` (`#5C6270`), `--accent` (`#E2A945`), `--accent-soft` (`rgba(226, 169, 69, 0.12)`).
- **Relevant Package Scripts**:
  - `npm run dev`: Start local Next.js development server.
  - `npm run build`: Production build and TypeScript type check.
  - `npm run start`: Run production server.
  - `npm run lint`: ESLint code style and quality check.

## Animation Guidance
- Animation must remain restrained, deliberate, and aligned with the site's sleek technical aesthetic.
- Prefer Framer Motion where appropriate (`useScroll`, `useTransform`, `useSpring`, `motion.div`).
- Avoid excessive stagger effects, cartoonish animations, or heavy neon/glow blurs.
- Avoid unnecessary external animation libraries.
- For scroll-driven timeline effects, calculate and track actual rendered DOM geometry using `ResizeObserver`.
- Always respect `prefers-reduced-motion` settings.

## Responsive & Accessibility Guidelines
- Implement mobile-first, testing layout across mobile, tablet, and desktop breakpoints.
- Enforce `@media (prefers-reduced-motion: reduce)` in CSS and `useReducedMotion()` in Framer Motion components.
- Ensure baseline `@media (prefers-reduced-motion: reduce)` rule exists in `src/app/globals.css`.
- Use semantic HTML tags (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`).
- Ensure keyboard navigability and ARIA accessibility (`aria-expanded`, `aria-label`, `aria-current`).

## Scope & Security Rules
- Make the smallest coherent changes necessary for the task.
- Avoid unrelated refactors or changing file structures unnecessarily.
- Never expose secrets, API keys, or environment variables in repository code.
- Never alter portfolio facts, role details, or work experience dates without explicit user instruction.

## Verification Requirements
Before marking any task complete, agents MUST run:
```bash
npm run lint
npm run build
```
Ensure zero TypeScript, ESLint, or Next.js build errors exist. For meaningful visual or interactive UI changes, perform browser rendering verification when tooling is available.

## Git Workflow
- Create focused, coherent git commits for feature work.
- Never force-push or rewrite commit history.
- Open a Pull Request (PR) for requested feature work.

