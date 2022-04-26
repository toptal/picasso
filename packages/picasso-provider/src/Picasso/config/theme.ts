import { BreakpointKeys } from './breakpoints'
import { Layout } from './layout'
import { Sizes } from './sizes'

declare module '@mui/material/styles' {
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
