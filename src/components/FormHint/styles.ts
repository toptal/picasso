import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      marginTop: '.25em'
    },
    hint: {
      color: palette.grey[200],
      fontSize: '.75em'
    }
  })
