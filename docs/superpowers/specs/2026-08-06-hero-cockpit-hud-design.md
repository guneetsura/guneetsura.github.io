# Hero Cockpit HUD Design

## Goal

Replace the generic hero grid with a lightweight, artistic Star Wars-inspired cockpit HUD that reflects Guneet's sci-fi hobby without turning the portfolio into a game interface.

## Visual Treatment

- Remove the square grid background and `.hero-grid` element.
- Add a decorative `.hero-cockpit` layer with low-contrast star particles, a partial orbital arc, one desktop reticle, and compact navigation telemetry.
- Keep the existing dark graphite, gold, and blue palette.
- Keep all decoration behind the hero content and mark it `aria-hidden`.
- Reduce decorative scale, density, and contrast on mobile.

## Motion

- Use Framer Motion for a short opacity/scale reveal and subtle orbit drift.
- Keep native scrolling and existing content stagger.
- Disable drift and nonessential transforms when `prefers-reduced-motion` is active.
- Avoid canvas, WebGL, image downloads, and continuous high-cost animation.

## References and Constraints

The direction borrows principles from Awwwards animation and interaction references, Cofolios portfolio storytelling, and Dribbble HUD visual language. It does not copy a specific site. Content hierarchy, accessibility, performance, and recruiter readability remain primary.

## Validation

- No `.hero-grid` markup or square grid CSS remains.
- Hero shows the cockpit HUD on desktop and a restrained version on mobile.
- Decorative layers are hidden from assistive technology.
- Reduced-motion mode removes the orbit drift.
- `npm run lint` and `npm run build` pass.
- GitHub Pages deployment succeeds.
