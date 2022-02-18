import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, transitions, sizes: { borderRadius } }: Theme) =>
  createStyles({
    root: {
      paddingRight: 0,
      cursor: 'text'
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield'
    },

    toggle: {
      height: '2rem',
      width: '1.625rem',
      borderLeft: `1px solid ${palette.grey.light2}`,
      borderRight: '1px solid transparent',
      borderTopRightRadius: borderRadius.small,
      borderBottomRightRadius: borderRadius.small,

      '&:hover': {
        background: palette.grey.light2,
        borderColor: palette.grey.light2
      },

      '& + &': {
        borderTop: `1px solid ${palette.grey.light2}`
      },

      '&:active + &': {
        borderTop: `1px solid ${palette.grey.main}`
      },

      '&:active': {
        background: palette.grey.main,
        borderColor: palette.grey.main
      },
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, color, background'
    },

    toggleDisabled: {
      opacity: 0.48
    }
  })
