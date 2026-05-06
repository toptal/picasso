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

import { run, parseOptions } from './lib/orchestrator-core'
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
  prTitle: (id, item) =>
    `[Tier ${item.tier}] migrate ${id} to @base-ui/react + Tailwind`,
  commitMessage: (id, item) => {
    const scope = id
    const isCanary = item.notes?.includes('orchestrator sandbox')
    // Tier 1 already-clean components: just the dep cleanup, no source migration.
    const isAlreadyClean =
      item.tier === 1 && item.target_path === 'none' && item.notes?.includes('Already-clean source')
    const subject = isCanary || isAlreadyClean
      ? 'drop @material-ui/core peer-dep, lift React 19 cap'
      : item.tier === 0
        ? 'migrate from @mui/base to @base-ui/react'
        : 'migrate to @base-ui/react + Tailwind'
    const body = isCanary
      ? 'Source is already MUI-clean (Phase 0 carry-over). This commit removes\n' +
        'the vestigial peer-dep and unblocks React 19 testing for downstream\n' +
        'consumers. Validates the orchestrator end-to-end as the PF-1992 sandbox.'
      : isAlreadyClean
        ? 'Source is already MUI-clean. This commit drops the vestigial @material-ui/core\n' +
          'peer-dep and lifts the React 19 peer-dep cap.'
        : 'See PR description for prop-surface diff, import diff, and Happo summary.'

    return [
      `migrate(${scope}): ${subject}`,
      '',
      body,
      '',
      'Refs: PF-1994',
    ].join('\n')
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

    return { shouldEscalate: false }
  },
}

async function main(): Promise<void> {
  const opts = parseOptions(process.argv)
  const result = await run(migrationWorkflow, opts)

  // eslint-disable-next-line no-console
  console.log(`\nResult: ${JSON.stringify(result, null, 2)}`)
  if (result.status === 'escalated') {process.exit(2)}
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Orchestrator failed:', err)
  process.exit(1)
})
