import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {},
    container: {},
    paper: {},
    small: {
      width: '32.5em'
    },
    medium: {
      width: '40.625em'
    },
    large: {
      width: '50em'
    },
    closeButton: {
      position: 'absolute',
      right: '2rem',
      top: '1.875rem',
      color: palette.grey.dark,
      fontSize: '1em',
      cursor: 'pointer',
      opacity: 0.3,

      '&:hover': {
        opacity: 1
      }
    }
  })
