---
'@toptal/picasso-shared': minor
'@toptal/picasso-charts': minor
'@toptal/picasso-forms': patch
'@toptal/picasso-codemod': patch
'@toptal/picasso-container': patch
'@toptal/picasso-list': patch
'@toptal/picasso-menu': patch
'@toptal/picasso-prompt-modal': patch
'@toptal/picasso-select': patch
'@toptal/picasso-tagselector': patch
'@toptal/picasso-tree-view': patch
---

[PF-2031] Upgrade TypeScript to v5.5 and align davinci tooling to v24/v14/v19/v8/v3

Picasso now builds against TypeScript 5.5 and pulls its lint/test/codegen infrastructure from `@toptal/davinci-syntax@24`, `@toptal/davinci-engine@14`, `@toptal/davinci-qa@19`, `@toptal/davinci-ci@8`, and `@toptal/davinci-code@3`. Build, typecheck, and lint all pass clean (0 errors). `@babel/preset-typescript` peer is moved to `^7.26.0` per davinci-engine v14's requirements.

Public type changes consumers should be aware of:

- the `OverridableComponent<P>` type in `@toptal/picasso-shared` gains a second call signature: `<R = unknown>(props: P & RefAttributes<R>) => JSX.Element | null`. This is additive — it allows TS 5.x's stricter assignability check to accept `forwardRef<R, P>(...)` directly when `P` contains required fields. Existing callers that already used the polymorphic `as`-prop signature are unaffected.
- the `BarChartIndicators` component in `@toptal/picasso-charts` now exports proper interfaces (`BarSeriesItem`, `RenderIndicatorParams`, and a typed `Props`) in place of the previous `any`-typed render-prop. The `renderIndicator` callback parameter is now a typed `RenderIndicatorParams` object.
- the `BarChart.valueAxisTickFormatter` prop is now typed as `(value: string | number, index: number) => string` instead of `(value: any, ...) => string`.
- the `composeValidators` helper in `@toptal/picasso-forms` is now generic: `<TValue = unknown>(validators: (FieldValidator<TValue> | undefined | null | false)[]) => FieldValidator<TValue>`. Behavior is unchanged; downstream type inference now propagates the validator value type.

Internal type cleanups in `picasso-codemod`, `picasso-shared`, `Tagselector`, `Container`, `Menu`, `PromptModal`, `List`, `Select`, `TreeView`, and `NumberInput` resolve `any` lint regressions surfaced by `@typescript-eslint` v8 — no public API impact beyond what is listed above. `OverviewBlock`, `Page`, `Breadcrumbs`, `Button`, `ButtonAction`, `ButtonBase`, `ButtonCircular`, `MenuItem`, `Link`, and `SidebarItem` compile cleanly without source changes once `OverridableComponent` gains its forwardRef-compatible overload.
