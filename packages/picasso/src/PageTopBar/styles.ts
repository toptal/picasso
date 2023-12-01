/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { headerHeight, headerBreakingPointXL } from './constants'

export default ({ palette, layout, zIndex, screens }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: zIndex.appBar,
    },
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
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
      maxWidth: layout.contentWidth,
      padding: `0 ${layout.contentMobilePaddingHorizontal}`,
      height: headerHeight.default,
      [screens('md', 'lg', 'xl')]: {
        padding: `0 ${layout.contentPaddingHorizontal}`,
      },
    },
    preventPageWidthChangeOnScrollbar: {
      [screens('md', 'lg', 'xl')]: {
        width: '100vw',
      },
    },
    wrapper: {
      position: 'relative',
      height: headerHeight.default,
      minHeight: headerHeight.default,
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
    divider: {
      width: '1px',
      height: '1.5em',
      backgroundColor: palette.common.white,
      opacity: 0.8,
    },
    dividerBlue: {
      backgroundColor: palette.blue.darker,
    },
    logo: {
      display: 'none',
      [screens('md', 'lg', 'xl')]: {
        display: 'inline',
      },
    },
    logoEmblem: {
      display: 'inline',
      [screens('md', 'lg', 'xl')]: {
        display: 'none',
      },
    },
    title: {
      display: 'none',
      [screens('lg', 'xl')]: {
        display: 'flex',
      },
    },
  })
