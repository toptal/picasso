# Backdrop — migration plan

## Identity
- Path: `packages/base/Backdrop/`
- Tier: Tier 0 — light path, but **special case** (no standalone `@base-ui/react` analog; per migration plan v3 §3.1 + R14)
- Track: Modernization (PF-1994)
- `target_path`: `none` (custom `<div>` + scroll-lock + Tailwind per [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md))

## Dependencies
Migration must be applied AFTER:
- (none — Backdrop is the leaf within Tier 0)

**Sequence first within Tier 0** — Modal + Drawer both depend on Backdrop. See migration plan §3.7 ordering.

## Migration scope
Per migration plan v3 §3.1 (Tier 0 table) + §9.8 R14: `@base-ui/react` does **not** ship a standalone Backdrop primitive — only `Dialog.Backdrop` (internal to Dialog/AlertDialog/Drawer). Picasso's standalone Backdrop becomes a small custom component.

- Drop `@mui/base/Modal` (current source uses `ModalBackdropSlotProps`) import.
- Replace with a small custom implementation:
  - `<div>` rendered into a portal (use `react-dom/createPortal` directly, or share Picasso's existing portal helper).
  - Scroll-lock on `body` while open (small `useEffect` toggling `body.style.overflow`).
  - Tailwind classes for the dim overlay (`fixed inset-0 bg-black/50 z-modal` or per-Picasso semantics).
- See [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md) for the agreed approach + alternative options for context.
- `packages/base/Backdrop/package.json`:
  - Drop `@mui/base` from `dependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- **Modal + Drawer (both Tier 0) depend on Backdrop's public render output.** Class-name churn in Backdrop will Happo-shift Modal + Drawer transitively. Re-record those baselines after Backdrop merges.
- The `z-modal` Picasso Tailwind token is `1300` — keep it.
- Picasso's existing Backdrop may accept an `onClick` to close — preserve that. The decision doc covers it.
- Don't reach for `@floating-ui/react` here — Backdrop is just an overlay, not a positioned element. Positioning logic is in Modal/Drawer/Dialog consumers.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**` and zero in `package.json`.
- [ ] Approach matches `decisions/backdrop-replacement.md` (custom `<div>` + scroll-lock + Tailwind).
- [ ] Modal + Drawer Happo baselines re-recorded after Backdrop merges (unblocks downstream Tier 0).
- [ ] `bg-black/50` (or Picasso-equivalent) opacity matches the pre-migration look (designer Happo review).

## Reviewer notes
- This is the Tier 0 component most likely to need designer + engineer pairing. The replacement strategy is small (~30 LOC) but the Happo cascade through Modal/Drawer is real.
- If `@base-ui/react` ships a standalone Backdrop in a future minor (v1.5+), revisit per `rules/base-ui-react-api-crib.md` refresh checklist.

## Slot keys

**Not applicable.** Per the May 2026 audit, Backdrop does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.

Implementation note: per `decisions/backdrop-replacement.md`, Backdrop is a custom `<div>` + Tailwind + scroll-lock (no `@base-ui/react` analog).
