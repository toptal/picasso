import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ shadows }: Theme) => ({
  MuiList: {
    root: {
      boxShadow: shadows[1]
    }
  }
}))

export default () => createStyles({})
