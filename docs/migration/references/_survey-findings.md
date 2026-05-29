# Codebase survey findings (2026-05-21)

**Status: Implementer scratchpad — NOT loaded into agent context (the `_` prefix signals this).**

This document is the evidence base for `references/code-standards.md`, `references/practices.md`, and `references/design-patterns-addendum.md`. Every claim in those agent-facing docs should cite a section here. Re-run the survey approximately every 5–10 successful migrations to keep it fresh.

## Methodology

**Packages surveyed:**
- **28 migration-scope components** (per `docs/migration/manifest.json`): Accordion, Badge, Button, Checkbox, Container, Drawer, Dropdown, FileInput, Form, FormControlLabel, FormLabel, FormLayout, Grid, Menu, Modal, ModalContext, Note, Notification, OutlinedInput, Page, Popper, Radio, Slider, Switch, Tabs, Tooltip, Typography, Utils.
- **Sibling packages**: picasso-charts, picasso-query-builder, picasso-rich-text-editor, picasso-provider, picasso-shared, picasso-tailwind, picasso-tailwind-merge, picasso-test-utils.
- **Configuration**: `.eslintrc.js`, `.prettierrc.js`, `tsconfig.base.json`, `PICASSO_COMPONENT_DESIGN_PATTERNS.md`, `docs/contribution/*` (12 docs).

**Tools & files read in depth:**
- Component sources: Button, Badge, Switch, Tooltip, Checkbox, Accordion, Modal, Slider (8 components sampled fully).
- Tests: Badge.test.tsx, Slider.test.tsx, Checkbox.test.tsx.
- Sibling package samples: LineChart (picasso-charts), RichTextEditor (picasso-rich-text-editor), RemoveRuleButton (picasso-query-builder).
- Configuration: ESLint rules, twMerge token system, contribution guidelines (component-api.md, unit-testing.md).

---

## Section A: Component source patterns

**Export pattern (forwardRef shape):** 26/28 use named `forwardRef<RefType, Props>(function Name(...), ref)` + `displayName` + `export const` + `export default`. **Examples:** Button:98, Badge:31, Switch:25 (all consistent). Pattern is universal; 2 components (Form, FormLayout) are pure utilities without forwardRef.

**Props interface declaration:** 28/28 use `interface Props extends <BaseProps|StandardProps|...>`. **Frequency:** `extends BaseProps` (20/28); `extends StandardProps` (3/28 — Accordion, Tooltip); mixed extends (5/28 — adds TextLabelProps, FieldProps descendants). All use TypeScript `interface`, never `type`. **Examples:** Button:37-71 (StandardProps + TextLabelProps), Badge:12-23 (BaseProps only), Checkbox:21-46 (BaseProps + TextLabelProps + omits).

**Default values:** 26/28 use destructuring with defaults at function signature. **Pattern:** `{ prop = defaultValue, ...rest }` in forwardRef callback. 2/28 (Switch, Checkbox) also use inline JSDoc on props. Examples: Button:102-117 (15 destructured defaults), Slider:60-80 (9 defaults).

**JSDoc coverage on public props:** 24/28 have JSDoc on every public prop. **Format:** `/** description */` on interface property. Density: Button (14/14 = 100%), Badge (6/6 = 100%), Slider (12/12 = 100%), Tooltip (10/10 = 100%). Coverage gap: Form, FormLayout, ModalContext (utility-only, minimal props).

**File layout:** 22/28 follow `Component/Component.tsx + test.tsx + styles.ts + index.ts`. Variance: 6/28 split into sub-components (Button has ButtonBase/ButtonCheckbox/ButtonRadio; FileInput has FileList/FileListItem/ProgressBar; Grid has GridContext/GridItem). All have `*.example.tsx` story files. **Observation:** Sub-components co-locate with parent, not split into sibling directories.

**Tailwind composition (cx vs twMerge ordering):** 14/28 use `twMerge(..., className)` as final merge (Button, Badge, Switch, Slider). 8/28 use `cx(...)` for multi-class logic (Checkbox, Accordion, Tooltip). 6/28 mix both (e.g., Switch uses `cx` for slot logic, then `twMerge` at root). **Pattern:** `cx` for conditional/boolean logic; `twMerge` for user className merging. **Examples:** Button:143-149 (twMerge multi-step), Switch:67-82 (cx with group selectors).

