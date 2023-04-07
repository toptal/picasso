import type { StyleRules } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

import type { ListItemType } from '../List/context'

PicassoProvider.override(() => ({
  MuiListItem: {
    root: {
      '&$focusVisible': {
        backgroundColor: 'unset !important',
      },
    },
  },
}))

export const listStyleTypes: StyleRules<ListItemType> = {
  circle: {
    listStyleType: 'circle',
  },
  disc: {
    listStyleType: 'disc',
  },
  checkmark: {
    listStyleType: 'none',
  },
  arrow: {
    listStyleType: 'none',
  },
  numeral: {
    listStyleType: 'decimal',
  },
  alpha: {
    listStyleType: 'lower-alpha',
  },
  roman: {
    listStyleType: 'lower-roman',
  },
}

export default () =>
  createStyles({
    content: {
      paddingLeft: '8px',
    },
    listContainer: {
      marginTop: '4px',
    },
    hasIcon: {
      listStyleType: 'none',
      marginLeft: '-22px',
    },
    ...listStyleTypes,
  })
