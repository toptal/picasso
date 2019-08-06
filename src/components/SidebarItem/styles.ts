import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      height: '3em',
      padding: '0 1.5em',

      '&:hover': {
        color: palette.blue.main,
        backgroundColor: 'initial',

        '&$selected': {
          backgroundColor: palette.blue.lighter
        }
      },

      '&$selected': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        color: palette.blue.main,
        backgroundColor: 'initial'
      }
    },
    selected: {},
    label: {
      marginLeft: '1.875em'
    },
    withIcon: {
      marginLeft: '0.875em'
    },
    labelContent: {
      fontSize: '0.875em'
    }
  })
