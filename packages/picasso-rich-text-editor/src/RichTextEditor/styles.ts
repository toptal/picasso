import { outline } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { highlightStyles as highlightAutofillStyles } from '@toptal/picasso-input'

export default (theme: Theme) => {
  const { palette, sizes } = theme

  return createStyles({
    editorWrapper: {
      position: 'relative',
      borderRadius: sizes.borderRadius.small,
      border: `1px solid ${palette.grey.light2}`,
      padding: '0.5em',

      '&:hover:not($disabled):not($error)': {
        borderColor: palette.grey.main2,
      },
    },

    disabled: {
      pointerEvents: 'none',
      background: palette.grey.lighter,
      border: `1px solid ${palette.grey.lighter2}`,
    },

    error: {
      borderColor: palette.red.main,
      '&$focused': {
        borderColor: palette.red.main,
        ...outline(palette.red.main),
      },
    },

    focused: {
      borderColor: palette.grey.main2,
      ...outline(palette.primary.main),
    },

    ...highlightAutofillStyles(theme),
  })
}
