import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({}))

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`
    }
  })
