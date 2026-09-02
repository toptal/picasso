---
'@toptal/picasso-query-builder': major
---

### QueryBuilder

- narrow the `react` and `react-dom` peer ranges from `>=17.0.0 < 19.0.0` to `>=18` (BREAKING). `react-querybuilder` v7.1+ requires React 18 (its internals moved to `react-redux` v9); consumers still on React 17 must stay on the previous major of this package. This diverges from the library-wide `react` range on purpose — see the package README
- upgrade `react-querybuilder` and `@react-querybuilder/dnd` from `6.5.4` to `^8.23.1` so the package can run under React 19 and stays current with upstream fixes
- change `useQueryBuilderValidator` to take `{ fields, query }` instead of `{ fields }` and derive `validationErrors`/`queryBuilderValid` from the passed query (BREAKING); the returned `validator` is a pure function. react-querybuilder v7+ invokes the validator during render, so the previous implementation, which updated state from inside it, re-rendered in an endless loop
- the public `Field`, `Operator`, `OptionGroup`, `RuleType`, `RuleGroupType`, `RuleGroupTypeAny`, `ValidationResult` and `OperatorSelectorProps` types keep their names and stay source-compatible for typical use; option objects received by custom selectors and entries of `defaultOperators` now carry a `value` property alongside `name` (`value` is the preferred identifier upstream)
- custom properties on `Field` definitions and `fieldData` beyond the documented ones now surface as `unknown` instead of `any`, mirroring react-querybuilder v7+
- `react-querybuilder` now brings `react-redux` v9 and `@reduxjs/toolkit` v2 as internal dependencies scoped to its own React context; this does not interact with a consumer's Redux store
- no visual change to the rendered query builder; rule-group elements gain a `title` attribute for accessibility, which may show up in consumer snapshot tests
