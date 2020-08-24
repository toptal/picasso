import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      paddingRight: 0
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield'
    },

    control: {
      height: '1.125rem',
      width: '1.625rem',
      borderLeft: `1px solid ${palette.grey.light}`,
      borderRight: '1px solid transparent',

      '&:hover': {
        background: palette.grey.light,
        borderColor: palette.grey.light
      },

      '& + &': {
        borderTop: `1px solid ${palette.grey.light}`
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

    controlDisabled: {
      opacity: 0.48
    },

    arrowDown: {
      transform: 'rotate(180deg)'
    },

    icon: {
      marginRight: '0.625rem'
    }
  })
