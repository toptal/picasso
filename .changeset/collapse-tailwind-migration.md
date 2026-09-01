---
'@toptal/picasso-collapse': minor
---

### Collapse

- drop the react-transition-group dependency — the last consumer in the kit; its `Transition` ran without `nodeRef`, so it reached `findDOMNode`, which React 19 removes — and reimplement on the shared timer-driven `useTransitionStatus` hook. Public props are unchanged
- the height handoff now uses `requestAnimationFrame` instead of an internal 50 ms delay, so the transition starts about 50 ms sooner and pending frames are cleaned up on unmount
- the object form of `timeout` now sets the CSS transition duration correctly per direction (previously it produced an invalid inline value)
- unrecognized props (including `data-private`) now reach the rendered DOM node — previously they were silently dropped
- add the `CollapseProps` type export and deprecate the misnamed `FadeProps` re-export (kept as an alias, so no action is required yet)
- the `react` peer range stays capped at `< 19.0.0`; lifting that cap library-wide is tracked separately in PF-2262
