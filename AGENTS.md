# Picasso — agent & contributor guide

This file guides AI coding agents and contributors working in this repo. Read it top-to-bottom once; it is the single page meant to replace hunting through scattered docs.

**How to read it:** the _operate_ sections (tooling, commands, layout) tell you how to run the repo. The _author_ sections (API, types, styling, …) each state a **principle** first, then the Picasso-specific rules you could not deduce from it — when a case is not covered, reason from the principle. The **Migration in flight** section near the end is transient and gets deleted when the `@base-ui/react` migration completes; everything else describes the steady state.

## What this repo is

Picasso is Toptal's reusable UI library, distributed as a set of NPM packages from a single pnpm workspace. It's a public-facing library — API stability, semver discipline, and visual regression matter more than they would in a typical product repo. Two consequences drive everything below: the **props interface is a public contract** (breaking it costs every consumer a migration), and **appearance is guarded by visual regression** (Happo). When unsure, optimize for the consumer's stability and the next reader's clarity.

## Tooling stack

- Package manager: **pnpm 10** (Node `>=22`, see `.nvmrc`). Do not use `npm`/`yarn`.
- Workspace orchestration: `pnpm-workspace.yaml` + Lerna (`lerna run`) + Nx (caching) + `@toptal/davinci-*` tooling.
- Build: TypeScript project references — `tsconfig.pkgsrc.json` is the root build graph; each package has its own `tsconfig.json`.
- Lint/format: `davinci-syntax` (wraps ESLint + Prettier). Husky + lint-staged on commit.
- Tests: Jest (unit, via `davinci-qa`) and Cypress component tests (integration). Visual regression via Happo on top of Storybook and Cypress.
- Storybook 6 (webpack5), custom setup using PicassoBook (own Storybook layer of customization).
- Releases: changesets.

## Common commands

```bash
pnpm install                       # install workspace
pnpm build:package                 # build all packages (required before tests / storybook)
pnpm build:package:watch           # watch mode (run via `pnpm start` for storybook+watch)
pnpm start                         # build:package + storybook on http://localhost:9001
pnpm typecheck                     # tsc --noEmit at the root
pnpm lint                          # davinci-syntax lint check
pnpm lint:fix                      # autofix

pnpm test:unit                     # jest (auto-runs build:package first)
pnpm test:unit:watch               # watch
pnpm test:unit -u                  # update jest snapshots
pnpm test:unit -- <path|pattern>   # run a single file or pattern (jest CLI args after --)
pnpm test:integration              # cypress component tests (headless)
pnpm test:integration:open         # cypress in dev mode + watch build
pnpm test                          # unit + integration (CI parity, slow)

pnpm changeset                     # REQUIRED on PRs that change package code
pnpm generate:component            # scaffold a new component (davinci-code)
pnpm generate:example              # scaffold a story example
pnpm generate:icons                # regenerate icon React components from SVG
pnpm generate:pictograms           # regenerate pictogram React components from SVG
pnpm refresh:tsconfig-references   # resync project references after pkg deps change
pnpm circularity                   # madge --circular packages/*/src
```

`pnpm test:unit` and `pnpm test:integration` both implicitly run `pnpm build:package` first — if you only changed test files you can call jest directly for speed, but anything that crosses package boundaries needs the build.

Happo (visual regression) requires `HAPPO_API_KEY` / `HAPPO_API_SECRET` — see `README.md` § "Running visual tests locally". You usually do not need to run it locally; CI handles it and reports back on the PR.

## Repo & package layout

Two tiers of packages, both inside `pnpm-workspace.yaml`:

- **`packages/base/<ComponentName>/`** — one package per primitive component (e.g. `packages/base/Button`, `packages/base/Modal`, `packages/base/Icons`). Each ships under `@toptal/picasso-<componentname>`. A typical component folder looks like:

  ```
  packages/base/Button/
  ├── package.json
  ├── tsconfig.json
  └── src/
      ├── index.ts                       # package barrel — re-exports each component
      └── Button/
          ├── Button.tsx                 # component implementation
          ├── index.ts                   # re-exports Button + its types
          ├── styles.ts                  # Tailwind class-building fns (pure, return string[])
          ├── test.tsx                   # jest unit tests
          ├── __snapshots__/             # jest snapshots
          └── story/
              ├── index.jsx              # PicassoBook chapter wiring
              ├── Default.example.tsx    # one file per documented example
              ├── Sizes.example.tsx
              └── ...
  ```

  Sibling sub-components (e.g. `ButtonGroup`, `ButtonCircular`) live as peer folders under the same package's `src/`.

