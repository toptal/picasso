import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { PicassoProvider, palette } from '@toptal/picasso-provider'

const ACTIVE_SHADOW = `4px 0 0 ${palette.grey.lightest}, 0 0 4px rgba(0, 0, 0, 0.08)`

PicassoProvider.override(({ breakpoints }: Theme) => ({
  MuiTab: {
    root: {
      minHeight: 0,
      minWidth: 0,
      lineHeight: 1,
      textTransform: 'none',
      padding: `${rem('9px')} 0 ${rem('7px')}`,
      overflow: 'initial',

      [breakpoints.up('md')]: {
        padding: undefined,
      },

      color: palette.grey.dark,

      [breakpoints.up('md')]: {
        minWidth: 'auto',
        fontSize: '1rem',
      },
    },
    labelIcon: {
      minHeight: 0,
      paddingRight: '1.5rem',
      paddingTop: rem('9px'),
      '& $wrapper > *:first-child': {
        position: 'absolute',
        right: 0,
        marginBottom: 0,
      },
    },
    selected: {
      color: palette.common.black,
    },
    textColorInherit: {
      '&$disabled': {
        color: palette.grey.main,
      },
    },
    disabled: {},
  },
}))

export default ({ sizes }: Theme) =>
  createStyles({
    horizontal: {
      '&:not(:last-child)': {
        marginRight: '2em',
      },
    },
    vertical: {
      borderRadius: `${sizes.borderRadius.medium} 0 0 ${sizes.borderRadius.medium}`,
      margin: '0.5rem 0',
      overflow: 'hidden',
      padding: '0.5625em 0 0.5625em',

      '&:first-child': {
        marginTop: '0.125rem',
      },

      '&:last-child': {
        marginBottom: '0.125rem',
      },

      '&:hover:not($selected)': {
        backgroundColor: palette.grey.lighter2,
      },

      '& $wrapper': {
        marginLeft: '1rem',
        marginRight: '2rem',
      },
    },
    selected: {
      '&$vertical': {
        boxShadow: ACTIVE_SHADOW,

        '&::before': {
          content: '""',
          background: palette.blue.main,
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
        },
      },
    },
    wrapper: {},
  })
