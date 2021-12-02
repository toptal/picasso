import { alpha, lighten, darken } from '@toptal/picasso-shared'

import * as TransitionUtils from './Transitions'

const colorUtils = {
  alpha,
  lighten,
  darken
}

export { colorUtils }

export {
  breakpointsList as breakpoints,
  screens,
  isScreenSize,
  useBreakpoint,
  useScreens,
  shadows,
  colors as palette,
  generateRandomString,
  generateRandomStringOrGetEmptyInTest
} from '@toptal/picasso-provider'

export { default as ClickAwayListener } from '@material-ui/core/ClickAwayListener'

export { capitalize } from './capitalize'
export { dashToCamelCase } from './dash-to-camel-case'
export { default as disableUnsupportedProps } from './disable-unsupported-props'
export { forwardRef, documentable } from './forward-ref'
export { default as getNameInitials } from './get-name-initials'
export { default as isBoolean } from './is-boolean'
export { default as isNumber } from './is-number'
export { default as isOverflown } from './is-overflown'
export { default as isPointerDevice } from './is-pointer-device'
export { default as isBrowser } from './is-browser'
export { default as isString } from './is-string'
export { default as isSubstring } from './is-substring'
export { default as kebabToCamelCase } from './kebab-to-camel-case'
export { Maybe } from './monads'
export { default as noop } from './noop'
export { default as toTitleCase } from './to-title-case'
export { default as useCombinedRefs } from './use-combined-refs'
export { default as useSafeState } from './use-safe-state'
export { default as useWidthOf } from './use-width-of'
export { default as unsafeErrorLog } from './unsafe-error-log'
export { default as sum } from './sum'
// NOTE: Prevent type removal on prettier format
// prettier-ignore
export type { ReferenceObject } from './use-width-of'

export const Transitions = TransitionUtils

export { useNotifications } from './Notifications'
export { useModal } from './Modal'
export * from './Modal'

export { formatAmount, DEFAULT_CURRENCY, DEFAULT_LOCALE } from './Formatters'

// NOTE: Prevent type removal on prettier format
// prettier-ignore
export type { FormatAmount } from './Formatters'
