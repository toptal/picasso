import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    indicated: {
      content: '""',
      height: '0.25rem',
      width: '0.25rem',
      borderRadius: '50%',
      background: palette.yellow.main,
      marginTop: '0.175rem',
    },
  })
