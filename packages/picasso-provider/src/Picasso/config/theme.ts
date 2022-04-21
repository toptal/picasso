import { Layout } from './layout'
import { Sizes } from './sizes'

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: string[]) => string
  }
}
