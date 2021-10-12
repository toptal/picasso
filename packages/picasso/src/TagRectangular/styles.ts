import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      borderRadius: '0.25rem',
      height: '1rem',
      border: '0'
    },
    negative: {
      backgroundColor: palette.red.main
    },
    warning: {
      backgroundColor: palette.yellow.main
    },
    dark: {
      backgroundColor: palette.grey.darker
    },
    light: {
      backgroundColor: palette.grey.lighter2
    },
    positive: {
      backgroundColor: palette.green.dark
    },
    label: {
      padding: '0 0.25em'
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
