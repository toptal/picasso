@AGENTS.md

# Picasso — Claude Code working notes

Active program: **PI-4318 (Picasso Modernization + AI Developer Experience)**.
Planning docs: `docs/modernization/`

- Effort estimates: `PI-4318-estimates_final.md`
- Calendar: `PI-4318-timeline_final.md`
- Tickets by track: `PI-4318-tickets-by-track_final.md`
- Migration plan deep dive: `PI-4318-P1-MOD-01-migration-plan.md`
- AI leverage spec (orchestrator design): `PI-4318-ai-leverage-tickets.md`

Active migration tooling: `docs/migration/`
- Orchestrator runbook: `docs/migration/ORCHESTRATOR.md`
- Operational migration plan: `docs/migration/migration-plan.md`
- Run: `yarn orchestrate --component=<Name>` (or `--tier=N`, `--dry-run`, `--no-merge`)

## Code style for orchestrator (`bin/lib/*.ts` and `bin/*.ts`)

Picasso's ESLint config (root `.eslintrc.js`) extends `@toptal/davinci-syntax` and adds `ssr-friendly` + `eslint-plugin-local-rules`. CI's "Static checks" job lints the WHOLE repo (`yarn eslint --ext=.ts,.tsx,.js,.jsx .`), so any error in `bin/lib/*.ts` blocks the migration PR's CI.

Rules I have personally hit while editing the orchestrator:

- **`no-empty`**: empty blocks fail. `try { ... } catch {}` is wrong — use `catch { /* ignore */ }` or `catch (_err) {}`.
- **`no-control-regex`**: regex literals containing control chars (e.g. `` for ANSI escape) need an `// eslint-disable-next-line no-control-regex` comment.
- **`max-statements-per-line`**: only one statement per line. Avoid `try { x() } catch {}` on one line.
- **`padding-line-between-statements`** + **`jest-formatting/padding-around-all`**: blank lines required around return, const-after-statement, expect blocks, etc.
- **`max-statements`** / **`complexity`**: arrow-function/method complexity capped (~20/10 default).
- **`func-style`**: prefer expressions over declarations in some contexts.

Before declaring orchestrator changes done, ALWAYS run:

```bash
yarn eslint --ext=.ts bin/lib/<edited-files>.ts
```

ESLint scoped to bin/lib runs in <2s. Don't ship orchestrator code that fails this. Local migration runs scope lint to the migrating package's src so they don't catch orchestrator-level violations — the safety net is CI, but failing CI on orchestrator-side lint blocks every migration PR until fixed (we hit this in PR #4943 with empty `catch {}` in `orchestrator-core.ts`).

## Branch hygiene

- **Active orchestrator branch**: `feature/pf-1992-migration-orchestrator` (renamed from `pf-1992-migration-orchestrator` 2026-05-07 — `feature/` prefix triggers Picasso's CI workflow)
- **Migration PR target**: `feature/pf-1992-migration-orchestrator` itself — migration worktrees fork from + target this branch so PR diffs are clean (only migration changes, not orchestrator commits)
- **Eventual merge target**: this branch as a whole rolls up into `feature/picasso-modernization` or master after all 28 migrations land
