# Note — migration plan

## Identity
- Path: `packages/base/Note/`
- Tier: Tier 1 — already-clean (~133 LOC across 5 files; per migration plan v3 §3.2)
- Track: Modernization (PF-1994); **sandbox canary for PF-1992 orchestrator validation**
- `target_path`: `none` (already-clean; peer-dep cleanup + React 19 cap lift only)

## Dependencies
Migration must be applied AFTER:
- Typography (`@toptal/picasso-typography` — used by NoteContent and NoteSubtitle internally)

(Typography is itself Tier 1; both can run in parallel under the orchestrator's `--tier=1` mode.)

## Migration scope
- Source is already MUI-clean (zero `@material-ui/*` imports, zero JSS). Verified via grep at PF-1992 time.
- `packages/base/Note/package.json`:
  - Drop `"@material-ui/core": "4.12.4"` from `peerDependencies`.
  - Lift the React peer-dep cap: `"react": ">=16.12.0 < 19.0.0"` → `"react": ">=16.12.0"`.
- No source edits expected.

## Known gotchas
- Note has 5 subcomponents (Note, NoteCompound, NoteContent, NoteSubtitle, NoteTitle) — Happo coverage spans all of them; verify each story in `story/` still renders identically.
- `NoteContent` and `NoteSubtitle` consume `<Typography>` internally. If Typography migration regenerates class names, Note's snapshots may drift transitively. Re-record Happo on Note's stories after Typography lands.
- `data-testid` selectors used in active repos (search across consumer apps before any prop changes).

## Acceptance criteria (component-specific)
- [ ] All Note stories in Storybook render pixel-identical (Happo).
- [ ] `packages/base/Note/package.json` has no `@material-ui/core` entry.
- [ ] Note's React peer-dep accepts React 19 (`>=16.12.0`).
- [ ] `bin/migration-diff.sh Note` reports: empty prop diff, empty import diff, package.json delta only.

## Reviewer notes
- **This component is the PF-1992 orchestrator sandbox.** The intentionally minimal source-diff is the design — this run validates the orchestrator's wiring (worktree, gates, PR open, CI poll, manual review handoff), not the migration logic itself. The first *real* source migration happens on FormLabel (1 type import) or Utils (5 imports + 4 JSS calls) under PF-1994.
- After PF-1992 ships, Note converts to a normal Tier 1 component in PF-1994's queue.

## Slot keys

**Not applicable.** Per the May 2026 audit, Note does not currently expose a `classes` prop in its public Props (neither directly nor via `StandardProps`). The migration is a clean swap; do not add `withClasses`. Adding it would be net-new API, not preservation. See `decisions/classes-shim.md` for the strict-preservation policy.

Implementation note: Tier 1 already-clean (the orchestrator sandbox component); migration is package.json delta only.
