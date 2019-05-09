import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiSnackbarContent: {
    message: {
      display: 'flex',
      padding: 0,
      maxWidth: '72.5em'
    }
  }
}))

export default ({
  palette: { error, success, warning, common, text },
  shadows
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
    notificationError: {
      background: error.lighter
    },
    notificationSuccess: {
      background: success.lighter
    },
    notificationInfo: {
      background: common.white
    },
    notificationWarning: {
      background: warning.light
    },
    notificationFullWidth: {
      justifyContent: 'center'
    },

    // Content
    content: {
      color: text.primary
    },
    contentCloseButton: {
      paddingRight: '.5em'
    },

    // Content Icon
    iconWrapper: {
      flexBasis: '1.5em',
      marginRight: '1.5em',
      minWidth: '1.5em'
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
