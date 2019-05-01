import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiMenu: {
    paper: {
      boxShadow: shadows[2],
      fontSize: '0.8125em'
    }
  }
}))

export default () => createStyles({})
