import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ breakpoints, palette, typography }: Theme) => ({
  MuiTab: {
    root: {
      fontWeight: typography.fontWeights.semibold,
      minHeight: 0,
      minWidth: 0,
      lineHeight: 1,
      textTransform: 'none',

      color: palette.grey.dark,

      '&$selected': {
        color: palette.common.black
      },

      '&:not(:last-child)': {
        marginRight: '2em'
      },

      [breakpoints.up('md')]: {
        minWidth: undefined,
        fontSize: undefined
      }
    },
    selected: {},
    labelContainer: {
      padding: '0.625em 0',

      [breakpoints.up('md')]: {
        padding: undefined
      }
    },
    label: {
      fontSize: '0.8125em'
    }
  }
}))

export default () => createStyles({})
