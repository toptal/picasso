import type { StyleRules, Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'
import { em, fromPx } from '@toptal/picasso-shared/styles'

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

export default ({ typography }: Theme) => {
  const toEmUnit = (px: number) => em(px, fromPx(typography.fontSizes.medium))

  return createStyles({
    content: {
      paddingLeft: toEmUnit(8),
    },
    listContainer: {
      marginTop: toEmUnit(4),
    },
    hasIcon: {
      listStyleType: 'none',
      marginLeft: toEmUnit(-22),
    },
    ...listStyleTypes,
  })
}
