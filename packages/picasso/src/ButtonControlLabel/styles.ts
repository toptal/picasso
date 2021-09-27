import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: '0.5rem 1.5rem 0.5rem 1rem',
      '&$small': {
        padding: '0.25rem 1rem 0.25rem 0.5rem'
      },
      '&$large': {
        padding: '1rem 2rem 1rem 1rem'
      }
    },
    content: {
      minWidth: 64,
      '$small &': {
        minWidth: 48
      },
      '$large &': {
        minWidth: 84
      }
    },
    small: {},
    medium: {},
    large: {}
  })
