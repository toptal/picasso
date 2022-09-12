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

export default ({ palette, sizes }: Theme) =>
  createStyles({
    horizontal: {
      '&:not(:last-child)': {
        marginRight: '2em',
      },
    },

    vertical: {
      borderRadius: `${sizes.borderRadius.medium} 0 0 ${sizes.borderRadius.medium}`,
      margin: '0.125rem 0',
      overflow: 'hidden',
      padding: `0.5rem 0 0.5rem`,

      '&$selected': {
        boxShadow: `0.25rem 0 0 ${palette.grey.lightest}, 0 0 0.25rem rgba(0, 0, 0, 0.08)`,

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

      '& $wrapper': {
        marginLeft: '1rem',
        marginRight: '2rem',
      },
    },

    selected: {},
    wrapper: {},
  })
