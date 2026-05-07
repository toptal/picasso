# API preservation rules

The migration is a re-implementation, not a redesign. Consumer code must not break unless there is no alternative.

## What stays the same

- **Public props listed in the component's interface MUST remain.** Same names, same defaults, same types (or compatible types — see below).
- **Export names and file paths MUST stay.** A consumer doing `import { Note } from '@toptal/picasso-note'` keeps working.
- **Default exports stay default; named exports stay named.**
- **Forwarded refs stay forwarded.** If the legacy component used `React.forwardRef`, the migrated component does too.
- **`children` semantics are preserved.** If the legacy component renders `children` inside a particular slot, the migrated one does the same.
- **`className` and `style` props are still accepted** and merged with the migrated component's classes via `twMerge` (consumer wins).
- **`data-*` attributes pass through.** Especially `data-testid` — selectors used in 4 active repos depend on these.

## Allowed changes (no codemod)

- **Tighten types.** Removing an unused union member from a prop's type is fine. Example: `variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary'` → `'primary' | 'secondary' | 'tertiary'` if the fourth was always dead.
- **Snapshot regeneration.** Class names will change; that's expected. Snapshots regenerate; the test assertions stay the same.

## Disallowed changes without a codemod

- **Removing a prop.**
- **Renaming a prop.**
- **Broadening a required prop's type to require a new value.**
- **Changing default values.**
- **Removing a re-exported symbol.**

If you MUST remove a prop, add an entry to `docs/migration/<Component>-diff.json`:

```json
{
  "component": "Note",
  "removed": [
    {
      "prop": "classes",
      "reason": "Classes was an MUI v4 leak that cannot be preserved on @base-ui/react + Tailwind",
      "codemod": "required"
    }
  ],
  "renamed": [
    {
      "from": "expanded",
      "to": "open",
      "reason": "Aligning with @base-ui/react API",
      "codemod": "required"
    }
  ]
}
```

The orchestrator collects these into PR descriptions and feeds them to PF-2024 (codemods).

## MUI-leaked types

Some legacy props expose MUI v4 types directly (`MuiSwitchClassKey`, `PropTypes.Color`, `SnackbarOrigin`). These cannot be preserved on the new stack as imports — replace with Picasso-native equivalents.

Pattern: replace with a Picasso-native equivalent. Keep the old name as a deprecated alias only when the prop semantics genuinely change.

```ts
// Old (MUI v4 type leak)
import type { PropTypes } from '@material-ui/core'
export interface ContainerProps {
  align?: PropTypes.Alignment  // <- MUI v4 leak
}

// New
export interface ContainerProps {
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify'
}
```

## `classes` prop (preserved via Tailwind-routing shim — v4 §2.3)

**Walks back the v3-era plan to remove `classes` universally.** Per migration plan v4 §2.3, every Picasso component **preserves** a `classes` prop after migration via `withClasses` from `@toptal/picasso-utils`. Pattern:

```ts
import { withClasses } from '@toptal/picasso-utils'

// Per-component slot keys — see the component's plan file
// (`docs/migration/components/<Name>.md`, "Slot keys" section).
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

**Rationale.** `classes` is the headline consumer API in the 23-repo portfolio; preserving ~80% of usage avoids a coordinated breaking change. The shim is dependency-light (only `@toptal/picasso-tailwind-merge`).

**What the shim does NOT cover** (rare cases that still need codemods or manual fixes):

- MUI v4 nested-state selectors: `'& .Mui-disabled'`, `'&$expanded': { ... }`
- Generated MUI class names like `.MuiButton-root` referenced from consumer CSS
- `classes` keys that don't match the component's declared slot type — silently ignored at runtime; TS catches at the consumer call-site

If a consumer's `classes` usage relies on any of these, the migration's prop-surface diff (`docs/migration/<Component>-diff.json`) flags them with `codemod: required`. Codemod authoring lives in PF-1995, not in the per-component PR.

The full decision rationale is in `docs/migration/decisions/classes-shim.md`.

## Reviewer-flagged preferences

Component-specific preferences (e.g., "Vedran prefers `iconStart` over `startIcon`") live in `components/<Name>.md` under a "Reviewer notes" section. The agent reads that per-component plan; respect those preferences over MUI conventions.

## Checklist

When you finish a component, the prop-surface diff should look like one of these:

- ✅ **Empty.** All props identical.
- ✅ **Tightened types.** No removals, no renames; one or two unions narrowed.
- ⚠️  **Removed/renamed with diff.json entry.** Acceptable if the entry exists and the codemod is implementable.
- ❌ **Removed/renamed without diff.json entry.** Block.
- ❌ **Default changed.** Block.
