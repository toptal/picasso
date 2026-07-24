# @toptal/picasso-tooltip

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Raise the `react` and `react-dom` peer-dependency floor to React 17.

  - raise the `react` and `react-dom` peer-dependency floor from `>=16.12.0` to `>=17.0.0` across all Picasso packages — **React 16 is no longer supported**. Picasso components now depend on `@base-ui/react`, which requires React 17+ (`^17 || ^18 || ^19`), so React 16 could no longer be honored in practice.
  - this is a peer-range change only — no runtime or API changes. Existing upper bounds are untouched: packages currently capped at `<19.0.0` stay capped (lifting that cap to admit React 19 is tracked separately in PF-2236 / PF-2262).
  - consumer action: ensure `react` and `react-dom` resolve to `>=17`. [PF-2237]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Re-baseline the entire Picasso library to a single unified major version (v100) as part of the @base-ui/react modernization.

  - all Picasso packages are released together at v100.0.0 as one unified version.
  - no API or behavior change comes from this re-baseline itself; see each package's changelog for the specific modernization changes it received.

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

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
  `toReactEvent`. `onTransitionExiting` fires when the close transition BEGINS
  and `onTransitionExited` when it FINISHES — the same split MUI's `Grow`
  provided (base-ui exposes only a single transition-complete callback, so the
  two are re-separated internally).
- keep the trigger↔popup `aria-describedby` association even when no `id` is
  supplied: MUI v4 generated a fallback id so screen readers announced the
  tooltip as the trigger's description; base-ui wires no `aria-describedby` of
  its own, so Picasso now generates a stable fallback id (used for both the
  popup's `id` and the trigger's `aria-describedby`) whenever the consumer omits
  one. A consumer-supplied `id` or `aria-describedby` still takes precedence.
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
- drop the `@material-ui/core` peer dependency.
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
  re-anchoring to the collapsed rect, and no longer visibly re-positions once the
  Dropdown's reveal animation finishes. Mechanism: menu-item tooltips disable
  base-ui's anchor-tracking observers (ResizeObserver + layout-shift
  IntersectionObserver) so they never chase a late reflow, and anchor to a
  virtual element that reports the option's SETTLED rect (reconstructed from
  transform-independent layout metrics) instead of its live, mid-animation
  getBoundingClientRect — so the very first solve already lands on the final
  position and nothing moves afterward (base-ui positions a frame after mount,
  unlike master's synchronous popper.js, so without this the entrance solve
  measured the still-scaling menu). Every other anchor (Autocomplete options,
  buttons) keeps full tracking against the live rect, so nothing that relies on
  it regresses. The clipped-anchor style is `data-[anchor-hidden]:invisible`
  (visibility), NOT `:hidden` (display): a `display:none` popup measures 0×0 and
  the next solve then flings it to a garbage coordinate — a visible teleport on
  open.
- restore the entrance fade for tooltips that are `open` from their first
  render (e.g. a controlled `open` tooltip inside a Dropdown): base-ui only
  plays its enter transition on a false→true open change, so an open-at-mount
  tooltip previously popped in at full opacity. It now fades/scales in like
  every other tooltip (and like the MUI `Grow` entrance on the previous build),
  which also masks the sub-pixel settle of the first position. Hover/focus/tap
  tooltips are unaffected.

### Minor Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

### Patch Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Tooltip

- fix a regression where clicking a tooltip trigger during the hover-open delay
  (the classic "point at a `?` info icon and click within ~200ms" gesture) left
  the tooltip permanently suppressed for that hover session — it only re-opened
  once the pointer left the trigger and re-entered, which never happens while
  the cursor sits on it. base-ui opens the tooltip synchronously on the
  mousedown-focus, so the trailing click read that transient open and
  dismissed-then-latched it shut. A click that lands while a hover-open is
  still pending now lets the hover win instead of suppressing it; a click after
  the tooltip has deliberately opened still dismisses as before. This also
  unblocks consumer tests that `.click()` a tooltip trigger. [PF-2245]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Tooltip

