import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    limiterLabel: {
      color: palette.grey.main2,
      fontSize: '0.625rem',
      lineHeight: '1rem',
    },
    limiterLabelError: {
      color: palette.red.main,
    },
    limiterMultiline: {
      justifyContent: 'unset',
      marginLeft: 'unset',
    },
  })
