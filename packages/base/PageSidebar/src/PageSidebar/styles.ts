import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

import { headerHeight, headerBreakingPointXL } from '../PageTopBar/constants'

// decided to use a custom shadow for the sidebar's collapse button
const COLLAPSE_BUTTON_SHADOW =
  '0 0 0 1px rgba(0, 0, 0, 0.04), 0 0 8px 0 rgba(0, 0, 0, 0.16)'

export default ({ palette, screens, transitions }: Theme) =>
  createStyles({
    root: {
      height: '100%',
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      fontSize: '1rem',
      position: 'relative',
      transition: `width ${transitions.duration.enteringScreen}ms ease-in-out`,
      display: 'none',
      [headerBreakingPointXL]: {
        display: 'block',
      },

      [screens('xs', 'sm')]: {
        width: '100vw',
        overflowY: 'scroll',
      },

      '&::before': {
        position: 'absolute',
        content: '""',
        left: 0,
        top: 0,
        width: '15.50rem',
        height: '100%',
      },
    },
    hamburgerNotAvailable: {
      display: 'block',
    },
    wrapper: {
      height: '100%',
      '&$sticky': {
        maxHeight: `calc(100vh - ${headerHeight.default})`,
        position: 'sticky',
        top: headerHeight.default,
      },
    },
    scrollableContent: {
      height: '100%',
      overflowY: 'auto',
      padding: '1rem 0 0.5rem',
    },
    small: {
      width: rem('212px'),
    },
    medium: {
      width: rem('236px'),
    },
    large: {
      width: rem('280px'),
    },
    spacer: {
      order: 50,
      flex: 1,
      height: '100%',
    },
    light: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter2}`,
      backgroundColor: palette.grey.lighter,
    },
    dark: {
      boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
      backgroundColor: palette.grey.darker,
    },
    collapseButton: {
      position: 'absolute',
      right: '-0.75rem',
      top: '0.75rem',
      visibility: 'hidden',
      color: palette.grey.dark,
      backgroundColor: palette.common.white,
      borderRadius: '50%',
      boxShadow: COLLAPSE_BUTTON_SHADOW,
      zIndex: 100,

      '&:hover': {
        color: palette.common.white,
        backgroundColor: palette.primary.main,
      },
    },
    buttonVisible: {
      visibility: 'visible',
    },
    rootCollapsed: {
      width: '5rem',
      transition: `width ${transitions.duration.leavingScreen}ms ease-in-out`,

      '&::before': {
        width: '5.75rem',
      },
      '& $scrollableContent': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    sticky: {},
  })
