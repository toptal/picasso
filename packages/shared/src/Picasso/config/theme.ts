import { createMuiTheme } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'

import layout, { Layout } from './layout'
import sizes, { Sizes } from './sizes'
import { paletteLight, paletteDark } from './palette'
import breakpoints, { screens } from './breakpoints'
import transitions from './transitions'
import typography from './typography'
import shadows from './shadows'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    layout: Layout
    sizes: Sizes
    screens: (...sizes: string[]) => string
  }
}

const createTheme = (palette: Palette) =>
  createMuiTheme({
    palette,
    layout,
    transitions,
    sizes,
    breakpoints,
    screens,
    shadows,
    typography,
    props: {
      MuiButtonBase: {
        disableRipple: true
      },
      MuiList: {
        disablePadding: true
      },
      MuiPaper: {
        square: true
      },
      MuiOutlinedInput: {
        notched: false
      }
    }
  })

const themes = {
  light: createTheme(paletteLight),
  dark: createTheme(paletteDark)
}

export default themes
