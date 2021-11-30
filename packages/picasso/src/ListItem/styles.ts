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
    listContainer: {
      lineHeight: '1.375em'
    },
    iconContainer: {
      minWidth: '1rem'
    },
    orderedListIndex: {
      minWidth: '1.25em',
      marginRight: '0.75em'
    }
  })
