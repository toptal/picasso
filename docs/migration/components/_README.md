# Per-component plan template

Every component in `manifest.json` gets a plan file at `components/<Name>.md`. The orchestrator feeds this file to the agent alongside the path-specific prompt (`PROMPT-light.md` for Tier 0, `PROMPT-heavy.md` for Tier 1+) and the rule docs. **Keep it short** — ~30–50 lines. The agent already has the rules and per-Picasso target table; this file carries only what's component-specific.

## Required sections

```markdown
# <Component> — migration plan

## Identity
- Path: `packages/base/<Name>/` (or `packages/<sibling-pkg>/` for Tier 4)
- Tier: Tier <0|1|2|3|4|5> — <one-line tier description>
- Track: <Modernization (PF-XXXX) | Sibling (PF-XXXX)>
- `target_path`: <e.g. `@base-ui/react/tooltip` | `none` | `decision-pending`>

## Dependencies
Migration must be applied AFTER:
- <Component A> (<reason — e.g. referenced via `<A>` in render>)

## Migration scope
- <bullet list: which files have what kind of work>
- <e.g. "Replace `@material-ui/core/<X>` with `@base-ui/react/<x>`">
- <e.g. "Replace `@mui/base/<X>` import with `@base-ui/react/<x>`">  ← Tier 0 light path
- <e.g. "Drop `@material-ui/core` from peerDependencies, lift React peer cap">

## Known gotchas
- <component-specific traps the agent should know about>
- <e.g. "useStyles uses `theme.palette.note` — Picasso Tailwind equivalent is `bg-yellow-50` / `border-yellow-300`">
- <e.g. "data-testid selectors used in 4 active repos — preserve exactly">

## Acceptance criteria (component-specific)
- [ ] <anything beyond the global per-component DoD>
- [ ] <e.g. "All 4 stories in Storybook render identically (Happo)">

## Reviewer notes
- <preferences from human reviewers, sticky notes, "watch out for...">
- <e.g. "Vedran prefers `iconStart` over `startIcon` even though MUI v5 convention does">
```

## Authoring tips

1. **Identity** — copy from `manifest.json`. The tier is the determining factor for path selection (Tier 0 → light prompt; everything else → heavy prompt). `target_path` is sourced from `rules/base-ui-react-api-crib.md`.
2. **Dependencies** — read `package.json` `dependencies` and source-level imports. List only **other migration-unit** dependencies (other base/* components or sibling packages), not Tailwind / provider infrastructure.
3. **Migration scope** — the *what*, not the *how*. The how is in the prompt + `rules/` + `tokens/`.
4. **Known gotchas** — the *non-obvious*. Things you'd flag in a code review. If a section is empty, delete it (don't write "None").
5. **Acceptance criteria** — only **additions** to the global per-component DoD (Happo pixel-perfect, Jest + Cypress green, React 19 smoke, no MUI v4, no `@mui/base`, peer-dep removed). Do not restate the global DoD.
6. **Reviewer notes** — capture human-flagged preferences. These outweigh framework conventions.

## Path-aware authoring

The orchestrator selects the prompt based on the component's tier (`workflow.promptFor(item)` in `bin/migration-orchestrator.ts`):

- **Tier 0** (light) — `PROMPT-light.md`. Component already on `@mui/base`; package swap + API alignment to `@base-ui/react`. Tailwind already in place.
- **Tier 1, 2, 3, 4, 5** (heavy) — `PROMPT-heavy.md`. Full rewrite from MUI v4 + JSS to `@base-ui/react` + Tailwind. (Tier 1 cleanup-only fixes use the same prompt — the rewrite scope is just minimal.)

Per-component plans don't need to restate the prompt logic; the agent reads the prompt itself. Per-component plans capture **delta from the canonical prompt**.

## Worked example: Note

See [`Note.md`](./Note.md) — used as the orchestrator sandbox in PF-1992. Note's source is already MUI-clean, so the migration scope is intentionally minimal (peer-dep + React cap). The plan still exercises the orchestrator end-to-end via the heavy prompt.

## Tier 0 set (committed in PF-1992)

Light path. `@mui/base` → `@base-ui/react` package swap. Tailwind already in place.

- [Backdrop](./Backdrop.md) — first within Tier 0 (Modal + Drawer depend on it)
- [Badge](./Badge.md)
- [Button](./Button.md) — PR #4906 reference
- [Drawer](./Drawer.md)
- [Modal](./Modal.md)
- [Slider](./Slider.md)
- [Switch](./Switch.md) — depends on FormLabel (Tier 1)
- [Tabs](./Tabs.md)

## Tier 1 set (committed in PF-1992)

Cleanup-only. Peer-dep cleanup + React 19 cap lift + type-only fixes + small re-export rewrite.

- [Form](./Form.md) — already-clean
- [FormLayout](./FormLayout.md) — already-clean
- [ModalContext](./ModalContext.md) — already-clean
- [Note](./Note.md) — already-clean; **orchestrator sandbox**
- [Typography](./Typography.md) — already-clean; foundational
- [Container](./Container.md) — type-only fix
- [FormLabel](./FormLabel.md) — type-only fix; Switch + Checkbox + Radio block on this
- [Grid](./Grid.md) — type-only fix
- [Notification](./Notification.md) — type-only fix; keep `notistack`
- [Menu](./Menu.md) — pkg.json cleanup only
- [Utils](./Utils.md) — small re-export rewrite

## Tier 2 / 3 / 4 / 5 (deferred to their tickets)

Plans for Tier 2 (PF-2024), Tier 3 (PF-2025), Tier 4 sibling packages (PF-2020/2021/2022), and Tier 5 provider (PF-2023) ship with those tickets. The manifest has them seeded with `status: queued` and explicit `depends_on` so the orchestrator gates them until upstream tiers complete.
