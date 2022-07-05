import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ spacing }: Theme) =>
  createStyles({
    root: {
      paddingRight: 0,
      cursor: 'text',
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0,
      },
    },

    toggle: {
      marginRight: spacing(1),
    },
  })
