import { rem } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      padding: '20px',
      borderWidth: 1,
      borderRadius: sizes.borderRadius.medium,
      borderColor: palette.grey.light2,
      borderStyle: 'dashed',
      backgroundColor: palette.common.white,
      color: palette.grey.dark,
      outline: 'none',
      transition: 'border .24s ease-in-out',
      gap: '0.5rem',
      '&:hover, &$dragActive, &.__hover': {
        borderColor: palette.blue.main
      },
      '&$completed': {
        backgroundColor: palette.grey.lighter
      }
    },
    text: {
      lineHeight: rem('22px')
    },
    hint: {
      margin: 0,
      '& > *': {
        lineHeight: rem('16px')
      },
      '&$error > *': {
        color: palette.red.main
      }
    },
    completed: {},
    error: {},
    dragActive: {}
  })
