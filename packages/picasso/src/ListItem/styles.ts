/* eslint-disable import/no-extraneous-dependencies */
import type { StyleRules } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import { rem } from '@toptal/picasso-shared'
import type { ListItemType } from '@toptal/picasso-list/context'

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
      paddingLeft: rem(8),
    },
    listContainer: {
      marginTop: rem(4),
    },
    hasIcon: {
      listStyleType: 'none',
      marginLeft: rem(-22),
    },
    ...listStyleTypes,
  })
