# Picasso — agent & contributor guide

> **Proposal for the repo-root `AGENTS.md`**, distilled from the full standards corpus (references at the bottom). It replaces "read these ten docs" with one page.
>
> **How to read it:** each section states a *principle*, then only the Picasso-specific rules you couldn't deduce from that principle. If a situation isn't covered, reason from the principle. Follow the references only when you need depth.
>
> **End-state framing:** the body assumes the `@base-ui/react` + Tailwind migration is finished. Migration-only rules live in the final section and get deleted wholesale when the migration lands — nothing above depends on them.

Picasso is a public, semver-versioned React UI kit built on `@base-ui/react` (behavior/accessibility) + Tailwind (styling). Two consequences drive everything below: the **props interface is a public contract** (breaking it costs every consumer a migration), and **appearance is guarded by visual regression** (Happo). When unsure, optimize for the consumer's stability and the next reader's clarity.

## 1. Component API design

**Principle: optimize for the common case, speak one vocabulary across the kit, and mirror the web platform.**

- **Sensible defaults** — the most common look needs zero or near-zero props. Pick defaults for `variant`/`size`/`color`.
- **One vocabulary** — reuse an existing prop name before inventing one; keep names short (`size`, not `sizeText`); mirror native HTML attributes verbatim (`name`, `value`, `disabled`, `checked`, `href`, `onChange`…). A handler's *callback signature* may simplify (`onChange?: (value: string) => void`) even though its name stays native.
- **Booleans are bare adjectives** — `open`, `disabled`, `loading`, `selected` — never an `is`/`has`/`should` prefix.
- **One `variant` string-union** for visual styles (`variant?: 'rectangle' | 'circular'`) — never parallel boolean flags.
- **`children` for content**; reserve named content props for components with multiple distinct slots.
- **`as` for polymorphism**, narrowed to the tags actually supported (`as?: 'a' | 'button'`) — never `tag`/`component`/`element`, and no runtime `as` guards (TypeScript already constrains it).
- **Compound components for multi-part APIs** — attach parts to the parent (`Modal.Title`, `Modal.Content`, `Modal.Actions`); consumers compose them as children.
- **`testIds` object** (one optional prop, optional keys) for addressing multiple parts in tests — never per-part `data-testid` props at the top level.
- **Style hooks are `className` and `style` only** — never expose `classes`, `sx`, `css`, `styles`, theme overrides, or slot-level class props.

## 2. Props & type contract

**Principle: `Props` is the public contract; the type system enforces it — so never lie to it.**

