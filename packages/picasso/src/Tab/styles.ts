import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(({ breakpoints, palette }: Theme) => ({
  MuiTab: {
    root: {
      minHeight: 0,
      minWidth: 0,
      lineHeight: 1,
      textTransform: 'none',
      padding: `${rem('9px')} 0 ${rem('7px')}`,
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
      paddingRight: '1.5rem',
      paddingTop: rem('9px'),
      '& $wrapper > *:first-child': {
        position: 'absolute',
        right: 0,
        marginBottom: 0
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
      width: 'auto'
    }
  }
}))

export default () => createStyles({})
