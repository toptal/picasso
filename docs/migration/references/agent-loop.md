# Agent loop (one item end-to-end)

Canonical 14-step loop the orchestrator runs per manifest item. Lifted from `docs/modernization/PI-4318-ai-leverage-tickets.md:152-199` and adapted for the workflow-agnostic substrate.

The orchestrator (`bin/lib/orchestrator-core.ts`) drives this loop. The migration workflow descriptor (`bin/migration-orchestrator.ts`) supplies the migration-specific hooks (gate command, branch name, prompt path, etc.) — see `bin/lib/workflow.ts` for the descriptor interface.

---

## The 14 steps

```
 1. Read manifest.json → find next item with status="queued" and all deps merged.
 2. Read the per-item plan (workflow.perItemPlan(id)).
 3. Verify dependencies are merged (check manifest + git).
 4. git worktree add migration-runs/<date>/<id>/worktree -b <workflow.branchName(id)>
 5. Update manifest: status="in_progress", branch, worktree.
 6. Apply prompt with context pack (tier-aware via workflow.complexityFor):
    - Workflow's PROMPT.md
    - Reference items
    - Rule docs
    - Per-item plan
    - The item's current source
 7. Agent edits files inside the worktree.
 8. Run workflow.gate(id) (e.g. bin/migration-gate.sh <id>).
 9. If gates fail:
    a. Read migration-runs/<date>/<id>/report.md.
    b. Iterate: feed report back as next prompt → AI fixes → run gates again.
    c. Hard cap: 3 iterations (configurable per workflow).
    d. If still failing → escalate (status="needs_human", post escalation, stop).
10. If gates pass:
    a. Commit changes (workflow.commitMessage).
    b. Push branch.
    c. gh pr create with diff report as PR body.
    d. Update manifest: pr=<URL>.
11. Poll CI (every 5 min, max 60 min):
    a. If CI green → step 12.
    b. If CI red → gh pr view --json statusCheckRollup, fetch failing logs.
    c. Feed CI output to AI → fix → push → loop back to 11a.
12. Wait for human review (poll every 30 min, max 48 hours):
    a. gh pr view --json reviews
    b. If CHANGES_REQUESTED → gh pr view --json comments
    c. Classify each comment:
       - Code suggestion → apply via gh pr review --apply if simple.
       - Question → AI drafts a reply, posts via gh pr comment.
       - Architectural concern → flag in manifest, escalate, stop.
    d. After fixes, push, loop back to 11.
13. On APPROVED:
    a. gh pr merge --squash --auto.
    b. Update manifest: status="done", merged_at=<timestamp>, worktree=null.
    c. git worktree remove migration-runs/<date>/<id>/worktree.
    d. Move to step 1 with next item.
14. On unrecoverable failure (3 iterations, CI flake, hostile review):
    a. Update manifest: status="needs_human", escalation_reason=<reason>.
    b. Post escalation block (see references/escalation.md).
    c. Stop the loop until human intervention.
```

## Mode flags

The orchestrator accepts CLI flags that gate steps:

| Flag | Effect |
|---|---|
| `--dry-run` | Print the planned 14-step sequence; touch no files; open no PRs. |
| `--no-merge` | Run through step 10 (PR open). Stop before step 11–13 (CI poll, review, merge). Used by PF-1992's Note canary. |
| `--component=<id>` | Run only the named item (skip queue selection). |
| `--tier=<N>` | Run only items with `tier=N` and `status="queued"`. |
| `--agent=claude\|cursor\|codex` | Pick the agent to invoke (default: `claude`). |

## Hooks (workflow descriptor)

Steps that branch on workflow-specific logic call hooks:

- `workflow.complexityFor(item)` — step 6 — drives context loading depth (Tier 1 lean, Tier 3 fat).
- `workflow.gate(id)` — step 8 — the gate command (migration calls `bin/migration-gate.sh`).
- `workflow.diff(id)` — step 8 — the diff script (used to populate the PR body).
- `workflow.successCriteria(report)` — step 9/10 — decides "did the gate pass enough to PR".
- `workflow.escalationCriteria(state)` — step 9d/14 — decides "is this stuck enough to escalate".
- `workflow.branchName(id)` — step 4 — branch name from item ID.
- `workflow.prTitle(id, item)`, `workflow.commitMessage(id)` — step 10 — PR + commit naming.

## Concurrency

- Worktree isolation per item (step 4) — two runs against the same item structurally fail at `git worktree add`.
- Manifest writes are atomic-rename: orchestrator reads, mutates in memory, writes to `manifest.json.tmp`, `mv` to `manifest.json`. No mutex required for single-orchestrator-at-a-time.
- For multiple parallel orchestrator processes (Tier 1 across 3 components in parallel): each process claims its own worktree; manifest writes serialize via the atomic-rename. If a write race loses, the loser re-reads and retries.

## Escalation

See `references/escalation.md`.

## Output paths

```
migration-runs/<YYYY-MM-DD>/<id>/
├── worktree/                    # `git worktree add` here
├── prompt.<iter>.txt            # the assembled prompt for iter N
├── agent.<iter>.log             # agent's stdout/stderr
├── gate.<iter>.<stage>.log      # gate stage logs (build, tsc, lint, jest, cypress, happo, react19)
├── diff.md                      # latest diff report
└── report.md                    # latest gate report (PASS/FAIL summary)
```
