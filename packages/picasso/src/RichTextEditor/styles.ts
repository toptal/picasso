import { outline } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import highlightAutofillStyles from '../InputBase/highlightStyles'

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

    editorContainer: {
      position: 'relative',
    },
    contentEditable: {
      outline: 'none',
    },
    italic: {
      fontStyle: 'italic',
    },
    placeholder: {
      overflow: 'hidden',
      position: 'absolute',
      textOverflow: 'ellipsis',
      top: '0px',
      left: '0px',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      pointerEvents: 'none',
    },

    ...highlightAutofillStyles(theme),
  })
}
