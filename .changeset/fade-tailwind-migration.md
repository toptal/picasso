---
'@toptal/picasso-fade': major
---

### Fade

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- drop react-transition-group for Tailwind classes. Public props are unchanged
- **consumer action**: `onEnter` and `onExited` receive the transitioning DOM node, as their types declared. A callback that read `onEnter`'s first argument as `isAppearing` reads the second one
- **consumer action (types)**: the node is `null` for a child that takes no ref, so the parameter is typed `HTMLElement | null`
- the hidden state is the `invisible` and `opacity-0` classes instead of inline `visibility` and `opacity` styles, merged with the child's `className` by `twMerge`, and a child's own `opacity-*` class applies while shown, since Fade no longer sets an inline `opacity: 1`
- **consumer action (tests)**: jsdom doesn't apply the `invisible` class, so a hidden child no longer fails `toBeVisible()` or matches `toHaveStyle('visibility: hidden')`. Assert `toHaveClass('invisible')` instead
- a `transition-*` utility on the child gives way to Fade's `transition-opacity`; `transition`, `transition-all` and `transition-none` stay
- the object form of `timeout` sets each direction's duration, including `appear`, where it produced an invalid inline value
