---
'@toptal/picasso-slide': major
---

### Slide

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- drop react-transition-group for Tailwind classes. Public props and the direction mapping are unchanged
- **consumer action**: `onEnter` and `onExited` receive the transitioning DOM node, as their types declared. A callback that read `onEnter`'s first argument as `isAppearing` reads the second one
- **consumer action (types)**: the node is `null` for a child that takes no ref, so the parameter is typed `HTMLElement | null`
- **consumer action**: the hidden state is the `invisible` class and a `translate-*` offset instead of inline `visibility` and `transform` styles, so `transitionend` listeners see `propertyName: 'translate'`. A child's own inline `transform` is kept
- **consumer action (tests)**: jsdom doesn't apply the `invisible` class, so a hidden child no longer fails `toBeVisible()` or matches `toHaveStyle('visibility: hidden')`. Assert `toHaveClass('invisible')` instead
- a `transition-*` utility on the child gives way to Slide's `transition-transform`; `transition`, `transition-all` and `transition-none` stay
- a child's `translate-*` utility along the slide axis applies while shown, so `-translate-x-1/2` centering holds
- the object form of `timeout` sets each direction's duration, including `appear`, where it produced an invalid inline value
