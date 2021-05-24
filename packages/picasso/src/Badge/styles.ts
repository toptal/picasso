import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '0.57rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      lineHeight: 'initial'
    },
    // variants
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
      fontSize: '0.57rem',
      height: '1.25rem',
      minWidth: '1.25rem',
      borderRadius: '0.625rem',
      fontWeight: 600
    },
    small: {
      fontSize: '0.57rem',
      height: '0.75rem',
      minWidth: '0.75rem',
      borderRadius: '0.75rem',
      fontWeight: 600
    },
    smallLabel: {
      padding: '0'
    }
  })
