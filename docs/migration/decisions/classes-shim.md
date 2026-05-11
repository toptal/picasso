# Decision — `classes` prop strategy across the migration

**Status:** **LOCKED 2026-05-11** for all tiers. Decisions are data-driven by `decisions/classes-audit.md` (cross-tier audit).
**Date:** 2026-05-04 (rev 2026-05-07 scope amendment; rev 2026-05-11 Tier-0 lock; rev 2026-05-11 Tier-1/2/3 audit-driven lock).
**Risk reference:** [migration plan v4 §2.3](../../modernization/PI-4318-P1-MOD-01-migration-plan.md#23-api-preservation-default), [`PI-4318-PF-1992-design-decisions.md` §7](../../modernization/PI-4318-PF-1992-design-decisions.md), PR #4947 review threads r3207767115 + r3207780637.
**Supporting research:** `decisions/classes-audit.md` — source-level inspection + internal rg + external `gh search code` with manual textMatches verification across all 28 components.

---

## Revision 2026-05-11 — per-tier locked decision

Cross-tier audit (`decisions/classes-audit.md`) measured each component's actual `classes` API surface — source-level (StandardProps extension vs. local narrowing), internal callsite usage, and external consumer usage. The data overturned the original "three pending options" framing: real-world usage is concentrated on **two specific Tier 3 components** (Dropdown + OutlinedInput). Everything else is either vestigial or plumbing.

**Per-tier decision matrix**:

| Tier | Action | Affected components | Why |
|---|---|---|---|
| **Tier 0** | `extends Omit<StandardProps, 'classes'>` drop. Destructure `classes: _classes` runtime backstop. No diff JSON. | Backdrop, Badge, Button ✅, Drawer, Slider, Switch, Tabs. **Modal: re-verify** (external uses `closeButton` slot per audit §6/§9). | `classes` broken since @mui/base step. 0 internal usage. Audit-verified 0 external real usage (except Modal). |
| **Tier 1 cleanup** | Same `Omit` drop on Container / Typography / Notification (zero blast radius — audit-verified 0 callsites internal AND external). KEEP `FormControlLabel` narrowed surface (used by Switch/Radio/Checkbox). No-op on FormLabel / Grid / Form / Note / Menu / FormLayout / ModalContext / Utils (no `classes` API). | Container, Typography, Notification, FormControlLabel | Audit confirmed `classes` on these is vestigial — declared via inherited StandardProps but never read in source, never used externally. |
| **Tier 2** | `Omit` drop on all 5 public APIs. Rewrite internal MUI plumbing during @base-ui/react migration (plumbing-only slots disappear with the wrapper). | Checkbox, Radio, Tooltip, FileInput (+ subs), Popper | Audit-verified 0 external real consumer usage. Internal callsites are component-to-MUI plumbing that the migration replaces anyway. |
| **Tier 3.a** | `Omit` drop public. Rewrite internal slot-routing on @base-ui/react part-level `className`. | Accordion (+ subs), Page (+ subs) | Open-ended `StandardProps`, no external usage. Internal callsites use slots (root/summary/content/etc.) that map to @base-ui/react parts under migration. |
| **Tier 3.b** | **KEEP locally narrowed `classes?: { ... }` surface unchanged.** Port slot routing to @base-ui/react part `className`. | Dropdown (`{ popper, content }`), OutlinedInput (`{ input, root }`) | Audit confirmed real external consumer usage on these slots: Dropdown 2 callsites (staff-portal, topcall-desktop), OutlinedInput 4 callsites (topteam-frontend). Dropping breaks live consumers. |

**End-state target (after all 28 components migrate)**:
- `StandardProps`, `JssProps`, `Classes` types removed from `@toptal/picasso-shared`.
- Dropdown + OutlinedInput permanently retain their locally narrowed `classes?: { ... }` declarations.
- Every other migrated component has no `classes` prop in its public type.

---

## Reference patterns

### Pattern A — `Omit<StandardProps, 'classes'>` drop (Tier 0, Tier 1 vestigial, Tier 2, Tier 3.a)

```ts
export interface Props
  extends Omit<StandardProps, 'classes'>,
          /* other extensions */ {
  // ... other props (no `classes`) ...
}

const Component = forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
  const {
    /* ... your destructured props ... */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: _classes,    // runtime backstop for {...rest} spreads
    ...rest
  } = props
  // ...
})
```

Reference implementation: `packages/base/Button/src/Button/Button.tsx` (post-PR-#4947).

### Pattern B — Preserve narrowed `classes` surface (Tier 3.b — Dropdown, OutlinedInput)

```ts
export interface Props
  extends Omit<StandardProps, 'classes'>,    // drop open-ended
          /* other extensions */ {
  // ... other props ...
  /** Override per-slot Tailwind classes */
  classes?: { popper?: string; content?: string }   // ← narrowed shape, unchanged from pre-migration
}

const Component = forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
  const { classes, ...rest } = props
  return (
    <Popover.Positioner className={twMerge(baseClasses.popper, classes?.popper)}>
      <Popover.Popup className={twMerge(baseClasses.content, classes?.content)}>
        {/* ... */}
      </Popover.Popup>
    </Popover.Positioner>
  )
})
```

Both `Omit<StandardProps, 'classes'>` AND the local narrow re-declaration. This way TypeScript narrows — consumers passing `classes={{ wrong: '...' }}` get a type error.

---

## Withdrawn options (kept for historical context)

The earlier 2026-05-11 draft proposed three options for Tier 2/3: (a) `SlottedProps<K>` shared type, (b) per-component `Omit + Partial<Record<*ClassKey, string>>`, (c) drop entirely. The audit overturned the framing — option (c) is now the default for Tier 2 and Tier 3.a (because external usage is 0). Option (b)-shape is used for Tier 3.b but inline, without a shared `SlottedProps<K>` generic. The shared-type generic (a) wasn't needed because only 2 components retain a narrowed `classes` and they each declare their own slot shape inline.

`withClasses` helper at `packages/base/Utils/src/utils/with-classes.ts` is **deprecated** as of 2026-05-11. Tier 3.b uses direct `twMerge(base, classes?.slot)` instead. The helper can be deleted once the Tier 0/1/2/3 migrations all land.

---

## Historical context (SUPERSEDED — kept for audit trail)

> The sections below predate the 2026-05-11 audit and lock. They describe a `withClasses`-based universal-preservation strategy that was overscoped and is now deprecated. They're preserved so that future readers can trace why earlier prompts and PRs reference `withClasses` / `*ClassKey` patterns. **For new migration work, follow the locked decision above and `decisions/classes-audit.md`.**

### (Superseded) Original decision — preserve `classes` via `withClasses`

Every migrated Picasso component **preserves** a `classes` prop after the migration via a Tailwind-routing compatibility shim. The implementation lives at `packages/base/Utils/src/utils/with-classes.ts` and is re-exported from `@toptal/picasso-utils`:

```ts
import { twMerge } from '@toptal/picasso-tailwind-merge'

export function withClasses<K extends string>(
  base: Record<K, string>,
  overrides: Partial<Record<K, string>> | undefined
): Record<K, string> {
  if (!overrides) return base
  const out = { ...base } as Record<K, string>
  for (const key in base) {
    if (overrides[key]) out[key] = twMerge(base[key], overrides[key])
  }
  return out
}
```

Usage pattern (every component declares its own slot-key type):

```ts
import { withClasses } from '@toptal/picasso-utils'

export type ButtonClassKey = 'root' | 'label' | 'icon'

const baseClasses: Record<ButtonClassKey, string> = {
  root: 'inline-flex items-center px-4 py-2',
  label: 'font-semibold',
  icon: 'mr-2',
}

export interface ButtonProps {
  classes?: Partial<Record<ButtonClassKey, string>>
  // ...
}

export const Button: React.FC<ButtonProps> = ({ classes, ...rest }) => {
  const merged = withClasses(baseClasses, classes)
  return (
    <BaseUIButton className={merged.root}>
      <span className={merged.icon}>...</span>
      <span className={merged.label}>...</span>
    </BaseUIButton>
  )
}
```

## Why

Picasso's existing `classes` prop is the headline consumer-facing API in the 23-repo portfolio. Consumers reach into per-slot styling like:

```tsx
<Button classes={{ root: 'shadow-lg', label: 'tracking-wide' }}>
  Buy now
</Button>
```

Three options were considered:

| Option | Description | Verdict |
|---|---|---|
| **A** (chosen) | Tailwind-routing shim — preserve `classes` prop, compose values into per-slot classNames via `twMerge` | ✅ Preserves ~80% of consumer usage; ~30 LOC implementation; no breaking change |
| B | Remove `classes`, ship a codemod that rewrites consumer call-sites | ❌ Forces a coordinated breaking change across 23 active repos; codemod bears all the risk |
| C | Keep `classes` typed but no-op (silently drop) | ❌ Worst-of-both: type-checks but breaks visual styling at runtime — hardest failure mode to debug |

Option A walks back the v3-era plan to "remove `classes` universally". The cost (~30 LOC of utility + per-component slot-key declarations) is dramatically lower than the cost of forcing every consumer repo to absorb a coordinated codemod release.

## Scope amendment (2026-05-07)

The original v4 §2.3 wording was "every Picasso component must preserve `classes`". The May 2026 manifest audit revealed this is too aggressive: `withClasses` is a *preservation* mechanism, and many components in the manifest **do not currently expose `classes`** in their public Props. Forcing the shim onto those is NET-ADD of new API, not preservation.

**Strict policy** (effective 2026-05-07):

- **Apply `withClasses`** if the component currently exposes `classes` — either directly (`classes?: { ... }` in Props) or by extending `StandardProps` (which bundles `classes: Classes` via `JssProps`).
- **Skip `withClasses`** if neither condition holds. The migration is a clean swap; no slot routing, no `*ClassKey` type, no `baseClasses` plumbing.

**Manifest classification** (May 2026 audit, `grep -rE '^\s*classes\??:|extends.*StandardProps' packages/base/<NAME>/src`):

| Apply (10) | Skip (18) |
|---|---|
| Button (StandardProps) | Backdrop |
| Modal (direct) | Badge |
| Container (direct) | Drawer |
| Notification (StandardProps) | Slider |
| FormLabel (direct) | Switch |
| Typography (StandardProps) | Tabs |
| Radio (StandardProps) | ModalContext |
| Accordion (direct) | Grid |
| Dropdown (direct) | Menu |
| OutlinedInput (direct) | Utils |
| | Form |
| | FormLayout |
| | Note |
| | Checkbox |
| | Tooltip |
| | FileInput |
| | Popper |
| | Page |

For components in "Apply" that inherit `classes` via `StandardProps`, the public Props must narrow the inherited `Classes` type to `Partial<Record<*ClassKey, string>>`. This is a real API narrowing — consumers using arbitrary string keys break. Document keys-to-drop in `docs/migration/<Component>-diff.json` with `codemod: required`.

## Limits

The shim covers the dominant pattern: "consumer wants to add a class to slot X". It does NOT cover three rare patterns that still break:

1. **MUI v4 nested-state selectors** like `'& .Mui-disabled'` or `'&$expanded'` chained inside `classes`.
2. **Generated MUI class names** like `.MuiButton-root` referenced from consumer-side CSS files.
3. **`classes` keys not in the component's declared slot type** — silently ignored at runtime; TS narrows at the consumer call-site.

For (1) and (2), the migration's per-component diff JSON (`docs/migration/<Component>-diff.json`) flags the patterns with `codemod: required`. Codemod authoring is in PF-1995's scope, not the per-component PR.

## How agents apply this

0. **First, check whether to apply at all.** Run `grep -rE '^\s*classes\??:|extends.*StandardProps' packages/base/<NAME>/src --include='*.ts' --include='*.tsx'`. If empty, the component has no `classes` prop in its current API — **skip steps 1–5 entirely**. Migrate without slot routing.
1. Read the component's "Slot keys" section in `docs/migration/components/<Component>.md`. The slot list is canonical.
2. Declare `<Component>ClassKey = 'root' | ...` literal-union type at the top of the component file.
3. Build `baseClasses: Record<<Component>ClassKey, string>` mapping each slot to its Tailwind class string.
4. Add `classes?: Partial<Record<<Component>ClassKey, string>>` to the public Props interface (or *narrow* the inherited `Classes` type if the component extends `StandardProps`).
5. Inside the component, call `withClasses(baseClasses, classes)` once and use the result's per-slot strings as the `className` for each slot's element. Apply on the **public** component (e.g. `Button.tsx`), not just the internal Base (e.g. `ButtonBase.tsx`).

Both `PROMPT-light.md` and `PROMPT-heavy.md` codify this as a "Conditional output shape" section. `rules/api-preservation.md` documents the policy at the rule-doc level.

## Verification

- `yarn workspace @toptal/picasso-utils build:package` passes (the shim compiles).
- `yarn jest packages/base/Utils/src/utils/__tests__/with-classes.test.ts` passes (8 unit-test cases cover undefined/empty/partial/full overrides + dedupe + non-mutation).
- After each migration PR: every Picasso component's published types declare `classes?: Partial<Record<*ClassKey, string>>`.
- Smoke test on 2-3 real consumer-app fixtures (mined per migration plan v4 §7.3): `<Button classes={{ root: '...' }}>` still type-checks and styles correctly.
