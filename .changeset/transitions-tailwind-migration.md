---
'@toptal/picasso-utils': minor
'@toptal/picasso-fade': minor
'@toptal/picasso-slide': minor
'@toptal/picasso-backdrop': minor
'@toptal/picasso-tailwind-merge': patch
---

### Utils

- add `useTransitionStatus`, a timer-driven replacement for react-transition-group's `Transition` state machine that matches its settle timing. It returns the transition `status` together with the `duration` of the running phase, resolved from the number or per-phase object form of `timeout`
- add `getElementRef`, which reads an element's ref from where the running React major stores it: `props.ref` on React 19 and newer, where `element.ref` is deprecated and warns on every access, and `element.ref` on React 17 and 18, where dev builds warn on `props.ref` instead
- switch `ClickAwayListener` to `getElementRef` and `useMultipleForwardRefs` instead of its own `element.ref` cast and hand-rolled ref forwarding, so DatePicker, Dropdown and MenuItem inherit the version-aware read (behavior unchanged)
- make `useMultipleForwardRefs` run the cleanup a React 19 callback ref returns instead of calling the ref again with `null`, so a cleanup ref passed through Fade, Slide, Collapse, Backdrop or `ClickAwayListener` works as it does on a plain element. React 17 and 18 are unchanged

### Fade

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props are unchanged
- `onEnter`/`onExited` now receive the transitioning DOM node, as their types always declared. Under react-transition-group's `nodeRef` mode the old runtime actually called `onEnter(isAppearing, undefined)` and `onExited()` with no arguments — consumers reading the first `onEnter` argument as the `isAppearing` boolean must switch to the second argument
- the shown state no longer forces inline `opacity: 1`, so a child's own `opacity-*` class now applies while visible (previously it was overridden while shown)
- express the hidden state via the `invisible` and `opacity-0` classes instead of inline `visibility`/`opacity` styles, and merge the child's `className` via `twMerge`
- the object form of `timeout` now sets the CSS transition duration correctly per direction, including a distinct `appear` duration for the mount transition (previously it produced an invalid inline value)
- known limitations: `onEnter` and `onExited` run only when the child attaches the ref Fade passes it (a DOM element, or a component that forwards its ref), where react-transition-group called them regardless; a `transition-*` utility on the child replaces Fade's `transition-opacity`, so the fade no longer animates; and `in` must be a boolean, since an `undefined` that becomes `false` starts an exit

### Slide

- reimplement with Tailwind classes and drop the react-transition-group dependency; public props and the direction mapping are unchanged
- `onEnter`/`onExited` now receive the transitioning DOM node, exactly as described for Fade above
- express the hidden state via `translate-*` and `invisible` classes instead of inline `transform`/`visibility` styles, so a child's own inline `transform` is preserved while sliding and `transitionend` listeners observe `propertyName: 'translate'`
- the object form of `timeout` now sets the CSS transition duration correctly per direction, including a distinct `appear` duration for the mount transition (previously it produced an invalid inline value)
- known limitations: the same as Fade's, with `transition-transform` in place of `transition-opacity`; a `translate-*` utility on the child along the slide axis is also replaced by Slide's position classes, so position such a child through a wrapper

### Backdrop

- compose the Tailwind-based Fade so react-transition-group is no longer in the dependency tree
- merge the consumer `className` via `twMerge` so consumer utilities now win on conflicts, and remove the redundant `bg-black` class and a dead `-webkit-tap-highlight-color-transparent` class (no visual change)

### TailwindMerge

- remove the unused react-transition-group dependency
