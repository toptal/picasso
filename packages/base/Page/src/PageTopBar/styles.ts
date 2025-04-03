import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerBreakingPointXL } from './constants'

export default ({ palette, layout, screens }: Theme) =>
  createStyles({
    light: {
      backgroundColor: palette.common.white,
      boxShadow: `0 1px 0 0 ${palette.grey.lighter2}`,
    },
    dark: {
      backgroundColor: palette.blue.darker,
    },
    grey: {
      backgroundColor: palette.grey.darker,
    },
    black: {
      backgroundColor: palette.common.black,
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
      maxWidth: layout.contentWidth,
      padding: `0 ${layout.contentMobilePaddingHorizontal}`,
      height: 'var(--header-height, 3.5rem)',
      [screens('md', 'lg', 'xl')]: {
        padding: `0 ${layout.contentPaddingHorizontal}`,
      },
    },
    wide: {
      maxWidth: layout.contentWidthWide,
    },
    fullWidth: {
      maxWidth: '100%',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    },
    centerContent: {
      display: 'none',
      [headerBreakingPointXL]: {
        display: 'block',
      },
    },
    centerContentPortal: {
      // as soon as hamburger is visible, center content is ported to hamburger menu
      display: 'block',
      [headerBreakingPointXL]: {
        display: 'none',
      },
    },
  })
