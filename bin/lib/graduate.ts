/* eslint-disable no-console */
/* eslint-disable id-length */
/* eslint-disable max-lines */
/**
 * bin/lib/graduate.ts
 *
 * Graduation pass: promote new patterns from the lessons-learned audit log
 * into the curated practices.md (which is loaded into every migration
 * prompt via contextPack).
 *
 * Design (2026-05-22):
 *
 * lessons-learned.md is append-only, auto-extracted from each successful
 * migration's commit (see `lessons.append` in orchestrator-core.ts). It's
 * NOT loaded into the agent's contextPack — it's a human-audit log.
 *
 * practices.md is the curated, deduplicated set of graduated patterns.
 * It IS loaded into the agent's contextPack on every migration. Its
 * content reflects only patterns that:
 *   - appeared in ≥ 3 lessons-learned entries since last graduation, OR
 *   - were explicitly cited by a reviewer as a load-bearing rule
 *
 * Graduation is the manual operator step that flows recurring lessons
 * into practices. Before this script, the operator had to run an ad-hoc
 * Claude invocation. This module makes it a first-class CLI command:
 *
 *     pnpm orchestrate --graduate
 *
 * Process: spawn `claude -p` with Read/Edit/Write/Bash/Grep tools, hand
 * it a focused prompt, let it analyze + edit practices.md, capture its
 * summary on stdout. Operator reviews the diff to practices.md before
 * committing.
 *
 * Cost: ~$0.50–$1.50 per graduation (single agent invocation, no loop).
 *
 * Future: could be scheduled via cron after every Nth lessons.append.
 * Kept manual for now because graduation involves judgment on edge cases
 * (does this pattern conflict with an existing rule? should we demote
 * something?) — better to keep human in the loop.
 */

