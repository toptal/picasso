import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiList: {
    root: {
      boxShadow: shadows[1],
      fontSize: '0.8125em'
    }
  }
}))

export default () => createStyles({})
