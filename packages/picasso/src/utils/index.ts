import * as TransitionUtils from './Transitions'

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
} from '@toptal/picasso-shared'

export { default as useWidthOf } from './use-width-of'
export { default as useCombinedRefs } from './use-combined-refs'

export { default as ClickAwayListener } from '@material-ui/core/ClickAwayListener'

export { default as isString } from './is-string'
export { default as disableUnsupportedProps } from './disable-unsupported-props'
export { default as isNumber } from './is-number'
export { default as isBoolean } from './is-boolean'
export { default as isPointerDevice } from './is-pointer-device'
export { default as isSubstring } from './is-substring'
export { default as getNameInitials } from './get-name-initials'
export { default as kebabToCamelCase } from './kebab-to-camel-case'
export { default as toTitleCase } from './to-title-case'
export { capitalize } from './capitalize'

export const Transitions = TransitionUtils

export { Maybe } from './monads'
export { useNotifications } from './Notifications'
export { useModals } from './Modal'
export * from './Modal'
