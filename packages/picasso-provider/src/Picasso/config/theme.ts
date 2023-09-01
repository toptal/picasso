import type { BreakpointKeys } from './breakpoints'
import type { Layout } from './layout'
import type { Sizes } from './sizes'

declare module '@material-ui/core/styles' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: BreakpointKeys[]) => string
  }

  interface ThemeOptions {
    layout?: Layout
    sizes?: Sizes
    screens?: (...sizes: BreakpointKeys[]) => string
  }
}
