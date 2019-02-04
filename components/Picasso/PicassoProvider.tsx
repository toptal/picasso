import { Theme } from '@material-ui/core/styles'
import { Overrides } from '@material-ui/core/styles/overrides'

export class PicassoProvider {
  theme: Theme

  constructor (theme: Theme) {
    this.theme = theme
  }

  override (getOverride: (theme: Theme) => Partial<Overrides>) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  extendThemeOverrides (newOverride: Partial<Overrides>) {
    const overrides = this.theme.overrides || {}

    Object.assign(overrides, newOverride)

    this.theme.overrides = overrides
  }
}

export default PicassoProvider
