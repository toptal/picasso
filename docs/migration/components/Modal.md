# Modal — migration plan

## Identity
- Path: `packages/base/Modal/`
- Tier: Tier 0 — light path (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/dialog` (Picasso's "Modal" maps to the dialog primitive)

## Dependencies
Migration must be applied AFTER:
- **Backdrop** (Tier 0) — Modal composes Backdrop for the dim overlay

## Migration scope
Per migration plan v3 §3.1: Picasso's "Modal" is the dialog primitive. Replace `@mui/base/Modal` with `@base-ui/react/dialog`'s compound parts.

- Replace `import { Modal } from '@mui/base/Modal'` with `import { Dialog } from '@base-ui/react/dialog'`.
- Migrate to compound parts: `Dialog.Root` + `Dialog.Trigger` + `Dialog.Portal` + `Dialog.Backdrop` + `Dialog.Popup` + `Dialog.Title` + `Dialog.Description` + `Dialog.Close`.
- The `Dialog.Backdrop` from `@base-ui/react` is internal to Dialog — Picasso's Backdrop-as-prop pattern needs to migrate to using `<Dialog.Backdrop>` as a slot inside `<Dialog.Portal>`. Picasso's standalone Backdrop component (Tier 0, also in this batch) is for non-Dialog use cases.
- Tailwind class composition stays.
- `packages/base/Modal/package.json`:
  - Drop `@mui/base` from `dependencies`.
  - Add `@base-ui/react`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Picasso's Modal API likely accepts `open`, `onClose`, `BackdropProps`, etc. Map to `Dialog.Root`'s `open` + `onOpenChange` + Dialog.Backdrop slot props. Strict API preservation per `rules/api-preservation.md`.
- `data-state="open"` / `data-state="closed"` on `Dialog.Popup` drives transitions. Picasso's existing fade transition needs to convert to `data-[state=open]:opacity-100` + `data-starting-style:opacity-0` Tailwind variants.
- Modal is depended on by many composite components (Drawer composes via Modal under the hood; Page composes Modal for confirmations). Class-name changes will Happo-shift downstream — re-record Drawer + Page baselines after Modal merges.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Modal Happo: pixel diff ≤0.5% on every story.
- [ ] Drawer + Page Happo baselines re-recorded post-Modal merge.

## Reviewer notes
- Modal + Drawer are the highest-impact Tier 0 migrations (downstream composites depend on both). Sequence carefully: Backdrop → Modal → Drawer.

## `classes` handling — KEEP narrowed `{ closeButton }` (Tier 3.b shape despite Tier 0 migration)

Cross-tier audit (`decisions/classes-audit.md` §6) verified:
- Modal extends `BaseProps, HTMLAttributes<HTMLDivElement>` — NOT `StandardProps`. So the open-ended inheritance never applied.
- Modal LOCALLY declares `classes?: { closeButton?: string }` (Modal.tsx:64–66). This is the existing public surface.
- Real external consumers use `<Modal classes={{ closeButton: '...' }}>`:
  - `toptal/talent-activation-frontend` IndustryProfilePreviewButton.tsx
  - `toptal/top-assessment-frontend` AssessmentSettingsModal.tsx + FullSizePreview.tsx
  - `toptal/topteam-frontend` (multiple)

Modal is structurally a **Tier 3.b shape** (locally narrowed + used + external consumers) despite its Tier 0 light-path migration. Treat like Dropdown / OutlinedInput.

### Hypothesis to verify

**KEEP** the existing `classes?: { closeButton?: string }` surface unchanged through the migration. Port slot-routing to @base-ui/react/dialog's `<Dialog.Close>` part-level `className`.

### Verify per migration (DO this)

1. **Source verification**:
   - Open `packages/base/Modal/src/Modal/Modal.tsx`. Confirm `extends BaseProps, HTMLAttributes<HTMLDivElement>` (NOT StandardProps).
   - Confirm local `classes?: { closeButton?: string }` declaration at lines 64–66.
   - Grep the body for `classes?.closeButton` — confirm it's read and applied to the close-button render path.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Modal\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Look for internal callsites passing `<Modal classes={{...}}>`. Audit didn't find any internal callers — verify.

3. **External freshness check — REQUIRED for Tier 3.b shape**:
   ```bash
   gh search code 'Modal classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Manually inspect each `textMatches[].fragment`. Audit confirms 3+ real consumers using `closeButton`. If you find new slots (e.g. `paper`, `root`) used externally, the narrow may need widening — escalate.

4. **Action — KEEP narrowed**:
   - Preserve `classes?: { closeButton?: string }` declaration verbatim.
   - In the migrated body, `classes?.closeButton` → `<Dialog.Close className={twMerge(baseCloseButtonClass, classes?.closeButton)}>` (assuming @base-ui/react/dialog exposes a `Dialog.Close` part).
   - If `@base-ui/react/dialog` doesn't have a `Close` part, the close button is custom — apply `classes?.closeButton` to the custom button's className via twMerge.

5. **NO `<Component>-diff.json`** — signature unchanged.

6. **Document in PR**: list the 3+ confirmed external consumers as proof of preservation.

### Forbidden patterns

- Don't apply Button's `extends Omit<StandardProps, 'classes'>` pattern blindly — Modal isn't structurally Tier 0 for classes.
- Don't drop the `classes?: { closeButton }` declaration — real consumers depend on it.
- Don't add `withClasses` helper.

### Reference

- `decisions/classes-audit.md` §5.4.b / §6 / §8 — Tier 3.b shape.
- Dropdown / OutlinedInput plan files — same structural pattern Modal should follow.
