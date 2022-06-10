import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderColor: 'currentColor transparent transparent transparent',
      marginLeft: '0.7em',
    },
    small: {
      borderWidth: '0.25rem 0.25rem 0 0.25rem',
    },
    medium: {
      borderWidth: '0.375rem 0.3125rem 0 0.375rem',
    },
  })
