import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      transitionProperty: 'color, background',

      '&:active, &:hover, &:focus': {
        zIndex: 1
      },

      '&[data-button-group="first"], [data-button-group="first"] &': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginLeft: '0'
      },
      '&[data-button-group="last"], [data-button-group="last"] &': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: '-1px'
      },
      '&[data-button-group="middle"], [data-button-group="middle"] &': {
        borderRadius: 0,
        marginLeft: '-1px'
      }
    }
  })
