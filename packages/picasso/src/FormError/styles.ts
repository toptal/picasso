import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      marginTop: '0.25em'
    },
    error: {
      color: palette.red.main,
      fontSize: '0.6875em',
      cursor: 'default'
    }
  })
