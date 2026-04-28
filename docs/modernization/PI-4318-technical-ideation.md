# PI-4318 — Technical Ideation

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Companion docs:** [PI-4318-phases.md](./PI-4318-phases.md) · [PI-4318-tickets.md](./PI-4318-tickets.md)
**Status:** Draft. First-pass technical ideation per story, plus shared architecture. Review + refine with engineers picking up each story before implementation.

## How to read this doc

For each story (matching the IDs in the tickets doc), the ideation covers:

- **Approach** — the rough shape of the solution, in 1-2 paragraphs.
- **Key technical choices** — libraries, file locations, interfaces, conventions.
- **Integration points** — other stories / systems this touches.
- **Risks & open questions** — known unknowns to resolve before or during implementation.

The goal is to de-risk Day 1 of each story, not to over-specify. Owners are free to diverge with a rationale.

---

## Cross-cutting architecture

### The pipeline under test

```
┌──────────────┐   ┌──────────────────┐   ┌───────────────────────┐   ┌──────────────┐
│ Figma design │──▶│ Figma MCP /       │──▶│ AI agent              │──▶│ Picasso      │
│ (BASE lib)   │   │ Figma Middleware  │   │ (Cursor/Claude Code)  │   │ React code   │
└──────────────┘   │ — reads design    │   │ + llms.txt            │   └──────────────┘
                   │ — Code Connect    │   │ + .picasso/ rules     │
                   │   returns snippet │   │ + Skills              │
                   └──────────────────┘   └───────────────────────┘
                                                      │
                                                      ▼
                                         ┌────────────────────────┐
                                         │ picasso-pilot-harness  │
                                         │ scores M1-M9           │
                                         └────────────────────────┘
```

Three layers to keep distinct when designing each piece:

1. **Design-to-snippet** (Figma MCP + Code Connect) — deterministic. Given a Figma node, returns a Picasso snippet with correct props. Correctness is structural.
2. **Snippet-to-composition** (AI agent + Agent Experience) — probabilistic. Given multiple snippets and design intent, produces a working screen. Correctness is judged by the harness and the rubric.
3. **Maestro path** (Figma Middleware, Phase 2+) — the alternative upstream path, bypassing Figma MCP.

Stories touch one or more of these layers; the ideation below calls out which.

### `.picasso/` folder convention (proposed)

```
.picasso/
├── README.md               # what this folder is, how to consume it
├── rules.md                # hard rules (imports, theming, composition constraints)
├── components/
│   ├── Button.md           # per-component: API, dos/don'ts, variants, examples
│   └── ...
├── patterns/
│   ├── forms.md            # composition patterns extracted from real apps
│   ├── layouts.md
│   ├── navigation.md
│   └── data-display.md
├── tokens/
│   ├── colors.md
│   ├── spacing.md
│   └── typography.md
└── skills/
    ├── picasso-component/SKILL.md
    ├── picasso-page/SKILL.md
    ├── picasso-review/SKILL.md
    └── picasso-migration/SKILL.md
```

Distribution: in Phase 1 via git-submodule or copy from Picasso. In Phase 3 via `@toptal/picasso-agent-experience` package.

### Code Connect authoring conventions (proposed)

- `.figma.tsx` files live **next to** the Picasso component source, not in a central folder (so refactors move them atomically).
- Each file uses `figma.connect(Component, <node-url>, { props: figma.properties({...}) })`.
- Prop-mapping uses `figma.enum()` for variants, `figma.boolean()` for toggles, `figma.instance()` for slots.
- Tokens in Figma → Picasso theme values (no raw hex/px in `.figma.tsx`).
- CI check (lands in Phase 2 as M12) validates: file parses, imports resolve, referenced Figma node still exists, variants in sync.

### Measurement harness — tech stack (proposed)

- **Language:** TypeScript (Node), pnpm workspace, colocated with Picasso under `packages/pilot-harness/`.
- **AST parsing:** `ts-morph` for component / prop extraction from generated code.
- **Linting:** reuse Picasso's ESLint + TS config.
- **Visual diff:** Happo (already in use in Picasso).
- **Runner:** CLI wrapping `cursor-agent` / `claude` CLIs with a deterministic config (model, temperature, canonical prompt).
- **Storage:** everything under `runs/<date>/<design>/<config>/` — prompt, generated code, scores, Happo snapshot refs.
- **Aggregator:** small script producing a markdown report with tables + links.

