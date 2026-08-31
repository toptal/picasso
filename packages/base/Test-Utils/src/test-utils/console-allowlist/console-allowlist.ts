/**
 * React `act()` warning emitted by Picasso's `Popper`.
 *
 * Popups are positioned by `@floating-ui/react`, which commits coordinates
 * asynchronously after render. React flags the resulting state update as
 * un-acted, but there is nothing to wrap: the update happens outside any
 * interaction the test performs. The warning is benign and infeasible to
 * suppress per-render, so repos that fail tests on console output should add
 * this to their allowlist rather than wrapping every `render`.
 *
 * @example
 * import { POPPER_ACT_WARNING } from '@toptal/picasso-test-utils'
 *
 * failOnConsole({
 *   silenceMessage: message => message.includes(POPPER_ACT_WARNING),
 * })
 */
export const POPPER_ACT_WARNING =
  'An update to Popper inside a test was not wrapped in act'
