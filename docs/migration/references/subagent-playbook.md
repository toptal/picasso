# Subagent playbook

When and how to spawn parallel subagents during a single component migration. Loaded by the agent during step 6 of the [agent loop](./agent-loop.md), but only at Tier 3 — Tier 1 / Tier 2 components don't benefit from parallelism.

Pattern lifted from [`thunderbird/thunderbot/.thunderbot/references/subagent-playbook.md`](https://github.com/thunderbird/thunderbolt/tree/main/.thunderbot/references/subagent-playbook.md), adapted for Picasso's gate composition.

## When to parallelize

**Use subagents** when the work decomposes into independent reads / analyses that don't conflict on file edits:

- Auditing imports across many files (one subagent per file).
- Finding all `PicassoProvider.override` call sites.
- Extracting Happo screenshot URLs from a stories directory.
- Drafting per-subcomponent migrations for compound components (Tier 2/3 with 4+ subcomponents).

**Don't parallelize** when:

- Subagents would write to the same file (inevitable conflicts).
- The work is sequential by definition (run gate → read report → fix → run gate).
- You're just trying to look fast.

## Concurrency limit

**Hard limit: 3 subagents per step.** Picasso's CI infrastructure tolerates 3 concurrent gate runs cleanly; 4+ saturates the runner pool and causes flaky timing in Cypress component tests.

## Templates

### Audit subagent (read-only)

```
You are a read-only audit subagent. Search packages/base/<Name>/src for all
imports from `@material-ui/styles`, `@material-ui/core/styles`, and JSS
primitives (`makeStyles`, `createStyles`, `withStyles`).

For each match, return:
- File path
- Line number
- The full import statement or call expression
- A 1-line classification: "import" | "call" | "type-only"

Return a JSON array. Do not edit files.
```

### Per-subcomponent migration subagent (write-allowed, scoped)

```
You are migrating ONLY the file at <path>. You may NOT edit any other file.
Other subagents are migrating other files in parallel.

You have read access to:
- ../../docs/migration/PROMPT.md
- ../../docs/migration/rules/*
- ../../docs/migration/reference/*
- ../../docs/migration/components/<Name>.md

Apply the migration rules to the single file at <path>. Output: edits to
that file only. Do not narrate.
```

### Synthesis subagent (read-only)

```
You are a read-only synthesis subagent. Read the gate report at
migration-runs/<date>/<Name>/report.md and produce a structured summary
suitable for a PR description.

Format: see docs/migration/references/pr-workflow.md §"Creating a PR".
Return markdown only.
```

## Anti-patterns

### "Just spin up agents and see"

Don't fire 5 subagents hoping one will succeed. Each subagent is a context-bloat cost; pick the work that actually decomposes and run no more agents than the work has independent units.

### Subagents that edit the same file

If two subagents both modify `<Name>/styles.ts`, you will lose work. Either:
1. Decompose the file by export — subagent A handles `createSizeClassNames`, B handles `createVariantClassNames`. Specify exact line ranges in the prompt.
2. Don't parallelize.

### Subagents for trivial work

If the work fits in a single agent prompt without parallelism, don't introduce subagents. The overhead of orchestrating + synthesizing > the saving from parallelism.

### Subagents waiting on shell

Never have a subagent shell out to a long-running command (`yarn happo`, `yarn cypress run`). The parent orchestrator owns the shell; subagents are read/transform only.

## Decision matrix (per tier)

| Tier | Default subagent strategy | Examples |
|---|---|---|
| Tier 1 | None | Single agent migrates everything. |
| Tier 2 | None | Single agent. Compound components (CheckboxGroup, RadioGroup) decompose linearly inside one prompt. |
| Tier 3 | 1 audit + 1 per-subcomponent up to 3 total | Page (hamburger / responsive / layout): one audit subagent maps the override surface; one writer per file. |
| Tier 4 | 1 audit + 1 per-component for batched migrations | Query Builder PR for "select-family components": one audit subagent across AutoComplete + Select + MultiSelect; one writer per file. |
| Tier 5 (provider) | Out of orchestrator scope | The provider rewrite is multi-domain and should run under a different mode (PF-2023). Don't try to parallelize it inside this orchestrator. |

## Telemetry

Every subagent invocation logs to `migration-runs/<date>/<id>/subagent.<n>.log`. Include in the PR body if subagents were used:

```
Subagents used: 2
- audit (mui-imports): 18 matches across 5 files
- writer (Page.tsx): 1 file, 47 LOC modified
```

Helps human reviewers spot when the orchestrator decomposed the work and where to look for cross-file consistency issues.
