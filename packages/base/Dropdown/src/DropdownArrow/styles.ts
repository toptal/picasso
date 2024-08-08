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
  })
