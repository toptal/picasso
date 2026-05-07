# Switch — migration plan

## Identity
- Path: `packages/base/Switch/`
- Tier: Tier 0 — light path, **calibration anchor** (per migration plan v3 §3.1; PR #4906)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/switch`

## Dependencies
Migration must be applied AFTER:
- **FormLabel** (Tier 1) — Switch composes `<FormControlLabel>` from FormLabel for the label slot. **Sequence after FormLabel cleanup ships** (~0.1d earlier in the queue). Per migration plan §3.7 + R16.

## Migration scope
Per migration plan v3 §3.1: direct match. Replace `@mui/base/Switch` with `@base-ui/react/switch`'s compound parts.

- Replace `import { Switch as MUISwitch } from '@mui/base/Switch'` (current source state per master) with `import { Switch } from '@base-ui/react/switch'`.
- Migrate to compound parts: `<Switch.Root checked onCheckedChange><Switch.Thumb /></Switch.Root>` (per `rules/base-ui-react-api-crib.md`).
- Tailwind class composition (the existing `cx` inline pattern) stays as-is.
- `packages/base/Switch/package.json`:
  - Remove `@mui/base` from `dependencies`.
  - Add `@base-ui/react: 1.4.1` (or matching pinned version).
  - Lift React peer cap to `>=16.12.0`.

## Known gotchas
- **PR #4906 carries Switch's migration to `@base-ui/react: 1.2.0`.** Status (May 2026): OPEN. The Switch portion may already be implemented in that PR. Coordinate with #4906 author before scaling.
- Switch is the simplest Tier 0 component (~115 LOC, no `styles.ts`, pure inline `cx`). Light-path multipliers calibrate against this + Button.
- The `checked` prop semantics: `@mui/base/Switch` uses `checked` + `onChange`; `@base-ui/react/switch` uses `checked` + `onCheckedChange`. Map the Picasso public `onChange` to the new `onCheckedChange` internally — preserve the public prop.
- Switch composed in `<FormControlLabel control={<Switch />} />` per Picasso's API. The label-for-input linkage works via `id`/`htmlFor`; verify after FormLabel's type-only fix lands.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies`.
- [ ] Switch Happo: pixel diff ≤0.5%.
- [ ] FormLabel composition still works (Cypress + Jest cover this).

## Reviewer notes
- If PR #4906 lands the Switch portion before this entry runs, the orchestrator should detect the `pr` URL pre-filled in the manifest and either fast-forward or run a verification pass. Coordinate to avoid double-migration.
- Light-path multipliers feed PF-2024 / PF-2025 estimates per migration plan §10 R12 — calibrate carefully here.

## Slot keys

Per migration plan v4 §2.3, Switch preserves a `classes` prop via the `withClasses` shim from `@toptal/picasso-utils`.

```ts
export type SwitchClassKey = 'root' | 'thumb' | 'track'
```

- `root` — the outermost element (the `Switch.Root` container)
- `thumb` — the moving knob (Switch.Thumb)
- `track` — the background track that the thumb slides on

Light-path migration; Switch depends on FormLabel (Tier 1) — sequence after FormLabel cleanup ships.
