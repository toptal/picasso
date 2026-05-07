# Badge — migration plan

## Identity
- Path: `packages/base/Badge/`
- Tier: Tier 0 — light path, **already mostly custom** (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `none` (no `@base-ui/react` Badge; plain `<span>` + Tailwind)

## Dependencies
Migration must be applied AFTER:
- (none — Badge is independent within Tier 0)

## Migration scope
Per migration plan v3 §3.1 + audit §1.4: source has 1 `@mui/base` import (`Badge as MuiBadge`); no JSS, no MUI v4. Per §9.9, Badge has no `@base-ui/react` equivalent — strategy is to **keep custom** (plain `<span>` + Tailwind, which Picasso largely already does).

- Drop the `@mui/base` import; replace any `<MuiBadge>` usage with a plain `<span>` styled via Tailwind (inline or via `cx`).
- Tailwind class composition (`cx`/`twMerge`) stays as-is.
- `packages/base/Badge/package.json`:
  - Drop `@mui/base` from `dependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- Badge's API surface is small (count + variant + dot). Make sure the `count` prop's positioning logic (top-right offset, etc.) survives the swap.
- Already mostly Tailwind — the migration is genuinely minimal. Light path applies cleanly.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `packages/base/Badge/package.json` has no `@mui/base` entry.
- [ ] Visual parity (Happo) — Badge's positioning + colors unchanged.
- [ ] Public prop surface unchanged.

## Reviewer notes
- Lowest-risk Tier 0 component. Good early candidate after Backdrop ships.

## Slot keys

**Not applicable.** Per the May 2026 audit, Badge does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.
