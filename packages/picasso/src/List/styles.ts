import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      margin: 0,

      '& > li:not(:last-child)': {
        marginBottom: '0.5em'
      }
    },
    ul: {
      color: palette.grey.dark
    }
  })
