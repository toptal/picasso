# Escalation

When and how the orchestrator hands a component back to a human. Loaded during steps 9d and 14 of the [agent loop](./agent-loop.md).

## Triggers

The orchestrator escalates (`status="needs_human"`) when **any** of:

1. **Iteration cap hit.** 3 agent attempts on the same component without passing gates. Configurable per workflow (`workflow.escalationCriteria`); default 3.
2. **Architectural review feedback.** Any review comment classified as "architectural concern" per [`pr-workflow.md`](./pr-workflow.md#classifying-review-comments). The orchestrator does not attempt to negotiate architecture.
3. **CI red on `--no-merge` boundary.** Sandbox runs (Note canary) escalate after the first CI red — there's no human in the loop to resolve.
4. **Reviewer dismissed approval.** A previously-approved PR returns to `CHANGES_REQUESTED` after the orchestrator merged in additional commits. Treat as architectural concern.
5. **Auth failure.** Any `gh` 401, expired token, or revoked scope. Do not retry; escalate immediately.
6. **Worktree corruption.** `git worktree add` succeeded but later operations report unexpected state (detached HEAD where it shouldn't be, missing files). Escalate; do not attempt repair.
7. **Manifest drift.** Manifest reports `status="in_progress"` but the corresponding branch is gone, or vice versa. Escalate; do not auto-correct (could erase real work).
8. **Hard timeout.** 48 hours waiting for human review without `APPROVED` or `CHANGES_REQUESTED`. Reviewer is unavailable; flag for re-assignment.

## What "escalate" means

The orchestrator:

1. Updates `manifest.json`:
   ```json
   {
     "status": "needs_human",
     "escalation_reason": "<concise reason>",
     "iterations": <count>
   }
   ```
2. Posts an escalation block (see template below) to:
   - The PR (if one exists) via `gh pr comment`.
   - The orchestrator log (`migration-runs/<date>/<id>/escalation.md`).
   - **Optionally** a Slack webhook if configured (`PICASSO_ORCH_SLACK_WEBHOOK` env var). Out of PF-1992 scope; PF-1994 wires this if escalation rate justifies it.
3. **Stops the orchestrator process** for that component. Other components in the queue continue.
4. Releases the worktree lock by leaving the worktree on disk for the human to inspect. Orchestrator does **not** `git worktree remove` on escalation — humans need to see the state.

## Escalation block template

```markdown
## 🛑 Orchestrator escalation — `<Component>` needs human attention

**Trigger:** <one of the 8 triggers above>
**Iterations:** <count> / 3
**PR:** <URL or "not opened">
**Worktree:** `migration-runs/<date>/<Component>/worktree`
**Last gate report:** `migration-runs/<date>/<Component>/report.md`
**Run log:** `migration-runs/<date>/<Component>/agent.<iter>.log`

### What the orchestrator tried

<2–4 bullet points: which iterations, what each attempted, what failed>

### What's blocking

<1–3 sentences: the specific failure mode, e.g. "Happo diff is 7.2% on
Tooltip's hover state — the agent's Tailwind translation of the JSS
hover-elevation pattern doesn't match the original timing curve.">

### Suggested next step

<one of: "manual migration", "improve PROMPT.md and retry", "extend rules/jss-to-tailwind-crib.md", "spike on @mui/base alternative", "designer + engineer pairing">

### State for the human

- Manifest entry: `status=needs_human`
- Branch: `<branch>` (push as-is or rebase before continuing)
- Acceptance criteria not yet met:
  - [ ] <each unchecked criterion from components/<Name>.md>
```

## Re-entry

After human resolution:

1. Human edits `manifest.json` directly:
   - If they finished the migration manually: `status="done"`, `merged_at=<ts>`.
   - If they want the orchestrator to retry from scratch: reset `iterations: 0`, `status="queued"`, remove `escalation_reason`, delete the worktree, delete the branch.
   - If they want the orchestrator to resume from where it failed (rare): `status="in_progress"`, leave `iterations` as-is.
2. Re-run `bin/migration-orchestrator.ts --component=<id>` to resume.

## Aggregate signal

If escalation rate exceeds **30% on Tier 1**:

- **Stop the orchestrator** before continuing to Tier 2.
- Read the escalation reasons across all `needs_human` entries.
- Improve `PROMPT.md`, `rules/*.md`, or per-component plans accordingly.
- Bump `PROMPT.md` version (`v1` → `v2`).
- Reset escalated components to `queued` and re-run.

If escalation rate exceeds **50% on Tier 2 or 3**: the agent is the wrong tool for the work; manual migration for the remainder.

These thresholds are guidance from [`docs/modernization/PI-4318-ai-leverage-tickets.md:261`](../../modernization/PI-4318-ai-leverage-tickets.md). Adjust based on Tier 1 reality.

## What the orchestrator never does

- Force-push to a feature branch in `needs_human` state.
- Close a PR without explicit `--force-close` flag.
- Delete a worktree on escalation.
- Modify `manifest.json` outside the orchestrator's own loop (humans hand-edit; orchestrator obeys).
- Auto-resolve architectural review feedback.
- Retry past the iteration cap.

These are the trust boundaries. Cross them and the orchestrator becomes uncancellable.
