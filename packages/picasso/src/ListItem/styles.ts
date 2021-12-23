import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiListItem: {
    root: {
      '&$focusVisible': {
        backgroundColor: 'unset !important'
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {
      '&:not(:last-child)': {
        marginBottom: '0.5em'
      }
    },
    listContainer: {
      lineHeight: '1.375em'
    },
    ordered: {
      minWidth: '1.25em',
      marginRight: '0.75em'
    },
    unordered: {
      minWidth: '1rem'
    }
  })
