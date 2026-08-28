---
'@toptal/picasso-utils': minor
'@toptal/picasso-fade': minor
'@toptal/picasso-slide': minor
'@toptal/picasso-backdrop': minor
'@toptal/picasso-tailwind-merge': patch
---

### Utils

- add `useTransitionStatus` hook and `getTransitionTimeouts` helper — a timer-driven replacement for react-transition-group's `Transition` state machine, matching its timer-based settle timing
- add `getElementRef` helper, typing the ref lookup on a React element in one place

### Fade

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props are unchanged
- `onEnter`/`onExited` now receive the transitioning DOM node, as their types always declared. Under react-transition-group's `nodeRef` mode the old runtime actually called `onEnter(isAppearing, undefined)` and `onExited()` with no arguments — consumers reading the first `onEnter` argument as the `isAppearing` boolean must switch to the second argument
- the shown state no longer forces inline `opacity: 1`, so a child's own `opacity-*` class now applies while visible (previously it was overridden while shown)
- express the hidden state via the `invisible` and `opacity-0` classes instead of inline `visibility`/`opacity` styles, and merge the child's `className` via `twMerge`
- the object form of `timeout` now sets the CSS transition duration correctly (previously it produced an invalid inline value)

### Slide

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props and the direction mapping are unchanged
- `onEnter`/`onExited` now receive the transitioning DOM node, exactly as described for Fade above
- express the hidden state via `translate-*` and `invisible` classes instead of inline `transform`/`visibility` styles, so a child's own `transform` is preserved while sliding and `transitionend` listeners observe `propertyName: 'translate'`
- the object form of `timeout` now sets the CSS transition duration correctly (previously it produced an invalid inline value)

### Backdrop

- compose the Tailwind-based Fade so react-transition-group is no longer in the dependency tree
- merge the consumer `className` via `twMerge` so consumer utilities now win on conflicts, and remove the redundant `bg-black` class and a dead `-webkit-tap-highlight-color-transparent` class (no visual change)

### TailwindMerge

- remove the unused react-transition-group dependency
