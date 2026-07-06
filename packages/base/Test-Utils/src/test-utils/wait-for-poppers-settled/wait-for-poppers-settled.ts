// A popper positioned by `@floating-ui/react` (Dropdown/Menu/Popper) commits
// its coordinates a frame or two after open, driven by `autoUpdate` — so its
// `getBoundingClientRect()` keeps changing across animation frames right after
// it appears. happo captures a single serialized DOM snapshot; if that instant
// lands mid-settle, the popup (and anything measured from it) is captured a
// fraction of a pixel off, diffing against the baseline. Picasso stamps
// `x-placement` on the positioned floating node, so its presence marks a popper
// whose geometry must be at rest before happo snapshots.
//
// This mirrors the Cypress-Happo capture guard (`waitForPoppersToSettle` in
// `cypress/support/commands.jsx`) for the Storybook pipeline, where it plugs
// into `happo-plugin-storybook`'s per-story `waitFor` predicate — the plugin
// polls it (bounded by its own `renderTimeoutMs`) until it returns `true`, so
// there are no hardcoded durations. Intended usage from a story that renders an
// open floating-ui popper in its screenshotted state:
//
//   Story.parameters = { happo: { waitFor: createPoppersSettledWaitFor() } }
//
// Each call returns a fresh predicate with its own closure, so per-story /
// per-target runs never share settle state.

const readPopperBoxes = (): string => {
  const boxes: string[] = []

  document.querySelectorAll('[x-placement]').forEach(el => {
    const rect = el.getBoundingClientRect()

    // skip non-rendered nodes (display:none keepMounted poppers report 0×0)
    if (rect.width === 0 && rect.height === 0) {
      return
    }

    boxes.push(
      [rect.top, rect.left, rect.width, rect.height]
        .map(value => Math.round(value * 100) / 100)
        .join(',')
    )
  })

  return boxes.join('|')
}

/**
 * Builds a Happo `waitFor` predicate that resolves once every open
 * `@floating-ui/react` popper has finished positioning. Returns `true` only
 * when two consecutive reads of every visible popper's box are identical — i.e.
 * positioning has come to rest. When no popper is open the set is empty and the
 * two reads match immediately, so the predicate is a no-op for non-popper
 * stories.
 *
 * @returns {() => boolean} A predicate to pass as `parameters.happo.waitFor`
 */
export const createPoppersSettledWaitFor = (): (() => boolean) => {
  let previous: string | null = null

  return () => {
    const current = readPopperBoxes()
    const settled = previous !== null && current === previous

    previous = current

    return settled
  }
}
