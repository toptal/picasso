import type { BreakpointKeys } from './breakpoints'
import type { Layout } from './layout'
import type { Sizes } from './sizes'
import type { Forms } from './forms'
import type spacings from './spacings'
import type { PicassoSpacing } from './spacings'

declare module '@material-ui/core/styles' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: BreakpointKeys[]) => string
    spacings: Record<keyof typeof spacings, PicassoSpacing>
    forms: Forms
  }

  interface ThemeOptions {
    layout?: Layout
    sizes?: Sizes
    screens?: (...sizes: BreakpointKeys[]) => string
    spacings?: Record<keyof typeof spacings, PicassoSpacing>
    forms?: Forms
  }

  interface ThemeOptions {
    layout?: Layout
    sizes?: Sizes
    screens?: (...sizes: BreakpointKeys[]) => string
  }
}