---

# Phase 1 — Gating

## P1-AIC-01 — Optimize LLM index and `.picasso/` folder

### Approach

Rework the Phase 0 Storybook parser to emit a smaller, denser `llms.txt` and a structured `.picasso/` folder (see convention above). Shrink comes from: dropping verbose prose, deduping against component source, using abbreviations the agent expands via rules, and splitting into `llms.txt` (index) + `llms-full.txt` (Phase 2). Usability comes from explicit dos/don'ts, "use this when..." cues, and worked examples extracted from real code (tied to P1-AIC-03).

### Key technical choices

- **Parser** — fork Phase 0 Storybook → markdown parser; add a post-processor that (a) collapses types, (b) extracts MDX examples, (c) emits per-component `.md` with a fixed header schema.
- **Index format** — follow the `llmstxt.org` convention; one section per component + one per pattern category.
- **Rules structure** — `rules.md` split into: imports, theming, composition constraints, anti-patterns. Each rule has a 1-line example.
- **Size target** — `llms.txt` under ~50 KB (token-budget friendly for in-context use).

### Integration points

- Produces the core input for Cursor / Claude Code + Figma MCP pipeline.
- Consumes from P1-AIC-03 (patterns) and P1-AIC-02 (top-20 selection).
- Rules reference tokens verified in P1-FIG-03.

### Risks & open questions

- Different agents weight sections differently — need smoke tests on Cursor, Claude Code, and Figma Make to find a shape that works across all three.
- `llms.txt` vs `llms-full.txt` split: when is each preferred? Need to document this.
- Rule conflicts between agents' built-in conventions and ours — make rules prescriptive with rationale.

---

## P1-AIC-02 — Select top 20 Picasso components

### Approach

Static-analysis script that crawls the 23 active consumer repos, counts unique import sites of Picasso components (not just file hits — actual JSX usage), and aggregates with weighting by repo size / activity. Output: a ranked CSV and a top-20 list, with a sanity pass from designer to swap in any design-intent-critical component that under-ranks on pure frequency.

### Key technical choices

- **Tool** — TypeScript + `ts-morph` or `jscodeshift` to parse imports and JSX element names reliably (not regex).
- **Traversal** — list active repos from `toptal/*`; clone shallow; run analyzer in parallel; aggregate to SQLite or just a JSON.
- **Weighting** — by default equal-weight usages; optionally weight by repo LOC to avoid tail repos dominating. Document which weighting we picked.
- **Output** — `pilot/top-20.md` (list + rationale) and `pilot/usage-raw.csv` (full data).

### Integration points

- Blocks every Phase 1 Figma story (they all scope to top-20).
- Reused in Phase 2 for coverage verification (75/75).
- The analyzer itself graduates into the pilot harness — reused for pattern mining.

### Risks & open questions

