import createStyles from '@mui/styles/createStyles';
import { rem } from '@toptal/picasso-shared'

export default () =>
  createStyles({
    root: {
      maxWidth: '300px',
    },
    hint: {
      '& > *': {
        lineHeight: rem('16px'),
      },
    },
    nativeInput: {
      display: 'none',
    },
  })
