---
'@toptal/picasso-dropdown': patch
---

### Dropdown
- Remove the `@mui/base` (`ClickAwayListener`) and `@material-ui/core` (`Grow`, `PopperPlacementType`) dependencies; public API and behavioral parity unchanged.
- Click-away dismissal moves to a co-located `useClickAway` hook; the open/close grow transition moves from MUI `Grow` to Tailwind opacity/transform classes.
- The `placement` prop type is now a local string-literal union identical to `@material-ui/core`'s `PopperPlacementType` (same 12 members) — no removed values, no consumer-visible narrowing.
- The locally narrowed `classes?: { popper?, content? }` surface is preserved unchanged (used by external consumers).
