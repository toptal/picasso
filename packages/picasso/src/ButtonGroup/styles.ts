import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start'
    },

    button: {
      transitionProperty: 'color, background',

      '&:first-child:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginLeft: '0rem'
      },

      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
        marginLeft: '-1px'
      },

      '&:last-child:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: '-1px'
      },

      '&:active, &$active, &:hover, &$hovered, &:focus, &$focused': {
        zIndex: 1
      }
    },
    active: {},
    focused: {},
    hovered: {}
  })
