import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '0.625rem',
      lineHeight: 1,
      marginTop: '0.25rem',
      color: palette.grey.main2,
      marginRight: rem('2px'),

      '&$error': {
        color: palette.red.main,
      },
    },

    error: {},
  })
