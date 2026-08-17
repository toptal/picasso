---
'@toptal/picasso-checkbox': minor
'@toptal/picasso-switch': minor
'@toptal/picasso-shared': minor
---

### Checkbox

- add `testIds.input` for placing a `data-testid` on the visually hidden native `<input>` — Base UI renders it beside the `[role="checkbox"]` element, so it is not reachable from the top-level `data-testid`. Flows through `Form.Checkbox` as well

### Switch

- add `testIds.input` for placing a `data-testid` on the visually hidden native `<input>` — Base UI renders it beside the `[role="switch"]` element, so it is not reachable from the top-level `data-testid`. Flows through `Form.Switch` as well

### useInputTestId

- add `useInputTestId` hook — a callback ref that stamps a `data-testid` on the input a Base UI primitive exposes only through `inputRef`
