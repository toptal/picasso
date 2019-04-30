import { Breakpoints } from '@material-ui/core/styles/createBreakpoints'

export const screens = function (...sizes: string[]) {
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

const breakpoints: Partial<Breakpoints> = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1920
  }
}

export const breakpointsList = {
  small: breakpoints.values!.sm,
  medium: breakpoints.values!.md,
  large: breakpoints.values!.lg,
  'extra-large': breakpoints.values!.xl
}

export default breakpoints