import { promises as fs, existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import * as path from 'node:path'

import type { GraduationRequest, Manifest, ModelConfig } from './workflow'

/**
 * Collect reviewer-confirmed graduation requests still in `queued` status,
 * across all components (flat fields + variants), deduped by rule. These are
 * pre-qualified candidates (graduate.ts criterion (b): explicit reviewer
 * citation) recorded by `--review-sweep` when a reviewer 👍-confirms a
 * graduation proposal. Best-effort: a missing/unparseable manifest yields [].
 */
const collectQueuedGraduationRequests = async (
  rootDir: string
): Promise<GraduationRequest[]> => {
  const manifestPath = path.join(rootDir, 'docs/migration/manifest.json')

  if (!existsSync(manifestPath)) {
    return []
  }
  try {
    const m = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as Manifest
    const byRule = new Map<string, GraduationRequest>()

    for (const comp of Object.values(m.components ?? {})) {
      const slots: readonly (readonly GraduationRequest[] | undefined)[] = [
        comp.graduation_requests,
        ...Object.values(comp.variants ?? {}).map(v => v.graduation_requests),
      ]

      for (const reqs of slots) {
        for (const req of reqs ?? []) {
          if (req.status === 'queued' && !byRule.has(req.rule)) {
            byRule.set(req.rule, req)
          }
        }
      }
    }

    return [...byRule.values()]
  } catch {
    return []
  }
}

/**
 * After a successful graduation pass, flip the consumed requests to
 * `graduated` across flat fields + variants so they aren't re-injected on the
 * next pass. Best-effort + non-fatal — the agent's "already covered → skip"
 * logic is the correctness backstop if this write fails.
 */
const markRequestsGraduated = async (
  rootDir: string,
  graduatedRules: ReadonlySet<string>
): Promise<void> => {
  if (graduatedRules.size === 0) {
    return
  }
  const manifestPath = path.join(rootDir, 'docs/migration/manifest.json')

  try {
    const m = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as Manifest
    const flip = (
      reqs: readonly GraduationRequest[] | undefined
    ): GraduationRequest[] | undefined =>
      reqs?.map(r =>
        graduatedRules.has(r.rule) && r.status === 'queued'
          ? { ...r, status: 'graduated' }
          : r
      )

    for (const comp of Object.values(m.components ?? {})) {
      comp.graduation_requests = flip(comp.graduation_requests)
      for (const variant of Object.values(comp.variants ?? {})) {
        variant.graduation_requests = flip(variant.graduation_requests)
      }
    }
    await fs.writeFile(manifestPath, `${JSON.stringify(m, null, 2)}\n`, 'utf8')
  } catch (err) {
    console.log(
      `[graduate] could not mark requests graduated (non-fatal): ${
        (err as Error).message
      }`
    )
  }
}

export interface GraduateResult {
  status: 'graduated' | 'failed' | 'no-new-lessons'
  practicesPath: string
  lessonsPath: string
  agentSummary: string
  exitCode: number
}

export const runGraduate = async (
  rootDir: string,
  modelConfig: ModelConfig
): Promise<GraduateResult> => {
  const lessonsPath = path.join(
    rootDir,
    'docs/migration/references/lessons-learned.md'
  )
  const practicesPath = path.join(
    rootDir,
    'docs/migration/references/practices.md'
  )

  if (!existsSync(lessonsPath)) {
    throw new Error(`Lessons log not found at ${lessonsPath}`)
  }
  if (!existsSync(practicesPath)) {
    throw new Error(`Practices doc not found at ${practicesPath}`)
  }

  // Pre-check: extract last-graduation date from practices.md header.
  // If lessons-learned.md has no entries newer than that date, skip.
  const practicesContent = await fs.readFile(practicesPath, 'utf8')
  const lastGradMatch = practicesContent.match(
    /Last graduation:\s*(\d{4}-\d{2}-\d{2})/
  )

  if (!lastGradMatch) {
    console.log(
      '[graduate] practices.md does not declare a "Last graduation: <YYYY-MM-DD>" header — agent will treat it as fresh.'
    )
  } else {
    console.log(
      `[graduate] last graduation was ${lastGradMatch[1]} per practices.md header`
    )
  }

  const today = new Date().toISOString().slice(0, 10)

  const graduationRequests = await collectQueuedGraduationRequests(rootDir)

  if (graduationRequests.length > 0) {
    console.log(
      `[graduate] ${
        graduationRequests.length
      } reviewer-confirmed graduation request(s) queued from --review-sweep: [${graduationRequests
        .map(r => r.rule)
        .join(', ')}]`
    )
  }

  console.log(
    `[graduate] running graduation pass (today=${today}) — agent will edit ${path.relative(
      rootDir,
      practicesPath
    )}`
  )

  const prompt = buildGraduationPrompt({
    lessonsPath,
    practicesPath,
    today,
    rootDir,
    graduationRequests,
  })

  // Spawn `claude -p` with Read/Edit/Write/Bash/Grep tools.
  //
  // - Read: required for both files.
  // - Edit: primary mode for updating practices.md sections.
  // - Write: fallback for full-file rewrites if Edit can't express the change.
  // - Bash: for `date +%Y-%m-%d`, optional git log lookups, line counts.
  // - Grep: for pattern-frequency analysis inside lessons-learned.md.
  //
  // No Glob — graduation should not be wandering the codebase. No mcp tools
  // — graduation is a doc-curation task, not a runtime check.
  const allowedTools = ['Read', 'Edit', 'Write', 'Bash', 'Grep'].join(' ')

  console.log(
    `[graduate] model=${modelConfig.model} effort=${modelConfig.effort} thinkingTokens=${modelConfig.thinkingTokens}`
  )

  // `--model` pins the reasoning tier explicitly (otherwise inherits whatever
  // the claude CLI defaults to that week). Effort + thinking travel via env.
  // See plan `~/.claude/plans/question-what-model-and-reflective-pie.md`.
  const child = spawn(
    'claude',
    [
      '-p',
      '--model',
      modelConfig.model,
      '--fallback-model',
      'claude-sonnet-4-5',
      '--allowed-tools',
      allowedTools,
      '--max-turns',
      '60',
    ],
    {
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'inherit'],
      env: {
        ...process.env,
        CLAUDE_EFFORT: modelConfig.effort,
        MAX_THINKING_TOKENS: String(modelConfig.thinkingTokens),
      },
    }
  )

  let agentSummary = ''

  child.stdin?.write(prompt)
  child.stdin?.end()
  child.stdout?.on('data', chunk => {
    const text = chunk.toString()

    agentSummary += text
    // Stream to stdout so the operator sees progress live.
    process.stdout.write(text)
  })

  const exitCode: number = await new Promise(resolve => {
    child.on('close', code => resolve(code ?? 1))
    child.on('error', err => {
      console.error(`[graduate] claude spawn error: ${err.message}`)
      resolve(127)
    })
  })

  if (exitCode !== 0) {
    return {
      status: 'failed',
      practicesPath,
      lessonsPath,
      agentSummary,
      exitCode,
    }
  }

  // Detect the "no new lessons" outcome from the agent's stdout sentinel.
  const noNewLessons = /GRADUATION_COMPLETE: 0 patterns added/.test(
    agentSummary
  )

  // Mark reviewer-confirmed requests as graduated so the next pass doesn't
  // re-inject them. Only when the pass actually graduated something — a
  // "0 patterns added" pass means nothing landed in practices.md yet.
  if (!noNewLessons && graduationRequests.length > 0) {
    await markRequestsGraduated(
      rootDir,
      new Set(graduationRequests.map(r => r.rule))
    )
  }

  return {
    status: noNewLessons ? 'no-new-lessons' : 'graduated',
    practicesPath,
    lessonsPath,
    agentSummary,
    exitCode,
  }
}

