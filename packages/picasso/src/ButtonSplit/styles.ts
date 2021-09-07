import { createStyles, Theme } from '@material-ui/core/styles'

const zIndices = {
  background: 1,
  foreground: 3,
  bypassAnimation: 11
}

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      lineHeight: '1em'
    },
    button: {
      '&$disabled': {
        pointerEvents: 'auto'
      }
    },
    actionButton: {
      zIndex: zIndices.background,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    menuButton: {
      zIndex: zIndices.foreground,
      minWidth: '2em',
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: 0
    },

    primaryVariant: {
      '&$actionButton': {
        borderRight: `1px solid ${palette.blue.darker}`,
        left: '1px' // for a thin separator
      },
      '&$menuButton': {
        borderLeft: `1px solid ${palette.blue.darker}`,

        '&$disabled': {
          borderLeftColor: palette.grey.main
        }
      }
    },
    secondaryVariant: {
      '&$actionButton': {
        left: '1px', // for a thin separator

        '&:hover': {
          zIndex: zIndices.bypassAnimation
        }
      }
    },
    smallSize: {
      minWidth: '1.5em',
      paddingLeft: '0.25em',
      paddingRight: '0.25em'
    },
    mediumSize: {},
    largeSize: {
      minWidth: '3em',
      paddingLeft: '0.75em',
      paddingRight: '0.75em'
    },

    dropdown: {
      display: 'block'
    },

    disabled: {}
  })