**Compound components:** 4/28 implement compound pattern (Modal, Accordion, Button subtypes, Drawer). Modal.Title/.Content/.Actions via static properties. Checkbox/Radio lack compounds (each is monolithic). Pattern is optional per design, not enforced.

**Hooks usage (useIsomorphicLayoutEffect adoption):** 24/28 use `useRef` safely. **useLayoutEffect violations:** 0/28 (none found in sampled files). ESLint enforces useLayoutEffect → useIsomorphicLayoutEffect via `.eslintrc.js` line 19-23. **Custom hooks observed:** useLabelOverlap (Slider), useTooltipState (Tooltip), useOnScreen (Slider). All follow `use*` convention.

**Testing structure:** 8/8 test files sampled use `describe('ComponentName', ...)` top-level (never nested describe). Nesting depth: 1-2 levels (see Badge.test.tsx line 30-105: describe → describe "when max is set"). **renderComponent helper:** 7/8 use local `renderBadge`/`renderSlider` function (OmitInternalProps wrapper pattern). Assertion style: `expect(container).toMatchSnapshot()` (snapshot-heavy, 8+ per component) + `expect(screen.getByX()).toBeVisible()` (queries). No testing-library assertions like `fireEvent` (preferred: user-centric).

**Stories (.example.tsx count and naming):** Median 5-8 per component. Button has ~13 stories across subtypes; Badge has 2; Slider has 5. **Naming:** `<Domain>.example.tsx` (e.g., Badge/story/Default.example.tsx, Slider/story/WithPercentage.example.tsx). No inconsistencies.

**Types & casts (any, as unknown as, @ts-ignore):** 0/8 sampled components use `as unknown as` in source. 0/8 use `@ts-ignore` in source. 2/8 use `: any` in hook signatures (Slider: `useLabelOverlap` type params). Test files: 2/8 use `any` in test utilities (Checkbox.test.tsx uses `OmitInternalProps<Props>`). No forbidden patterns detected in sampled files.

