import { createStyles } from '@material-ui/core/styles'
import { headerHeight } from '../PageHeader/styles'
export default ({ screens }) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '& > footer, & > header': {
        flex: 0
      },
      '& > header + *': {
        marginTop: headerHeight.default,
        [screens('small', 'medium')]: {
          marginTop: headerHeight.smallAndMedium
        }
      }
    }
  })
//# sourceMappingURL=styles.js.map
