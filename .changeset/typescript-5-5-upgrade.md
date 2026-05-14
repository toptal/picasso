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

[PF-2031] Upgrade TypeScript to v5.5 and align davinci tooling to v24/v14/v19/v8/v3

**BREAKING:** the `typescript` peer dependency on every published package moves from `~4.7.0` to `^5.5.0`. Consumers must be on TypeScript 5.5 or newer to install these packages. No other consumer code changes should be required — see "Public type surface" below.

Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@24`, `@toptal/davinci-engine@14`, `@toptal/davinci-qa@19`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3`. Build, typecheck, and lint all pass clean (0 errors).

Public type surface:

- the `OverridableComponent<P>` type in `@toptal/picasso-shared` gains two additional call signatures listed AFTER the existing polymorphic `as`-prop signature: a ref-attribute overload `<R = unknown>(props: P & RefAttributes<R>) => JSX.Element | null` so `forwardRef<R, P>(...)` assigns cleanly under TS 5.x's stricter assignability when `P` contains required fields, and a non-generic fallback `(props: P) => JSX.Element | null` so consumer code shaped like `const X: OverridableComponent<Props> = (props) => ...` keeps contextual typing on `props` (without it TS picks neither generic overload and the parameter falls back to implicit `any`). Declaration order means plain `<X />` and `<X as={...} />` callers continue to resolve to the original signature and keep their pre-5.5 inference behavior.
- the `composeValidators` helper in `@toptal/picasso-forms` becomes overloaded — a typed signature for callers passing `FieldValidator<T>[]` (full type inference on the composed validator) and a permissive `readonly unknown[]` signature that preserves all pre-PF-2031 call patterns. The composed function additionally forwards `meta` to each underlying validator (previously dropped); validators that ignore `meta` are unaffected, validators that read it now receive what they were always typed to receive.

Internal type cleanups in `picasso-codemod`, `picasso-shared`, `Tagselector`, `Container`, `Menu`, `PromptModal`, `List`, `Select`, `TreeView`, `NumberInput`, and `BarChartIndicators` (not publicly exported) resolve `any` lint regressions surfaced by `@typescript-eslint` v8. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonAction`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes once `OverridableComponent` gains its forwardRef-compatible overload.
