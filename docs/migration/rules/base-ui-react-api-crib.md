# `@base-ui/react` API crib

**Version pinned:** `@base-ui/react` v1.4.1 (Apr 20, 2026 — stable since Dec 2025).
**Authoritative source:** [base-ui.com/llms.txt](https://base-ui.com/llms.txt) and per-component pages under [base-ui.com/react/components](https://base-ui.com/react/components).
**Refresh cadence:** verify this doc against `base-ui.com/llms.txt` at the start of each `@base-ui/react` minor release (v1.5, v1.6, …). Currently pinned: **v1.4.1**.
**Source mapping:** per-Picasso-component target table sourced verbatim from [migration plan v3 §3.1 / §3.3 / §3.4 / §9.9](../../modernization/PI-4318-P1-MOD-01-migration-plan.md).

> **Why this doc exists.** `@base-ui/react`'s API differs from `@mui/base` (its predecessor) and from `@material-ui/core`. Components are now compound primitives (`Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`) rather than monolithic ones. The agent must use the patterns pinned here, not its training data.

---

## Per-Picasso-component target table

| Picasso component | `@base-ui/react` target | Confidence | Strategy |
|---|---|---|---|
| Backdrop | None — keep custom | High | No standalone Backdrop in `@base-ui/react`; only `Dialog.Backdrop`. Replace with `<div>` + scroll-lock + Tailwind per [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md). |
| Badge | None — keep custom | High | No Badge in `@base-ui/react`. Plain `<span>` + Tailwind. Already mostly custom. |
| Button | `@base-ui/react/button` (`Button`) | High | Direct match. PR #4906 reference. |
| Drawer | `@base-ui/react/drawer` (`Drawer.Root` + parts) | High | Direct match. Includes swipe-to-dismiss gestures. |
| Modal | `@base-ui/react/dialog` (`Dialog.Root` + parts) | High | Picasso's "Modal" maps to the dialog primitive. |
| Slider | `@base-ui/react/slider` (`Slider.Root` + parts) | High | Direct match. |
| Switch | `@base-ui/react/switch` (`Switch.Root` + `Switch.Thumb`) | High | Direct match. PR #4906 reference. |
| Tabs | `@base-ui/react/tabs` (`Tabs.Root` + `Tabs.List` + `Tabs.Tab` + `Tabs.Panel`) | High | Direct match. |
| Menu (already migrated in source) | (no source change) | High | Source already uses `@toptal/picasso-popper` + `@toptal/picasso-paper`. Only `package.json` cleanup. |
| Form / FormLayout / ModalContext / Note / Typography | None — already-clean | High | Tier 1: peer-dep cleanup + React 19 cap lift only. No primitive change. |
| Container | None — keep custom | High | No `@base-ui/react` Container. Pure layout wrapper. Tier 1 type-only fix: replace `import type { PropTypes } from '@material-ui/core'`. |
| FormLabel | None — own type | High | No `@base-ui/react` FormControlLabel. Tier 1 type-only fix: replace `import type { FormControlLabelProps }` with own type. |
| Grid | None — keep custom | High | No `@base-ui/react` Grid. Pure CSS Grid + Tailwind. Tier 1 type-only fix: replace `export type { GridSize }`. |
| Notification | None — keep `notistack` | High | `@base-ui/react/toast` exists but Picasso uses `notistack`. Tier 1 type-only fix: replace `import type { SnackbarOrigin }`. |
| Utils | None — own implementation | High | Replace `capitalize` re-export (1-line); replace `ClickAwayListener` re-export (small custom hook OR consumers swap to `@base-ui/react`'s built-in dismiss in Dialog/Popover/Menu); convert `Rotate180` JSS → Tailwind transition. |
| Checkbox + CheckboxGroup | `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group` | High | Direct match for both. |
| Radio + RadioGroup | `@base-ui/react/radio` (Root) + own group wrapper using `@base-ui/react/field` + own context | High | `@base-ui/react/radio` exists; group composition needs custom wrapper. |
| Tooltip | `@base-ui/react/tooltip` (`Tooltip.Provider` + `Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`) | High | Direct match. Compound parts pattern. |
| FileInput | None — keep custom | High | No file-input primitive in `@base-ui/react`. Build on plain `<input type="file">` + Tailwind. 3 subcomponents (FileListItem, ProgressBar, FileList) all custom. |
| Popper | `decision-pending` | — | No standalone Popper in `@base-ui/react`. See [`decisions/popper-replacement.md`](../decisions/popper-replacement.md). Recommended: `@floating-ui/react` direct dep. |
| Accordion | `@base-ui/react/accordion` (`Accordion.Root` + `Accordion.Item` + `Accordion.Header` + `Accordion.Trigger` + `Accordion.Panel`) | High | Direct match. JSS `&$expanded` parent-refs unwind to `data-[state=open]:` Tailwind selectors. |
| Dropdown (mixed-state) | `@base-ui/react/menu` + `@base-ui/react/popover` | Medium | Single PR covers `@mui/base` portion + `@material-ui/core/Grow` transition replacement. Replace `Grow` with CSS `data-starting-style` / `data-ending-style`. |
| Page | None — keep custom | High | No `@base-ui/react` Page analog. Picasso-specific shell (hamburger, responsive). |
| OutlinedInput (mixed-state) | `@base-ui/react/input` + `@base-ui/react/field` | High | `@mui/base` Input swap + `import type { InputBaseComponentProps }` → React.InputHTMLAttributes. |

---

## "No standalone analog" — components that stay custom

These Picasso components have **no direct `@base-ui/react` equivalent**. Migration scope is JSS / MUI-removal only — they stay on plain React + Tailwind. Sourced from migration plan §9.9.

| Picasso component | Why no analog | Strategy |
|---|---|---|
| **Backdrop** | `@base-ui/react` only ships `Dialog.Backdrop` (internal to Dialog/AlertDialog/Drawer), not a standalone primitive. | Custom `<div>` with scroll-lock + Tailwind per [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md). |
| **Badge** | No Badge in `@base-ui/react`. | Plain `<span>` + Tailwind (already mostly custom). |
| **Container** | No Container in `@base-ui/react`. | Pure layout wrapper. |
| **FileInput** | No file-input primitive in `@base-ui/react`. | Plain `<input type="file">` + Tailwind. Custom subcomponents. |
| **Grid** | No Grid in `@base-ui/react`. | Pure CSS Grid + Tailwind utilities. |
| **Notification** | `@base-ui/react/toast` exists but Picasso uses `notistack` (decision: keep `notistack` for v3 — minimal blast radius). | `notistack` integration unchanged; type-only fix on `SnackbarOrigin`. |
| **Page** | No Page in `@base-ui/react` (Picasso-specific shell). | Pure Tailwind rewrite. Custom. |
| **Popper** | `@base-ui/react` has no standalone Popper — positioning is internal to Tooltip/Popover/Menu/Dialog. | **Decision pending** per [`decisions/popper-replacement.md`](../decisions/popper-replacement.md). Recommended: `@floating-ui/react` direct dep (already a transitive dep) for the rare standalone-positioning use site. |

---

## Compound parts pattern (the big API shift)

`@base-ui/react` components are compound primitives. Where MUI v4 / `@mui/base` shipped a single `<Tooltip>` component with props, `@base-ui/react` ships a tree of named parts.

### Example: Tooltip

```tsx
// MUI v4
import Tooltip from '@material-ui/core/Tooltip'
<Tooltip title="info">
  <button>Trigger</button>
</Tooltip>

// @mui/base (predecessor — still appears in Picasso source pre-migration)
import { Tooltip } from '@mui/base/Tooltip'
<Tooltip>
  <Tooltip.Trigger>Trigger</Tooltip.Trigger>
  <Tooltip.Popper>
    <Tooltip.Content>info</Tooltip.Content>
  </Tooltip.Popper>
</Tooltip>

// @base-ui/react (target)
import { Tooltip } from '@base-ui/react/tooltip'
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger render={<button>Trigger</button>} />
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={8}>
        <Tooltip.Popup>info</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

Same pattern for Dialog, Drawer, Slider, Tabs, Switch, Accordion, Menu, Popover. The compound-parts shape is consistent.

### Example: Switch (simplest)

```tsx
import { Switch } from '@base-ui/react/switch'
<Switch.Root checked={value} onCheckedChange={setValue}>
  <Switch.Thumb />
</Switch.Root>
```

### Example: Accordion

```tsx
import { Accordion } from '@base-ui/react/accordion'
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Section title</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Section body</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

JSS `&$expanded` parent-refs translate to **`data-[state=open]:` Tailwind variants**:

```tsx
// Before (JSS)
'&$expanded .panel': { paddingTop: 16 }

// After (Tailwind)
<Accordion.Panel className="data-[state=open]:pt-4" />
```

---

## `render` prop (slot-style composition)

Most `@base-ui/react` parts accept a `render` prop that lets you pass your own element / component. This replaces the `as` / `component` / class-key prop patterns in MUI v4.

```tsx
// MUI v4
<Button component={Link} to="/foo">Go</Button>

// @base-ui/react
import { Button } from '@base-ui/react/button'
<Button render={<Link to="/foo">Go</Link>} />
```

Or as a function for prop merging:

```tsx
<Button render={(props) => <Link {...props} to="/foo">Go</Link>} />
```

---

## Data-attribute selectors (state styling)

`@base-ui/react` parts emit `data-state`, `data-disabled`, `data-active`, etc. Style with Tailwind data-attribute variants instead of JSS pseudo-class chains.

| State signal | Tailwind variant |
|---|---|
| `data-state="open"` (Accordion, Dialog, Drawer, Popover, Tooltip) | `data-[state=open]:...` |
| `data-state="closed"` | `data-[state=closed]:...` |
| `data-disabled` | `data-disabled:...` |
| `data-active` (Tabs, Menu) | `data-active:...` |
| `data-selected` (Radio, Tabs) | `data-selected:...` |
| `data-focus-visible` | `data-focus-visible:...` |

For animations on enter/exit:

| Phase | Attribute |
|---|---|
| Entering (CSS keyframe origin) | `data-starting-style` |
| Leaving (CSS keyframe origin) | `data-ending-style` |

These replace MUI v4's `Grow` / `Fade` / `Slide` transition components — used in Dropdown's mixed-state migration.

---

## Hook utilities

`@base-ui/react` ships hook-based utilities for situations where you need positioning / dismiss without a UI component:

| Hook | Use case |
|---|---|
| `useFloating` | Custom positioning (sparingly — most cases the part-based components handle this) |
| `useId` | SSR-safe ID generation (replaces `@material-ui/core/utils` `useUniqueId`) |

For most positioning needs, **prefer Popover / Menu / Tooltip / Dialog parts** over hook composition.

---

## Provider components (Picasso provider rewrite scope)

Optional Provider components for the Picasso provider rewrite (Tier 5, PF-2023):

| Provider | Use case | Required for canary? |
|---|---|---|
| `@base-ui/react/direction-provider` | RTL support | No — only if Picasso adopts RTL. |
| `@base-ui/react/csp-provider` | Content Security Policy nonce propagation | No — only if Picasso consumers need CSP-strict environments. |

Both are optional. The PF-2023 canary commit doesn't require either.

---

## Anti-patterns (what NOT to do)

- ❌ **Don't import `@mui/base` as a target.** It's the predecessor; if you find an `@mui/base` import in source, you're migrating *from* it, not *to* it.
- ❌ **Don't pass MUI-style `classes` props.** `@base-ui/react` components accept `className` (single string) on each named part, not a `classes` map.
- ❌ **Don't use `style={{ ... }}` for state-conditional styling.** Use `data-[state=...]:` Tailwind variants.
- ❌ **Don't reach for `@floating-ui/react` for positioning when a `@base-ui/react` part handles it.** Floating-UI is the escape hatch for the Popper standalone case (R15), not the default.
- ❌ **Don't search npm for `@base-ui-components/react`.** That was the previous publish name; it's now `@base-ui/react`.

---

## Refresh checklist

When `@base-ui/react` ships a minor release (v1.5, v1.6, …):

1. Read the changelog: [github.com/mui/base-ui/releases](https://github.com/mui/base-ui/releases).
2. Re-fetch [base-ui.com/llms.txt](https://base-ui.com/llms.txt). Diff against the prior pinned version.
3. Update the version pin at the top of this doc.
4. If a Picasso-targeted primitive's API changed (e.g., a part renamed), update the table above and bump the relevant PROMPT-{light,heavy}.md changelog with a note about the API shift.
5. If a primitive that was previously "no analog" became available (e.g., a Backdrop or Popper standalone shipping in v1.5), update the affected per-component plan and the `target_path` in `manifest.json`.
6. If any current target was deprecated, surface in the next iteration's PROMPT-light's "Open questions" so the agent prefers the replacement.
