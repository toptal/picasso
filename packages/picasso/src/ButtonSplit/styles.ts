import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    actionButton: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    menuButton: {
      minWidth: '2em',
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: 0
    },

    primaryVariant: {
      '&$actionButton': {
        borderRight: `1px solid ${palette.blue.darker}`
      },
      '&$menuButton': {
        borderLeft: `1px solid ${palette.blue.darker}`,

        '&$disabled': {
          borderLeftColor: palette.grey.main
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
      display: 'block',
      cursor: 'pointer'
    },

    disabled: {
      // override dropdown anchor styles
      '& > div': {
        cursor: 'auto'
      }
    },

    rotated: {
      transform: 'rotate(180deg)'
    }
  })
