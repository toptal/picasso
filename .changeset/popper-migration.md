---
'@toptal/picasso-popper': major
---

### Popper

- Re-implement on `@floating-ui/react`, removing the `@material-ui/core` peer dependency and all popper.js types; rendering, placement, flipping, overflow shifting, hiding and the `onCreate`/`onUpdate` lifecycle keep behavioral parity
- BREAKING: `popperOptions` is now typed as a Picasso-native, popper.js-v1-shaped subset (`modifiers.flip/offset/preventOverflow/hide`, `onCreate`, `onUpdate`). popper.js-typed option objects remain assignable, but options outside this subset (`positionFixed`, `eventsEnabled`, custom modifier `fn`s, `arrow`, `applyStyle`, …) are no longer honored at runtime
- BREAKING: the forwarded `ref` resolves to a `PopperHandle` (`popper` element, `update()`, `scheduleUpdate()`) instead of a popper.js instance; popper.js-only instance members (`destroy()`, `enableEventListeners()`, `options`, …) are gone. `ref.current.popper` keeps working
- BREAKING: lifecycle callbacks `onCreate`/`onUpdate` are invoked without the popper.js `data` argument
- BREAKING: when portaled, the popper element is wrapped in a `data-floating-ui-portal` element inside the container instead of being appended directly
- Lift the React 19 peer-dependency cap (`react: >=16.12.0`)
