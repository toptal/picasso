import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    spinnerBlue: {
      color: palette.primary.main,
    },
    spinnerInherit: {
      color: 'inherit',
    },
    label: {
      marginTop: '1rem',
    },
    inline: {
      display: 'inline-flex',
    },
  })
