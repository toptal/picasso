import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      visibility: 'hidden',
      marginTop: '0.25em',
      marginBottom: '0.25em',
    },
    visible: {
      visibility: 'visible',
    },
  })
