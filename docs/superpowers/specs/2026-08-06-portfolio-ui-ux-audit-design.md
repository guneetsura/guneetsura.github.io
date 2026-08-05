# Portfolio UI/UX Audit and Interaction Design

## Goal

Improve the portfolio for hiring conversations. Recruiters should understand Guneet's role, recent production work, technical range, and next step without exposing private contact details or requiring a resume download.

## Scope

Keep the dark editorial visual language and static GitHub Pages deployment. Add stronger information hierarchy, focused interactions, and privacy-safe contact flows.

## Content Source

The supplied resume is the source of truth for the professional summary, skills, work history, education, award, and existing projects. `saasgrowthmarketing.com` becomes the first featured project and is attributed to Ad2connect. Its description uses only verified information: a B2B SaaS growth marketing website with structured services, case studies, and strategy-call conversion paths.

## Privacy and Contact

- Remove email and phone values from portfolio data, rendered components, metadata, and client bundles.
- Do not add a resume download or resume file.
- Add a resume/contact request form backed by `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`.
- Keep the recipient address inside the hosted form provider, outside the repository and static output.
- Show idle, submitting, success, and error states.
- Provide LinkedIn as a fallback contact path.
- Keep the GitHub Pages static export.

## Interaction Design

- Highlight the active section in desktop and mobile navigation.
- Close mobile navigation after selection and support keyboard focus states.
- Add featured project treatment and project filtering without unsupported metrics.
- Let visitors expand experience entries so the timeline remains scannable.
- Keep skills grouped behind accessible category controls.
- Respect `prefers-reduced-motion`.
- Add clear hover, focus, disabled, and unavailable-link states.

## UI/UX Audit Plan

### Priority 1: Conversion and clarity

- Confirm the hero answers who Guneet is, what he builds, and how to continue within the first viewport.
- Make the newest production work visible before older projects.
- Remove dead `#` project links and label unavailable links honestly.
- Replace simulated contact success with a hosted-form submission path.

### Priority 2: Scannability

- Use concise impact-led summaries from the resume.
- Keep experience dates and roles easy to scan.
- Separate featured work from supporting work.
- Preserve progressive disclosure for detail-heavy content.

### Priority 3: Accessibility and responsive behavior

- Maintain one logical heading hierarchy and semantic section landmarks.
- Ensure controls have accessible names and selected state.
- Keep keyboard focus visible against the dark theme.
- Test mobile navigation, project controls, forms, and timeline expansion.
- Reduce nonessential animation when requested by the operating system.

### Priority 4: Performance and trust

- Preserve static generation and avoid exposing private data in public JavaScript.
- Keep Firebase fallback behavior intact unless it conflicts with privacy requirements.
- Verify production build output and deployed navigation behavior.

## Validation

- `npm run lint` passes.
- `npm run build` produces the GitHub Pages `out` directory.
- No email address or phone number appears in source, generated output, or rendered page text.
- Resume request form shows correct validation and submission states with and without an endpoint.
- Navigation and controls work with keyboard and touch input.
- Layout remains usable at mobile, tablet, and desktop widths.
