# Velocity Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the approved GS velocity brand system, typography, responsive motion, navigation cleanup, and favicon while preserving the static GitHub Pages deployment.

**Architecture:** Keep the existing single-page section structure and Framer Motion animation approach. Add a reusable inline SVG GS mark, load Ubuntu and Bitcount Prop Single through `next/font/google`, and keep the project grid data-driven with a `lg` two-column layout. Use CSS and Framer Motion for restrained, reduced-motion-aware transitions.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, GitHub Pages static export.

---

### Task 1: Add shared GS mark and typography

**Files:**
- Create: `src/components/GSMark.tsx`
- Create: `src/app/icon.svg`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] Create a reusable SVG GS velocity monogram with a gold foreground, graphite-compatible contrast, forward-leaning geometry, and a speed-line notch.
- [ ] Create a simplified favicon SVG using the same GS geometry without tiny text.
- [ ] Replace Inter and Space Grotesk with Ubuntu as `--font-sans` and Bitcount Prop Single as `--font-signal`.
- [ ] Apply Ubuntu globally and reserve the signal font for a small hero telemetry label.

### Task 2: Refine navbar and back-to-top control

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/BackToTop.tsx`

- [ ] Render the GS mark beside the accessible `Guneet Sura` brand label.
- [ ] Keep About, Experience, Projects, and Skills as navigation items; remove the duplicate Contact item.
- [ ] Rename both desktop and mobile CTA labels to `Contact`.
- [ ] Preserve active-section state, scroll progress, mobile menu, focus states, and touch targets.
- [ ] Style BackToTop with the same GS accent language and maintain reduced-motion behavior.

### Task 3: Add Awwwards-inspired hero transition

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/globals.css`

- [ ] Add a responsive telemetry rail and short signal label using the signal font.
- [ ] Stagger hero content with Framer Motion and use a directional transition cue toward About.
- [ ] Add a subtle bottom fade/line transition to make the next section feel connected without scroll hijacking.
- [ ] Respect reduced-motion preference by removing nonessential transforms and delays.
- [ ] Keep hero CTAs and social links accessible and usable at narrow widths.

### Task 4: Make projects a true desktop 2x2 grid

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/app/globals.css`

- [ ] Change the grid breakpoint to `lg:grid-cols-2` so laptop and larger screens show two columns.
- [ ] Keep the single-column layout below `lg`.
- [ ] Preserve the normal project sequence and SaaS Growth Marketing accent styling without a spanning card.
- [ ] Add restrained hover motion and focus treatment that does not change card dimensions.

### Task 5: Verify and publish

**Files:**
- No additional source files.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build` and confirm `/robots.txt`, `/sitemap.xml`, and the favicon are emitted.
- [ ] Confirm no duplicate Contact navigation item exists in source.
- [ ] Confirm the project grid uses `lg:grid-cols-2` and no `col-span-2`.
- [ ] Review `git diff --check` and `git status`.
- [ ] Commit the implementation and push `main`.
- [ ] Confirm the latest GitHub Pages Actions deployment succeeds and the live favicon/page render correctly.
