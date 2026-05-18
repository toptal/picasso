#!/usr/bin/env tsx
/**
 * Happo gate verifier — runs as a CLI from migration-gate.sh's strict-Happo
 * block, after `pnpm happo --only <Component>` has uploaded a report for the
 * worktree's HEAD.
 *
 * The previous gate path relied on extracting the report URL from the Happo
 * CLI's stdout with a regex. The CLI's actual output (mostly `pnpm
 * build:package` log followed by silent Happo invocation when stdout is
 * redirected) never contained a parseable URL, so the regex returned empty
 * and the gate fell back to a best-effort PASS — meaning local Happo
 * "PASSED" without ever verifying anything. This caused the sweep loop to
 * converge "green" while real visual regressions persisted on the branch
 * (Slider PR #4955: jest passed locally + Happo silently rubber-stamped,
 * but CI's Happo run reported the same regression that the agent never
 * actually fixed).
 *
 * This verifier replaces that path. After `pnpm happo` finishes uploading
 * the report for HEAD, we deterministically derive `(accountId, projectId,
 * baseSha, headSha)` from local git state + project config + Happo API,
 * then hit `/api/a/<acct>/p/<proj>/comparisons/<base>/<head>/compare-results`
 * which gives us the exact diff count. PASS iff zero unaccepted diffs
 * involve the migrated component; FAIL otherwise, with the report URL +
 * diff breakdown surfaced for the agent's next iteration prompt.
 *
 * Output: a single JSON document on stdout, e.g.:
 *   {"status":"PASS","reportUrl":"https://happo.io/.../compare/<b>/<h>",...}
 *   {"status":"FAIL","unresolved":2,"componentDiffs":2,"reportUrl":"..."}
 *   {"status":"NO_BASELINE","reason":"..."} → caller treats as best-effort PASS
 *   {"status":"ERROR","reason":"..."}       → caller treats as FAIL (loud)
 *
 * Exit codes:
 *   0 — PASS or NO_BASELINE (the gate stage moves on)
 *   1 — FAIL (the gate stage fails; loop iter N+1 engages)
 *   2 — ERROR (something is fundamentally broken; the gate logs + fails)
 */

import { spawnSync } from 'node:child_process'

const HAPPO_HOST = 'https://happo.io'

interface VerifyArgs {
  worktree: string
  baseBranch: string
  accountId: string
  projectId: string
  projectLabel: string
  /** Optional component name — when present, gate FAILS only on diffs whose
   * `component` matches this name. Diffs on unrelated components are
   * surfaced in the output but don't fail the gate (they're handled at
   * sweep level as "unrelated flake"). */
  migratedComponent?: string
}

interface CompareDiffSnap {
  component: string
  variant: string
  target: string
  url: string
}

interface CompareResults {
  diffs?: CompareDiffSnap[][]
  unchangedCount?: number
  summary?: string
  compareUrl?: string
}

const parseArgs = (): VerifyArgs => {
  const argv = process.argv.slice(2)
  const get = (name: string): string | undefined => {
    const prefix = `--${name}=`
    const hit = argv.find(arg => arg.startsWith(prefix))

    return hit ? hit.slice(prefix.length) : undefined
  }
  const required = (name: string): string => {
    const value = get(name)

    if (!value) {
      die(`missing required --${name}=...`)
    }

    return value as string
  }

  return {
    worktree: required('worktree'),
    baseBranch: required('base-branch'),
    accountId: required('account-id'),
    projectId: required('project-id'),
    projectLabel: required('project-label'),
    migratedComponent: get('component'),
  }
}

const die = (msg: string): never => {
  emit({ status: 'ERROR', reason: msg })
  process.exit(2)
}

interface VerifyOutput {
  status: 'PASS' | 'FAIL' | 'NO_BASELINE' | 'ERROR'
  reason?: string
  reportUrl?: string
  headSha?: string
  baseSha?: string
  totalDiffs?: number
  componentDiffs?: number
  unrelatedDiffs?: number
  diffComponents?: string[]
}

