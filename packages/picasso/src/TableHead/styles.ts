import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({}))

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
    },
  })
