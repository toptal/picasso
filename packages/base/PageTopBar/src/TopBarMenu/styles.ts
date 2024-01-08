import { createStyles } from '@material-ui/core/styles'

import { headerBreakingPointXL } from '../PageTopBar/constants'

export default () =>
  createStyles({
    root: {
      display: 'block',
      [headerBreakingPointXL]: {
        display: 'flex',
      },
    },
  })
