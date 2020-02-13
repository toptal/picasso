import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, rem } from '@toptal/picasso-shared'

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

      '&:not(:last-child)': {
        marginRight: '2em'
      },

      [breakpoints.up('md')]: {
        minWidth: 'auto',
        fontSize: '1rem'
      }
    },
    selected: {
      color: palette.common.black
    },
    textColorInherit: {
      '&$disabled': {
        opacity: 0.4
      }
    },
    disabled: {},
    wrapper: {
      fontSize: rem('13px'),
      lineHeight: '1rem',
      width: 'auto'
    }
  }
}))

export default () => createStyles({})
