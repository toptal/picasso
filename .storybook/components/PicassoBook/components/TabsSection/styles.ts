import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    tabs: {
      marginBottom: '1rem'
    },
    description: {
      fontSize: '0.75em',
      marginTop: '0.5rem',
      marginBottom: '1rem'
    }
  })
