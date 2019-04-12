import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({}))

export default ({ palette }: Theme) =>
  createStyles({
    connectorIcon: {
      color: palette.grey[100]
    }
  })