const emit = (out: VerifyOutput): void => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(out))
}

const git = (args: string[], cwd: string): string => {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' })

  if (result.status !== 0) {
    die(`git ${args.join(' ')} failed: ${result.stderr.trim()}`)
  }

  return result.stdout.trim()
}

const basicAuthHeader = (apiKey: string, apiSecret: string): string =>
  `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`

const fetchCompareResults = async (
  accountId: string,
  projectId: string,
  baseSha: string,
  headSha: string,
  apiKey: string,
  apiSecret: string
): Promise<CompareResults | { __status: number; __body: string }> => {
  const url = `${HAPPO_HOST}/api/a/${accountId}/p/${projectId}/comparisons/${baseSha}/${headSha}/compare-results`
  const resp = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: basicAuthHeader(apiKey, apiSecret),
    },
  })

  if (!resp.ok) {
    const body = await resp.text().catch(() => '')

    return { __status: resp.status, __body: body.slice(0, 200) }
  }

  return (await resp.json()) as CompareResults
}

const main = async (): Promise<void> => {
  const args = parseArgs()
  const apiKey = process.env.HAPPO_API_KEY

  const apiSecret = process.env.HAPPO_API_SECRET

  if (!apiKey || !apiSecret) {
    die('HAPPO_API_KEY / HAPPO_API_SECRET unset — gate cannot verify')
  }

  // Resolve HEAD SHA from the worktree's git state. This is the SHA that
  // `pnpm happo` just uploaded for (Happo CLI uses `git rev-parse HEAD`).
  const headSha = git(['rev-parse', 'HEAD'], args.worktree)

  // Resolve BASE SHA from the merge-base with the integration branch.
  // `git merge-base HEAD origin/<baseBranch>` returns the commit where
  // the migration branch diverged — Happo's base SHA for the comparison
  // is whichever commit on the base branch has the most recent uploaded
  // report. Empirically (Picasso): every commit on
  // feature/picasso-modernization-temp has a Storybook report, so the
  // merge-base works. `git fetch origin <baseBranch>` ensures the ref
  // exists locally even if the worktree is fresh.
  spawnSync('git', ['fetch', 'origin', args.baseBranch, '--quiet'], {
    cwd: args.worktree,
  })
  const baseSha = git(
    ['merge-base', 'HEAD', `origin/${args.baseBranch}`],
    args.worktree
  )

  // Query Happo's compare-results endpoint with retry-on-404. Happo
  // takes time to index a freshly-uploaded report (the upload completes,
  // but the API may 404 on `/api/reports/<sha>` for 30–90s after). When
  // the orchestrator just committed agent edits, ran `pnpm happo`, and
  // immediately queries us, we routinely hit this race. Without retry,
  // the verifier emits ERROR → gate FAILS on what's actually pending
  // propagation → stuck-detection escalates a transient state (observed
  // on Slider PR #4955 review-sweep iter 2, 2026-05-15).
  //
  // Backoff schedule sums to ~90s (15+30+30+15). Non-404 errors don't
  // retry (auth, server errors, etc.) — they're not transient.
  const RETRY_DELAYS_MS = [15_000, 30_000, 30_000, 15_000]
  const compareUrl = `${HAPPO_HOST}/a/${args.accountId}/p/${args.projectId}/compare/${baseSha}/${headSha}`

  let results: Awaited<ReturnType<typeof fetchCompareResults>> | null = null

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    results = await fetchCompareResults(
      args.accountId,
      args.projectId,
      baseSha,
      headSha,
      apiKey,
      apiSecret
    )

    if (!('__status' in results)) {
      break // 2xx — done
    }

    if (results.__status !== 404) {
      break // non-404 errors aren't transient; emit ERROR below
    }

    if (attempt >= RETRY_DELAYS_MS.length) {
      break // exhausted retries; fall through to diagnostic probe below
    }
    const delayMs = RETRY_DELAYS_MS[attempt]

    process.stderr.write(
      `[happo-verify] compare-results 404 (attempt ${attempt + 1}/${
        RETRY_DELAYS_MS.length + 1
      }); retrying in ${
        delayMs / 1000
      }s (Happo may still be indexing the upload)\n`
    )
    await new Promise<void>(resolve => setTimeout(resolve, delayMs))
  }

  if (!results) {
    die('unexpected: no fetch attempt occurred')
  }

  if ('__status' in results) {
    // 404 typically means one of the two SHAs has no report. If HEAD's
    // report isn't uploaded yet, that's an ERROR (we just ran `pnpm
    // happo`; report should exist). If BASE's report doesn't exist,
    // that's NO_BASELINE — can't compare, treat as best-effort PASS so
    // we don't block the gate on infra issues.
    if (results.__status === 404) {
      // Probe which side is missing. `has-report` is the standard
      // existence check (Happo CLI uses the same /api/reports/<sha>
      // endpoint internally).
      const probeHead = await fetch(`${HAPPO_HOST}/api/reports/${headSha}`, {
        headers: { Authorization: basicAuthHeader(apiKey, apiSecret) },
      })
      const probeBase = await fetch(`${HAPPO_HOST}/api/reports/${baseSha}`, {
        headers: { Authorization: basicAuthHeader(apiKey, apiSecret) },
      })

      if (!probeHead.ok) {
        emit({
          status: 'ERROR',
          reason: `Happo has no report for HEAD ${headSha} (project=${args.projectLabel}). Did 'pnpm happo --only ...' complete uploads? probe=${probeHead.status}`,
          headSha,
          baseSha,
        })
        process.exit(2)
      }

      if (!probeBase.ok) {
        emit({
          status: 'NO_BASELINE',
          reason: `Happo has no report for BASE ${baseSha} (project=${args.projectLabel}); cannot compare. Best-effort PASS — gate will rely on CI's Happo to verify against the canonical baseline.`,
          headSha,
          baseSha,
          reportUrl: compareUrl,
        })
        process.exit(0)
      }

      // Both reports exist but the comparison endpoint 404'd — Happo
      // hasn't generated the comparison yet. This is rare; treat as
      // ERROR so the operator sees it.
      emit({
        status: 'ERROR',
        reason: `Both base + head reports exist but compare-results returned 404; report generation may be delayed`,
        headSha,
        baseSha,
        reportUrl: compareUrl,
      })
      process.exit(2)
    }
    emit({
      status: 'ERROR',
      reason: `Happo compare-results returned ${results.__status}: ${results.__body}`,
      headSha,
      baseSha,
      reportUrl: compareUrl,
    })
    process.exit(2)
  }

  const allDiffs = results.diffs ?? []
  // Each diff pair is [oldSnap, newSnap]; component is on both.
  const diffComponents = allDiffs
    .map(pair => pair[0]?.component)
    .filter((name): name is string => Boolean(name))

  const componentDiffs = args.migratedComponent
    ? diffComponents.filter(name => name === args.migratedComponent).length
    : diffComponents.length
  const unrelatedDiffs = allDiffs.length - componentDiffs

  // Gate criterion: zero diffs on the migrated component (or, if no
  // migratedComponent given, zero diffs total). Unrelated diffs are
  // surfaced but don't fail the local gate — they're handled at sweep
  // level as "unrelated flake → PR comment for designer".
  const status: 'PASS' | 'FAIL' = componentDiffs === 0 ? 'PASS' : 'FAIL'

  emit({
    status,
    reportUrl: compareUrl,
    headSha,
    baseSha,
    totalDiffs: allDiffs.length,
    componentDiffs,
    unrelatedDiffs,
    diffComponents: Array.from(new Set(diffComponents)),
    reason:
      status === 'FAIL'
        ? `${componentDiffs} unaccepted Happo diff(s) on migrated component ${
            args.migratedComponent ?? '(unspecified)'
          }. Report: ${compareUrl}`
        : undefined,
  })
  process.exit(status === 'FAIL' ? 1 : 0)
}

main().catch((err: unknown) => {
  die(`unexpected error: ${(err as Error).message}`)
})
