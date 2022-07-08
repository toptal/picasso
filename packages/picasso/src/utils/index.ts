import { alpha, lighten, darken } from '@toptal/picasso-shared'

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
  generateRandomString,
  generateRandomStringOrGetEmptyInTest,
} from '@toptal/picasso-provider'
export { useIsomorphicLayoutEffect, isBrowser } from '@toptal/picasso-shared'

export { default as ClickAwayListener } from '@mui/material/ClickAwayListener'

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
export { default as unsafeErrorLog } from './unsafe-error-log'
export { default as sum } from './sum'
export type { ReferenceObject } from './use-width-of'

export * from './get-react-node-text-content'
