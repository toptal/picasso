export class PicassoProvider {
  theme: any

  constructor (theme = {}) {
    this.theme = theme
  }

  override (getOverride: (theme: any) => any = () => ({})) {
    const newOverride = getOverride(this.theme)

    this.extendThemeOverrides(newOverride)
  }

  withTheme (getWithTheme: (theme: any) => any = () => ({})) {
    return getWithTheme(this.theme)
  }

  extendThemeOverrides (newOverride: any) {
    const overrides = this.theme.overrides || {}

    Object.assign(overrides, newOverride)

    this.theme.overrides = overrides
  }
}

export default PicassoProvider
