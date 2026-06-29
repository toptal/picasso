<!--
  Standards-audit checklist — externalized 2026-06-18 from bin/lib/orchestrator-core.ts.

  Loaded at runtime by `checklist.judgeAudit()` (via `loadAuditChecklist()`) and
  injected into BOTH the migration-loop and review-sweep audit prompts. Everything
  below the AUDIT-CHECKLIST-BODY marker is injected VERBATIM (byte-for-byte) in place
  of the former inline literal — preserve the blank-line rhythm and the section
  headers (### A. / ### B. / ### C.).

  HOW TO APPEND (graduation tier-`checklist`, or operator hand-applying a proposal):
  add a numbered bullet under the matching section, e.g.
    20. **Title** (practices.md §"..."): <what the diff MUST / MUST NOT do>.
  Use an `Nb.` suffix to slot beside an existing item (e.g. 14b). The loader counts
  numbered items and FAILS the audit (loudly) if the count drops below its floor — so
  never delete the section headers or renumber destructively.
-->
<!-- AUDIT-CHECKLIST-BODY -->
**Standards compliance checklist — walk this in order on every audit.** Cite the matching §section for each violation. Skip items that don't apply to this diff:

### A. Hard rules (severity=high if violated)
1. **`classes` prop decision** (decisions/classes-audit.md + design-patterns-addendum.md §2): is the component Dropdown or OutlinedInput? If yes, the narrowed `classes?: { ... }` MUST be retained. For other Tier-0 components, audit-aligned drop via `extends Omit<StandardProps, 'classes'>` + runtime backstop. Flag any deviation.
2. **Casts** (code-standards.md §"Type-narrowing & casting"): any `any` / `as unknown as T` / bare `// @ts-ignore` in component source files (NOT in *.test.tsx)? When you flag a cast, the CANONICAL alternative to recommend is the "prop-by-prop boundary" pattern documented in `code-standards.md §"The 'prop-by-prop boundary' — canonical resolution for root-element-type mismatches"` and `practices.md §"API preservation"` — destructure SPECIFIC incompatible props out of `...rest`, spread the rest unchanged. Do NOT recommend an exhaustive allowlist (`{ name, form, tabIndex, ...one_by_one }`) — that's a SEPARATE anti-pattern ("typed but no-op" per item 2b below) that drops every public-API prop the allowlist doesn't enumerate. If the agent has already tried the allowlist path in a prior iter and you flagged it, do NOT flip your recommendation back to "keep the allowlist" — that produces the oscillation observed on Switch review-iter 7 (allowlist → cast → allowlist). Both are wrong; the third option is destructure-incompatibles-then-spread-rest.
2b. **"Typed but no-op" passthrough allowlist** (practices.md §"API preservation"): does the diff replace `{...rest}` with an exhaustive enumeration like `<BaseUISwitch.Root name={name} form={form} tabIndex={tabIndex} ... />` while the public `Props` interface still extends `ButtonHTMLAttributes<HTMLButtonElement>` (or similar)? That's a regression — all the unenumerated props (`onClick`/`onFocus`/`onBlur`/arbitrary `data-*`/`aria-*`) are claimed in types but silently dropped at runtime. Recommend the prop-by-prop boundary pattern (destructure ONLY incompatible props, spread rest unchanged). If the agent is oscillating between this and a blanket cast, name both as anti-patterns AND cite the canonical pattern explicitly.
3. **`useLayoutEffect` from React** (code-standards.md §"SSR safety"): forbidden — must be `useIsomorphicLayoutEffect` from `@toptal/picasso-shared` (ESLint error in source).
4. **Aggregate self-imports** (code-standards.md §"ESLint custom rules"): any sub-package importing from aggregate `@toptal/picasso`? ESLint error.
5. **Build-before-snapshot precondition** (practices.md §"Build & snapshot precondition"): if diff regenerates snapshots, was `pnpm -F @toptal/picasso-<NAME> build:package` verified clean first? Look for 1-line empty-`<div>` snapshots — those are the precondition-failed signature.
6. **Imperative ref for visual override** (code-standards.md §"CSS specificity ladder" + practices.md §"@base-ui/react idioms"): any `ref={(node) => { ... .style.X = ... }}` or `useRef` callback that mutates `.style` for visual/theme purposes? The Switch iter-2 pattern is NOT canonical; use slot `className` / Tailwind selectors / `!important` ladder instead.
7. **`!important` without ladder justification** (code-standards.md §"CSS specificity ladder"): any new `!important` that doesn't sit AFTER rungs 1-3 were demonstrated insufficient? Look for adjacent comments explaining WHY lower rungs failed.

### B. Reviewer-blocking practices (severity=medium-high)
8. **API preservation** (practices.md §"API preservation"): consumer-facing handler signatures preserved (e.g., `onChange(event, checked)` not bare `onCheckedChange`)? Portal/behavior props preserved or deprecated-not-deleted with `@deprecated` JSDoc + ticket ref?
9. **JSDoc on public props** (code-standards.md §"JSDoc rules"): every NEW or MODIFIED public Props field has `/** description */`? Internal passthrough props (`ownerState`, `data-private`) MUST NOT have JSDoc — they'd leak as public API.
10. **`@deprecated` ticket ref** (code-standards.md §"JSDoc rules"): any `@deprecated` JSDoc that lacks a `[ABC-1234]` or URL? ESLint is warn-level only; reviewers consistently block.
11. **Boolean prop prefix on NEW props** (PICASSO_COMPONENT_DESIGN_PATTERNS rule 14): any NEW boolean prop using `is`/`has`/`should` prefix? (Existing props on already-shipped components are carve-out-protected per rule 7 above.)
12. **Changeset content + bump tier** (code-standards.md §"Changeset conventions" + practices.md §"Changesets"): does `.changeset/<name>.md` pick the correct bump per the standard taxonomy? `patch` is the default for a clean library swap (public API + types unchanged, behavioral parity verified by CI). `minor` only if a new prop / value / opt-in behavior was added. `major` ONLY if a concrete consumer-visible break is named (removed/renamed prop, narrowed type, default flipped, layout-shifting CSS). Migration is NOT auto-major; `@mui/base` / `@material-ui/core` are Picasso `dependencies` not consumer peer-deps, and widening the `react` peer cap is not breaking. Body uses present-simple tense and behavioral-parity framing.
13. **PR description completeness** (PROMPT-light/heavy.md §8): is `migration-runs/<run-date>/<Component>/pr-description.md` present and does it have Summary + Decisions + Limitations + Verification sections (each ≤4 sentences)?
14. **Tailwind class ordering** (code-standards.md §"Tailwind class composition"): user-supplied `className` MUST be LAST in `twMerge(structural, ..., className)` so consumer overrides win. Look for reversed-order `twMerge(className, structural)` — silently breaks consumer customization.
14b. **Bare boolean data-variants** (practices.md §"Tailwind & class composition"): any bracketed boolean data-variant in a className — `data-[starting-style]:`, `data-[ending-style]:`, `data-[open]:`, `data-[closed]:`, `data-[focused]:`, `data-[disabled]:`, `data-[checked]:` — that should be the bare form? Tailwind v4 matches bare boolean data-attributes natively (identical compiled CSS), so these MUST be written bare (`data-starting-style:` etc.). Brackets are correct ONLY for value-matching variants (`data-[side=top]:`, `data-[orientation=vertical]:`). Flag each bracketed boolean form for conversion — review-response will NOT catch these on its own (Drawer #4994 iter 12 shipped 10 in DrawerPaper.tsx unflagged).
15. **Debug artifacts in working tree** (practices.md §"Verify before commit"): any `*-thumbs.json`, `baseline-*.json`, `local-*.json`, `fetch-happo-diffs.mjs` at repo root in the diff? Should be in a gitignored scratch dir.
16. **tsconfig hygiene** (practices.md §"tsconfig & build hygiene"): when `package.json` drops a workspace dep, does `tsconfig.json` drop the matching `references` entry in the SAME commit? Mismatched configs fail `tsc -b` in CI's Build job.

### C. @base-ui/react idioms (severity=medium)
17. **Slot-based styling** (practices.md §"@base-ui/react idioms"): if the diff wraps an `@base-ui/react` component with multi-part slots, does it use `slots={{ partName: Component }}` + `slotProps={{ partName: { className, ... } }}` instead of a class dictionary? (OutlinedInput canonical.)
18. **Polymorphic Button pattern** (rules/base-ui-react-api-crib.md §"Polymorphic Button"): `nativeButton + render={React.createElement(as)}` — NOT runtime `typeof`/`isValidAs` guards on the `as` prop.
19. **`@base-ui/utils@0.2.8` patch** (practices.md §"@base-ui/react idioms"): Tier 0 components need it applied via `pnpm.patchedDependencies` + lockfile `patch_hash`; do NOT re-derive.

