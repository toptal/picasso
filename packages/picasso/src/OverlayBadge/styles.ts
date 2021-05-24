import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    // variants
    root: {
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    white: {
      background: palette.common.white,
      color: palette.grey.dark,
      borderColor: palette.grey.light
    },
    red: {
      color: palette.common.white,
      borderColor: palette.red.main,
      backgroundColor: palette.red.main
    },
    // sizes
    medium: {
      fontSize: '0.75rem'
    },
    small: {
      fontSize: '0.57rem',
      height: '0.75rem',
      minWidth: '0.75rem',
      borderRadius: '0.75rem',
      padding: '0'
    }
  })
