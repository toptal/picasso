import { Layout } from './layout'
import { Sizes } from './sizes'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: string[]) => string
  }
}
