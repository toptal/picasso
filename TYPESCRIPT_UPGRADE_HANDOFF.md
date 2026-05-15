# PF-2031 Handoff — TS 4.7 → 5.5 upgrade

> Last updated 2026-05-14 (late afternoon). Replaces all prior versions (May-12, May-14 morning, May-14 mid-afternoon). This is a compaction-resistant document — every section below has decisions, evidence, and the reason the decision was made, not just the conclusion.

## TL;DR

Draft PR [#4952](https://github.com/toptal/picasso/pull/4952) is open with **6 commits** on top of master. All local verifications green: `pnpm tsc:all` 0 errors, `pnpm lint` 0 errors / 184 warnings (baseline), `pnpm test:unit` 1292/1292. Alpha publish has **succeeded 4 times** on the branch (latest tip `3c5910282`). Client-portal validation surfaced a `OverridableComponent` consumer-pattern failure (3 errors in 1 file). After a multi-hour investigation including expert consultation and 5 controlled experiments, the decision is **Path A: consumer-side annotation migration**. The fix is documented in the changeset; no code change beyond what's already shipped is needed.

The cycle saga around alpha publish has more nuance than the original framing. The 4-edge cycle is **structural and pre-existing** — it appears in pre-pnpm CI runs, it appears on master, it appears on every PR. The original framing "PR #4920 introduced the cycle by removing the hint" was wrong. The nx hint that #4920 removed was for a smaller (2-edge) cycle through provider's own devDep; that smaller cycle is gone now. The 4-edge cycle was always there. Historical workflow data shows the same master SHA producing different alpha-publish outcomes on the same day — pure non-determinism. Our PR's two failures on `8c7a7fde5` are within historical flake rates. The hint on `picasso-tailwind-merge` (commit `e782f07a3`/`042eaa919`) correlates with 4/4 successes vs the pre-hint commit's 2/2 failures, but 5 controlled isolated experiments to reproduce the failure all succeeded. **The honest model is "nx-release-publish has a documented non-deterministic abort on this cycle and we cannot reproduce the failure outside of our PR's exact aggregate state."** The deterministic fix recommendation is `NX_IGNORE_CYCLES=true` on the alpha publish workflow.

**Next action**: review what's actually open (post-compact you have a clean state on the main branch — no uncommitted changes), decide whether to ship the `NX_IGNORE_CYCLES=true` follow-up against master, and decide how to respond to Daniel's Slack thread.

## Branch + PR state (current as of 2026-05-14 ~14:50)

- **Branch:** `pf-2031-upgrade-typescript-to-5-4` (name is a leftover — work targets TS 5.5)
- **PR:** <https://github.com/toptal/picasso/pull/4952> (draft)
- **Base:** `origin/master` at `3b7d5fbe5` (post-pnpm-migration tip)
- **Branch tip:** `3c5910282`

### Commits on the branch (oldest → newest, 6 total)

| SHA | Message | What's in it |
|---|---|---|
| `96b266794` | Upgrade TypeScript to 5.5 and align davinci tooling | TS `~4.7.0`→`~5.5.0` root + 10 packages, `@babel/preset-typescript`→`^7.26.0`, 5 davinci packages pinned to PR #2677 alphas (syntax@24/engine@14/qa@19/ci@8/code@3), all source-file type-error fixes, original `OverridableComponent` overload addition |
| `cd264f4bf` | Patch storybook docgen plugin for TS 5 compatibility | `pnpm patch` of `@storybook/react-docgen-typescript-plugin@1.0.2-canary.6` rewriting `ts.create*` → `ts.factory.create*` (15+ call sites). Also added 5 pnpm flags to `pnpm-workspace.yaml` (turned out to be duplicates of `.npmrc` settings — harmless redundancy, left in to match other repos' style) |
| `8c029b558` | Mark TS-peer bumps as major and widen peer range to ^5.5 | Reclassified 10 packages from minor/patch → major (peer-dep bump is breaking per semver), widened peer `~5.5.0`→`^5.5.0`, rewrote changeset body, added the 6 missing changeset entries Danger flagged |
| `8c7a7fde5` | Restore backward-compat shapes on three public type surfaces | Reverted `valueAxisTickFormatter` to `any` (matches Recharts contract), converted `composeValidators` to typed-const-with-overloads (typed + legacy callers both work), reordered `OverridableComponent` overloads so polymorphic comes first |
| `042eaa919` | Restore nx cycle-breaker hint to unblock alpha publishes | (Cherry-picked re-application of original `e782f07a3`.) Added `nx.implicitDependencies: ["!@toptal/picasso-test-utils"]` to `picasso-tailwind-merge/package.json`. Originally landed as `e782f07a3` which was force-pushed away during the A/B experiment, then re-applied via cherry-pick. |
| `3c5910282` | Revert OverridableComponent non-generic fallback signature | Removed the third call signature that was briefly added in `8f13936b6`. The third signature didn't fix the consumer HOC pattern (empirically and per expert advice). Reverted as dead code. Updated the changeset to document the actual one-line consumer migration: `({a, b}: Props) => …`. |

### Commits that were created and then reverted/abandoned this session
- `e782f07a3` — original cycle-breaker hint. Force-pushed away during the cycle hypothesis A/B, then cherry-picked back as `042eaa919`. Same content, different SHA.
- `8f13936b6` — added third non-generic `(props: P)` signature to `OverridableComponent`. Reverted by `3c5910282` after client-portal re-validation showed it didn't fix the problem.

## Verification status

| Check | Status | Where |
|---|---|---|
| `pnpm tsc:all` | ✅ 0 errors | local + CI Static checks |
| `pnpm lint` | ✅ 0 errors, 184 warnings (master baseline) | local + CI |
| `pnpm test:unit` | ✅ 307 suites / 1292 tests / 274 snapshots | local + CI |
| `pnpm build:storybook` | ✅ builds (size warnings only, expected) | local |
| Cypress integration | ✅ all green | CI |
| Visual Tests / Happo / Docs deploy | ✅ green after storybook patch (commit `cd264f4bf`) | CI |
| Alpha publish on `3c5910282` | ✅ success (run [25859506994](https://github.com/toptal/picasso/actions/runs/25859506994)) | dispatch UI |
| Client-portal alpha validation | ⚠️ 3 TS errors in 1 file — documented consumer migration (see "OverridableComponent saga") | external |

## Public API changes (final shape — all backward-compat preserved except where impossible)

### Forced by the upgrade
- **TypeScript peer dep**: `~4.7.0` → `^5.5.0` on every published package. Consumers must be on TS ≥5.5 to install. This is the only mechanical migration required for most consumers.

### Additive
- **`OverridableComponent<P>`** (in `@toptal/picasso-shared`) gains one additional ref-attribute call signature `<R = unknown>(props: P & RefAttributes<R>) => JSX.Element | null` listed AFTER the polymorphic `as`-prop signature. Allows `forwardRef<R, P>(...)` to assign under TS 5.x's stricter assignability when P contains required fields. Overload order means existing JSX call-sites (`<X />`, `<X as="..." />`) still resolve to the polymorphic signature.
- **`composeValidators`** in `@toptal/picasso-forms` is now a typed const with overloads — typed callers get `<T>` inference, legacy `unknown[]` callers still work. Runtime: now forwards `meta` to underlying validators (was being dropped before, this was always a bug).

### Consumer migration required for one pattern (TS 5.5 contextual-typing change)

There is exactly one pattern that doesn't auto-migrate:

```typescript
// Before (works under TS 4.7, breaks under TS 5.5)
const Wrap: OverridableComponent<Props> = ({ a, b }) => null
//                                          ^^^^^^  TS7031: implicitly 'any'

// After (works under TS 5.5)
const Wrap: OverridableComponent<Props> = ({ a, b }: Props) => null
```

This is documented in the changeset's "Public type surface" section. It is **not picasso-specific** — it's a TS 5.5 change in how contextual typing flows through callable interfaces with generic call signatures. The same breakage exists with the pre-PF-2031 single-overload interface shape (we verified this empirically). We expose it by requiring TS 5.5+, but we don't cause it.

### Internal cleanups (no public surface)
- Container styles.ts (file-local arrays → direct type unions)
- List/generateListItems typed
- Tagselector `isValidElement<{ className }>` narrowing
- TreeView `D3ZoomEvent` typing
- Select fire-on-change-event typing (kept `any` on consumer-facing `onChange` with documented variance reason)
- codemod utils typed (jscodeshift AST types)
- NumberInput `Number()` coercion
- Field.tsx `getValidators` generic + `children: any` kept with documented variance reason

## OverridableComponent saga — the full story

This was the second-biggest investigation of the session. Worth recording properly because it took multiple wrong turns.

### The problem

Client-portal validation (an agent ran the alpha versions against `toptal/client-portal`) found exactly one file failing typecheck:

```
libs/operations/src/components/OperationButtonWrapper/OperationButtonWrapper.tsx:17-23

export const OperationButtonWrapper: OverridableComponent<Props> = ({
  operation,
  children,
  operationTestId = '…',
  tooltipClassName,
  ...restProps
}) => { ... }
```

Three `TS7031: Binding element 'X' implicitly has an 'any' type` errors. The arrow function's destructured parameters lose contextual typing. Same pattern with no destructure (`(props) => …`) also fails — `props` gets implicit `any`.

This is the only file in the ~6000-TS-file client-portal repo using the `const X: OverridableComponent<Props> = (...) => ...` HOC annotation pattern. Other consumption (JSX `<Button as />`, `forwardRef<R, P>(...)`) works fine. `yarn install`, `yarn lint`, tests all pass on the consumer side.

### Wrong turn #1: the third-signature fix

My first hypothesis: TS picks the LAST call signature for contextual typing (the "implementation signature" rule). So I added a third non-generic call signature:

```typescript
export interface OverridableComponent<P = {}> extends NamedComponent<P> {
  <T extends ElementType = ElementType<Omit<P, 'as'>>>(
    props: PropsWithOverridableAs<T, P>
  ): JSX.Element | null
  <R = unknown>(props: P & RefAttributes<R>): JSX.Element | null
  (props: P): JSX.Element | null  // ← my proposed fix
}
```

Shipped as commit `8f13936b6`. Re-validated on client-portal: **same three errors, exactly**. The fix did nothing.

### The agent's empirical matrix (decisive evidence)

The client-portal validation agent then ran a clean four-variant micro-repro on TS 5.5.4 against the destructured-arrow assignment pattern:

| Variant | Interface shape | Result |
|---|---|---|
| V1 (3-sig as shipped) | `<T>(…)` → `<R>(…)` → `(P)` | ❌ implicit any |
| V2 | `(P)` first, then both generics | ❌ implicit any |
| V3 | `(P)` only (no generics) | ✅ passes |
| V4 | `(P)` and `<T>` (drop `<R>`) | ❌ implicit any |

I locally verified the same outcomes inside the picasso repo using TS 5.5.4. The conclusion is decisive: **the moment any generic signature is present in a callable interface, TS bails on extracting a contextual signature for an arrow function literal assigned to that interface, regardless of where the non-generic signature sits in declaration order or whether it's present at all.**

### Expert consultation

We sent a detailed prompt to an external TS expert. Their reply confirmed the diagnosis and pointed at the authoritative sources: the archived TS language spec's "Contextual Signatures" section says a contextual signature is extracted only when the target has a single non-generic call signature. The long-standing nrwl/nrwl-wait-actually-it's-microsoft/TypeScript#36304 issue documents that contextual parameter inference from overloads is "very finicky." Newer issue #59350 documents cases where adding/removing generic overload details causes parameters to become implicit any.

Their key insight: my third signature creates "a false sense of safety" — it may affect overload resolution at call sites but does not restore implementation-side contextual typing for arrow literals.

The expert offered three paths:
- **Path A**: document consumer migration (`({a, b}: Props) => …`). Smallest blast radius.
- **Path B**: ship `defineOverridableComponent<P>(impl)` helper that takes a simple `(props: P) => JSX.Element | null` and casts internally to `OverridableComponent<P>`. Slightly more ergonomic but adds permanent API surface.
- **Path C**: split into `OverridableComponent<P>` (JSX-callable) and `OverridableHoc<P>` (non-generic). Bigger API surface, similar migration cost to A.

We considered all three. After honest discussion, the user picked **Path A**: smallest API surface, mechanical one-line consumer change, doesn't dress up a TS limitation as a picasso ergonomic helper. We reverted the third signature (commit `3c5910282`).

### Why FC works but OverridableComponent doesn't (the rule, plainly)

`React.FC<P>` is defined as a callable interface with **exactly one non-generic call signature** (`(props: P, deprecatedLegacyContext?: any) => ReactNode`). Single concrete signature → TS extracts it as the contextual signature → destructured params get `P` projected into them. That's why `const X: FC<Props> = ({a, b}) => …` works without annotation.

`OverridableComponent<P>` has two generic call signatures (polymorphic + ref-attribute). Two generics → TS gives up on contextual typing → params fall to `any`. Adding more signatures doesn't help; only removing every generic does, which we can't do because the polymorphic-`as` and ref-typing are load-bearing for JSX consumers.

So the consumer migration message lands cleanly as: "OverridableComponent looks like FC but needs the param annotation because it carries polymorphic-as typing on top." Pretty clean framing for the changeset.

### Final shape (already shipped)

```typescript
export interface OverridableComponent<P = {}> extends NamedComponent<P> {
  <T extends ElementType = ElementType<Omit<P, 'as'>>>(
    props: PropsWithOverridableAs<T, P>
  ): JSX.Element | null
  <R = unknown>(props: P & RefAttributes<R>): JSX.Element | null
}
```

Two generic call signatures. Changeset documents the `({a, b}: Props) => …` migration for the one HOC pattern that breaks. Client-portal can land this with one line per HOC file (their case: one file).

## Alpha publish / nx cycle saga — the full story

This was the biggest investigation of the session. It started as "fix our PR's alpha publish failure," took a sharp turn into "the cycle was always there," and ended up with "alpha publishes have always been flaky on this repo and the right fix is at the workflow level."

### The cycle

```
picasso-provider ──prod-dep──> picasso-notification ──prod-dep──> picasso-tailwind-merge
       ▲                                                                   │
       │ (peerDep)                                                         │ (devDep)
       │                                                                   ▼
       └────────────────── picasso-test-utils <───────────────────────────┘
```

(Closing edge `test-utils → provider` is a peerDep, not regular dep, but nx 16+ considers peerDeps in the project graph by default.)

There's also a parallel cycle through `picasso-utils` (which has provider as both devDep and peerDep, and tailwind-merge depends on utils as a prod dep). When our hint suppresses the `tailwind-merge → test-utils` edge, nx finds the cycle through `utils` instead. The hint redirects the printed cycle path but doesn't actually break the cycle topology.

### History — what PR #4920 actually did

PR #4920 (pnpm migration, merged 2026-05-07) modified `picasso-provider/package.json`:
- Changed `prepublishOnly` from `yarn build:package` to `pnpm build:package` (mechanical)
- Removed `@toptal/picasso-test-utils` devDep, added `@testing-library/react` devDep
- **Removed `nx.implicitDependencies: ["!@toptal/picasso-test-utils"]`**

The original hint was on provider, suppressing the `provider → test-utils` edge. Pre-pnpm, provider had test-utils as a devDep, so the hint was breaking a 2-edge cycle `provider → test-utils → provider`. #4920 removed both the devDep and the hint together, reasoning "the hint is dead now that the dep is gone."

That reasoning was correct **for the 2-edge cycle that no longer exists**. But the 4-edge cycle through notification/tailwind-merge/test-utils was always there independently, and the hint on provider never actually suppressed it (we verified this — see "Pre-pnpm experiment" below). So #4920 didn't expose a new cycle; the cycle was already visible to lerna's build phase, the hint was just incidental decoration.

### The original story I told (which turned out to be too simple)

Initially I claimed:
1. The cycle is structural and was suppressed by the hint pre-pnpm.
2. PR #4920 removed the hint, exposing the cycle.
3. Our PR's alpha publish fails because of this newly-exposed cycle.
4. Our hint (`042eaa919`) restores equivalent suppression and the alpha publish succeeds.

The CI A/B looked clean: same code, hint flipped, FAIL → PASS. So the narrative seemed airtight.

### Daniel's challenge

Daniel pushed back: his test PR #4958 (small Button change on master, no nx hint) ran alpha publish successfully on 2026-05-14 morning. If the cycle was the cause, his run should have failed too. He asked us to validate by creating a minimal repro PR.

### What we actually found when we looked

**Finding 1: Daniel's run also hit the cycle.** Looking at his alpha run logs at `09:31:04`, the `lerna run build:package` step printed the exact same 4-edge cycle warning. The cycle was present; lerna just treats it as a warning and proceeds. His `nx release publish` step didn't surface the cycle again. So "cycle exists" ≠ "alpha aborts" — they're connected but not 1:1.

**Finding 2 (research): the asymmetry between lerna and nx-release-publish is by design.** Web research (including reading Lerna source and nrwl/nx issues) established:
- `lerna run <target>` passes `nxIgnoreCycles: true` by default ([Lerna commit](https://github.com/lerna/lerna/commit/480943b4e2055de8bf66db0bff9eba3e3be84d2d)). Cycles are warnings.
- `nx release publish` does NOT set that flag. Its auto-generated `nx-release-publish` target has hard-coded `dependsOn: ['^nx-release-publish']` ([nrwl/nx#27749](https://github.com/nrwl/nx/issues/27749), [#22720](https://github.com/nrwl/nx/issues/22720)) which mirrors the project graph 1:1. Cycle in project graph → cycle in publish task graph → hard abort.
- Cycle detection is deterministic given a fixed in-scope project set, but **non-deterministic across runs** because nx's "in-scope" set can shift based on release-group composition, project graph cache state, pnpm symlink resolution timing (nrwl/nx#33781), and other transient factors. Multiple historical false-positive-cycle issues across nx 15.x/19.x/20.x ([#29735](https://github.com/nrwl/nx/issues/29735), [#27679](https://github.com/nrwl/nx/issues/27679), [#14512](https://github.com/nrwl/nx/issues/14512)).

**Finding 3 (data): alpha publishes have always been flaky on this repo.** Looking at the workflow's run history:

| Date | SHA | Result | Same-SHA outcome |
|---|---|---|---|
| 2026-05-06 13:32 | `d857c0c` (pre-pnpm master) | **failure** | (same SHA) |
| 2026-05-06 14:52 | `d857c0c` | success | re-dispatched 80 min later, succeeded |
| 2026-03-11 13:56 | `424c0f1` (master) | failure | (same SHA) |
| 2026-03-11 16:11 | `424c0f1` | success | re-dispatched 2h later, succeeded |

Same code, same lockfile, two attempts, one failure one success. This pattern predates our PR by months. The Nx cycle has been intermittently aborting alpha publishes on master tip for at least 2 months.

**Finding 4 (pre-pnpm experiment): the 4-edge cycle predates #4920.** We created a temp PR #4960 on branch `test/pre-pnpm-cycle-check` based on `d857c0ce5` (the last pre-pnpm master commit). Added a no-op changeset bumping provider patch. Dispatched alpha (using the pre-pnpm version of the workflow via `gh workflow run --ref`). Result: alpha **succeeded**, but lerna build phase printed the same 4-edge cycle warning:

```
provider → notification → tailwind-merge → test-utils → provider
```

So the hint that #4920 removed never actually suppressed this cycle — the hint was on provider/test-utils edge (a different 2-edge cycle, since-eliminated). Our framing "PR #4920 exposed the cycle" was wrong. The 4-edge cycle was always visible; nothing has changed about it structurally.

**Finding 5 (controlled experiments): we cannot reproduce the failure in isolation.** Over 5 attempts:

| # | Baseline | Change | Result |
|---|---|---|---|
| 1 | pre-pnpm (`d857c0ce5`) | changeset only | success |
| 2 | pre-pnpm | + provider description tweak | success |
| 3 | pre-pnpm | + classnames constraint (`^` → `~`) + lockfile | failed at yarn.lock CI gate (yarn 1 non-determinism, not the cycle) |
| 4 | pre-pnpm | + provider typescript peerDep + lockfile + **major changeset** | failed at yarn.lock CI gate (same reason) |
| 5 | **post-pnpm (`3b7d5fbe5`)** | + provider typescript peerDep + pnpm-lock + **major changeset** | **success** |

Experiment 5 is the closest possible isolated mirror of what our PR does to provider, on the same master baseline our PR is on. The exact same change pattern + major changeset that our PR makes on provider — in isolation — succeeded. So "modify provider" isn't the trigger. "Major changeset on provider" isn't the trigger. "PeerDep change" isn't the trigger.

**Finding 6 (cycle path with vs without hint, sanity check):** with our hint on tailwind-merge, lerna prints the cycle going through `utils` instead of `test-utils`. Without the hint, it goes through `test-utils`. Both succeed in publish; the path that "always failed" (test-utils) actually succeeded on every experiment except our two original failed runs on `8c7a7fde5`.

### Where this leaves the model

The honest model now:
1. The 4-edge cycle is structural and predates everything else.
2. `lerna run build:package` always prints it as a warning (default `nxIgnoreCycles: true`).
3. `nx release publish` non-deterministically aborts on it. Failure rate appears to be roughly 30-50% based on historical data.
4. Our PR's two failures on `8c7a7fde5` are consistent with the historical flake rate, not statistically distinguishable from luck.
5. The hint correlates with our PR's 4 successes vs the pre-hint 2 failures, but with 5 isolated controlled experiments all succeeding, the hint's causal contribution is unproven. May be coincidence on small samples.
6. There are two remaining possible refinements:
   - **H1: aggregate state matters.** Our PR modifies ~30 files including 10 package.jsons. Maybe the combined state pushes nx into the failure path even though individual modifications don't. Testable by building up modifications progressively until alpha aborts. Expensive: 5-10 CI runs at ~6 min each.
   - **H2: pure flake.** Best supported by data so far. Testable by re-dispatching alpha on the same SHA 4-5 times to measure base failure rate.

### The recommended fix: `NX_IGNORE_CYCLES=true`

From the web research, the documented Nx behavior for "let `nx release publish` proceed despite cycles" is the `NX_IGNORE_CYCLES=true` environment variable. Setting it on the alpha publish job:

- Makes nx-release-publish tolerate cycles (matches lerna's default).
- Eliminates the flakiness regardless of whether H1 or H2 is true.
- Fixes the pre-existing master flakiness that's been there for months.
- One-line change in `.github/actions/build-publish-alpha-package/action.yml`:
  ```yaml
  env:
    NX_IGNORE_CYCLES: 'true'
  ```
- Documented behavior in nx's `run-command.ts`. Not a hack, not a bypass, the supported lever.

This should go in as a **separate small PR against master** (not part of PF-2031). PF-2031 keeps the hint for now because the CI A/B did flip the outcome on our exact commit pair, and even though we can't prove general causation, the hint doesn't hurt and might help.

**The structural fix that obsoletes both the hint and `NX_IGNORE_CYCLES`:** convert `picasso-test-utils → picasso-provider` and `picasso-utils → picasso-provider` from regular/devDep to peer-dep-only. That removes the cycle edges nx walks. Separate ticket. Not this PR's scope.

## What's open right now (working tree state at compaction time)

```
On branch pf-2031-upgrade-typescript-to-5-4
Your branch is up to date with 'origin/pf-2031-upgrade-typescript-to-5-4'.
Untracked files:
  TYPESCRIPT_UPGRADE_HANDOFF.md   (this file)
  TYPESCRIPT_UPGRADE_RESEARCH.md  (prior session's TS-version analysis, kept locally)
nothing to commit (working tree clean)
```

No staged or unstaged changes. No pending review of any working-tree code. Branch tip `3c5910282` is the latest committed state; alpha publish succeeded on it.

## Temporary infrastructure to clean up

These were created during the cycle investigation. None should be kept after the next session decides what to do.

### Worktrees (under `/tmp`)
- `/tmp/picasso-pre-pnpm` (branch `test/pre-pnpm-cycle-check`)
- `/tmp/picasso-post-pnpm` (branch `test/post-pnpm-cycle-check`)

To clean: `git worktree remove /tmp/picasso-pre-pnpm && git worktree remove /tmp/picasso-post-pnpm`

### Remote branches
- `origin/test/pre-pnpm-cycle-check`
- `origin/test/post-pnpm-cycle-check`

To clean: `git push origin --delete test/pre-pnpm-cycle-check test/post-pnpm-cycle-check`

### Draft PRs
- [#4960](https://github.com/toptal/picasso/pull/4960) (pre-pnpm cycle check) — draft, "do not merge"
- [#4961](https://github.com/toptal/picasso/pull/4961) (post-pnpm cycle check) — draft, "do not merge"

To clean: `gh pr close 4960 4961`

### NPM alpha packages published from temp PRs

Both temp PRs published alpha versions under tags `alpha-test-pre-pnpm-cycle-check-*` and `alpha-test-post-pnpm-cycle-check-*`. These won't impact anyone (they're alpha-tagged, won't be installed without explicit version pin), but they exist on the registry. No cleanup needed; they'll stay as-is and be ignored.

## Slack thread state with Daniel

Last messages drafted but **not yet sent**:

1. The initial response showing his PR also hit the cycle warning (drafted, may have been sent — verify in chat).
2. The post-experiment honest update: "you were right, cycle isn't the cause, this is a pre-existing flake, recommend `NX_IGNORE_CYCLES=true` at workflow level." Drafted but not sent at compaction time.

Recommended next message to Daniel (suggested, not sent):

> Update: we ran 5 controlled experiments today including a pre-pnpm baseline reproduction. The 4-edge cycle is structural and predates #4920 — your push back was correct. We also found same-SHA-different-outcome alpha-publish runs on master going back to March, so this is a long-standing flakiness in `nx release publish` on this cycle, not a regression from any specific PR. Going to file a separate PR adding `NX_IGNORE_CYCLES=true` to the alpha workflow env so master and every PR get deterministic behavior. PF-2031 keeps its tailwind-merge hint for now because the CI A/B did flip on our exact commit pair, but I'm not claiming it's the universal fix. Structural cleanup (peer-dep conversion for test-utils → provider, utils → provider) would obsolete both — separate ticket. Thanks for the push, the original framing was too simple.

## Open follow-ups (priority order)

1. **Decide and send the Daniel message.** Two options: send the version above as-is, or refine. Decision is yours.

2. **Decide on the `NX_IGNORE_CYCLES=true` PR.** Open a small PR against master adding the env var to `.github/actions/build-publish-alpha-package/action.yml`. Mention the historical flake data (`d857c0c` 2026-05-06, `424c0f1` 2026-03-11) as motivation. This is independent of PF-2031.

3. **Clean up temp PRs/branches/worktrees.** Commands above. Do this after the Daniel thread is settled and after step 2's PR is open, so reviewers can still see the historical artifacts if they want.

4. **PF-2031 ready-for-review state.** Already in good shape — green CI, alpha publishes, consumer migration documented. The remaining external dependency is the davinci-2677 alpha→stable swap. Steps to ready-mark:
   - Confirm `toptal/davinci#2677` has merged. If yes, do the alpha→stable swap as a single commit in PF-2031: replace the 5 pinned alpha versions in root `package.json:160-164` with caret stable (`^24.0.0` / `^14.0.0` / `^19.0.0` / `^8.0.0` / `^3.0.0`). If no, leave as-is and add a "blocked on davinci" note in the PR description.
   - Mark PR ready for review.

5. **Inform client-portal of the migration step.** They have one file (`OperationButtonWrapper.tsx`) that needs `: Props` added to the destructured arrow. The changeset documents this; they should also know directly so the bump is a clean apply.

6. **Separate tickets to file (post-merge, not this PR's scope):**
   - **Storybook 6 → 7+ upgrade.** Removes the need for the docgen-plugin patch in `cd264f4bf`.
   - **Convert peerDep-only structure for test-utils and utils.** Removes the cycle structurally; obsoletes both the tailwind-merge hint AND the `NX_IGNORE_CYCLES` env var.
   - **Workflow flake retry for alpha publish (optional).** If `NX_IGNORE_CYCLES=true` proves insufficient, add a retry-once gate. Less likely needed after the structural fix.

## Pointers / key commands

- **Re-verify locally:** `pnpm install && pnpm tsc:all && pnpm lint && pnpm test:unit`
- **Dispatch alpha publish:** Actions → Publish Packages to NPM → Run workflow → input PR number `4952`. Or `gh workflow run "Publish Packages to NPM" --ref pf-2031-upgrade-typescript-to-5-4 -f pull_request_number=4952`
- **Check what alpha versions got published:** look at `VERSIONS:` line in the alpha-publish job log, or the auto-comment on PR #4952
- **Inspect a CI run log:** `gh api repos/toptal/picasso/actions/runs/<run-id>/logs > /tmp/log.zip && unzip /tmp/log.zip -d /tmp/log/`
- **Davinci PR for stable releases:** <https://github.com/toptal/davinci/pull/2677>
- **PR #4920 (pnpm migration, source of the workflow context):** <https://github.com/toptal/picasso/pull/4920>
- **Daniel's PR #4958 (successful alpha despite no hint, evidence of flake):** <https://github.com/toptal/picasso/pull/4958>

## Key SHAs and runs (for forensic reference)

### Our PR's alpha publish history
| Run ID | Commit | Hint? | Conclusion |
|---|---|---|---|
| 25848379611 | `8c7a7fd` | no | **failure** |
| 25851976825 | `e782f07` | yes (orig) | success |
| 25855386445 | `8c7a7fd` | no (after force-push reset for A/B) | **failure** |
| 25857246107 | `8f13936` | yes (re-applied) | success |
| 25859506994 | `3c59102` | yes | success |

### Comparison runs
| Run ID | Commit | Branch | Conclusion |
|---|---|---|---|
| 25852680326 | `364c8cb4` | Daniel's PR #4958 | success (with cycle warning in lerna phase) |
| 25862954423 | `1ce963c5` | test/pre-pnpm-cycle-check (#4960) | success (with cycle warning) |
| 25864128202 | `cd7c5c2d` | test/pre-pnpm + classnames | yarn.lock gate failure (not cycle) |
| 25864459788 | `199eb47f` | test/pre-pnpm + classnames + lockfile attempt | yarn.lock gate failure (yarn 1 non-determinism) |
| 25864660547 | `15d04d1a` | test/pre-pnpm + description tweak | success |
| 25865588212 | `7bc9c447` | test/pre-pnpm + TS peerDep + lockfile + major | yarn.lock gate failure |
| 25865803542 | `bde89bbb` | **test/post-pnpm + TS peerDep + lockfile + major (#4961)** | **success** ← key experiment |

### Historical flake evidence (predates PF-2031)
| Run ID | SHA | Date | Conclusion |
|---|---|---|---|
| 25438461859 | `d857c0c` | 2026-05-06 13:32 | failure |
| 25442874175 | `d857c0c` | 2026-05-06 14:52 | success |
| 22956203699 | `424c0f1` | 2026-03-11 13:56 | failure |
| 22962359974 | `424c0f1` | 2026-03-11 16:11 | success |

## Lessons for the next investigation

1. **`lerna run` vs `nx release publish` have different cycle defaults.** Lerna passes `nxIgnoreCycles: true`; nx-release-publish does not. Don't assume cycle-warning-in-build means cycle-abort-in-publish.

2. **In-scope project set drives cycle detection in nx 21.x.** Same code, different release scope, different cycle outcome. This is the main source of non-determinism. There are documented sharp edges around `nx-release-publish` target dependsOn override.

3. **Yarn 1 lockfiles are not deterministic across node versions** (even though yarn 1 markets itself as deterministic). Our pre-pnpm experiments kept failing at the lockfile CI gate because my local yarn install (node 24.8.0) produced a different lockfile than CI's yarn install (node 24.14.1). pnpm-lock.yaml is much more stable.

4. **TS contextual typing through callable interfaces is the rule, not the exception.** The "FC works because single non-generic signature; anything more generic doesn't" rule applies to many React typing patterns, not just `OverridableComponent`. Worth keeping in mind for future picasso interface designs.

5. **When the CI A/B looks clean but isolated experiments don't reproduce, suspect flake.** We had a 2/2 fail vs 4/4 pass on `8c7a7fde5` vs hint-equipped commits. That's compelling at first glance. But 5 controlled isolated experiments all succeeded. The historical workflow data (same SHA, different outcomes) was the tiebreaker. If we had checked that earlier, we'd have saved hours.

6. **Don't shortcut lockfile updates.** I tried `--ignore-scripts` to skip postinstall steps. That worked locally but produced a lockfile CI rejected. The "right" install with matching node version still produced a lockfile CI rejected, because yarn 1 has subtle non-determinism. Sometimes the right answer is "use pnpm" or "match the CI version exactly," not "use a flag that bypasses some step."
