---
'@toptal/picasso-collapse': minor
---

### Collapse

- drop the react-transition-group dependency — the kit's last direct consumer; its `Transition` ran without `nodeRef`, so it reached `findDOMNode`, which React 19 removes — and reimplement on the shared timer-driven `useTransitionStatus` hook. Public props are unchanged. (recharts still pulls react-transition-group transitively via react-smooth, but only for `AnimateGroup`, which recharts never renders)
- the height handoff now uses `requestAnimationFrame` instead of an internal 50 ms delay, so the transition starts about 50 ms sooner and pending frames are cleaned up on unmount; the exit's start height is pinned with a forced reflow so the collapse animation cannot degrade into a snap
- the object form of `timeout` now sets the CSS transition duration correctly per direction, including a distinct `appear` duration for the mount transition (previously it produced an invalid inline value)
- unrecognized props (including `data-private`) now reach the rendered DOM node — previously they were silently dropped
- add the `CollapseProps` type export and deprecate the misnamed `FadeProps` re-export (kept as an alias, so no action is required yet)
- prop descriptions are corrected (`children`, `appear` and `onEnter` were stale or wrong) and promoted to JSDoc, so they surface in IDE tooltips and generated docs
- the `react` peer range stays capped at `< 19.0.0`; lifting that cap library-wide is tracked separately in PF-2262
