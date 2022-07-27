import { Layout } from './layout'
import { Sizes } from './sizes'

declare module '@material-ui/core/styles' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: string[]) => string
  }
}
