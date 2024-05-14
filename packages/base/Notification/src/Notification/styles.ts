import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import {
  breakpointsList as breakpoints,
  PicassoProvider,
} from '@toptal/picasso-provider'
import { rem } from '@toptal/picasso-shared'

PicassoProvider.override(({ layout, breakpoints: { down } }: Theme) => ({
  MuiSnackbarContent: {
    message: {
      display: 'flex',
      maxWidth: layout.contentWidth,
      padding: 0,
      width: '100%',
      minWidth: 0,
      margin: '0 auto',
      [down(breakpoints.xl)]: {
        maxWidth: 'unset',
      },
      '& > div': {
        width: '100%',
      },
    },
  },
}))

export default ({
  palette: { red, green, yellow, common },
  shadows,
  breakpoints: { down },
  sizes: { borderRadius },
}: Theme) =>
  createStyles({
    notification: {
      alignItems: 'start',
      borderRadius: 0,
      flexWrap: 'nowrap',
      maxWidth: 'initial',
      position: 'relative',
      width: '100%',
      boxShadow: 'none',
      padding: '1.5em 2.5em 1.5625em 1.5em',
    },
    notificationShadow: {
      boxShadow: shadows[3],
    },
    roundedBorders: {
      borderRadius: borderRadius.small,
    },
    notificationRed: {
      background: red.lighter,
    },
    notificationGreen: {
      background: green.lighter,
    },
    notificationWhite: {
      background: common.white,
      padding: '1.5625em 1.5em 1.5em',
    },
    notificationYellow: {
      background: yellow.lighter,
      padding: `1.5em ${rem('130px')}`,
      [down(breakpoints.lg)]: {
        padding: '1.5em',
      },
      [down(breakpoints.sm)]: {
        padding: '1.5em 1em',
      },
    },

    // Content Icon
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1em',
      minWidth: '1.5em',
      height: '1.5em',
    },
    iconWrapperYellow: {
      flexBasis: 'unset',
      minWidth: '1em',
      height: '1em',
      marginTop: '2px',
    },
  })
