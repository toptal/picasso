import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    toggleText: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.5rem',
      transition: 'none',
      fontWeight: 'normal',
    },
    iconWrapper: {
      fontSize: '1rem !important',
      lineHeight: 0,
      transform: 'rotate(90deg)',
    },
    icon: {
      color: palette.grey.dark,
    },
    expandedIcon: {
      transform: 'rotate(180deg)',
    },
  })
