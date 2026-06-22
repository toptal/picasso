# Figma Code Connect

Code Connect links Figma design components to React code so designers see real code snippets in Figma Dev Mode. This document covers setup, maintenance, known limitations, and lessons learned from the initial integration.

## Setup

### Prerequisites

- `@figma/code-connect` is installed at the workspace root (already in `node_modules`).
- `figma.config.json` is at the repo root with:
  ```json
  {
    "codeConnect": {
      "include": ["**/*.figma.tsx"],
      "label": "React",
      "language": "tsx"
    }
  }
  ```
  **Important:** the glob must be `*.figma.tsx`, not `*.figma.ts`. The Code Connect CLI only picks up `.tsx` files when using JSX syntax.
- A Figma personal access token from [figma.com/settings](https://www.figma.com/settings) with `File content` read scope.

### Publishing

```bash
FIGMA_ACCESS_TOKEN=<your-token> npx figma connect publish
```

Run this whenever `.figma.tsx` files change. You can also dry-run first:

```bash
FIGMA_ACCESS_TOKEN=<your-token> npx figma connect publish --dry-run
```

### Setting up the Figma MCP server in Claude Code

The Figma MCP server is used to fetch design context during Code Connect authoring. Add it via CLI — **not** via `~/.claude/settings.json` (the `mcpServers` key is not valid there):

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Authenticate by opening the printed URL in a browser.

## File structure

Each `.figma.tsx` file lives alongside the component it connects:

```
packages/base/Accordion/src/Accordion/Accordion.figma.tsx
packages/base/Alert/src/Alert/Alert.figma.tsx
packages/base/Avatar/src/Avatar/Avatar.figma.tsx
packages/base/Badge/src/Badge/Badge.figma.tsx
packages/base/Breadcrumbs/src/Breadcrumbs/Breadcrumbs.figma.tsx
packages/base/Carousel/src/Carousel/Carousel.figma.tsx
packages/base/Container/src/Container/Container.figma.tsx
packages/base/Input/src/Input/Input.figma.tsx        ← Text Area (multiline Input)
packages/base/Tag/src/Tag/Tag.figma.tsx
packages/base/Icons/src/Icons.figma.tsx              ← generated
packages/picasso-pictograms/src/Pictograms.figma.tsx  ← generated
```

## Picasso components without a Figma counterpart

The following Picasso packages have no corresponding component in the Figma design library and therefore have no `.figma.tsx` file.

**Distinct components — candidates for future Figma design work:**

| Picasso package | Notes |
|---|---|
| AccountSelect | No Figma counterpart |
| Amount | No Figma counterpart |
| ApplicationUpdateNotification | No Figma counterpart |
| Autocomplete | Dropdown exists in Figma but Autocomplete is distinct |
| AvatarUpload | Avatars exist in Figma, upload variant does not |
| Checkbox | Likely falls under Figma's "Forms" section but has no own entry |
| DateSelect | Likely falls under Figma's "Date Picker" but has no own entry |
| FileInput | Likely under Forms, no own Figma entry |
| Grid | No Figma counterpart |
| Image | No Figma counterpart |
| Input (single-line) | The Text Area (multiline) Figma components are connected via `Input.figma.tsx`; the single-line Input has no dedicated Figma component |
| Link | No Figma counterpart |
| Logo | No Figma counterpart |
| Menu | No Figma counterpart (Dropdown exists but Menu is distinct) |
| NumberInput | Likely under Forms, no own Figma entry |
| PasswordInput | Likely under Forms, no own Figma entry |
| PromptModal | Modals exist in Figma, this variant does not |
| Radio | Likely under Forms, no own Figma entry |
| Select | Likely under Dropdown, no own Figma entry |
| ShowMore | No Figma counterpart |
| SkeletonLoader | Loaders exist in Figma, skeleton variant may not |
| Tagselector | Tags exist in Figma, Tagselector does not |
| Timepicker | No Figma counterpart |
| TreeView | No Figma counterpart |
| Typography | A [typography docs frame](https://www.figma.com/design/NcWffgzHm32CgC2HcMVuXq/Product-Library--Copy-?node-id=16113-27757) exists but it is a static showcase (`FRAME` type), not a `COMPONENT_SET`. Code Connect requires a component set with variant properties (`Type`, `Size`, `Weight`) before a `.figma.tsx` file can be published. |
| TypographyOverflow | No Figma counterpart |

**Top-level packages also absent from Figma:**

| Package | Notes |
|---|---|
| `picasso-charts` | No Figma counterpart |
| `picasso-rich-text-editor` | No Figma counterpart |
| `topkit-analytics-charts` | No Figma counterpart |

**Internal / utility packages (not expected to have Figma representations):**

Backdrop, Collapse, Fade, FormLabel, FormLayout, InputAdornment, ModalContext, OutlinedInput, Paper, Popper, Slide, Step (sub-component of Stepper), Test-Utils, Utils

## Prop mismatches per component

Where Figma property names, values, or semantics differ from the React API, this table documents what was mapped and how. Anything listed as "not mapped" is silently ignored — it has no effect on the published snippet.

### Accordion

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Expanded` | `True` / `False` | `expanded` | `true` / `false` | Case difference only |
| `Borders` | `No Borders` | `borders` | `'none'` | |
| `Borders` | `With Borders` | `borders` | `'all'` | |
| `Borders` | `With Bottom Border` | `borders` | `'middle'` | Approximate — React has no per-side border control |
| `Borders` | `With Top Border` | `borders` | `'middle'` | Same approximation; Figma has 4 border states, React has 3 |

### Alert

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Color` | `Red` / `Yellow` / `Green` / `Blue` | `variant` | `'red'` / `'yellow'` / `'green'` / `'blue'` | Property renamed |
| `Close Button` | `true` / `false` | `onClose` | `() => {}` / `undefined` | Figma boolean → React callback; static parser cannot express a real handler |
| `CTA Primary` | `true` / `false` | `actions.primary` | object / omitted | Two Figma booleans combine into one React `actions` object — requires 4 variant-filtered connections |
| `CTA Secondary` | `true` / `false` | `actions.secondary` | object / omitted | Same as above |

### Avatar

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Size` | `32px` / `40px` / `80px` / `120px` / `160px` | `size` | `'xxsmall'` / `'xsmall'` / `'small'` / `'medium'` / `'large'` | Pixel labels → named sizes |
| `Size` | `⚠️ 24px` | — | — | Not mapped; no React equivalent (deprecated) |
| `Style` | `Landscape` / `Portrait` / `Square` | — | — | Not mapped; design-sample crop style, no React prop |
| `Gender` | — | — | — | Not mapped; selects a sample photo, no React prop |

### Badge

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Style` | `Primary` / `Secondary` | `variant` | `'red'` / `'white'` | Property renamed; values are semantic opposites of what the name implies |
| `Size` | `Large` / `Medium` / `Small` | `size` | `'large'` / `'medium'` / `'small'` | Capitalisation only |

### Breadcrumbs

| Figma property | Figma values | React equivalent | Notes |
|---|---|---|---|
| `Style` | `Current` | `active` on last `BreadcrumbsItem` | No single prop — structural: the last item gets `active`, all others get `active={false}` |
| `Style` | `Parents` | all `active={false}` | All items are navigation links, none is the active page |
| `# of items` | `2 items` – `5 items` | number of `<BreadcrumbsItem>` children | Structural difference, not a prop; requires 8 variant-filtered connections (4 item counts × 2 styles) |

### Carousel

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Variant` | `Pagination + Arrows` | — | `hasDots` and `hasArrows` both default (`true`) | One Figma string encodes two React booleans — requires 3 variant-filtered connections |
| `Variant` | `Pagination Only` | `hasArrows` | `false` | `hasDots` is default `true` |
| `Variant` | `Arrows Only` | `hasDots` | `false` | `hasArrows` is default `true` |

### Container

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Color` | `Blue` / `Green` / `Red` / `White` / `Yellow` | `variant` | `'blue'` / `'green'` / `'red'` / `'white'` / `'yellow'` | Property renamed |
| `Color` | `Gray` | `variant` | `'grey'` | Spelling difference (`Gray` vs `grey`) |
| `Show 🔁 Slot` | `true` / `false` | — | — | Not mapped; design-only placeholder toggle, no React prop |

### Icons

| Figma property | Notes |
|---|---|
| `Size` | `16` / `24` mapped to React component names via `variant: { Size: '16' }` / `variant: { Size: '24' }` |
| 162 unmatched icons | Country flags, role icons, and brand icons in Figma have no matching React component — not wired up |

### Tag Outlined

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Style` | `Blue` / `Secondary` / `Red` / `Yellow` / `Green` | `variant` | `'blue'` / `'light-grey'` / `'red'` / `'yellow'` / `'green'` | Property renamed; `Secondary` → `'light-grey'` |
| `State` | `Disabled` | `disabled` | `true` | Separate connection with `variant: { State: 'Disabled' }` |
| `State` | `Enabled` / `Hover` | — | — | Browser interaction states; no React prop |
| `Layout` | `Basic` / `With Icon` / `With Remove` / `With Connection` / `With Icon & Connection` / `With Badge` | structural | props: `icon`, `onDelete`, `endAdornment` | Each layout variant has a dedicated connection |
| `Layout` | `With Edit` / `With Edit and Remove` | — | — | Not mapped; `Tag` has no `onEdit` prop |

### Tag Filled

Figma "Tag Filled" has no direct React counterpart — `Tag` is always outlined (`bg-white`). The closest component is `Tag.Checkable`, where `checked=true` renders a green (high contrast) tag and `checked=false` renders a light-grey (low contrast) tag.

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Style` | `High Contrast` | `checked` | `true` | Maps to `Tag.Checkable` green variant |
| `Style` | `Low Contrast` | `checked` | `false` | Maps to `Tag.Checkable` light-grey variant |
| `Layout` | `Basic` / `With Icon` | structural | `icon` prop | Two connections, one per layout |
| `Layout` | `With Connection` / `With Badge` / `With Icon + Badge` | — | — | Not mapped; `Tag.Checkable` has no `endAdornment` prop |
| `Layout` | `With Indicator + Icon` | — | — | Not mapped; no React component combines `indicator` with `icon` |

### Tag Rectangle

| Figma property | Figma values | React prop | React values | Notes |
|---|---|---|---|---|
| `Style` | `Solid` | `variant` | see Status mapping below | Separate connection for this style |
| `Style` | `Indicators` | `indicator` | see Status mapping below | Separate connection; `variant` and `indicator` are mutually exclusive |
| `Status` (Solid) | `Positive` / `Dark` / `Light` / `Negative` / `Blue Light` / `Warning` / `Blue` / `Blue Darker` | `variant` | `'green'` / `'dark-grey'` / `'light-grey'` / `'red'` / `'light-blue'` / `'yellow'` / `'blue-main'` / `'blue-darker'` | |
| `Status` (Indicators) | `Positive` / `Dark` / `Negative` / `Warning` / `Blue` / `Blue Darker` / `Blue Light` | `indicator` | `'green'` / `'grey-darker'` / `'red'` / `'yellow'` / `'blue'` / `'blue-darker'` / `'light-blue'` | `Dark` → `'grey-darker'` (Indicator type) vs `'dark-grey'` (Solid variant) |
| `Status` (Indicators) | `Light` | — | — | Not mapped; `Light` only appears in `Solid` style |

### Text Area (Vertical + Horizontal)

The Figma "Text Area" component maps to `<Input multiline />` wrapped in `<Form.Field>` and `<Form.Label>`. The wrapper is required — `Input` has no `label` or `hint` prop of its own.

| Figma property | Figma values | React equivalent | Notes |
|---|---|---|---|
| `State` | `Default` / `Filled` / `Focus` | no prop | Browser interaction states; code is identical for all three — only `State: 'Default'` has a connection |
| `State` | `Disabled` | `disabled` on `Input` | |
| `State` | `Error` | `status='error'` on `Input` + `error` on `Form.Field` | |
| `State` | `Error Focus` | same as `Error` | Browser focus variant of error — no connection; `State: 'Error'` connection applies |
| `Show Hint` | `true` / `false` | `hint` on `Form.Field` | Mapped via `figma.boolean` |
| `Show Error` | `true` / `false` | `error` on `Form.Field` | Mapped via `figma.boolean` in error-state connections only |
| `Show Label` | `true` / `false` | `Form.Label` child | Vertical only; not mapped — `Form.Label` is always rendered in examples (required for accessibility) |
| Layout | Separate component sets (Vertical / Horizontal) | `layout` on `Form` | Vertical → `<Form>` (default); Horizontal → `<Form layout='horizontal'>` |

## Known limitations

### No runtime compilation — conditional logic is rejected

The `@figma/code-connect` CLI parses `.figma.tsx` files using **static analysis only**. It does not execute the file or run TypeScript — it reads the AST. This means any expression the parser cannot resolve at parse time will cause an error.

Concretely, these patterns all fail:

```tsx
// ❌ Intermediate variable used in JSX
const hasPrimary = figma.boolean('CTA Primary', { ... })
example: ({ hasPrimary }) => <Alert actions={hasPrimary || ...} />

// ❌ Conditional / logical expression
actions: ctaPrimary ? { primary: { ... } } : undefined

// ❌ Computed object from two props
actions: { primary: ctaPrimary, secondary: ctaSecondary }
```

Every prop referenced in the `example` function body must have a **direct, unambiguous `figma.*` call** in the `props` object. No ternaries, no `||`, no intermediate variables in JSX.

**Workaround:** use multiple `figma.connect()` calls with `variant` filters — one per combination of Figma states — each with a fully static `example` body. See `Alert.figma.tsx` for an example with four connections covering the `CTA Primary × CTA Secondary` matrix.

### Storybook integration is not compatible with Picasso's story format

Figma Code Connect offers a [Storybook integration](https://developers.figma.com/docs/code-connect/storybook/) where Code Connect config lives inside the story file via `parameters.design` instead of in a separate `.figma.tsx` file. This would eliminate duplication between stories and Code Connect snippets.

It does not work in this repo for two reasons:

1. **Story files are excluded from TypeScript compilation.** `tsconfig.base.json` excludes `**/story`, so any `.figma.tsx` file that imports from a story file gets a `TS6307` error.

2. **Stories use the PicassoBook format, not CSF.** The Figma Storybook integration requires [Component Story Format (CSF)](https://storybook.js.org/docs/writing-stories) with `export default { component, parameters }`. Picasso stories use a custom `PicassoBook` API and are not in CSF format.

Adopting the Storybook integration would require migrating stories to CSF and removing `**/story` from the tsconfig excludes — a separate project.

### Figma copy files vs. original library file

Code Connect published against a copy of a Figma file does **not** appear in the original library. For Code Connect to surface in Dev Mode for designers using the original library, connections must target the original file's node IDs. The copy files (`...—Copy-`) used here are for testing only.

## Testing Figma MCP Typography extraction

This section records a one-off experiment: using the Figma MCP `get_design_context` tool on a real product screen ([Marketplace Client — Coach Detail, node `9634:251821`](https://www.figma.com/design/MSArWGzYxl5RRw7TvJFZtK/Marketplace-Client?node-id=9634-251821)) and cross-referencing every text node against Picasso's `Typography` component to validate coverage.

### Picasso font-size tokens (reference)

| Tailwind class | px | line-height |
|---|---|---|
| `text-2xs` | 11px | 16px |
| `text-xxs` | 12px | 18px |
| `text-sm` | 13px | 20px |
| `text-md` | 14px | 22px |
| `text-lg` | 16px | 24px |
| `text-xl` | 20px | 30px |
| `text-2xl` | 28px | 42px |

### Figma named text styles → `<Typography>` props

| Figma style | px / lh | `<Typography>` | Notes |
|---|---|---|---|
| Heading Extra Large | 28 / 42 | `variant='heading' size='xlarge'` | Defaults match |
| Heading Large | 20 / 30 | `variant='heading' size='large'` | Defaults match |
| Heading Medium | 16 / 24 | `variant='heading' size='medium'` | Defaults match |
| Body Large Regular | 16 / 24 | `variant='body' size='large'` | Default color: `black` |
| Body Medium Semibold | 14 / 22 | `variant='body' size='medium' weight='semibold'` | Default color: `dark-grey` (#455065) |
| Body Medium Regular | 14 / 22 | `variant='body' size='medium'` | Default color: `dark-grey` (#455065) |
| Body Small Semibold | 13 / 20 | `variant='body' size='small' weight='semibold'` | Default color: `dark-grey` (#455065) |
| Body Small Regular | 13 / 20 | `variant='body' size='small'` | Default color: `dark-grey` (#455065) |
| Body Extra Small Semibold | 12 / 18 | `variant='body' size='xsmall' weight='semibold'` | Default color: `dark-grey` (#455065) |

### Per-node mapping

| Text node | `<Typography>` | Color override |
|---|---|---|
| "Request Coaching with Ryan" | `variant='heading' size='xlarge'` | None — defaults to `black` |
| "10+ Years of Experience" | `variant='body' size='xsmall' weight='semibold' color='grey-main-2'` | `grey-main-2` = `#84888e` |
| "Ryan Schleifer" | `variant='heading' size='large'` | None — defaults to `black` |
| "Toronto, Canada (-05:00 UTC)" | `variant='body' size='small'` | ⚠️ `#262d3d` (graphite-800) — no prop, use `className='text-graphite-800'` |
| "$70/session" | `variant='body' size='medium' weight='semibold'` | ⚠️ Same graphite-800 gap |
| Bio paragraph | `variant='body' size='medium'` | None — default `dark-grey` (#455065) ✓ |
| "Previously worked at" | `variant='body' size='xsmall' weight='semibold' color='black'` | Explicit `black` |
| "How it Works" / "Describe Your Need" | `variant='heading' size='medium'` | None — defaults to `black` |
| "Once request accepted, you'll get:" | `variant='body' size='medium' color='black'` | Override default `dark-grey` |
| Bullet items | `variant='body' size='small' color='black'` | Override default `dark-grey` |
| "Tell Ryan about your goals…" | `variant='body' size='large' color='dark-grey'` | Override default `black` |
| List items (What you'd like to achieve…) | `variant='body' size='medium'` | None — default `dark-grey` ✓ |
| "Type here…" placeholder | `variant='body' size='medium' color='grey-main-2'` | `grey-main-2` = `#84888e` |
| Navbar label "Request Coaching" | `variant='body' size='large'` | None — default `black` ✓ |
| "Selected Talent" | `variant='body' size='small' weight='semibold'` | ⚠️ `#204ecf` (blue-500) — no prop, use `className='text-blue-500'` |
| Footer button labels | Handled internally by `Button` | — |

### Color gaps found

The `Typography` `color` prop tops out at `dark-grey` = `text-graphite-700` (#455065). Two colors in this design have no matching prop value:

| Figma hex | Token | Used on | Workaround |
|---|---|---|---|
| `#262d3d` | graphite-800 | Location, price | `className='text-graphite-800'` |
| `#204ecf` | blue-500 | "Selected Talent" link | `className='text-blue-500'` |

Adding these to `ColorType` in `@toptal/picasso-shared` would close the gap.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `No files found` on publish | Glob in `figma.config.json` uses `.figma.ts` | Change to `**/*.figma.tsx` |
| `Could not find prop mapping for X` | Parser hit a computed/conditional expression | Rewrite as direct `figma.boolean()`/`figma.enum()` call or split into variant-filtered connections |
| Published but not showing in Dev Mode | Connected to a copy file, not the original | Re-publish against the original library file node IDs |
| `403` from Figma REST API | Token missing or expired | Export `FIGMA_ACCESS_TOKEN` with a valid token |
