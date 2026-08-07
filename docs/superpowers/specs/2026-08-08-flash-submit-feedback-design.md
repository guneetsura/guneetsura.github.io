# Flash-Themed Submit Feedback Design

**Date:** 2026-08-08
**Component:** `src/components/Contact.tsx` form submit feedback + validation.

## Goal

Replace the plain inline success/error text on the contact form with a Flash (DC) themed electric popup and add theme-consistent inline form validation.

## Design Decisions (approved)

- **Popup placement:** center overlay modal (cockpit/HUD style matching the hero).
- **Tone:** success gets the yellow Flash lightning; errors get a dimmer red/amber electric treatment. Same modal shell, styled differently.
- **Validation timing:** validate on blur + on submit.
- **Validation feedback:** inline below each field (no summary line).

## Behavior

### Submit sequence

1. User clicks "Send request" → button shows "Sending…" and disables.
2. A **lightning swoosh** streaks diagonally across the screen (~500ms) while submitting.
3. On completion, the modal opens. A **yellow electric flash overlay** lights the screen for ~300ms then fades.
4. Modal slides/scales in with a lightning-bolt border flash.

### Success modal

- Zap (lightning bolt) icon in gold.
- Title: "Request received!"
- Body: status message ("Guneet will reply soon. Expect a response within a couple of days.")
- Speed-line background accents + telemetry-style microtext (e.g. "SIGNAL LOCKED").
- Close button ("Done"). Closes on Esc, backdrop click, or button.

### Error modal

- Same mechanics, `--danger` amber/red electric treatment.
- Title: "Signal lost"
- Body: "The request didn't go through. Try again, or message Guneet on LinkedIn."
- Retry button (re-submits) + Close.

### Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Focus moves into the modal on open, returns to submit button on close.
- Esc closes. Backdrop click closes.
- `prefers-reduced-motion`: skip swoosh and flash; modal fades in only.

## Validation

- Fields: name (required), email (required + format), message (required, min 10 chars).
- On blur, validate field and show inline error: red glow border + small icon + message (`role="alert"`, `aria-live="polite"`).
- After a field is touched, re-validate on change; clear error once valid.
- On submit, validate all; focus the first invalid field.
- Valid fields get a subtle check icon.

## Files

- `src/components/Contact.tsx` — validation state, modal, swoosh trigger.
- `src/app/globals.css` — modal shell, lightning/flash/swoosh keyframes, field error/valid styles.
- No new dependencies.

## Reduced Motion

All decorative animation disabled under `prefers-reduced-motion` (global override already exists; ensure the modal still opens/usable).
