---
'@toptal/picasso-utils': minor
---

### Utils

- add `useTransitionStatus`, a timer-driven replacement for react-transition-group's `Transition` that returns the `status` and the running phase's `duration`
- add `getElementRef`, which reads an element's ref from `props.ref` on React 19 and `element.ref` on React 17 and 18, without the deprecation warning either one logs on the other
- export `isReact19OrNewer`, the check `getElementRef` and `useMultipleForwardRefs` branch on
- add the `NullableRefObject<T>` type, what `useRef<T>(null)` returns on every `@types/react` major
- `useMultipleForwardRefs` runs the cleanup a React 19 callback ref returns instead of calling the ref again with `null`
- the `ClickAwayListener` component reads its child's ref with `getElementRef` (behavior unchanged)
