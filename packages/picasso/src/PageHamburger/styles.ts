import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerHeight } from '../PageTopBar/constants'

export default ({ palette }: Theme) => {
  const wrapperBoxShadow = `inset -1px 0px 0px 0px ${palette.grey.lighter2}`

  return createStyles({
    root: {
      display: 'block',
      '@media (min-width: 1280px)': {
        display: 'none',
      },
    },
    hamburger: {
      pointerEvents: 'none',
    },
    hidden: {
      display: 'none',
    },
    responsiveWrapperContent: {
      backgroundColor: palette.grey.lighter,
      boxShadow: wrapperBoxShadow,
      maxHeight: `calc(100vh - ${headerHeight.default})`, // viewport minus header height: ;
    },
  })
}
