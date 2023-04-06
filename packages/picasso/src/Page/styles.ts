import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerHeight } from '../PageTopBar/styles'

export default ({ screens, layout }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...(layout.contentMinWidth && { minWidth: layout.contentMinWidth }),

      '& > footer, & > header': {
        flex: 0,
      },
      '& > header + *': {
        marginTop: headerHeight.default,
        [screens('small', 'medium')]: {
          marginTop: headerHeight.smallAndMedium,
        },
      },
    },
  })
