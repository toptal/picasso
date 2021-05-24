import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, rem } from '@toptal/picasso-shared'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2]
    }
  },
  MuiList: {
    root: {
      boxShadow: shadows[1]
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
