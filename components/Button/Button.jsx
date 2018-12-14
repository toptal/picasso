import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

export default withStyles({
  root: {
    textTransform: 'none',
    padding: '6px 16px',
    fontSize: '16px'
  },
  containedPrimary: {
    color: 'white',
    backgroundColor: '#204ecf',

    '&:hover': {
      backgroundColor: '#1542c1'
    }
  },
  outlinedSecondary: {
    color: '#204ecf',
    borderColor: '#204ecf',

    '&:hover': {
      backgroundColor: '#cad5f4',
      borderColor: '#204ecf'
    }
  }
})(Button)
