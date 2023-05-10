import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

const maxHeight = 'calc(100% - 6rem)'
const maxWidth = 'calc(100% - 6rem)'
const maxHeightForTopAligned = 'calc(100% - 4rem)'
const maxHeightForExtraSmall = 'calc(100% - 2rem)'
const maxWidthForExtraSmall = 'calc(100% - 2rem)'

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
      maxHeight,
      maxWidth,
      borderRadius: sizes.borderRadius.medium,
      margin: '2rem',

      [screens('xs')]: {
        maxHeight: maxHeightForExtraSmall,
        maxWidth: maxWidthForExtraSmall,
        margin: '1rem',
      },
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
    'full-screen': {
      height: maxHeight,
      width: maxWidth,
    },
    topAlignedDialog: {
      position: 'absolute',
      top: 0,
      maxHeight: maxHeightForTopAligned,

      [screens('xs')]: {
        maxHeight: maxHeightForExtraSmall,
      },
    },
    closeButton: {
      position: 'absolute',
      right: '2em',
      top: '2em',
    },
  })
