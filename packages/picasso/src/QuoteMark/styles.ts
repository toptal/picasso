import { Theme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fill: palette.primary.main,
    },
  })