- **Extend `BaseProps`** (gives `className`, `style`, `data-testid`).
- **Form components** extend `FieldProps` (or a descendant like `InputProps`/`SelectProps`), honor the full `final-form` field set (`name`, `value`, `defaultValue`, `required`, `disabled`, `onChange`, `onBlur`, `onFocus`), and render their chrome through `PicassoField` — never reimplement label/hint/error/required layout.
- **Declare with `interface Props extends …`**, never `type Props = { … }`. Defaults come from **signature destructuring**, never a static `Component.defaultProps`.
- **Draw design values from the shared scales** — `SizeType`, `Palette`, `ColorSample`. No raw hex/rgb and no invented names (`tiny`, `accent`). Express sizes in `rem` (the lone exception is a `1px` hairline).
- **JSDoc every public prop** (single-line `/** … */` above it). **Never** JSDoc passthrough/injected props (`data-private`, `data-testid`, `ownerState`, primitive-injected props) — they'd surface as public API.
- **No `any`, no `as unknown as`, no bare `@ts-ignore`** in component source. If you must suppress, use `@ts-expect-error <reason>`. **Cast at the type boundary** (a helper's return type or a local typed binding), never at the JSX call site.

## 3. Styling

**Principle: Tailwind is the only styling layer; consumer overrides must always win; let state live in the DOM.**

- **Compose with `twMerge(...)`** from `@toptal/picasso-tailwind-merge`, and put the **consumer `className` LAST** so it wins on conflicts.
- **Conditionals: `twMerge(cx({ 'm-0': expanded }))`** — `cx` (from `classnames`) expresses branching/variant classes (object syntax or `cond && 'x'`), preferred over scattering `&&`/ternaries across `twMerge` args; `twMerge` resolves Tailwind conflicts. (`twMerge` takes no object syntax — that's `cx`'s job.) Plain `twMerge('a', 'b', className)` is fine when nothing branches.
- **State-driven styling uses `data-[…]:` variants** (`data-[checked]:bg-blue-500`, `data-[disabled]:opacity-50`). Read state from the DOM; don't mirror it into `useState` just to style it.
- **Tokens over arbitrary values** — use Picasso token names (`text-graphite-800`, `shadow-2`, `p-4`). An `[arbitrary-value]` plus a `// TODO(tokens): …` comment is a last resort to raise with designers; never invent tokens.
- **No `!important`.** If a utility won't win, walk the override ladder: don't-override → `data-[…]:` / `className` → `render` prop → (last resort) inline `style`. Reaching for `!important` means you skipped a rung.
- **No CSS/JSS** — no `.css`/`.scss`/`.module.css`, no `makeStyles`/`createStyles`/`withStyles`/`&$selector`. Inline `style` is only for genuinely runtime-computed values, never static ones.

## 4. Base UI composition

**Principle: Base UI ships behavior and accessibility; you ship looks. Compose, don't fork.**

- **Style each Base UI part directly** with `className` / `data-[…]:` — no `slots`/`classes`-style indirection.
- **Swap the rendered tag with `render` / `useRender`**, and pair it with **`nativeButton={false}`** on any button-default part (Button, `Menu.Trigger`, `Tabs.Tab`, `NumberField.Increment/Decrement`, `Toolbar.Button`) — omitting it silently breaks keyboard accessibility.
- **Components passed to `render` must forward `ref`.**
- **For opinionated defaults, add DOM inside a slot or wrap the Root** — don't fork the primitive.
- **Override Base UI's internal inline styles by passing `style` to the part** (its `mergeProps` is rightmost-wins) — but first check whether you can simply not override (accept the primitive's geometry).

## 5. Code organization

**Principle: one component, one folder; co-locate everything it owns; the export surface is contractual.**

- **Folder layout:** `<Component>/` holding `index.ts`, `<Component>.tsx` (implementation + `Props`), `styles.ts` (pure functions returning `string[]`), `test.tsx`, and `story/*.example.tsx`. Co-locate sub-components and hooks (`use-{hook}.ts`) here — never a parallel `hooks/` directory.
- **Exports:** provide both named and default; `forwardRef` wraps a *named* inner function; set `displayName`. `index.ts` re-exports default + named + `type <Component>Props`.
- **Compound APIs** attach parts via `Object.assign` in `<Component>Compound/index.ts`. When a child must talk *upward* to the parent, use a component-level React Context + an exported hook — not prop-drilling or refs.
- **Aggregate re-export:** every public symbol must be re-exported from both the sub-package's `src/index.ts` and the aggregate `packages/picasso/src/index.ts`, in the same PR.
- **Imports:** order is ESLint-autofixed (`pnpm davinci-syntax lint code …`); always import from package barrels (`@toptal/picasso-shared`), never deep paths; a sub-package never imports from the `@toptal/picasso` aggregate.
- **SSR:** use `useIsomorphicLayoutEffect` (never `useLayoutEffect`); keep `window`/`document` out of module scope and render — only touch them inside effects/handlers.

## 6. Testing

**Principle: test observable behavior, not implementation.**

- One top-level `describe('ComponentName', …)`; nest only for behavioral groupings, never 3+ deep.
- Render through a local `renderComponent` helper that wraps `render()` from `@toptal/picasso-test-utils`.
- Use user-centric queries (`getByRole`/`getByText`/`getByTestId`) with `userEvent` — no `fireEvent`, and no bare "renders without crashing" tests.
- Keep 2–3 shape snapshots per component; the rest are explicit assertions.
- Responsive components run Happo at all breakpoints (`screenshotBreakpoints: true`); fix every Violation the a11y addon reports.

