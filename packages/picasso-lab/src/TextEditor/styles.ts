import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    editorWrapper: {
      borderRadius: sizes.borderRadius.small,
      border: `1px solid ${palette.grey.light2}`,
      padding: '0.5em'
    },

    disabled: {
      background: palette.grey.lighter,
      borderRadius: '0.25em',
      border: `1px solid ${palette.grey.lighter2}`
    }
  })
