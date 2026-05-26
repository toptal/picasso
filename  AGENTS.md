This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Picasso is Toptal's reusable UI library, distributed as a set of NPM packages from a single pnpm workspace. It's a public-facing library — API stability, semver discipline, and visual regression matter more than they would in a typical product repo.

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
pnpm generate:svg-components       # regenerate icon/pictogram React components from SVG
pnpm refresh:tsconfig-references   # resync project references after pkg deps change
pnpm circularity                   # madge --circular packages/*/src
```

`pnpm test:unit` and `pnpm test:integration` both implicitly run `pnpm build:package` first — if you only changed test files you can call jest directly for speed, but anything that crosses package boundaries needs the build.

Happo (visual regression) requires `HAPPO_API_KEY` / `HAPPO_API_SECRET` — see `README.md` § "Running visual tests locally". You usually do not need to run it locally; CI handles it and reports back on the PR.

## Package layout

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
          ├── styles.ts                  # JSS styles (createStyles)
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
  - `picasso-query-builder` - query builder component for to build complex filters.
  - `picasso-pictograms` - library of pictograms.
  - `picasso-provider` — runtime context/provider; must be a **peer dependency** of consumers.
  - `picasso-tailwind`, `picasso-tailwind-merge`, `base-tailwind` — Tailwind v4 token/theme layer.
  - `shared` — published as `@toptal/picasso-shared` (utilities for Picasso components).
  - `topkit-analytics-charts` - `@topkit/analytics-charts`, analytics charts.
  - `picasso-codemod` - utility package for codemods.

Cross-package import rules (enforced by `.eslintrc.js`):

- `packages/picasso/src/**` may not import from `@toptal/picasso`, `@toptal/picasso-forms`, `@toptal/picasso-charts` (i.e. the aggregating packages — import the underlying base package directly).
- **Never** import `useLayoutEffect` from `react` — use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared` (SSR safety; the rule is enforced).

Adding a new package: update `tsconfig.json` paths, `.storybook/main.js` aliases, `.storybook/components/CodeExample/CodeExample.tsx` imports, and `Dockerfile`. Then run `pnpm refresh:tsconfig-references`.

## Component design patterns (enforced)

`PICASSO_COMPONENT_DESIGN_PATTERNS.md` is the source of truth and is **checked by a GitHub Actions workflow on every PR** — failing means the PR is blocked. Read it before adding or changing component APIs.

## Conventions

- **Commit messages**: capital letter, imperative mood ("Add" not "Added"), no trailing period, ≤79 chars. Enforced by Danger in CI.
- **`TODO` / `FIXME` / `@deprecated`** comments must include a Jira ref — either `[ABC-1234]` or the full `https://toptal-core.atlassian.net/browse/...` URL. The `todo-plz/ticket-ref` ESLint rule will warn otherwise.
- **Changesets** are required for any PR that changes behavior for consumers. Run `pnpm changeset` and commit the generated file alongside the change. The release PR ("Version Packages") is opened automatically after merge. Check docs/contribution/changeset-guidelines.md for best practices.
- **CSS naming**: See `docs/contribution/css-naming.md`.
- **Icons/pictograms**: drop SVG into `packages/base/Icons/src/Icon/svg/` (16×16 and 24×24 variants for icons) or `packages/picasso-pictograms/src/Pictograms/svg/` (64×64), strokes expanded to fills, then `pnpm generaate:icons`.
- **Design tokens** must match the BASE design system. Don't invent local synonyms.

## Reference docs in this repo

- `README.md` — top-level project commands and Happo setup.
- `CONTRIBUTING.md` + `docs/contribution/*.md` — workflow, component creation, examples, visual testing, JSS onboarding, packages architecture, PR jobs.
- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` — CI-enforced component API rules.
- `docs/decisions/` — numbered ADRs for non-obvious decisions (MUI v5 migration, picasso-provider as peer dep, breakpoints, spacings, etc.). Skim the matching ADR before changing related code.