- **`packages/<top-level>/`** — aggregating packages consumers actually import:
  - `picasso` — the main barrel, depends on every `@toptal/picasso-*` base package. Exports all components and types, in case consumers want a single import.
  - `picasso-forms` — `react-final-form`-based form solution. Provides form components.
  - `picasso-charts` — `recharts`-based charts.
  - `picasso-rich-text-editor` - rich text editor component.
  - `picasso-query-builder` - query builder component to build complex filters.
  - `picasso-pictograms` - library of pictograms.
  - `picasso-provider` — runtime context/provider; must be a **peer dependency** of consumers.
  - `picasso-tailwind`, `picasso-tailwind-merge`, `base-tailwind` — Tailwind v4 token/theme layer.
  - `shared` — published as `@toptal/picasso-shared` (utilities for Picasso components).
  - `topkit-analytics-charts` - `@topkit/analytics-charts`, analytics charts.
  - `picasso-codemod` - utility package for codemods.

Cross-package import rule (enforced by `.eslintrc.js`): `packages/picasso/src/**` may not import from `@toptal/picasso`, `@toptal/picasso-forms`, `@toptal/picasso-charts` (the aggregating packages — import the underlying base package directly). The sibling no-self-import and SSR (`useLayoutEffect`) rules live under **Code organization** below.

Adding a new package: update `tsconfig.json` paths, `.storybook/main.js` aliases, `.storybook/components/CodeExample/CodeExample.tsx` imports, and `Dockerfile`. Then run `pnpm refresh:tsconfig-references`.

## Component API design

`PICASSO_COMPONENT_DESIGN_PATTERNS.md` is the source of truth for the component API surface and is **checked by a GitHub Actions workflow on every PR** — failing blocks the PR. The rules below are the readable summary; that file is authoritative.

**Principle: optimize for the common case, speak one vocabulary across the kit, and mirror the web platform.**

- **Sensible defaults** — the most common look needs zero or near-zero props. Pick defaults for `variant`/`size`/`color`.
- **One vocabulary** — reuse an existing prop name before inventing one; keep names short (`size`, not `sizeText`); mirror native HTML attributes verbatim (`name`, `value`, `disabled`, `checked`, `href`, `onChange`…). A handler's _callback signature_ may simplify (`onChange?: (value: string) => void`) even though its name stays native.
- **Booleans are bare adjectives** — `open`, `disabled`, `loading`, `selected` — never an `is`/`has`/`should` prefix.
- **One `variant` string-union** for visual styles (`variant?: 'rectangle' | 'circular'`) — never parallel boolean flags.
- **`children` for content**; reserve named content props for components with multiple distinct slots.
- **`as` for polymorphism**, narrowed to the tags actually supported (`as?: 'a' | 'button'`) — never `tag`/`component`/`element`, and no runtime `as` guards (TypeScript already constrains it).
- **Compound components for multi-part APIs** — attach parts to the parent (`Modal.Title`, `Modal.Content`, `Modal.Actions`); consumers compose them as children.
- **`testIds` object** (one optional prop, optional keys) for addressing multiple parts in tests — never per-part `data-testid` props at the top level.
- **Style hooks are `className` and `style` only** — never expose `classes`, `sx`, `css`, `styles`, theme overrides, or slot-level class props.

## Props & type contract

**Principle: `Props` is the public contract; the type system enforces it — so never lie to it.**

