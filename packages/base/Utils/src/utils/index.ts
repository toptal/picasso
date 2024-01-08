import { alpha, lighten, darken, spacings } from '@toptal/picasso-shared'

import * as TransitionUtils from './Transitions'

const colorUtils = {
  alpha,
  lighten,
  darken,
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
  gradients,
  generateRandomString,
  generateRandomStringOrGetEmptyInTest,
  sizes,
} from '@toptal/picasso-provider'
export { useIsomorphicLayoutEffect, isBrowser } from '@toptal/picasso-shared'

export { default as ClickAwayListener } from '@material-ui/core/ClickAwayListener'

export { capitalize } from './capitalize'
export { default as disableUnsupportedProps } from './disable-unsupported-props'
export { type FeatureOptions } from './disable-unsupported-props'
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
export { default as useInterval } from './useInterval'
export { default as useOnScreen } from './useOnScreen'
export { default as useMouseEnter } from './useMouseEnter'
export { default as sum } from './sum'
export type { ReferenceObject } from './use-width-of'
export { default as useMultipleForwardRefs } from './use-multiple-forward-refs'
export { usePageScrollLock } from './use-page-scroll-lock'
export { AVATAR_INITIALS_LIMIT } from './constants'

export const Transitions = TransitionUtils

export { useNotifications } from './Notifications'
export { useModal } from './Modal'
export * from './Modal'

export { formatAmount, DEFAULT_CURRENCY, DEFAULT_LOCALE } from './Formatters'

export type { FormatAmount } from './Formatters'
export * from './get-react-node-text-content'

export * from './Colors'
export * from './Formatters'
export * from './Gradients'
export * from './Modal'
export * from './Notifications'
export * from './Transitions'

export {
  useDeprecationWarning,
  usePropDeprecationWarning,
} from './use-deprecation-warnings'

export { spacings }

export const {
  SPACING_0,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  SPACING_8,
  SPACING_10,
  SPACING_12,
} = spacings
