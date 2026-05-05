# Button — migration plan

## Identity
- Path: `packages/base/Button/`
- Tier: Tier 0 — light path, **calibration anchor** (per migration plan v3 §3.1; PR #4906)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/button`

## Dependencies
Migration must be applied AFTER:
- (none — Button is independent within Tier 0)

## Migration scope
Per migration plan v3 §3.1: direct `@mui/base/Button` → `@base-ui/react/button` swap. Tailwind already in place via `cx` + `twMerge` (helper-function pattern in `styles.ts`).

- Replace `import { Button } from '@mui/base/Button'` (or similar) with `import { Button } from '@base-ui/react/button'`.
- API alignment per `rules/base-ui-react-api-crib.md` — `@base-ui/react/button` is largely API-compatible with `@mui/base/Button`. Watch for the `slots` / `slotProps` shape; `@base-ui/react` uses the `render` prop pattern instead.
- `packages/base/Button/package.json`:
  - Remove `@mui/base` from `dependencies`.
  - Add `@base-ui/react: 1.4.1` (or matching pinned version).
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- **PR #4906 is the canary.** [Status (May 2026)](../ORCHESTRATOR.md#references): OPEN, on `@base-ui/react: 1.2.0`. If #4906 merges before this entry runs through the orchestrator, the orchestrator should detect that work is already done (manifest pre-fills `pr` with #4906's URL) and either fast-forward to `status=done` or run a no-op pass to verify the merge state. Coordinate with PR #4906 author before scaling.
- Button is depended on by query-builder (Tier 4) and several base/* composites. Class-name churn here cascades.
- Picasso's `Button` uses helper functions in `styles.ts` returning `string[]` (canonical reference pattern). Don't rewrite those — preserve the existing Tailwind class composition.
- `ButtonBase` (sibling subcomponent in `packages/base/Button/src/ButtonBase/`) is also touched in PR #4906. Migrate together.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Public prop surface unchanged (covered by snapshot tests).
- [ ] Happo: 0 pixel diff (Button is the calibration anchor; if it diffs, the migration approach has a bug).
- [ ] Reference files re-introduced under `docs/migration/reference/` per [`ORCHESTRATOR.md` References](../ORCHESTRATOR.md#references) policy once Button lands.

## Reviewer notes
- Light-path multipliers are calibrated against Button + Switch (PR #4906 pair). After Button + Switch + ~2 more Tier 0 components ship, recalibrate per migration plan §10 R12.
- If PR #4906 is still open when this entry's turn arrives, **defer** to that PR rather than racing it. Update the manifest `notes` field to reflect coordination state.
