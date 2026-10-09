# Migrating your app to the React 19-ready Picasso

This guide is for apps already on Picasso v100, the base-ui and Tailwind
release. It covers the next release, which lifts Picasso's React 19 peer cap
([PF-2262](https://toptal-core.atlassian.net/browse/PF-2262),
[toptal/picasso#5070](https://github.com/toptal/picasso/pull/5070)), in two
parts: first adopting it on the React 18 your app runs today, then moving the
app to React 19. If your app is on an older Picasso, follow
[the v100 guide](./migration-to-new-picasso-v2.md) first.

It merges what two apps learned on the pre-release, checked against the release
changesets in [`.changeset/`](../.changeset) and the
[review of #5070](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/6455296029/PF-2262+-+React+19+PR+5070+Review+Findings+and+Action+Items):

| App           | On React 18                                                  | On React 19                                                 | Its own notes                                   |
| ------------- | ------------------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------- |
| Staff Portal  | [#16703](https://github.com/toptal/staff-portal/pull/16703)  | [#16704](https://github.com/toptal/staff-portal/pull/16704) | `docs/migrations/picasso-react-19-migration.md` |
| Client Portal | [#11519](https://github.com/toptal/client-portal/pull/11519) | not started                                                 | `docs/picasso-react-19-migration.md`            |

All three PRs are test vehicles: they pin alpha packages and never merge. Each
learning appears here once, stated so it applies to any app, with the app it
came from as the example.

> **Status, 1 October 2026: pre-release.** Validated on the Picasso alpha
> `…-alpha-pf-react-19-improvements-970580a42.0`, built from
> [#5120](https://github.com/toptal/picasso/pull/5120) on top of #5070, and the
> topkit alpha `…-alpha-pf-picasso-react-19-e3143ab0`, built from
> [toptal/topkit#1274](https://github.com/toptal/topkit/pull/1274). Version
> numbers change at release; the steps don't.

## Contents

- [The short version](#the-short-version)
- [What changes underneath](#what-changes-underneath)
- [Before you start](#before-you-start)
- [Part 1: Adopt the release on React 18](#part-1-adopt-the-release-on-react-18)
  - [Step 1. Bump Picasso and topkit together](#step-1-bump-picasso-and-topkit-together)
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
- [Appendix](#appendix)

## The short version

- **Every Picasso package allows React 19.** The `react` and `react-dom` peers
  become `^17.0.0 || ^18.0.0 || ^19.0.0`. Nothing forces you onto React 19.
- **The release still needs work on React 18.** To clear React 19's blockers,
  Picasso upgraded or replaced its own dependencies, and those changes reach you
  on React 18: picasso-forms moves to final-form 5 and react-final-form 7,
  date-fns goes to v4, tailwind-merge to v3, the transitions drop
  react-transition-group, and ShowMore, TimePicker and RichTextEditor each lose
  a third-party dependency.
- **Most Picasso packages take a new major**, and topkit has to move with them,
  in the same change.
- **Ship it in two steps.** [Part 1](#part-1-adopt-the-release-on-react-18)
  adopts the release on React 18. [Part 2](#part-2-move-the-app-to-react-19)
  moves the app to React 19, later and in its own change.
- **Users should see no change** in either part. Anything that looks or behaves
  differently from master is a regression.

Almost everything that broke in the two apps came from Picasso's dependency
upgrades, the forms library above all, and from topkit. React itself caused none
of it. Doing those upgrades on React 18 first means that when the React 19
change fails, React is the cause.

### Do you need to act?

| Change                                                   | On React 18                                         | On React 19                            | Step                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Picasso and topkit versions                              | **Yes**: bump them together                         | Yes                                    | [1](#step-1-bump-picasso-and-topkit-together)                                                               |
| `notistack`                                              | **Yes**: exactly `3.0.2`                            | No                                     | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| picasso-forms on react-final-form 7                      | **Yes**: types, runtime, tests                      | Nothing extra                          | [4](#step-4-fix-the-form-types) to [7](#step-7-update-the-tests)                                            |
| date-fns 4 in Calendar, DatePicker and `@toptal/picasso` | npm and yarn: an override. pnpm: nothing            | No                                     | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| `react-helmet-async` 3                                   | Import `Helmet` from the provider if you render one | **Yes**: only titles merge             | [2](#step-2-update-dependencies-overrides-and-patches), [11](#step-11-handle-picassos-react-19-limitations) |
| Patches and overrides keyed on old versions              | **Yes**                                             | Yes                                    | [2](#step-2-update-dependencies-overrides-and-patches)                                                      |
| tailwind-merge 3                                         | Review your class overrides                         | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| Collapse, Fade, Slide, Backdrop                          | Maybe: callback arguments, visual diffs             | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| ShowMore, TimePicker, RichTextEditor                     | Maybe: tests that relied on the old DOM             | No                                     | [6](#step-6-review-the-component-changes)                                                                   |
| Charts (recharts 2.15.4)                                 | Only if you import recharts yourself                | Only if you import recharts yourself   | [2](#step-2-update-dependencies-overrides-and-patches), [10](#step-10-switch-react-and-the-test-tooling)    |
| Types                                                    | No                                                  | **Yes**: `@types/react` 19             | [11](#step-11-handle-picassos-react-19-limitations), [12](#step-12-fix-the-react-19-types)                  |
| Your other dependencies                                  | No                                                  | **Yes**: many still cap React below 19 | [9](#step-9-clear-the-blockers-outside-picasso)                                                             |

### Versions in the release

Every Picasso package ships as `102.0.0`, re-baselined to one version the way
v100 was. Packages on the `100.x` line skip `101`, which
`@toptal/picasso-calendar`, `-date-picker` and `-switch` already shipped.

The shared major doesn't mean every package breaks. At the time of writing, the
release plan without the re-baseline (`pnpm changeset status` on the feature
branch) moves 90 packages:

- **66 take a major of their own.** The majors come from date-fns 4 (Calendar,
  DatePicker and the `@toptal/picasso` aggregate), final-form 5
  (`@toptal/picasso-forms`) and tailwind-merge 3.
  `@toptal/picasso-tailwind-merge` is a peer of nearly every component package,
  so its major moves them too.
- **22 carry only minor changes**, among them `@toptal/picasso-provider`,
  `-shared`, `-utils`, `-test-utils`, `-charts` and `@topkit/analytics-charts`.
- **2 carry only a patch**: `@toptal/picasso-tailwind` and
  `@toptal/base-tailwind`, whose type declarations no longer name a Tailwind 3
  type.
- `@toptal/picasso-cypress-utils` has no changes of its own.

A `^100` range doesn't reach the release, in your manifests or in topkit's peers
([Step 1](#step-1-bump-picasso-and-topkit-together)).

### Support matrix

| You run                         | Runtime              | Types                                                                               |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| React 17 with `@types/react` 17 | Declared, not tested | Unchanged                                                                           |
| React 18 with `@types/react` 18 | Supported and tested | Unchanged                                                                           |
| React 19 with `@types/react` 19 | Supported and tested | Compiles, with the gaps in [Step 11](#step-11-handle-picassos-react-19-limitations) |

Picasso runs its whole unit suite on both majors (`pnpm test:react19`, enforced
by the `react19-validate` CI job) and its Cypress component specs on Cypress 14
with React 19 aliased in. At the head of #5120: React 18, 323 suites and 1,657
tests; React 19, 324 suites and 1,660 tests; the same 274 snapshots on both.
Cypress 14 mounts every spec with `createRoot`, so nothing exercises React 17's
legacy root any more.

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
in an app that never imports it. Staff Portal's code imports no final-form
package, and the forms upgrade still accounts for most of the 84 source and test
files it changed.

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
- **When a failure points at Picasso or topkit, report it** instead of working
  around it in the app. The two apps' runs surfaced several Picasso regressions
  during the pre-release, among them remounted fields that lost their edits,
  DatePicker values that arrived late, and `ExternallyChanged` skipping its
  first change. All of them were fixed in Picasso before the release.

### Size the work

Run these at your app's root on master. The counts are approximate; they tell
you which steps will be large.

```bash
# Part 1
# manifests that pin Picasso or topkit
git grep -l -E '"@(toptal/(picasso|base-tailwind)|topkit/)' -- '*package.json' | wc -l
# imports of the final-form family that bypass picasso-forms (Step 5)
git grep -n -E "from '(react-)?final-form(-arrays|-listeners)?'" -- '*.ts' '*.tsx'
# array fields that may read meta keys outside the new default subscription (Step 5)
git grep -l -E '<FieldArray|useFieldArray\(' -- '*.ts' '*.tsx' \
  | xargs grep -l -E 'touched|submitError|submitFailed|dirty|pristine|modified|visited|active'
# picasso-forms components mocked with a direct jest.Mock cast (Step 4)
git grep -n -E '(^|[^[:alnum:]_])(FormSpy|FieldArray|OnChange) as jest\.Mock' -- '*.ts' '*.tsx'
# files that render the components with new internals, your Happo hot spots (Step 6)
git grep -l -E '<(ShowMore|Accordion|Table\.ExpandableRow|Collapse|Fade|Slide|Backdrop)([[:space:]/>]|$)' -- '*.tsx' | wc -l
# overrides and patches that name the moving packages (Step 2)
git grep -n -E 'final-form|notistack|react-helmet-async|react-truncate|recharts|@toptal/picasso|@topkit/' -- pnpm-workspace.yaml package.json
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

For scale, on Staff Portal's master the Part 2 searches find about 1,289 test
files with React 18's call shape, 377 on `@testing-library/react-hooks` and 51
global `JSX` references. On Client Portal they find 117, none and 15.

## Part 1: Adopt the release on React 18

### Step 1. Bump Picasso and topkit together

Move every Picasso package to the release in one change: each `@toptal/picasso*`
package, `@toptal/base-tailwind`, and `@topkit/analytics-charts`, which Picasso
publishes. Check the root `package.json` too. Staff Portal pins
`@toptal/base-tailwind`, `@toptal/picasso-tailwind`,
`@toptal/picasso-tailwind-merge` and `@toptal/picasso-cypress-utils` there, and
a search for `picasso` misses `@toptal/base-tailwind`. Staff Portal's bump
touched 258 manifests and Client Portal's 89.

**Move topkit in the same change.** topkit packages peer on Picasso, some with
`^100` ranges (`@topkit/ui` on `"@toptal/picasso": "^100.0.4"`) and
`@topkit/modals-service` with exact versions. Neither admits the release, so
pnpm installs a second, older Picasso next to the new one. Context-carrying
packages such as `@toptal/picasso-provider`, `-shared` and `-modal` then break
without an error, because lookups in the second copy find no provider. Take the
topkit release built against the new Picasso.

**Read the changelog of every topkit package whose version moves.** A topkit
line built against the new Picasso also brings every topkit release since your
last bump. For Client Portal that was `@topkit/top-chat-app` 11 (a major that
keeps the legacy API by default), `@topkit/config` 3.3 (drops
`topSchedulerEndpoint`) and precompiled CSS in `@topkit/ui` and `top-chat-app`.
Staff Portal took nine majors at once:

| Package                       | Staff Portal's master | New    |
| ----------------------------- | --------------------- | ------ |
| `@topkit/apollo-client`       | 0.36.0                | 1.0.x  |
| `@topkit/chat-ui`             | ^2.1.0                | 5.1.x  |
| `@topkit/cypress-utils`       | ^5.2.0                | 7.2.x  |
| `@topkit/data-layer-service`  | ^7.3.0                | 11.1.x |
| `@topkit/monitoring-service`  | 1.3.0                 | 2.1.x  |
| `@topkit/react-router`        | ^1.1.0                | 2.1.x  |
| `@topkit/router`              | ^1.1.0                | 2.1.x  |
| `@topkit/talent-verticals-ui` | ^2.12.0               | 4.2.x  |
| `@topkit/test-utils`          | ^3.0.3                | 4.1.x  |

Of those, only `@topkit/chat-ui` 5 needed code changes
([Step 7](#step-7-update-the-tests)).

#### During the pre-release only

Remove all of these once Picasso releases; stable versions have none of these
traps.

- **Pin every Picasso package in one place.** Alpha versions compare their
  branch name and commit sha as strings, so a caret range on one alpha can
  resolve to another alpha line (`pf-2444-…` sorts above `pf-2262-…`) and nest a
  second Picasso. pnpm's `auto-install-peers` can also install a second tree to
  satisfy a `^…-<sha>.0` peer that nothing else provides; early heads of Staff
  Portal's #16703 had about 35 packages installed twice. Pin all 91 published
  Picasso packages to the alpha:
  - with pnpm, in the `overrides` block of `pnpm-workspace.yaml`, as Staff
    Portal does;
  - if your root `package.json` has `resolutions`, pnpm 10.32.1 ignores the
    `pnpm-workspace.yaml` block, so put the pins in `resolutions`, as Client
    Portal does.
- **Strip build metadata from copied versions.** The topkit "alpha packages are
  ready" comment prints versions such as `3.1.6-alpha-…-b333de57.12+b333de57`.
  npm stores them without the `+<sha>` part. Staff Portal rewrote its pins with
  a script driven by the two bot comments instead of `pnpm add`.
- **Pin topkit siblings if the alpha doesn't.** Earlier topkit alphas pinned
  their sibling topkit packages to stable versions. pnpm then installed both
  copies, and two `@topkit/router` copies split `RouteContext`: 31 Staff Portal
  tests failed on a "Link is used without the hostRoute function" warning.
  Scoped overrides such as `'@topkit/react-router>@topkit/router': <alpha>` fix
  it; `packageExtensions` can't replace an existing pin. The `e3143ab0` alpha
  pins its siblings and Picasso exactly, so it doesn't need them.
- **Check that the topkit alpha isn't behind your master.** An alpha is cut from
  topkit at one point in time, so if your master adopted a newer topkit release
  since, the alpha takes it back. Client Portal hit this with
  `@topkit/billing-payments`: master had moved to 2.0.0 (stripe-js 7) while the
  alpha still built 1.5.x (stripe-js 3). The `X.Y.Z` in `X.Y.Z-alpha-…` is
  normally the patch after the release the alpha was cut from. If your manifests
  declare that version or a higher one, the alpha is behind; ask for a new one.
- **After a rebase, look for stable pins again.** Master keeps adding packages
  with stable Picasso pins. This should print nothing:

  ```bash
  git grep -n -E '"@(toptal/(picasso|base-tailwind)|topkit/)[^"]*": "[^"]*"' -- '*package.json' | grep -v -- '-alpha-'
  ```

### Step 2. Update dependencies, overrides and patches

#### Keep one copy of everything that carries context

| Package                          | Do this                                                                                                                                                                                                                                            | Why                                                                                                                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notistack`                      | Move to exactly `3.0.2`                                                                                                                                                                                                                            | It's an exact peer of `@toptal/picasso` and `@toptal/picasso-shared`. `SnackbarProvider` and `useSnackbar` only find each other within one copy                               |
| `react-final-form`, `final-form` | If you depend on them directly, move to `^7` and `^5`, with `final-form-arrays@^4`, `react-final-form-arrays@^5` and `react-final-form-listeners@^3`. Remove any override that pins react-final-form 6; Staff Portal had `react-final-form: 6.5.3` | react-final-form's context belongs to its copy. With two versions, `useForm` and `useField` inside a Picasso `<Form>` throw `"... must be used inside of a <Form> component"` |
| `react-helmet-async`             | Don't render helmets from your own copy. Import `Helmet` and `HelmetProps` from `@toptal/picasso-provider`                                                                                                                                         | A helmet only finds the `<HelmetProvider>` of its own copy, and the provider exports the copy it renders                                                                      |
| `recharts`                       | If the app imports recharts itself, move it to `^2.15.4`, as Staff Portal's `libs/charts` did                                                                                                                                                      | One copy, and older releases don't run on React 19                                                                                                                            |

#### date-fns

- **npm 7+ and yarn stop with `ERESOLVE`.** react-day-picker 8 still declares a
  `date-fns ^2 || ^3` peer. Add an override for `react-day-picker > date-fns`,
  or install with `--legacy-peer-deps`. pnpm only warns. Runtime is unaffected,
  and the conflict goes away with the react-day-picker 9 migration
  ([PF-2297](https://toptal-core.atlassian.net/browse/PF-2297)).
- **Your own code can stay on date-fns 2.** Picasso's date-fns 4 installs next
  to it, and date-fns holds no shared state. Client Portal does this, and Staff
  Portal's tree now holds 4.4.0 next to 2.30.0 and 1.30.1.
- **Declare what you import.** With `node-linker=hoisted`, a package can import
  a library it never declares and get whatever sits at the root, and a new
  date-fns copy can change which version that is. Staff Portal's
  `engagements-candidate-sending` imported date-fns without declaring it, and
  now declares `"date-fns": "^2.29.2"`.

#### Overrides

- Remove overrides that pin the old final-form family (see the table above).
- Move dedupe pins to the new topkit majors, and drop scoped overrides that the
  new line makes redundant. Staff Portal moved `@topkit/chat-ui` from 2.2.0 to
  the 5.x line and `@topkit/test-utils` from 3.0.5 to 4.x, and dropped
  `'@topkit/top-chat-app>@topkit/chat-ui': 5.1.0`, which would only have added a
  second chat-ui copy.

#### Patches

pnpm keys a patch by `name@version`, so every patch on a Picasso package, or on
a dependency that moved, needs a new key.

- **Re-key it, and check it still applies.** Staff Portal's
  `@toptal/picasso-page` and `@toptal/picasso-provider` patches applied
  unchanged. Its `@toptal/picasso-tooltip` patch (the PF-2573 touch fix) had to
  be regenerated: the new build writes `useRef(undefined)` where 100.2.0 wrote
  `useRef()`, which breaks one hunk's context.
- **Move patches on the final-form family to the new majors.** Client Portal's
  iOS 17.0 final-form patch moved to `final-form@5.0.1`, whose ES build still
  imports Babel's `extends` helper.
- **Delete patches for packages nothing installs any more.** pnpm 10 fails the
  install on an unused patch (`ERR_PNPM_UNUSED_PATCH`). Staff Portal deleted its
  `react-truncate@2.4.0` patch.

Check each patch against the new tarball before installing. Run it outside the
repository, so the extracted package doesn't land in the working tree:

```bash
REPO=$PWD && cd "$(mktemp -d)"
npm pack @toptal/picasso-tooltip@<version> && tar -xzf toptal-picasso-tooltip-*.tgz
cd package && patch -p1 --dry-run -F0 < "$REPO/patches/@toptal__picasso-tooltip@100.2.0.patch"
```

### Step 3. Install, then check the tree

**Derive the lockfile; don't regenerate it.** Start from master's lockfile and
let `pnpm install` resolve only what changed. A regenerated lockfile also moves
hundreds of unrelated packages.

**Give each repository its own pnpm metadata cache** when several repositories
install the same pre-release. The cache (`~/Library/Caches/pnpm/metadata-*` on
macOS) is shared by every repository on the machine, and pnpm can write a
manifest into it with the installing repository's overrides already applied.
Staff Portal's `react: 18.2.0` override leaked into Client Portal's lockfile
that way twice, and added a second `react-dom`:

```bash
export npm_config_cache_dir="${TMPDIR:-/tmp}/pnpm-cache-$(basename "$PWD")"
pnpm install --no-frozen-lockfile
```

If the React check below fails anyway, clear `~/Library/Caches/pnpm/metadata-*`
and derive the lockfile again.

**Check the lockfile.** Each command should print what its comment says:

```bash
# Picasso or topkit packages locked at more than one version: none, apart from
# the @topkit/apollo-client that @toptal/top-scheduler brings
grep -oE "^  '?@(toptal/(picasso|base-tailwind)|topkit/)[a-z-]*@[0-9][^(:']*" pnpm-lock.yaml \
  | sed -E "s/^  '?//" | sort -u | sed -E 's/@[^@]+$//' | uniq -d

# one version each of react, react-dom, react-final-form, final-form,
# notistack and react-helmet-async
grep -oE "^  '?(react|react-dom|react-final-form|final-form|notistack|react-helmet-async)@[0-9][^(:']*" pnpm-lock.yaml \
  | sed -E "s/^  '?//" | sort -u

# pre-release only: one Picasso alpha line and one topkit alpha line
grep -oE "@toptal/picasso[a-z-]*@[^'(:]+-alpha-[^'(:]+" pnpm-lock.yaml | sed -E 's/.*-alpha-//' | sort -u
grep -oE "^  '?@topkit/[a-z-]+@[^(:']+-alpha-[^(:']+" pnpm-lock.yaml | grep -v analytics-charts \
  | grep -oE 'alpha-[a-z0-9-]+\.' | sort -u
```

Two exceptions are expected, and neither holds React context:

- `@toptal/top-scheduler` keeps its own `@topkit/apollo-client`. In Staff Portal
  that's 0.32, already on master. In Client Portal it's stable 1.0.3, because
  `@toptal/top-scheduler@5.0.2` asks for `^1.0.3`, which a prerelease can't
  satisfy.
- A types-only package may nest its own copy. Client Portal has final-form 4
  under `@types/final-form-set-field-data`.

**Check the installed tree, not only the lockfile.** Copies can nest under a
workspace package, such as `libs/navigation-service/node_modules/@topkit/router`
in Staff Portal, where a search of the root `node_modules` never looks. This
lists every nested copy of a Picasso or topkit package:

```bash
find . -path ./.git -prune -o -name package.json \
  \( -path '*/node_modules/@toptal/picasso*/package.json' -o -path '*/node_modules/@topkit/*/package.json' \) -print \
  | grep -E '/node_modules/@(toptal|topkit)/[^/]+/package\.json$' \
  | grep -vE '^\./node_modules/@(toptal|topkit)/[^/]+/package\.json$'
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
stricter. Your type check finds all of these, and most fixes are one line. Staff
Portal changed 54 files for them.

| You see                                                                        | Fix                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An unknown prop on `<Form>` or on a form wrapper                               | `FormProps` lost react-final-form 6's `[otherProp: string]: any`. Declare the props a wrapper reads, as Staff Portal's billing `InlineForm` now does for `revealText` and `editButtonVariant`. Delete props that only compiled through the index signature, because nothing ever read them: Staff Portal removed `onClose`, `open`, `size`, `loading`, `submitText` and `operationVariables` from `Modal.Form` in six files, and Client Portal a lowercase `autocomplete='off'` |
| `initialValues` is possibly `undefined`                                        | It's optional in `FormRenderProps`, `useFormState()`, `form.getState()` and `FormSpy`. Default it where you destructure it: `const { initialValues = {} } = useFormState()`, or `const { initialValues: { hint } = {} } = useFormState<FormValues>()`                                                                                                                                                                                                                           |
| `submitting`, `dirtySinceLastSubmit` or `meta.touched` is possibly `undefined` | The `FormState` and `FieldMetaState` booleans are optional in `FormSpy`, a `Form` function child, `form.getState()`, `form.subscribe` callbacks and any explicit `subscription`. Default them, as in `({ submitting = false }) => …`, or write `Boolean(meta.touched)`. A `useFormState()` without a `subscription` types them as present, and `FullFormState` names that shape                                                                                                 |
| Extra props passed through `<FieldArray>` are rejected                         | `FieldArrayProps` lost its index signature. Read those values from the enclosing scope; they still reach the render component at runtime                                                                                                                                                                                                                                                                                                                                        |
| `FieldArrayRenderProps<Item, HTMLElement>`                                     | It takes one type parameter: `FieldArrayRenderProps<Item>`. `FieldArray` and `useFieldArray` take the item type only, and `fields.update` is typed again                                                                                                                                                                                                                                                                                                                        |
| `validate?: FieldValidator<Item[]>` on a `FieldArray`                          | `validate?: UseFieldArrayConfig<Item>['validate']`                                                                                                                                                                                                                                                                                                                                                                                                                              |
| A child typed as `Omit<FormRenderProps, 'handleSubmit'>`                       | Type only what it reads, for example `Pick<FormSpyRenderProps, 'form' \| 'initialValues'>`                                                                                                                                                                                                                                                                                                                                                                                      |
| Listener props typed `any`                                                     | `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` ship real types. `OnChange` takes the field's value type, not the form's: `<OnChange<string> name='verticalId'>`                                                                                                                                                                                                                                                                                                        |
| Mutator arguments                                                              | They're typed as arrays, so `([recipient]: [Recipient], …)` becomes `([recipient]: Recipient[], …)`, and tests that passed `{}` pass `[]`                                                                                                                                                                                                                                                                                                                                       |
| `final-form-set-field-data` is rejected by `<Form mutators>`                   | `@types/final-form-set-field-data` types the mutator against final-form 4. Cast it once where you export it: `setFieldDataMutator as unknown as Mutator`, as Client Portal's `libs/forms` and `@topkit/forms` do                                                                                                                                                                                                                                                                |
| `FormSpy as jest.Mock` doesn't compile                                         | `FormSpy`, `FieldArray` and `OnChange` are picasso-forms' own typed components now. Cast through `unknown`: `FormSpy as unknown as jest.Mock`                                                                                                                                                                                                                                                                                                                                   |
| An unused `@ts-expect-error`                                                   | The new types made it unnecessary; delete it                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| A helper that receives form values                                             | Accept `undefined`, which the values can be on the first render: `(templates ?? []).filter(…)`, `options?.[index]`                                                                                                                                                                                                                                                                                                                                                              |

If your type check skips Cypress specs, run their check too and compare it with
master. Staff Portal's `pnpm typecheck:cypress` reports three `<Form top={…}>`
errors in billing-invoice specs that predate the alpha.

### Step 5. Handle the form runtime changes

These change behavior. Some fail tests; others only show in the app.

**Fields register in an effect.** react-final-form 7 registers a field after its
first render, so that render sees no value for it, and a component that calls
`useField` renders twice on mount, with its children. Code that captures form
values on the first render captures nothing. Staff Portal's screening-note
options list kept `useRef(options).current` as "the options the form opened
with"; its parent now reads them from `initialValues` and passes them down.

**Import every form API from `@toptal/picasso-forms`.** react-final-form 7.0.1
refills a remounted field from `initialValues`
([react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095))
and renders an array field's first render with no items. picasso-forms works
around both for its own exports: the Picasso fields, the radio and checkbox
groups, `FinalField`, `useField`, `FieldArray`, `useFieldArray`, and the
`OnChange`, `OnBlur`, `OnFocus` and `ExternallyChanged` listeners. The same APIs
imported from `react-final-form`, `react-final-form-arrays` or
`react-final-form-listeners` keep upstream's behavior. On an alpha without the
workaround, going Back in Client Portal's job wizard emptied the job description
and replaced an edited title. Find the imports to switch:

```bash
git grep -n -E "from 'react-final-form(-arrays|-listeners)?'" -- '*.ts' '*.tsx'
```

The workaround doesn't cover a field whose `data`, `defaultValue` or
`initialValue` prop changes identity while it's mounted. Forms with
`destroyOnUnregister` behave as before. Removing the
workaround is tracked in
[PF-2522](https://toptal-core.atlassian.net/browse/PF-2522).

**Array fields subscribe to less by default.** This is the change that's easiest
to miss. react-final-form-arrays 5 changed its default subscription from every
key to `length`, `value` and `error`, and Picasso's `FieldArray` and
`useFieldArray` pass that default through. An array field that reads any other
`meta` key, such as `touched` or `submitError`, gets `undefined`, and whatever
depends on that key silently stops rendering. Staff Portal had four:

| Array field                                          | Reads                    | Without a subscription                            |
| ---------------------------------------------------- | ------------------------ | ------------------------------------------------- |
| recording-audits schema form: sections and questions | `submitError`            | the array-level submit error didn't show          |
| vertical wizard: primary-interest options            | `submitError`            | a failed save showed no error; its spec caught it |
| leave-feedback modal: `NegativeField`                | `touched`                | its validation error never showed                 |
| Send TOP form: `CCFields`                            | `touched`, `submitError` | the server's error for the CC list never showed   |

Only the wizard had a test that could see it. Subscribe to every key you read,
on top of the defaults; `length` is always added:

```ts
useFieldArray('additionalCcs', {
  subscription: { value: true, error: true, touched: true, submitError: true },
})
```

The array-field search in [Size the work](#size-the-work) lists the candidates.
Check each hit by hand, because only keys read from the array field's own `meta`
count. On Staff Portal's master it lists the three direct readers above. On
Client Portal both hits were false positives: a prop named
`activeRepresentativeId`, and form-level state read through `useFormState()`.
The search can't see a field that passes `meta` to a helper, as recording-audits
does with `fieldArrayError(meta)`, so check those helpers too.

**Checkboxes with a custom `format`.** A checkbox without its own `value` keeps
version 6's `checked`: `Form.Checkbox`, `Form.ButtonCheckbox`, `Form.Switch`,
and checkboxes built on `FinalField` or `useField`. react-final-form 7.0.1
derives `checked` from `parse` instead, which renders a stored `'false'` as
checked. Group checkboxes and radios follow upstream, which compares the stored
value with their own `value`, so re-check their `format` and `parse` pairs.
Staff Portal tested its relocation fields, which store `'true'` and `'false'`.

**Listeners keep their old behavior.** `ExternallyChanged` reports every change
made while its field isn't focused, including the first one after mount, as
version 1 did; version 3 skips that one. `OnChange` no longer fires when its
field remounts, including when the initial value is `null`. None of the 35 Staff
Portal production files that use `OnChange` needed a logic change. Check
`ExternallyChanged` flows by hand anyway: Staff Portal's two billing-cycle
settings forms show their "Invoice issuing day changed" Helpbox through it, and
no test covered that.

**A field without a `name` throws** a `[picasso]` error in development, instead
of `Cannot call setIn() with undefined key`. Production code in both apps
already passed names, but test fixtures that wrap a field must forward one.
Staff Portal fixed four Jest fixtures, and Client Portal four Cypress fixtures
that rendered `<Form.RichTextEditor />` without one.

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
- Fade's and Slide's own transition replaces a `transition-*` utility on the
  child, so they animate. A broad `transition` or `transition-all` on the child
  stays, and so does `transition-none`, which turns the animation off. On
  Slide, a `translate-*` utility on the child along the slide axis applies
  while the child is shown, and gives way to the slide's offset while it's
  hidden.
- Expect a few visual diffs on accordions and expandable content. Client
  Portal's two Happo diffs are still under review; the first suspect is the
  `RejectedTalents` accordion in `TalentsSection`, built on the rewritten
  Collapse.

**ShowMore** clamps with CSS `line-clamp` instead of react-truncate. The full
text stays in the DOM, so a test that asserted truncated text now finds the
whole text, and server-rendered output contains the full text. The toggle still
appears only when the content overflows.

**TimePicker** renders the native `<input type="time">` in Safari too, which has
had it since 14.1. Safari 13 and 14.0 get a text field that accepts `HH:MM`.

**RichTextEditor** renders emoji-mart's picker through a local component instead
of `@emoji-mart/react`, and no longer leaks a `keyup` listener on
`document.body` each time the picker opens. Since
[#5117](https://github.com/toptal/picasso/pull/5117), which came after the
`970580a42` alpha, it also loads emoji-mart and its dataset (about 100 KB
gzipped) on the first picker open instead of with every editor; the `/eager`
entry loads both up front.

**Dropdown** passes `{ open }` to a render-function child. The `isOpen` key
still arrives, deprecated.

**Page.Helmet** renders through the provider's `Helmet`
([Step 2](#step-2-update-dependencies-overrides-and-patches)).

**DatePicker and Calendar** use date-fns 4 internally, and the `timezone` prop
behaves as before. A `DatePicker` given a `minDate` after its `maxDate` no
longer crashes; it treats the interval as swapped.

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
([#5113](https://github.com/toptal/picasso/pull/5113)). Staff Portal's
`RecordingPlayerBar` spec "offers every rate and nothing blank" depends on the
Select fix: master had dropped its own workaround, and CI failed on an alpha
that lacked the fix.

**Where to look in Happo:** screens that render `ShowMore`, `Accordion` or
`Table.ExpandableRow` (14, 15 and 29 files in Staff Portal), anything inside a
Fade, Slide, Collapse or Backdrop, and places where you override a Picasso
class.

### Step 7. Update the tests

**Assert what rendered, not how often.** Render counts go up on mount, because
fields register in an effect. Seven Staff Portal test files and Client Portal's
`JobDetailsSection.test.tsx` now assert which items rendered:

```ts
// before
expect(SelectMock).toHaveBeenCalledTimes(2)

// after
const renderedNames = SelectMock.mock.calls.map(([props]) => props.name)

expect(Array.from(new Set(renderedNames))).toEqual(['access', 'source'])
```

**Don't line mocks up with renders.** A `mockReturnValueOnce` chain that matches
"the Nth render" no longer does. Drive the mock from state instead, as Staff
Portal's `EditableField` loader test now does by flipping `loading` inside the
mocked `request()`.

**Don't call handlers from a mock's render.** A mock that called `onClick()`
while rendering stopped working once fields registered in an effect. Render a
button and click it.

**Keep harness state inside the `<Form>`.** A toggle kept above `<Form>`
re-renders it with a new inline `initialValues` object, react-final-form
reinitializes the form, and the test fails in a way that looks like the bug
you're testing for. Put the toggle in a child of the form.

**Add a remount test to every step-based form.** Change values, unmount the
step, mount it again and assert that the values stayed. Client Portal's
`JobTypeChangeListener.test.tsx` and `TalentDetails.cy.tsx` pass on both the old
and the new Picasso, and fail with the remount fix switched off.

**Test an array field's errors without user events** if your Jest bans
`fireEvent`, as Staff Portal's does. Render the real `Form`, capture `useForm()`
from a child component and call `form.submit()` inside `act`. A failed submit
marks every field touched, which is exactly the path the subscription change
hides. Staff Portal's `CCFields.test`:

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

  expect(await screen.findByTestId('SendTopForm-ccs-error')).toHaveTextContent(
    SERVER_ERROR
  )
})
```

It and `NegativeField.test` fail on the unfixed components.

**Expect assertions on hook arguments to change.** `NegativeField.test` asserted
that `useFieldArray` was called with the field name only. With the subscription
from [Step 5](#step-5-handle-the-form-runtime-changes), both of its assertions
include the config, which needs the reviewer's agreement.

**Update `Form.Checkbox` snapshots once.** Hidden checkbox inputs render
`value=""`. Two Staff Portal billing snapshots changed only by that attribute.

**Wait for async field values in Cypress.** Staff Portal's inline expiry-date
editor autofocuses before its value arrives, and a test that clears and types at
once appends to the late value instead of replacing it. Wait for the existing
value first:

```ts
cy.getByTestId('EditableField-expiryDate-editor')
  .find('input')
  .should('have.value', '2022-05-05')
```

**topkit chat-ui 5**, if you use it, changed the chat markup. The pending
message no longer shows a "Sending" label, and `isSendingTextHidden` is gone.
Pass `testIds={{ messageDisplay: 'chat-message-list-item' }}` to
`ChatMessageList` to keep the item test id. Staff Portal's
`CallAssistantChatbot.cy.tsx` asserts on the `.animate-text-shimmer` class until
chat-ui offers a test id for the sending state.

### Step 8. Verify and ship

- [ ] `pnpm install --frozen-lockfile` from a clean `node_modules`
- [ ] the lockfile and tree checks from
      [Step 3](#step-3-install-then-check-the-tree), and your
      version-consistency check if you have one (Staff Portal runs
      `pnpm syncpack list-mismatches`)
- [ ] the type check with 0 errors, Cypress specs included, compared with master
- [ ] the full unit suite
- [ ] Cypress for every package with forms, modals, date pickers, rich text or
      charts
- [ ] a production build with no new warnings
- [ ] every Happo diff reviewed (Happo runs in CI)
- [ ] by hand:
  - a multi-step form: change values, go Back and forward again; the values stay
  - conditional fields: a field that unmounts and remounts keeps its edit
  - inline editors with a date field, and a DatePicker that shows a new value
    after a click outside it
  - checkboxes stored as `'true'` and `'false'`
  - a `Select` or `Autocomplete` inside a `Modal` stays open when clicked
  - each flow that relies on `ExternallyChanged`
  - `ShowMore` on long and on short text
  - whatever each re-keyed patch is for (Staff Portal: the first tap on a
    tooltip button on a touch screen)
  - topkit's TopChat opens and sends a message

For scale: on #11519, Client Portal passed 88 Jest projects (1,060 suites, 5,551
tests), 26 Cypress specs in 14 packages, a production build and a type check
with 0 errors. On #16703, rebased on master, Staff Portal passed all 271 Jest
projects in 20 to 30 minutes, the type check, and the Cypress specs for every
flow the forms changes touch. Its production build has one expected warning,
`export 'useNavigation' … was not found in 'react-router-dom'`:
`@topkit/navigation-service` reads it through a namespace import on purpose, and
the stable release warns the same way. Two `PurchaseOrderLineDetails` specs
("requires positive amount" and "requires positive threshold") fail locally in
Electron on master too, and pass in CI.

## Part 2: Move the app to React 19

Start once Part 1 is in production. Only Staff Portal has tried this so far. Its
#16704 runs the app on React 19.2.8 through workspace overrides and leaves its
~470 `package.json` declarations on 18 to keep the diff reviewable; the real
adoption bumps them. On its head, CI's lint and Cypress pass and Jest fails two
tests ([Known gaps](#known-gaps)). Client Portal's findings below come from a
review of its installed dependencies.

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

On the alphas it lists 31 packages in Staff Portal and 28 in Client Portal:

| Group                 | In the two apps                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Fix                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| topkit                | 13 packages in each, all `>=17 <19` except `navigation-service` (`>=18 <19`): `chat-ui`, `cypress-utils`, `data-layer-service`, `illustrations`, `modals-service`, `monitoring-service`, `navigation-service`, `talent-verticals-ui`, `top-chat-app`, `ui` and `web-sockets` in both, `dependency-injector` and `react-router` in Staff Portal, `billing-payments` and `storybook` in Client Portal. `@topkit/browser` also peers on `@testing-library/react-hooks` | A topkit release that allows React 19                 |
| Other Toptal packages | `@toptal/top-scheduler` 5.0.x; `@toptal/davinci-storybook-decorators` 5.0.0 and `-theme` 4.0.0, whose latest versions need Storybook 9; `@toptal/billing-frontend`, with an exact `react-dom` 18.2.0 peer                                                                                                                                                                                                                                                           | Upgrade, or ask the owners                            |
| Test and dev tooling  | `@testing-library/react` 13 and 14, `@testing-library/react-hooks` 8, `react-test-renderer` 18, `react-hot-loader`                                                                                                                                                                                                                                                                                                                                                  | [Step 10](#step-10-switch-react-and-the-test-tooling) |
| React itself          | `react-dom` 18                                                                                                                                                                                                                                                                                                                                                                                                                                                      | [Step 10](#step-10-switch-react-and-the-test-tooling) |
| Third-party libraries | See the next table                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Upgrade or replace                                    |

| Library                        | Staff Portal | Client Portal                | Admits React 19 from                          |
| ------------------------------ | ------------ | ---------------------------- | --------------------------------------------- |
| `@apollo/client`               | 3.6.10       | 3.10.8                       | 3.12.2                                        |
| `react-redux`                  | 8.1.3        | 8.1.3                        | 9.2.0                                         |
| `html-react-parser`            | 4.2.9        |                              | 5.2.0                                         |
| `react-resize-detector`        | 7.1.2        |                              | 12.0.0                                        |
| `@react-google-maps/api`       | 2.19.2       |                              | 2.20.4                                        |
| `@storybook/icons`             | 1.2.12       |                              | 1.3.0                                         |
| a second, older `recharts`     | 2.12.3       |                              | 2.15.0; Picasso uses ^2.15.4                  |
| `react-leaflet`                |              | 4.2.1                        | 5.0.0, which requires React 19                |
| `react-pdf`                    |              | 7.7.3                        | 8.0.0                                         |
| `@material-ui/core` and family |              | 4.12.4, declared by the host | Never; remove it                              |
| `react-truncate`               |              | 2.4.0, declared by the host  | Never; use CSS `line-clamp`, as ShowMore does |

"Admits React 19 from" is the first stable release after the last one whose
`react` or `react-dom` peer excludes 19.0.0, from the npm registry on 1
October 2026.

A peer range is only half the story. Three more blockers pass the check:

- **Cypress 13**'s `cypress/react` mounts through `ReactDOM.render`, which React
  19 removes. Component tests need Cypress 14, which Picasso runs its specs on.
- **styled-components 5** declares `react >= 16.8.0` but passes `ref: null` to
  the component it wraps ([Step 13](#step-13-fix-the-react-19-runtime-breaks)).
- **`logrocket-react` 6.0.3**, which `@topkit/analytics` pulls in, warns at load
  that it doesn't support React 19 and turns off its React integration. That
  needs a product decision before the switch.

### Step 10. Switch React and the test tooling

Staff Portal's #16704 sets these as `overrides`:

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
  the first release whose peer range admits React 19. The override also replaces
  the RTL 14 that `@toptal/davinci-qa` nests, which would call
  `react-dom/test-utils`' `act`. Import `act` from `react` in your own tests: on
  React 19, `react-dom/test-utils` keeps only a deprecated `act`.
- **`peerDependencyRules.allowedVersions`:** move `react`, `react-dom`,
  `@types/react` and `@types/react-dom` from `'18'` to `'19'`.
- **Remove `react-hot-loader`.** It doesn't support React 19, and
  `react-refresh` already does hot reload. In Staff Portal that meant dropping
  `hot(App)` from the host's `App.tsx`, the `react-hot-loader/webpack` rule and
  the `scheduler/tracing` alias from its `webpack.config.js`, and both packages
  from its `package.json`.
- **Replace `@testing-library/react-hooks`.** It mounts through
  `ReactDOM.render`, which React 19 removed. Import `renderHook` from
  `@testing-library/react` instead; RTL has shipped it since 13.1, so the swap
  can land on React 18 first. For its trial, Staff Portal left its 376 importing
  files alone and mapped the import, through `moduleNameMapper`, to a compat
  module on RTL 16's `renderHook` that keeps `result.current`, `result.all`,
  `result.error`, `rerender`, `unmount`, `waitFor`, `waitForNextUpdate` and
  `waitForValueToChange` (`config/jest/react-hooks-compat.tsx` on its spike
  branch). The real migration should import `renderHook` directly.
- **Cypress 14** for component tests
  ([Step 9](#step-9-clear-the-blockers-outside-picasso)).

### Step 11. Handle Picasso's React 19 limitations

1. **Only titles merge, and only through `Page.Helmet`.** On React 19,
   react-helmet-async 3 renders real elements for React to hoist, and
   `<HelmetProvider>` becomes a passthrough. `Page.Helmet` still merges titles:
   the innermost `title`, formatted with the innermost `titleTemplate`, or else
   the innermost `defaultTitle`. The title takes only the innermost helmet's
   attributes, from its `titleAttributes` or its `<title>` child. It sets the
   result after mount, so a server render gets no `<title>` from it. Client
   Portal's `titleTemplate='%s | Toptal: Exclusive access to top talent'` in
   `BaseLayout` and `PreOnboardingLayout` still formats its pages'
   `<Page.Helmet title='Overview' />`. A `<Helmet>` rendered directly doesn't
   take part. Otherwise duplicate `<meta>` tags stay, `onChangeClientState`
   never fires, a `<script>` child without `async` doesn't run, the SSR
   `context` stays empty, and `prioritizeSeoTags`, `helmetData` and `canUseDOM`
   do nothing. `htmlAttributes` and `bodyAttributes` keep working.
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

`@types/react` 19 is the largest source change, and it's mechanical. Staff
Portal changed 140 source and story files:

| Change                                                                                                           | Files   |
| ---------------------------------------------------------------------------------------------------------------- | ------- |
| `RefObject<T>` → `RefObject<T \| null>`, which `useRef<T>(null)` returns now                                     | 42      |
| The global `JSX` namespace is gone: `import type { JSX } from 'react'`                                           | 35      |
| `useRef<T>()` needs an argument: `useRef<T>(undefined)`                                                          | 19      |
| Storybook decorators: `(Story: StoryFn) =>` → `Story =>`                                                         | 13      |
| `defaultProps` on function components → default parameters ([Step 13](#step-13-fix-the-react-19-runtime-breaks)) | 11      |
| `ReactText` removed → `number \| string`                                                                         | 8 lines |

`npx types-react-codemod preset-19 ./src` automates several rows, through its
`scoped-jsx`, `useRef-required-initial`, `refobject-defaults` and
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
  `ContainerProps`; Staff Portal dropped it from a test, since no caller passed
  it. The stricter types also catch typos: a `Tooltip` given
  `placeholder='top'`, meant as `placement`, now fails to compile.

**styled-components 5 needs the global `JSX` back.** `@types/styled-components`
5.1.26 reads `JSX.IntrinsicElements` and `JSX.LibraryManagedAttributes`. React
19's types dropped the global `JSX` namespace, and `skipLibCheck` hides the
resulting errors inside the declarations, so the damage shows up elsewhere:
every `styled.div<P>` loses its HTML attributes, and passing `children` fails at
the call site. Staff Portal aliases the global namespace onto `React.JSX` in
`libs/@types/jsx-global.d.ts`, and moved its `css`-prop augmentation into
`declare module 'react'`:

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
  over the component's own ref. In Staff Portal, the staff referrals message
  editor's "Copy Text" button threw. Its `patches/styled-components+5.3.5.patch`
  now passes `ref` only when one was given.
- **No `key` inside spread props.** React 19 rejects it. Pull the key out and
  pass it directly:

  ```tsx
  const { key, ...itemProps } = item as DetailedListItem & { key?: Key }

  return <DetailedListItemComponent key={key ?? index} {...itemProps} />
  ```

- **`defaultProps` on function components are ignored.** React 19 drops them
  silently, so those props arrive `undefined`. Move the defaults into the
  parameter list.
- **A Fragment takes no props.** Don't `cloneElement` props into one. Staff
  Portal's `DetailedListItemContent` now skips Fragments, as Picasso's
  components do with an `icon`, `image` or `expandIcon` they style, so
  `icon={<>%</>}` renders as on React 18.
- **Reading `element.ref` warns.** React 19 keeps an element's ref in
  `props.ref` and warns on every `element.ref` read, while React 18 warns on
  `props.ref`. If your components read a child's ref, for example to merge it
  with their own, use `getElementRef(element)` from `@toptal/picasso/utils`,
  which reads it from where the running React keeps it.
- **No side effects during render.** Staff Portal's `TimesheetUnsubmitModal`
  closed itself while rendering, which updates the store and the URL, and that
  looped on React 19. It now closes from an effect. Look for components that
  close, navigate or dispatch while rendering.
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

**Mocked components are called with one argument.** React 19 calls a function
component as `(props)`, not `(props, {})`, so `toHaveBeenCalledWith(props, {})`
fails. Compare the props alone with `renderedProps(mock)` from
`@toptal/picasso/test-utils` (also exported by `@toptal/picasso-test-utils`). It
passes on both majors, so the rewrite can land on React 18 first:

```ts
// before
expect(ChildMock).toHaveBeenCalledWith(expect.objectContaining({ id }), {})

// after, on React 18 and 19
expect(renderedProps(ChildMock)).toContainEqual(expect.objectContaining({ id }))
```

For `toHaveBeenNthCalledWith(n, props, {})`, compare
`renderedProps(ChildMock)[n - 1]`. Staff Portal's spike took the shortcut
instead and replaced each `{}` with `undefined`, which passes on React 19 only.
That was 3,661 second arguments in 1,323 test files, 140 of them
`expect.anything()`, and 1,272 of those files changed nothing else. Mocks of
plain functions that receive a real second argument keep it.

**Error boundaries log once, and don't rethrow.** React 18 logged a caught error
three times; React 19 logs one `console.error` with the error, the component
stack and a recovery note. Update helpers that count those calls, such as Staff
Portal's `assertErrorBoundaryErrorsCalled`. A Cypress test reads the error from
`console.error` instead of `uncaught:exception`.

**New console messages** to fix or allow-list, in every Jest setup you have
(Staff Portal has two):

- `Symbols are not valid as a React child`: test files that pass `Symbol('…')`
  placeholders as props their mocks render (305 in Staff Portal). React 18
  dropped them silently.
- `logrocket-react does not work with this version of React`
  ([Step 9](#step-9-clear-the-blockers-outside-picasso)).

**Snapshots.** `useId` output changes format (`:r1:` becomes `_r_1_`), inputs
lose the empty `value=""` that Part 1 added to checkboxes, and styled-components
class hashes change where the component file changed. In Staff Portal that was
23, 3 and 11 lines across 8 snapshot files.

**`act` holds updates until it exits.** Don't `await waitForNextUpdate()` inside
`act` (Staff Portal removed 8), don't run `findBy…` inside it, and wrap a render
in `act` when the component resolves lazily after its first render, as
`SendSTAModal`'s lazy form does.

**Render counts under Suspense depend on scheduling.** Four Staff Portal modal
tests rendered once on React 18 and three times on React 19. Assert that the
component rendered, then check its props. That's an assertion change, so it
needs the reviewer's agreement.

**Cypress.**

- Target the open dialog. A modal on its exit transition can still be in the DOM
  when the next one opens, so Staff Portal's `BasicModal.close()` in
  cypress-utils clicks the close button of `div[role="dialog"][data-open]`.
- Wait for state between pointer steps. The rubric editor's drag waits for
  `aria-pressed="true"` on the handle before its second move.

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

**In Picasso, after the release**, from the
[#5070 review](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/6455296029/PF-2262+-+React+19+PR+5070+Review+Findings+and+Action+Items):

- The forms remount workaround
  ([PF-2522](https://toptal-core.atlassian.net/browse/PF-2522)) has no upstream
  fix to wait for: react-final-form's `allowNull` initializer is still on
  upstream master.
- The date-fns peer conflict lasts until the react-day-picker 9 migration
  ([PF-2297](https://toptal-core.atlassian.net/browse/PF-2297)).
- react-querybuilder 8 ([#5102](https://github.com/toptal/picasso/pull/5102))
  isn't part of this release.

**In Staff Portal's #16704**, still open:

- `EligibleForRestorationField` › shows error: React 19 reports state updates
  outside `act` after the failed mutation.
- `TalentGeneralSection` › one specialization: Apollo runs out of mocked
  responses for `GetFlaggings`, so React 19 seems to fire one more query.
- The transfer modals (`Cancel`, `ClaimRefund`, `MarkFailed`, `Pay`, `Postpone`,
  `Rollback`) close during render the way `TimesheetUnsubmitModal` did. Their
  tests pass, but they should move to an effect.
- Error reporting isn't wired to `createRoot`'s callbacks yet.
- It waits on a topkit release that allows React 19, and on the
  `logrocket-react` decision.

## Appendix

### What each app changed

**Client Portal, [#11519](https://github.com/toptal/client-portal/pull/11519),
on React 18**

- Versions: 89 manifests on the alphas, 91 Picasso pins in root `resolutions`,
  master merged in.
- final-form 5: `libs/forms` declares `final-form ^5.0.1` and
  `final-form-arrays ^4.0.1`, the iOS 17.0 patch is re-keyed to
  `final-form@5.0.1`, and `setFieldData` is cast to final-form 5's `Mutator`.
- Types: `initialValues = {}` at three call sites, `FieldArrayRenderProps` with
  one type parameter, a lowercase `autocomplete` removed, and mutator arguments
  typed in a test.
- Tests: a render-count assertion rewritten, four Cypress fixtures given a field
  `name`, and two remount regression tests added.
- One latent bug fixed: `JobDetailsRichDescription` read `.value` off
  `useField()`, which is always `undefined`, so it now reads `input.value`.

**Staff Portal, [#16703](https://github.com/toptal/staff-portal/pull/16703), on
React 18**

- 258 `package.json` files: version pins, plus `date-fns` declared in
  `engagements-candidate-sending`.
- `pnpm-workspace.yaml`: Picasso pins and scoped topkit overrides in
  `overrides`, the `react-final-form: 6.5.3` override dropped, dedupe pins
  moved, patch keys renewed, the tooltip patch regenerated and the
  react-truncate patch deleted.
- 84 source, test and story files:

  | Area                                            | Files     |
  | ----------------------------------------------- | --------- |
  | form types (Step 4)                             | 54        |
  | form runtime (Step 5): source, tests, snapshots | 8 + 4 + 2 |
  | render-count and fixture tests (Step 7)         | 13        |
  | chat-ui 5 (Step 7)                              | 2         |
  | Cypress wait (Step 7)                           | 1         |

**Staff Portal, [#16704](https://github.com/toptal/staff-portal/pull/16704), on
React 19, stacked on the React 18 work**

1,549 files:

| Area                                                                          | Files                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------ |
| tests                                                                         | 1,378, of which 1,272 change only the call shape |
| snapshots                                                                     | 8                                                |
| types (Step 12), including 13 stories                                         | 140                                              |
| runtime fixes (Step 13)                                                       | 9                                                |
| tooling: config, host, workspace and patch (Steps 10 and 13)                  | 8                                                |
| test infrastructure: cypress-utils, a page object and a test helper (Step 14) | 3                                                |

### Sources

This guide reconciles:

- Staff Portal's guide, `docs/migrations/picasso-react-19-migration.md` in
  [#16703](https://github.com/toptal/staff-portal/pull/16703)
- Client Portal's guide, `docs/picasso-react-19-migration.md` in
  [#11519](https://github.com/toptal/client-portal/pull/11519)
- the release changesets in `.changeset/` on
  `feature/pf-2262-lift-the-react-19-peer-dep`, the release notes
- the
  [#5070 review](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/6455296029/PF-2262+-+React+19+PR+5070+Review+Findings+and+Action+Items)
  on Confluence
- checks run for this guide on 1 October 2026: the release plan from
  `pnpm changeset status`, the searches in [Size the work](#size-the-work)
  against both apps' master, the peer check in
  [Step 9](#step-9-clear-the-blockers-outside-picasso) against both apps'
  installed trees, and the npm registry's peer ranges

Where the sources differ, this guide says which applies:

- **Where to pin the pre-release.** Staff Portal pins in `pnpm-workspace.yaml`
  `overrides`, Client Portal in root `resolutions`, because pnpm 10.32.1 ignores
  the workspace block when `resolutions` exists. Pick by whether your root
  manifest has `resolutions`.
- **Why topkit has to move.** Staff Portal hit `@topkit/modals-service`'s exact
  Picasso peers, Client Portal `@topkit/ui`'s `^100` peers. Both install a
  second Picasso.
- **`@apollo/client`.** Client Portal's guide puts React 19 support at 3.11. The
  first release whose peer range admits React 19.0.0 is 3.12.2.
- **Blocker counts.** Staff Portal's guide lists 30 packages; the peer check
  finds 31 on the current tree, adding `@toptal/billing-frontend`. Client
  Portal's guide lists topkit and the test stack; the check also finds
  `@material-ui/core` 4, `react-truncate`, `react-leaflet` 4 and `react-pdf` 7,
  which the app declares itself.

### References

- Picasso: [#5070](https://github.com/toptal/picasso/pull/5070) (the release),
  [#5100](https://github.com/toptal/picasso/pull/5100) (peer range and React 19
  harness), [#5111](https://github.com/toptal/picasso/pull/5111) and
  [#5115](https://github.com/toptal/picasso/pull/5115) (forms remount fixes),
  [#5120](https://github.com/toptal/picasso/pull/5120) (review fixes),
  [#5117](https://github.com/toptal/picasso/pull/5117) (emoji-mart lazy load)
- topkit: [#1274](https://github.com/toptal/topkit/pull/1274)
- Apps: Staff Portal [#16703](https://github.com/toptal/staff-portal/pull/16703)
  and [#16704](https://github.com/toptal/staff-portal/pull/16704); Client Portal
  [#11519](https://github.com/toptal/client-portal/pull/11519)
- Jira: [PF-2262](https://toptal-core.atlassian.net/browse/PF-2262) (execution),
  [PF-2236](https://toptal-core.atlassian.net/browse/PF-2236) (plan of record),
  [PF-2522](https://toptal-core.atlassian.net/browse/PF-2522) (the forms
  workaround), [PF-2297](https://toptal-core.atlassian.net/browse/PF-2297)
  (react-day-picker 9)
- The previous migration:
  [migration-to-new-picasso-v2.md](./migration-to-new-picasso-v2.md)
