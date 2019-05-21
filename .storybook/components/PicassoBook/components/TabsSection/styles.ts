import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    tabsHeader: {
      marginBottom: '1rem',
      padding: '0.5rem'
    },
    tabRoot: {
      textTransform: 'initial'
    },
    description: {
      fontSize: '0.75em'
    }
  })
