#!/usr/bin/env -S yarn tsx
/* eslint-disable func-style */
/* eslint-disable max-statements-per-line */
/* eslint-disable no-console */
/**
 * bin/migration-orchestrator.ts
 *
 * Migration workflow entrypoint. Thin wrapper: builds a Workflow descriptor
 * for the MUI v4 + @mui/base + JSS → @base-ui/react + Tailwind 4 migration
 * and hands it to the workflow-agnostic orchestrator core
 * (`./lib/orchestrator-core.ts`).
 *
 * Target stack: @base-ui/react v1.4.1+ (https://base-ui.com) + Tailwind 4.
 * Source stacks (migrating away from): @material-ui/core 4.12.4, @mui/base
 * (predecessor of @base-ui/react), JSS via @material-ui/styles.
 *
 * Path selection:
 *   - Tier 0 (Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs)
 *     → docs/migration/PROMPT-light.md (package swap + API alignment)
 *   - Tier 1, 2, 3, 4, 5 → docs/migration/PROMPT-heavy.md (full rewrite)
 *
 * Usage:
 *   yarn orchestrate                           # next queued item across all tiers
 *   yarn orchestrate --tier=1                  # only Tier 1 items (sequence Tier 1 first per §3.7)
 *   yarn orchestrate --component=Note          # named item (PF-1992 sandbox)
 *   yarn orchestrate --component=Note --no-merge --dry-run
 *
 * See docs/migration/ORCHESTRATOR.md for the runbook and
 * docs/migration/references/agent-loop.md for the loop spec.
 *
 * Future workflows: copy this file's shape, replace the `migrationWorkflow`
 * descriptor, and ship `bin/<workflow>-orchestrator.ts`. Do not modify
 * `./lib/orchestrator-core.ts` for new workflows.
 */

import { promises as fs, existsSync } from 'node:fs'
import * as path from 'node:path'

import {
  run,
  runBatch,
  runReviewSweep,
  parseOptions,
} from './lib/orchestrator-core'
import type { GateReport, ManifestItem, RunState, Workflow } from './lib/workflow'

