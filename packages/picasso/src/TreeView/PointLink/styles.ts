import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    pointLink: {
      fill: 'none',
      stroke: palette.grey.light2,
    },
  })
