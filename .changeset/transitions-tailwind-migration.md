---
'@toptal/picasso-utils': minor
'@toptal/picasso-fade': minor
'@toptal/picasso-slide': minor
'@toptal/picasso-backdrop': patch
'@toptal/picasso-tailwind-merge': patch
---

### Utils

- add `useTransitionStatus` hook and `getTransitionTimeouts` helper — a timer-driven replacement for react-transition-group's `Transition` state machine with identical callback timing

### Fade

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props and callback timing are unchanged
- express the hidden state via the `invisible` and `opacity-0` classes instead of inline `visibility`/`opacity` styles, and merge the child's `className` via `twMerge`
- the object form of `timeout` now sets the CSS transition duration correctly (previously it produced an invalid inline value)

### Slide

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props, the direction mapping and callback timing are unchanged
- express the hidden state via `translate-*` and `invisible` classes instead of inline `transform`/`visibility` styles, so a child's own `transform` is preserved while sliding and `transitionend` listeners observe `propertyName: 'translate'`
- the object form of `timeout` now sets the CSS transition duration correctly (previously it produced an invalid inline value)

### Backdrop

- compose the Tailwind-based Fade so react-transition-group is no longer in the dependency tree
- remove the redundant `bg-black` class and a dead `-webkit-tap-highlight-color-transparent` class (no visual change) and merge the consumer `className` via `twMerge` so consumer utilities win on conflicts

### TailwindMerge

- remove the unused react-transition-group dependency