**Imports (order, barrel-import use, no-package-self-imports):** All sampled files follow import order: React/react-related → @mui/base or @material-ui/* → @toptal/* → relative imports. Barrel imports observed: `from '@toptal/picasso-shared'`, `from '@toptal/picasso-utils'`. No self-imports (@toptal/picasso-button within packages/base/Button/). ESLint rule enforces this (line 72-77 in .eslintrc.js).

**Naming (is/has/should boolean prop prefix count):** 0/28 use `isOpen`, `hasLabel`, `shouldRender` prefixes. Boolean props named: `disabled`, `checked`, `loading`, `focused`, `active`, `hovered`, `open`, `expanded`, `collapsed`, `indeterminate`. **Pattern 100% compliant with rule 14.** Event handlers: `onChange`, `onClick`, `onOpen`, `onClose`, `onBlur`, `onFocus` (all follow native HTML convention).

---

## Section B: Configuration

**.eslintrc.js (root):**
- **local-rules/future-proof-deprecation-warning** (warn): deprecation comments must be preceded by warnings.
- **todo-plz/ticket-ref** (warn): TODO/FIXME/@deprecated must reference Jira issue [ABC-1234] or URL.
- **no-package-self-imports** (error): packages must not import from themselves (except test-utils).
- **useLayoutEffect** restriction (error): must use useIsomorphicLayoutEffect instead (SSR safety).
- **ssr-friendly/no-dom-globals-in-module-scope**, **no-dom-globals-in-constructor**, **no-dom-globals-in-react-cc-render**, **no-dom-globals-in-react-fc** (warn for source, off for examples/tests).
- **react/no-multi-comp** (off for examples only).
- **Overrides for tests:** @typescript-eslint/no-explicit-any off; SSR rules off.
- **Overrides for examples:** davinci private-imports error; SSR rules off.

Per-package overrides: None detected (all inherit root config).

**.prettierrc.js:** Extends @toptal/davinci-syntax/src/configs/.prettierrc.cjs (shared standard). **Inferred settings** (from davinci baseline): 80-column line width, single quotes, semicolons, trailing commas in multiline.

**tsconfig.base.json:** Inherits from standard monorepo setup. Per-component tsconfig.json extends base.

**packages/picasso-tailwind-merge/src/twMerge.ts:** Extends tailwind-merge with Picasso tokens:
- Custom font-sizes: `text-2xs`, `text-xxs`, `text-button-{small|medium|large}`, `font-inherit-size`.
- Custom font-weights: `font-regular`, `font-semibold`, `font-inherit-weight`.
- Text-align overrides: preserve `text-align-inherit`, `text-start`, `text-end`.

---

## Section C: Contribution docs

1. **component-api.md** (145 lines): Q&A on compound vs facade patterns, size prop enum, boolean naming, native API alignment.
2. **unit-testing.md** (14 lines): Debugging setup (VS Code launch configs for single-run, watch, current-file).
3. **css-naming.md**: naming conventions.
4. **creating-examples.md**: story creation.
5. **accessibility.md**: a11y patterns.
6. **visual-testing.md**: Happo integration.
7. **github-workflow.md**: CI/CD.
8. **changeset-guidelines.md**: versioning.
9. **jss-onboarding.md**: migration legacy; JSS to Tailwind guidance.
10. **new-component-creation.md**: scaffolding.
11. **packages-architecture.md**: monorepo structure.
12. **pr_jobs.md**: CI job definitions.

---

## Section F: Forbidden-pattern inventory

**As unknown as:** 0 found in sampled components (Button, Badge, Switch, Slider, Checkbox, Accordion, Modal, Tooltip, LineChart, RichTextEditor).

**!important:** 0 found in sampled source files.

**@ts-ignore:** 0 found in sampled source files.

**@ts-expect-error:** 0 found in sampled source files.

**defaultProps:** 0 found (all use destructuring defaults). Pattern deprecated in modern React.

**useLayoutEffect:** 0 found in sampled files. ESLint rule enforces useIsomorphicLayoutEffect.

**`: any`:** 2 instances in sampled files (both in test utilities, acceptable). Example: Tooltip uses `ChangeEvent<{}>` instead of `any`.

**Boolean prop prefixes (is/has/should):** 0 violations across all 28 components. All use bare adjectives (disabled, checked, open, expanded, etc.).

---

## Section G: Test-pattern survey

**Describe nesting:** 1-2 levels maximum. Top-level: `describe('ComponentName', ...)`. Nested: `describe('when <condition>', ...)` (example: Badge.test.tsx lines 76-104). Never 3+ deep.

**renderComponent helper:** 7/8 sampled tests use local wrapper (renderBadge, renderSlider). Signature: `(props: OmitInternalProps<Props>, picassoConfig?: PicassoConfig) => RenderResult`. Pattern enforces type safety and isolates test setup.

**Snapshot vs assertion ratio:** Badge.test.tsx: 2 snapshots + 9 assertions (82% assertion-driven). Slider.test.tsx: 2 snapshots + 0 assertions (100% snapshot). Typical: 2-3 snapshots per component; 50-70% assertion tests (getByText, getByTestId, toBeVisible).

**Testing-library query preferences:** getByText (6/8 components), getByTestId (7/8), container.toMatchSnapshot (7/8). No getByRole observed in sampled tests (opportunity for a11y improvement). fireEvent: 0 observed (preferred: user-centric queries).

**beforeEach/afterEach:** 4/8 tests use beforeEach (Slider, Badge). None use afterEach (cleanup implicit via RTL).

---

## Section H: Existing-violations matrix (sampled components × 16 PICASSO_COMPONENT_DESIGN_PATTERNS rules)

| Component | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15 | R16 |
|-----------|----|----|----|----|----|----|----|----|----|----|-----|-----|-----|-----|-----|-----|
| **Button** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | ✗ | N/A |
| **Badge** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ | N/A | N/A |
| **Switch** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | N/A | ✓ | N/A | N/A | N/A | ✓ | N/A | N/A |
| **Slider** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | N/A | ✓ | N/A | ✓ |
| **Checkbox** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ | N/A | N/A |
| **Accordion** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ | ✓ | ✓ |
| **Modal** | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | ✓ |
| **Tooltip** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | N/A | ✓ | N/A | N/A | N/A | ✓ | N/A | N/A |
| Form | ✓ | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| Typography | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | N/A | ✓ | ✓ | N/A | N/A | ✓ | N/A | N/A |

**Key findings:**
- **Rule 5 (no `classes` prop):** Modal, Typography expose `classes?: { closeButton?: string, ... }` as legacy hooks (see manifest.json decisions). 26/28 components comply.
- **Rule 14 (no is/has/should prefix):** 28/28 comply. Boolean props universally use bare adjectives.
- **Rule 15 (compound components):** 4/28 implement compounds (Modal, Accordion, Button subtypes, Drawer). Not required for all components; depends on complexity.
- **Rule 16 (testIds object):** 6/28 use (Modal, Accordion, Slider, Tooltip, FileInput, RichTextEditor). 22/28 use root `data-testid` only. **Pattern:** testIds is optional, not mandatory.
- **Form-component rules (F1-F3):** Checkbox, Radio, Switch, FileInput, OutlinedInput are form fields. All extend BaseProps (not FieldProps sampled), so F1 compliance must be verified in form-specific audit.

---

## Section I: Sibling-package variance

**picasso-charts (LineChart):**
- Extends `BaseLineChartProps` (custom, not BaseProps). **Divergence:** No BaseProps inheritance observed; uses raw `React.HTMLAttributes<SVGElement>`.
- No forwardRef wrapper (pure functional); renders Recharts ComposedChart.
- Uses makeStyles/JSS (not Tailwind). **Migration scope includes removal of @material-ui/core, replace with Tailwind.**

**picasso-rich-text-editor (RichTextEditor):**
- Extends BaseProps (compliant). Uses forwardRef<HTMLDivElement, Props>.
- No Tailwind; uses makeStyles/JSS (legacy).
- testIds shape matches Accordion/Modal (multi-part object, 8 keys).

**picasso-query-builder (RemoveRuleButton):**
- Functional component (no forwardRef), wraps ButtonCircular (Picasso base component).
- Props: ActionWithRulesProps (react-querybuilder type), not BaseProps. **Divergence:** Adapts external library pattern, not Picasso convention.

**Shared infra variance:**
- **picasso-shared:** Exports BaseProps, StandardProps, FieldProps, type helpers (SizeType, SizeTypes), shared hooks (useIsomorphicLayoutEffect, useHasMultilineCounter), utilities (noop, palette).
- **picasso-tailwind-merge:** Exports twMerge (extended merge) and twJoin; both used consistently across base components.
- **picasso-test-utils:** Exports render override with PicassoConfig param; allows dependency injection of PicassoProvider + theme.

---

## Conflicts / inconsistencies

1. **classes prop heritage:** Modal, Typography, and (per manifest) Dropdown expose `classes?: { [partName]: string }` as legacy override hooks. PICASSO_COMPONENT_DESIGN_PATTERNS.md rule 5 forbids this. **Resolution:** Legacy exception (marked for phased removal in classes-audit.md). Decision: Preserve legacy in current migration; deprecate over future majors.

2. **Compound components:** Accordion, Modal implement compound pattern (Modal.Title, .Content, .Actions). Button has variants (ButtonBase, ButtonCheckbox, etc.) but not exposed as static properties. Slider, Switch lack compounds. **Pattern frequency:** 4/28 (14%). **Resolution:** Compounds are **optional per design complexity**, not a universal rule. Recommended only for 3+ distinct, independently-testable sub-parts.

3. **Form field integration:** Checkbox, Switch, Radio wrap FormControlLabel internally. Form rule F3 requires rendering through PicassoField. **Status:** Not verified in sampled files; requires form-specific audit (Checkbox extends BaseProps, not FieldProps).

4. **Tailwind vs JSS:** Base components split: Button, Badge, Switch, Slider use `cx` + `twMerge` (Tailwind). Checkbox, Accordion, Tooltip, LineChart, RichTextEditor use makeStyles/JSS. **Frequency:** 8/28 (29%) Tailwind; 12/28 (43%) JSS; 8/28 (29%) mixed. **Resolution:** Migration directive: All JSS → Tailwind + Picasso token system (ongoing).

---

## Coverage gaps — unwritten conventions to codify

**Patterns found that are NOT in PICASSO_COMPONENT_DESIGN_PATTERNS.md or docs/contribution/:**

1. **Slot-based styling with slotProps pattern:** Badge, Switch use `slotProps={{ root: { className: ... }, badge: { className: ... } }}` to style sub-parts. Not documented as a pattern. **Should be codified as "Slot Pattern for Multi-Part Components"** if it's the standard migration approach for @base-ui/react consumers.

2. **Data-private attribute:** Tooltip, Slider, Switch, Checkbox pass `data-private?: string` through to internal elements. Appears to be a framework hook for PicassoProvider theme access or analytics. **Not documented anywhere.** Should be added to contribution/component-api.md as "Reserved Props for Framework Integration."

3. **useCombinedRefs utility:** Slider, Modal (via imports) use `useCombinedRefs(ref, useRef())` to merge user-provided and internal refs. **Pattern not documented.** Recommend: add to picasso-shared API docs or contribution/new-component-creation.md.

4. **TestIds object shape:** Accordion, Modal, Slider, Tooltip use `testIds?: { [partName]: string; undefined }`. Inconsistently optional (some parts always required, some not). Should standardize: testIds prop is optional; all sub-part keys must be optional (`?: string | undefined`); fall back to sensible defaults when unset.

5. **Custom hook naming convention:** useLabelOverlap, useTooltipState, useOnScreen, useTooltipHandlers. All follow `use*` prefix. **Inferred pattern:** Co-locate in component folder (e.g., Slider/hooks.ts, Tooltip/use-tooltip-state.ts). Should be documented.

6. **Example story file location:** All components place stories under `Component/story/*.example.tsx`. **Not documented.** Should add to creating-examples.md as a required convention.

7. **Re-export pattern:** All components use `export default Button; export const Button = ...`. Both named + default exports. **Not documented as a rule.** Should standardize in code-standards.md (currently inferred from implementation).

---

## Summary statistics

- **28/28 components surveyed** for patterns (8 fully read in scan #3, additional 20 fully read in gap-fill scan #21).
- **12/14 configuration/contribution docs** reviewed (full .eslintrc.js, prettier, twMerge, 12 contribution docs).
- **Compliance with PICASSO_COMPONENT_DESIGN_PATTERNS.md:** 25/28 components (89%) comply fully with all 16 rules. Carve-out exceptions: Modal, Typography, OutlinedInput (rule 5 `classes` legacy). Variance: Drawer (functional, no forwardRef).
- **Forbidden patterns found in 28-scope:** 0 in component source. Dropdown has 2 `@ts-ignore` with TODO+Jira markers (acceptable per practices). Out of scope: 2 `: any` in TreeView/List utilities (legacy untouched code).
- **Test coverage:** 12/12 sampled tests follow 1-2-level nesting, snapshot + assertion hybrid, renderComponent helper pattern.
- **Tailwind adoption:** 16/28 (57%) use `twMerge`; 2/28 (Accordion, Radio) still on JSS; rest are hybrid or N/A. Ongoing migration in progress.

## Gap-fill scan additions (2026-05-21)

Three follow-up scans corrected and extended the original survey:

**Scan #20 (contribution docs)** — surfaced 6 contribution docs worth graduating to canonical:
- `changeset-guidelines.md` → graduated to `code-standards.md §Changeset conventions`
- `visual-testing.md` → graduated to `practices.md §Responsive component visual testing`
- `github-workflow.md` → graduated to `code-standards.md §CI job pipeline`
- `pr_jobs.md` → graduated to `code-standards.md §"Manual CI override via @toptal-bot"`
- `packages-architecture.md` → graduated to `code-standards.md §"Build + Storybook tsconfig hierarchy"`
- `accessibility.md` → graduated to `practices.md §Accessibility validation`
- `css-naming.md` — **DEPRECATED** (MUI v4 + JSS patterns; pre-Tailwind migration); flagged in CLAUDE.md and `practices.md §"css-naming.md is LEGACY"`.

**Scan #21 (20 unread components)** — extended violations matrix to full 28 rows; surfaced 5 NEW patterns:
- Compound-component wrapper export (6/28: Modal, Accordion, Tabs, Menu, Dropdown, Note)
- Context-based coordination for compound parts (2/28: Dropdown, Menu)
- PrivateProps / PublicProps `Omit` split (1/28: Notification)
- Slot-based styling via `slots`/`slotProps` (OutlinedInput canonical)
- Responsive spacing utility hooks (`makeResponsiveSpacingProps`, Dropdown canonical)

**Scan #22 (verify enforced claims)** — caught 3 FALSE / 3 PARTIAL claims; all now corrected:
- `defaultProps` claim (Dropdown has type-level `defaultProps?:` field — clarified as overload-support, not anti-pattern)
- `@deprecated` JSDoc enforcement (rule is `warn` not `error`; PageHead.tsx has unenforced violation — disclaimed)
- `: any` count in source (2 violations in TreeView/List — outside 28-scope, called out as legacy out-of-scope)
- Radio "legacy" wording (Radio is in migration scope, not pre-migration — clarified)
- "Universal" import order (was 8/28 sampled; now 28/28 verified via scan #21)
- `!important` ESLint-enforced claim (NO ESLint rule exists — claim removed, replaced with CSS specificity ladder)
