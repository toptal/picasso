#!/usr/bin/env tsx
/* eslint-disable max-lines -- cohesive single-purpose gate verifier: one linear flow (derive Happo compare coords → fetch diff counts → apply the operator approved-delta waiver → emit one JSON verdict). Same convention as happo-pixel-diff.ts; splitting would scatter the flow with no callsite benefit. */
/**
 * Happo gate verifier — runs as a CLI from migration-gate.sh's strict-Happo
 * block, after `pnpm exec happo run <sha>` has uploaded a full-Storybook
 * report for the worktree's HEAD.
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
  /** Explicit HEAD sha to verify, overriding `git rev-parse HEAD`. The
   * migration gate keys its LOCAL Happo-Cypress upload to a decoy sha
   * (`<HEAD>-miglocal`) so it doesn't shadow CI's full-suite report for the
   * real commit; this lets the verifier read that decoy comparison. */
  headShaOverride?: string
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
    headShaOverride: get('head-sha'),
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
  /** Operator-approved deltas waived from the gate decision (2026-06-05). */
  approvedDiffs?: number
  /** Migrated-component diffs left after waiving approved deltas. */
  unresolvedDiffs?: number
  /** The specific snapshot IDs waived as operator-approved deltas. */
  waivedSnapshots?: string[]
  diffComponents?: string[]
  /**
   * Per-snapshot identifiers for stuck-detection (2026-05-20).
   * Format: `<component>/<variant>/<target>` strings, sorted.
   * Lets the orchestrator's stuck-detection distinguish "agent fixed
   * snapshot A and broke snapshot B" (different set, NOT stuck) from
   * "same 8 snapshots failing across iters" (same set, stuck). Without
   * this granularity, Slider PR #4955 review-iter 12 escalated to
   * needs_human after iter 2 reproduced iter 1's count even though the
   * affected snapshots differed.
   */
  diffSnapshots?: string[]
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

// ---------------------------------------------------------------------------
// Approved-delta override (operator-gated)
//
// Closes the long-standing doc-vs-code gap: happo-iteration.md §"Exit criterion"
// + the migration prompts promise that a Happo diff flagged INTENTIONAL with an
// operator-approved entry in `docs/migration/components/<Component>.md` clears
// the gate — but this verifier only ever passed on a zero diff count. Now it
// waives the SPECIFIC snapshot IDs an operator approved, so a deliberate,
// authorized visual change can pass while any unlisted diff still fails.
// ---------------------------------------------------------------------------

/**
 * `git show <ref>:<path>` across a couple of candidate ref forms; returns file
 * content or null if no ref resolves / the file is absent. Unlike the `git`
 * helper above it does NOT die() on failure — a missing approved-delta file is
 * a graceful "no approvals", never a gate ERROR.
 */
const showFileOnRef = (
  cwd: string,
  baseBranch: string,
  relPath: string
): string | null => {
  for (const ref of [baseBranch, `origin/${baseBranch}`]) {
    const result = spawnSync('git', ['show', `${ref}:${relPath}`], {
      cwd,
      encoding: 'utf8',
    })

    if (result.status === 0) {
      return result.stdout
    }
  }

  return null
}

/**
 * Extract approved snapshot IDs from a plan file's `## Approved visual deltas`
 * section. Liberal parse: lines inside a ```happo-approved fence AND inline
 * `backtick` tokens shaped like `<Component>/<variant>/<target>` (>=2 slashes).
 * Over-extraction is safe — the caller intersects with the ACTUAL diff
 * snapshots, so only exact matches to real diffs are ever waived.
 */
