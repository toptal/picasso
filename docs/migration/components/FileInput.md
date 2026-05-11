# FileInput — migration plan

## Identity
- Path: `packages/base/FileInput/`
- Tier: Tier 2 — heavy path (custom rewrite, no Base UI primitive)
- Track: Modernization (PF-1994)
- `target_path`: `none` (no file-input primitive in @base-ui/react — build on `<input type="file">` + Tailwind)

## Dependencies
Migration must be applied AFTER:
- Tooltip (FileInput uses Tooltip for hover info)

## Migration scope
- 3 subcomponents:
  - **FileInput** (`packages/base/FileInput/src/FileInput/FileInput.tsx`) — main wrapper
  - **FileList** (`packages/base/FileInput/src/FileList/FileList.tsx`) + styles.ts (1 JSS key: `root`)
  - **FileListItem** (`packages/base/FileInput/src/FileListItem/FileListItem.tsx`) + styles.ts (4 JSS keys: `root`, `label`, `fileNodeContent`, `loader`)
  - **ProgressBar** (`packages/base/FileInput/src/ProgressBar/ProgressBar.tsx`) + styles.ts (3 JSS keys: `progressBar`, `progressIndicator`, `percentageValue`)
- All custom — build on plain `<input type="file">` + Tailwind. No Base UI dependency.
- `packages/base/FileInput/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## Known gotchas
- FileInput's accessibility: the visible button must be the input's label (`<label for="...">`). Don't break keyboard focus.
- Drag-and-drop: existing implementation; preserve drag-over visual state.
- ProgressBar animation: smooth interpolation; uses Tailwind `transition-[width]` post-migration.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] Drag-and-drop still works.
- [ ] Keyboard accessibility preserved.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — verify per sub, likely no-op (audit-verified for FileInput; subs need verification)

Cross-tier audit (`decisions/classes-audit.md` §4, corrected):
- **FileInput**: `extends BaseProps` (line 12) — NOT StandardProps. No local `classes` declaration. **No public `classes` prop**.
- **FileList / ProgressBar / FileListItem**: per-sub verification required. Earlier audit notes suggested StandardProps for FileList + ProgressBar; verify per source.

### Verify per migration (DO this — per subcomponent)

For each of FileInput, FileList, ProgressBar, FileListItem:

1. **Source check**:
   ```bash
   rg -n 'extends ' packages/base/FileInput/src/FileInput/FileInput.tsx packages/base/FileInput/src/FileList/FileList.tsx packages/base/FileInput/src/ProgressBar/ProgressBar.tsx packages/base/FileInput/src/FileListItem/FileListItem.tsx
   ```
   For each: confirm whether `extends StandardProps` (open-ended classes inherited) or `extends BaseProps` (no classes).
   Also `rg -n 'classes\?:' packages/base/FileInput/src/<Sub>/<Sub>.tsx` to check for local narrows.

2. **Internal callsite check** per subcomponent:
   ```bash
   rg --multiline --multiline-dotall -U '<(FileInput|FileList|ProgressBar|FileListItem)\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 hits for all.

3. **External freshness check**:
   ```bash
   gh search code 'FileInput classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```

4. **Action — per sub**:
   - If `extends BaseProps`: **no-op**. No `Omit` needed.
   - If `extends StandardProps` AND body never reads `props.classes` (only JSS-local `useStyles()`): vestigial — `Omit<StandardProps, 'classes'>` drop is safe.
   - If `extends StandardProps` AND body reads `props.classes`: rare for FileInput family; investigate carefully.

5. **Internal JSS rewrite**: each sub-component's JSS-local `classes.X` rewrites to Tailwind classNames during the heavy migration. Not a `classes`-prop concern.

6. **No diff JSON**.
