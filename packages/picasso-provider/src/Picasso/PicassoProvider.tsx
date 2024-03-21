import type { Theme, ThemeOptions } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import type { Overrides } from '@material-ui/core/styles/overrides'
import merge from 'lodash/merge'
import './config/theme'

import {
  palette,
  layout,
  breakpoints,
  screens,
  transitions,
  typography,
  sizes,
  shadows,
  spacings,
} from './config'

const picasso: ThemeOptions = {
  palette,
  layout,
  transitions,
  sizes,
  breakpoints,
  screens,
  shadows,
  typography,
  zIndex: {
    tooltip: 1300,
  },
  // @TODO: [FX-5055] remove typography overrides after the Tailwind migration
  overrides: {
    MuiTypography: {
      h1: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '28px',
        lineHeight: '42px',
      },
      h2: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '20px',
        lineHeight: '30px',
      },
      h3: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '16px',
        lineHeight: '24px',
      },
      h4: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '14px',
        lineHeight: '22px',
      },
      body1: {
        color: palette.text.primary,
        fontWeight: typography.fontWeights.regular,
        fontSize: '14px',
        lineHeight: '22px',
      },
    },
  },
  // end of typography overrides
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      disablePadding: true,
    },
    MuiPaper: {
      square: true,
    },
    MuiOutlinedInput: {
      notched: false,
    },
  },
  spacings,
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
    this.theme = merge(this.theme, theme)
  }
}

const PicassoProvider = new Provider(createTheme(picasso))

export default PicassoProvider
