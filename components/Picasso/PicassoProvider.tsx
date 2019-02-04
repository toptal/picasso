import { Theme } from '@material-ui/core/styles/createMuiTheme'

export class PicassoProvider {
  theme: Theme

  constructor (theme: Theme) {
    this.theme = theme
  }

  override (getOverride: (theme: Theme) => Theme) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  extendThemeOverrides (newOverride: Theme) {
    const overrides = this.theme.overrides || {}

    Object.assign(overrides, newOverride)

    this.theme.overrides = overrides
  }
}

export default PicassoProvider
