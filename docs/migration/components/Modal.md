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
