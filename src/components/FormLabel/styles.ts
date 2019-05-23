import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '14px',
      color: palette.grey[400],
      marginBottom: '8px',
      display: 'inline-block'
    },

    disabled: {},

    required: {},

    error: {}
  })
