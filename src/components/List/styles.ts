import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiList: {
    root: {
      border: `solid 1px ${palette.primary.main}`
    }
  }
}))

export default () => createStyles({})
