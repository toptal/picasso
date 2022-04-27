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
} from './config'

const picasso: ThemeOptions = {
  palette,
  layout,
  transitions,
  sizes,
  breakpoints,
  screens,
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

class Provider {
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

/**
 * This is the workaround for shadows due to no direct access to shadows values
 * After theme creation, this function overrides the first 6 shadows values
 * @param muiShadows MUI's shadows values as string[] with exact length of 25
 * @param picassoShadows shadows values that we want to override
 */
const overrideShadowsArray = (
  muiShadows: string[],
  picassoShadows: string[]
) => {
  picassoShadows.forEach((shadow, index) => (muiShadows[index] = shadow))
}

const theme = createTheme(picasso)

overrideShadowsArray(theme.shadows, shadows)
const PicassoProvider = new Provider(theme)

export default PicassoProvider
