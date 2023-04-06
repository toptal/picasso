import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey.main2,
      minWidth: 0,
      padding: 0,
      '& + &:before': {
        backgroundColor: palette.grey.main2,
        content: '""',
        display: 'inline-block',
        height: spacing(1),
        marginLeft: spacing(1),
        marginRight: spacing(1),
        width: 1,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        color: palette.grey.light2,
      },
      '&:focus, &$selected$dark': {
        backgroundColor: 'transparent',
        color: palette.common.white,
      },
    },
    icon: {
      marginRight: '0.875em',
      width: '1em',
    },
    selected: {},
    dark: {},
  })
