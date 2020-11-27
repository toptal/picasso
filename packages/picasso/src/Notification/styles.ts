import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ layout }: Theme) => ({
  MuiSnackbarContent: {
    message: {
      display: 'flex',
      maxWidth: layout.contentWidth,
      padding: `0 ${layout.contentPaddingHorizontal}`,
      width: '100%',
      minWidth: 0,
      margin: '0 auto'
    }
  }
}))

export default ({
  palette: { red, green, yellow, common, text },
  shadows,
  sizes: { borderRadius },
  layout
}: Theme) =>
  createStyles({
    notification: {
      alignItems: 'start',
      borderRadius: 0,
      flexWrap: 'nowrap',
      maxWidth: 'initial',
      padding: `1.5em calc(1.5em - ${layout.contentPaddingHorizontal})`,
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
      color: common.black,
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
      right: '1.4em',
      top: '1.4em',
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
