import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette: { red, green, yellow, blue, text } }: Theme) =>
  createStyles({
    alert: {
      alignItems: 'start',
      borderRadius: '8px',
      flexWrap: 'nowrap',
      maxWidth: 'initial',
      padding: '1rem',
      position: 'relative',
      width: '100%',
      boxShadow: 'none'
    },
    alertRed: {
      background: red.lighter
    },
    alertGreen: {
      background: green.lighter
    },
    alertBlue: {
      background: blue.lighter
    },
    alertYellow: {
      background: yellow.lighter
    },
    content: {
      overflowWrap: 'break-word'
    },
    contentWithCloseButton: {
      paddingRight: '1rem'
    },
    icon: {
      fontSize: '1rem'
    },
    iconWrapper: {
      marginRight: '1rem',
      height: '1.3125rem'
    },
    close: {
      position: 'absolute',
      right: '.5rem',
      top: '.5rem',
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
