import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ screens }: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      [screens('small', 'medium')]: {
        display: 'block',
      },
    },
  })
