/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
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

export default ({ sizes, palette, shadows, transitions }: Theme) =>
  createStyles({
    horizontal: {
      '&:not(:last-child)': {
        marginRight: '2em',
      },
    },
    vertical: {
      width: '100%',
      borderRadius: `${sizes.borderRadius.small} 0 0 ${sizes.borderRadius.small}`,
      margin: '0.25rem 0',
      overflow: 'hidden',
      padding: '0.5rem 1rem',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      textAlign: 'left',
      backgroundColor: palette.grey.lighter,
      opacity: 1,
      color: palette.grey.dark,

      '&:first-child': {
        marginTop: '1rem',
      },

      '&:last-child': {
        marginBottom: '1rem',
      },

      '&:hover': {
        color: palette.common.black,
      },

      '&:hover:not($selected)': {
        backgroundColor: palette.grey.lighter2,
      },

      '& $wrapper': {
        display: 'block',
      },
    },
    selected: {
      '&$vertical': {
        color: palette.common.black,
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
