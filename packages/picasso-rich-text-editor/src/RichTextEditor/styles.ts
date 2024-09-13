import { alpha, outline } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

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
      background: palette.grey.lighter2,
      border: `1px solid ${palette.grey.light2}`,
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

    highlightAutofill: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      backgroundColor: alpha(palette.yellow.lighter!, 0.6),
    },
  })
}
