---
'@toptal/picasso-collapse': minor
---

### Collapse

- drop the react-transition-group dependency, whose `findDOMNode` path React 19 removes, and reimplement on the shared timer-driven `useTransitionStatus` hook. Public props are unchanged
- the expand and collapse animations start about 50 ms sooner: the height handoff runs on the next frame instead of after an internal delay
- the object form of `timeout` now sets the CSS transition duration correctly per direction, including a distinct `appear` duration for the mount transition (previously it produced an invalid inline value)
- unrecognized props (including `data-private`) now reach the rendered DOM node — previously they were silently dropped
- add the `CollapseProps` type export and deprecate the misnamed `FadeProps` re-export (kept as an alias, so no action is required yet)
- prop descriptions are corrected (`children`, `appear` and `onEnter` were stale or wrong) and promoted to JSDoc, so they surface in IDE tooltips and generated docs
