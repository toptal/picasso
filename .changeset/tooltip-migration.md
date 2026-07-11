---
'@toptal/picasso-tooltip': major
---

### Tooltip

- re-implement on `@base-ui/react` (behavioral parity target): the single
  `@material-ui/core` `Tooltip` is replaced by the compound parts
  `Tooltip.Provider` + `Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` +
  `Tooltip.Positioner` + `Tooltip.Popup` + `Tooltip.Arrow`. JSS styling moves
  to Tailwind.
- public prop surface is preserved (`content`, `placement`, `compact`,
  `maxWidth`, `interactive`, `open`, `delay`, `followCursor`, `disablePortal`,
  `preventOverflow`, `offset`, `container`, `tooltipRef`, `onOpen`, `onClose`,
  `onTransitionExiting`, `onTransitionExited`). `onOpen`/`onClose` keep the
  `(event) => void` signature, adapted over base-ui's `onOpenChange` via
  `toReactEvent`.
- the `PlacementType` type is now an explicit string union instead of an alias
  to MUI's `TooltipProps['placement']`. The members are byte-identical to the
  MUI v4 type (the same 12 values; `undefined` is still admitted via the
  optional `placement?:`), so this is a non-breaking type-only replacement — no
  consumer change required.
- interaction behavior is preserved: hover/focus opens, clicking an open
  tooltip dismisses it and suppresses re-opening until the pointer leaves the
  trigger, and `interactive` keeps the popup open while the pointer is over its
  content. This is implemented with a controlled-`open` layer on top of
  `@base-ui/react` (Picasso decides whether to honor base-ui's hover/focus
  open requests) since base-ui's hover model has no native dismiss-and-stay-
  dismissed.
- breaking DOM-lifecycle change: the popup now unmounts when closed (it was
  kept mounted-but-hidden under MUI). Consumer DOM queries / tests that assert
  a closed tooltip's content is "not visible" should assert it "does not exist".
- lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the
  `< 19.0.0` cap). Drop the `@material-ui/core` peer dependency.
- seat the arrow closer to menu-item anchors (`role="menuitem"`): a menu
  item's box includes top padding, so the standard flush gap points the tip at
  that padding (the strip above the option); menu-item tooltips now pull the
  popup ~7px closer so the tip seats ~4px into the option's box, touching the
  option it describes. Every other anchor keeps the standard gap.
- fix inside-Dropdown / inside-Autocomplete positioning (PF-2224): a tooltip
  open on a `Menu.Item` no longer snaps ~4px off its anchor on the first scroll,
  no longer chases late sub-pixel reflows (e.g. a web font settling a second
  after paint, which nudged the option row and made the popup visibly drift — a
  jitter the old popper.js build never had), and no longer strands at the
  viewport corner when the Dropdown scrolls its menu out of a scroll container —
  the popup now hides with its anchor (`data-[anchor-hidden]`) instead of
  re-anchoring to the collapsed rect. Mechanism: menu-item tooltips disable
  base-ui's anchor-tracking observers (ResizeObserver + layout-shift
  IntersectionObserver) and instead settle via a deterministic nudge the
  Dropdown emits when its reveal animation finishes (see the Dropdown
  changeset); every other anchor (Autocomplete options, buttons) keeps full
  tracking, so nothing that relies on it regresses. The clipped-anchor style is
  `data-[anchor-hidden]:invisible` (visibility), NOT `:hidden` (display): a
  `display:none` popup measures 0×0 and the next solve then flings it to a
  garbage coordinate — a visible teleport on open.
- restore the entrance fade for tooltips that are `open` from their first
  render (e.g. a controlled `open` tooltip inside a Dropdown): base-ui only
  plays its enter transition on a false→true open change, so an open-at-mount
  tooltip previously popped in at full opacity. It now fades/scales in like
  every other tooltip (and like the MUI `Grow` entrance on the previous build),
  which also masks the sub-pixel settle of the first position. Hover/focus/tap
  tooltips are unaffected.
