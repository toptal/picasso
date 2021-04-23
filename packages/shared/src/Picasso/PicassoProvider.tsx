import { Theme, ThemeOptions } from '@material-ui/core/styles'
import { Overrides } from '@material-ui/core/styles/overrides'
import { deepmerge } from '@material-ui/utils'

export class PicassoProvider {
  themes: Record<string, Theme>
  theme: Theme

  constructor(themes: Record<'light' | 'dark', Theme>) {
    this.themes = themes
    this.theme = themes.light
  }

  disableResponsiveStyle() {
    for (const theme in this.themes) {
      this.themes[theme].layout.contentMinWidth = '768px'
    }
  }

  override(getOverride: (theme: Theme) => Partial<Overrides>) {
    for (const theme in this.themes) {
      const newOverride = getOverride(this.themes[theme])

      this.extendThemeOverrides(newOverride)
    }
  }

  extendThemeOverrides(newOverride: Partial<Overrides>) {
    for (const theme in this.themes) {
      const overrides = this.themes[theme].overrides || {}

      Object.assign(overrides, newOverride)

      this.themes[theme].overrides = overrides
    }
  }

  extendTheme(themeOptions: ThemeOptions) {
    for (const theme in this.themes) {
      this.theme = deepmerge(this.themes[theme], themeOptions)
    }
  }

  setDarkMode(isInDarkMode: boolean) {
    this.theme = isInDarkMode ? this.themes.dark : this.themes.light
  }
}

export default PicassoProvider