## 7. Shipping

**Principle: every consumer-visible change is versioned; CI is the contract.**

- **Changeset per change, tiered by consumer-visible impact** (not effort): `patch` = bug fix / no consumer effect; `minor` = new prop, value, behavior, or component; `major` = removed/renamed/narrowed prop, flipped default, or layout break — and you must name the break. Body in present-simple ("Fix…", not "Fixed…").
- **Commits:** capital start, imperative mood, no trailing period, ≤79 chars (Danger enforces this).
- **Dependencies:** caret (`^`) for npm deps, exact for workspace deps; install with plain `pnpm install`.
- **CI is repo-wide:** touched files must pass `pnpm prettier --check` and ESLint (`pnpm lint:fix` autofixes most). A lint error *anywhere* in the repo blocks the PR.

---

## Migration in flight (transient — delete when the `@base-ui/react` migration completes)

Temporary rules for the in-progress migration off `@mui/base` / `@material-ui/core`. Everything above is the end state and does **not** depend on this section; remove it in one cut when the migration lands.

- **Preserve existing violations.** A library-swap PR keeps the current public API *and* its pre-existing rule violations as-is. Don't opportunistically fix unrelated naming/styling — scope creep breaks the "no consumer-visible change" contract. (`design-patterns-addendum.md §1`)
- **Migrate away from v0, never toward it.** `@mui/base`, `slotProps`, public `classes`, and `group-[.base--*]` selectors are legacy — never introduce them in new code. Pre-v1 components keep their `base--*` selectors until their own migration.
- **Sanctioned API-rule exceptions** (audit-backed; keep as-is, do not "fix"): Tier-3.b `classes` stays narrowed on **Dropdown** & **OutlinedInput** (rule 5); `StandardProps` / mixed `extends` stay until the end-state removal from `@toptal/picasso-shared` (rule 10); existing `isOpen`-style names and non-compound shapes are left untouched (rules 14/15). (`design-patterns-addendum.md §"Migration-period architectural exceptions"`; `CLAUDE.md §"classes prop handling per tier"`)
- **Adapt type mismatches at the boundary, prop-by-prop.** Destructure the *specific* incompatible props and spread `...rest` unchanged; bridge Base UI's `eventDetails.event` to Picasso's `React.ChangeEvent` with `toReactChangeEvent` (form inputs) or `toReactEvent<R>` (generic) from `@toptal/picasso-shared`. Never narrow the public `Props` to satisfy `tsc`. (`code-standards.md §"prop-by-prop boundary"`)
- **Build before you snapshot.** Run `build:package` before `jest -u`; when you drop a workspace dep from `package.json`, also drop its `references` entry from `tsconfig.json`. Take `versionBump` verbatim from `docs/migration/manifest.json`. `@base-ui/utils` ships via a patch. JSS→Tailwind mechanics live in `rules/jss-to-tailwind-crib.md`.

---

## Canonical references (depth)

- [`PICASSO_COMPONENT_DESIGN_PATTERNS.md`](../../PICASSO_COMPONENT_DESIGN_PATTERNS.md) — the 16 + 3 API rules, validated by CI.
- [`docs/migration/references/code-standards.md`](../migration/references/code-standards.md) — organization, types, casting, tests, changesets, CI.
- [`docs/migration/references/base-ui-styling.md`](../migration/references/base-ui-styling.md) + [`docs/migration/rules/styling.md`](../migration/rules/styling.md) — styling doctrine + the full override ladder.
- [`docs/migration/references/practices.md`](../migration/references/practices.md) — graduated migration patterns.
- [`docs/modernization/picasso-code-review-rules.md`](./picasso-code-review-rules.md) — the exhaustive review reference this page distills.
