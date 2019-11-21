import { Theme, createStyles } from '@material-ui/core/styles'

import { rem } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: rem('8px'),
      height: rem('8px'),
      borderRadius: '50%'
    },
    red: {
      background: palette.red.main
    },
    yellow: {
      background: palette.yellow.main
    },
    blue: {
      background: palette.blue.main
    }
  })
