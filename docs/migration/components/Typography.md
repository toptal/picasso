# Typography — migration plan

## Identity
- Path: `packages/base/Typography/`
- Tier: Tier 1 — already-clean (~262 LOC, single Typography component; per migration plan v3 §3.2)
- Track: Modernization (PF-1994)
- `target_path`: `none` (already-clean; peer-dep cleanup + React 19 cap lift only)

## Dependencies
Migration must be applied AFTER:
- (none — Typography is a foundational primitive; many components depend on it, not the other way around)

## Migration scope
- Source is MUI-clean (verified: 0 `@material-ui/*`, 0 JSS).
- `packages/base/Typography/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.
  - Confirm `@toptal/picasso-tailwind-merge` peer-dep listed; confirm `@toptal/picasso-provider` peer-dep stays (Typography reads tokens from the provider's runtime today).
- 262 LOC across one component file plus an `index.ts`. Watch for:
  - The `variant` enum (h1 | h2 | h3 | body1 | body2 | etc.) must stay stable — used widely.
  - Any `useTheme()` import from `@toptal/picasso-provider` (transitive MUI v4) — if present, it should already resolve to Picasso's theme shape, but verify.

## Known gotchas
- Typography is depended on by Note, Form, FormLabel, Checkbox, Radio, and many Tier 2/3 components. **Land Typography first** (or land in the same Tier 1 batch) — downstream components Happo-snapshots will drift if Typography's class names change.
- The `variant` prop maps to font sizes via the Picasso Tailwind preset (`text-md`, `text-lg`, etc.). Keep the mapping faithful — see `tokens/picasso-tailwind-tokens.md` §Font size.
- Watch out: MUI v4's `Typography` accepts a `color` prop with values like `"primary"`, `"secondary"`, `"textPrimary"`. Picasso may have inherited that API. Preserve it; map to Tailwind classes internally.

## Acceptance criteria (component-specific)
- [ ] `variant` enum unchanged.
- [ ] `color` prop (if present) accepts the same string values as before.
- [ ] `packages/base/Typography/package.json` has no `@material-ui/core` entry.
- [ ] Happo: any class-name change is acceptable iff pixel diff is ≤0.5%; >0.5% requires designer sign-off (high bar — Typography drift propagates).

## Reviewer notes
- Typography is the highest-impact Tier 1 component because of downstream Happo cascading. Land it under careful Happo review — the diff isn't just "this component," it's "every component that renders Typography."
- If `useTheme()` is found, that's a sign the migration touches `picasso-provider` internals; flag and consider deferring to PF-2023 (provider rewrite) if non-trivial.

## `classes` handling — drop public surface (audit-verified vestigial)

Cross-tier audit (`decisions/classes-audit.md` §3) flagged Typography's `classes` prop as **vestigial**:
- Source `extends StandardProps` (line 124) — open-ended `classes` inherited.
- Body never reads `classes` (Tailwind-based, no JSS plumbing).
- Internal Picasso callsites: 0.
- External real callsites: 0 (file-level matches were all `<SnackbarProvider classes={...}>` in snapshot files).

### Hypothesis to verify

Drop the public `classes` via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. Zero blast radius.

### Verify per migration (DO this — don't assume)

1. **Source verification**:
   - Open `packages/base/Typography/src/Typography/Typography.tsx`.
   - Confirm `extends StandardProps` (audit says line 124).
   - Confirm no local `classes?: { ... }` declaration.
   - Grep the file for `classes\.|classes\?\.` — confirm zero hits in body.

2. **Internal callsite verification**:
   ```bash
   rg --multiline --multiline-dotall -U '<Typography\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 hits.

3. **Special concern — Typography is foundational**: Many other components render `<Typography>`. None pass `classes={{...}}` to it, but if you find any internal callsite passing `classes` to Typography, that's evidence of legacy MUI v4 reach-through that should be cleaned up alongside this migration.

4. **Action if hypothesis confirmed**:
   ```ts
   export interface Props
     extends Omit<StandardProps, 'classes'>,
             /* other extensions unchanged */ {
     // ...
   }
   ```
   Plus `classes: _classes` runtime destructure backstop.

5. **If hypothesis contradicted**: STOP. Update `classes-audit.md` §3. Don't proceed.

6. **No `<Component>-diff.json`** — vestigial drop, no real change.

### Cascade concern

Typography is rendered by ~10+ downstream components. Dropping its public `classes` type means: any downstream that types `<Typography classes={...}>` gets a TS error. Audit found 0 such internal callsites, but verify with the rg above. Update the audit if you find any.