- suppress opening on pointer-initiated focus. A `mousedown` that focuses a
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
- the pointer-focus suppression now also applies to controlled tooltips: a
  pointer-initiated focus no longer calls `onOpen` on a controlled tooltip
  either. This is the only controlled-mode behavior change — hover-timing, the
  click-dismiss latch and follow-cursor roam-hide keep their original
  uncontrolled-only gating, so a controlled tooltip still forwards base-ui's
  hover-open to `onOpen` as before. See
  `docs/decisions/23-tooltip-open-arbitration.md`. [PF-2253]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Upgrade `@base-ui/react` from 1.4.1 to 1.6.0
  No consumer-facing API changes. base-ui 1.6 emits a few additional data
  attributes for styling/animation (`data-popup-open`, `data-activation-direction`,
  `data-hidden`) and tightens its internal accessibility semantics (Accordion Root
  no longer carries `role="region"`, per APG; Modal focus guards use
  `aria-hidden` instead of `role="button"`).
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-provider@100.0.0
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-shared@100.0.0
  - @toptal/picasso-tailwind@100.0.0
  - @toptal/picasso-tailwind-merge@100.0.0
  - @toptal/picasso-typography@100.0.0

## 2.0.7

### Patch Changes

- Updated dependencies [[`c40f4aa`](https://github.com/toptal/picasso/commit/c40f4aa6b465a22b54a316c1088b59cd63724b9d)]:
  - @toptal/picasso-typography@5.1.0

## 2.0.6

### Patch Changes

- Updated dependencies [[`440f217`](https://github.com/toptal/picasso/commit/440f217c1748d09beeca90e5277d2137d4251897)]:
  - @toptal/picasso-shared@16.0.0
  - @toptal/picasso-typography@5.0.1
  - @toptal/picasso-utils@4.0.1

## 2.0.5

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-typography@5.0.0
  - @toptal/picasso-utils@4.0.0

## 2.0.4

### Patch Changes

- [#4797](https://github.com/toptal/picasso/pull/4797) [`c90ccde`](https://github.com/toptal/picasso/commit/c90ccdefa944fc3576bcccb060bb68119a7807e6) Thanks [@sashuk](https://github.com/sashuk)!
- stop using deprecated way of specifying default component property values (`.defaultProps` will not be supported in the future, please see [this React issue](https://github.com/facebook/react/issues/29233) for details)

## 2.0.3

### Patch Changes

- Updated dependencies [[`dae5bce`](https://github.com/toptal/picasso/commit/dae5bce794a5c4f6406449c83a6e425cfcafff0f)]:
  - @toptal/picasso-typography@4.0.4

## 2.0.2

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-typography@4.0.3

## 2.0.1

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-typography@4.0.2

## 2.0.0

### Major Changes

- [#4540](https://github.com/toptal/picasso/pull/4540) [`031e242`](https://github.com/toptal/picasso/commit/031e242924442575d7dbafcc8a644b5ec03658de) Thanks [@sashuk](https://github.com/sashuk)!

### Autocomplete, FileInput, Checkbox, Tooltip, Switch, Input, Radio, Form

- breaking change: components no longer export `Props` type. Import prop types as `component name + Props` (e.g. `AutocompleteProps`, `FileInputProps`, etc.)

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-typography@4.0.1

## 1.1.5

### Patch Changes

- Updated dependencies [[`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f)]:
  - @toptal/picasso-typography@4.0.0

## 1.1.4

### Patch Changes

- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-typography@3.0.0

## 1.1.3

### Patch Changes

- Updated dependencies [[`2820f38`](https://github.com/toptal/picasso/commit/2820f38931f1b2736c4ad20b5609ca562da0d515)]:
  - @toptal/picasso-typography@2.0.2

## 1.1.2

### Patch Changes

- Updated dependencies [[`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-typography@2.0.1

## 1.1.1

### Patch Changes

- Updated dependencies [[`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee)]:
  - @toptal/picasso-typography@2.0.0

## 1.1.0

### Minor Changes

- [#4208](https://github.com/toptal/picasso/pull/4208) [`977da669eaa4ee5aefbe2acda773e3621e5981c4`](https://github.com/toptal/picasso/commit/977da669eaa4ee5aefbe2acda773e3621e5981c4) Thanks [@toptalwadiibasmi](https://github.com/toptalwadiibasmi)!
- add Tooltip `offset` property to shift tooltip position from the left and the top.

## 1.0.2

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-typography@1.0.2

## 1.0.1

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-typography@1.0.1
  - @toptal/picasso-utils@1.0.1
