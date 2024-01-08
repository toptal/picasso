import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, transitions, sizes: { borderRadius } }: Theme) =>
  createStyles({
    root: {
      borderLeft: `1px solid ${palette.grey.light2}`,
      borderRight: '1px solid transparent',

      '&:hover': {
        background: palette.grey.light2,
        borderColor: palette.grey.light2,
      },

      '& + &': {
        borderTop: `1px solid ${palette.grey.light2}`,
      },

      '&:active + &': {
        borderTop: `1px solid ${palette.grey.main}`,
      },

      '&:active': {
        background: palette.grey.main,
        borderColor: palette.grey.main,
      },

      '&:first-child': {
        borderTopRightRadius: borderRadius.small,
      },

      '&:last-child': {
        borderBottomRightRadius: borderRadius.small,
      },

      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, color, background',
    },

    disabled: {
      opacity: 0.48,
    },

    small: {
      height: '0.75rem',
      width: '1.375rem',
    },

    medium: {
      height: '1rem',
      width: '1.625rem',
    },

    large: {
      height: '1.5rem',
      width: '2.125rem',
    },
  })
