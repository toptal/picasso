import { createStyles, Theme } from '@material-ui/core/styles'

import { createOutlineCommons, activeGroupStyles } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      '&.__group': {
        transitionProperty: 'color, background',
        ...createOutlineCommons(theme),
        '&:active, &$active': activeGroupStyles(theme),

        '&:active, &$active, &:hover, &$hovered, &:focus, &$focused': {
          // border overlap to keep proper border width, but on state change
          // we need to move up overlapped border
          zIndex: 1
        }
      }
    },
    active: {},
    hover: {},
    focused: {}
  })
