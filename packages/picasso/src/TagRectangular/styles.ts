import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      borderRadius: '0.25rem',
      height: '1rem',
      border: '0'
    },
    red: {
      backgroundColor: palette.red.main
    },
    yellow: {
      backgroundColor: palette.yellow.main
    },
    'dark-grey': {
      backgroundColor: palette.grey.darker
    },
    'light-grey': {
      backgroundColor: palette.grey.lighter2
    },
    label: {
      padding: '0.125em 0.25em 0 0.25em'
    },
    innerLabel: {
      fontSize: '11px',
      lineHeight: '1em',
      fontWeight: 600,
      color: palette.common.white
    },
    innerLabelDarkText: {
      color: palette.grey.darker
    },
    icon: {
      marginLeft: '0.25rem',
      marginRight: '0'
    }
  })
