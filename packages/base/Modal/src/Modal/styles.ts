import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

const maxHeight = 'calc(100% - 6rem)'
const maxWidth = 'calc(100% - 6rem)'

const maxHeightForTopAligned = 'calc(100% - 4rem)'
const maxHeightForExtraSmall = 'calc(100% - 2rem)'
const maxWidthForExtraSmall = 'calc(100% - 2rem)'

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset',
    },
  },
}))

export default ({ screens, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      // do not remove, should be covered with test
      // https://toptal-core.atlassian.net/browse/FX-1543
      fontSize: '1rem',
    },
    container: {},
    paper: {
      height: 'auto',

      maxHeight: maxHeightForExtraSmall,
      maxWidth: maxWidthForExtraSmall,
      margin: '1rem',
      borderRadius: sizes.borderRadius.medium,

      [screens('sm', 'md', 'lg', 'xl')]: {
        margin: '2rem',
        maxHeight,
        maxWidth,
      },
    },
    xsmall: {
      width: '20.5rem',
    },
    small: {
      width: '32.5rem',
    },
    medium: {
      width: '40.625rem',
    },
    large: {
      width: '50rem',
    },
    xlarge: {
      width: '75rem',
    },
    'full-screen': {
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      margin: 0,
      borderRadius: 0,
    },
    topAlignedDialog: {
      position: 'absolute',
      top: 0,

      [screens('sm', 'md', 'lg', 'xl')]: {
        maxHeight: maxHeightForTopAligned,
      },
    },
    closeButton: {
      position: 'absolute',
      right: '2em',
      top: '2em',
    },
  })
