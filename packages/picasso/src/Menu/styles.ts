import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, rem } from '@toptal/picasso-shared'

import '../List/styles'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2]
    }
  }
}))
export default () =>
  createStyles({
    root: {
      outline: 0
    },
    backButtonIcon: {
      verticalAlign: 'middle',
      marginTop: rem('-1px'),
      marginRight: rem('4px'),
      marginLeft: rem('-5px')
    }
  })
