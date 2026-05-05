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

Some legacy props expose MUI v4 types directly (`MuiSwitchClassKey`, `Classes`, `PropTypes.Color`). These cannot be preserved on the new stack.

Pattern: replace with a Picasso-native equivalent and keep the old name as a deprecated alias for one major:

```ts
// Old
export interface NoteProps {
  classes?: Classes  // <- MUI v4 leak
}

// New
export interface NoteProps {
  /** @deprecated Use className for Tailwind-utility overrides. Will be removed in vNext. */
  classes?: undefined
  className?: string
}
```

The deprecation line carries to the codemod so consumers get a clear migration message.

## Reviewer-flagged preferences

Component-specific preferences (e.g., "Vedran prefers `iconStart` over `startIcon`") live in `components/<Name>.md` under a "Reviewer notes" section. The agent reads that per-component plan; respect those preferences over MUI conventions.

## Checklist

When you finish a component, the prop-surface diff should look like one of these:

- ✅ **Empty.** All props identical.
- ✅ **Tightened types.** No removals, no renames; one or two unions narrowed.
- ⚠️  **Removed/renamed with diff.json entry.** Acceptable if the entry exists and the codemod is implementable.
- ❌ **Removed/renamed without diff.json entry.** Block.
- ❌ **Default changed.** Block.
