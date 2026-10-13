---
'@toptal/picasso-utils': minor
'@toptal/picasso-collapse': minor
'@toptal/picasso-fade': major
'@toptal/picasso-slide': major
'@toptal/picasso-backdrop': major
'@toptal/picasso-tailwind-merge': patch
---

### Utils

- add `useTransitionStatus`, a timer-driven replacement for react-transition-group's `Transition` that returns the `status` and the running phase's `duration`
- add `getElementRef`, which reads an element's ref from `props.ref` on React 19 and `element.ref` on React 17 and 18, without the deprecation warning either one logs on the other
- export `isReact19OrNewer`, the check `getElementRef` and `useMultipleForwardRefs` branch on
- `useMultipleForwardRefs` runs the cleanup a React 19 callback ref returns instead of calling the ref again with `null`
- the `ClickAwayListener` component reads its child's ref with `getElementRef` (behavior unchanged)

### Collapse

- drop react-transition-group, whose `findDOMNode` React 19 removes. Public props are unchanged
- the animations start about 50 ms sooner
- unrecognized props, such as `data-private`, reach the DOM node
- the consumer `className` is merged last, so it overrides the component's own classes, such as `overflow-hidden`
- add the `CollapseProps` type and deprecate the misnamed `FadeProps` alias

### Fade

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- drop react-transition-group for Tailwind classes. Public props are unchanged
- **consumer action**: `onEnter` and `onExited` receive the transitioning DOM node, as their types declared. A callback that read `onEnter`'s first argument as `isAppearing` reads the second one
- **consumer action (types)**: the node is `null` for a child that takes no ref, so the parameter is typed `HTMLElement | null`
- the hidden state is the `invisible` and `opacity-0` classes, merged with the child's `className` by `twMerge`, and a child's own `opacity-*` class applies while shown, since Fade no longer sets an inline `opacity: 1`
- a `transition-*` utility on the child gives way to Fade's `transition-opacity`; `transition`, `transition-all` and `transition-none` stay

### Slide

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- drop react-transition-group for Tailwind classes. Public props and the direction mapping are unchanged
- **consumer action**: `onEnter` and `onExited` receive the transitioning DOM node, or `null`, as described for Fade
- **consumer action**: `transitionend` listeners see `propertyName: 'translate'`, since the offset is a `translate-*` class instead of an inline `transform`. A child's own inline `transform` is kept
- a `transition-*` utility on the child gives way to Slide's `transition-transform`; `transition`, `transition-all` and `transition-none` stay
- a child's `translate-*` utility along the slide axis applies while shown, so `-translate-x-1/2` centering holds

### Collapse, Fade and Slide

- the object form of `timeout` sets each direction's duration, including `appear`, where it produced an invalid inline value

### Backdrop

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- build on the Tailwind Fade, so react-transition-group leaves the dependency tree
- the consumer `className` is merged last, so it wins on conflicts

### TailwindMerge

- remove the unused react-transition-group dependency
