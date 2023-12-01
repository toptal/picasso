/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      height: '2.75em',
      padding: '0 1rem',
      margin: '0 1rem',
      whiteSpace: 'nowrap',
      borderRadius: sizes.borderRadius.small,
      fontSize: '1rem',
    },
    light: {
      color: palette.grey.dark,
      '&:hover': {
        color: palette.blue.main,
      },
      '&:focus': {
        color: palette.blue.main,
      },
    },
    dark: {
      '&:hover': {
        color: palette.common.white,
      },
      '&:focus': {
        color: palette.common.white,
      },
    },
    selected: {
      '&$light': {
        '&, &:hover, &:focus': {
          color: palette.blue.main,
          backgroundColor: palette.grey.light,
        },
      },
      '&$dark': {
        '&, &:hover, &:focus': {
          color: palette.common.white,
          backgroundColor: palette.grey.dark,
        },
      },
    },
    parentCompact: {
      '&$light': {
        '&, &:hover, &:focus': {
          margin: 0,
          padding: '0.375em 1em',
          borderRadius: sizes.borderRadius.small,
          '&$selected': {
            backgroundColor: palette.grey.lighter,
          },
        },
      },
    },
    collapsibleWrapper: {
      padding: '0 0 0 1rem',
      margin: '0 1rem',
    },
    nestedMenu: {
      padding: '0 1rem 0 2rem',
      marginRight: '1rem',
    },
    nestedMenuWithIcon: {
      padding: '0 1rem 0 2.875rem',
      marginRight: '1rem',
    },
    content: {
      // to cover text overflow in the sub-menu header item
      maxWidth: '100%',
    },
    expandIcon: {
      fontSize: '1em',
    },
    compactDropdown: {
      marginLeft: '0.5em',
    },
    lightExpandIcon: {
      color: palette.grey.dark,
    },
    darkExpandIcon: {
      color: palette.grey.main,
    },
    expandIconDisabled: {
      color: palette.grey.main,
    },
    compact: {
      padding: 0,
      overflow: 'visible',
    },
    noWrap: {
      flex: 1,
      minWidth: 0,
    },
    collapsible: {
      margin: 0,
      padding: 0,
    },
  })
