import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '1rem'
    },
    unordered: {
      color: palette.text.primary
    }
  })
