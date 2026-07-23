# Migrating your app to the new Picasso (base-ui + Tailwind, v100)

The canonical guide for upgrading a **consumer application** to the new Picasso —
the release that completes the move off Material-UI onto
[**@base-ui/react**](https://base-ui.com) primitives and **Tailwind v4** styling.

It has two parts, same content pitched at two audiences:

- **[Part 1 — Engineer tutorial](#part-1--engineer-migration-tutorial)** — a
  numbered, copy-pasteable walkthrough you follow top-to-bottom.
- **[Part 2 — AI-agent migration plan](#part-2--ai-agent-migration-plan)** — a
  deterministic, phased playbook for driving the same upgrade with a coding
  agent (grep inventories, per-pattern fix matrices, verification gates, a
  failing-test triage tree).

> This supersedes and absorbs the test-only
> [`docs/modernization/migration-to-new-picasso.md`](modernization/migration-to-new-picasso.md)
> (Jest + Cypress only). Use **this** document for a full application upgrade.

It is a synthesis of four real consumer migrations — **staff-portal**,
**top-scheduler-frontend**, **topkit**, and **client-portal** — reconciled
against the current Picasso source. Where the early adopters' repo-local notes
disagreed with each other or with the shipped code, this guide states the
verified behavior and flags the difference.

---

## What changed, in one screen

- **Material-UI and JSS are gone.** No `makeStyles` / `withStyles` /
  `createStyles`, no MUI `ThemeProvider` / `StylesProvider`, no `CssBaseline`.
  Components are built on **@base-ui/react** and styled with **Tailwind v4**.
- **The provider is now services + context only.** `@toptal/picasso-provider`
  injects **zero runtime CSS**. The global reset ships as a CSS file _you
  import_ (`@toptal/picasso-tailwind/base`), and several `<Picasso>` props are
  removed (`reset`, `theme`, `injectFirst`, `preventPageWidthChangeOnScrollbar`,
  `disableClassNamePrefix`).
- **Form controls render a new DOM.** **Checkbox** and **Switch** are a visible
  `role="checkbox"`/`role="switch"` element with a **visually-hidden native
  `<input>`** kept only for form participation. State is ARIA
  (`aria-checked`, `aria-disabled`) + `data-*`, not HTML attributes.
- **Popups (Select, Dropdown, Menu, Tooltip, DatePicker, Modal, Drawer) render
  asynchronously, in portals** attached to the Picasso root — they used to
  render inline.
- **React 16 is dropped; the React 19 cap lift ships separately.** The
  `react`/`react-dom` peer range is `>=17.0.0 < 19.0.0` — the floor rose to
  React 17 because `@base-ui/react` requires `^17 || ^18 || ^19`. The
  modernization removes the blockers to React 19, but lifting the `< 19.0.0`
  cap (once validated) is tracked separately in PF-2262.

> ### 🏆 Golden rule
>
> **Interact with what the _user_ interacts with — the role element — and assert
> through ARIA, not HTML structure.** Almost every test break below is a
> corollary of this rule.

### Which versions? — the unified **v100** release

The base-ui/Tailwind Picasso ships as a **coordinated `v100` release**: **every
`@toptal/picasso*` package is versioned to `100.x` together.** There is no
"pick the right number per package" — if it is a Picasso package, its target is
`100.x`. This makes the lockstep requirement (Step 1) trivial to state and check.

> **Early adopters:** the four repos above migrated against **pre-release alpha**
> builds, where each package kept its _own_ number and shared a build suffix,
> e.g. `@toptal/picasso@55.0.3-alpha-migrate-picasso-provider-v2-<sha>`,
> `@toptal/picasso-forms@75.0.3-alpha-…`, `@toptal/picasso-provider@6.0.1-alpha-…`.
> Their guides therefore call this the "v55 / provider v6" upgrade. **The stable
> release unifies everything to `v100`** — prefer `100.x` everywhere; the alpha
> numbers are historical.

---

# Part 1 — Engineer migration tutorial

Work through the steps in order. Steps 1–4 are the mechanical upgrade; Steps
5–10 are the fallout you fix afterward; Steps 11–12 are CI and sign-off. Each
step ends with what "done" looks like.

## Step 0 — Prerequisites

- **You must already be on Tailwind CSS v4** with the Picasso preset
  (`@toptal/picasso-tailwind` + `@toptal/base-tailwind` in `tailwind.config.js`,
  content globs covering `node_modules/@toptal/picasso*/**/*.js`). If you are on
  Tailwind v3, do that migration **first** — it is a separate effort.
- **Verify your real Tailwind version rather than trusting docs.** In
  client-portal the repo `CLAUDE.md` claimed Tailwind v3 while the app actually
  compiled v4 (`tailwindcss@4.2.x`, v4-only syntax like `**:` and trailing `!`
  already in vendor code). Check `package.json` / lockfile.
- Node `>=22`, pnpm (adapt commands to your package manager).

## Step 1 — Bump every Picasso package in lockstep → `100.x`

**All `@toptal/picasso*` dependencies move together to `100.x` — pinned versions
_and_ `>=`/`^`/`~` peer ranges.** This is the step that bites when done
partially.

Why lockstep is mandatory: the new `picasso-provider` **removed
`makeResponsiveSpacingProps`**. Any Picasso package left on an older version
still imports it and throws at runtime (surfacing in Jest first):

```
TypeError: makeResponsiveSpacingProps is not a function
```

A leftover peer range like `"@toptal/picasso": ">=54.1.4"` lets the resolver
satisfy it with a stale copy, silently reintroducing the break. Pin the **exact**
version everywhere, including `peerDependencies`, until you have a green build.

Representative set (all → `100.x`; your app will reference a subset or superset):

| Package                                        | Target  |
| ---------------------------------------------- | ------- |
| `@toptal/picasso`                              | `100.x` |
| `@toptal/picasso-forms`                        | `100.x` |
| `@toptal/picasso-provider`                     | `100.x` |
| `@toptal/picasso-tailwind`                     | `100.x` |
| `@toptal/picasso-tailwind-merge`               | `100.x` |
| `@toptal/picasso-charts`                       | `100.x` |
| `@toptal/picasso-rich-text-editor`             | `100.x` |
| `@toptal/picasso-shared`                       | `100.x` |
| …every other `@toptal/picasso-*` you depend on | `100.x` |

If your repo **publishes** a package that lists Picasso as a peer dependency,
bump that range too:

```diff
 "peerDependencies": {
-  "@toptal/picasso": "54.x",
+  "@toptal/picasso": "100.x",
 }
```

Then reinstall and prove no stale copy survived resolution:

```bash
pnpm install --no-frozen-lockfile
```

```bash
# Flag any installed @toptal/picasso* NOT on the v100 line:
node -e '
const {execSync}=require("child_process"), path=require("path");
const files=execSync(`find node_modules -path "*@toptal/picasso*/package.json"`,{encoding:"utf8"})
  .trim().split("\n").filter(Boolean);
let stale=0;
for(const f of files){
  const p=require(path.resolve(f));
  if(!/^@toptal\/picasso/.test(p.name||"")) continue;
  if(!/^100\./.test(p.version||"")){ console.log("STALE:", p.name, p.version); stale++; }
}
console.log(stale ? `${stale} stale copies` : "OK — all @toptal/picasso* on v100");
'
```

```bash
# Nothing outside the provider should still import the removed helper:
grep -rln makeResponsiveSpacingProps node_modules/@toptal | grep -v picasso-provider
```

> **Jest cache gotcha.** If tests still throw
> `makeResponsiveSpacingProps is not a function` after the bump + install, it is
> almost always a stale Jest transform cache. Clear it:
> `npx jest --clearCache` (or `rm -rf /tmp/jest_rs`), then re-run.

**Done when:** the graph collapsed to a single `100.x` per Picasso package, the
stale-copy check prints `OK`, and the `grep` prints nothing.

## Step 2 — Import the base reset CSS

The global reset no longer comes from a `CssBaseline` the provider renders — it
ships as a CSS file you import in your Tailwind entry, **between the theme and
utilities layers**:

```diff
 @layer theme, base, components, utilities;
 @import 'tailwindcss/theme.css' layer(theme);
+@import '@toptal/picasso-tailwind/base';
 @import 'tailwindcss/utilities.css' layer(utilities);

 @config "../tailwind.config.js";
```

Notes and gotchas:

- The reset lives in `@layer base`, so Tailwind utilities and any **unlayered**
  app CSS win over it by cascade-layer rules.
- **Opting out** (the former `<Picasso reset={false}>`) is simply _not importing_
  this file.
- If you skip the import you silently lose font smoothing, the box model, the
  page-width-jump fix, etc. — pages look subtly wrong.
- **Box model is content-box.** The reset sets `box-sizing: initial` on `html`
  (then `inherit`), _not_ the usual border-box reset (a border-box flip was
  attempted and reverted upstream). Picasso's own components stay border-box via
  their root node; your app code keeps whatever box model it had.
- **`body { min-height: 100vh }`** is part of the reset. In Cypress/Happo this
  can add uniform extra bottom whitespace to short `cy.get('body')` screenshots
  (see [Step 10](#step-10--visual-regression-happo)).
- The reset also ships the **page-width-jump fix** (`html { overflow-x: hidden }`
  - `body { width: 100vw }` from 768px up). If your app needs horizontal page
    scroll (wide tables, etc.), re-disable it with **unlayered** app CSS —
    `html { overflow-x: visible }` + `body { width: 100% }` — which wins over
    `@layer base` by cascade rules (no `!important` needed).
- **Every** Tailwind entry that renders Picasso needs this import — not just the
  app entry, but also your Cypress support CSS and any Storybook CSS.

**Done when:** the app, Storybook, and Cypress all import
`@toptal/picasso-tailwind/base` and boot with correct global typography/spacing.

## Step 3 — Remove the deleted `<Picasso>` props and provider APIs

`picasso-provider` no longer has an MUI theme runtime. Remove or map each of the
following. A `@toptal/picasso-codemod` transform to strip the removed
`<Picasso>` props ships alongside this migration (PF-1995) — use it if available,
but the manual map is short:

| Removed                                                                            | What to do                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reset` prop                                                                       | Deleted. The reset is now the CSS import from [Step 2](#step-2--import-the-base-reset-css). Just remove it (omit the import to get `reset={false}`).                                                                               |
| `injectFirst` prop                                                                 | Deleted (no MUI `StylesProvider`). Remove it.                                                                                                                                                                                      |
| `preventPageWidthChangeOnScrollbar` prop                                           | Replaced by **`responsive`** (defaults `true`). The old `={true}` behavior is the new default; translate `={false}` → `responsive={false}`.                                                                                        |
| `theme` prop                                                                       | Deleted. To customize page content width (the common use), set it on `<Page>` via a CSS variable: `<Page className="[--content-width:80em]">`.                                                                                     |
| `disableClassNamePrefix` prop                                                      | Deleted (no JSS class names to prefix). Remove it.                                                                                                                                                                                 |
| `PicassoProvider` + `.override()` / `.extendTheme()` / `.disableResponsiveStyle()` | Removed. There is no runtime MUI theme — override component styling with Tailwind `className` / `data-*` variants (see [Step 4b](#step-4b-withstyles-overrides--data-attribute-variants)) instead of `PicassoProvider.override()`. |
| `getServersideStylesheets`                                                         | Removed. Tailwind extracts CSS at build time; drop JSS server-side stylesheet collection from SSR setup.                                                                                                                           |
| `theme.layout.contentMinWidth`                                                     | Removed. `<Page>` now derives the non-responsive minimum width from `responsive` (`responsive={false}` applies a static `min-w-[768px]`). No replacement to set.                                                                   |

Find stragglers:

```bash
grep -rnE '\b(reset|injectFirst|preventPageWidthChangeOnScrollbar|disableClassNamePrefix|getServersideStylesheets)\b' \
  --include='*.ts' --include='*.tsx' src | grep -v node_modules
```

> **`Page.TopBar` note:** the top bar now applies `md:w-screen` unconditionally
> to stay coordinated with the always-on page-width-jump fix. If you opted out of
> that fix and need the old width, override via its `className` (e.g.
> `md:w-full`) — consumer `className` wins the merge.

**Done when:** `pnpm typecheck` reports no removed-prop / removed-export errors
from `@toptal/picasso-provider`.

## Step 4 — Remove all `@material-ui` / JSS usage

JSS is gone. Find the work:

```bash
grep -rln "makeStyles\|withStyles\|createStyles\|@material-ui" src/
```

> If this returns nothing, your repo (like topkit) is already Tailwind-native —
> skip to [Step 5](#step-5--fix-unit-tests-jest--rtl). You may still have a lone
> `@material-ui` **type** import; see [4c](#step-4c-material-ui-type-imports--picasso-types).

### Step 4a. `makeStyles` → Tailwind `className`

```diff
-import { makeStyles } from '@material-ui/core/styles'
-import styles from './styles'
-
-const useStyles = makeStyles(styles)
-
 const DisableContainerMask = ({ active, children }) => {
-  const classes = useStyles()
   const className = cx({
-    [classes.root]: active,
+    'opacity-[0.48] pointer-events-none': active,
   })

   return <Container className={className}>{children}</Container>
 }
```

Delete the corresponding `styles.ts`. Fixed pixels map to arbitrary values
(`h-[130px]`, `max-w-[640px]`), common ones to standard utilities (`w-full`,
`text-center`, `shadow-none`).

> **Pitfall — don't port dead styles literally.** Check whether each old JSS rule
> actually rendered before translating it. A real example from top-scheduler: a
> deleted `styles.ts` had `borderBottom: '1px soild …'` — the `soild` typo made
> the value invalid, so the border **never rendered**. Translating it "correctly"
> to `border-b border-gray-100` would _introduce_ a border that was never there
> (and a Happo diff). Drop dead rules; keep rendered parity. If a style was
> actually intended, restore it as a separate, deliberate change with its own
> visual sign-off.

### Step 4b. `withStyles` overrides → data-attribute variants

Overriding a Picasso component's internal JSS rule names no longer works — there
are no JSS classes to target. Picasso components expose **`data-component-type`**
attributes on their internal elements; target them with Tailwind v4 arbitrary
variants from the component's `className`:

```diff
-const Accordion = withStyles(S.accordionStyles)(PicassoAccordion) as any
-
 <Accordion
-  className={classes.accordion}
+  className={cx(
+    'border-t border-gray-100 rounded-none bg-white!',
+    '**:data-[component-type=accordion-summary]:font-normal',
+    'hover:**:data-[component-type=accordion-summary]:font-semibold',
+    '**:data-[component-type=accordion-summary-icon]:self-center',
+  )}
```

Tailwind v4 syntax used here:

- `**:` — apply to all descendants.
- `data-[component-type=…]` — match the internal element by its data attribute
  (inspect the rendered DOM to find the values).
- trailing `!` (e.g. `bg-white!`) — the v4 `!important` modifier (replaces JSS
  `!important`).

For a simple `withStyles` wrapper with no internal-rule targeting, replace it
with a plain wrapper component:

```diff
-const MessageGridItem = withStyles(StyledMessageGridItem)(Grid.Item) as any
+const MessageGridItem = ({ children }: { children: React.ReactNode }) => (
+  <Grid.Item className='max-w-[640px] text-center'>{children}</Grid.Item>
+)
```

> **Pitfall — `fontWeight: 'inherit'` has no clean drop-in.** Tailwind resolves
> non-numeric arbitrary `font-[…]` as _font-family_, so `font-[inherit]` compiles
> to `font-family: inherit`. Use the arbitrary property `[font-weight:inherit]`
> (or restructure), and verify hover-weight states manually — Happo does not
> capture hover-only weight effects. Beware `tailwind-merge` bucketing custom
> `font-*` classes into the wrong conflict group.

### Step 4c. `@material-ui` type imports → Picasso types

Even Tailwind-native repos often keep one type-only MUI import. Replace with
Picasso equivalents:

```diff
-import type { GridItemsAlignment, GridSize } from '@material-ui/core/Grid'
+import type { GridProps, GridSize } from '@toptal/picasso'
```

```diff
-  alignGridItems?: GridItemsAlignment
+  alignGridItems?: GridProps['alignItems']
```

`GridSize` is re-exported from `@toptal/picasso`; `GridItemsAlignment` is not a
public export, so derive it from the component's own props.

### Step 4d. `palette` from `@toptal/picasso/utils`

`import { palette } from '@toptal/picasso/utils'` no longer resolves. Replace
with Tailwind color tokens:

- `palette.grey.lighter` → `border-gray-100` / `bg-gray-100`
- `palette.common.white` → `bg-white`

Also prefer tokens over inline styles that mimicked palette colors
(`style={{ backgroundColor: 'rgb(243,244,246)' }}` → `className='bg-gray-100'`).
`SPACING_2`, `SPACING_4`, … are **still exported** from `@toptal/picasso/utils` —
no change there.

**Done when:** `grep -rn "@material-ui" src/` and the `makeStyles|withStyles|createStyles`
grep both return nothing, and `pnpm typecheck` is clean.

## Step 5 — Fix unit tests (Jest / RTL)

### Step 5a. Expect large snapshot churn (structural, not content)

The tree `<Picasso>` renders changed: MUI `ThemeProvider`, `StylesProvider`,
`CssBaseline`, and `PreventPageWidthChangeOnScrollbar` are **removed**;
JSS class names (`Picasso-root-1`, `WithStyles(X)`) become static Tailwind
strings; `TestingPicasso` snapshots no longer contain a reset `<style>`.
Regenerate and **review the diff** — it should be providers-removed +
class-strings-changed, not content changes:

```bash
pnpm test -u
```

### Step 5b. Checkbox / Switch — role element + hidden sibling input

Checkbox and Switch render a visible `role="checkbox"` / `role="switch"`
**span** carrying state via ARIA, plus a **visually-hidden native `<input>` that
is a _sibling_** of that span (both inside an outer wrapper). Pattern: **assert
state on the role element, dispatch the click on the input.**

```tsx
// Switch: role="switch" span carries the state; the hidden proxy <input> is a
// SIBLING (not a child) and is where the toggle event flows through.
const getSwitch = () => {
  const control = screen.getByTestId('showAsAdditionalSwitch')
  const input = control.parentElement?.querySelector(
    'input[type=checkbox]'
  ) as HTMLInputElement

  return { control, input }
}

const { control, input } = getSwitch()

fireEvent.click(input)
expect(control).toBeChecked() // reads aria-checked on the role element
```

| Broken pattern                                                      | Fix                                                                                                                                                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getByTestId(x).querySelector('input')`, `.children[0].children[0]` | Query the role element: `getByRole('checkbox'\|'switch', { name })` or the testid — Picasso forwards `data-testid` to the role element (Switch: to the role span when unlabeled, else to the label wrapper). |
| `getByLabelText('…')` expecting a clickable input                   | `getByRole('checkbox', { name })` for the span, then find the sibling input to click.                                                                                                                        |
| `toHaveAttribute('checked')`                                        | `toBeChecked()` (reads `aria-checked` on the role element). If a controlling prop never updates in the test, assert the `onChange` callback instead — there is no DOM change to observe.                     |
| `toBeDisabled()` on a checkbox/switch                               | `toHaveAttribute('aria-disabled', 'true')` on the role element — the span is not a form element with a native `disabled`.                                                                                    |

### Step 5c. Radio — still a native `<input>` (NOT base-ui)

**Radio did not move to base-ui.** It renders a real `<input type="radio">` with
an `opacity-0` full-size overlay plus decorative spans. The **group** wrapper is
`role="radiogroup"`; individual radios have **no `role="radio"`**. So:

- Target the **native input** (`getByRole('radio', …)` still works — the native
  input _is_ a radio), or scope by `input[value="…"]`.
- `toBeChecked()` works against the input; native `disabled` may still apply.
- Do **not** apply the Checkbox/Switch "role span + hidden sibling" pattern to
  Radio — there is no separate role span.

### Step 5d. `jest.mock` factories — spread `requireActual`

The single biggest source of confusing import-time failures. A bare factory
erases every _other_ export of a module for the whole import graph, and the new
Picasso changes which modules that graph reaches:

```diff
-jest.mock('@toptal/picasso/utils', () => ({ useNotifications: jest.fn() }))
+jest.mock('@toptal/picasso/utils', () => ({
+  ...jest.requireActual('@toptal/picasso/utils'),
+  useNotifications: jest.fn(),
+}))
```

Symptoms this fixes: `Cannot read properties of undefined (reading 'grey')`,
`gql is not a function`, and similar at import time. Sometimes the right fix is
**deleting** a bare mock of a package the test never needed stubbed. Do **not**
reach for `moduleNameMapper`/resolver changes for these.

### Step 5e. Structural DOM assertions break silently

`expect(container.firstChild?.firstChild)` chains assumed the MUI nesting;
base-ui changed it, turning "renders nothing" checks into false pass/fail.
Assert **semantically**:

```diff
-expect(container.firstChild?.firstChild).toBeNull()
+expect(queryByText('Selected by Toptal')).not.toBeInTheDocument()
```

### Step 5f. Enzyme selectors

`WithStyles(X)` wrappers no longer exist:

```diff
-wrapper.find('WithStyles(Accordion)').simulate('change', {}, true)
+wrapper.find('Accordion').simulate('change', {}, true)
```

### Step 5g. Test-infra (one-time)

- **PointerEvent polyfill.** jsdom lacks the `PointerEvent` + pointer-capture
  APIs base-ui dispatches on click; without it `fireEvent.click` throws
  `PointerEvent is not a constructor`. Add a polyfill to your Jest setup
  (`setupFilesAfterEnv`). Promote it to a shared setup once more than one suite
  needs it.
- **Silence floating-ui `act()` warnings.** base-ui positions popups async after
  render; these warnings are benign and infeasible to wrap suite-wide. Add them
  to your console-failure allowlist rather than wrapping every render.

**Done when:** `pnpm test` is green and regenerated snapshots reviewed.

## Step 6 — Fix Cypress tests

| Broken pattern                                                                                   | Fix                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cy.get('input[...]').click()` on a checkbox/radio/switch input → _"covered by another element"_ | The real input is visually hidden. `check()`/`uncheck({ force: true })` is the documented remedy (sets `checked` + fires `change`, which base-ui honors, preserving ensure-semantics). Prefer clicking the **role element** by testid where possible.                                                  |
| `cy.get('[role="tooltip"]')` for **Select/Dropdown/Autocomplete/DatePicker** popups              | Those poppers no longer carry `role="tooltip"` (Select/Dropdown/Menu → `role="presentation"`, DatePicker → `role="dialog"`; only real **Tooltips** keep `role="tooltip"`). Query the stable marker **`[data-picasso-popper]`**.                                                                        |
| Option queries: `cy.get('[role="listbox"]').find('li[value=…]')`                                 | Options still carry `role="option"` inside a `role="listbox"`, but the popper _wrapper_ is `presentation` and **portals out**. Use `cy.get('[data-picasso-popper]').find('[role=option]')` (or a shared `cy.getPopup()`), scoping to `[role=option]` so you don't match the trigger's displayed value. |
| Popup queries inside `cy.within()` find nothing                                                  | Popups portal to the Picasso root, outside your scope — escape with `{ withinSubject: null }`, e.g. `cy.get('[data-picasso-popper]', { withinSubject: null })`.                                                                                                                                        |
| Clicking a field `<label>` to **open a Select**                                                  | Removed on purpose (PR #5040 / PF-2256): label-activation clicks only _focus_ the input, matching native `<select>`. Click the control itself: `cy.getByTestId(field).click()` or `.find('input').click()`. Keyboard (Enter/Space), real pointer, and AT activation still toggle.                      |
| Backdrop click doesn't close a modal/drawer                                                      | base-ui dismissal reacts only to **trusted** pointer events; synthetic `cy.click()` is ignored. Use `cy.get('body').realClick({ x: 1, y: 1 })` (cypress-real-events) or the explicit close button.                                                                                                     |
| Wrapped-subject chains (`this.modal.findByTestId(…).find(…)`) failing with _"the page updated"_  | Use one **atomic** selector — `cy.get('div[role="dialog"] [data-testid=…] …')` — so Cypress retries the whole query; give each action its own fresh chain instead of `.click().clear().type()`.                                                                                                        |
| Async-populated options/radios intermittently "not found" on CI                                  | Use a retryable atomic selector that includes the expected value (`.find('input[value="…"]')`, `.contains(text)`), let `.should()` gate on it, then assert the resulting state — this waits for the option to actually mount.                                                                          |
| Selectors coupled to old markup (`label.picasso-checkbox`, `span[role="slider"]`, tag+structure) | Query by role or testid — the role survived the migration, the tag and structure did not.                                                                                                                                                                                                              |
| Desktop-only UI missing at the component viewport                                                | See [`responsive={false}` breakpoint gap](#the-responsivefalse-breakpoint-gap); add `cy.viewport(1280, 800)`.                                                                                                                                                                                          |

> **Checkbox/switch input relationship in Cypress:** because the hidden input is
> a **sibling** of the role element, from a testid on the role element the input
> is `.siblings('input')`; if your selector yields the _input_ (`[name=…]`,
> `#id`, `.find('input')`), climb to `.parent()` to reach the wrapper. Prefer
> clicking the role element directly.

### The `responsive={false}` breakpoint gap

If your test wrapper mounts `<Picasso responsive={false}>` (common), be aware of
a real upstream bug: `responsive={false}` calls `disableMobileBreakpoints()`,
which **empties** the `xs`/`sm`/`md` media-query strings and leaves `lg` starting
at 1024px. That creates a **dead zone at 768–1023.98px** where _no_ breakpoint
matches, so at the default Cypress component viewport (822px) desktop checks like
`useBreakpoint(['md','lg','xl'])` return `false` and components render their
**mobile** branch — the opposite of what `responsive={false}` intends.

- **Consumer-side fix:** `cy.viewport(1280, 800)` in specs that assert
  desktop-gated UI (pick a width comfortably inside `lg`; exactly 1024 can flip
  on scrollbar width).
- This is an upstream bug (`md` should match everything below `lg`, not nothing)
  — report it rather than baking workarounds into app code.

**Done when:** the Cypress component + e2e suites pass without deleting
assertions.

## Step 7 — Fix real component bugs the migration exposes

When state doesn't propagate, **fix the component, not the test.** Four classes,
in order of how often they bite:

1. **`onClick` on Checkbox / Switch / Radio → `onChange`.** Picasso's change API
   is `onChange` (wired to base-ui `onCheckedChange`). `onClick` misses keyboard
   and programmatic changes, and doesn't fire when an already-selected radio is
   re-clicked or a radio is deselected. Row-selection was genuinely broken for
   users in staff-portal because of this.
2. **Reading `e.currentTarget.checked` inside `onChange`.** Stale under base-ui's
   forwarded native event. Use the **second argument**:
   `onChange={(_e, nextChecked) => …}`. (Picasso bridges base-ui's event to a
   React `ChangeEvent` via `toReactChangeEvent`, but the reliable value is the
   `checked` arg.)
3. **`as={cond ? Link : Button}` on Picasso `Button`.** Passing a button-like
   component (or Picasso `Button`) as `as` creates a confusing nested-button and
   breaks disabled handling. Use **`as={cond ? Link : undefined}`** (undefined →
   the default native `<button>`).
   - Assertion nuance: a real `<button>` gets a native `disabled` attribute
     (so `toBeDisabled()` / `be.disabled` works), while `as={Link}`/anchor gets
     only `aria-disabled` (assert `aria-disabled`, not `toBeDisabled()`).
     `aria-disabled` is always emitted — it is not "dropped".
4. **Sass targeting Picasso internals via structural selectors.** The MUI-era DOM
   is gone, so old rules die silently or hit the wrong node:
   - **Drawer/Modal:** `className` now lands on the **paper element itself**
     (which is `position: fixed` and anchored). A sass rule overriding `position`
     on that class makes the drawer/modal fill the page. Re-target child
     selectors against the real DOM; never override `position` on the paper.
   - **Radio/Checkbox circle painting:** the old `input ~ div::before/::after`
     structure is now `input ~ span` sibling spans; re-target selectors and
     override the dot's `background-color`, not just `border-color`.
   - App sass wins over Picasso's Tailwind utilities by cascade-layer rules
     (utilities are layered, app sass is unlayered), so re-targeted overrides
     apply reliably.

> **Never delete assertions to go green.** A failing assertion is usually a real
> signal pointing at one of the classes above.

## Step 8 — Tailwind v4 gotchas

- **Bare borders render in `currentColor`.** Tailwind v4 removed v3's `gray-200`
  default border color; a bare `border` / `border-b` / `divide` / `ring` now
  paints in the element's **text color** (often near-black). Neither
  `@toptal/picasso-tailwind/base` nor `@toptal/base-tailwind` restores a default.
  **Always pair a border/divide/ring utility with an explicit color**
  (`border-b border-gray-200`).
- **Vendor packages styled with Tailwind must be in your root
  `tailwind.config.js` `content` globs.** Picasso (and any Toptal package that
  ships _source_ styled with Tailwind, e.g. `@toptal/top-scheduler`) emits
  utilities that only get generated if the scanner sees the files. A missing glob
  = silently unstyled vendor UI (e.g. an accordion losing its
  `**:data-[component-type=…]` variants).
- **Per-package verification trap.** Tailwind v4 auto-detection scans
  cwd-relative non-gitignored files. Compiling from the **repo root** can pick
  candidate class strings out of `docs/*.md` and produce CSS the real
  **per-package** Cypress/Happo build lacks. Verify missing-utility hypotheses
  from the **package cwd**, not the root.

## Step 9 — TypeScript fallout (stricter typings)

- **`Radio.Group` `value`** is now `string | number | boolean | undefined`.
  Narrow at the call site rather than casting (e.g. default a nullable filter to
  a sentinel; make `find()` predicates type guards so each value type narrows).
- **`ClickAwayListener` `children`** requires a single `ReactElement` (was
  `ReactNode`) — it must attach a ref to its child. Wrap multi-node children in a
  single element.

## Step 10 — Visual regression (Happo)

- **Expect diffs across the board** (font smoothing, reset, minor spacing).
  Run Happo, review, and **accept the new baselines as part of this upgrade PR.**
- **Responsive capture caveat.** Picasso decides responsive layout in JS via
  `useBreakpoint` (reads `window.innerWidth`), not CSS media queries alone. A DOM
  captured at a desktop viewport renders the _desktop_ layout even on Happo's
  mobile targets — Happo cannot re-decide JS breakpoints per target. If mobile
  baselines matter, capture from a real mobile viewport as a separate snapshot:

  ```ts
  cy.get('body').happoScreenshot({ targets: ['chrome', 'chrome-tablet'] })

  cy.viewport(375, 667) // real mobile width so useBreakpoint resolves mobile
  cy.get('body').happoScreenshot({
    variant: 'mobile',
    targets: ['chrome-mobile'],
  })
  ```

  Consider deferring this to a follow-up PR (behind a flag) so the upgrade diff
  stays reviewable.

- **Extra bottom whitespace** across many `cy.get('body').happoScreenshot()`
  shots is usually the reset's `body { min-height: 100vh }` (older baselines were
  reset-less). Neutralize with an **unlayered** `body { min-height: auto }` in
  your Cypress support CSS — keep the base import; components rely on the rest of
  the reset.
- **Storybook/Cypress popup timing.** base-ui popups position asynchronously;
  simulate a `requestAnimationFrame` tick before each capture or popups
  screenshot blank. Portals resolve their container from the Picasso root, which
  can be `null` on a story's first render — a post-mount re-render fixes it.
- Drawer/Modal full-page or mispositioned screenshots → check for a sass
  `position` override on the paper (Step 7.4) before suspecting Picasso.

## Step 11 — CI

- **Drop any Picasso version matrix.** If CI installed multiple Picasso versions
  (`pnpm add @toptal/picasso@${{ matrix.version }}`), remove it — the repo should
  run exactly the `100.x` versions pinned in `package.json`/lockfile.
- **Watch required-status-check names** that embed the old version string (e.g.
  `Cypress using Picasso 54.x`): either keep the job name unchanged, or update the
  required-check name in branch protection **first**.

## Step 12 — Verification checklist

```bash
pnpm install --no-frozen-lockfile
npx jest --clearCache   # provider change invalidates the transform cache
pnpm typecheck          # catches removed props / @material-ui / palette imports
pnpm lint
pnpm test -u            # regenerate + review Jest snapshots
pnpm cypress:ci         # or your repo's Cypress command
```

- [ ] Every `@toptal/picasso*` on `100.x` (pins **and** peer ranges); stale-copy check `OK`
- [ ] `grep makeResponsiveSpacingProps node_modules/@toptal` (outside provider) returns nothing
- [ ] `@toptal/picasso-tailwind/base` imported in app, Cypress, and Storybook CSS entries
- [ ] No `reset` / `injectFirst` / `preventPageWidthChangeOnScrollbar` / `theme` / `disableClassNamePrefix` on any `<Picasso>`
- [ ] No `@material-ui` imports; no `makeStyles` / `withStyles` / `createStyles`; no `palette` from `@toptal/picasso/utils`
- [ ] Jest snapshots regenerated and reviewed (structural only)
- [ ] Checkbox/Switch tests use the role-element + sibling-input pattern; Radio uses the native input
- [ ] `jest.mock` factories spread `requireActual`
- [ ] Cypress uses `[data-picasso-popper]` + `{ withinSubject: null }`; force is reserved for `check/uncheck`
- [ ] Component-code bug classes audited (onClick→onChange, currentTarget.checked, `as`, sass)
- [ ] Happo diffs reviewed and accepted
- [ ] Storybook and app boot and look right; key flows smoke-tested
- [ ] `peerDependencies` bumped to `100.x` if the repo publishes a package
- [ ] CI version matrix dropped; required-check names reconciled

---

# Part 2 — AI-agent migration plan

A deterministic playbook for driving the same upgrade with a coding agent. It
front-loads a discovery inventory, then runs phases with an explicit
verification gate after each, and gives a triage tree + fix matrices so the agent
resolves failures by rule instead of guesswork.

## Operating contract

1. **Golden rule** — interact with the role element; assert through ARIA. Every
   fix below is a corollary.
2. **Preserve behavior and pre-existing quirks.** This is a library swap, not a
   refactor. Do not opportunistically rename, restyle, or "clean up" unrelated
   code — scope creep breaks the no-consumer-visible-change contract.
3. **Never delete an assertion to go green.** A failing assertion is a signal;
   route it through the [triage tree](#triage-tree-for-a-newly-failing-test).
4. **Confidence posture.** HIGH confidence (a row in a fix matrix matches
   exactly) → apply the edit. MEDIUM (plausible but the DOM/role differs from the
   table) → apply the smallest change and note the assumption in the PR. LOW
   (behavior change, ambiguous intent, or a suspected upstream bug) → stop and
   surface it; do **not** invent a workaround in app code.
5. **Fix the component, not the test**, when state genuinely fails to propagate
   ([Phase F](#phase-f--component-code-bug-triage)).

## Phase A — Discovery (build the work manifest first)

Run every probe, record hit counts and file lists. This inventory drives phase
scope and lets you report "0 occurrences → phase N/A" instead of guessing.

```bash
# A1 Package surface — every @toptal/picasso* dep + peer range
grep -rnoE '"@toptal/picasso[^"]*"\s*:\s*"[^"]+"' --include=package.json . | grep -v node_modules

# A2 JSS / MUI (Step 4). Empty ⇒ repo is Tailwind-native; skip Phase D except A2b
grep -rln "makeStyles\|withStyles\|createStyles\|@material-ui" src/
# A2b lone @material-ui type imports
grep -rn "@material-ui" --include='*.ts' --include='*.tsx' src

# A3 Removed <Picasso> props / provider APIs (Step 3)
grep -rnE '\b(reset|injectFirst|preventPageWidthChangeOnScrollbar|disableClassNamePrefix|getServersideStylesheets|PicassoProvider)\b' \
  --include='*.ts' --include='*.tsx' src | grep -v node_modules
# A3b removed helper / palette
grep -rn "makeResponsiveSpacingProps\|palette" --include='*.ts' --include='*.tsx' src

# A4 Test breakages (Steps 5–6)
grep -rn "toHaveAttribute('checked')\|\.querySelector('input')\|getByLabelText" --include='*.test.tsx' src
grep -rn "role=\"tooltip\"\|role='tooltip'\|role=\"listbox\"\|\[role=listbox\]" --include='*.cy.*' --include='*.ts' cypress src
grep -rn "\.find('label')\|contains(.*).click()" --include='*.cy.*' src   # label-click Select openers (candidates)
grep -rnE "input\[[^]]*\]\)?\.click\(\)" --include='*.cy.*' src            # unforced hidden-input clicks
grep -rn "WithStyles(" --include='*.test.tsx' src                          # Enzyme wrappers
grep -rnE "jest\.mock\((['\"]@toptal/picasso" --include='*.test.*' src     # bare mock factories (check for requireActual)

# A5 Component-code bug candidates (Phase F)
grep -rn "<Checkbox[^>]*onClick\|<Switch[^>]*onClick\|<Radio[^>]*onClick" --include='*.tsx' src
grep -rn "currentTarget.checked" --include='*.tsx' src
grep -rnE "as=\{[^}]*\?[^}]*:[^}]*Button" --include='*.tsx' src            # as={cond ? Link : Button}
```

**Output of Phase A:** a manifest `{ phase → {hitCount, files[]} }`. Phases with
0 hits are marked N/A and skipped (report it — do not silently drop coverage).

## Phase B — Packages + reset

_See Part 1, Steps 1–2._

1. Rewrite every `@toptal/picasso*` version (pins **and** peer ranges) to the
   exact `100.x` release. `pnpm install --no-frozen-lockfile`.
2. Run the stale-copy Node check and the `makeResponsiveSpacingProps` grep from
   [Step 1](#step-1--bump-every-picasso-package-in-lockstep--100x). Both must be
   clean before proceeding.
3. Add `@import '@toptal/picasso-tailwind/base';` (after theme, before utilities)
   to **each** Tailwind entry that renders Picasso — app, Cypress support, and
   Storybook. Do **not** add it to entries that deliberately use default Tailwind
   with no Picasso preset.
4. **Gate:** `npx jest --clearCache && pnpm typecheck`. A
   `makeResponsiveSpacingProps is not a function` here means a stale copy or
   cache — do not proceed until B2 is clean.

## Phase C — Provider props

_See Part 1, Step 3._

Apply the removed-prop map (use the PF-1995 codemod if present, else edit).
Translate `preventPageWidthChangeOnScrollbar={false}` → `responsive={false}`;
`theme` content-width → `<Page className="[--content-width:…]">`. **Gate:**
`pnpm typecheck` (0 removed-prop errors).

## Phase D — JSS / MUI removal

_See Part 1, Step 4._

Per file from A2: `makeStyles`→`className`; `withStyles`(internal targeting)→
`**:data-[component-type=…]` variants (+ trailing `!` for important);
`withStyles`(plain)→wrapper component; `@material-ui` type imports→Picasso types;
`palette`→tokens. **Do not port dead/typo'd styles** — verify each rule rendered
before translating. **Gate:** `grep @material-ui` empty, `pnpm typecheck` clean.

## Phase E — Test fixes (Jest, then Cypress)

Run the suite; for each failure apply the matching matrix row. Jest first
(faster signal), then Cypress. Regenerate snapshots **last**, after logic fixes,
and review the diff for structural-only changes.

**Jest / RTL matrix**

| Signal                                                                                      | Fix                                                                                                                     | Conf |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---- |
| import-time `undefined (reading …)` / `X is not a function`                                 | Read `jest.mock` factories in the test file first; spread `...jest.requireActual(...)`, or delete an unneeded bare mock | HIGH |
| `toHaveAttribute('checked')`, `querySelector('input')`, `getByLabelText` on checkbox/switch | Role element for assertions (`getByRole`/testid); click the **sibling** `input[type=checkbox]`                          | HIGH |
| `toBeDisabled()` on checkbox/switch                                                         | `toHaveAttribute('aria-disabled','true')` on the role element                                                           | HIGH |
| same on a real `<button>`                                                                   | keep `toBeDisabled()` — native `disabled` still renders                                                                 | HIGH |
| `expect(container.firstChild?.firstChild)` structural chains                                | Assert semantically (`queryByText`/`queryByTestId` … `not.toBeInTheDocument()`)                                         | HIGH |
| `WithStyles(X)` Enzyme selector                                                             | drop the wrapper: `.find('X')`                                                                                          | HIGH |
| Radio treated as role-span + hidden input                                                   | Radio is a native input; target the input / `getByRole('radio')`                                                        | HIGH |
| `PointerEvent is not a constructor`                                                         | add PointerEvent polyfill to Jest setup                                                                                 | HIGH |
| floating-ui `act()` warnings                                                                | add to console-failure allowlist                                                                                        | HIGH |
| tooltip assertion sync after hover                                                          | `await screen.findByRole('tooltip')`                                                                                    | HIGH |

**Cypress matrix**

| Signal                                                                        | Fix                                                                                | Conf |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---- |
| `[role="tooltip"]` / `[role="listbox"]` for Select/Dropdown/DatePicker popups | `[data-picasso-popper]` (+ `[role=option]` for options), `{ withinSubject: null }` | HIGH |
| popup query inside `cy.within()` finds nothing                                | escape scope: `{ withinSubject: null }`                                            | HIGH |
| `.click()` on hidden checkbox/radio/switch input "covered"                    | prefer role element by testid; else `check/uncheck({ force: true })`               | HIGH |
| label click no longer opens a Select                                          | click the control: `getByTestId(field).click()` / `.find('input').click()`         | HIGH |
| backdrop `cy.click()` doesn't dismiss                                         | `cy.get('body').realClick({ x:1, y:1 })` or the close button                       | HIGH |
| `.findByTestId(…).find(…)` "page updated"                                     | one atomic `cy.get('… [data-testid=…] …')`; fresh chain per action                 | HIGH |
| async options intermittently missing on CI                                    | retryable atomic selector w/ value + `.should()` gate                              | MED  |
| desktop UI absent at 822px component viewport                                 | `cy.viewport(1280, 800)` (breakpoint gap)                                          | HIGH |
| selector coupled to old markup/tag                                            | query by role or testid                                                            | HIGH |

**Gate:** `pnpm test` and the Cypress suite green with no removed assertions.

## Phase F — Component-code bug triage

_See Part 1, Step 7._

For each A5 candidate, decide by rule: `onClick`→`onChange` on Checkbox/Switch/
Radio; `e.currentTarget.checked`→ second `checked` arg; `as={cond?Link:Button}`→
`as={cond?Link:undefined}`; sass structural selectors on Picasso internals →
re-target against real DOM (never override `position` on Drawer/Modal paper).
Each of these is a **real user-facing bug** — fix the component and add/keep a
colocated test.

## Phase G — Visual + CI

_See Part 1, Steps 10–11._

Run Happo; classify each diff before accepting (reset/font vs. a real
regression vs. a vendor content-glob gap vs. a sass `position`-on-paper break).
Add missing vendor globs to root `tailwind.config.js`; neutralize the
`min-height:100vh` whitespace in Cypress support CSS if it appears. Drop CI
version matrices; reconcile required-check names. **Gate:** Happo reviewed,
`pnpm typecheck && pnpm lint && pnpm test` green.

## Triage tree for a newly failing test

1. **Jest fails at import time** (`undefined (reading …)` / `X is not a function`)
   → read the test's `jest.mock` factories; spread `requireActual` (Phase E).
2. **Cypress can't find / interact with an element** → identify the primitive
   (Select / Checkbox / Button-as-Link / Drawer) and apply the matching Cypress
   matrix row.
3. **Desktop UI mysteriously absent** → `responsive={false}` breakpoint gap; add
   the viewport.
4. **Happo diff** → vendor Tailwind package missing from `content` globs? Drawer/
   Modal sass `position` on the paper? Otherwise compare against the intended
   restyle before accepting a new baseline.
5. **Clicks "work" but nothing happens** → suspect a Phase F component-code bug,
   not the test.

---

## Appendix

### Upstream issue status (as of the v100 line)

| Item                                                                   | Status                      | Consumer impact                                                                           |
| ---------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| PF-2243 duplicate `role="dialog"`                                      | **Fixed**                   | Plain `findByRole('dialog')` works; remove `findAllByRole('dialog')[0]` workarounds.      |
| PF-2244 duplicate checkbox/switch label node                           | **Fixed**                   | Labels render once; no workaround.                                                        |
| PF-2230 Popper default role                                            | **Fixed**                   | Popper defaults to `role="tooltip"`; Select/Dropdown poppers are `presentation`.          |
| PF-2256 / PR #5040 label-activation click no-op                        | **Intentional (permanent)** | Opening a Select by clicking its `<label>` no longer works — click the control.           |
| PF-2253 focus-opened tooltip flips over its trigger and steals a click | **Open**                    | Documented `click({ force: true })` exception with an `eslint-disable` + PF-2253 comment. |
| PF-2248 body-center click lands inside an open DatePicker popup        | **Open**                    | Corner click: `cy.get('body').click(5, 5)`.                                               |
| `responsive={false}` empties `md`, dead zone 768–1023.98px             | **Open — report upstream**  | Add `cy.viewport(1280, 800)` in specs; do not work around in app code.                    |

### DOM / role cheat-sheet

| Control                        | Interactive element                                     | State                                                                         | Hidden input?                                         | `data-testid` lands on                           |
| ------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| **Checkbox**                   | `<span role="checkbox">`                                | `aria-checked` + `data-checked/-unchecked/-indeterminate`                     | yes — **sibling** `<input type=checkbox aria-hidden>` | role span                                        |
| **Switch**                     | `<span role="switch">`                                  | `aria-checked` + `data-checked/-unchecked`                                    | yes — **sibling** hidden input                        | role span if unlabeled; label wrapper if labeled |
| **Radio**                      | native `<input type="radio">` (opacity-0 overlay)       | `checked` on the input; group wrapper `role="radiogroup"`                     | n/a — the input _is_ the control                      | root wrapper span                                |
| **Button**                     | `<button>` (or the `as` element via base-ui `render`)   | `disabled` (native) **and** `aria-disabled`; `as={Link}`→`aria-disabled` only | n/a                                                   | button element                                   |
| **Select/Dropdown/Menu popup** | portal, wrapper `role="presentation"` (`menu` for Menu) | options `role="option"` in `role="listbox"`                                   | n/a                                                   | —                                                |
| **Tooltip / Popper**           | portal, `role="tooltip"` (default)                      | —                                                                             | n/a                                                   | —                                                |
| **Modal / DatePicker popup**   | portal, `role="dialog"`                                 | —                                                                             | n/a                                                   | —                                                |

Stable hooks for tests: **`[data-picasso-popper]`** marks every popper wrapper;
popups **portal to the Picasso root** (escape enclosing scopes with
`{ withinSubject: null }`).

### Sources synthesized

This guide reconciles four consumer migrations with the current Picasso source:

- staff-portal — `picasso-baseui-test-migration.md`
- top-scheduler-frontend — `docs/picasso-v55-upgrade-guide.md`
- topkit — `docs/picasso-v55-upgrade-guide.md`
- client-portal — `docs/picasso-baseui-migration-client-portal.md`

Authoritative in-repo references: the `decommission-mui-provider`,
`picasso-tailwind-base-entry`, and `page-topbar-wscreen` changesets;
[`docs/modernization/migration-to-new-picasso.md`](modernization/migration-to-new-picasso.md)
(the test-only predecessor this document supersedes);
[`AGENTS.md`](../AGENTS.md) §Styling / §"Base UI composition" for the end-state
component-authoring rules.

Where a source disagreed with the shipped code, this guide follows the code —
notably: **Radio is not base-ui**; the hidden checkbox/switch input is a
**sibling** of the role element; and `aria-disabled` on Button is **never
dropped** (only the native `disabled` is absent on anchor/`as={Link}` buttons).
