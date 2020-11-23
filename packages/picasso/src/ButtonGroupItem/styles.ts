import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    first: {
      '& $button': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    },
    last: {
      '& $button': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    },
    middle: {
      '& $button': {
        borderRadius: 0
      }
    },

    button: {
      transitionProperty: 'color, background',

      '&:active, &$active, &:hover': {
        zIndex: 1
      }
    },
    active: {}
  })
