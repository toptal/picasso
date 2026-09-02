# React compatibility layer for jest

The unit suite runs on React 18 (`jest.spec.mjs`) and again on React 19
(`jest.react19.mjs`, using the standalone install in `react19/`). Both runs
compare against the **same** snapshot files, so anything React renders
differently between the two majors has to be normalized here — otherwise
every such difference is a snapshot failure that hides real regressions.

| File                               | Registered in                          | What it normalizes                                                                                            | Retire when                            |
| ---------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `input-empty-value-serializer.cjs` | both                                   | React 18 reflects an empty `value` prop on `<input>` as `value=""`, React 19 sets only the property           | the suite runs on a single React major |
| `jss-serializer-guard.cjs`         | both                                   | davinci-qa's JSS class-name serializer throws on `null` instead of declining; React 19 elements hand it nulls | davinci-qa guards its own `test()`     |
| `react-element-serializer.cjs`     | React 19 only                          | React 19 tags elements `react.transitional.element`, which pretty-format 29 does not print as JSX             | davinci-qa ships jest ≥ 30.4           |
| `react-useid-compat.cjs`           | React 19 only (`react` module mapping) | `useId` output changed from `:r1:` to `_r_1_` in React 19.2                                                   | the suite runs on a single React major |

Each file is a plain pretty-format plugin (or, for `useId`, a `react` module
wrapper), so it needs no build step. The tests next to them run under both
configs. The "retire when" column is the plan: every entry here is a stopgap
for something that belongs in the shared tooling, not in Picasso.
