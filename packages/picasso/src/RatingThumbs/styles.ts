import type { Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    radio: {
      display: 'none',
    },
    label: {
      '&:not(:last-child)': {
        marginRight: '1em',
      },
    },
    thumbs: {
      color: palette.grey.light2,
      transition: `color ${transitions.duration.shorter}ms linear`,
    },
    interactiveThumbs: {
      cursor: 'pointer',
      '&:hover': {
        color: palette.text.primary,
      },
    },
    thumbsPositive: {
      color: palette.green.main,
      '&:hover': {
        color: palette.green.main,
      },
    },
    thumbsNegative: {
      color: palette.red.main,
      '&:hover': {
        color: palette.red.main,
      },
    },
  })
