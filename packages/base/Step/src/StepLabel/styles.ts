import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import {
  PicassoProvider,
  breakpointsList as breakpoints,
} from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiStepLabel: {
    label: {
      display: 'flex',

      '&$active': {
        display: 'flex',
      },
    },
    iconContainer: {
      paddingRight: 0,
    },
  },
}))

export default ({ palette, breakpoints: { down } }: Theme) =>
  createStyles({
    hidden: {
      display: 'none',
    },
    hiddenOnMobile: {
      [down(breakpoints.small)]: {
        display: 'none',
      },
    },
    labelContainerOverflowEllipsis: {
      display: 'grid',
    },
    labelOverflowEllipsis: {
      overflow: 'hidden',
    },
    root: {
      marginLeft: '0.5em',
    },
    label: {
      fontSize: rem('11px'),
      fontWeight: 600,
      lineHeight: '1em',
      color: palette.grey.dark,
    },
  })
