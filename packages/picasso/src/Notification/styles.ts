import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import { rem } from '@toptal/picasso-shared'

PicassoProvider.override(({ layout }: Theme) => ({
  MuiSnackbarContent: {
    message: {
      display: 'flex',
      maxWidth: layout.contentWidth,
      padding: 0,
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
      position: 'relative',
      width: '100%',
      boxShadow: 'none',
      padding: '1.5625em 2.5em 1.5625em 1.5em'
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
      background: common.white,
      padding: '1.5625em 1.5em 1.5em'
    },
    notificationYellow: {
      background: yellow.lighter,
      padding: `1.5em ${layout.contentPaddingHorizontal}`
    },

    // Content
    content: {
      color: common.black,
      overflowWrap: 'break-word',
      minWidth: 0,
      lineHeight: rem('22px'),
      fontSize: rem('14px'),
      marginTop: '1px'
    },
    contentYellow: {
      lineHeight: rem('20px'),
      fontSize: rem('13px'),
      marginTop: 0
    },

    // Content Icon
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1em',
      minWidth: '1.5em',
      height: '1.5em'
    },
    iconWrapperYellow: {
      height: '1em',
      marginTop: '2px'
    },

    close: {
      position: 'absolute',
      right: '0.5em',
      top: '0.75em',
      background: 'transparent',
      border: 0,
      padding: 0,
      height: '1em',

      '&:hover': {
        background: 'transparent'
      }
    },
    closeIcon: {
      fill: text.primary
    }
  })
