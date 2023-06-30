import { createStyles } from '@material-ui/core/styles'

export default () => {
  return createStyles({
    hiddenInput: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
    },
  })
}