- **Extend `BaseProps`** (gives `className`, `style`, `data-testid`).
- **Form components** extend `FieldProps` (or a descendant like `InputProps`/`SelectProps`), honor the full `final-form` field set (`name`, `value`, `defaultValue`, `required`, `disabled`, `onChange`, `onBlur`, `onFocus`), and render their chrome through `PicassoField` — never reimplement label/hint/error/required layout.
- **Declare with `interface Props extends …`**, never `type Props = { … }`. Defaults come from **signature destructuring**, never a static `Component.defaultProps`.
- **Draw design values from the shared scales** — `SizeType`, `Palette`, `ColorSample`; names must match the BASE design system. No raw hex/rgb, no invented names (`tiny`, `accent`). Express sizes in `rem` (the lone exception is a `1px` hairline).
- **JSDoc every public prop** (single-line `/** … */` above it). **Never** JSDoc passthrough/injected props (`data-private`, `data-testid`, `ownerState`, primitive-injected props) — they'd surface as public API.
- **No `any`, no `as unknown as`, no bare `@ts-ignore`** in component source. If you must suppress, use `@ts-expect-error <reason>`. **Cast at the type boundary** (a helper's return type or a local typed binding), never at the JSX call site.

## Styling

**Principle: Tailwind is the only styling layer; consumer overrides must always win; let state live in the DOM.**

- **Compose with `twMerge(...)`** from `@toptal/picasso-tailwind-merge`, and put the **consumer `className` LAST** so it wins on conflicts.
- **Conditionals: `twMerge(cx({ 'm-0': expanded }))`** — `cx` (from `classnames`) expresses branching/variant classes (object syntax or `cond && 'x'`), preferred over scattering `&&`/ternaries across `twMerge` args; `twMerge` resolves Tailwind conflicts. (`twMerge` takes no object syntax — that's `cx`'s job.) Plain `twMerge('a', 'b', className)` is fine when nothing branches.
- **State-driven styling uses `data-[…]:` variants** (`data-[checked]:bg-blue-500`, `data-[disabled]:opacity-50`). Read state from the DOM; don't mirror it into `useState` just to style it.
- **Tokens over arbitrary values** — use Picasso token names (`text-graphite-800`, `shadow-2`, `p-4`). An `[arbitrary-value]` plus a `// TODO(tokens): …` comment is a last resort to raise with designers; never invent tokens.
- **No `!important`.** If a utility won't win, walk the override ladder: don't-override → `data-[…]:` / `className` → `render` prop → (last resort) inline `style`. Reaching for `!important` means you skipped a rung.
- **No CSS/JSS** — no `.css`/`.scss`/`.module.css`, no `makeStyles`/`createStyles`/`withStyles`/`&$selector`. Inline `style` is only for genuinely runtime-computed values, never static ones.
- **Whole-pixel geometry.** Positions/dimensions should resolve to whole pixels — sub-pixel values blur borders, dividers, and text. Avoid the usual culprits: `translate(-50%, …)` on odd-size elements, uneven `%` / `calc(100% / 3)`, fractional `rem`/`line-height`/`border-width`. _Exception:_ Base UI primitives self-center via `translate: -50% -50%` — accept their geometry rather than re-introducing pixel-snapping offsets to fight it (see `docs/migration/references/base-ui-styling.md §7.1` rung -1).

## Base UI composition

**Principle: Base UI ships behavior and accessibility; you ship looks. Compose, don't fork.**

- **Style each Base UI part directly** with `className` / `data-[…]:` — no `slots`/`classes`-style indirection.
- **Swap the rendered tag with `render` / `useRender`**, and pair it with **`nativeButton={false}`** on any button-default part (Button, `Menu.Trigger`, `Tabs.Tab`, `NumberField.Increment/Decrement`, `Toolbar.Button`) — omitting it silently breaks keyboard accessibility.
- **Components passed to `render` must forward `ref`.**
- **For opinionated defaults, add DOM inside a slot or wrap the Root** — don't fork the primitive.
- **Override Base UI's internal inline styles by passing `style` to the part** (its `mergeProps` is rightmost-wins) — but first check whether you can simply not override (accept the primitive's geometry).

## Code organization

**Principle: one component, one folder; co-locate everything it owns; the export surface is contractual.**

- **Folder layout:** `<Component>/` holding `index.ts`, `<Component>.tsx` (implementation + `Props`), `styles.ts` (pure functions returning `string[]`), `test.tsx`, and `story/*.example.tsx`. Co-locate sub-components and hooks (`use-{hook}.ts`) here — never a parallel `hooks/` directory.
- **Exports:** provide both named and default; `forwardRef` wraps a _named_ inner function; set `displayName`. `index.ts` re-exports default + named + `type <Component>Props`.
- **Compound APIs** attach parts via `Object.assign` in `<Component>Compound/index.ts`. When a child must talk _upward_ to the parent, use a component-level React Context + an exported hook — not prop-drilling or refs.
- **Aggregate re-export:** every public symbol must be re-exported from both the sub-package's `src/index.ts` and the aggregate `packages/picasso/src/index.ts`, in the same PR.
- **Imports:** order is ESLint-autofixed (`pnpm davinci-syntax lint code …`); always import from package barrels (`@toptal/picasso-shared`), never deep paths; a sub-package never imports from the `@toptal/picasso` aggregate.
- **SSR:** use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared` (never `useLayoutEffect` from React — ESLint-enforced); keep `window`/`document` out of module scope and render — only touch them inside effects/handlers.

## Testing

**Principle: test observable behavior, not implementation.**

- One top-level `describe('ComponentName', …)`; nest only for behavioral groupings, never 3+ deep.
- Render through a local `renderComponent` helper that wraps `render()` from `@toptal/picasso-test-utils`.
- Use user-centric queries (`getByRole`/`getByText`/`getByTestId`) with `userEvent` — no `fireEvent`, and no bare "renders without crashing" tests.
- Keep 2–3 shape snapshots per component; the rest are explicit assertions.
- Responsive components run Happo at all breakpoints (`screenshotBreakpoints: true`); fix every Violation the a11y addon reports.

## Conventions & shipping

**Principle: every consumer-visible change is versioned; CI is the contract.**

- **Commits:** capital start, imperative mood ("Add" not "Added"), no trailing period, ≤79 chars. Enforced by Danger in CI.
- **Changesets** are required for any PR that changes behavior for consumers — run `pnpm changeset`, commit the file alongside the change (the "Version Packages" release PR opens automatically after merge). Tier by **consumer-visible impact**, not effort: `patch` = bug fix / no consumer effect; `minor` = new prop, value, behavior, or component; `major` = removed/renamed/narrowed prop, flipped default, or layout break (name the break). Body in present-simple ("Fix…", not "Fixed…"). See `docs/contribution/changeset-guidelines.md`.
- **`TODO` / `FIXME` / `@deprecated`** comments must include a Jira ref — `[ABC-1234]` or the full `https://toptal-core.atlassian.net/browse/...` URL. The `todo-plz/ticket-ref` ESLint rule warns otherwise.
- **Icons/pictograms:** drop SVG into `packages/base/Icons/src/Icon/svg/` (16×16 and 24×24 variants) or `packages/picasso-pictograms/src/Pictograms/svg/` (64×64), strokes expanded to fills, then `pnpm generate:icons` / `pnpm generate:pictograms`.
- **Dependencies:** caret (`^`) for npm deps, exact for workspace deps; install with plain `pnpm install`.
- **CI is repo-wide:** touched files must pass `pnpm prettier --check` and ESLint (`pnpm lint:fix` autofixes most). A lint error _anywhere_ in the repo blocks the PR.

