# PF-2023 provider migration — follow-up task list

**Scope:** `@toptal/picasso-provider` package (PR #5040 / PF-2023) and its direct fallout.
**Source:** consolidated from the PR #5040 review + cross-referenced with prior Claude Code
sessions (provider review, PF-2238/PF-2226 correlation/handoff, provider migration plan,
React-19 support, CssBaseline, consumer-adoption in staff-portal/client-portal).
**Compiled:** 2026-07-22. Working copy — Jira is intentionally untouched; the "Jira hygiene"
items below are reminders to action in Jira yourself.

> Legend: `[x]` done in the current session (uncommitted) · `[ ]` open · **(you)** owner-only
> · _(opt)_ optional/nice-to-have · ticket refs are references only.

---

## 0. Done this session — commit these

- [x] READMEs border-box → content-box — `packages/picasso-tailwind/README.md:34`, `packages/picasso/README.md:62`
- [x] Remove orphaned `lodash` dep — `packages/picasso-provider/package.json`
- [x] `as unknown as` → `HTMLElement`-supertype forward — `packages/base/FormLabel/src/FormControlLabel/FormControlLabel.tsx:99`
- [x] Repo-wide `pnpm test:unit -u` (Node 22) — build green, **0 snapshot changes** (drift already reconciled)
- [ ] Commit the changed files (9 tracked: the 3 code fixes + 4 §2 doc/type fixes + `pnpm-lock.yaml` — plus this follow-up doc)

## 1. Pre-merge blockers (DoD gates)

- [ ] **Cascade-contract sign-off (Vitor)** — reset moved to `@layer base` flips equal-specificity ties on `html`/`body`/`#root` for default-JSS consumers (highest-consequence change)
- [ ] **Full Happo green + sign-off** — Storybook + Cypress; local Happo is font-blind, CI-authoritative
- [ ] **Portal smoke in staging** (PF-2210) **(you)**
- [ ] **React 19 validation** **(you)** — but the harness is a stub; see §4
- [ ] Rebase off Tooltip #5005 + query-builder #5006 **(you — reported done; confirm the stray `Tooltip/.../test.tsx.snap` is gone)**

## 2. Pre-merge — recommended code / doc fixes

- [x] **Add consumer `content`/`@source` instructions to `packages/picasso-tailwind/README.md`** — a missed glob over the provider's dist = silent app-wide content-box breakage (the box-sizing island now lives in generated Tailwind classes). Flagged as "first question for PF-1995."
- [x] **Changeset: name the `Layout.contentMinWidth` type-removal break** — guidelines require every break named; currently omitted
- [ ] **Decide Checkbox/Switch changeset tier** — `.changeset/checkbox-switch-single-label-node.md` is `minor` despite a documented DOM-contract break ("update selectors/styles"); arguably `major`, consistent with Page going `major`. (PF-2244 sub-task)
- [ ] _(opt)_ **Box-sizing island `:where()` fix** — `packages/picasso-provider/src/Picasso/styles.tsx:17` still uses non-zero-specificity `[&_*]:[box-sizing:inherit]`; the sibling `font-sans` was already fixed. Not impacting anyone today (only `SliderMark`, which has no border/padding), but latent + violates the in-file doctrine
- [x] _(opt)_ **PicassoLight `Omit` completeness** — the `notificationContainer` typo was already fixed upstream; the live gap was `disableHelmet` (accepted but unused — PicassoLight renders no `HelmetProvider`), now added to the `Omit`
- [x] _(opt)_ **Document the `--content-width` Page CSS-var API** — documented at the var-definition site (`Page/styles.ts`) and in the PicassoBook Page description (`story/index.jsx`)

## 3. Merge coordination (non-code)

- [ ] **Send heads-ups before merge:** TACO (sourcing-extension — `body{width:100vw}` leaks into LinkedIn host pages) + signal (`html{overflow-x:hidden}` clips wide tables). Without these they silently re-break.
- [ ] **Jira hygiene (do in Jira yourself):**
  - PF-2221 — marked Done but describes the reverted border-box flip as shipped, and sign-off is still pending → correct description + reopen/relabel
  - PF-2238 — marked Done before its fix (PF-2226) merged; post the AC-mapping + "don't build Option A" comment (link exists; comment posting unconfirmed)
  - PF-2023 — AC claims "React 19 validated (O2 unblocked)" which is hollow (harness never built) → reword

## 4. React 19 / peer-dep readiness (O2 / PF-2236)

- [ ] **`notistack` 3.0.1 → 3.0.2** — cheap patch that adds React 19 peers (provider dep)
- [ ] **`react-helmet-async` React 19** — `2.0.3` peers `^16.6||17||18` (no 19), unmaintained → upgrade to 3.x (major; check ESM/maintainership) or replace (provider dep)
- [ ] **Fix `react-dom` peer gaps** — provider declares no `react-dom` peer; `picasso-page` still pins `^18.2.0` despite an uncapped `react`
- [ ] **Build the React 19 validation harness** (`test:react19`, PF-1994) — currently a stub, no CI job
- [ ] **Ref-plumbing fixes** — `Fade.tsx:30`, `Slide.tsx:64`, `ClickAwayListener.tsx:89` read `.ref` off children behind `@ts-ignore` (React-19-removed `findDOMNode` via `react-transition-group`)
- [ ] **Repo-wide `react<19` cap lift** (~55 packages) — O2; convention is drop the upper bound (`>=16.12.0`), reconcile stale `<20.0.0`/`<19.5.0` plan-doc wording
- [ ] **`@types/react`@19 + TS 5.0+** — no manifest declares `@types/react` today (transitive 17.x); required to typecheck React 19
- [ ] _(opt)_ **Revisit `strictPeerDependencies: false`** — currently masks all the capped-peer install failures

## 5. Downstream / deferred (tracked)

- [ ] **PF-1995** — consumer migration + `@toptal/picasso-codemod` (strip `PicassoProvider`/`.override`/`theme`/`injectFirst`/`disableClassNamePrefix`; rework the 1 `.override` callsite). Sequence *after* Happo sign-off.
- [ ] **PF-2210** — Staff Portal onto new Page + Provider; unassigned "long pole"; its local Page/Provider patches will collide; confirm whether it SSRs
- [ ] **Token single-source-of-truth dedup** — raw tokens live twice (`Picasso/config` runtime JS ↔ `picasso-tailwind` preset); drift risk. No ticket filed.
- [ ] **Grid default-spacing convergence** — SSR fallback (24px) can shift after hydration; converging needs a Grid/Grid.Item redesign. File a ticket.
- [ ] **PF-2232** — topkit republish (coordinate so PF-1995 + PF-2232 + PF-2210 Happo diffs don't land in one window and become unattributable)
- [ ] _(opt)_ **`generate:component`** can't scaffold a new `packages/base/` package (`AVAILABLE_PACKAGES` predates the base split)
- [ ] _(opt)_ **`palette.ts:52` stale MUI comment** — fold into the token dedup
- [ ] _(opt)_ **79 pre-existing changeset lint violations** — in other stacked migrations' changesets; not this PR's, but open repo-wide
- [ ] _(opt)_ **CSP one-line per-portal check** before PF-2210/PF-1995 rollout (near-zero risk; Staff Portal already permits nonce-less inline `<style>`)

---

## Already resolved earlier — context, no action

Reset → `@layer base` (PF-2221) · responsive-styles engine retired + inverted-cascade fixed
(PF-2226 / `0600a60db`) · scrollbar → `base.css` · box model reverted to content-box (#5046)
+ most stale docs fixed · repo hygiene (MUI templates, `@types/material-ui__utils` shim, stale
JSS docs) · Storybook TopBar regression → `.storybook/styles.css` · `matchMedia` `@media`-prefix
bug · cross-package snapshot drift (re-verified 0 changes this session).
Settled false alarms: Radio `.override()` (stale-ref artifact, 0 callsites) · Grid as a 2nd
engine consumer (no imports) · Safari ≤13 `matchMedia` (browserslist floor ≥17.6).
