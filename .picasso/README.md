# `.picasso/` — Picasso Agent Experience rules

Canonical rules that help AI coding agents (Cursor, Claude Code, …) generate
correct application code with the Picasso design system. This is the
single source of truth; consumer repos reference it rather than hand-maintaining
their own copy.

- **`rules.md`** — the rules: how to look up docs, package imports, and mandatory
  usage rules. Kept small; it points to the hosted docs for anything volatile.
- **`CHANGELOG.md`** — what changed between rule versions.

## How docs are served

Component documentation is generated from Picasso's Storybook
(`pnpm generate:llm-docs`) and **served** (not vendored) alongside Storybook on
GitHub Pages:

- Index: <https://toptal.github.io/picasso/llm-docs/llms.txt>
- Per component: `https://toptal.github.io/picasso/llm-docs/components/<name>.md`
- Tutorials: `https://toptal.github.io/picasso/llm-docs/tutorials/<name>.md`

Agents fetch the index, then the specific pages a task needs. This replaces v1's
model of copying the entire ~1 MB doc tree into each consumer repo.

## Adopting in a consumer repo

Point your agent tooling at `rules.md`:

- **Cursor** — reference it from `.cursor/rules/` (or `.cursorrules`).
- **Claude Code** — reference it from `CLAUDE.md` / `AGENTS.md`.

A packaged, versioned distribution (so updates propagate without copy-paste) is
tracked separately ([PF-2003]); until then, reference or copy `rules.md`.

[PF-2003]: https://toptal-core.atlassian.net/browse/PF-2003
