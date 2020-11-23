import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',

      '& $button + $button': {
        marginLeft: '-1px'
      }
    },

    button: {
      transitionProperty: 'color, background',

      '&:first-child:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },

      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0
      },

      '&:last-child:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },

      '&:active, &$active, &:hover': {
        zIndex: 1
      }
    },
    active: {}
  })
