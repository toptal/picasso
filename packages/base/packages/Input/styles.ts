/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import highlightAutofillStyles from '@toptal/picasso-input-base/highlight-styles'
import '@toptal/picasso-input-base/styles'
import '@toptal/picasso-input-label/styles'
import '@toptal/picasso-outlined-input/styles'
import '@toptal/picasso-input-adornment/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: theme.palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
    horizontalLayout: {
      width: '100%',
    },
    ...highlightAutofillStyles(theme),
  })
