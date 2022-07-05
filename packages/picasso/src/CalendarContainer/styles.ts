import { rem } from '@toptal/picasso-shared'
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

export default ({ palette, shadows, sizes }: Theme) =>
  createStyles({
    root: {
      padding: rem('24px'),
      color: palette.grey.darker,
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: shadows[5],
      borderRadius: sizes.borderRadius.small,
      backgroundColor: palette.common.white,
    },
  })
