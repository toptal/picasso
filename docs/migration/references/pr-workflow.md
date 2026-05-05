# PR workflow

Patterns for the orchestrator's `gh` CLI interactions: PR creation, CI polling, review handling, merge. Loaded by the agent during steps 10–13 of the [agent loop](./agent-loop.md).

## Authentication

The orchestrator requires `gh` authenticated against `github.com` with scopes:
- `repo` — required for PR create / merge.
- `read:org` — required for code-owner review queries.

Verify before any orchestrator run:

```bash
gh auth status
```

If not authenticated:

```bash
gh auth login
```

## Creating a PR

```bash
gh pr create \
  --title "[<Tier>] migrate <Component> to Tailwind + @mui/base" \
  --base master \
  --head <branch> \
  --body-file <path-to-diff-report>
```

PR body is the diff report from `bin/migration-diff.sh` (see [agent-loop.md §Output paths](./agent-loop.md#output-paths)). Include:

- The structured prop / import / Happo summary.
- A line linking the orchestrator log: `migration-runs/<date>/<id>/agent.1.log`.
- A link to the per-component plan: `docs/migration/components/<Name>.md`.
- A note that this PR was opened by the autonomous orchestrator and the iteration count.

```
Opened by `bin/migration-orchestrator.ts` (PF-1994). Iterations: 1.
Per-component plan: docs/migration/components/<Name>.md
Run log: migration-runs/2026-05-04/<Name>/agent.1.log
```

## Polling CI

```bash
gh pr view <number-or-url> --json statusCheckRollup --jq '.statusCheckRollup[] | {name, status, conclusion}'
```

Poll every 5 minutes. Max 60 minutes per iteration. On 429 / rate-limit, exponential backoff (5min → 10min → 20min) before resuming.

Status states:
- `IN_PROGRESS` / `QUEUED` / `PENDING` → keep polling.
- `SUCCESS` → CI green; advance to step 12 (review).
- `FAILURE` / `ERROR` → fetch logs and feed to agent (next sub-section).

## Fetching failing CI logs

```bash
# Get the URL of the failing check
gh pr view <number> --json statusCheckRollup --jq '.statusCheckRollup[] | select(.conclusion=="FAILURE") | .detailsUrl'

# Fetch run logs
gh run view <run-id> --log-failed
```

The agent receives the failing log + the gate stage that mirrors it locally (e.g., if Jest failed in CI, the agent re-runs `bin/migration-gate.sh <Name>` locally to reproduce — usually it does).

## Reading review state

```bash
gh pr view <number> --json reviews --jq '.reviews[] | {author: .author.login, state, body, submittedAt}'
```

States:
- `APPROVED` → advance to step 13 (merge).
- `CHANGES_REQUESTED` → fetch comments, classify, respond.
- `COMMENTED` (no decision) → wait; reviewer is still iterating.

Poll every 30 minutes during review. Max 48 hours before escalating to `needs_human`.

## Reading review comments

```bash
gh pr view <number> --json comments --jq '.comments[] | {author: .author.login, body, createdAt, path: .path}'
```

For inline review comments (line-anchored):

```bash
gh api repos/toptal/picasso/pulls/<number>/comments --jq '.[] | {author: .user.login, body, path, line, original_line, in_reply_to_id}'
```

## Classifying review comments

The agent reads each comment and classifies:

| Class | Examples | Action |
|---|---|---|
| **Code suggestion** | `Suggestion:` block, "should be X instead of Y" | Apply if simple (file edit + push); skip if it requires architectural change. |
| **Question** | "Why did you …", "Does this still …" | Draft a 1–2 sentence reply; post via `gh pr comment <number> --body "<reply>"`. Quote the comment. |
| **Architectural concern** | "I don't think this approach works because …" | **Stop.** Set `status=needs_human`, post escalation, exit. |
| **Style nit** | "Trailing whitespace", "alphabetize imports" | Apply silently (file edit + push); no reply needed. |
| **Praise / acknowledgment** | "Nice", "LGTM" | Ignore. |

When classification is ambiguous, treat as **architectural concern** and escalate. Don't guess.

## Replying to comments

```bash
gh pr comment <number> --body "<reply>"
```

For inline replies (threaded):

```bash
gh api repos/toptal/picasso/pulls/<number>/comments \
  --method POST \
  --field body="<reply>" \
  --field in_reply_to=<original-comment-id>
```

Reply tone: brief, direct, technical. Quote the comment if context isn't obvious. Don't apologize. Don't editorialize.

## Pushing fixes

After applying review-suggested fixes:

```bash
git -C <worktree> add -A
git -C <worktree> commit -m "fix: address review feedback (<short-description>)"
git -C <worktree> push
```

Then loop back to step 11 (poll CI on the updated branch).

## Merging

Once the PR is `APPROVED` and CI is green:

```bash
gh pr merge <number> --squash --auto --delete-branch
```

`--auto` queues the merge; GitHub merges only when all required checks pass. `--delete-branch` cleans up the remote feature branch.

After merge:

```bash
git -C <worktree-parent> worktree remove <worktree>
```

Update manifest:
- `status: "done"`
- `merged_at: <ISO timestamp>`
- `worktree: null`

## Failure modes

| Symptom | Likely cause | Action |
|---|---|---|
| `gh pr create` returns 422 | Branch already has an open PR | Update manifest with the existing PR URL; resume the loop at step 11. |
| `gh pr merge --auto` fails with "Pull request is not mergeable" | Branch out-of-date with master | `git -C <worktree> rebase origin/master`; force-push; loop back to 11. |
| `gh pr merge --auto` fails with "required status checks have not passed" | Race between approve and last CI run | Wait 5 min and retry. |
| Reviewer dismissed approval | Someone overrode | Treat as `CHANGES_REQUESTED`; escalate. |
| Repeated 401 from `gh` | Auth expired | Escalate to `needs_human` immediately. |
