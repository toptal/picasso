import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

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
    highlightAutofill: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      backgroundColor: alpha(palette.yellow.lighter!, 0.6),
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
