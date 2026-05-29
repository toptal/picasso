# Dropdown — migration plan

## Identity
- Path: `packages/base/Dropdown/`
- Tier: Tier 3 — heavy composite, mixed-state PR
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/menu + @base-ui/react/popover`

## Dependencies
Migration must be applied AFTER:
- Popper (Dropdown uses Popper for positioning; replaced by @base-ui/react's positioner OR @floating-ui/react via Popper migration)

## Migration scope
- Single PR covers @mui/base portion (the `ClickAwayListener` import at line 16) + the `@material-ui/core/Grow` transition replacement at line 3.
- Replace `<Grow>` transition with CSS `data-starting-style` / `data-ending-style` transitions (@base-ui/react native pattern) OR keep custom CSS keyframes.
- Replace `@mui/base/ClickAwayListener` with @base-ui/react's dismiss handling (built into `Popover.Root` etc.) OR a small custom hook.
- Use `@base-ui/react/menu` for command-pattern dropdowns and `@base-ui/react/popover` for content-pattern dropdowns. Decision per use case.
- `packages/base/Dropdown/package.json`: drop `@material-ui/core` + `@mui/base` peerDeps, lift React 19 cap.

## Known gotchas
- `popperProps`, `popperOptions`, `popperContainer` props pass through to underlying Popper — map to @base-ui/react's `Popover.Positioner` props.
- Click-away behavior: distinguish "click outside" from "click on backdrop" — @base-ui/react handles both via `Popover.Root.dismissible` / `closeOnOutsideClick`.
- Auto-focus first item: existing `disableAutoFocus` prop. @base-ui/react/menu auto-focuses by default; map the inverse.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` AND zero `@mui/base` imports in `src/**`.
- [ ] Click-away closing works (Cypress dropdown-dismiss spec).
- [ ] `keepMounted` prop preserved.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — KEEP narrowed surface (audit-verified used externally)

Cross-tier audit (`decisions/classes-audit.md` §5) found:
- Source `extends StandardProps` (line 31) AND declares LOCAL `classes?: { popper?: string; content?: string }` (line 60). The local declaration narrows the inherited open-ended type to exactly two slots.
- Body reads `externalClasses?.popper` (line 282) and `externalClasses?.content` (line 317) — both slots are actively consumed.
- Internal callsites passing `<Dropdown classes={{...}}>`: 4+ in Page subcomponents (PageHamburger, PageTopBarMenu, SidebarItemCompact, ...) — all using `popper` and/or `content`.
- **External real callsites: 2 confirmed** — staff-portal `TypeSelect.tsx` (uses `content`) + topcall-desktop `Menu.tsx` (uses `popper`).

### Hypothesis to verify

**KEEP** the locally narrowed `classes?: { popper?, content? }` surface unchanged. Port slot-routing to @base-ui/react part-level `className`:
- `classes?.popper` → `<Popover.Positioner className={twMerge(base.popper, classes?.popper)}>`
- `classes?.content` → `<Popover.Popup className={twMerge(base.content, classes?.content)}>`

### Verify per migration (DO this)

1. **Source verification**:
   - Open `packages/base/Dropdown/src/Dropdown/Dropdown.tsx`.
   - Confirm `extends StandardProps` AND local `classes?: { popper?: string; content?: string }` (audit says lines 31 + 60).
   - Confirm body reads `externalClasses?.popper` and `externalClasses?.content` (audit says lines 282 + 317).
   - If the local narrow is missing or the body doesn't read these slots, STOP — audit is stale.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<Dropdown\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 4+ hits in Page subcomponents (PageHamburger, PageTopBarMenu, SidebarItemCompact, SidebarItemAccordion).

3. **External freshness check** (CRITICAL — this is Tier 3.b, real consumers depend on the surface):
   ```bash
   gh search code 'Dropdown classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect each `textMatches[].fragment` manually. Audit confirms 2 real callsites — verify and report any new ones. If new external callsites surface that use slots OTHER than `popper`/`content`, you may need to widen the narrow shape — escalate the decision.

4. **Action**: 
   - **KEEP** the public type signature: `classes?: { popper?: string; content?: string }`.
   - Optionally also `extends Omit<StandardProps, 'classes'>` to drop the inherited open-ended type (defense — TypeScript already narrows because local wins, but Omit makes intent explicit). Reference: PROMPT-heavy.md §5 Pattern B.
   - Inside the body, use `twMerge(base.popper, classes?.popper)` / `twMerge(base.content, classes?.content)` on the corresponding @base-ui/react parts.

5. **NO `<Component>-diff.json`** for the `classes` surface (no API change — same slot vocabulary, same shape).

6. **Document in PR**: the migration preserves Dropdown's `classes` API exactly. List the 2 confirmed external consumers in the PR description as proof.
