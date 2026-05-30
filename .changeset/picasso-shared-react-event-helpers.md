---
'@toptal/picasso-shared': minor
---

### picasso-shared

- add `toReactEvent<R>(event)` boundary-cast helper for bridging native DOM `Event` to React.SyntheticEvent variants at the `@base-ui/react` ↔ Picasso form-component interface. Proxy-based: preserves native event identity, synthesizes the four React-SyntheticEvent shim methods (`nativeEvent`, `persist`, `isDefaultPrevented`, `isPropagationStopped`).
- add `toReactChangeEvent<T>(event)` specialized helper for form-input `onChange` adapters. Constrains `T` to `HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement` and dev-warns when the event target is not a DOM element. Delegates to `toReactEvent` for the Proxy machinery.
