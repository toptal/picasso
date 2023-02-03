import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette, sizes }: Theme) =>
  createStyles({
    button: {
      borderRadius: sizes.borderRadius.small,

      '&+&': {
        marginLeft: '0.5em',
      },
    },

    activeButton: {
      backgroundColor: palette.grey.dark,

      '&:not(:hover) svg': {
        fill: palette.common.white,
      },
    },
  })
