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

**BREAKING:** the `typescript` peer dependency on every published package moves from `~4.7.0` to `^5.5.0`. Consumers must be on TypeScript 5.5 or newer to install these packages.

Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@24`, `@toptal/davinci-engine@14`, `@toptal/davinci-qa@19`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3`. Build, typecheck, and lint all pass clean (0 errors).

Public type changes consumers should be aware of:

- the `OverridableComponent<P>` type in `@toptal/picasso-shared` gains a second call signature: `<R = unknown>(props: P & RefAttributes<R>) => JSX.Element | null`. This is additive — it allows TS 5.x's stricter assignability check to accept `forwardRef<R, P>(...)` directly when `P` contains required fields. Existing callers that already used the polymorphic `as`-prop signature are unaffected.
- the `BarChartIndicators` component in `@toptal/picasso-charts` now exports proper interfaces (`BarSeriesItem`, `RenderIndicatorParams`, and a typed `Props`) in place of the previous `any`-typed render-prop. The `renderIndicator` callback parameter is now a typed `RenderIndicatorParams` object.
- the `BarChart.valueAxisTickFormatter` prop is now typed as `(value: string | number, index: number) => string` instead of `(value: any, ...) => string`. Under `strictFunctionTypes`, callbacks declared with a narrower parameter type (e.g. `(value: number) => string`) will no longer assign — widen the parameter to `string | number` at the call site.
- the `composeValidators` helper in `@toptal/picasso-forms` is now generic: `<TValue = unknown>(validators: (FieldValidator<TValue> | undefined | null | false)[]) => FieldValidator<TValue>`. The composed function now forwards `meta` to each underlying validator (previously only `value` and `allValues` were forwarded); validators that ignore `meta` are unaffected.

Internal type cleanups in `picasso-codemod`, `picasso-shared`, `Tagselector`, `Container`, `Menu`, `PromptModal`, `List`, `Select`, `TreeView`, and `NumberInput` resolve `any` lint regressions surfaced by `@typescript-eslint` v8 — no public API impact beyond what is listed above. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonAction`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes once `OverridableComponent` gains its forwardRef-compatible overload.
