---
'@toptal/picasso-tooltip': patch
---

### Tooltip

- Suppress opening on pointer-initiated focus. A `mousedown` that focuses a
  tooltip trigger made base-ui open the tooltip mid-click (its `useFocus`
  reports `trigger-focus`, and `matchesFocusVisible` treats that focus as
  focus-visible under jsdom and for typeable triggers such as inputs). The
  popup could then flash open over its own trigger and swallow the trailing
  click, leaving the wrapped control effectively unclickable. Picasso now
  tracks the input modality and honors base-ui's focus-open only when the focus
  was keyboard-driven; pointer-initiated focus no longer opens the tooltip.
  Keyboard focus still opens it, preserving accessibility. Note this is
  stricter than the pre-migration build for tooltip-wrapped inputs, which
  previously also flashed open on click. [PF-2253]
- The pointer-focus suppression now also applies to controlled tooltips: a
  pointer-initiated focus no longer calls `onOpen` on a controlled tooltip
  either. This is the only controlled-mode behavior change — hover-timing, the
  click-dismiss latch and follow-cursor roam-hide keep their original
  uncontrolled-only gating, so a controlled tooltip still forwards base-ui's
  hover-open to `onOpen` as before. See
  `docs/decisions/20-tooltip-open-arbitration.md`. [PF-2253]
