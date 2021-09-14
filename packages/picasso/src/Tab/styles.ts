import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ breakpoints, palette, typography }: Theme) => ({
  MuiTab: {
    root: {
      fontWeight: typography.fontWeights.semibold,
      minHeight: 0,
      minWidth: 0,
      lineHeight: 1,
      textTransform: 'none',
      padding: `${rem('11px')} 0 ${rem('9px')}`,
      overflow: 'initial',

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
    labelIcon: {
      minHeight: 0,
      paddingTop: rem('11px'),
      '& $wrapper > *:first-child': {
        position: 'absolute',
        right: '-1.5rem',
        marginBottom: 0
      },
      '&:not(:last-child)': {
        marginRight: '3.5em'
      }
    },
    selected: {
      color: palette.common.black
    },
    textColorInherit: {
      '&$disabled': {
        color: palette.grey.main
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