- Monorepos with internal re-exports ("wrap Picasso in a local Button") — need to follow re-export chains to count real usages. Flag for Day-1 spike.
- Components used heavily but in maintenance mode (not what we'd design new apps around) — designer override.
- Access to all 23 repos — confirm auth approach (GitHub App vs PAT) up front.

---

## P1-AIC-03 — Extract patterns from existing usage

### Approach

Reuse the analyzer from P1-AIC-02 to collect top composition patterns — sequences of Picasso components that co-occur (e.g., `Form → Input → Select → Button`). For each cluster, emit a pattern doc with: description, when-to-use, real-world file-path citations, recommended Picasso snippet. AI-assisted summarization, designer review.

### Key technical choices

- **Pattern mining** — AST-based co-occurrence within sibling-proximity windows (5 nodes), clustered by structural similarity. Tree-based diff (not string).
- **AI-assisted summarization** — pass each cluster to Claude with a structured prompt, get a draft description; designer reviews + corrects.
- **Output** — `/.picasso/patterns/*.md` (forms, layouts, navigation, data display at minimum).

### Integration points

- Feeds `.picasso/rules.md` (P1-AIC-01).
- Foundation for `picasso-page` Skill in Phase 2 (P2-AIC-01).
- Validates the top-20 selection — if a top-20 component barely appears in patterns, flag it.

### Risks & open questions

- Anti-pattern noise — "this is how apps use Picasso" is not the same as "this is how they should use Picasso". designer pass filters anti-patterns out.
- Pattern granularity — too narrow and we have 100 patterns; too broad and they're not actionable. Aim for 10-15 patterns in Phase 1, expand in Phase 2.

---

## P1-AIC-04 — Collect measurements (harness + baseline + gate)

### Approach

Build the harness per the cross-cutting stack (above). Three-stage delivery: (1) runner + one scoring script working end-to-end on one reference design by mid-wk1, (2) all scoring scripts + baseline report by end of wk1, (3) full pipeline run + gate report at end of wk3. Harness lives in the Picasso repo under `packages/pilot-harness/` so it's versioned with Picasso's lockfile.

### Key technical choices

- **Runner** — spawns `cursor-agent --prompt <file>` and `claude code --prompt <file>` with a deterministic config; captures stdout + written files.
- **Scoring** — each scorer is a pure function `(generatedCode, groundTruth) => Score`. Shipped as CLI + library so we can unit-test.
- **M1 (component accuracy)** — ts-morph walks imports + JSX element names, diff against ground-truth `{component, count}` mapping.
- **M2 (prop accuracy)** — per-JSX-element prop diff, tolerance for synonym props (e.g., `variant="primary"` vs `primary`). Tolerance table maintained per component.
- **M3 (token fidelity)** — regex+AST scan for hex/px literals, cross-reference against `@toptal/picasso-tokens` allowlist.
- **M4 (Happo)** — render generated code in a minimal Storybook story, snapshot, diff against Figma PNG export.
- **M5 (rubric)** — Google Sheet with designer; aggregator ingests the CSV export.
- **M6 (timing)** — `pnpm pilot:time start|stop --screen=<id>` writes to a local `timings.jsonl`.
- **M7 (lint)** — spawn `tsc --noEmit` + `eslint` on generated code.
- **M8 (diff size)** — `git diff --numstat` between first AI commit and merge commit, with business-logic annotations excluded.

### Integration points

- Consumes every other Phase 1 story.
- Graduates into Phase 2 as the regression harness for each new batch of covered components.

### Risks & open questions

- Variance in AI output — need to run each config N≥3 times and report mean + stddev, not single point. Budget compute accordingly.
- Figma PNG export fidelity for M4 — Figma exports anti-aliasing differently from Storybook/Happo. Calibrate tolerance threshold during baseline week.
- "Business logic" annotation for M8 — agree on a tag convention (`// BIZ-LOGIC` block comments) with pilot engineers Day 1.

---

## P1-FIG-01 — Code Connect for top 20

### Approach

Staged: (1) one-day BASE audit against top-20, producing a green/yellow/red table and gap list, (2) BASE gaps go to P1-FIG-02 for fixing, (3) token mapping (P1-FIG-03) lands in parallel, (4) author `.figma.tsx` per component, (5) publish via Code Connect CLI, (6) verify in Dev Mode + MCP. Two engineers can parallelize — split top-20 in halves.

### Key technical choices

- **`.figma.tsx` location** — next to component source (convention above).
- **Variant mapping** — prefer `figma.enum()` with explicit mappings over implicit. Document when Figma's variant name differs from Picasso's prop value.
- **Icons / slots** — use `figma.instance()` for composable slots.
- **Publishing** — `figma connect publish` in CI; gated on validator passing.
- **Verification** — a small script (`scripts/verify-code-connect.ts`) that queries Figma MCP's `CodeConnectSnippets` for each mapped component and diffs against the expected output.

### Integration points

- Blocked by P1-AIC-02 (scope), P1-FIG-02 (spec gaps), P1-FIG-03 (tokens).
- Blocks P1-AIC-04 gate run.
- Extends to 75/75 in P2-FIG-02.

### Risks & open questions

- Figma Code Connect API evolution — pin Code Connect CLI version and document it.
- Auth for MCP verification in CI — ephemeral token or skip MCP check in CI and run locally before PR merge.
- Components with runtime-composed children (e.g., `Table` with dynamic columns) — Code Connect's `figma.instance()` may not cover all cases. Document which top-20 components have limited mapping.

---

## P1-FIG-02 — Update BASE spec gaps

### Approach

Driven by the audit output of P1-FIG-01. designer own the Figma-side edits; we provide the gap list, the Picasso-side prop names, and review the result. Cadence: 2-3 sync sessions across the 3 weeks.

### Key technical choices

- No code-side work — this is Figma design edits + documentation.
- Deliverable artifact: changelog in DS Confluence / BASE page, listing component-by-component what changed.
- Validation: P1-FIG-01 re-runs its audit after each batch of BASE edits and reports green/yellow/red delta.

### Integration points

- Blocks P1-FIG-01 for any red-status component.
- Feeds Phase 2 expansion to 75 components (P2-FIG-02) — surface anything that'll block 55 remaining components.

### Risks & open questions

- BASE is shared across products — changes may impact other consumers. DS team's call on what's safe in Phase 1 vs deferred.
- Timing — if BASE edits slip, P1-FIG-01 has to work around (swap from top-20 or publish Code Connect with known caveats).

---

## P1-FIG-03 — Verify design token mapping

### Approach

Extract the token list from BASE Figma (colors, spacing, typography) and cross-reference against `@toptal/picasso-tokens`. Produce a mapping doc (`/.picasso/tokens/*.md`) with each BASE token → Picasso token name + any gaps. Gaps are fixed in Picasso tokens, BASE tokens, or mapped via an aliasing layer.

### Key technical choices

- **Token extraction** — Figma Variables API or Figma Tokens plugin export (JSON). Script the parse.
- **Cross-ref script** — small TS tool that loads BASE JSON + Picasso tokens and emits a diff report.
- **Output format** — per category (`colors.md`, `spacing.md`, `typography.md`) with a table: BASE name, Picasso name, status (match / alias / gap).

### Integration points

- Feeds `.picasso/rules.md` — "always use token X, never raw hex".
- Unblocks Code Connect authoring (P1-FIG-01) for any component that references tokens.
- Used by M3 scorer (allowlist of valid tokens).

### Risks & open questions

- Dark mode — BASE has it, Picasso may not. Flag and decide if Phase 1 covers or defers.
- Semantic vs primitive tokens — BASE may expose semantic tokens ("color-bg-primary") that map to Picasso primitives. Document the aliasing strategy.

---

# Phase 1 — Non-gating parallel

## P1-MOD-01 — Migration plan for AI-assisted Picasso migration

### Approach

Plan doc, not code. Audit the 75 components, bucket by complexity (tier 1: pure presentation, tier 2: stateful, tier 3: composite / portal-using / custom-theming), and define per-tier migration playbook. Build on the Phase 0 Button + Switch success — the prompt + testbed setup worked; formalize it.

### Key technical choices

- **Complexity tiering** — static audit (LOC, MUI v4 surface used, JSS rules, child components). Script it so re-running on a new MUI release is trivial.
- **Testbed setup** — Storybook + Happo + Jest is the existing per-component gate. Document the AI-migration wrapper: (a) pin a branch, (b) run prompt, (c) run tests, (d) if Happo diff > threshold, stop and escalate.
- **AI prompt** — reuse Phase 0 Codex prompt; rewrite for Claude Code + Cursor as alternates. Version-control the prompt.
- **Risk register** — React 19 compat, JSS → Tailwind edge cases (nested selectors), MUI-internal-API leakage, `.figma.tsx` invalidation.

### Integration points

- Blocked by the Agent Experience output from Phase 1 (better context = better migration output).
- Blocks Phase 2 execution (P2-MOD-01).

### Risks & open questions

- AI agent quality lift between Phase 0 and Phase 1 — by the time we run this, Claude + Cursor may have moved. Re-validate the prompt before Phase 2 kicks off.
- Components that don't cleanly migrate (heavy JSS, MUI internals) — document the escape hatch (manual migration lane).

---

## P1-MOD-02 — Migrate Picasso to pnpm

### Approach

Follow the internal pnpm migration tutorial (referenced in the PI ticket). This is a mechanical migration: replace yarn.lock, update CI, fix workspace protocol references, validate.

### Key technical choices

- **Workspace format** — `pnpm-workspace.yaml`.
- **Lockfile** — `pnpm-lock.yaml`; delete `yarn.lock`.
- **CI** — swap `yarn install` → `pnpm install --frozen-lockfile`.
- **Husky / lint-staged** — pnpm equivalents.
- **Hoisting** — evaluate `node-linker=hoisted` if we hit MUI peer-dep issues during Phase 2 migration; default is isolated.

### Integration points

- Co-dependent with PI-4278 (Platform Core Q2).
- Unblocks Tailwind 4 install (P2-MOD-01 depends on this).

### Risks & open questions

- Jest / Cypress config relying on hoisted node_modules — worth a spike first.
- Internal scripts that assume yarn-specific commands — grep `package.json` and `.github/` for yarn refs before starting.

---

## P1-MAE-01 — Figma Middleware PoC

### Approach

CLI tool that consumes a Figma file URL + node id via Figma REST API, walks the node tree, and emits a structured JSON describing components + tokens + layout. Proof that Maestro can bypass Figma MCP. No integration yet; just stdout → JSON.

### Key technical choices

- **Language** — Node + TypeScript (aligns with Maestro's stack).
- **Figma API** — `/v1/files/:key` + `/v1/files/:key/nodes`, with a PAT for auth. Rate-limit aware.
- **Output shape** — JSON with `components: [{ id, name, props, children, tokens }]` — designed to mimic what Figma MCP returns so Maestro can swap providers without refactoring.
- **Code Connect integration** — read `.figma.tsx` via the Code Connect API (or parse locally) and enrich the output with snippet mappings. This is the middleware's unique value vs raw Figma API.

### Integration points

- Compared head-to-head with Figma MCP — produces the Phase 2 go/no-go for productionization (P2-MAE-01).
- Uses Code Connect output from P1-FIG-01.

### Risks & open questions

- Figma REST API rate limits on large files — batch requests, cache aggressively.
- Variant / component-set traversal semantics differ from what MCP exposes — spike early to confirm parity is reachable.
- Deep composition (component-of-component) — how many hops do we support? Match what MCP does.

---

# Phase 2 — Execution

## P2-MOD-01 — Migrate Picasso components (MUI v4 → Base UI + Tailwind)

### Approach

Execute the P1-MOD-01 plan. Per-component loop: AI generates migration PR → tests run → designer reviews Happo diff → merge. Sequenced complexity-descending so the hardest components shape the playbook early. Happo baseline regenerated at the end and locked for Phase 3.

### Key technical choices

- **Migration lanes** — AI-first for tier 1 + 2, manual-assisted for tier 3.
- **Parallelism** — multiple components in flight via git branches per component; CI isolates them.
- **API preservation** — breaking changes only when MUI v4 → Base UI forces it; each documented + codemod-paired (P2-MOD-02).
- **React 19 smoke** — every migrated component added to the React 19 smoke suite. Failing the suite blocks the PR.
- **`.figma.tsx` validity** — M12 CI check fails if a PR breaks any existing `.figma.tsx`. Update `.figma.tsx` in the same PR when prop names change.

### Integration points

- Per-batch feeds P2-MOD-02 (codemods).
- Feeds P2-FIG-02 (remaining Code Connect).
- Final Happo baselines lock Phase 3's visual regression check.

### Risks & open questions

- Tailwind 4 vs components that use CSS-in-JS dynamic state (runtime theming) — some may need React context shims, document the pattern.
- React 19 strict mode effects — double-invocation of effects may surface latent bugs. Expect a few components to need `useEffect` cleanup fixes.
- Large components (Table, DatePicker) may need to be split into sub-stories for Happo stability.

---

## P2-MOD-02 — Product migration plans + codemods

### Approach

For every breaking change in P2-MOD-01, author a codemod in `picasso-codemod`. Test each codemod on 2-3 real usages from the 23 active repos. Bundle codemods per Picasso release. Consumer-app migration plan (Phase 3 waves) derives from this.

### Key technical choices

- **Codemod framework** — `jscodeshift` (existing Toptal convention) or `ts-morph`; pick one based on which Phase 0 migration used.
- **Codemod tests** — each codemod has before/after fixtures + a jest-codemod test.
- **Per-product plan** — table: repo, Picasso usage density, custom wrapper surface, estimated codemod coverage, manual-work estimate, wave assignment.
- **Wave sequencing** — by risk, not by size. Portal apps first because they have the strongest test coverage.

### Integration points

- Input to P3-MOD-01 / P3-MOD-02 execution.
- Bundled with each Picasso modernized release.

### Risks & open questions

- Custom wrappers over Picasso components (`<AppButton>` wrapping `<Button>`) — codemods need to handle wrapped usages. Spike on one portal app early.
- Incremental adoption: can consumer apps run on both old and new Picasso during migration? Likely yes via peer-dep range — document the strategy.

---

## P2-AIC-01 — Full-scope AI documentation + Skills

### Approach

Expand top-20 docs to all 75 (reusing the P1-AIC-01 generator), complete patterns / tokens docs, ship `llms-full.txt`, and package 4 Skills. Skills are the user-facing wrapper for pilot engineers and org-wide rollout.

### Key technical choices

- **Generator** — same pipeline as Phase 1 but parameterized for the full component list.
- **Skills format** — `SKILL.md` with frontmatter: `name`, `description`, `triggers`, `tools-required`, `context-refs`.
  - `picasso-component` — generate a single component usage (e.g., "make a primary button").
  - `picasso-page` — compose a page from a Figma link (uses patterns + tokens + Code Connect).
  - `picasso-review` — review a PR for Picasso correctness (imports, tokens, composition).
  - `picasso-migration` — apply codemods + validate against P2-MOD-02 outputs.
- **Skill validation** — each Skill tested end-to-end in Cursor + Claude Code; scored via a small regression harness (subset of the pilot harness).

### Integration points

- Distributed via `@toptal/picasso-agent-experience` (P3-AIC-02).
- Consumed by P3-AIC-01 (rollout).
- `picasso-migration` Skill runs in P3-MOD-01/02 waves.

### Risks & open questions

- Skill triggering overlap — if two Skills match the same prompt, which wins? Document priority + test.
- `llms-full.txt` size — may exceed context window for some agents. Publish chunked variant as fallback.
- Agent-specific quirks (Cursor treats `.cursorrules` differently from Claude Code's `CLAUDE.md`) — maintain both, cross-link.

---

## P2-FIG-01 — Figma Make guidelines + template

### Approach

Private npm registry hosts `@toptal/picasso` + `@toptal/picasso-agent-experience` for Figma Make's sandbox. Guidelines folder is the subset of Agent Experience docs scoped to what Figma Make can consume. Template is a starter project published org-wide that designers pick from the template gallery.

### Key technical choices

- **Registry** — Verdaccio or GitHub Packages, whichever Toptal already runs; scope to `@toptal`.
- **Auth** — Figma Make's sandbox needs a read-only token; scope it to the org.
- **Template** — a minimal Figma Make project with Picasso installed + `guidelines/` + `CLAUDE.md` wired.
- **Guidelines subset** — trim patterns/ + tokens/ to what Make can parse; exclude Skills (not consumable in Make).

### Integration points

- Depends on P2-AIC-01 guidelines source-of-truth.
- Onboarding (P3-FIG-01) ships designers onto this template.

### Risks & open questions

- Figma Make's runtime may not match Picasso's peer-deps (React version, Node built-ins). Spike compatibility early.
- Designer UX — too many rules and Make ignores them; too few and output drifts. Calibrate during dogfooding with designer.

---

## P2-FIG-02 — Code Connect for remaining 55 components

### Approach

Same pattern as P1-FIG-01, scaled. Parallelize across 2-3 engineers. CI check (M12) ensures `.figma.tsx` stays valid through the ongoing Picasso migration (P2-MOD-01).

### Key technical choices

- Same as P1-FIG-01.
- New: M12 CI gate lands mid-Phase 2 — PR fails if any `.figma.tsx` is broken by the PR's changes.
- Nightly job regenerates an MCP-level verification report (catches BASE-side drift).

### Integration points

- Bound to P2-MOD-01 per-batch — when a component is migrated, its `.figma.tsx` must still validate.

### Risks & open questions

- BASE-side changes mid-Phase 2 — same cadence as P1-FIG-02 but across 75 components. Formal change-review between DS team and Picasso team.
- Sheer volume — 55 files is real work. Consider generating a scaffolded `.figma.tsx` from each component's `Props` type and hand-editing.

---

## P2-MAE-01 — Figma Middleware production

### Approach

Promote the P1-MAE-01 PoC into a deployed service Maestro calls. Add auth, caching, observability. Decide: CLI shipped per-project vs hosted service. Recommend: hosted service (single-upgrade path, shared cache).

### Key technical choices

- **Deployment** — internal K8s / Fargate, depending on Toptal conventions. Single-tenant per Maestro env.
- **API** — HTTP with the JSON shape from the PoC; gRPC optional if Maestro prefers it.
- **Auth** — service-to-service token; Figma PAT rotates via secret manager.
- **Caching** — Redis keyed by Figma file id + version; invalidated on Figma webhook or TTL.
- **Observability** — OpenTelemetry traces, error rate + latency dashboards.

### Integration points

- Replaces Figma MCP on the Maestro path.
- Reads `.figma.tsx` output from P1/P2 Figma stories.

### Risks & open questions

- Maestro's expected request shape may evolve — pin a contract before P2 kicks off, version it.
- Figma API rate limits at production scale — benchmark and cache aggressively.
- Fallback strategy — if Middleware is down, does Maestro fall back to Figma MCP or hard-fail? Document.

---

## P2-MAE-02 — Audit Maestro for Picasso UI generation (O4 baseline)

### Approach

Inventory the existing Maestro projects (shouldn't be many). For each, inspect generated code + manually rate whether it uses Picasso. Record baseline + agree Phase 3 target.

### Key technical choices

- No dedicated tooling; spreadsheet-level audit.
- Target-setting meeting with Maestro lead + Vedran.

### Integration points

- Feeds O4 in the PI Impact table.
- Phase 3's P3-MAE-02 reports against this baseline.

### Risks & open questions

- "Uses Picasso" is a spectrum — agree a definition (e.g., "≥80% of UI is Picasso components") upfront.

---

# Phase 3 — Rollout

## P3-MOD-01 — Migrate Portal apps

### Approach

Wave 1 of consumer migration. Run codemods (P2-MOD-02) per repo, validate via repo's own test suite + Happo + manual smoke. Repo owners sign off before merge. Rollback plan: revert the migration PR + unpin Picasso version.

### Key technical choices

- **Execution model** — one engineer + one repo owner pair per repo; parallelize across the 7 Portal apps.
- **Sequencing** — hire-global first (smaller blast radius), then platform + client-portal (larger), then the rest.
- **Test gates per repo** — existing Jest + Cypress + (where configured) Happo, all green.
- **React 19 check** — upgrade happens in a follow-up PR, not the migration PR. Keeps the migration rollback-safe.

### Integration points

- Inputs: codemods (P2-MOD-02), `picasso-migration` Skill (P2-AIC-01).
- Feeds O5 counter.

### Risks & open questions

- Custom wrappers + in-repo overrides — each repo likely has 3-5 "special" components that need manual migration. Allocate buffer.
- Release trains — some Portal apps deploy daily; schedule migration PRs to align with less-busy windows.

---

## P3-MOD-02 — Migrate other important projects

### Approach

Same pattern as P3-MOD-01, covering testing-platform, tracker-front, topteam, top-scheduler + remaining active apps to reach 23/23. Final step: remove MUI v4 + JSS from Picasso itself (O1 = 0).

### Key technical choices

- Same as P3-MOD-01.
- MUI v4 / JSS removal PR lands only after all 23 repos have migrated — confirms no repo silently re-imports old Picasso.

### Integration points

- Completes O1, O5.
- Unblocks org-wide React 19 adoption (O2).

### Risks & open questions

- Long-tail repos may use obscure Picasso surface — the codemods cover most but not all. Budget manual-fix time.

---

## P3-AIC-01 — Adopt Picasso rules in all consumer repos

### Approach

Scripted rollout: for each of 23 repos, open a PR adding `.cursorrules`, `CLAUDE.md`, and `.picasso/` (via submodule or package). Repo owners merge on their schedule. Track in a simple dashboard.

### Key technical choices

- **Script** — Node CLI that clones each repo, drops in the files, opens a PR with a standard description.
- **Consumption model** — `@toptal/picasso-agent-experience` package (P3-AIC-02) is the preferred delivery; submodule is fallback for repos that can't install internal packages.
- **Per-repo customization** — rules can reference repo-local patterns via a `.picasso/local/` folder; standard rules remain untouched.

### Integration points

- Depends on P3-AIC-02 being available.
- Validated by spot-check: run a canonical prompt in 3 sample repos, confirm correct output.

### Risks & open questions

- Merge velocity — 23 PRs across 23 teams. Track in a dashboard, nudge stragglers.
- File conflicts — some repos already have a `CLAUDE.md`. Merge strategy documented (append our section, don't overwrite).

---

## P3-AIC-02 — Distribution channel for Picasso Agent Experience

### Approach

Publish `@toptal/picasso-agent-experience` to the internal npm registry. Contents: the entire `.picasso/` folder + `llms.txt` + Skills. Semver with a changelog. Consumer repos install it and symlink / copy into their `.picasso/`.

### Key technical choices

- **Package structure** — ship `.picasso/` at the root of the package.
- **Post-install** — optional script to symlink into consumer repo's `.picasso/`; opt-in to avoid surprises.
- **Versioning** — semver tied to Picasso version where possible (e.g., `picasso@14.x` ↔ `picasso-agent-experience@14.x`).
- **CI** — Picasso's release pipeline publishes both packages in lockstep.

### Integration points

- Depended on by P3-AIC-01.
- Owned long-term by DS team.

### Risks & open questions

- Monorepo setups — which workspace owns the dependency? Document.
- Drift between Picasso version and Agent Experience version — lockstep publishing avoids most of this; edge cases documented.

---

## P3-AIC-03 — Collect feedback from teams

### Approach

Slack channel + monthly survey. Iterate on rules/Skills based on the top 3 pain points each month. Final measurement pass at PI end compares against Phase 2 exit numbers.

### Key technical choices

- Channel: `#picasso-ai-dx` (or similar), cross-posted to engineering-announcements when there's a release.
- Survey: short form (NPS + 2 open-ended), monthly for the PI duration.
- Iteration cadence: monthly release of `@toptal/picasso-agent-experience`.

### Integration points

- Feeds back into P2-AIC-01 (Skills) and P1-AIC-01 (rules) post-hoc.

### Risks & open questions

- Low feedback volume — mitigate with direct 1:1s to pilot engineers at month 1.
- Scope creep from feedback — keep a "do/defer/decline" triage.

---

## P3-FIG-01 — Onboard designers to BASE + Figma Make

### Approach

Live session + recorded walkthrough + quick-start doc. Designer cohort runs through the template on a sample design to validate onboarding material.

### Key technical choices

- No code work; enablement content.
- Quick-start doc lives in DS Confluence.

### Integration points

- Depends on P2-FIG-01 (template must be live).

### Risks & open questions

- Designer adoption target — set with designer. Recommend ≥60% of active product designers use the template at least once in the PI.

---

## P3-MAE-01 — Onboarding to Maestro

### Approach

Enablement session + quick-start doc + feedback channel. Covers: how to start a Maestro project with Picasso as default, how to point Maestro at a Figma design, how to consume Figma Middleware output.

### Key technical choices

- Content, not code.
- Quick-start doc lives alongside Maestro's existing docs.

### Integration points

- Depends on P2-MAE-01 (Middleware in production).
- Precedes P3-MAE-02 (default library switch).

### Risks & open questions

- Maestro user base is small — direct outreach, not broadcast, is likely the right channel. Confirm with Maestro lead.

---

## P3-MAE-02 — Maestro using Picasso as default

### Approach

Configuration change + default template update. "Default library" gets a written definition first — covers config flag, registry entry, and starter template. Adoption tracked against baseline (P2-MAE-02).

### Key technical choices

- **Definition of "default"** — (1) config flag `defaultLibrary: 'picasso'`, (2) Picasso preloaded in `@toptal/picasso-agent-experience`, (3) Maestro's project scaffolder emits Picasso imports by default.
- **Tracking** — instrument Maestro to emit a metric on project creation: which library is used.

### Integration points

- Depends on P3-MAE-01 (users onboarded first).
- Closes O4.

### Risks & open questions

- Maestro users who intentionally want non-Picasso libraries — allow opt-out; don't force.
- Metric collection — if Maestro doesn't have telemetry for this, add it in this story.

---

# Appendix — open technical decisions

Collected from the per-story sections; these should be resolved (or assigned owners) during Phase 1 kickoff:

1. `.picasso/` distribution model in Phase 1 — submodule vs package vs copy?
2. Pilot harness runtime — Node / TS confirmed, but where does it live (Picasso monorepo vs standalone repo)?
3. Code Connect CLI version pin — which minor?
4. Codemod framework — `jscodeshift` vs `ts-morph`?
5. Figma Middleware deployment — hosted service vs per-project CLI?
6. Registry for Agent Experience package — Verdaccio vs GitHub Packages vs other?
7. AI tool scope for the pilot — Cursor + Claude Code confirmed, or also include Codex/Windsurf?
8. Variance reporting — N per config for M1-M8 harness runs? Proposed N≥3.
9. BASE / Picasso token aliasing — semantic-to-primitive mapping layer, or rename to match?
10. React 19 migration PR strategy — all components in one go vs incremental? Proposed: incremental per migrated component, validated per-batch.
