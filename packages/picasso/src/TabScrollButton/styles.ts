import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '1rem',
      flexShrink: 0,

      '&::after': {
        position: 'absolute',
        content: '""',
        top: '0.5rem',
        bottom: '0.5rem',
        width: '1.5rem',
        // to overlap tag labels
        zIndex: 1
      }
    },
    left: {
      '&::after': {
        left: '100%',
        background: `linear-gradient(90deg, ${palette.common.white}, transparent)`
      }
    },
    right: {
      '&::after': {
        right: '100%',
        background: `linear-gradient(270deg, ${palette.common.white}, transparent)`
      }
    },
    disabled: {
      opacity: 0
    }
  })
