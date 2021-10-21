import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

export const MENU_CSS_VARS = {
  verticalPadding: '--menu-vertical-padding'
} as const

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2]
    }
  },
  MuiList: {
    root: {
      boxShadow: shadows[5]
    }
  }
}))

export default ({ sizes }: Theme) =>
  createStyles({
    root: {
      outline: 0,
      borderRadius: sizes.borderRadius.small,
      // select menu can have small variant,
      // which will override this variable
      [MENU_CSS_VARS.verticalPadding]: '0.5rem',
      padding: `var(${MENU_CSS_VARS.verticalPadding}) 0`,
      '&$noPadding': {
        [MENU_CSS_VARS.verticalPadding]: 0
      }
    },
    backButtonIcon: {
      verticalAlign: 'middle',
      marginTop: rem('-1px'),
      marginRight: rem('4px'),
      marginLeft: rem('-5px')
    },
    noPadding: {}
  })
