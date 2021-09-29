import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',

      '&:after': {
        content: '""',
        width: '10px',
        height: '10px',
        background: palette.grey.main2,
        borderRadius: '50%'
      }
    }
  })
