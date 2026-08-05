# Hero Cockpit HUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the hero grid with a lightweight, responsive Star Wars cockpit-HUD background.

**Architecture:** Keep the hero content and Framer Motion reveal intact. Replace the CSS grid layer with a decorative JSX layer composed of CSS radial gradients, orbit arcs, and a reticle; use Framer Motion only for a low-cost reveal and optional drift. All decoration remains `aria-hidden` and reduced-motion-safe.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion.

---

### Task 1: Replace the hero background art

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/globals.css`

- [ ] Remove the `.hero-grid` element from Hero.
- [ ] Add an `aria-hidden` `.hero-cockpit` layer containing star texture, orbit ring, reticle, and compact HUD labels.
- [ ] Use `useReducedMotion()` to disable drift and scale changes when motion is reduced.
- [ ] Add CSS for radial star texture, orbit arc, reticle, HUD markers, and the existing hero bridge.
- [ ] Reduce visual density and hide the reticle on narrow screens.
- [ ] Remove all `.hero-grid` CSS and confirm no square grid remains.

### Task 2: Verify the static portfolio

**Files:**
- No additional source files.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Search source for `.hero-grid` and confirm zero matches.
- [ ] Run `git diff --check`.
- [ ] Commit the hero change and push `main`.
- [ ] Confirm the GitHub Pages Actions deployment succeeds and the public page no longer contains the grid layer.
