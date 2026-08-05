# Velocity Portfolio Interaction Design

## Goal

Refine the portfolio into a distinctive, fast, and responsive personal brand system that combines editorial portfolio composition with automotive velocity and restrained sci-fi interface cues.

## Navigation

- Rename the primary navbar CTA from `Request resume` to `Contact`.
- Remove the duplicate Contact item from the navigation list on desktop and mobile.
- Preserve active-section highlighting, scroll progress, mobile menu behavior, and keyboard focus states.
- Replace the text brand treatment with the shared GS velocity monogram and accessible `Guneet Sura` label.

## Hero Motion

Use Framer Motion for a controlled launch-sequence reveal: stagger the eyebrow, name, title, tagline, CTA group, and social links; add a thin telemetry line and directional transition cue toward About. Motion must remain subtle, responsive, and non-blocking. Existing reduced-motion CSS must disable nonessential movement and scrolling must remain native.

## Project Layout

- Use a single, normal project sequence with no filter categories.
- Use two equal columns from the `lg` breakpoint upward, producing a 2x2 layout for the four current projects.
- Use one column below `lg` for mobile and tablet readability.
- Keep SaaS Growth Marketing first and visually featured through border, accent treatment, and metadata without making it span the grid.

## Brand Mark and Favicon

Create one reusable SVG GS velocity monogram. The mark should combine interlocked G/S geometry, a forward-leaning cut, and one speed-line notch. Use a gold-on-graphite palette consistent with the current site. Keep the favicon simplified enough to remain legible at 16px and expose no private data. Add it as `src/app/icon.svg` so Next.js uses it for the favicon.

## Typography

Use Ubuntu as the primary site font for navigation, body copy, controls, and most headings. Use Bitcount Prop Single only for a very small display accent, such as the GS telemetry label or a compact hero micro-label, where its technical character reinforces the sci-fi direction without reducing readability. Load both through 
ext/font/google and preserve the existing reduced-motion and responsive behavior.

## Back To Top

Keep the floating BackToTop component, refine its placement and styling to match the new brand mark, and preserve its accessible label, smooth behavior, and reduced-motion fallback.

## Awwwards-Inspired Principles

The implementation draws from Awwwards portfolio references and categories for typography, scrolling, transitions, interaction design, responsive composition, and microinteractions. It does not copy a specific site. The result should use bold hierarchy, deliberate reveal timing, controlled asymmetry, and a small number of memorable interaction details without sacrificing performance or readability.

## Validation

- Desktop and laptop project layout renders as a uniform 2x2 grid.
- Mobile and tablet projects remain readable in one column.
- Navbar contains one Contact CTA and no duplicate Contact link.
- GS mark appears in the navbar and favicon.
- Hero transition completes without layout shift and respects reduced motion.
- Back-to-top control is visible after scrolling and works with keyboard and touch.
- `npm run lint` passes.
- `npm run build` passes and emits static output for GitHub Pages.
- Latest GitHub Pages Actions deployment succeeds.
