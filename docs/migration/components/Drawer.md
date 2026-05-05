# Drawer — migration plan

## Identity
- Path: `packages/base/Drawer/`
- Tier: Tier 0 — light path (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/drawer`

## Dependencies
Migration must be applied AFTER:
- **Backdrop** (Tier 0) — Drawer composes Backdrop for the dim overlay; Drawer's migration must follow Backdrop's

## Migration scope
Per migration plan v3 §3.1: direct match — `@base-ui/react` newly ships a Drawer primitive (with built-in swipe-to-dismiss).

- Replace `@mui/base/Modal` import (current Drawer source uses Modal as the dialog primitive backing).
- Migrate to `@base-ui/react/drawer`'s compound parts:
  - `Drawer.Root` + `Drawer.Trigger` + `Drawer.Portal` + `Drawer.Backdrop` + `Drawer.Popup` + `Drawer.Title` + `Drawer.Description` (per `@base-ui/react` v1.4.1 API; verify against `rules/base-ui-react-api-crib.md`).
- Tailwind class composition stays as-is.
- `packages/base/Drawer/package.json`:
  - Remove `@material-ui/core` from `dependencies` (Drawer carries this per audit §1.4) AND `@mui/base`.
  - Add `@base-ui/react`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Drawer audit (§1.4) shows `pkg-mui ✓` AND `pkg-@mui/base ✓` — both deps must drop. Verify before submitting.
- `@base-ui/react/drawer` ships **swipe-to-dismiss** out of the box. If Picasso's existing API exposes a swipe disable toggle, preserve it; otherwise, document the new behavior in the PR description.
- `data-state="open"` / `data-state="closed"` on `Drawer.Popup` drives mount/unmount transitions — Picasso's existing transition CSS likely needs to convert to `data-[state=open]:translate-x-0` (or per side) Tailwind variants.
- Drawer integrates with Picasso's NotificationsProvider in some flows — check `picasso-provider` callsites for `Drawer.Backdrop` usage.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` and zero `@material-ui/*` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Drawer Happo baselines re-recorded post-Backdrop migration; pixel diff ≤0.5%.
- [ ] Swipe-to-dismiss either preserved or feature-flagged off if Picasso intends to keep the existing close-on-backdrop-only behavior.

## Reviewer notes
- Drawer is the more complex Tier 0 component (after Modal). It ships swipe-to-dismiss new — flag that to the design + product reviewers before approval.
- Sibling: Modal (Tier 0) shares the dialog-primitive backing. Migrate Drawer + Modal in close succession after Backdrop lands.
