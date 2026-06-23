# Picasso UI Kit — agent rules (v2)

Rules for AI agents writing application code that **consumes** Toptal's Picasso
design system (`@toptal/picasso*`). This file stays small on purpose: it carries
the stable, high-value rules inline and points to the hosted, always-current
docs for everything else.

## Documentation lookup (fetch on demand)

Component docs are **hosted** — do not vendor them into the repo. Before using an
unfamiliar Picasso component, fetch the docs on demand:

1. Fetch the index: <https://toptal.github.io/picasso/llm-docs/llms.txt> — every
   component and tutorial is linked as an absolute URL with a one-line summary.
2. From the index, fetch the specific component page you need, e.g.
   <https://toptal.github.io/picasso/llm-docs/components/button.md> (props,
   variants, examples).
3. For layout, forms, spacing, or SSR questions, fetch the relevant guide from
   the index's **Tutorials** section.

Fetch only what the task needs. If your runtime cannot reach the network, fetch
the index plus the specific component pages once and cache them for the session —
still preferred over committing the whole tree.

## Package imports

| Package                          | Import for                          | Example                                                              |
| -------------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `@toptal/picasso`                | UI components and icons             | `import { Button, Container, Modal, More16 } from '@toptal/picasso'` |
| `@toptal/picasso/utils`          | utilities, hooks, spacing constants | `import { useNotifications } from '@toptal/picasso/utils'`           |
| `@toptal/picasso-forms`          | Final Form-based form components    | `import { Form, Input, Select } from '@toptal/picasso-forms'`        |
| `@toptal/picasso-provider`       | root provider only                  | `import Picasso from '@toptal/picasso-provider'`                     |
| `@toptal/picasso-tailwind-merge` | merging Tailwind classes            | `import { twMerge } from '@toptal/picasso-tailwind-merge'`           |

Import from package barrels, never deep paths.

## Mandatory rules

1. **Use Picasso components, not raw HTML, for UI** — no raw `<button>`,
   `<input>`, `<select>`, `<table>`, `<h1>`–`<h6>`, or `<p>` for styled UI. Use
   the Picasso equivalent (`Button`, `Input`, `Select`, `Table`, `Typography`, …).
2. **All text goes through `Typography`.**
3. **Lay out with `Container` / `Grid`** (12-column) and the `Page` parts — not
   ad-hoc margins.
4. **Merge classes with `twMerge`** from `@toptal/picasso-tailwind-merge`, and put
   the consumer `className` **last** so it wins on conflicts.
5. **Style hooks are `className` and `style` only** — never `classes`, `sx`,
   `css`, or slot-level class props.
6. **Use Picasso / BASE design tokens** (colors, spacing, typography) — no raw
   hex/rgb and no arbitrary px. Fetch the hosted tokens docs for the authoritative
   token names and the spacing scale.
7. **Icons are named `{Name}{Size}`** (e.g. `More16`, `Search16`, `Settings24`),
   imported from `@toptal/picasso`.

## Component reference

Common building blocks, for orientation only — **the hosted index is
authoritative**; fetch it (see _Documentation lookup_) for the full, current list
and for any component's API.

- **Layout:** `Container`, `Grid` / `Grid.Item`, `Page` (`.TopBar`, `.Content`,
  `.Sidebar`, `.Footer`), `Paper`, `Section`
- **Typography:** `Typography`
- **Actions:** `Button`, `Dropdown`, `Menu`
- **Forms:** `Form`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`,
  `Autocomplete`, `DatePicker`, `NumberInput` (form-bound variants from
  `@toptal/picasso-forms`)
- **Data display:** `Table`, `Accordion`, `List`, `Tag`, `Badge`, `OverviewBlock`
- **Feedback:** `Alert`, `Notification`, `Loader`, `SkeletonLoader`, `ProgressBar`
- **Navigation:** `Tabs`, `Breadcrumbs`, `Pagination`, `Stepper`
- **Overlays:** `Modal`, `Drawer`, `Tooltip`

---

Version-agnostic: the hosted docs always reflect the latest published Picasso.
Fetch them at edit/build time for current APIs.

**Changed from v1:** docs are now fetched on demand from the hosted index rather
than vendored as a ~1 MB tree into each consumer repo; `llms.txt` links are
absolute; v1's stale `patterns/` / `tokens/` / "96 docs" pointers are dropped in
favour of the authoritative hosted index; these rules now live canonically here
in the Picasso repo instead of as drifting per-tool copies.
