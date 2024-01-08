import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import {
  createOutlineCommons,
  activeGroup,
  disabledGroup,
} from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      minWidth: '1.5em',
      padding: '0 0.3em',

      ...createOutlineCommons(theme),
      '&:active, &$active': activeGroup(theme),
      '&:disabled, &$disabled': disabledGroup(theme),
    },
    active: {},
    hovered: {},
    disabled: {},
  })
