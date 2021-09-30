import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      // Outer width should match the icon's one
      width: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',

      '&:after': {
        content: '""',
        width: '9px',
        height: '9px',
        background: palette.grey.main2,
        borderRadius: '50%'
      }
    }
  })
