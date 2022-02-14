import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    radio: {
      display: 'none'
    },
    label: {
      '&:not(:last-child)': {
        marginRight: '1em'
      }
    },
    thumbs: {
      color: palette.grey.light2,
      transition: 'color .3s'
    },
    interactiveThumbs: {
      cursor: 'pointer',
      '&:hover': {
        color: palette.text.primary
      }
    },
    thumbsPositive: {
      color: palette.green.main
    },
    thumbsNegative: {
      color: palette.red.main
    }
  })
