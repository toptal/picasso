import { Theme, createStyles } from '@material-ui/core/styles'

const maxHeight = 'calc(100% - 6rem)'
const maxWidth = 'calc(100% - 6rem)'

export default ({ palette, screens }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    container: {},
    paper: {
      maxHeight,
      maxWidth,

      [screens('small')]: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        maxWidth: 'none',
        maxHeight: 'none'
      }
    },
    small: {
      width: '32.5em'
    },
    medium: {
      width: '40.625em'
    },
    large: {
      width: '50em'
    },
    'full-screen': {
      height: maxHeight,
      width: maxWidth
    },
    closeButton: {
      position: 'absolute',
      right: '2rem',
      top: '1.875rem',
      color: palette.grey.dark,
      fontSize: '1rem',
      cursor: 'pointer',
      opacity: 0.3,

      '&:hover': {
        opacity: 1
      }
    }
  })
