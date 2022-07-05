import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ palette }: Theme) => {
  return createStyles({
    shape: {
      fill: palette.grey.main,
    },
    text: {
      fontSize: '1em',
      textTransform: 'uppercase',
      fill: palette.common.white,
      dominantBaseline: 'middle',
      textAnchor: 'middle',
    },
  })
}