const buildGraduationPrompt = (args: {
  lessonsPath: string
  practicesPath: string
  today: string
  rootDir: string
  graduationRequests: readonly GraduationRequest[]
}): string => {
  const { lessonsPath, practicesPath, today, rootDir, graduationRequests } =
    args

  // Reviewer-confirmed requests are pre-qualified under criterion (b)
  // (explicit reviewer citation) and must be processed THIS pass even if
  // lessons-learned has no new entries.
  const requestsSection =
    graduationRequests.length > 0
      ? `## Reviewer-confirmed graduation requests (PRE-QUALIFIED — process these first)\n\n` +
        `These were explicitly 👍-confirmed by a reviewer in a PR thread (criterion (b) below — already qualified). Graduate EACH into practices.md this pass UNLESS Step 5 finds it already covered or in conflict. Process them even if there are zero new lessons-learned entries. The "gist" is the reviewer-approved intent; refine the exact wording to match practices.md's terse style, and cite the source PR.\n\n` +
        graduationRequests
          .map(
            (r, i) =>
              `${i + 1}. Rule **${r.rule}** → target ${r.target} (trigger: ${
                r.trigger
              }; confirmed by ${r.confirmed_by}${
                r.evidence ? `, ${r.evidence}` : ''
              }).\n   Gist: ${r.gist}`
          )
          .join('\n') +
        `\n\nIf a request targets a doc OTHER than practices.md (e.g. code-standards.md), do NOT edit that doc — note it under "Conflicts (require operator review)" so the operator hand-applies it.\n\n`
      : ''

  return (
    `# Graduation pass — lessons-learned.md → practices.md\n\n` +
    `You are running a graduation pass for the Picasso migration orchestrator. Your job is to flow new patterns from the append-only audit log (\`lessons-learned.md\`) into the curated, agent-loadable doc (\`practices.md\`).\n\n` +
    `**Today's date**: ${today}\n` +
    `**Repo root**: ${rootDir}\n\n` +
    `## Files\n\n` +
    `- **Append-only audit log**:\n  \`${lessonsPath}\`\n` +
    `- **Curated practices (canonical, loaded by contextPack)**:\n  \`${practicesPath}\`\n\n` +
    requestsSection +
    `## Procedure (follow exactly)\n\n` +
    `### Step 1. Read both files in full\n\n` +
    `Use the Read tool. Note these things from practices.md:\n` +
    `- The "Last graduation: <YYYY-MM-DD>" line at the top (target for the diff with lessons-learned).\n` +
    `- The "Next graduation due" line (to update).\n` +
    `- The existing section structure (so new bullets land in the right section).\n` +
    `- The total line count (you'll need to keep practices.md under ~250 lines; if new additions would exceed, consolidate weakest existing entries).\n\n` +
    `### Step 2. Identify new lessons-learned entries since last graduation\n\n` +
    `Lessons-learned entries have headings like \`## <ComponentName> — <YYYY-MM-DD>\` (with optional iter suffix). Parse the date from each heading. Treat entries DATED ON-OR-AFTER \`practices.md\`'s "Last graduation" date as new.\n\n` +
    `If no new entries exist AND there are no reviewer-confirmed graduation requests above, jump to Step 7 and output \`GRADUATION_COMPLETE: 0 patterns added, 0 patterns skipped\`. Do NOT edit practices.md. (If there ARE reviewer-confirmed requests above, continue — they qualify under criterion (b) regardless of new lessons-learned entries.)\n\n` +
    `### Step 3. Cluster new entries by theme\n\n` +
    `Theme candidates (use existing practices.md sections as the taxonomy where possible):\n\n` +
    `- Build & snapshot precondition\n` +
    `- Pixel-perfect visual parity\n` +
    `- API preservation\n` +
    `- Changesets\n` +
    `- @base-ui/react idioms\n` +
    `- Tailwind & class composition\n` +
    `- tsconfig & build hygiene\n` +
    `- Verify before commit\n` +
    `- Test conventions\n` +
    `- Polymorphic + ref forwarding\n` +
    `- (other — name a new section if needed)\n\n` +
    `For each cluster: count how many DIFFERENT lessons-learned entries mention the pattern. A single entry mentioning two patterns counts as 1 for each. Cite the entry headings (e.g., "Slider — 2026-05-20 review iter 12").\n\n` +
    `### Step 4. Apply graduation criteria\n\n` +
    `For each clustered pattern, qualify it as graduation-eligible iff EITHER:\n\n` +
    `- (a) **The pattern appears in ≥ 3 different lessons-learned entries since last graduation**, OR\n` +
    `- (b) **The pattern is cited explicitly by a reviewer comment** (reviewer mentioned in the entry, with a specific rule/practice citation).\n\n` +
    `Patterns appearing only once or twice and not reviewer-cited stay in lessons-learned but DO NOT graduate. They may graduate next pass if recurrence increases.\n\n` +
    `### Step 5. Cross-check against existing practices.md content\n\n` +
    `For each graduation-eligible pattern:\n\n` +
    `- If practices.md ALREADY covers it (search for keywords) → **skip** (or strengthen the wording slightly if the new lessons add concrete examples). Conservative: prefer skip.\n` +
    `- If NOT covered → propose addition to the appropriate section.\n\n` +
    `Also check for CONFLICTS:\n` +
    `- If a new lesson contradicts an existing practices.md rule (e.g. lessons say "do X" but practices says "don't X"), flag it for operator attention. Do NOT auto-resolve — output the conflict in the summary and skip the graduation.\n\n` +
    `### Step 6. Edit practices.md\n\n` +
    `Apply ALL of these in one Edit (or sequence of Edits):\n\n` +
    `1. Bump the "Last graduation:" date header to **${today}**.\n` +
    `2. Update the "Next graduation due" line to reflect the new cadence.\n` +
    `3. Add new bullets to the appropriate existing sections (Build / Pixel parity / API preservation / etc.). New bullets should:\n` +
    `   - Be terse (≤ 2 sentences ideally).\n` +
    `   - Cite the precedent in parentheses, e.g. "(Slider iter 12 + Drawer iter 3 precedents)".\n` +
    `   - NOT include PR URLs or commit SHAs (those live in lessons-learned).\n` +
    `4. If creating a new section, place it in topical order (similar themes adjacent).\n` +
    `5. **Keep practices.md under ~250 lines total**. If new additions would exceed this, consolidate weakest existing entries (the ones with the most generic wording or the oldest precedents) — DO NOT delete them silently; mention in the summary which entries you consolidated and why.\n\n` +
    `**Do NOT edit lessons-learned.md.** It's an append-only audit log; entries stay forever for retrospective analysis.\n\n` +
    `### Step 7. Summarize on stdout (mandatory)\n\n` +
    `After all edits, print a summary in this exact format:\n\n` +
    `\`\`\`\n` +
    `=== Graduation pass summary ===\n` +
    `\n` +
    `New lessons-learned entries since last graduation (<prior date>): <N>\n` +
    `\n` +
    `## Clusters identified\n` +
    `- <cluster name>: <count> entries, <citations>\n` +
    `- ...\n` +
    `\n` +
    `## Patterns graduated to practices.md\n` +
    `1. <pattern> — added to §<section> — cited <citations>\n` +
    `2. ...\n` +
    `\n` +
    `## Patterns skipped\n` +
    `1. <pattern> — reason: <already covered by practices.md §X / only 2 occurrences / etc.>\n` +
    `2. ...\n` +
    `\n` +
    `## Conflicts (require operator review)\n` +
    `<list any contradictions between new lessons and existing practices.md, or none>\n` +
    `\n` +
    `## practices.md size\n` +
    `Before: <N1> lines / After: <N2> lines\n` +
    `\n` +
    `GRADUATION_COMPLETE: <X> patterns added, <Y> patterns skipped\n` +
    `\`\`\`\n\n` +
    `The final \`GRADUATION_COMPLETE: ...\` line is parsed by the orchestrator script — keep it exactly in that form.\n\n` +
    `## Constraints\n\n` +
    `- Do NOT spawn subagents.\n` +
    `- Do NOT use Glob (graduation is scoped to two files; you don't need to wander the repo).\n` +
    `- Do NOT use Playwright / MCP tools.\n` +
    `- Bash is allowed for: \`date\`, \`wc -l\`, \`grep -c\` on the two files, lightweight text analysis. Avoid lengthy commands.\n` +
    `- Keep total turns reasonable. The agent has a 60-turn cap; you should be done in 10-30 turns.\n`
  )
}
