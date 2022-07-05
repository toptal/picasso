import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ screens, layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      margin: `0 ${layout.contentPaddingHorizontal}`,

      [screens('small', 'medium')]: {
        margin: `0 ${layout.contentMobilePaddingHorizontal}`,
      },
    },
  })
