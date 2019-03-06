import { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => ({
  root: {
    marginTop: '.25em'
  },
  hint: {
    color: palette.grey[200],
    fontSize: '.75em'
  }
})
