---
'@toptal/picasso-shared': patch
---

### picasso-shared

- Fix `toReactEvent` / `toReactChangeEvent`: bind forwarded native event methods (`preventDefault`, `stopPropagation`, …) to the underlying native event. Without binding they were invoked with the Proxy as `this`, throwing "Illegal invocation" in real browsers when a consumer `onChange` called e.g. `event.stopPropagation()`.
