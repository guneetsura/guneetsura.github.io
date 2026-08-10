<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Context
Guneet Sura is a frontend-focused Software Engineer with full-stack range and production experience across React, Next.js, TypeScript, Tailwind CSS, Framer Motion, REST APIs, PostgreSQL/NeonDB, Drizzle ORM, Clerk, Supabase, Python, Vercel, Oracle Cloud Infrastructure, and Figma. Firebase is used as a data-provider architecture for this repository, not a resume-listed production skill. Has real production applications including HRMS at Ad2connect, not just hackathon experience.

## Engineering Preferences
- Production quality, frontend visual quality, responsive behavior, accessibility, performance, and maintainability.
- Clean TS/React architecture. Avoid demo shortcuts/fragile hacks.
- Animation guidance: Restrained, using Framer Motion where appropriate. Avoid excessive stagger/glow/neon. Use actual geometry for scroll-driven effects, respect `prefers-reduced-motion`.
- Responsive/accessibility: Mobile-first, semantic HTML, keyboard accessibility, ARIA where needed. Ensure fallback for motion-heavy UI.
- Scope/security: Smallest coherent change, avoid unrelated refactors, never expose secrets, never modify portfolio facts without explicit instruction.

## Architecture
- Source directory: `src/`
- Data architecture: Data providers in `src/lib/data-provider.ts` read from Firebase, falling back to static data in `src/lib/data.ts`.
- Styles: Tailwind CSS, global stylesheet at `src/app/globals.css`. Design tokens defined as CSS variables.

## Verification & Git
- Run `npm run lint` and `npm run build` before completion.
- Provide focused, small git commits. Do not force-push, do not rewrite history. Open a PR for requested feature work.
