---
'@toptal/picasso': major
'@toptal/picasso-charts': major
'@toptal/picasso-codemod': major
'@toptal/picasso-forms': major
'@toptal/picasso-pictograms': major
'@toptal/picasso-provider': major
'@toptal/picasso-query-builder': major
'@toptal/picasso-rich-text-editor': major
'@toptal/picasso-shared': major
'@topkit/analytics-charts': major
'@toptal/picasso-container': patch
'@toptal/picasso-list': patch
'@toptal/picasso-menu': patch
'@toptal/picasso-prompt-modal': patch
'@toptal/picasso-select': patch
'@toptal/picasso-tagselector': patch
'@toptal/picasso-tree-view': patch
---

[PF-2031] Upgrade TypeScript to v5.5 and align davinci tooling to v25/v15/v19/v8/v3

**BREAKING:** the `typescript` peer dependency on every published package moves from `~4.7.0` to `^5.5.0`. Consumers must be on TypeScript 5.5 or newer to install these packages. No other consumer code changes should be required — see "Public type surface" below.

Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@25`, `@toptal/davinci-engine@15`, `@toptal/davinci-qa@19.1`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3` (the stable releases of toptal/davinci#2677). Build, typecheck, and lint all pass clean (0 errors).

Public type surface:

- the `OverridableComponent<P>` type in `@toptal/picasso-shared` is rewritten as a single-signature interface `(props: P & { [key: string]: any }) => JSX.Element | null`. declared fields of `P` remain strictly typed at JSX call sites (e.g. `<Button size={42} />` still errors), and any other prop is accepted untyped. this preserves the polymorphic `as`-prop usage pattern and lets `forwardRef<R, P>(...)` assign directly without an escape hatch. trade-off versus the pre-PF-2031 shape: TypeScript no longer pulls prop types FROM the `as` target — `<Button as={Link} to={...} />` does not validate `to` against `Link`'s props. full polymorphic-inheritance typing for the `as` prop is tracked in FF-125.

Internal type adjustments in `Tagselector`, `Container`, `Menu`, `PromptModal`, and `NumberInput` (not publicly exported) resolve build/lint regressions surfaced by `@typescript-eslint` v8. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes under the new `OverridableComponent` shape. `ButtonAction` got a one-line internal fix (an `icon` helper returning `null` where `ReactElement | undefined` was declared) that the stricter declared-prop typing in the new shape surfaced.
