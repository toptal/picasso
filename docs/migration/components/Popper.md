# Popper — migration plan

## Identity
- Path: `packages/base/Popper/`
- Tier: Tier 2 — heavy path
- Track: Modernization (PF-1994)
- `target_path`: `@floating-ui/react` (decision LOCKED — see `decisions/popper-replacement.md`)

## Dependencies
Migration must be applied AFTER: (none — independent within Tier 2)

Migration is a DEPENDENCY of: Dropdown.

## Migration scope
- Replace MUI v4 `Popper` with `@floating-ui/react` (no `Popper` primitive in @base-ui/react — direct dependency lands; `@floating-ui/react` is already transitive via @base-ui/react).
- Picasso's Popper currently has no JSS — already Tailwind/Material wrapper.
- `packages/base/Popper/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap. Add `@floating-ui/react` as direct dep.

## Known gotchas
- API parity: Picasso's Popper exposes `placement`, `anchorEl`, `open`, `keepMounted`, `disablePortal`, `popperOptions` props. Map each to `@floating-ui/react`'s `useFloating()` API:
  - `placement` → `useFloating({ placement })`
  - `anchorEl` → `refs.setReference(anchorEl)`
  - `open` → conditional render
  - `keepMounted` → render always with `visibility: hidden` when closed
  - `disablePortal` → conditional FloatingPortal
- `popperOptions` (`popper.js` types): drop this prop or map to floating-ui's middleware. Coordinate with consumers via diff JSON if breaking.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] No `popper.js` types referenced (replace with `@floating-ui/react` types).
- [ ] Existing consumer code (Dropdown, OutlinedInput, Modal) continues to work.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — no-op (audit-verified, no public classes prop)

Cross-tier audit (`decisions/classes-audit.md` §4, corrected) verified:
- Popper `extends BaseProps` (line 27) — NOT StandardProps.
- No local `classes?: { ... }` declaration.
- No `styles.ts` with JSS — pure Tailwind component.
- Internal callsites passing `<Popper classes={{...}}>`: 0.
- External real callsites: 0.

### Verify per migration (DO this)

1. **Source check**:
   - `extends BaseProps` (line 27)? Confirm.
   - No local `classes?:` declaration? Confirm.
   - No `styles.ts`? Confirm.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Popper\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0.

3. **External freshness check**:
   ```bash
   gh search code 'Popper classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments — most hits likely coincidental.

4. **Action**: **no-op for the public `classes` prop**.

5. **If source state contradicts** (e.g. someone added a local `classes` declaration or switched to StandardProps): STOP, update audit.

### Forbidden

- Don't add `Omit<StandardProps, 'classes'>` — Popper doesn't extend StandardProps.
- Don't add a public `classes` prop.
