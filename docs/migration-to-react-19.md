# Migrating your app to the React 19-ready Picasso

This guide is for apps already on Picasso v100, the base-ui and Tailwind
release. It covers Picasso `102.0.0`, which lifts the React 19 peer cap
([#5070](https://github.com/toptal/picasso/pull/5070)), in two parts: first
adopting it on the React 18 your app runs today, then moving the app to
React 19. If your app is on an older Picasso, follow
[the v100 guide](./migration-to-new-picasso-v2.md) first.

Each package's CHANGELOG lists its changes in full. This guide orders them into
the steps an app takes.

## Contents

- [The short version](#the-short-version)
- [What changes underneath](#what-changes-underneath)
- [Before you start](#before-you-start)
- [Part 1: Adopt the release on React 18](#part-1-adopt-the-release-on-react-18)
  - [Step 1. Bump every Picasso package together](#step-1-bump-every-picasso-package-together)
  - [Step 2. Update dependencies, overrides and patches](#step-2-update-dependencies-overrides-and-patches)
  - [Step 3. Install, then check the tree](#step-3-install-then-check-the-tree)
  - [Step 4. Fix the form types](#step-4-fix-the-form-types)
  - [Step 5. Handle the form runtime changes](#step-5-handle-the-form-runtime-changes)
  - [Step 6. Review the component changes](#step-6-review-the-component-changes)
  - [Step 7. Update the tests](#step-7-update-the-tests)
  - [Step 8. Verify and ship](#step-8-verify-and-ship)
- [Part 2: Move the app to React 19](#part-2-move-the-app-to-react-19)
  - [Step 9. Clear the blockers outside Picasso](#step-9-clear-the-blockers-outside-picasso)
  - [Step 10. Switch React and the test tooling](#step-10-switch-react-and-the-test-tooling)
  - [Step 11. Handle Picasso's React 19 limitations](#step-11-handle-picassos-react-19-limitations)
  - [Step 12. Fix the React 19 types](#step-12-fix-the-react-19-types)
  - [Step 13. Fix the React 19 runtime breaks](#step-13-fix-the-react-19-runtime-breaks)
  - [Step 14. Update the tests for React 19](#step-14-update-the-tests-for-react-19)
  - [Step 15. Verify](#step-15-verify)
- [Known gaps](#known-gaps)
- [References](#references)

## The short version

- **Every Picasso package allows React 19.** The `react` and `react-dom` peers
  become `^17.0.0 || ^18.0.0 || ^19.0.0`. Nothing forces you onto React 19.
- **The release still needs work on React 18.** To clear React 19's blockers,
  Picasso upgraded or replaced its own dependencies, and those changes reach you
  on React 18: picasso-forms moves to final-form 5 and react-final-form 7,
  date-fns goes to v4, tailwind-merge to v3, the transitions drop
  react-transition-group, and ShowMore, TimePicker and RichTextEditor each lose
  a third-party dependency.
- **Every Picasso package ships as `102.0.0`**, and packages that peer on
  Picasso have to move with them, in the same change.
- **Ship it in two steps.** [Part 1](#part-1-adopt-the-release-on-react-18)
  adopts the release on React 18. [Part 2](#part-2-move-the-app-to-react-19)
  moves the app to React 19, later and in its own change.
- **Users should see no change** in either part. Anything that looks or behaves
  differently from master is a regression.

Most of what breaks comes from Picasso's dependency upgrades, the forms library
above all, not from React itself. Doing those upgrades on React 18 first means
that when the React 19 change fails, React is the cause.

### Do you need to act?

| Change                                                   | On React 18                                                                     | On React 19                            | Step                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Picasso versions                                         | **Yes**: bump every package, and its dependents                                 | Yes                                    | [1](#step-1-bump-every-picasso-package-together)                                                            |
| `notistack`                                              | **Yes**: exactly `3.0.2`                                                        | No                                     | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| `@testing-library/react` with Picasso's test utils       | Maybe: a version that supports your React                                       | Yes: 16.1 or newer                     | [2](#step-2-update-dependencies-overrides-and-patches), [10](#step-10-switch-react-and-the-test-tooling)    |
| picasso-forms on react-final-form 7                      | **Yes**: types, runtime, tests                                                  | Nothing extra                          | [4](#step-4-fix-the-form-types) to [7](#step-7-update-the-tests)                                            |
| date-fns 4 in Calendar, DatePicker and `@toptal/picasso` | No: a peer warning only                                                         | No                                     | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| `react-helmet-async` 3                                   | Import `Helmet` from the provider; pin `3.0.0` if you render `<HelmetProvider>` | **Yes**: only titles merge             | [2](#step-2-update-dependencies-overrides-and-patches), [11](#step-11-handle-picassos-react-19-limitations) |
| Patches and overrides keyed on old versions              | **Yes**                                                                         | Yes                                    | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| tailwind-merge 3                                         | Review your class overrides                                                     | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| Collapse, Fade, Slide, Backdrop                          | Maybe: callback arguments, a new peer, visual diffs                             | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| ShowMore, TimePicker, RichTextEditor, DatePicker         | Maybe: tests that relied on the old DOM or behavior                             | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| Charts (recharts 2.15.4)                                 | Only if you import recharts yourself                                            | Only if you import recharts yourself   | [2](#step-2-update-dependencies-overrides-and-patches), [10](#step-10-switch-react-and-the-test-tooling)    |
| Types                                                    | No                                                                              | **Yes**: `@types/react` 19             | [11](#step-11-handle-picassos-react-19-limitations), [12](#step-12-fix-the-react-19-types)                  |
| Your other dependencies                                  | No                                                                              | **Yes**: many still cap React below 19 | [9](#step-9-clear-the-blockers-outside-picasso)                                                             |

### Versions in the release

Every Picasso package ships as `102.0.0`, re-baselined to one version the way
v100 was. Packages on the `100.x` line skip `101`, which
`@toptal/picasso-calendar`, `-date-picker` and `-switch` already shipped. Later
releases version each package on its own again.

The shared major doesn't mean every package breaks. The breaking changes come
from date-fns 4 (Calendar, DatePicker and the `@toptal/picasso` aggregate),
final-form 5 (`@toptal/picasso-forms`), tailwind-merge 3, the Fade, Slide and
Backdrop rewrite, `notistack`'s exact peer, and `@testing-library/react` as a
new peer of the test utils. A `^100` or `^101` range doesn't reach the release,
in your manifests or in the peers of packages built on Picasso
([Step 1](#step-1-bump-every-picasso-package-together)).

### Support matrix

| You run                         | Runtime              | Types                                                                               |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| React 17 with `@types/react` 17 | Declared, not tested | Unchanged                                                                           |
| React 18 with `@types/react` 18 | Supported and tested | Unchanged                                                                           |
| React 19 with `@types/react` 19 | Supported and tested | Compiles, with the gaps in [Step 11](#step-11-handle-picassos-react-19-limitations) |

Picasso runs its unit tests and its Cypress component tests on both React 18
and React 19. Cypress 14 mounts every spec with `createRoot`, so nothing
exercises React 17's legacy root any more.

## What changes underneath

| Dependency                                     | v100                | This release            | Why it moved                                               |
| ---------------------------------------------- | ------------------- | ----------------------- | ---------------------------------------------------------- |
| `final-form`, `react-final-form`               | `^4.20.9`, `^6.5.9` | `^5.0.1`, `^7.0.1`      | react-final-form 7 is the line that supports React 19      |
| `final-form-arrays`, `react-final-form-arrays` | `3.0.2`, `^3.1.4`   | `^4.0.1`, `^5.0.0`      | Same family                                                |
| `react-final-form-listeners`                   | `^1.0.3`            | `^3.0.1`                | Same family. Picasso keeps version 1's `ExternallyChanged` |
| `date-fns`                                     | `^2.30.0`           | `^4.1.0`                | The range `@base-ui/react` peers on                        |
| `date-fns-tz`                                  | `^2.0.0`            | `^3.2.0`                | The first line that admits date-fns 3 and 4                |
| `react-day-picker`                             | `^8.10.0`           | `^8.10.2`               | The first 8.x release that runs on React 19                |
| `recharts`                                     | `^2.12.3`           | `^2.15.4`               | The first release that runs on React 19                    |
| `notistack`                                    | `3.0.1`             | `3.0.2`, an exact peer  | The first release whose peer range admits React 19         |
| `react-helmet-async`                           | `2.0.3`             | `3.0.0`                 | The only release that admits React 19                      |
| `tailwind-merge`                               | `^2.2.2`            | `^3.6.0`                | Understands Tailwind v4's classes                          |
| `react-transition-group`                       | `^4.4.5`            | Removed                 | Calls `findDOMNode`, which React 19 removes                |
| `react-truncate`                               | `^2.4.0`            | Removed                 | Last published in 2018, React peer capped at 16            |
| `@emoji-mart/react`                            | `^1.1.1`            | Removed                 | Unpublished since January 2023, excludes React 19          |
| `react-input-mask`, `detect-browser`           | In TimePicker       | Removed from TimePicker | `react-input-mask` calls `findDOMNode`                     |

Most of Part 1's work comes from react-final-form 7, through picasso-forms, even
in an app that never imports a final-form package itself.

The release also adds helpers for code that has to run on both React majors:
`renderedProps` in `@toptal/picasso/test-utils`
([Step 14](#step-14-update-the-tests-for-react-19)), `getElementRef`
([Step 13](#step-13-fix-the-react-19-runtime-breaks)), `NullableRefObject`
([Step 11](#step-11-handle-picassos-react-19-limitations)) and
`isReact19OrNewer` in `@toptal/picasso/utils`, and the `IconElement` type in
`@toptal/picasso`.

## Before you start

### Ground rules

- **Ship Part 1 before you start Part 2**, and keep Part 2 in a change of its
  own.
- **Compare against master.** Users should see no change, so a visible
  difference is a regression, not a new baseline.
- **Don't delete or loosen an assertion to get a test green.** Changing one,
  such as a render count, a mock's call shape or a hook's expected arguments,
  needs the reviewer's agreement, so list each one in the PR.
- **When a failure points at Picasso, report it** instead of working around it
  in the app.

### Size the work

Run these at your app's root on master. The counts are approximate; they tell
you which steps will be large.

```bash
# Part 1
# manifests that pin Picasso
git grep -l -E '"@(toptal/(picasso|base-tailwind)|topkit/analytics-charts)' -- '*package.json' | wc -l
# imports of the final-form family that bypass picasso-forms (Step 5)
git grep -n -E "from '(react-)?final-form(-arrays|-listeners)?'" -- '*.ts' '*.tsx'
# array fields that may read meta keys outside the new default subscription (Step 5)
git grep -l -E '<FieldArray|useFieldArray\(' -- '*.ts' '*.tsx' \
  | xargs grep -l -E 'touched|submitError|submitFailed|dirty|pristine|modified|visited|active'
# picasso-forms components mocked with a direct jest.Mock cast (Step 4)
git grep -n -E '(^|[^[:alnum:]_])(FieldArray|OnChange|ExternallyChanged) as jest\.Mock' -- '*.ts' '*.tsx'
# files that render the components with new internals, your visual-test hot spots (Step 6)
git grep -l -E '<(ShowMore|Accordion|Table\.ExpandableRow|Collapse|Fade|Slide|Backdrop)([[:space:]/>]|$)' -- '*.tsx' | wc -l
# overrides and patches that name the moving packages (Step 2)
git grep -n -E 'final-form|notistack|react-helmet-async|react-truncate|recharts|@toptal/picasso' -- pnpm-workspace.yaml package.json
ls patches

# Part 2
# test files that assert React 18's second component argument (Step 14, rough)
git grep -l -E 'CalledWith\(' -- '*.test.ts' '*.test.tsx' \
  | xargs grep -l -E '^[[:space:]]*(\{\}|expect\.anything\(\)),?[[:space:]]*$|,[[:space:]]*(\{\}|expect\.anything\(\))[[:space:]]*\)' | wc -l
# test files on @testing-library/react-hooks (Step 10)
git grep -l '@testing-library/react-hooks' -- '*.ts' '*.tsx' | wc -l
# global JSX namespace, useRef without an argument, ReactText and friends (Step 12)
git grep -E '(^|[^[:alnum:]_.])JSX\.[A-Z]' -- '*.ts' '*.tsx' | wc -l
git grep -E 'useRef<[^>]*>\(\)' -- '*.ts' '*.tsx' | wc -l
git grep -E '(^|[^[:alnum:]_])React(Text|Child|Fragment)([^[:alnum:]_]|$)' -- '*.ts' '*.tsx' | wc -l
# defaultProps, which React 19 ignores on function components (Step 13)
git grep -n -E '\.defaultProps[[:space:]]*=' -- '*.ts' '*.tsx' '*.js' '*.jsx'
# APIs React 19 removed or moved (Steps 10 and 13)
git grep -n -E "react-dom/test-utils|ReactDOM\.(render|hydrate|unmountComponentAtNode)\(|findDOMNode\(|react-hot-loader" -- '*.ts' '*.tsx' '*.js' '*.jsx'
# test files with Symbol placeholders that mocks may render (Step 14)
git grep -l "Symbol('" -- '*.test.ts' '*.test.tsx' | wc -l
# helmet title templates, which apply on React 19 only through Page.Helmet (Step 11)
git grep -n 'titleTemplate' -- '*.ts' '*.tsx'
```

## Part 1: Adopt the release on React 18

### Step 1. Bump every Picasso package together

Move every Picasso package to `102.0.0` in one change: each `@toptal/picasso*`
package, `@toptal/base-tailwind`, and `@topkit/analytics-charts`, which Picasso
publishes. Check the root `package.json` too: tooling packages such as
`@toptal/base-tailwind`, `@toptal/picasso-tailwind`,
`@toptal/picasso-tailwind-merge` and `@toptal/picasso-cypress-utils` often live
there, and a search for `picasso` misses `@toptal/base-tailwind`.

**Move the packages built on Picasso in the same change.** A library that peers
on Picasso with a `^100` range or an exact version doesn't admit the release, so
pnpm installs a second, older Picasso next to the new one. Context-carrying
packages such as `@toptal/picasso-provider`, `-shared` and `-modal` then break
without an error, because lookups in the second copy find no provider. Take
their releases built against `102.0.0`, and read the changelog of each one whose
version moves: it also brings every release since your last bump.

### Step 2. Update dependencies, overrides and patches

#### Keep one copy of everything that carries context

| Package                          | Do this                                                                                                                                                                                                                                            | Why                                                                                                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notistack`                      | Move to exactly `3.0.2`                                                                                                                                                                                                                            | It's an exact peer of `@toptal/picasso` and `@toptal/picasso-shared`. `SnackbarProvider` and `useSnackbar` only find each other within one copy                               |
| `react-final-form`, `final-form` | If you depend on them directly, move to `^7` and `^5`, with `final-form-arrays@^4`, `react-final-form-arrays@^5` and `react-final-form-listeners@^3`. Remove any override that pins react-final-form 6                                             | react-final-form's context belongs to its copy. With two versions, `useForm` and `useField` inside a Picasso `<Form>` throw `"... must be used inside of a <Form> component"` |
| `react-helmet-async`             | Don't render helmets from your own copy. Import `Helmet` and `HelmetProps` from `@toptal/picasso-provider`. If the app renders its own `<HelmetProvider>` (`<Picasso disableHelmet>`, `PicassoLight`), pin `react-helmet-async` to exactly `3.0.0` | A helmet only finds the `<HelmetProvider>` of its own copy. The provider exports the copy it renders, and `FixViewport`, `Favicon` and `Page.Helmet` use it                   |
| `recharts`                       | If the app imports recharts itself, move it to `^2.15.4`                                                                                                                                                                                           | One copy, and older releases don't run on React 19                                                                                                                            |

#### Test utilities

`@toptal/picasso-test-utils`, and the `@toptal/picasso/test-utils` entry,
re-export `@testing-library/react`, which is now an optional peer:
`^12.0.0 || ^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0`. Install the version that
supports your React: 12 for React 17, 13 to 16 for React 18, and 16.1 or newer
for React 19. RTL 16 also needs `@testing-library/dom@^10` next to it, since it
peers on it instead of bundling it. An app that never imports the test utils
needs neither.

#### Fade, Slide and Backdrop

`@toptal/picasso-fade`, `-slide` and `-backdrop` now peer on
`@toptal/picasso-tailwind-merge`, as most Picasso packages already do. Install
it if your app doesn't have it yet.

#### date-fns

- **npm, yarn and pnpm warn about a peer conflict.** react-day-picker 8 still
  declares a `date-fns ^2.28.0 || ^3.0.0` peer, and Picasso's date-fns 4 is
  outside it. By default the install doesn't fail, runtime is unaffected, and
  the warning goes away when Picasso moves to react-day-picker 9.
- **Your own code can stay on date-fns 2.** Picasso's date-fns 4 installs next
  to it, and date-fns holds no shared state.
- **Declare what you import.** With `node-linker=hoisted`, a package can import
  a library it never declares and get whatever sits at the root, and a new
  date-fns copy can change which version that is. Declare `date-fns` in every
  workspace package that imports it.

#### Overrides

- Remove overrides that pin the old final-form family (see the table above).
- Move dedupe pins to the new versions of the packages built on Picasso, and
  drop scoped overrides that their new versions make redundant.

#### Patches

pnpm keys a patch by `name@version`, so every patch on a Picasso package, or on
a dependency that moved, needs a new key.

- **Re-key it, and check it still applies.** The new build can change a hunk's
  context. For example, `@toptal/picasso-tooltip` now writes `useRef(undefined)`
  where 100.2.0 wrote `useRef()`.
- **Move patches on the final-form family to the new majors,** and regenerate
  each one against the new build.
- **Delete patches for packages nothing installs any more,** such as
  `react-truncate`. pnpm 10 fails the install on an unused patch
  (`ERR_PNPM_UNUSED_PATCH`).

Check each patch against the new tarball before installing. Run it outside the
repository, so the extracted package doesn't land in the working tree:

```bash
REPO=$PWD && cd "$(mktemp -d)"
npm pack @toptal/picasso-tooltip@102.0.0 && tar -xzf toptal-picasso-tooltip-*.tgz
cd package && patch -p1 --dry-run -F0 < "$REPO/patches/@toptal__picasso-tooltip@100.2.0.patch"
```

### Step 3. Install, then check the tree

**Derive the lockfile; don't regenerate it.** Start from master's lockfile and
let `pnpm install` resolve only what changed. A regenerated lockfile also moves
hundreds of unrelated packages.

**Check the lockfile.** Each command should print what its comment says:

```bash
# Picasso packages locked at more than one version: none
grep -oE "^  '?@(toptal/(picasso|base-tailwind)|topkit/analytics-charts)[a-z-]*@[0-9][^(:']*" pnpm-lock.yaml \
  | sed -E "s/^  '?//" | sort -u | sed -E 's/@[^@]+$//' | uniq -d

# one version each of react, react-dom, react-final-form, final-form,
# notistack and react-helmet-async
grep -oE "^  '?(react|react-dom|react-final-form|final-form|notistack|react-helmet-async)@[0-9][^(:']*" pnpm-lock.yaml \
  | sed -E "s/^  '?//" | sort -u
```

A types-only package may nest its own copy without harm, since it holds no React
context. For example, `@types/final-form-set-field-data` brings final-form 4.

**Check the installed tree, not only the lockfile.** Copies can nest under a
workspace package's own `node_modules`, where a search of the root
`node_modules` never looks. This lists every nested copy of a Picasso package:

```bash
find . -path ./.git -prune -o -name package.json \
  -path '*/node_modules/@toptal/picasso*/package.json' -print \
  | grep -E '/node_modules/@toptal/[^/]+/package\.json$' \
  | grep -vE '^\./node_modules/@toptal/[^/]+/package\.json$'
```

It matches `package.json` files rather than directories, because an interrupted
install can leave a `_tmp_…` directory that looks like a package but can't be
resolved.

**Rerun `pnpm dedupe --check` before acting on a failure.** It can flip on an
unchanged lockfile: peer-context labels, the hashes inside snapshot keys, settle
differently between machines. Keep the labels master already has.

**Run CI's install command.** CI runs `pnpm install --frozen-lockfile` from a
clean `node_modules`. A pin changed without its lockfile entry fails there with
`ERR_PNPM_OUTDATED_LOCKFILE`, before any test runs.

### Step 4. Fix the form types

picasso-forms now builds on react-final-form 7 and final-form 5, whose types are
stricter. Your type check finds all of these, and most fixes are one line.

| You see                                                        | Fix                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An unknown prop on `<Form>` or on a form wrapper               | `FormProps` lost react-final-form 6's `[otherProp: string]: any`. Declare the props a wrapper reads. Delete props that only compiled through the index signature, because nothing ever read them                                                                                                                                       |
| `initialValues` is possibly `undefined`                        | It's optional in `FormRenderProps`, `useFormState()`, `form.getState()` and `FormSpy`. Default it where you destructure it: `const { initialValues = {} } = useFormState()`, or `const { initialValues: { hint } = {} } = useFormState<FormValues>()`                                                                                  |
| `submitting` or `dirtySinceLastSubmit` is possibly `undefined` | final-form 5 types the `FormState` keys as optional in `FormSpy`, a `Form` function child, `form.getState()`, `form.subscribe` callbacks and any explicit `subscription`. Default them, as in `({ submitting = false }) => …`. A `useFormState()` without a `subscription` types them as present, and `FullFormState` names that shape |
| Extra props passed through `<FieldArray>` are rejected         | `FieldArrayProps` lost its index signature. Read those values from the enclosing scope; they still reach the render component at runtime                                                                                                                                                                                               |
| `FieldArrayRenderProps<Item, HTMLElement>`                     | It takes one type parameter: `FieldArrayRenderProps<Item>`. `FieldArray` and `useFieldArray` take the item type only, and `fields.update` is typed again                                                                                                                                                                               |
| `validate?: FieldValidator<Item[]>` on a `FieldArray`          | `validate?: UseFieldArrayConfig<Item>['validate']`                                                                                                                                                                                                                                                                                     |
| A child typed as `Omit<FormRenderProps, 'handleSubmit'>`       | Type only what it reads, for example `Pick<FormSpyRenderProps, 'form' \| 'initialValues'>`                                                                                                                                                                                                                                             |
| Listener props typed `any`                                     | `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` ship real types. `OnChange` takes the field's value type, not the form's: `<OnChange<string> name='verticalId'>`                                                                                                                                                               |
| Mutator arguments                                              | They're typed as arrays, so `([recipient]: [Recipient], …)` becomes `([recipient]: Recipient[], …)`, and tests that passed `{}` pass `[]`                                                                                                                                                                                              |
| `final-form-set-field-data` is rejected by `<Form mutators>`   | `@types/final-form-set-field-data` types the mutator against final-form 4. Cast it once where you export it: `setFieldDataMutator as unknown as Mutator`                                                                                                                                                                               |
| `FieldArray as jest.Mock` doesn't compile                      | `FieldArray`, `OnChange` and `ExternallyChanged` are picasso-forms' own typed components now. Cast through `unknown`: `FieldArray as unknown as jest.Mock`. `OnBlur`, `OnFocus` and react-final-form's `FormSpy` cast as before                                                                                                        |
| An unused `@ts-expect-error`                                   | The new types made it unnecessary; delete it                                                                                                                                                                                                                                                                                           |
| A helper that receives form values                             | Accept `undefined`, which the values can be on the first render: `(templates ?? []).filter(…)`, `options?.[index]`                                                                                                                                                                                                                     |

If your type check skips Cypress specs, run their check too and compare it with
master.

### Step 5. Handle the form runtime changes

These change behavior. Some fail tests; others only show in the app.

**Fields register in an effect.** react-final-form 7 registers a field after its
first render, so that render sees no value for it, and a component that calls
`useField` renders twice on mount, with its children. Code that captures form
values on the first render, such as `useRef(options).current` kept as "the
options the form opened with", captures nothing. Read those values from
`initialValues` in a parent and pass them down instead.

**Import every form API from `@toptal/picasso-forms`.** react-final-form 7.0.1
refills a remounted field from `initialValues`
([react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095))
and renders an array field's first render with no items. A step-based form
then loses its edits when the user goes back a step. picasso-forms works around
both for its own exports: the Picasso fields, the radio and checkbox groups,
`FinalField`, `useField`, `FieldArray`, `useFieldArray`, and the `OnChange`,
`OnBlur`, `OnFocus` and `ExternallyChanged` listeners. The same APIs imported
from `react-final-form`, `react-final-form-arrays` or
`react-final-form-listeners` keep upstream's behavior. Mind the names:
react-final-form's `Form` and `Field` are `FinalForm` and `FinalField` there.
Picasso's own `Form` and `Field` are different components, so a same-name swap
still type-checks but doesn't work. Find the imports to switch:

```bash
git grep -n -E "from 'react-final-form(-arrays|-listeners)?'" -- '*.ts' '*.tsx'
```

The workaround doesn't cover a field whose `data`, `defaultValue` or
`initialValue` prop changes identity while it's mounted. Forms with
`destroyOnUnregister` behave as before.

**Array fields subscribe to less by default.** This is the change that's easiest
to miss. react-final-form-arrays 5 changed its default subscription from every
key to `length`, `value` and `error`, and Picasso's `FieldArray` and
`useFieldArray` pass that default through. An array field that reads any other
`meta` key, such as `touched` or `submitError`, gets `undefined`, and whatever
depends on that key silently stops rendering: an array-level submit error, or a
validation error shown only once the field is touched. Few tests can see it.
Subscribe to every key you read, on top of the defaults; `length` is always
added:

```ts
useFieldArray('additionalCcs', {
  subscription: { value: true, error: true, touched: true, submitError: true },
})
```

The array-field search in [Size the work](#size-the-work) lists the candidates.
Check each hit by hand, because only keys read from the array field's own `meta`
count: a prop such as `activeRepresentativeId`, or form-level state read through
`useFormState()`, is a false positive. The search can't see a field that passes
`meta` to a helper, such as `fieldArrayError(meta)`, so check those helpers too.

**Checkboxes with a custom `format`.** A checkbox without its own `value` keeps
version 6's `checked`: `Form.Checkbox`, `Form.ButtonCheckbox`, `Form.Switch`,
and checkboxes built on `FinalField` or `useField`. react-final-form 7.0.1
derives `checked` from `parse` instead, which renders a stored `'false'` as
checked, a change it made on purpose for checkboxes with a `value`
([#1074](https://github.com/final-form/react-final-form/pull/1074)). Group
checkboxes and radios follow upstream, which compares the stored value with
their own `value`, so re-check their `format` and `parse` pairs, especially for
fields that store `'true'` and `'false'`.

**Listeners keep their old behavior.** `ExternallyChanged` reports every change
made while its field isn't focused, including the first one after mount, as
version 1 did; version 3 skips that one. `OnChange` no longer fires when its
field remounts, including when the initial value is `null`. Check
`ExternallyChanged` flows by hand anyway, since tests rarely cover what they
show.

**A field without a `name` throws** a `[picasso]` error in development, instead
of `Cannot call setIn() with undefined key`. Test fixtures that wrap a field,
such as a bare `<Form.RichTextEditor />`, must forward one.

**FieldArray mutators notify the form synchronously.** Call `fields.push` and
the other mutators from handlers or effects, never during render.

**A DatePicker shows a value that arrives late.** react-final-form 7 delivers
the first value after an autofocused picker has mounted, and Picasso now shows
it instead of submitting `null`. A Cypress flow that edits an existing date may
need to wait for it ([Step 7](#step-7-update-the-tests)).

### Step 6. Review the component changes

**Collapse, Fade, Slide and Backdrop** are Tailwind transitions now, without
react-transition-group.

- Public props are unchanged. Collapse animations start about 50 ms sooner,
  unknown props such as `data-private` now reach the DOM, and `CollapseProps`
  replaces the misnamed `FadeProps` export, which stays as a deprecated alias.
- Fade and Slide call `onEnter` and `onExited` with the transitioning DOM node,
  or `null` when the child takes no ref, so their node parameter is typed
  `HTMLElement | null`. If you read `onEnter`'s first argument as `isAppearing`,
  read the second one.
- Fade no longer forces an inline `opacity: 1` while shown, so a child's own
  `opacity-*` class now applies.
- Slide hides its child with `translate-*` classes instead of an inline
  `transform`, so `transitionend` listeners see `propertyName: 'translate'`, and
  a child's own inline `transform` is kept.
- A closed Fade, Slide or Backdrop is hidden by the `invisible` class instead
  of an inline `visibility: hidden`. jsdom doesn't apply the class, so a test
  that checked `not.toBeVisible()` or `toHaveStyle('visibility: hidden')`
  asserts `toHaveClass('invisible')` instead.
- Fade's and Slide's own transition replaces a `transition-*` utility on the
  child, so they animate. A broad `transition` or `transition-all` on the child
  stays, and so does `transition-none`, which turns the animation off. On
  Slide, a `translate-*` utility on the child along the slide axis applies
  while the child is shown, and gives way to the slide's offset while it's
  hidden.
- Expect a few visual diffs on accordions and expandable content built on
  Collapse.

**ShowMore** clamps with CSS `line-clamp` instead of react-truncate. The full
text stays in the DOM, so a test that asserted truncated text now finds the
whole text, and server-rendered output contains the full text. The toggle still
appears only when the content overflows.

**TimePicker** renders the native `<input type="time">` in Safari too, which has
had it since 14.1. Safari 13 and 14.0 get a text field that accepts `HH:MM`.
The shown time now clears when the value is reset from outside to `''` or
`undefined`, such as by a form reset.

**DatePicker** closes the calendar and calls `onBlur` when the focus leaves the
picker from the calendar, so a form now marks the field touched there. A
`timezone` the browser doesn't know shows the date as it is instead of crashing.
It uses date-fns 4 internally, and the `timezone` prop behaves as before. Given
a `minDate` after its `maxDate`, it no longer crashes; it treats the interval as
swapped.

**RichTextEditor** renders emoji-mart's picker through a local component instead
of `@emoji-mart/react`, and no longer leaks a `keyup` listener on
`document.body` each time the picker opens. It loads emoji-mart and its dataset
(about 100 KB gzipped) on the first picker open instead of with every editor;
the `/eager` entry loads both up front.

**Select** reopens its options on a click right after the search input's blur
closed them. Testing Library and Cypress clicks hit the old behavior more often
than real pointer clicks did, so a test that worked around it may need
updating.

**Autocomplete** gives the input ref to an `inputComponent` that takes `ref` as
a prop on React 19, instead of dropping it.

**Dropdown** passes `{ open }` to a render-function child. The `isOpen` key
still arrives, deprecated.

**Page.Helmet** renders through the provider's `Helmet`
([Step 2](#step-2-update-dependencies-overrides-and-patches)).

**tailwind-merge 3** knows Tailwind v4's class names.

- Your `className` now wins over a component's own class for v4-only utilities
  that 2.x passed through: `min-h-auto`, `max-h-auto`, `outline-hidden` (which
  now overrides `outline-none`), two-axis `translate-*`, `border-2` against
  `border-x` and `border-y`, `shrink-<number>`, and the trailing `!` important
  syntax.
- `bg-linear-to-*` is a gradient direction and no longer conflicts with
  `bg-<color>`. The v3 spelling `bg-gradient-to-*` is no longer recognized, so
  use `bg-linear-to-*`.
- Picasso's `shadow-0` to `shadow-24` scale counts as box shadows, so a shadow
  color no longer erases it.
- Collapse, Backdrop, Select's options and Timeline's icon now merge your
  `className` last. Check places where you overrode a Picasso class and relied
  on stylesheet order.

**If you come from an older v100 patch**, the release also brings the fixes
Picasso shipped on v100 since: the Modal focus trap
([#5103](https://github.com/toptal/picasso/pull/5103),
[#5110](https://github.com/toptal/picasso/pull/5110)), `Table.ExpandableRow`'s
collapse animation and `colSpan`
([#5105](https://github.com/toptal/picasso/pull/5105)), and the native `Select`
([#5113](https://github.com/toptal/picasso/pull/5113)). Drop any app-side
workaround for those first.

**Where to look in visual tests:** screens that render `ShowMore`, `Accordion`
or `Table.ExpandableRow`, anything inside a Fade, Slide, Collapse or Backdrop,
and places where you override a Picasso class.

### Step 7. Update the tests

**Assert what rendered, not how often.** Render counts go up on mount, because
fields register in an effect:

```ts
// before
expect(SelectMock).toHaveBeenCalledTimes(2)

// after
const renderedNames = SelectMock.mock.calls.map(([props]) => props.name)

expect(Array.from(new Set(renderedNames))).toEqual(['access', 'source'])
```

**Don't line mocks up with renders.** A `mockReturnValueOnce` chain that matches
"the Nth render" no longer does. Drive the mock from state instead, for example
by flipping `loading` inside a mocked `request()`.

**Don't call handlers from a mock's render.** A mock that called `onClick()`
while rendering stopped working once fields registered in an effect. Render a
button and click it.

**Keep harness state inside the `<Form>`.** A toggle kept above `<Form>`
re-renders it with a new inline `initialValues` object, react-final-form
reinitializes the form, and the test fails in a way that looks like the bug
you're testing for. Put the toggle in a child of the form.

**Add a remount test to every step-based form.** Change values, unmount the
step, mount it again and assert that the values stayed.

**Test an array field's errors without user events** if your Jest bans
`fireEvent`. Render the real `Form`, capture `useForm()` from a child component
and call `form.submit()` inside `act`. A failed submit marks every field
touched, which is exactly the path the subscription change hides:

```tsx
import { screen } from '@testing-library/react'
import { act, render } from '@toptal/picasso/test-utils'
import type { FormApi } from '@toptal/picasso-forms'
import { arrayMutators, Form, useForm } from '@toptal/picasso-forms'

const renderComponent = () => {
  let form: FormApi | undefined
  const CaptureForm = () => {
    form = useForm()

    return null
  }

  render(
    <Form
      onSubmit={() => ({ additionalCcs: SERVER_ERROR })}
      mutators={{ ...arrayMutators }}
      initialValues={{
        additionalCcs: [{ email: 'cc@example.com', name: 'Jane Doe' }],
      }}
    >
      <CCFields />
      <CaptureForm />
    </Form>
  )

  return {
    submit: () =>
      act(() => {
        form?.submit()
      }),
  }
}

it('renders the error when the server rejects the CC list', async () => {
  const { submit } = renderComponent()

  submit()

  expect(await screen.findByTestId('cc-fields-error')).toHaveTextContent(
    SERVER_ERROR
  )
})
```

**Expect assertions on hook arguments to change.** A test that asserted
`useFieldArray` was called with the field name only now sees the subscription
from [Step 5](#step-5-handle-the-form-runtime-changes) too. That's an assertion
change, so it needs the reviewer's agreement.

**Update `Form.Checkbox` snapshots once.** Hidden checkbox inputs render
`value=""`.

**Wait for async field values in Cypress.** An inline editor that autofocuses
before its value arrives makes a test that clears and types at once append to
the late value instead of replacing it. Wait for the existing value first:

```ts
cy.getByTestId('expiry-date-editor')
  .find('input')
  .should('have.value', '2022-05-05')
```

### Step 8. Verify and ship

- [ ] `pnpm install --frozen-lockfile` from a clean `node_modules`
- [ ] the lockfile and tree checks from
      [Step 3](#step-3-install-then-check-the-tree), and your
      version-consistency check if you have one
- [ ] the type check with 0 errors, Cypress specs included, compared with master
- [ ] the full unit suite
- [ ] Cypress for every package with forms, modals, date pickers, rich text or
      charts
- [ ] a production build with no new warnings
- [ ] every visual-test diff reviewed
- [ ] by hand:
  - a multi-step form: change values, go Back and forward again; the values stay
  - conditional fields: a field that unmounts and remounts keeps its edit
  - inline editors with a date field, and a DatePicker that shows a new value
    after a click outside it
  - checkboxes stored as `'true'` and `'false'`
  - a `Select` or `Autocomplete` inside a `Modal` stays open when clicked
  - each flow that relies on `ExternallyChanged`
  - `ShowMore` on long and on short text
  - whatever each re-keyed patch is for

## Part 2: Move the app to React 19

Start once Part 1 is in production.

### Step 9. Clear the blockers outside Picasso

Picasso allows React 19, but your other dependencies may not. Check the
installed manifests, not the lockfile: pnpm records peer ranges after
`peerDependencyRules` relaxes them, so the lockfile can't show this. Save this
as `react19-peers.js`:

```js
// Lists installed packages whose react or react-dom peer range excludes React 19
const fs = require('fs')
const path = require('path')
const semver = require(require.resolve('semver', { paths: [process.cwd()] }))

const blocked = new Map()
const visited = new Set()

const check = dir => {
  const manifest = path.join(dir, 'package.json')

  if (!fs.existsSync(manifest)) return

  const {
    name,
    version,
    peerDependencies: peers = {},
  } = JSON.parse(fs.readFileSync(manifest, 'utf8'))
  const peer = ['react', 'react-dom'].find(
    dep => peers[dep] && !semver.satisfies('19.0.0', peers[dep])
  )

  if (peer) blocked.set(`${name}@${version}`, `${peer} ${peers[peer]}`)
}

const walk = dir => {
  let real

  try {
    real = fs.realpathSync(dir)
  } catch {
    return
  }
  if (visited.has(real)) return
  visited.add(real)

  for (const entry of fs.readdirSync(dir)) {
    const entryPath = path.join(dir, entry)

    if (entry === '.pnpm') {
      for (const store of fs.readdirSync(entryPath))
        walk(path.join(entryPath, store, 'node_modules'))
    } else if (entry.startsWith('@')) {
      walk(entryPath)
    } else if (!entry.startsWith('.')) {
      check(entryPath)
      walk(path.join(entryPath, 'node_modules'))
    }
  }
}

process.argv.slice(2).forEach(walk)

for (const [pkg, peer] of [...blocked].sort()) console.log(pkg, '→', peer)
console.log(`${blocked.size} installed packages exclude React 19`)
```

Run it on the root `node_modules` and every workspace package's own:

```bash
node react19-peers.js node_modules \
  $(find . -path ./node_modules -prune -o -path ./.git -prune -o -name node_modules -type d -prune -print)
```

Expect these groups:

| Group                 | Examples                                                                                                           | Fix                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Internal libraries    | Libraries built on Picasso, and shared tooling, that still declare `>=17 <19`                                      | A release that allows React 19, or ask the owners     |
| Test and dev tooling  | `@testing-library/react` 13 and 14, `@testing-library/react-hooks` 8, `react-test-renderer` 18, `react-hot-loader` | [Step 10](#step-10-switch-react-and-the-test-tooling) |
| React itself          | `react-dom` 18                                                                                                     | [Step 10](#step-10-switch-react-and-the-test-tooling) |
| Third-party libraries | See the next table                                                                                                 | Upgrade or replace                                    |

| Library                        | Admits React 19 from                          |
| ------------------------------ | --------------------------------------------- |
| `@apollo/client`               | 3.12.2                                        |
| `react-redux`                  | 9.2.0                                         |
| `html-react-parser`            | 5.2.0                                         |
| `react-resize-detector`        | 12.0.0                                        |
| `@react-google-maps/api`       | 2.20.4                                        |
| `@storybook/icons`             | 1.3.0                                         |
| `recharts`                     | 2.15.0; Picasso uses ^2.15.4                  |
| `react-leaflet`                | 5.0.0, which requires React 19                |
| `react-pdf`                    | 8.0.0                                         |
| `@material-ui/core` and family | Never; remove it                              |
| `react-truncate`               | Never; use CSS `line-clamp`, as ShowMore does |

"Admits React 19 from" is the first stable release after the last one whose
`react` or `react-dom` peer excludes 19.0.0, according to the npm registry in
October 2026.

A peer range is only half the story. Some blockers pass the check:

- **Cypress 13**'s `cypress/react` mounts through `ReactDOM.render`, which React
  19 removes. Cypress 14's mounts through `createRoot`, and Picasso runs its
  component tests on it.
- **styled-components 5** declares `react >= 16.8.0` but passes `ref: null` to
  the component it wraps ([Step 13](#step-13-fix-the-react-19-runtime-breaks)).
- **Monitoring SDKs** may turn off their React integration on React 19.
  `logrocket-react` 6.0.3, for example, warns at load that it doesn't support
  React 19. Decide on those before the switch.

### Step 10. Switch React and the test tooling

These versions work together:

| Package                          | Version |
| -------------------------------- | ------- |
| `react`, `react-dom`, `react-is` | 19.2.8  |
| `@types/react`                   | 19.2.18 |
| `@types/react-dom`               | 19.2.7  |
| `@testing-library/react`         | 16.3.3  |
| `@testing-library/dom`           | 10.4.1  |

- **`react-is` 19.** Jest's pretty-format and other libraries need it to
  recognize React 19 elements. So does recharts, in charts you render with it
  yourself: it ships `react-is` 18, which doesn't recognize a React 19
  fragment, so it drops the chart parts inside one. Picasso's charts don't
  need it: `LineChart` unwraps its fragment children itself.
- **`@testing-library/react` 16, with `@testing-library/dom` 10.** RTL 16.1 is
  the first release whose peer range admits React 19. Override nested copies
  too, such as an RTL 14 that your test tooling bundles, which would call
  `react-dom/test-utils`' `act`. Import `act` from `react` in your own tests: on
  React 19, `react-dom/test-utils` keeps only a deprecated `act`.
- **`peerDependencyRules.allowedVersions`:** move `react`, `react-dom`,
  `@types/react` and `@types/react-dom` from `'18'` to `'19'`.
- **Remove `react-hot-loader`.** It doesn't support React 19, and
  `react-refresh` already does hot reload. Drop `hot(App)`, the
  `react-hot-loader/webpack` rule and any `scheduler/tracing` alias from your
  webpack config, and both packages from your `package.json`.
- **Replace `@testing-library/react-hooks`.** It mounts through
  `ReactDOM.render`, which React 19 removed. Import `renderHook` from
  `@testing-library/react` instead; RTL has shipped it since 13.1, so the swap
  can land on React 18 first. RTL's `renderHook` has no `result.all`,
  `result.error`, `waitForNextUpdate` or `waitForValueToChange`; use `waitFor`
  and assert on `result.current`.
- **Cypress 14** for component tests
  ([Step 9](#step-9-clear-the-blockers-outside-picasso)).

### Step 11. Handle Picasso's React 19 limitations

1. **Only titles merge, and only through `Page.Helmet`.** On React 19,
   react-helmet-async 3 renders real elements for React to hoist, and
   `<HelmetProvider>` becomes a passthrough. `Page.Helmet` still merges titles:
   the innermost `title`, formatted with the innermost `titleTemplate`, or else
   the innermost `defaultTitle`, so a layout's
   `<Page.Helmet titleTemplate='%s | Toptal' />` still formats a page's
   `<Page.Helmet title='Overview' />`. The title takes only the innermost
   helmet's attributes, from its `titleAttributes` or its `<title>` child. It
   sets the result after mount, so a server render gets no `<title>` from it. A
   `<Helmet>` rendered directly doesn't take part. Otherwise duplicate `<meta>`
   tags stay, `onChangeClientState` never fires, a `<script>` child without
   `async` doesn't run, the SSR `context` stays empty, and `prioritizeSeoTags`,
   `helmetData` and `canUseDOM` do nothing. `htmlAttributes` and
   `bodyAttributes` keep working.
2. **A `<link>` whose `href` arrives late stays in the body.** React 19 decides
   whether a `<link>` can be hoisted into `<head>` when the element mounts. One
   mounted with an undefined `href` renders in place and stays there after the
   `href` arrives. Picasso's favicons now mount only once their URLs resolve;
   render your own head links only once their `href` exists.
3. **Types.**
   - Picasso's published declarations compile against `@types/react` 19 with
     `skipLibCheck: false`, and CI checks that they keep doing so. Two
     dependencies' declarations don't: `react-dropzone` uses the global `JSX`
     namespace, and `react-final-form` imports its `package.json`, which needs
     `resolveJsonModule`. Keep `skipLibCheck: true` if your app compiles them.
   - A variable typed as a bare `ReactElement` has `unknown` props on React 19,
     so it no longer satisfies `icon?: ReactElement<{ className?: string }>`.
     Type it as `IconElement` from `@toptal/picasso`, or pass the JSX inline.
   - `useRef<T>(null)` returns `RefObject<T | null>`. `NullableRefObject<T>`
     from `@toptal/picasso/utils` names that type for refs that are both read
     and passed to `ref`.

### Step 12. Fix the React 19 types

`@types/react` 19 is the largest source change, and it's mechanical:

- `RefObject<T>` → `RefObject<T | null>`, which `useRef<T>(null)` returns now
- the global `JSX` namespace is gone: `import type { JSX } from 'react'`
- `useRef<T>()` needs an argument: `useRef<T>(undefined)`
- Storybook decorators: `(Story: StoryFn) =>` → `Story =>`
- `defaultProps` on function components → default parameters
  ([Step 13](#step-13-fix-the-react-19-runtime-breaks))
- `ReactText` is removed → `number | string`

`npx types-react-codemod preset-19 ./src` automates several of these, through
its `scoped-jsx`, `useRef-required-initial`, `refobject-defaults` and
`deprecated-react-text` transforms. It asks which transforms to run. Its
`react-element-default-any-props` silences the `ReactElement` change below with
`any`, so type those props instead.

The rest:

- **`ReactElement` props default to `unknown`.** Type what you read through
  `isValidElement<{ href?: string }>(child)`, and use `IconElement` for props
  that take an icon.
- **`FC` returns `ReactNode`, which now admits a promise.** A component used as
  a render prop can't sit in a JSX child position any more. Type it as a
  function that returns `ReactElement`.
- **Callback refs** that returned the element are typed
  `(el: HTMLDivElement) => void`, because React 19 treats a returned function as
  a cleanup.
- **Profiler phases.** `onRender`'s phase union gains `'nested-update'`.
- **Props that lost their place.** `@types/react` 19 removed `placeholder` from
  the generic `HTMLAttributes`, so it no longer passes through Picasso's
  `ContainerProps`. The stricter types also catch typos: a `Tooltip` given
  `placeholder='top'`, meant as `placement`, now fails to compile.

**styled-components 5 needs the global `JSX` back.** `@types/styled-components`
5.1.26 reads `JSX.IntrinsicElements` and `JSX.LibraryManagedAttributes`. React
19's types dropped the global `JSX` namespace, and `skipLibCheck` hides the
resulting errors inside the declarations, so the damage shows up elsewhere:
every `styled.div<P>` loses its HTML attributes, and passing `children` fails at
the call site. Alias the global namespace onto `React.JSX` in a declaration
file, and move any `css`-prop augmentation into `declare module 'react'`:

```ts
import type { JSX as ReactJSX } from 'react'

declare global {
  namespace JSX {
    type ElementType = ReactJSX.ElementType
    type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<
      C,
      P
    >

    interface Element extends ReactJSX.Element {}
    interface ElementClass extends ReactJSX.ElementClass {}
    interface ElementAttributesProperty
      extends ReactJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends ReactJSX.ElementChildrenAttribute {}
    interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends ReactJSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}
```

Remove the alias once styled-components ships React 19-aware types.

### Step 13. Fix the React 19 runtime breaks

These are real bugs on React 19, not test noise.

- **`ref` reaches function components as a prop.** styled-components 5.3.5
  always passes `ref: null` to the component it wraps, and React 19 spreads that
  over the component's own ref, so a ref the component relies on ends up
  `null`. Patch styled-components to pass `ref` only when one was given.
- **No `key` inside spread props.** React 19 rejects it. Pull the key out and
  pass it directly:

  ```tsx
  const { key, ...itemProps } = item as DetailedListItem & { key?: Key }

  return <DetailedListItemComponent key={key ?? index} {...itemProps} />
  ```

- **`defaultProps` on function components are ignored.** React 19 drops them
  silently, so those props arrive `undefined`. Move the defaults into the
  parameter list.
- **A Fragment takes no props.** Don't `cloneElement` props into one. Skip
  Fragments, as Picasso's components do with an `icon`, `image` or `expandIcon`
  they style, so `icon={<>%</>}` renders as on React 18.
- **Reading `element.ref` warns.** React 19 keeps an element's ref in
  `props.ref` and warns on every `element.ref` read, while React 18 warns on
  `props.ref`. If your components read a child's ref, for example to merge it
  with their own, use `getElementRef(element)` from `@toptal/picasso/utils`,
  which reads it from where the running React keeps it.
- **No side effects during render.** A modal that closes itself while
  rendering, updating the store and the URL, can loop on React 19. Close it from
  an effect, and look for components that close, navigate or dispatch while
  rendering.
- **Report errors through the root.** React 19 no longer rethrows errors that an
  error boundary caught, so pass its error callbacks to `createRoot`, for
  example with Sentry:

  ```tsx
  import { reactErrorHandler } from '@sentry/react'

  createRoot(container, {
    onCaughtError: reactErrorHandler(),
    onUncaughtError: reactErrorHandler(),
    onRecoverableError: reactErrorHandler(),
  }).render(<App />)
  ```

### Step 14. Update the tests for React 19

**Mocked components get `undefined` as the second argument.** React 19 calls a
function component as `(props, undefined)`, not `(props, {})`, so
`toHaveBeenCalledWith(props, {})` fails, and `toHaveBeenCalledWith(props)`
fails on both majors. Compare the props alone with `renderedProps(mock)` from
`@toptal/picasso/test-utils` (also exported by `@toptal/picasso-test-utils`). It
passes on both majors, so the rewrite can land on React 18 first:

```ts
// before
expect(ChildMock).toHaveBeenCalledWith(expect.objectContaining({ id }), {})

// after, on React 18 and 19
expect(renderedProps(ChildMock)).toContainEqual(expect.objectContaining({ id }))
```

For `toHaveBeenNthCalledWith(n, props, {})`, compare
`renderedProps(ChildMock)[n - 1]`. Replacing each `{}` with `undefined` passes
on React 19 only. Mocks of plain functions that receive a real second argument
keep it.

**Error boundaries log once, and don't rethrow.** React 18 logged a caught error
three times; React 19 logs one `console.error` with the error, the component
stack and a recovery note. Update helpers that count those calls. A Cypress test
reads the error from `console.error` instead of `uncaught:exception`.

**New console messages** to fix or allow-list, in every Jest setup you have:

- `Symbols are not valid as a React child`: test files that pass `Symbol('…')`
  placeholders as props their mocks render. React 18 dropped them silently.
- warnings from libraries that don't support React 19
  ([Step 9](#step-9-clear-the-blockers-outside-picasso)).

**Snapshots.** On React 19.2, `useId` output changes format (`:r1:` becomes
`_r_1_`). Inputs lose the empty `value=""` that Part 1 added to checkboxes, and
styled-components class hashes change where the component file changed.

**`act` holds updates until it exits.** Don't `await waitForNextUpdate()` inside
`act`, don't run `findBy…` inside it, and wrap a render in `act` when the
component resolves lazily after its first render.

**Render counts under Suspense depend on scheduling.** A modal test that
rendered once on React 18 can render three times on React 19. Assert that the
component rendered, then check its props. That's an assertion change, so it
needs the reviewer's agreement.

**Cypress.**

- Target the open dialog. A modal on its exit transition can still be in the DOM
  when the next one opens, so click the close button of
  `div[role="dialog"][data-open]`.
- Wait for state between pointer steps, for example for `aria-pressed="true"` on
  a drag handle before its second move.

### Step 15. Verify

Repeat the [Part 1 checklist](#step-8-verify-and-ship) on React 19, and add:

- [ ] the peer check from [Step 9](#step-9-clear-the-blockers-outside-picasso)
      lists nothing you haven't decided on
- [ ] one version each of `react` and `react-dom`, both 19, in the lockfile and
      in `node_modules`, and `react-is` 19 wherever it's installed
- [ ] no new console messages left unexplained in the Jest output
- [ ] the browser console on the main flows shows no new React warnings
- [ ] page titles are complete, and favicons and other head tags sit in `<head>`
      ([Step 11](#step-11-handle-picassos-react-19-limitations))
- [ ] errors that error boundaries catch still reach your error reporting
      ([Step 13](#step-13-fix-the-react-19-runtime-breaks))

## Known gaps

- The forms remount workaround
  ([Step 5](#step-5-handle-the-form-runtime-changes)) stays until
  react-final-form fixes
  [#1095](https://github.com/final-form/react-final-form/issues/1095) upstream.
- The date-fns peer conflict
  ([Step 2](#step-2-update-dependencies-overrides-and-patches)) lasts until
  Picasso moves to react-day-picker 9.
- react-querybuilder 8 ([#5102](https://github.com/toptal/picasso/pull/5102))
  isn't part of this release.

## References

- [#5070](https://github.com/toptal/picasso/pull/5070): the release
- [#5100](https://github.com/toptal/picasso/pull/5100): the peer range and the
  React 19 test setup
- [#5111](https://github.com/toptal/picasso/pull/5111) and
  [#5115](https://github.com/toptal/picasso/pull/5115): the forms remount fixes
- [#5117](https://github.com/toptal/picasso/pull/5117): emoji-mart lazy loading
- [#5120](https://github.com/toptal/picasso/pull/5120) and
  [#5129](https://github.com/toptal/picasso/pull/5129): review fixes, including
  checkbox `checked`, Fade and Slide, and `Page.Helmet`
- The previous migration:
  [migration-to-new-picasso-v2.md](./migration-to-new-picasso-v2.md)
