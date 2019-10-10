import { useState, useEffect, useCallback } from 'react'
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const screens = function (...sizes: BreakpointKeys[]) {
  const { sm, md, lg } = breakpoints.values!

  const mediaQueries: {
    [key: string]: string
  } = {
    small: `(max-width: ${sm}px)`,
    medium: `(min-width: ${sm}px) and (max-width: ${md}px)`,
    large: `(min-width: ${md}px) and (max-width: ${lg}px)`,
    'extra-large': `(min-width: ${lg}px)`
  }

  return `@media ${sizes.map(size => mediaQueries[size]).join(', ')}`
}

export const isScreenSize = function (
  size: keyof BreakpointsList,
  currentSize?: number
): boolean {
  const { sm, md, lg, xl } = breakpoints.values!

  const breakPointBoundaries: {
    [key: string]: (width: number) => boolean
  } = {
    small: (width: number) => width < sm,
    medium: (width: number) => width >= sm && width < md,
    large: (width: number) => width >= lg && width < xl,
    'extra-large': (width: number) => width >= xl
  }

  return breakPointBoundaries[size](currentSize || window.innerWidth)
}

/**
 * Gets a screen size nickname that corresponds to the given screen size.
 *
 * For the list of breakpoint names and pixel-values we use in designs, check
 * https://picasso.toptal.net/?path=/story/utils-folder--breakpoints
 *
 * @param {number} size Screen size
 */
export const screenSizeToBreakpointKey = function (
  size: number
): BreakpointKeys {
  const { sm, md, lg } = breakpoints.values!

  if (size < sm) {
    return 'small'
  } else if (size >= sm && size < md) {
    return 'medium'
  } else if (size >= md && size < lg) {
    return 'large'
  } else {
    // if (size >= lg)
    return 'extra-large'
  }
}

export const useScreenSize = () => {
  const [size, setSize] = useState(window.innerWidth)

  const updateSize = () => setSize(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return size
}

export const useBreakpoint = (sizes: BreakpointKeys[] | BreakpointKeys) =>
  useMediaQuery(screens(...([] as BreakpointKeys[]).concat(sizes)))

/**
 * Returns a function that picks a value from a {screenSize=>anyValue} object map.
 *
 * The function returned accepts 2 arguments:
 * 1. An object mapping values to screen size nicknames, e.g.
 *   {small: 'secondary-blue', large: 'primary-green'}
 * 2. A default value to use if no keys match in the object
 *
 * The function returns a value from the first argument that corresponds to the current
 * screen size, or the default value, if no corresponding key found.
 *
 * The returned function is memoized per screen size name.
 *
 * @example <caption>Varying both `variant` prop and button text with using the hook</caption>
 * const screens = useScreens()
 * <Button
 *   variant={screens(
 *     {
 *       small: 'secondary-blue',
 *       large: 'primary-green'
 *     },
 *     'primary-blue'
 *   )}
 * >
 * {screens(
 *   {
 *     small: 'small (secondary-blue)',
 *     large: 'large (primary-green)'
 *   },
 *   'default (primary-blue)'
 * )}
 * </Button>
 */
export const useScreens = () => {
  // Get current screen size in pixels, e.g. 800
  const currentSize = useScreenSize()

  // Convert the retrieved screen size in pixels (e.g. 800)
  // to its corresponding screen size name (e.g. 'large')
  const screenKey = screenSizeToBreakpointKey(currentSize)

  // For every screenKey value, memoize the instance of a function
  // that picks a property from an object by screen name,
  // and return this memoized version of the function.
  return useCallback((
    valuesByScreen: Partial<Record<BreakpointKeys, any>>,
    defaultValue: any = undefined
  ) => {
    if (screenKey in valuesByScreen) {
      return valuesByScreen[screenKey]
    }

    return defaultValue
  }, [screenKey])
}

const breakpoints: Partial<Breakpoints> = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1920
  }
}

type BreakpointKeys = 'small' | 'medium' | 'large' | 'extra-large'

type BreakpointsList = {
  [key: string]: number
}

export const breakpointsList: BreakpointsList = {
  small: breakpoints.values!.sm,
  medium: breakpoints.values!.md,
  large: breakpoints.values!.lg,
  'extra-large': breakpoints.values!.xl
}

export default breakpoints