const migrationWorkflow: Workflow = {
  id: 'migration',
  displayName: 'Migration (MUI v4 + @mui/base + JSS → @base-ui/react + Tailwind 4)',
  manifestPath: 'docs/migration/manifest.json',
  promptFor: (item: ManifestItem) =>
    item.tier === 0
      ? 'docs/migration/PROMPT-light.md'
      : 'docs/migration/PROMPT-heavy.md',
  contextPack: [
    'docs/migration/rules/styling.md',
    'docs/migration/rules/api-preservation.md',
    'docs/migration/rules/jss-to-tailwind-crib.md',
    'docs/migration/rules/base-ui-react-api-crib.md',
    'docs/migration/tokens/picasso-tailwind-tokens.md',
    // Tier 1.3: lessons auto-accumulated by post-success hook. Future
    // migrations inherit patterns from earlier ones (e.g. Switch reads
    // Button's lessons re polymorphic / nativeButton / onClick cast).
    'docs/migration/references/lessons-learned.md',
    // reference/* is currently empty — see ORCHESTRATOR.md §References for the
    // re-introduction policy. The orchestrator skips missing files gracefully.
  ],
  perItemPlan: (id) => `docs/migration/components/${id.replace(/\//g, '__')}.md`,
  gate: (id) => `bin/migration-gate.sh "${id}"`,
  diff: (id, mode) => `bin/migration-diff.sh ${mode} "${id}"`,
  branchName: (id) => `migrate-${id.replace(/\//g, '-')}`,
  // Long-running migration effort lands on the integration branch, NOT
  // master, so the batch can be reviewed/staged together. Master sees a
  // single squash-merge once the whole modernization wave is green.
  //
  // Branch name is `feature/picasso-modernization` rather than the simpler
  // `picasso-modernization` because Picasso's CI workflows are configured
  // to trigger only on PRs targeting `master` or `feature/**`. A bare
  // `picasso-modernization` base bypasses the full Static-checks pipeline
  // (Jest, lint, etc.), opening PRs as orphaned-CI surfaces. Empirically
  // hit on canary 22 (PR #4928): only Check + Danger reported, full Jest
  // never ran. Renamed via `git push origin <sha>:refs/heads/feature/...`
  // 2026-05-06.
  //
  // The branch must already exist on origin (created manually before the
  // first canary run).
  baseBranch: 'feature/picasso-modernization',
  // Phase 3.1 — CI poll budget. Picasso's full pipeline on the integration
  // branch runs in ~7-12min (canary 24: Static checks 7:39, Integration
  // Tests 5:30 + sharded e2e ~7min). 15min covers it with headroom; bump
  // via `--ci-timeout-minutes=N` if CI queue contention or slow shards
  // push past the budget.
  ciTimeoutMinutes: 15,
  // Phase 3 Happo-flake mitigation. One rerun is enough for the common
  // case (network/upload jitter on happo.io). Persistent failures after
  // one rerun are likely real visual regressions and should escalate to
  // a designer.
  maxReruns: 1,
  // Tier 2 batch B / Slice 4 — sweep can ALSO rerun Happo on its own
  // cadence after canary creation has finished, since Happo flakes
  // sometimes only show up after a few hours / runs. 2 sweep retries
  // past Phase 3.3's initial budget covers the long-tail flake without
  // letting persistent regressions hide indefinitely.
  maxSweepHappoReruns: 2,
  // Phase 3.5 — review polling. Default 0 (canary / sandbox runs proceed
  // straight to merge or stop on --no-merge). Set via
  // `--review-timeout-minutes=N` for production migrations awaiting
  // human review.
  reviewTimeoutMinutes: 0,
  maxReviewIterations: 3,
  // Picasso's Danger CI rejects unassigned PRs ("Please assign someone to
  // this PR before merging"). Assigning to the operator (`@me` in gh)
  // satisfies the rule and keeps responsibility with whoever started the
  // run. For unattended/CI-driven runs, this should be replaced with the
  // designated PF-1994 owner.
  assignees: ['@me'],
  // Phase 2.5 fix — Danger-compliant title.
  // Picasso's `dangerJS` enforces:
  //   - Title starts with a capital letter (the leading `[` is allowed
  //     because the first letter inside the bracket is `P`).
  //   - No trailing full-stop.
  //   - PR title contains a Jira issue code (`[XXX-NNNN]`).
  // `[Tier <N>]` does NOT count as a Jira code, so the prior format
  // (`[Tier 0] migrate Button …`) failed Danger. We use `[PF-1994]`
  // (the umbrella ticket) as the prefix and demote the tier label into
  // the body via PR description, where it's still visible without
  // tripping CI. Validated against the existing Picasso PR style
  // (`[TAPS-0000] Migrate Button and Switch to BASE UI`, PR #4906).
  prTitle: (id) => `[PF-1994] Migrate ${id} to @base-ui/react + Tailwind`,
  commitMessage: (id, item) => {
    const isCanary = item.notes?.includes('orchestrator sandbox')
    // Tier 1 already-clean components: just the dep cleanup, no source migration.
    const isAlreadyClean =
      item.tier === 1 && item.target_path === 'none' && item.notes?.includes('Already-clean source')
    // Subject must start with a capital letter and not end with a full-stop
    // (Picasso Danger rules). The `[PF-1994]` prefix is also required so the
    // commit-title check finds a Jira issue code. The verb is capitalized
    // ("Drop", "Migrate") to satisfy "Title should start with capital
    // letter" once Danger strips the prefix.
    const subject = isCanary || isAlreadyClean
      ? `[PF-1994] Drop @material-ui/core peer-dep from ${id}, lift React 19 cap`
      : item.tier === 0
        ? `[PF-1994] Migrate ${id} from @mui/base to @base-ui/react`
        : `[PF-1994] Migrate ${id} to @base-ui/react + Tailwind`
    const body = isCanary
      ? 'Source is already MUI-clean (Phase 0 carry-over). This commit removes\n' +
        'the vestigial peer-dep and unblocks React 19 testing for downstream\n' +
        'consumers. Validates the orchestrator end-to-end as the PF-1992 sandbox.'
      : isAlreadyClean
        ? 'Source is already MUI-clean. This commit drops the vestigial @material-ui/core\n' +
          'peer-dep and lifts the React 19 peer-dep cap.'
        : `Tier ${item.tier} component. See PR description for prop-surface diff,\n` +
          'import diff, and Happo summary.'

    return [subject, '', body, '', 'Refs: PF-1994'].join('\n')
  },
  complexityFor: (item: ManifestItem) =>
    (item.tier <= 1 ? 1 : item.tier === 2 ? 2 : 3) as 1 | 2 | 3,
  successCriteria: (report: GateReport) => report.composite === 'PASS',
  escalationCriteria: (state: RunState) => {
    // Iteration-cap escalation is handled by the orchestrator's main loop
    // (`while (state.iterations < opts.maxIterations)`) and the post-loop
    // check that triggers when the loop exits without a green gate. Don't
    // hardcode it here — that would override the operator's `--max-iterations=N`
    // flag (which canary 16 hit, escalating at iter 3 even with N=10).
    if (state.architecturalReviews > 0) {
      return {
        shouldEscalate: true,
        reason: 'reviewer flagged architectural concern',
      }
    }
    if (state.ciFailures.length >= 3) {
      return {
        shouldEscalate: true,
        reason: `${state.ciFailures.length} distinct CI failure modes; not making progress`,
      }
    }

    // Tier 2.2 — diff-aware (stuck) escalation. If the last 2 inner-loop
    // gate reports failed on the IDENTICAL set of stages, the agent is
    // not making progress on the remaining failures even though it had
    // a feedback round between iters. Cut losses early instead of
    // burning the whole `--max-iterations` budget.
    //
    // Counter-rule: if the failure-set SHRANK between iters (agent
    // resolved at least one stage), we keep iterating — that's making
    // progress. The 2-iter window is the sweet spot empirically: 1 is
    // too aggressive (agent legitimately needs feedback rounds), 3+
    // wastes too much time on stuck loops.
    const recent = state.gateHistory.slice(-2)

    if (recent.length === 2) {
      const failedStages = (report: GateReport): string =>
        report.stages
          .filter((stage) => stage.status === 'FAIL')
          .map((stage) => stage.name)
          .sort()
          .join(',')
      const prev = failedStages(recent[0])
      const curr = failedStages(recent[1])

      if (prev !== '' && prev === curr) {
        return {
          shouldEscalate: true,
          reason: `2 consecutive iterations failed on the same gate stages (${prev}); agent is stuck`,
        }
      }
    }

    return { shouldEscalate: false }
  },
  // Tier 2.4 — reference auto-populate. When a Tier 0 PR merges, copy
  // its leaf component file into `docs/migration/reference/` so future
  // Tier 0 migrations have a worked, real-world example. Compounds
  // across the batch: Switch's prompt context inherits Button's merged
  // result; Tabs inherits Switch's; etc. Light-path components benefit
  // most because the patterns generalize.
  //
  // Tier 1+ items are skipped: cleanup-only migrations (target_path ===
  // 'none') don't change source meaningfully, and heavy/sibling-package
  // migrations are too workflow-specific to standardize as references.
  onPostMerge: async (item: ManifestItem, rootDir: string) => {
    if (item.tier !== 0) {return}
    if (item.target_path === 'none') {return}
    const leaf = item.id.split('/').pop() || item.id
    const sourcePath = path.join(
      rootDir,
      item.package,
      'src',
      leaf,
      `${leaf}.tsx`
    )

    if (!existsSync(sourcePath)) {return}
    const refDir = path.join(rootDir, 'docs/migration/reference')

    await fs.mkdir(refDir, { recursive: true })
    const refPath = path.join(refDir, `${leaf}.tsx`)

    await fs.copyFile(sourcePath, refPath)
    // eslint-disable-next-line no-console
    console.log(`[reference] copied ${item.package}/src/${leaf}/${leaf}.tsx → ${path.relative(rootDir, refPath)}`)
  },
}

async function main(): Promise<void> {
  const opts = parseOptions(process.argv)
  // Phase 3.5 redesign — three modes, mutually exclusive in priority order:
  //   --review-sweep  → walk all awaiting_review items, process new
  //                     review activity, persist state, exit
  //   --batch         → loop run() over every queued item in tier
  //   default         → single-component / single-next-queued migration
  const result = opts.reviewSweep
    ? await runReviewSweep(migrationWorkflow, opts)
    : opts.batch
      ? await runBatch(migrationWorkflow, opts)
      : await run(migrationWorkflow, opts)

  // eslint-disable-next-line no-console
  console.log(`\nResult: ${JSON.stringify(result, null, 2)}`)
  if (result.status === 'escalated') {process.exit(2)}
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Orchestrator failed:', err)
  process.exit(1)
})
