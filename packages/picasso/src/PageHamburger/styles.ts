/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import {
  headerHeight,
  headerBreakingPointXL,
} from '@toptal/picasso-page-top-bar/constants'

export default ({ palette }: Theme) => {
  const wrapperBoxShadow = `inset -1px 0px 0px 0px ${palette.grey.lighter2}`

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
    responsiveWrapperContent: {
      backgroundColor: palette.grey.lighter,
      boxShadow: wrapperBoxShadow,
      maxHeight: `calc(100vh - ${headerHeight.default})`, // viewport minus header height: ;
    },
  })
}
