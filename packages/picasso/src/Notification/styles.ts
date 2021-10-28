import { createStyles, Theme } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import { rem } from '@toptal/picasso-shared'

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
      padding: `${rem('25px')} calc(1.5em - ${
        layout.contentPaddingHorizontal
      }) 1.5em`,
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
      background: yellow.lighter,
      padding: `${rem('24px')} calc(1.5em - ${
        layout.contentPaddingHorizontal
      }) 1.5em`
    },

    // Content
    content: {
      color: common.black,
      overflowWrap: 'break-word',
      minWidth: 0,
      fontSize: rem('14px')
    },
    contentYellow: {
      fontSize: rem('13px')
    },
    contentCloseButton: {
      paddingRight: '1.5em'
    },

    // Content Icon
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1em',
      minWidth: '1.5em',
      height: '1.3125em',
      paddingBottom: rem('1px')
    },
    iconWrapperYellow: {
      paddingBottom: 0,
      paddingTop: rem('1px')
    },

    close: {
      position: 'absolute',
      right: rem('12px'),
      top: rem('12px'),
      background: 'transparent',
      border: 0,
      padding: 0,
      width: '1rem',
      height: '1rem',

      '&:hover': {
        background: 'transparent'
      }
    },
    closeIcon: {
      fill: text.primary
    }
  })
