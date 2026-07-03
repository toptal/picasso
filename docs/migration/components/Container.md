# Container — migration plan

## Identity
- Path: `packages/base/Container/`
- Tier: Tier 1 — type-only fix (per migration plan v3 §3.2; ~0.1d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (no `@base-ui/react` Container; pure layout wrapper, stays custom)

## Dependencies
Migration must be applied AFTER:
- (none — pure layout primitive)

## Migration scope
Per migration plan v3 §3.2 + audit §1.4: **single MUI v4 type import**, no JSS, no runtime MUI usage.

- One MUI v4 type import remains in source:
  - `packages/base/Container/src/Container/Container.tsx` — `import type { PropTypes } from '@material-ui/core'`
- Replace with `React.HTMLAttributes` or a Picasso-native type. `PropTypes` is MUI v4's namespace export carrying enums like `PropTypes.Color`; Container almost certainly uses it for one specific value (likely a `color` prop). Trim to the literal union actually consumed.
- `packages/base/Container/package.json`:
  - Drop `@material-ui/core` from `peerDependencies`.
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- `PropTypes` from `@material-ui/core` is a namespace export — when the agent removes it, ensure no other file in the package references `PropTypes.<X>` (that would be a transitive use that gets missed).
- Pure layout wrapper — no Happo drift expected if the public render output is unchanged.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports (including `import type`) in `src/**`.
- [ ] `packages/base/Container/package.json` has no `@material-ui/core` entry.

## Reviewer notes
- One of 5 type-only fixes in the Tier 1 batch (Container, FormLabel, Grid, Notification, OutlinedInput). Pattern is the same: replace MUI-leaked type with own type or React's built-in. Watch for `classes` props that might leak from MUI v4's `StandardProps` extension.

## `classes` handling — drop public surface (audit-verified vestigial)

Cross-tier audit (`decisions/classes-audit.md` §3) flagged Container's `classes` prop as **vestigial**:
- Source `extends StandardProps` (line 23) — open-ended `classes` inherited from `JssProps`.
- Body never reads `classes` (component is already Tailwind-based; no JSS plumbing).
- Internal Picasso callsites: 0.
- External real callsites (gh search + manual textMatches inspection): 0.

### Hypothesis to verify

Drop the public `classes` via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. Zero blast radius.

### Verify per migration (DO this — don't assume)

1. **Source verification**:
   - Open `packages/base/Container/src/Container/Container.tsx`.
   - Confirm `extends StandardProps` is still present (audit says line 23).
   - Confirm `classes` is NOT declared locally (no `classes?: { ... }` override anywhere in the Props interface).
   - Grep the file for `classes\.|classes\?\.` access — confirm zero hits in the component body.

2. **Internal callsite verification**:
   ```bash
   rg --multiline --multiline-dotall -U '<Container\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 hits. If any hit appears, document it and reconsider.

3. **Action if hypothesis confirmed**:
   ```ts
   export interface Props
     extends Omit<StandardProps, 'classes'>,    // ← Omit classes
             /* other extensions unchanged */ {
     // ... your props unchanged (no `classes`) ...
   }
   ```
   Plus runtime backstop in component body:
   ```ts
   const {
     /* ... your destructured props ... */
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     classes: _classes,
     ...rest
   } = props
   ```

4. **If hypothesis contradicted** (you find `classes.X` accessed, or a local narrow, or internal callsites): **STOP**. Update `decisions/classes-audit.md` §3 with the new finding. Don't proceed unilaterally.

5. **No `<Component>-diff.json`** — the prop was vestigial; no real behavioral change to document.
