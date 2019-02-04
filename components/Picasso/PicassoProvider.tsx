import { Theme } from '@material-ui/core/styles/createMuiTheme'

export class PicassoProvider {
  theme: Theme

  constructor (theme: Theme) {
    this.theme = theme
  }

  override (getOverride: (theme: Theme) => any = () => ({})) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  withTheme (getWithTheme: (theme: Theme) => any = () => ({})) {
    return getWithTheme(this.theme)
  }

  extendThemeOverrides (newOverride: Theme) {
    const overrides = this.theme.overrides || {}

    Object.assign(overrides, newOverride)

    this.theme.overrides = overrides
  }
}

export default PicassoProvider
