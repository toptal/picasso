# Picasso design patterns — migration addendum

Read [`PICASSO_COMPONENT_DESIGN_PATTERNS.md`](../../../PICASSO_COMPONENT_DESIGN_PATTERNS.md) (repo root) for the canonical 16 component-level + 3 form-component rules. This addendum covers ONLY:
1. **The existing-violations carve-out** — what the migration leaves alone.
2. **Migration-period architectural exceptions** — deliberate, audit-backed tensions with the canonical rules (rule 5 / rule 10).
3. **How the agent applies design patterns during a library-swap migration.**

## 1. Existing-violations carve-out (read this FIRST)

`PICASSO_COMPONENT_DESIGN_PATTERNS.md` is the **future spec** validated by CI on new/modified components. The migration is a **library swap**, not a standards-compliance retrofit. **Pre-existing violations of these patterns in already-shipped components REMAIN AS-IS post-migration.** Do NOT opportunistically fix them in a library-swap migration PR.

Per the codebase survey (`_survey-findings.md` §H, now extended to 28 rows via scan #21), 25/28 components currently comply with all 16 rules. Documented exceptions (which the migration preserves):

- **Modal**: exposes `classes?: { closeButton?: string, ... }` (rule 5 violation). Preserve as-is during migration; phased removal tracked separately in `decisions/classes-audit.md`.
- **Typography**: exposes computed `VARIANT_WEIGHT` / `VARIANT_COLOR` mappings as an internal pattern (not public `classes` per se but still a rule-5-adjacent legacy shape). Preserve as-is.
- **OutlinedInput**: exposes `classes?: { root?: string, input?: string }` (legacy @mui/base pattern). Per the Tier 3.b decision, narrowed shape RETAINED.
- **Dropdown**: per the audit-backed Tier 3.b decision, retain narrowed `classes?: { popper?, content? }`. See "Migration-period architectural exceptions" below.
- **Drawer** (NEW finding from scan #21): functional component without `forwardRef` (rule 1 N/A-equivalent; Props don't follow `interface` convention either). Preserve — this is a documented variance for portal-rendering components.

Additional NEW finding from scan #21: **Form-component context integration** — `FormLabel` and `FormControlLabel` call `useFieldsLayoutContext()` to adapt styles based on form layout (horizontal vs vertical). This is the form-component-specific pattern documented in `_survey-findings.md` §I.

**Rule of thumb**: does the existing component source already do X? If yes, preserve X. If no, follow the canonical rule.

**Newly-introduced code paths** during the migration (e.g., a new adapter helper, a new wrapper around `@base-ui/react`) DO follow the canonical patterns. The carve-out covers preservation of existing public API, not justification for newly-introduced violations.

A future, separate refactor track (post-migration) will sweep components into full compliance. That work is NOT in scope for the modernization program. Track it via the standards-compliance Jira queue, not migration PRs.

## 2. Migration-period architectural exceptions

These are deliberate, audit-backed exceptions to the canonical rules, distinct from the existing-violations carve-out above.

### Rule 5 (no `classes` prop in public API) vs Tier 3.b locked decision

- **Tension scope**: 2 components (Dropdown, OutlinedInput) — transition only.
- **What we do**: retain narrowed `classes?: { popper?, content? }` on Dropdown and `classes?: { input?, root? }` on OutlinedInput. Real external consumers depend on these slots (Dropdown 2 callsites, OutlinedInput 4 callsites per the cross-tier audit).
- **End-state**: Dropdown + OutlinedInput consolidate to `className`-only API once consumers migrate. Tracked in `decisions/classes-audit.md` §Tier 3.b.

### Rule 10 (`extends BaseProps`) vs current Picasso shape

- **Tension scope**: ALL components mid-migration. Per survey, 20/28 already use `extends BaseProps`; 3/28 (Accordion, Tooltip) still use `extends StandardProps`; 5/28 use mixed extends.
- **What we do**: preserve whatever the existing component already extends. **DO NOT** preemptively convert prop interfaces to `extends BaseProps` during a library-swap migration PR. Apply `Omit<StandardProps, 'classes'>` per the classes decision matrix where needed.
- **End-state**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` are removed from `@toptal/picasso-shared`. The conversion to `BaseProps`-only happens in a coordinated post-migration sweep.

### Rule 5 — Modal and Typography legacy

- **Tension scope**: 2 components (Modal, Typography). These were rule-5 violators before the migration started.
- **What we do**: preserve their existing `classes?: { ... }` shape. Don't drop the prop in the migration PR even though rule 5 forbids it.
- **End-state**: a separate API-cleanup sweep removes these `classes` props in a future major.

## 3. How the agent applies design patterns during a migration

- **Apply canonical rules to NEW code paths** introduced as part of the swap (adapter helpers, wrappers around `@base-ui/react`, new internal types, new hooks).
- **Preserve existing public API** even when it violates a canonical rule. Out-of-scope cleanup goes to the post-migration refactor track.
- **Flag any deliberate API change** in the changeset with a deprecation alias to preserve back-compat.
- **At the `@base-ui/react` boundary**, narrow types per rule 4 (native HTML prop names), rule 9 (string-literal union variants), and rule 14 (no `is`/`has`/`should` prefix on NEW boolean props). Survey confirms 100% existing compliance with rule 14, so any new code should match.
- **For NEW form components or NEW form-field props**, follow rules F1–F3 (extend `FieldProps`, honor standard form-field props, render through `PicassoField`).
- **Do NOT widen scope**: a library-swap migration should not introduce sweeping API renames. If a deliberate rename is necessary, add a deprecation alias for one major version.

## Quick reference — what survey found about existing compliance

From `_survey-findings.md` §H (full matrix in that doc):

| Rule | Current compliance | Migration action |
|---|---|---|
| R1 Optimize defaults for common case | 28/28 ✓ | Maintain — apply to new props. |
| R2 Reuse prop names across components | 28/28 ✓ | Maintain. |
| R3 Keep prop names short and simple | 28/28 ✓ | Maintain. |
| R4 Mirror native HTML prop names | 28/28 ✓ | Maintain. |
| R5 Style overrides only via `className`/`style` | 26/28 (Modal, Typography legacy) | Preserve legacy. Apply to NEW slots. |
| R6 Prefer `children` over content props | 28/28 ✓ | Maintain. |
| R7 Use `rem` for sizes | 100% (Tailwind tokens enforce) | Maintain — token system handles it. |
| R8 Align tokens with BASE design system | 100% (via `picasso-tailwind`) | Maintain — `tokens/picasso-tailwind-tokens.md`. |
| R9 `variant` as string-literal union | 28/28 ✓ | Maintain. |
| R10 Extends `BaseProps` | 20/28 (3 use StandardProps, 5 mixed) | Preserve existing. Apply to NEW components only. |
| R11 `as` to change rendered element | Where applicable, ✓ | Maintain. |
| R12 Shared `SizeType` scale | 100% where size prop exists | Maintain. |
| R13 Shared `Palette` + `ColorSample` | 100% where color prop exists | Maintain. |
| R14 No `is`/`has`/`should` prefix | 28/28 ✓ | Maintain. NEW boolean props use bare adjectives. |
| R15 Compound components for multi-part | 4/28 (Modal, Accordion, Drawer, Button-family) | Optional — only for 3+ distinct sub-parts. |
| R16 `testIds` object | 6/28 (Modal, Accordion, Slider, Tooltip, FileInput, RTE) | Optional — only for multi-part addressable test selectors. |

For form components (F1–F3): verify on a per-component basis. Survey did not deep-audit form-field compliance.
