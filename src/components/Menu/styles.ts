import { Theme, createStyles } from '@material-ui/core/styles'

import { rem } from '../styles'
import { PicassoProvider } from '../Picasso'
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
    backButtonIcon: {
      marginRight: rem('4px')
    },
    backButton: {
      fontSize: '0.8125em'
    }
  })
