import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    stripeEven: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      background: alpha(palette.grey.lighter2!, 0.32),
    },
    noPadding: {
      padding: 0,
      '&:last-child': {
        paddingRight: 0,
      },
    },
  })
