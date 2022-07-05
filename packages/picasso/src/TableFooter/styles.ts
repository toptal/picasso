import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
    },
  })
