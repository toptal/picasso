import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      height: '1.375em',
      lineHeight: '1.375em'
    },
    ul: {
      color: palette.grey.dark
    }
  })
