import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export default ({ palette, spacing, sizes: { input } }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: input.width,
    },
    description: {
      marginTop: '0.4rem',
    },
    fieldRequirementItem: {
      display: 'flex',
      alignItems: 'center',
      color: palette.grey.main2,
    },
    fieldRequirementItemMessage: {
      marginLeft: spacing(1),
    },
  })
