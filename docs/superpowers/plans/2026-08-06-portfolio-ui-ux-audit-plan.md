# Portfolio UI/UX Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the static dark portfolio into a privacy-safe, recruiter-focused interactive portfolio while preserving GitHub Pages deployment.

**Architecture:** Keep static data and the existing section components. Remove private profile fields, add small client-side interactions inside the relevant sections, and submit resume/contact requests to a configurable hosted form endpoint from the browser. Do not add a server route because the site is exported to `out/`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, GitHub Pages.

---

### Task 1: Update portfolio content and privacy model

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/data.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Contact.tsx`

- [ ] Remove `email` and `phone` from `Profile` and static data.
- [ ] Remove email, phone, and mailto rendering from Hero and Contact.
- [ ] Add SaaS Growth Marketing as the first featured project with live URL and Ad2connect attribution.
- [ ] Update project and experience copy from the supplied resume without inventing outcomes.
- [ ] Replace the simulated contact timeout with a POST to `process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, using `name`, `email`, `subject`, `message`, and `requestType` fields.
- [ ] Show validation, submitting, success, error, and unconfigured-endpoint states; keep LinkedIn as fallback.

### Task 2: Improve navigation and motion accessibility

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/app/globals.css`

- [ ] Track the visible section with `IntersectionObserver` and mark the matching navigation link active.
- [ ] Add `aria-current`, focus-visible styling, and close the mobile menu on navigation.
- [ ] Add a lightweight scroll progress indicator that does not block interaction.
- [ ] Add reduced-motion CSS overrides and make Framer Motion viewport transitions respect the preference.

### Task 3: Add project and experience interactions

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Experience.tsx`

- [ ] Add project filters for All, Featured, and supporting work.
- [ ] Make the newest SaaS Growth Marketing project visually prominent.
- [ ] Render unavailable `#` links as noninteractive labels rather than dead anchors.
- [ ] Add expandable experience entries with accessible buttons and concise collapsed previews.

### Task 4: Polish responsive UI and audit documentation

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Skills.tsx`
- Modify: `src/app/globals.css`
- Create: `docs/superpowers/specs/2026-08-06-portfolio-ui-ux-audit-design.md`

- [ ] Preserve semantic headings and section landmarks.
- [ ] Improve selected tab semantics in Skills with `aria-selected` and keyboard-friendly controls.
- [ ] Add visible focus rings, minimum touch targets, and mobile-safe spacing.
- [ ] Keep the approved audit design document aligned with the implementation.

### Task 5: Verify and publish

**Files:**
- No source changes expected.

- [ ] Run `npm ci`.
- [ ] Run `npm run lint` and fix reported issues.
- [ ] Run `npm run build` and confirm `out/` is generated.
- [ ] Search source and output for the private email and phone values; expect no matches.
- [ ] Review git diff and status.
- [ ] Commit the implementation and push `main` to `origin`.
