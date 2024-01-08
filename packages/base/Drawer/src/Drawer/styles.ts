import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import type { Theme } from '@material-ui/core/styles'

PicassoProvider.override(() => ({
  MuiDrawer: {
    paper: {
      maxWidth: '100%',
    },
  },
}))

export default ({ screens }: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      position: 'relative',
      flex: 1,
    },
    content: {
      flex: 1,
    },
    closeButton: {
      position: 'absolute',
      right: '1.5rem',
      top: '1rem',
    },
    narrow: {
      width: '100vw',
      maxWidth: '100vw',
      [screens('sm', 'md', 'lg', 'xl')]: {
        width: '27.5rem',
        maxWidth: '100%',
      },
    },
    regular: {
      width: '35rem',
    },
    medium: {
      width: '40rem',
    },
    wide: {
      width: '60rem',
    },
    'ultra-wide': {
      width: '73.75rem',
    },
  })
