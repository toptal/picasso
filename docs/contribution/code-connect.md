# Figma Code Connect

Code Connect links Figma design components to React code so designers see real code snippets in Figma Dev Mode. This document covers setup, maintenance, known limitations, and lessons learned from the initial integration.

## Setup

### Prerequisites

- `@figma/code-connect` is a dev dependency at the workspace root, so `pnpm install` provides the `figma` CLI.
- `figma.config.json` is at the repo root with:
  ```json
  {
    "codeConnect": {
      "include": ["**/*.figma.ts", "**/*.figma.batch.json"],
      "label": "React",
      "language": "tsx"
    }
  }
  ```
  Connections are [template files](https://developers.figma.com/docs/code-connect/template-files/) (`.figma.ts`). The React parser (`.figma.tsx` with `figma.connect()`) stopped being maintained on 17 August 2026, and Code Connect CLI 2.0 only accepts it in `figma connect migrate` and `figma connect unpublish`.
- A Figma personal access token from [figma.com/settings](https://www.figma.com/settings) with the `File content: Read` and `Code Connect: Write` scopes. Figma tokens expire after at most 90 days, so expect to renew it.

### Publishing

Publishing is automated by the [Figma Code Connect workflow](../../.github/workflows/figma-code-connect.yml):

- **Pull requests** that touch a `*.figma.ts` template, an icon batch file (`*.figma.batch.ts` / `*.figma.batch.json`), `figma.config.json`, `tsconfig.figma.json`, the root `package.json` or the workflow itself typecheck the templates (`pnpm typecheck:figma`), parse them (`figma connect parse`, which fails on a template with a missing or malformed header) and then run `figma connect publish --dry-run`, which checks every template against the Figma library.
- **Pushes to `master`** with the same paths publish the snippets to Figma Dev Mode.
- It can also be run manually from the Actions tab (`workflow_dispatch`).

The dry run and the publish need the `FIGMA_ACCESS_TOKEN` repository secret, a token with the scopes listed above. The secret is only passed to the steps that call Figma. Without it (missing secret, or a pull request from a fork) those steps are skipped with a warning; the typecheck and parse steps still run.

The token expires after at most 90 days. When it does, the dry run fails with a `403`: renew the token and update the secret. This check only guards the Dev Mode snippets, so it is not a required check, and a failure caused by an expired token should not block merging unrelated work.

To run it locally, enter the token at a hidden prompt so it never lands in your shell history (works in both bash and zsh):

```bash
( printf 'Figma token: ' && read -rs FIGMA_ACCESS_TOKEN && echo && export FIGMA_ACCESS_TOKEN && pnpm exec figma connect publish --dry-run )
```

Drop `--dry-run` to publish, or run `pnpm exec figma connect unpublish` (optionally with `-f <file>`) to remove published snippets.

### Setting up the Figma MCP server in Claude Code

The Figma MCP server is used to fetch design context during Code Connect authoring. Add it via CLI — **not** via `~/.claude/settings.json` (the `mcpServers` key is not valid there):

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Authenticate by opening the printed URL in a browser.

## File structure

Each `.figma.ts` file lives alongside the component it connects and holds one Figma component. It is named after that Figma component, so a code component connected to several Figma components gets one file per Figma component:

```
packages/base/Accordion/src/Accordion/Accordion.figma.ts
packages/base/Alert/src/Alert/AlertBlock.figma.ts          ← Figma "Alert Block"
packages/base/Alert/src/Alert/AlertInline.figma.ts         ← Figma "Alert Inline"
packages/base/Tag/src/Tag/TagOutlined.figma.ts             ← Figma "Tag Outlined"
packages/base/Tag/src/Tag/TagFilled.figma.ts               ← Figma "Tag Filled"
packages/base/Tag/src/Tag/TagRectangle.figma.ts            ← Figma "Tag Rectangle"
```

The header comments (`// url=`, `// source=`, `// component=`) tell Figma which node the file connects and which code component to link to.

## Picasso components without a Figma counterpart

The following Picasso packages have no corresponding component in the Figma design library and therefore have no `.figma.ts` file.

**Distinct components — candidates for future Figma design work:**

| Picasso package    | Notes                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSelect      | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Amount             | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Autocomplete       | Dropdown exists in Figma but Autocomplete is distinct                                                                                                                                                                                                                                                                                    |
| DateSelect         | Likely falls under Figma's "Date Picker" but has no own entry                                                                                                                                                                                                                                                                            |
| FileInput          | Likely under Forms, no own Figma entry                                                                                                                                                                                                                                                                                                   |
| Grid               | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Image              | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Link               | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Logo               | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Menu               | No Figma counterpart (Dropdown exists but Menu is distinct)                                                                                                                                                                                                                                                                              |
| NumberInput        | Likely under Forms, no own Figma entry                                                                                                                                                                                                                                                                                                   |
| PasswordInput      | Likely under Forms, no own Figma entry                                                                                                                                                                                                                                                                                                   |
| PromptModal        | Modals exist in Figma, this variant does not                                                                                                                                                                                                                                                                                             |
| Select             | Likely under Dropdown, no own Figma entry                                                                                                                                                                                                                                                                                                |
| ShowMore           | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Tagselector        | Tags exist in Figma, Tagselector does not                                                                                                                                                                                                                                                                                                |
| Timepicker         | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| TreeView           | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |
| Typography         | A [typography docs frame](https://www.figma.com/design/NcWffgzHm32CgC2HcMVuXq/Product-Library--Copy-?node-id=16113-27757) exists but it is a static showcase (`FRAME` type), not a `COMPONENT_SET`. Code Connect requires a component set with variant properties (`Type`, `Size`, `Weight`) before a `.figma.ts` file can be published. |
| TypographyOverflow | No Figma counterpart                                                                                                                                                                                                                                                                                                                     |

**Top-level packages also absent from Figma:**

| Package                   | Notes                |
| ------------------------- | -------------------- |
| `topkit-analytics-charts` | No Figma counterpart |

**Internal / utility packages (not expected to have Figma representations):**

Backdrop, Collapse, Fade, FormLabel, FormLayout, InputAdornment, ModalContext, OutlinedInput, Paper, Popper, Slide, Step (sub-component of Stepper), Test-Utils, Utils

## Figma components not mapped yet

These exist in the Product Library v2.0 but have no `.figma.ts` template yet, so Dev Mode shows no snippet for them:

| Figma component                                 | Picasso counterpart                        | Notes                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Text Area Input                                 | `Input` with `multiline`                   | The single-line `Input` is mapped through the "Input Field" `Text Field` variant (`Input.figma.ts`); the multiline one is not |
| Charts Bar / Charts Bar Axis / Charts Line Axis | `picasso-charts` (`BarChart`, `LineChart`) |                                                                                                                               |

## Icons

Icons come from the [Iconography](https://www.figma.com/design/TqaGgbpjGSUDf7qq153Isq/Iconography) file and are mapped with one [batch template](https://developers.figma.com/docs/code-connect/batch-files/) instead of a file per icon:

- `packages/base/Icons/src/Icon/Icon.figma.batch.ts` is the shared template. It reads the Figma `Size` variant and renders `<Name16 />`, `<Name24 />` or `<Name32 />`.
- `packages/base/Icons/src/Icon/Icon.figma.batch.json` lists one entry per Figma icon (`url`, `name`, the `sizes` Picasso ships, and `sizeProperty` for the two icons whose variant is called `size`). Each entry is published as its own Code Connect doc.

Every Picasso icon has a 16 and a 24 version, but only `Ach` and `CreditCard` have a 32 one. When Figma uses a size Picasso does not ship (today only Bank Wire at 32), the snippet uses the largest Picasso size and starts with a `/* Picasso has no … */` comment.

The JSON is generated: a Figma icon is mapped only when its name, without spaces and punctuation and ignoring case, equals a Picasso icon name ("Arrow Down Minor" → `ArrowDownMinor`, "ACH" → `Ach`). Near misses such as "Dribbble" / `Dribble` or "Rank 1" / `RankOne` are not guessed. To regenerate it after icons are added on either side:

1. Save the output of the Figma MCP tool `list_file_components_for_code_connect` for file `TqaGgbpjGSUDf7qq153Isq` to a JSON file.
2. Run `node bin/generate-icon-code-connect.mjs <that file>`, then `pnpm exec prettier --write packages/base/Icons/src/Icon/Icon.figma.batch.json`.

The script prints the icons it could not match. As of the first run, 264 Figma icons map to 262 Picasso icons (Figma has "Layers" and "Preview" twice). 368 Figma icons have no Picasso counterpart (261 of them are country flags), and these 46 Picasso icons have no Figma counterpart:

`Abstract`, `Add`, `ArrowDropDown`, `ArrowDropUp`, `ArrowSubdirectory`, `Ask`, `Bullet`, `CertificationBadge`, `CheckSolid`, `ChevronRight`, `Control`, `DesignerPencil`, `Dialpad`, `Dribble`, `DropdownArrows`, `Employee`, `EyeHidden`, `FullTime`, `Initiative`, `Keyboard`, `Leave`, `MissedCall`, `Objective`, `PartTime`, `PendingQueue`, `Playbook`, `Player`, `PortfolioDesigner`, `PortfolioFinance`, `ProfileCard`, `ProfileCrossed`, `QuestionMark`, `RankOne`, `RankThree`, `RankTwo`, `ReferralBonus`, `ReferralDashboard`, `ReferralPartners`, `Representatives`, `RepresentativesSolid`, `Share`, `Shield`, `Sparkle`, `Terms`, `Twitter`, `Unavailable`

## Prop mismatches per component

Where Figma property names, values, or semantics differ from the React API, this table documents what was mapped and how. Anything listed as "not mapped" is silently ignored — it has no effect on the published snippet.

### Accordion

| Figma property | Figma values         | React prop | React values     | Notes                                                                                                                                    |
| -------------- | -------------------- | ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Expanded`     | `True` / `False`     | `expanded` | `true` / `false` | Case difference only                                                                                                                     |
| `Borders`      | `No Borders`         | `borders`  | `'none'`         |                                                                                                                                          |
| `Borders`      | `With Borders`       | `borders`  | `'all'`          |                                                                                                                                          |
| `Borders`      | `With Bottom Border` | `borders`  | `'middle'`       | Approximate — React has no per-side border; `'middle'` draws a separator only between stacked accordions, so a lone accordion shows none |
| `Borders`      | `With Top Border`    | `borders`  | `'middle'`       | Same approximation; Figma has 4 border states, React has 3                                                                               |

### Alert

| Figma property  | Figma values                        | React prop          | React values                                | Notes                                                                     |
| --------------- | ----------------------------------- | ------------------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| `Color`         | `Red` / `Yellow` / `Green` / `Blue` | `variant`           | `'red'` / `'yellow'` / `'green'` / `'blue'` | Property renamed                                                          |
| `Close Button`  | `true` / `false`                    | `onClose`           | `() => {}` / `undefined`                    | Figma boolean → React callback; the snippet uses a placeholder `() => {}` |
| `CTA Primary`   | `true` / `false`                    | `actions.primary`   | object / omitted                            | Two Figma booleans build one React `actions` object                       |
| `CTA Secondary` | `true` / `false`                    | `actions.secondary` | object / omitted                            | Same as above                                                             |

### Avatar

| Figma property | Figma values                                 | React prop | React values                                                  | Notes                                               |
| -------------- | -------------------------------------------- | ---------- | ------------------------------------------------------------- | --------------------------------------------------- |
| `Size`         | `32px` / `40px` / `80px` / `120px` / `160px` | `size`     | `'xxsmall'` / `'xsmall'` / `'small'` / `'medium'` / `'large'` | Pixel labels → named sizes                          |
| `Size`         | `⚠️ 24px`                                    | —          | —                                                             | Not mapped; no React equivalent (deprecated)        |
| `Style`        | `Landscape` / `Portrait` / `Square`          | —          | —                                                             | Not mapped; design-sample crop style, no React prop |
| `Gender`       | —                                            | —          | —                                                             | Not mapped; selects a sample photo, no React prop   |

### Badge

| Figma property | Figma values                 | React prop | React values                       | Notes                                                                    |
| -------------- | ---------------------------- | ---------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `Style`        | `Primary` / `Secondary`      | `variant`  | `'red'` / `'white'`                | Property renamed; values are semantic opposites of what the name implies |
| `Size`         | `Large` / `Medium` / `Small` | `size`     | `'large'` / `'medium'` / `'small'` | Capitalisation only                                                      |

### Breadcrumbs

| Figma property | Figma values          | React equivalent                       | Notes                                                                                     |
| -------------- | --------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `Style`        | `Current`             | `active` on last `BreadcrumbsItem`     | No single prop — structural: the last item gets `active`, all others get `active={false}` |
| `Style`        | `Parents`             | all `active={false}`                   | All items are navigation links, none is the active page                                   |
| `# of items`   | `2 items` – `5 items` | number of `<BreadcrumbsItem>` children | Structural difference, not a prop; the template renders that many items                   |

### Carousel

| Figma property | Figma values          | React prop              | React values    | Notes                                                                    |
| -------------- | --------------------- | ----------------------- | --------------- | ------------------------------------------------------------------------ |
| `Variant`      | `Pagination + Arrows` | `hasDots` + `hasArrows` | `true` / `true` | One Figma value sets two React booleans                                  |
| `Variant`      | `Pagination Only`     | `hasDots`               | `true`          | Both props default to `false`, so each enabled control is set explicitly |
| `Variant`      | `Arrows Only`         | `hasArrows`             | `true`          | Same as above                                                            |

### Container

| Figma property | Figma values                                  | React prop | React values                                            | Notes                                                     |
| -------------- | --------------------------------------------- | ---------- | ------------------------------------------------------- | --------------------------------------------------------- |
| `Color`        | `Blue` / `Green` / `Red` / `White` / `Yellow` | `variant`  | `'blue'` / `'green'` / `'red'` / `'white'` / `'yellow'` | Property renamed                                          |
| `Color`        | `Gray`                                        | `variant`  | `'grey'`                                                | Spelling difference (`Gray` vs `grey`)                    |
| `Show 🔁 Slot` | `true` / `false`                              | —          | —                                                       | Not mapped; design-only placeholder toggle, no React prop |

### Tag Outlined

| Figma property | Figma values                                                                                        | React prop | React values                                                 | Notes                                             |
| -------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------- |
| `Style`        | `Blue` / `Secondary` / `Red` / `Yellow` / `Green`                                                   | `variant`  | `'blue'` / `'light-grey'` / `'red'` / `'yellow'` / `'green'` | Property renamed; `Secondary` → `'light-grey'`    |
| `State`        | `Disabled`                                                                                          | `disabled` | `true`                                                       | Mapped via `getEnum('State', { Disabled: true })` |
| `State`        | `Enabled` / `Hover`                                                                                 | —          | —                                                            | Browser interaction states; no React prop         |
| `Layout`       | `Basic` / `With Icon` / `With Remove` / `With Connection` / `With Icon & Connection` / `With Badge` | structural | props: `icon`, `onDelete`, `endAdornment`                    | `Layout` decides which of these props render      |
| `Layout`       | `With Edit` / `With Edit and Remove`                                                                | —          | —                                                            | Not mapped; `Tag` has no `onEdit` prop            |

### Tag Filled

Figma "Tag Filled" has no direct React counterpart — `Tag` is always outlined (`bg-white`). The closest component is `Tag.Checkable`, where `checked=true` renders a green (high contrast) tag and `checked=false` renders a light-grey (low contrast) tag.

| Figma property | Figma values                                           | React prop  | React values | Notes                                                                                                          |
| -------------- | ------------------------------------------------------ | ----------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `Style`        | `High Contrast`                                        | `checked`   | `true`       | Maps to `Tag.Checkable` green variant                                                                          |
| `Style`        | `Low Contrast`                                         | `checked`   | `false`      | Maps to `Tag.Checkable` light-grey variant                                                                     |
| `Layout`       | `Basic` / `With Icon`                                  | structural  | `icon` prop  | `With Icon` adds `icon`                                                                                        |
| `Layout`       | `With Connection` / `With Badge` / `With Icon + Badge` | —           | —            | Rendered without the badge or connection, with a comment saying so; `Tag.Checkable` has no `endAdornment` prop |
| `Layout`       | `With Indicator + Icon`                                | `icon` prop | —            | Rendered with the icon only, with a comment saying so; `Tag.Checkable` has no `indicator` prop                 |

### Tag Rectangle

| Figma property        | Figma values                                                                                   | React prop  | React values                                                                                                         | Notes                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `Style`               | `Solid`                                                                                        | `variant`   | see Status mapping below                                                                                             | `Style` decides whether `Status` sets `variant` or `indicator`             |
| `Style`               | `Indicators`                                                                                   | `indicator` | see Status mapping below                                                                                             | `variant` and `indicator` are mutually exclusive                           |
| `Status` (Solid)      | `Positive` / `Dark` / `Light` / `Negative` / `Blue Light` / `Warning` / `Blue` / `Blue Darker` | `variant`   | `'green'` / `'dark-grey'` / `'light-grey'` / `'red'` / `'light-blue'` / `'yellow'` / `'blue-main'` / `'blue-darker'` |                                                                            |
| `Status` (Indicators) | `Positive` / `Dark` / `Negative` / `Warning` / `Blue` / `Blue Darker` / `Blue Light`           | `indicator` | `'green'` / `'grey-darker'` / `'red'` / `'yellow'` / `'blue'` / `'blue-darker'` / `'light-blue'`                     | `Dark` → `'grey-darker'` (Indicator type) vs `'dark-grey'` (Solid variant) |
| `Status` (Indicators) | `Light`                                                                                        | —           | —                                                                                                                    | Not mapped; `Light` only appears in `Solid` style                          |

### Input Field (Vertical + Horizontal)

The Figma "Input Field" `Text Field` variant maps to `<Input />` wrapped in `<Form.Field>` and `<Form.Label>`. The wrapper is required — `Input` has no `label` or `hint` prop of its own.

| Figma property | Figma values                                                    | React equivalent                                      | Notes                                                                    |
| -------------- | --------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| `Orientation`  | `Vertical` / `Horizontal`                                       | `layout` on `Form`                                    | Vertical → `<Form>`; Horizontal → `<Form layout='horizontal'>`           |
| `State`        | `Default` / `Filled` / `Hover` / `Focus` / `Prefilled`          | no prop                                               | Browser interaction states; same code as `Default`                       |
| `State`        | `Disabled`                                                      | `disabled` on `Input`                                 | Mapped via `getEnum('State', …)`                                         |
| `State`        | `Error`                                                         | `status='error'` on `Input` + `error` on `Form.Field` | Mapped via `getEnum('State', …)`                                         |
| `Icon Left`    | `true` / `false`                                                | `icon` + `iconPosition='start'`                       | Mapped via `getBoolean`                                                  |
| `Icon Right`   | `true` / `false`                                                | `icon` + `iconPosition='end'`                         | Wins when both are on, because `Input` takes one icon                    |
| `Show Hint`    | `true` / `false`                                                | `hint` on `Form.Field`                                | Mapped via `getBoolean`                                                  |
| `Show Label`   | `true` / `false`                                                | `Form.Label` child                                    | Mapped via `getBoolean`                                                  |
| `Variant`      | `Select` / `Number` / `With Char Counter` / `Currency` / `Tags` | —                                                     | Not mapped; separate Picasso components                                  |
| Layout         | Separate component sets (Vertical / Horizontal)                 | `layout` on `Form`                                    | Vertical → `<Form>` (default); Horizontal → `<Form layout='horizontal'>` |

## Known limitations

### Template files are plain JavaScript

Templates run as JavaScript inside Figma, so conditionals, intermediate variables and computed props work. Map each Figma property with `getEnum()` / `getBoolean()` and let `figma.helpers.react.renderProp()` drop props that resolve to `undefined`, instead of writing one branch per variant.

When a Figma variant has no Picasso equivalent, return a template whose example says so (`// Not mapped: …`). Otherwise that variant renders whichever snippet the code falls through to.

Templates import the `figma` module, which only exists inside Figma, so `tsconfig.base.json` excludes them. They are typechecked separately:

- `pnpm typecheck:figma` checks them against the types the CLI ships, using `tsconfig.figma.json`.
- Each default export ends with `satisfies CodeConnectTemplate` (declared in `figma-template.d.ts`), so a missing or misspelled `id`, `imports` or `example` is a type error.
- The Code Connect workflow runs this typecheck on every pull request that touches a template.

### Storybook integration is not compatible with Picasso's story format

Figma also offers a [Storybook integration](https://developers.figma.com/docs/code-connect/storybook/), where the Figma link lives in each story (`parameters.design`) and the story becomes the snippet. That would avoid writing examples twice, once as stories and once as templates.

We do not use it, because it only reads stories written in [Component Story Format (CSF)](https://storybook.js.org/docs/writing-stories) (`export default { component, parameters }`). Picasso stories use the custom `PicassoBook` API instead. Using the integration would mean migrating every story to CSF first, which is a separate project.

### Figma copy files vs. original library file

Code Connect published against a copy of a Figma file does **not** appear in the original library. Every connection here targets the library files themselves: Product Library v2.0 (`0zTTN9YKOABPGLQ4NsyEW5`) for components and Iconography (`TqaGgbpjGSUDf7qq153Isq`) for icons.

## Testing Figma MCP Typography extraction

This section records a one-off experiment: using the Figma MCP `get_design_context` tool on a real product screen ([Marketplace Client — Coach Detail, node `9634:251821`](https://www.figma.com/design/MSArWGzYxl5RRw7TvJFZtK/Marketplace-Client?node-id=9634-251821)) and cross-referencing every text node against Picasso's `Typography` component to validate coverage.

### Picasso font-size tokens (reference)

| Tailwind class | px   | line-height |
| -------------- | ---- | ----------- |
| `text-2xs`     | 11px | 16px        |
| `text-xxs`     | 12px | 18px        |
| `text-sm`      | 13px | 20px        |
| `text-md`      | 14px | 22px        |
| `text-lg`      | 16px | 24px        |
| `text-xl`      | 20px | 30px        |
| `text-2xl`     | 28px | 42px        |

### Figma named text styles → `<Typography>` props

| Figma style               | px / lh | `<Typography>`                                   | Notes                                |
| ------------------------- | ------- | ------------------------------------------------ | ------------------------------------ |
| Heading Extra Large       | 28 / 42 | `variant='heading' size='xlarge'`                | Defaults match                       |
| Heading Large             | 20 / 30 | `variant='heading' size='large'`                 | Defaults match                       |
| Heading Medium            | 16 / 24 | `variant='heading' size='medium'`                | Defaults match                       |
| Body Large Regular        | 16 / 24 | `variant='body' size='large'`                    | Default color: `black`               |
| Body Medium Semibold      | 14 / 22 | `variant='body' size='medium' weight='semibold'` | Default color: `dark-grey` (#455065) |
| Body Medium Regular       | 14 / 22 | `variant='body' size='medium'`                   | Default color: `dark-grey` (#455065) |
| Body Small Semibold       | 13 / 20 | `variant='body' size='small' weight='semibold'`  | Default color: `dark-grey` (#455065) |
| Body Small Regular        | 13 / 20 | `variant='body' size='small'`                    | Default color: `dark-grey` (#455065) |
| Body Extra Small Semibold | 12 / 18 | `variant='body' size='xsmall' weight='semibold'` | Default color: `dark-grey` (#455065) |

### Per-node mapping

| Text node                                | `<Typography>`                                                       | Color override                                                             |
| ---------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| "Request Coaching with Ryan"             | `variant='heading' size='xlarge'`                                    | None — defaults to `black`                                                 |
| "10+ Years of Experience"                | `variant='body' size='xsmall' weight='semibold' color='grey-main-2'` | `grey-main-2` = `#84888e`                                                  |
| "Ryan Schleifer"                         | `variant='heading' size='large'`                                     | None — defaults to `black`                                                 |
| "Toronto, Canada (-05:00 UTC)"           | `variant='body' size='small'`                                        | ⚠️ `#262d3d` (graphite-800) — no prop, use `className='text-graphite-800'` |
| "$70/session"                            | `variant='body' size='medium' weight='semibold'`                     | ⚠️ Same graphite-800 gap                                                   |
| Bio paragraph                            | `variant='body' size='medium'`                                       | None — default `dark-grey` (#455065) ✓                                     |
| "Previously worked at"                   | `variant='body' size='xsmall' weight='semibold' color='black'`       | Explicit `black`                                                           |
| "How it Works" / "Describe Your Need"    | `variant='heading' size='medium'`                                    | None — defaults to `black`                                                 |
| "Once request accepted, you'll get:"     | `variant='body' size='medium' color='black'`                         | Override default `dark-grey`                                               |
| Bullet items                             | `variant='body' size='small' color='black'`                          | Override default `dark-grey`                                               |
| "Tell Ryan about your goals…"            | `variant='body' size='large' color='dark-grey'`                      | Override default `black`                                                   |
| List items (What you'd like to achieve…) | `variant='body' size='medium'`                                       | None — default `dark-grey` ✓                                               |
| "Type here…" placeholder                 | `variant='body' size='medium' color='grey-main-2'`                   | `grey-main-2` = `#84888e`                                                  |
| Navbar label "Request Coaching"          | `variant='body' size='large'`                                        | None — default `black` ✓                                                   |
| "Selected Talent"                        | `variant='body' size='small' weight='semibold'`                      | ⚠️ `#204ecf` (blue-500) — no prop, use `className='text-blue-500'`         |
| Footer button labels                     | Handled internally by `Button`                                       | —                                                                          |

### Color gaps found

The `Typography` `color` prop tops out at `dark-grey` = `text-graphite-700` (#455065). Two colors in this design have no matching prop value:

| Figma hex | Token        | Used on                | Workaround                      |
| --------- | ------------ | ---------------------- | ------------------------------- |
| `#262d3d` | graphite-800 | Location, price        | `className='text-graphite-800'` |
| `#204ecf` | blue-500     | "Selected Talent" link | `className='text-blue-500'`     |

Adding these to `ColorType` in `@toptal/picasso-shared` would close the gap.

## Troubleshooting

| Symptom                                | Cause                                                  | Fix                                                                            |
| -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `No files found` on publish            | Glob in `figma.config.json` does not match the files   | Use `**/*.figma.ts`                                                            |
| CLI asks to migrate parser-based files | A `.figma.tsx` file with `figma.connect()` was added   | Write a `.figma.ts` template instead, or run `figma connect migrate -f <file>` |
| Published but not showing in Dev Mode  | Connected to a copy file, not the original             | Re-publish against the original library file node IDs                          |
| `403` from Figma REST API              | Token missing or expired (tokens last 90 days at most) | Renew the token; in CI, update the `FIGMA_ACCESS_TOKEN` repository secret      |
