import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      lineHeight: '1rem',
      fontSize: '1rem',
      minHeight: 'unset',
      whiteSpace: 'normal',
      padding: '0.625rem',
      // to override MUI paddingLeft and paddingRight default values
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem',

      '&$selected, &$selected:hover': {
        backgroundColor: palette.action.selected
      },
      '&$disabled': {
        opacity: 0.5
      },

      color: palette.common.black,

      '&:hover': {
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.blue.lighter
        }
      },

      '&$selected': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter
      },

      '&:focus': {
        color: palette.blue.main,
        backgroundColor: palette.blue.lighter,

        '&$selected': {
          color: palette.blue.main,
          backgroundColor: palette.blue.lighter
        }
      }
    },
    selected: {},
    disabled: {},

    stringContent: {
      flex: 1,
      fontSize: '0.8125em'
    },
    stringContentSmall: {
      fontSize: '0.75rem'
    },
    stringContentMedium: {
      fontSize: '0.8125rem'
    },
    guttersSmall: {
      padding: '0.25rem 0.625rem'
    },
    guttersMedium: {
      padding: '0.625rem'
    }
  })
