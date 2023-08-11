import { alpha, lighten, darken } from '@toptal/picasso-shared'

import * as TransitionUtils from './Transitions'

const colorUtils = {
  alpha,
  lighten,
  darken,
}

export { colorUtils }

/**
 * @property {number} 0 - spacing-0 resolves to 0 rem
 * @property {number} 1 - spacing-1 resolves to 0.25 rem
 */
export const spacing = {
  /** spacing-0 resolves to 0 rem */
  0: 0,
  /** spacing-1 resolves to 0.25 rem */
  1: 0.25,
}

export {
  breakpointsList as breakpoints,
  screens,
  isScreenSize,
  useBreakpoint,
  useScreens,
  shadows,
  colors as palette,
  gradients,
  generateRandomString,
  generateRandomStringOrGetEmptyInTest,
  sizes,
} from '@toptal/picasso-provider'
export { useIsomorphicLayoutEffect, isBrowser } from '@toptal/picasso-shared'

export { default as ClickAwayListener } from '@material-ui/core/ClickAwayListener'

export { capitalize } from './capitalize'
export { default as disableUnsupportedProps } from './disable-unsupported-props'
export { forwardRef, documentable } from './forward-ref'
export { default as getNameInitials } from './get-name-initials'
export { default as isBoolean } from './is-boolean'
export { default as isNumber } from './is-number'
export { default as isOverflown } from './is-overflown'
export { default as isPointerDevice } from './is-pointer-device'
export { default as isString } from './is-string'
export { default as isSubstring } from './is-substring'
export { default as kebabToCamelCase } from './kebab-to-camel-case'
export type { Maybe } from './monads'
export { default as noop } from './noop'
export { default as toTitleCase } from './to-title-case'
export { default as useCombinedRefs } from './use-combined-refs'
export { default as useSafeState } from './use-safe-state'
export { default as useWidthOf } from './use-width-of'
export { default as loaderPalette } from './loader-palette'
export { default as unsafeErrorLog } from './unsafe-error-log'
export { default as useBoolean } from './useBoolean/use-boolean'
export { default as sum } from './sum'
export type { ReferenceObject } from './use-width-of'
export { default as useMultipleForwardRefs } from './use-multiple-forward-refs'

export const Transitions = TransitionUtils

export { useNotifications } from './Notifications'
export { useModal } from './Modal'
export * from './Modal'

export { formatAmount, DEFAULT_CURRENCY, DEFAULT_LOCALE } from './Formatters'

export type { FormatAmount } from './Formatters'
export * from './get-react-node-text-content'

export {
  useDeprecationWarning,
  usePropDeprecationWarning,
} from './use-deprecation-warnings'
