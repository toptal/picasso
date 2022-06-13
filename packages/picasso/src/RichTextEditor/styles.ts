import { outline } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
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
    },

    focused: {
      borderColor: palette.grey.main2,
      ...outline(palette.primary.main),
    },
  })
