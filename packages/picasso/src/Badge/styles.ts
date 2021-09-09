import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '0.57rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      lineHeight: 'initial',
      fontWeight: 600
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
    large: {
      borderRadius: '1.25rem',
      height: '1.25rem',
      minWidth: '1.25rem'
    },
    small: {
      borderRadius: '0.75rem',
      height: '0.75rem',
      minWidth: '0.75rem'
    },
    medium: {
      borderRadius: '1rem',
      height: '1rem',
      minWidth: '1rem'
    },
    smallLabel: {
      padding: '0 2px'
    },
    mediumLabel: {
      padding: '0 1px'
    },
    largeLabel: {
      padding: '0 3px'
    }
  })
