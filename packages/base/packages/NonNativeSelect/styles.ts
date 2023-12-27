/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import '@toptal/picasso-input-label/styles'
import '@toptal/picasso-input-base/styles'
import '@toptal/picasso-input/styles'
import '@toptal/picasso-menu/styles'
import '@toptal/picasso-menu-item/styles'
import '@toptal/picasso-loader/styles'
import highlightAutofillStyles from '@toptal/picasso-input-base/highlight-styles'

export default (theme: Theme) => {
  const { palette } = theme

  return createStyles({
    root: {
      position: 'relative',
      display: 'inline-flex',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    rootFull: {
      width: '100%',
    },
    rootShrink: {
      width: 'auto',
    },
    rootAuto: {},
    rootDisabled: {
      cursor: 'default',
    },
    select: {
      width: '100%',
      padding: '0.5rem',

      '&:focus': {
        backgroundColor: 'inherit',
      },
    },
    inputWrapper: {
      width: 'inherit',
      outline: 0,
    },
    outlinedInput: {
      backgroundColor: palette.common.white,
      paddingRight: '1.625rem',
    },
    searchOutlinedInput: {
      width: '100%',
    },
    searchInputGutters: {
      padding: '0.375rem 0.5rem 0.5rem 0.5rem',
    },
    nativeInput: {
      padding: 0,
    },
    placeholder: {
      color: palette.grey.main2,
    },
    horizontalLayout: {
      width: '100%',
    },
    ...highlightAutofillStyles(theme),
  })
}
