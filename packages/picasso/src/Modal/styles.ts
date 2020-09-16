import { Theme, createStyles } from '@material-ui/core/styles'

const maxHeight = 'calc(100% - 6rem)'
const maxWidth = 'calc(100% - 6rem)'

export default ({ screens, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    container: {},
    paper: {
      maxHeight,
      maxWidth,
      borderRadius: sizes.borderRadius.medium,

      [screens('small')]: {
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
      top: '1.5rem'
    }
  })
