import { Theme, ThemeOptions, createMuiTheme } from '@material-ui/core/styles'
import { Overrides } from '@material-ui/core/styles/overrides'
import { deepmerge } from '@material-ui/utils'

import {
  palette,
  layout,
  breakpoints,
  screens,
  transitions,
  typography,
  sizes,
  shadows
} from './config'

const picasso = {
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
}

class Provider {
  theme: Theme

  constructor(theme: Theme) {
    this.theme = theme
  }

  disableResponsiveStyle() {
    this.theme.layout.contentMinWidth = '768px'
  }

  override(getOverride: (theme: Theme) => Partial<Overrides>) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  extendThemeOverrides(newOverride: Partial<Overrides>) {
    const overrides = this.theme.overrides || {}

    Object.assign(overrides, newOverride)

    this.theme.overrides = overrides
  }

  extendTheme(theme: ThemeOptions) {
    this.theme = deepmerge(this.theme, theme)
  }
}

const PicassoProvider = new Provider(createMuiTheme(picasso))

export default PicassoProvider
