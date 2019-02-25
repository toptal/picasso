import { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => ({
  logo: {
    width: '5.875em',
    height: '1.75em'
  },
  logoEmblem: {
    width: '1.53125em',
    height: '1.75em'
  },
  default: {
    color: palette.primary.main
  },
  white: {
    color: palette.common.white
  },
  black: {
    color: palette.common.black
  }
})
