import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerHeight } from '..'

export default ({ layout, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: palette.grey.lightest,
      ...(layout.contentMinWidth && { minWidth: layout.contentMinWidth }),

      '& > footer, & > header': {
        flex: 0,
      },
      '& > header + *': {
        marginTop: headerHeight.default,
      },
    },
  })
