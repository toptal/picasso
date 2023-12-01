/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, screens, layout }: Theme) =>
  createStyles({
    root: {
      backgroundColor: palette.grey.darker,
      width: '100%',
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 auto',
      paddingTop: '0.5rem',
      paddingBottom: '1.5rem',
      paddingLeft: layout.contentMobilePaddingHorizontal,
      paddingRight: layout.contentMobilePaddingHorizontal,
      maxWidth: layout.contentWidth,
      color: palette.common.white,
      fontSize: '0.875rem',
      lineHeight: '1em',

      [screens('xs', 'sm', 'md')]: {
        flexDirection: 'column',
      },

      [screens('md', 'lg', 'xl')]: {
        paddingLeft: layout.contentPaddingHorizontal,
        paddingRight: layout.contentPaddingHorizontal,
      },
    },
    centered: {},
    wide: {
      maxWidth: layout.contentWidthWide,
    },
    fullWidth: {
      maxWidth: '100%',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',

      [screens('xs', 'sm', 'md')]: {
        order: -1,
      },

      [screens('xs', 'sm')]: {
        flexDirection: 'column',
      },
    },
  })
