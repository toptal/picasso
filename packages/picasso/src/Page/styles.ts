import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerHeight } from '../PageTopBar/constants'

export default ({ layout }: Theme) =>
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
      },

      '--displayHamburger': 'block',
      '--displayCenterMenu': 'block',
      '--displaySidebar': 'none',

      '@media (min-width: 1280px)': {
        '--displayHamburger': 'none',
        '--displaySidebar': 'block',
        '--displayCenterMenu': 'flex',
      },
    },
  })
