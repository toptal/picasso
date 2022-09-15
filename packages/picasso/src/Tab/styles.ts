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

export default ({ sizes, palette, shadows }: Theme) =>
  createStyles({
    horizontal: {
      '&:not(:last-child)': {
        marginRight: '2em',
      },
    },
    vertical: {
      borderRadius: `${sizes.borderRadius.medium} 0 0 ${sizes.borderRadius.medium}`,
      margin: '0.5em 0',
      overflow: 'hidden',
      padding: '0.5625em 0 0.5625em',

      '&:first-child': {
        marginTop: '0.125em',
      },

      '&:last-child': {
        marginBottom: '0.125em',
      },

      '&:hover:not($selected)': {
        backgroundColor: palette.grey.lighter2,
      },

      '& $wrapper': {
        marginLeft: '1em',
        marginRight: '2em',
        alignItems: 'flex-start',
      },
    },
    selected: {
      '&$vertical': {
        boxShadow: shadows[1],
        backgroundColor: palette.grey.lightest,

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
