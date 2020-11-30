import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({
  MuiSnackbarContent: {
    message: {
      display: 'flex',
      padding: 0,
      maxWidth: '73.75em',
      width: '100%',
      minWidth: 0,
      margin: '0 auto'
    }
  }
}))

export default ({
  palette: { red, green, yellow, common, text },
  shadows,
  sizes: { borderRadius }
}: Theme) =>
  createStyles({
    notification: {
      alignItems: 'start',
      borderRadius: 0,
      flexWrap: 'nowrap',
      maxWidth: 'initial',
      padding: '1.5em',
      position: 'relative',
      width: '100%',
      boxShadow: 'none'
    },
    notificationShadow: {
      boxShadow: shadows[3]
    },
    roundedBorders: {
      borderRadius: borderRadius.small
    },
    notificationRed: {
      background: red.lighter
    },
    notificationGreen: {
      background: green.lighter
    },
    notificationWhite: {
      background: common.white
    },
    notificationYellow: {
      background: yellow.lighter
    },

    // Content
    content: {
      color: text.primary,
      overflowWrap: 'break-word',
      minWidth: 0
    },
    contentCloseButton: {
      paddingRight: '1.5em'
    },

    // Content Icon
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1em',
      minWidth: '1.5em',
      height: '1.3125em'
    },

    close: {
      position: 'absolute',
      right: '.75em',
      top: '.75em',
      background: 'transparent',
      border: 0,
      padding: 0,

      '&:hover': {
        background: 'transparent'
      }
    },
    closeIcon: {
      fill: text.primary
    }
  })
