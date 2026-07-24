---
'@toptal/picasso-dropdown': patch
---

### Dropdown
- Remove the `@mui/base` (`ClickAwayListener`) and `@material-ui/core` (`Grow`, `PopperPlacementType`) dependencies; public API and behavioral parity unchanged.
- Click-away dismissal now uses the shared `@toptal/picasso-utils` `ClickAwayListener` (the MUI-free replacement already used by DatePicker and Menu), instead of `@mui/base`'s listener.
- The open grow transition moves from MUI `Grow` to a CSS `@starting-style` entry animation (`transition-[opacity,scale]` + `starting:scale-75 starting:opacity-0`), resting at `scale-100`.
- The `placement` prop type is now imported from `@toptal/picasso-popper` (`PopperPlacementType`) instead of being redefined locally — same 12 members as `@material-ui/core`'s, no removed values, no consumer-visible narrowing.
- The locally narrowed `classes?: { popper?, content? }` surface is preserved unchanged (used by external consumers).
