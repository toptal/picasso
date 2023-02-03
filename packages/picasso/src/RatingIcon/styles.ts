import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ transitions }: Theme) =>
  createStyles({
    clickableIcon: {
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      '&:hover, &$hovered': {
        transform: 'scale(1.5)',
      },
    },
    hovered: {},
  })
