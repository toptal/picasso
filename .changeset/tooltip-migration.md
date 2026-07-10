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
  and no longer strands at the viewport corner when the Dropdown scrolls its
  menu out of a scroll container — the popup now hides with its anchor
  (`data-[anchor-hidden]`) instead of re-anchoring to the collapsed rect. The
  tooltip keeps base-ui's full anchor tracking so it settles onto the true
  (post-animation) geometry; the Dropdown emits a settle-nudge once its reveal
  animation finishes (see the Dropdown changeset), which is what removes the
  first-paint mis-measurement without freezing the popup at a pre-settle spot.
