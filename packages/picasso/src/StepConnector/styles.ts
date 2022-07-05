import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) =>
  createStyles({
    connectorIcon: {
      color: palette.grey.light2,
      fontSize: '0.5em',
      margin: '0 0.5em',
    },
    divider: {
      height: '1rem',
    },
  })
