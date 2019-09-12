import { useState, useEffect } from 'react'
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
