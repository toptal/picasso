import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    spinner: {
      color: 'inherit'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    label: {
      marginTop: '1rem'
    },
    inline: {
      display: 'inline-flex'
    }
  })
