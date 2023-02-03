import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

import { createOutlineCommons, activeGroup } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      minWidth: '1.5em',
      padding: '0 0.3em',

      ...createOutlineCommons(theme),
      '&:active, &$active': activeGroup(theme),
    },
    active: {},
    hovered: {},
    disabled: {},
  })
