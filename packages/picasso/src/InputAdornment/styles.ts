import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { alpha } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ palette }) => ({
  MuiInputAdornment: {
    root: {
      color: palette.grey.dark,
      height: 'auto',
    },
    positionStart: {
      marginRight: 0,
    },
    positionEnd: {
      justifyContent: 'flex-end',
      flex: '0 0 auto',
      marginLeft: 'auto',
    },
  },
}))

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    rootDisabled: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      color: alpha(palette.grey.dark!, 0.48),
    },
  })
