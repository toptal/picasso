import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    first: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginLeft: '0 !important'
    },
    last: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: '-1px !important'
    },
    middle: {
      borderRadius: 0,
      marginLeft: '-1px !important'
    },

    root: {
      transitionProperty: 'color, background',

      '&:active, &:hover, &:focus': {
        zIndex: 1
      }
    }
  })
