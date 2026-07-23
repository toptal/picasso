---
'@toptal/picasso-popper': major
---

### Popper

- re-implement on `@floating-ui/react`, removing the `@material-ui/core` peer dependency and all popper.js types; rendering, placement, flipping, overflow shifting, hiding and the `onCreate`/`onUpdate` lifecycle keep behavioral parity
- breaking: `popperOptions` is now typed as a Picasso-native, popper.js-v1-shaped subset (`modifiers.flip/offset/preventOverflow/hide`, `onCreate`, `onUpdate`). popper.js-typed option objects remain assignable, but options outside this subset (`positionFixed`, `eventsEnabled`, custom modifier `fn`s, `arrow`, `applyStyle`, …) are no longer honored at runtime
- breaking: the forwarded `ref` resolves to a `PopperHandle` (`popper` element, `update()`, `scheduleUpdate()`) instead of a popper.js instance; popper.js-only instance members (`destroy()`, `enableEventListeners()`, `options`, …) are gone. `ref.current.popper` keeps working
- breaking: lifecycle callbacks `onCreate`/`onUpdate` are invoked without the popper.js `data` argument
- breaking: when portaled, the popper element is wrapped in a `data-floating-ui-portal` element inside the container instead of being appended directly

### Cypress test notes

- floating-ui positions the popup via `useLayoutEffect` (synchronous before paint), so the element is never visually painted at `top:0; left:0`. However, during the React render cycle the DOM briefly contains the popup at its initial position before `useLayoutEffect` fires. Synthetic Cypress events (`cy.trigger('mouseover')`) do not move the real CDP cursor, so they can land on portal children that appear at `top:0` during that window — producing unexpected hover state in nested drilldown menus. Replace `trigger('mouseover')` / `trigger('mouseout')` with `cy.realHover()` (CDP-based) on any test that drives hover-triggered popups: the real cursor is at the element's actual viewport position, so the transient initial render has no effect.
- popper.js applied `transform: translate3d(x, y, 0)` with `will-change: transform`, which happo-cypress serialized as `top:0` (the RAF that committed the transform fired after serialization). floating-ui commits `top: Xpx; left: Ypx` before the browser paints, so happo now captures the popup at its correct position. Expect visual diffs on all Popper-consuming component snapshots: the popup now appears correctly positioned next to its trigger instead of at the top of the page. These are correct, accept them.