---

## Migration in flight (transient — delete when the `@base-ui/react` migration completes)

Temporary rules for the in-progress migration off `@mui/base` / `@material-ui/core`. Everything above is the end state and does **not** depend on this section; remove it in one cut when the migration lands.

- **Preserve existing violations.** A library-swap PR keeps the current public API _and_ its pre-existing rule violations as-is. Don't opportunistically fix unrelated naming/styling — scope creep breaks the "no consumer-visible change" contract. (`docs/migration/references/design-patterns-addendum.md §1`)
- **Migrate away from v0, never toward it.** `@mui/base`, `slotProps`, public `classes`, and `group-[.base--*]` selectors are legacy — never introduce them in new code. Pre-v1 components keep their `base--*` selectors until their own migration.
- **Sanctioned API-rule exceptions** (audit-backed; keep as-is, do not "fix"): Tier-3.b `classes` stays narrowed on **Dropdown** & **OutlinedInput** (rule 5); `StandardProps` / mixed `extends` stay until the end-state removal from `@toptal/picasso-shared` (rule 10); existing `isOpen`-style names and non-compound shapes are left untouched (rules 14/15). (`docs/migration/references/design-patterns-addendum.md §"Migration-period architectural exceptions"`; `CLAUDE.md §"classes prop handling per tier"`)
- **Adapt type mismatches at the boundary, prop-by-prop.** Destructure the _specific_ incompatible props and spread `...rest` unchanged; bridge Base UI's `eventDetails.event` to Picasso's `React.ChangeEvent` with `toReactChangeEvent` (form inputs) or `toReactEvent<R>` (generic) from `@toptal/picasso-shared`. Never narrow the public `Props` to satisfy `tsc`. (`docs/migration/references/code-standards.md §"prop-by-prop boundary"`)
- **Build before you snapshot.** Run `build:package` before `jest -u`; when you drop a workspace dep from `package.json`, also drop its `references` entry from `tsconfig.json`. Take `versionBump` verbatim from `docs/migration/manifest.json`. `@base-ui/utils` ships via a patch. JSS→Tailwind mechanics live in `docs/migration/rules/jss-to-tailwind-crib.md`.

---

## Reference docs

- `README.md` — top-level project commands and Happo setup.
- `CONTRIBUTING.md` + `docs/contribution/*.md` — workflow, component creation, examples, visual testing, packages architecture, PR jobs.
- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` — CI-enforced component API rules (the 16 + 3 patterns).
- `docs/decisions/` — numbered ADRs for non-obvious decisions (MUI v5 migration, picasso-provider as peer dep, breakpoints, spacings, etc.). Skim the matching ADR before changing related code.
- `docs/migration/references/code-standards.md` — depth on organization, types, casting, tests, changesets, CI.
- `docs/migration/references/base-ui-styling.md` + `docs/migration/rules/styling.md` — styling doctrine + the full override ladder.
- `docs/migration/references/practices.md` — graduated migration patterns.

## Imported Claude Cowork project instructions

It's github repo for Picasso UI kit. Use it to analyze codebase etc, but documents should be created in ./docs/modernization
