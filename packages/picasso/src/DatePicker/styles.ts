import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette, shadows, sizes }: Theme) =>
  createStyles({
    calendar: {
      outline: 'none',
    },
    footer: {
      backgroundColor: palette.grey.lightest,
      boxShadow: shadows[5],
      borderRadius: `0 0 ${sizes.borderRadius.small} ${sizes.borderRadius.small}`,
      padding: '0.625rem 1.187rem',
      width: '20.5rem',
    },
  })
