import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '6px 5px 0 5px',
      borderColor: 'currentColor transparent transparent transparent',
      marginLeft: '1.5em'
    }
  })
