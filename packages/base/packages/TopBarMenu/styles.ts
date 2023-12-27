/* eslint-disable import/no-extraneous-dependencies */
import { createStyles } from '@material-ui/core/styles'
import { headerBreakingPointXL } from '@toptal/picasso-page-top-bar/constants'

export default () =>
  createStyles({
    root: {
      display: 'block',
      [headerBreakingPointXL]: {
        display: 'flex',
      },
    },
  })
