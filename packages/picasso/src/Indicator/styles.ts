import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
    },
    red: {
      background: palette.red.main,
    },
    yellow: {
      background: palette.yellow.main,
    },
    blue: {
      background: palette.blue.main,
    },
    green: {
      background: palette.green.dark,
    },
    'light-grey': {
      background: palette.grey.light2,
    },
  })
