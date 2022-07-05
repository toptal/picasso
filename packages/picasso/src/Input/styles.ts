import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    rootMultilineLimiter: {
      minHeight: '3.75rem',
      paddingBottom: '1.875rem',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
