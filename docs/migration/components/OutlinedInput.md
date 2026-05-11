# OutlinedInput — migration plan

## Identity
- Path: `packages/base/OutlinedInput/`
- Tier: Tier 3 — mixed-state PR (~0.5d effort)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/input + @base-ui/react/field`

## Dependencies
Migration must be applied AFTER: (none — independent within Tier 3)

## Migration scope
- Bundle light-path @mui/base swap + type-only fix in single PR:
  - Replace `@mui/base/Input` with `@base-ui/react/input` + `@base-ui/react/field`.
  - Replace `@mui/base/TextareaAutosize` with own implementation or `react-textarea-autosize` (Picasso's existing dep tree).
  - Replace `import type { InputBaseComponentProps }` (currently inherited via MUI types) with `React.InputHTMLAttributes`.
- `packages/base/OutlinedInput/package.json`: drop `@mui/base` peerDep, lift React 19 cap.

## Known gotchas
- `Textarea` slot composition (lines 56–60): currently uses `@mui/base/Input` with custom `Textarea` slot. Map to @base-ui/react/field with own Textarea wrapper if @base-ui/react doesn't ship one.
- `InputAdornment` is from `@toptal/picasso-input-adornment` (sibling Picasso package). Keep — no migration churn.
- `ResetButton` internal helper (line 23). Preserve verbatim.
- `inputProps` prop: pass-through to underlying `<input>`. Verify Mui's `InputBaseComponentProps` was mostly `React.InputHTMLAttributes` plus a few MUI types — drop the MUI extras.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` AND zero `@mui/base` imports in `src/**`.
- [ ] `multiline` + `rowsMax` + `rowsMin` props still work (TextareaAutosize path).
- [ ] `endAdornment` / `startAdornment` rendering preserved.
- [ ] `error` state visual styling unchanged.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — KEEP narrowed surface (audit-verified used externally)

Cross-tier audit (`decisions/classes-audit.md` §5) found:
- Source `extends StandardProps` (line 37) AND declares LOCAL `classes?: { input?: string; root?: string }` in `types.ts:43`. Local narrow overrides the open-ended inherited type.
- Body reads `classes?.root` (OutlinedInput.tsx:178) and `classes?.input` (OutlinedInput.tsx:185) — both slots actively consumed via `twMerge`.
- Internal callsites passing `<OutlinedInput classes={{...}}>`: 0 (consumes own classes).
- **External real callsites: 4 confirmed** — topteam-frontend `ExtendableInput.tsx` (`root` + `input`), `ButtonedSelect.tsx` (`root`), `GlobalSearchInputSmallScreen.tsx` (`input`), `GlobalSearchDesktop.tsx` (`input`).

### Hypothesis to verify

**KEEP** the locally narrowed `classes?: { input?, root? }` surface unchanged. The narrow already correctly maps to the underlying input element's slot structure — post-migration, `root` → `<Field.Root className>`-or-wrapper, `input` → `<Input className>`.

### Verify per migration (DO this)

1. **Source verification**:
   - Open `packages/base/OutlinedInput/src/OutlinedInput/types.ts`. Confirm `classes?: { input?: string; root?: string }` declaration on line 43.
   - Open `packages/base/OutlinedInput/src/OutlinedInput/OutlinedInput.tsx`. Confirm body uses `twMerge(rootClassName, classes?.root, className)` (audit says line 178) and `classes?.input` (line 185).
   - If either is missing, STOP — audit is stale.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<OutlinedInput\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 (component consumes its own classes via twMerge).

3. **External freshness check** (CRITICAL — Tier 3.b):
   ```bash
   gh search code 'OutlinedInput classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect each `textMatches[].fragment` manually. Audit confirms 4 real callsites — verify and report any new ones. If new external callsites surface that use slots OTHER than `input`/`root`, widening the shape may be required — escalate.

4. **Action**:
   - **KEEP** the public type: `classes?: { input?: string; root?: string }`.
   - `extends Omit<StandardProps, 'classes'>` to drop the open-ended inherited type while keeping the local narrow.
   - Inside the body, preserve the `twMerge(rootClass, classes?.root)` / `twMerge(inputClass, classes?.input)` pattern. Apply on the new @base-ui/react/input parts.

5. **NO `<Component>-diff.json`** for `classes` (signature unchanged).

6. **Document in PR**: list the 4 confirmed external consumers as proof of preservation.