const parseApprovedDeltaSection = (markdown: string): Set<string> => {
  const ids = new Set<string>()
  let inSection = false
  let inFence = false

  for (const raw of markdown.split('\n')) {
    const line = raw.trim()

    if (line.startsWith('## ')) {
      inSection = /approved visual deltas/i.test(line)
      inFence = false
      continue
    }

    if (!inSection) {
      continue
    }

    if (line.startsWith('```')) {
      inFence = /happo-approved/i.test(line)
      continue
    }

    if (inFence && line) {
      ids.add(line)
      continue
    }
    const inlineTokens = raw.match(/`([^`]+)`/g) ?? []

    for (const token of inlineTokens) {
      const id = token.slice(1, -1).trim()

      if (id.split('/').length >= 3) {
        ids.add(id)
      }
    }
  }

  return ids
}

/**
 * Operator-gated approved-delta lookup. Reads `docs/migration/components/<C>.md`
 * AS IT EXISTS ON THE BASE BRANCH (not the worktree) and returns the authorized
 * snapshot IDs.
 *
 * Why base-branch, not the worktree file: migration commits carry no author
 * override, so authorship can't distinguish operator from agent. The plan files
 * are operator-/orchestrator-owned ("don't hand-edit from the PR worktree" —
 * docs/migration/PROMPT-review-response.md), so a delta the agent adds in its
 * worktree must NOT count. Base-branch provenance is the trust anchor: only
 * deltas the operator landed on the integration branch are honored.
 */
const readApprovedDeltaIds = (
  cwd: string,
  baseBranch: string,
  component: string
): { ids: Set<string>; note: string } => {
  const relPath = `docs/migration/components/${component}.md`
  const content = showFileOnRef(cwd, baseBranch, relPath)

  if (content === null) {
    return {
      ids: new Set<string>(),
      note: `no approved-delta source (${relPath} absent on ${baseBranch})`,
    }
  }

  const ids = parseApprovedDeltaSection(content)

  return {
    ids,
    note: `${ids.size} approved id(s) from ${relPath}@${baseBranch}`,
  }
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

  // Resolve HEAD SHA. Defaults to the worktree's git HEAD (the SHA the Happo
  // CLI uploads under — `git rev-parse HEAD`). The Cypress gate passes
  // --head-sha to point at its decoy upload key (`<HEAD>-miglocal`) instead,
  // so its local report doesn't shadow CI's full-suite report for the commit.
  const headSha =
    args.headShaOverride || git(['rev-parse', 'HEAD'], args.worktree)

  // Cascade BASE SHA selection. Picasso has two CI paths that upload
  // Happo reports:
  //   - .github/workflows/visual-testing.yml (push to master) → every
  //     master commit has a report.
  //   - .github/workflows/ci.yaml (pull_request) →
  //     happo-ci-github-actions uploads PR-HEAD and (if missing) the
  //     PR's base SHA.
  // Consequence: master always has reports. The integration branch's
  // HEAD has a report iff some PR has ever opened against it. Other
  // commits on the integration branch — including ones merged in from
  // sibling branches without going through a PR — may not have any
  // report at all.
  //
  // Probe candidates in semantic-correctness order; pick the first SHA
  // with an actual Happo upload. Note migration 2026-05-25 wedged on
  // this: its merge-base was an orchestrator-branch commit reachable
  // from the integration branch but never the HEAD of any PR → no
  // report → compare 404'd forever. Cascading to base-branch HEAD (or
  // master HEAD) produces a usable, if older, baseline instead of a
  // hard ERROR.
  const projectQuery = `?project=${encodeURIComponent(args.projectLabel)}`
  const probeReport = async (sha: string): Promise<boolean> => {
    const resp = await fetch(
      `${HAPPO_HOST}/api/reports/${sha}${projectQuery}`,
      { headers: { Authorization: basicAuthHeader(apiKey, apiSecret) } }
    )

    return resp.ok
  }

  spawnSync('git', ['fetch', 'origin', args.baseBranch, 'master', '--quiet'], {
    cwd: args.worktree,
  })
  const baseCandidates: readonly [string, string][] = [
    [
      'merge-base',
      git(['merge-base', 'HEAD', `origin/${args.baseBranch}`], args.worktree),
    ],
    [
      `${args.baseBranch}-HEAD`,
      git(['rev-parse', `origin/${args.baseBranch}`], args.worktree),
    ],
    ['master-HEAD', git(['rev-parse', 'origin/master'], args.worktree)],
  ]

  let baseSha: string | undefined
  let baseSource: string | undefined

  for (const [source, candidate] of baseCandidates) {
    // eslint-disable-next-line no-await-in-loop
    if (await probeReport(candidate)) {
      baseSha = candidate
      baseSource = source
      break
    }
  }

  if (!baseSha) {
    const summary = baseCandidates
      .map(([source, sha]) => `${source}=${sha}`)
      .join(', ')

    emit({
      status: 'NO_BASELINE',
      reason: `No Happo baseline found on any candidate (${summary}). Open a PR against ${args.baseBranch} to trigger happo-ci-github-actions, or verify visual-testing.yml ran on master. Best-effort PASS — gate defers to CI.`,
      headSha,
    })
    process.exit(0)
  }

  process.stderr.write(
    `[happo-verify] base SHA: ${baseSha} (source: ${baseSource})\n`
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
  // B18 (2026-05-18): bumped from 90s → 210s. The original budget was
  // calibrated on small components (Backdrop, Switch). Drawer migration
  // 2026-05-18 returned status=ERROR on both migrate-loop iters because
  // the verifier exhausted the 90s budget waiting for Happo to index a
  // fresh upload of a Tier-0-with-modal-like-behavior bundle. By CI
  // time (~5 min later) the report WAS indexed — so 210s catches it.
  // Non-404 errors don't retry (auth, server errors, etc.).
  const RETRY_DELAYS_MS = [15_000, 30_000, 45_000, 60_000, 60_000]

  // Both base and head reports are full-Storybook uploads under the
  // bare SHA (no `--only <component>` filter). The 2026-05-24 gate
  // change (migration-gate.sh:507-515) switched from filtered uploads
  // to full uploads after Slider v2 found that filtered-baseline-vs-
  // filtered-head can pass with 0 diffs while CI's full-vs-full sees
  // real regressions. Component-level filtering of diffs happens below
  // on the comparison RESULTS (see `componentDiffs` filter), NOT on the
  // report identifier. Pre-2026-05-24 (Modal/Drawer), uploads used
  // `--only` and Happo's CLI appended `-<component>` to the report
  // identifier (node_modules/happo.io/build/executeCli.js:34-36); the
  // verifier mirrored that suffix. That code path is dead — the gate
  // never invokes `--only`, so the suffix always 404s (Note migration
  // 2026-05-25 wedged ~30min on this before being caught).
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
    if (results.__status === 404) {
      // BASE was pre-verified by the cascade above, so a compare-
      // results 404 narrows to two cases:
      //   (a) HEAD's report isn't indexed yet (transient — `pnpm exec
      //       happo run <sha>` just completed but Happo's API hasn't
      //       caught up). The retry budget above usually absorbs this;
      //       if we're here, the budget was exhausted.
      //   (b) Both reports exist but Happo hasn't generated the
      //       comparison row yet (rare).
      // Probe HEAD to disambiguate. Probe URL format matches Happo
      // CLI's node_modules/happo.io/build/fetchReport.js (fix
      // 2026-05-19): must include `?project=<label>` query param,
      // otherwise the API 404s even for reports that exist.
      const probeHead = await fetch(
        `${HAPPO_HOST}/api/reports/${headSha}${projectQuery}`,
        { headers: { Authorization: basicAuthHeader(apiKey, apiSecret) } }
      )

      if (!probeHead.ok) {
        emit({
          status: 'ERROR',
          reason: `Happo has no report for HEAD ${headSha} (project=${args.projectLabel}). Did 'pnpm exec happo run <sha>' complete? probe=${probeHead.status}`,
          headSha,
          baseSha,
        })
        process.exit(2)
      }

      emit({
        status: 'ERROR',
        reason: `Both base + head reports exist but compare-results returned 404; comparison generation may be delayed`,
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

  // 2026-05-20: per-snapshot identifiers for stuck-detection. Emit a
  // sorted list of `<component>/<variant>/<target>` strings limited to
  // the migrated component (so unrelated drift doesn't perturb the
  // stuck-key). Iter-to-iter same-set indicates real stuck; different
  // sets indicate the agent's last attempt shifted WHICH snapshots
  // are failing (= progress, even if the count happens to be equal).
  const diffSnapshots = Array.from(
    new Set(
      allDiffs
        .map(pair => pair[0])
        .filter(
          (
            snap
          ): snap is {
            component: string
            variant: string
            target: string
            url: string
          } =>
            Boolean(snap?.component) &&
            (!args.migratedComponent ||
              snap.component === args.migratedComponent)
        )
        .map(snap => `${snap.component}/${snap.variant}/${snap.target}`)
    )
  ).sort()

  // Operator-approved deltas: snapshot IDs the operator authorized in the
  // base-branch plan file are waived (matched per-snapshot against the ACTUAL
  // diff set, so only real, currently-diffing snapshots can be waived).
  const approved = args.migratedComponent
    ? readApprovedDeltaIds(
        args.worktree,
        args.baseBranch,
        args.migratedComponent
      )
    : { ids: new Set<string>(), note: 'override skipped (no --component)' }

  const waivedSnapshots = diffSnapshots.filter(id => approved.ids.has(id))
  const unresolvedSnapshots = diffSnapshots.filter(id => !approved.ids.has(id))

  // Gate criterion: zero UNRESOLVED diffs on the migrated component (or, if no
  // migratedComponent given, zero diffs total — no waiver applies). Operator-
  // approved deltas are waived; unrelated diffs are surfaced but don't fail the
  // local gate — they're handled at sweep level as "unrelated flake".
  const status: 'PASS' | 'FAIL' =
    unresolvedSnapshots.length === 0 ? 'PASS' : 'FAIL'

  if (waivedSnapshots.length > 0) {
    // stderr (→ happo.log), keeping stdout pure JSON for the gate's jq parse.
    // eslint-disable-next-line no-console
    console.error(
      `[happo-verify] waived ${waivedSnapshots.length} operator-approved delta(s): ` +
        `${waivedSnapshots.join(', ')} — ${approved.note}; ` +
        `${unresolvedSnapshots.length} unresolved diff(s) remain`
    )
  }

  emit({
    status,
    reportUrl: compareUrl,
    headSha,
    baseSha,
    totalDiffs: allDiffs.length,
    componentDiffs,
    unrelatedDiffs,
    approvedDiffs: waivedSnapshots.length,
    unresolvedDiffs: unresolvedSnapshots.length,
    waivedSnapshots,
    diffComponents: Array.from(new Set(diffComponents)),
    diffSnapshots,
    reason:
      status === 'FAIL'
        ? `${
            unresolvedSnapshots.length
          } unresolved Happo diff(s) on migrated component ${
            args.migratedComponent ?? '(unspecified)'
          }${
            waivedSnapshots.length > 0
              ? ` (${waivedSnapshots.length} operator-approved delta(s) waived)`
              : ''
          }. Report: ${compareUrl}`
        : undefined,
  })
  process.exit(status === 'FAIL' ? 1 : 0)
}

main().catch((err: unknown) => {
  die(`unexpected error: ${(err as Error).message}`)
})
