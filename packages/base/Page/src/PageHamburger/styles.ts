import { createStyles } from '@material-ui/core/styles'

import { headerBreakingPointXL } from '../PageTopBar/constants'

export default () => {
  return createStyles({
    root: {
      [headerBreakingPointXL]: {
        display: 'none',
      },
    },
    popper: {
      marginTop: '1rem',
    },
    hamburger: {
      pointerEvents: 'none',
    },
    hidden: {
      display: 'none',
    },
  })
}
