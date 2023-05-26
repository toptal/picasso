import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      '@media (min-width: 1280px)': {
        color: palette.grey.main2,
        padding: 0,
        height: 'auto',
        width: 'auto',
        margin: 0,
        flex: '1 1 auto',
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
        '&:focus, &$selected': {
          backgroundColor: 'transparent',
          color: palette.common.white,
        },
        '& p': {
          fontSize: '13px',
        },
      },
    },
    icon: {
      '@media (min-width: 1280px)': {
        '& svg': {
          width: '1em',
        },
        '& svg + div': {
          marginLeft: 0,
        },
      },
    },
    selected: {},
  })
