import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { rem } from '../styles'

import { rem } from '../styles'

PicassoProvider.override(({ breakpoints, palette, typography }: Theme) => ({
  MuiTab: {
    root: {
      fontWeight: typography.fontWeights.semibold,
      minHeight: 0,
      minWidth: 0,
      lineHeight: 1,
      textTransform: 'none',
      padding: `${rem('11px')} 0 ${rem('9px')}`,

      [breakpoints.up('md')]: {
        padding: undefined
      },

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
    wrapper: {
      fontSize: rem('13px'),
      lineHeight: '1rem'
    }
  }
}))

export default () => createStyles({})
