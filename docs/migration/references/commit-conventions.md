# Commit conventions

The orchestrator follows Picasso's existing commit style. Keep messages concise; the diff carries the detail.

## Format

```
<type>(<scope>): <subject>

<body, optional>

<footer, optional>
```

## Types

| Type | When to use |
|---|---|
| `migrate` | Component migration — the canonical type for autonomous runs. |
| `fix`     | Bug fix discovered during migration (PR feedback applied, gate failure repair). |
| `chore`   | Tooling / dep cleanup that isn't a migration outcome (e.g. lifting React peer cap on its own). |
| `docs`    | Documentation only (no code). |
| `refactor` | Internal restructuring with no behavior change. |
| `test`    | Test-only changes (rare during migration; test changes usually accompany a `migrate`). |

## Scope

- For `packages/base/<Name>` migrations: scope is the component name in PascalCase. `migrate(Note): ...`.
- For sibling packages: scope includes the package short-name. `migrate(charts/LineChart): ...`, `migrate(query-builder/AutoComplete): ...`.
- For repo-wide changes: scope is `picasso` or omitted.

## Subject

- Imperative mood, present tense: "migrate", not "migrated" or "migrates".
- Lowercase first word.
- No trailing period.
- ≤72 chars.

## Examples

Migration commit (the canonical autonomous-run shape):

```
migrate(Note): drop @material-ui/core peer-dep, lift React 19 cap

Source is already MUI-clean (Phase 0 carry-over). This commit removes
the vestigial peer-dep and unblocks React 19 testing for downstream
consumers.

Refs: PF-1994
```

Migration with codemod ref:

```
migrate(FormLabel): replace @material-ui/core type import with local

FormControlLabelProps was leaked from MUI v4. Replaced with a
Picasso-native shape; consumer-facing breaking change covered by
codemod v53.0.0/form-label-classes.

Refs: PF-1994
```

Fix during review:

```
fix(Note): preserve data-testid on NoteCompound

Reviewer flagged that consumer tests in toptal/staff-portal assert on
data-testid. Restored the attribute that was lost in the package.json
cleanup commit.
```

CI repair:

```
fix(Utils): pin @mui/base to 5.0.0-beta.58 to unbreak Cypress

@mui/base@5.0.0-beta.59 published a breaking change in
ClickAwayListener. Pinning until the upstream API stabilizes.
```

## Footers

- `Refs: PF-1994` — link the autonomous-run ticket. Required for `migrate` commits.
- `Closes: PF-####` — only on the final PR commit when the ticket fully closes.
- `BREAKING CHANGE: <description>` — on commits that change the public API; pairs with a codemod entry.

## What the orchestrator emits

```
migrate(<id>): <one-line summary built from the diff report>

<empty line>

<2–4 line summary of what changed: imports removed, JSS converted, package.json delta>

<empty line>

Refs: PF-1994
Run-log: migration-runs/<date>/<id>/agent.<iter>.log
```

The orchestrator's `workflow.commitMessage(id)` hook in `bin/migration-orchestrator.ts` is the source of truth for migration-workflow commits.

## What humans should write

When applying review feedback by hand, follow the same format. The orchestrator detects manual commits (no `Run-log:` footer) and treats them as a "human took over" signal — the manifest updates to `status=needs_human` if the orchestrator's iteration cap was already hit.
