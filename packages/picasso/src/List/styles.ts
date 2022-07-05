import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '1rem',
    },
    unordered: {
      color: palette.text.primary,
    },
  })
