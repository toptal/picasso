import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({
  MuiListItem: {
    root: {
      '&$focusVisible': {
        backgroundColor: 'unset !important',
      },
    },
  },
}))

export default () =>
  createStyles({
    content: {
      paddingLeft: '8px',
    },
    listContainer: {
      lineHeight: '1.5em',
      marginTop: '4px',
    },
    hasIcon: {
      listStyleType: 'none',
      marginLeft: '-22px',
    },
  })
