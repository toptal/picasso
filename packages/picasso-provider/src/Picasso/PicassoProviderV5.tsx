import {
  Theme,
  ThemeOptions,
  createTheme,
  Components
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import {
  palette,
  layout,
  breakpoints,
  screens,
  transitions,
  typography,
  sizes,
  shadows
} from './config-v5'

const picasso: ThemeOptions = {
  palette,
  layout,
  transitions,
  sizes,
  breakpoints,
  screens,
  shadows,
  typography,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiList: {
      defaultProps: {
        disablePadding: true
      }
    },
    MuiPaper: {
      defaultProps: {
        square: true
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        notched: false
      }
    }
  }
}

class ProviderV5 {
  theme: Theme

  constructor(theme: Theme) {
    this.theme = theme
  }

  disableResponsiveStyle() {
    this.theme.layout.contentMinWidth = '768px'
  }

  override(getOverride: (theme: Theme) => Partial<Components>) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  extendThemeOverrides(newOverride: Partial<Components>) {
    const overrides = this.theme.components || {}

    Object.assign(overrides, newOverride)

    this.theme.components = overrides
  }

  extendTheme(theme: ThemeOptions) {
    this.theme = deepmerge(this.theme, theme)
  }
}

const PicassoProviderV5 = new ProviderV5(createTheme(picasso))

export default PicassoProviderV5
