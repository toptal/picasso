/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2],
    },
  },
  MuiList: {
    root: {
      boxShadow: shadows[1],
    },
  },
}))

export default ({ sizes }: Theme) =>
  createStyles({
    root: {
      outline: 0,
      padding: '0.5rem 0',
      borderRadius: sizes.borderRadius.small,
    },
    backButtonIcon: {
      verticalAlign: 'middle',
      marginTop: rem('-1px'),
      marginRight: rem('4px'),
      marginLeft: rem('-5px'),
    },
  })
